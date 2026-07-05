/**
 * Radar Cart Firebase setup — run after firebase login.
 *
 *   npm run firebase:setup:full
 *
 * Creates Firestore (if missing), deploys rules/indexes, generates a service
 * account key, and pushes FIREBASE_SERVICE_ACCOUNT_JSON to Vercel.
 */

import { execSync, spawnSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT_ID = "radarcart-b64b9";
const SUPPORT_EMAIL = "umtkyck@gmail.com";
const FIRESTORE_LOCATION = "nam5";

const firebase = (args, opts = {}) =>
  execSync(`npx -y firebase-tools@latest ${args}`, {
    encoding: "utf8",
    stdio: opts.silent ? "pipe" : "inherit",
    ...opts,
  });

function getAccessToken() {
  const configPath = join(homedir(), ".config", "configstore", "firebase-tools.json");
  if (!existsSync(configPath)) return null;
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  return config.tokens?.access_token ?? null;
}

function isLoggedIn() {
  try {
    const out = firebase("login:list --json", { silent: true });
    const accounts = JSON.parse(out);
    return Array.isArray(accounts) && accounts.length > 0;
  } catch {
    return false;
  }
}

function loginInteractive() {
  console.log("\n── Firebase login ──");
  console.log("Browser will open — sign in with umtkyck@gmail.com\n");
  const result = spawnSync("npx", ["-y", "firebase-tools@latest", "login"], {
    stdio: "inherit",
    shell: true,
  });
  if (result.status !== 0) {
    throw new Error("Firebase login failed. Run: node scripts/firebase-login.mjs");
  }
}

function useProject() {
  console.log(`\n── Project: ${PROJECT_ID} ──`);
  firebase(`use ${PROJECT_ID}`, { silent: true });
}

function ensureFirestoreDatabase() {
  console.log("\n── Firestore database ──");
  try {
    const listed = firebase(`firestore:databases:list --project ${PROJECT_ID} --json`, {
      silent: true,
    });
    const databases = JSON.parse(listed);
    if (Array.isArray(databases) && databases.length > 0) {
      console.log(`Firestore already exists (${databases.map((d) => d.name).join(", ")})`);
      return;
    }
  } catch {
    // list failed — try create anyway
  }

  try {
    firebase(
      `firestore:databases:create "(default)" --location=${FIRESTORE_LOCATION} --project ${PROJECT_ID}`,
      { silent: true }
    );
    console.log("Created Firestore database (default) in nam5");
  } catch (error) {
    const msg = String(error.stderr || error.stdout || error.message);
    if (msg.includes("already exists") || msg.includes("ALREADY_EXISTS")) {
      console.log("Firestore database already exists — continuing.");
    } else {
      throw error;
    }
  }
}

function deployRules() {
  console.log("\n── Deploy Firestore rules + indexes ──");
  firebase(`deploy --only firestore --project ${PROJECT_ID}`);
}

async function createServiceAccountKey() {
  console.log("\n── Service account key ──");
  const token = getAccessToken();
  if (!token) throw new Error("No Firebase access token — login first");

  const projectNumber = "838428104955";
  const saEmail = `firebase-adminsdk-fbsvc@${PROJECT_ID}.iam.gserviceaccount.com`;

  // Try to find existing firebase-adminsdk service account
  let serviceAccountEmail = saEmail;
  try {
    const listRes = await fetch(
      `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts?pageSize=100`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (listRes.ok) {
      const data = await listRes.json();
      const adminSa = data.accounts?.find((a) =>
        a.email?.includes("firebase-adminsdk")
      );
      if (adminSa?.email) serviceAccountEmail = adminSa.email;
    }
  } catch {
    // use default pattern
  }

  const keyRes = await fetch(
    `https://iam.googleapis.com/v1/projects/${PROJECT_ID}/serviceAccounts/${encodeURIComponent(serviceAccountEmail)}/keys`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        keyAlgorithm: "KEY_ALG_RSA_2048",
        privateKeyType: "TYPE_GOOGLE_CREDENTIALS_FILE",
      }),
    }
  );

  if (!keyRes.ok) {
    const err = await keyRes.text();
    throw new Error(`Could not create service account key (${keyRes.status}): ${err.slice(0, 300)}`);
  }

  const keyData = await keyRes.json();
  const privateKeyData = keyData.privateKeyData;
  if (!privateKeyData) throw new Error("No privateKeyData in IAM response");

  const serviceAccountJson = JSON.parse(Buffer.from(privateKeyData, "base64").toString("utf8"));
  writeFileSync(".firebase-service-account.json", JSON.stringify(serviceAccountJson, null, 2));
  console.log("Saved .firebase-service-account.json (gitignored)");

  return serviceAccountJson;
}

