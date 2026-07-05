/**
 * Import a downloaded Firebase service account JSON and push to Vercel.
 *
 * Place the downloaded file as one of:
 *   .firebase-service-account.json
 *   radarcart-b64b9-firebase-adminsdk-*.json  (in project root)
 *
 * Then run:
 *   npm run firebase:import-key
 */

import { execSync } from "node:child_process";
import { readFileSync, writeFileSync, existsSync, readdirSync } from "node:fs";

function findKeyFile() {
  if (existsSync(".firebase-service-account.json")) {
    return ".firebase-service-account.json";
  }
  const match = readdirSync(".").find(
    (f) => f.includes("firebase-adminsdk") && f.endsWith(".json")
  );
  return match ?? null;
}

function pushToVercel(jsonLine) {
  for (const env of ["production", "preview", "development"]) {
    try {
      execSync(`npx vercel env rm FIREBASE_SERVICE_ACCOUNT_JSON ${env} --yes`, {
        stdio: "pipe",
        shell: true,
      });
    } catch {
      // may not exist
    }
    writeFileSync(".firebase-key-tmp.txt", jsonLine, "utf8");
    execSync(
      `Get-Content .firebase-key-tmp.txt -Raw | npx vercel env add FIREBASE_SERVICE_ACCOUNT_JSON ${env}`,
      { stdio: "inherit", shell: "powershell.exe" }
    );
    console.log(`  ✓ ${env}`);
  }
  try {
    execSync("Remove-Item .firebase-key-tmp.txt -Force", { shell: "powershell.exe", stdio: "pipe" });
  } catch {
    // ignore
  }
}

const keyFile = findKeyFile();
if (!keyFile) {
  console.error("No service account JSON found.");
  console.error("Download from Firebase Console and save as .firebase-service-account.json");
  process.exit(1);
}

const sa = JSON.parse(readFileSync(keyFile, "utf8"));
if (!sa.private_key || !sa.client_email || !sa.project_id) {
  console.error("Invalid service account JSON");
  process.exit(1);
}

writeFileSync(".firebase-service-account.json", JSON.stringify(sa, null, 2));
const jsonLine = JSON.stringify(sa);

console.log(`\nImporting ${keyFile} for project ${sa.project_id}\n`);
pushToVercel(jsonLine);

console.log("\nDone. Redeploying...\n");
execSync("npx vercel --prod --yes", { stdio: "inherit", shell: true });

console.log("\nFirebase Admin SDK is live on production.\n");
