/**
 * Provision Firestore using the service account (no Firebase CLI login needed).
 * Run: node scripts/firebase-provision.mjs
 */

import { readFileSync, existsSync } from "node:fs";
import { createSign } from "node:crypto";

const SA_PATH = ".firebase-service-account.json";
const PROJECT_ID = "radarcart-b64b9";
const LOCATION = "nam5";

function loadServiceAccount() {
  if (!existsSync(SA_PATH)) {
    throw new Error(`Missing ${SA_PATH}. Run: npm run firebase:import-key`);
  }
  return JSON.parse(readFileSync(SA_PATH, "utf8"));
}

async function getAccessToken(sa) {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(
    JSON.stringify({
      iss: sa.client_email,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    })
  );
  const unsigned = `${header}.${claim}`;
  const sign = createSign("RSA-SHA256");
  sign.update(unsigned);
  const signature = sign
    .sign(sa.private_key)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const jwt = `${unsigned}.${signature}`;

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) throw new Error(`Token error: ${await res.text()}`);
  const data = await res.json();
  return data.access_token;
}

function base64url(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function enableFirestoreApi(token) {
  console.log("Enabling Firestore API...");
  const res = await fetch(
    `https://serviceusage.googleapis.com/v1/projects/${PROJECT_ID}/services/firestore.googleapis.com:enable`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  if (res.ok || res.status === 409) {
    console.log("  ✓ Firestore API enabled (or already enabled)");
    return;
  }
  const text = await res.text();
  if (text.includes("already enabled") || text.includes("ALREADY_EXISTS")) {
    console.log("  ✓ Firestore API already enabled");
    return;
  }
  if (res.status === 403) {
    console.log("  ⚠ Cannot enable API via service account — enable manually in Google Cloud Console");
    return;
  }
  throw new Error(`Enable API failed (${res.status}): ${text.slice(0, 300)}`);
}

async function createDatabase(token) {
  console.log("Creating Firestore database...");
  const res = await fetch(
    `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases?databaseId=(default)`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        locationId: LOCATION,
        type: "FIRESTORE_NATIVE",
      }),
    }
  );
  if (res.ok) {
    const op = await res.json();
    console.log("  ✓ Database creation started:", op.name ?? "ok");
    return;
  }
  const text = await res.text();
  if (text.includes("already exists") || text.includes("ALREADY_EXISTS")) {
    console.log("  ✓ Database already exists");
    return;
  }
  throw new Error(`Create database failed (${res.status}): ${text.slice(0, 400)}`);
}

async function waitForDatabase(token) {
  console.log("Waiting for database to become ready...");
  for (let i = 0; i < 30; i++) {
    const res = await fetch(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    if (res.ok) {
      console.log("  ✓ Database ready");
      return;
    }
    await new Promise((r) => setTimeout(r, 5000));
  }
  throw new Error("Database not ready after 150s");
}

async function verifyWrite() {
  console.log("Verifying write...");
  const { initializeApp, cert, getApps } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  const sa = loadServiceAccount();
  if (getApps().length === 0) {
    initializeApp({ credential: cert(sa) });
  }
  const db = getFirestore();
  const ref = await db.collection("contacts").add({
    name: "Provision Test",
    email: "umtkyck@gmail.com",
    subject: "setup",
    message: "Firestore provisioned successfully",
    status: "new",
    createdAt: new Date(),
  });
  console.log(`  ✓ Test document: contacts/${ref.id}`);
}

async function main() {
  const sa = loadServiceAccount();
  const token = await getAccessToken(sa);
  await enableFirestoreApi(token);
  await createDatabase(token);
  await waitForDatabase(token);
  await verifyWrite();
  console.log("\nFirestore is live.\n");
}

main().catch((error) => {
  console.error("\nProvision failed:", error.message || error);
  process.exit(1);
});