function pushToVercel(serviceAccountJson) {
  console.log("\n── Push to Vercel ──");
  const jsonLine = JSON.stringify(serviceAccountJson);

  for (const env of ["production", "preview", "development"]) {
    try {
      execSync(`npx vercel env rm FIREBASE_SERVICE_ACCOUNT_JSON ${env} --yes`, {
        stdio: "pipe",
        shell: true,
      });
    } catch {
      // may not exist
    }
    execSync(`echo ${JSON.stringify(jsonLine)} | npx vercel env add FIREBASE_SERVICE_ACCOUNT_JSON ${env}`, {
      stdio: "inherit",
      shell: true,
    });
    console.log(`  ✓ FIREBASE_SERVICE_ACCOUNT_JSON → ${env}`);
  }

  // Also set split vars for local dev convenience
  const lines = [
    `FIREBASE_PROJECT_ID=${serviceAccountJson.project_id}`,
    `FIREBASE_CLIENT_EMAIL=${serviceAccountJson.client_email}`,
    `FIREBASE_PRIVATE_KEY=${JSON.stringify(serviceAccountJson.private_key)}`,
  ];

  const localPath = ".env.local";
  let local = existsSync(localPath) ? readFileSync(localPath, "utf8") : "";
  for (const key of ["FIREBASE_PROJECT_ID", "FIREBASE_CLIENT_EMAIL", "FIREBASE_PRIVATE_KEY", "FIREBASE_SERVICE_ACCOUNT_JSON"]) {
    local = local
      .split("\n")
      .filter((l) => !l.startsWith(`${key}=`))
      .join("\n");
  }
  local += `\n\n# Firebase Admin SDK\nFIREBASE_SERVICE_ACCOUNT_JSON=${JSON.stringify(jsonLine)}\n`;
  local += lines.join("\n") + "\n";
  writeFileSync(localPath, local.trim() + "\n");
  console.log("  ✓ Updated .env.local");
}

async function verifyWrite() {
  console.log("\n── Verify Firestore write ──");
  const { initializeApp, cert, getApps } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");

  const saPath = ".firebase-service-account.json";
  if (!existsSync(saPath)) {
    console.log("  Skipped (no service account file)");
    return;
  }

  const sa = JSON.parse(readFileSync(saPath, "utf8"));
  if (getApps().length === 0) {
    initializeApp({ credential: cert(sa) });
  }
  const db = getFirestore();
  const ref = await db.collection("contacts").add({
    name: "Setup Verification",
    email: SUPPORT_EMAIL,
    subject: "setup",
    message: "Firebase infrastructure verified",
    status: "new",
    createdAt: new Date(),
  });
  console.log(`  ✓ Test document written: contacts/${ref.id}`);
}

async function main() {
  console.log("Radar Cart — Firebase full setup\n");

  if (!isLoggedIn()) {
    loginInteractive();
    if (!isLoggedIn()) {
      throw new Error("Still not logged in. Run: node scripts/firebase-login.mjs");
    }
  } else {
    console.log("Already logged in to Firebase.");
  }

  useProject();
  ensureFirestoreDatabase();
  deployRules();
  const sa = await createServiceAccountKey();
  pushToVercel(sa);
  await verifyWrite();

  console.log(`
╔══════════════════════════════════════════════════════════════╗
║  Firebase setup complete for ${PROJECT_ID}                   ║
╠══════════════════════════════════════════════════════════════╣
║  • Firestore database ready                                  ║
║  • Security rules deployed                                   ║
║  • Service account on Vercel (all environments)              ║
║  • Redeploy: npx vercel --prod --yes                         ║
╚══════════════════════════════════════════════════════════════╝
`);
}

main().catch((error) => {
  console.error("\nSetup failed:", error.message || error);
  process.exit(1);
});
