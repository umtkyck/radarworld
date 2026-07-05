#!/usr/bin/env node
/**
 * Verify Firebase configuration for Radar Cart.
 * Run: node scripts/firebase-setup.mjs
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

const publicKeys = [
  "NEXT_PUBLIC_FIREBASE_API_KEY",
  "NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN",
  "NEXT_PUBLIC_FIREBASE_PROJECT_ID",
  "NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET",
  "NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID",
  "NEXT_PUBLIC_FIREBASE_APP_ID",
];

const adminKeys = [
  "FIREBASE_SERVICE_ACCOUNT_JSON",
  "FIREBASE_CLIENT_EMAIL",
  "FIREBASE_PRIVATE_KEY",
];

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
  const env = {};
  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    let value = trimmed.slice(eq + 1);
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value;
  }
  return env;
}

const env = {
  ...loadEnvFile(path.join(root, ".env.local")),
  ...loadEnvFile(path.join(root, ".env.vercel")),
  ...process.env,
};

console.log("Radar Cart — Firebase setup check\n");

let ok = true;

console.log("Client SDK (public):");
for (const key of publicKeys) {
  const present = Boolean(env[key]);
  console.log(`  ${present ? "✓" : "✗"} ${key}`);
  if (!present) ok = false;
}

const hasAdminJson = Boolean(env.FIREBASE_SERVICE_ACCOUNT_JSON);
const hasAdminParts =
  Boolean(env.FIREBASE_CLIENT_EMAIL) &&
  Boolean(env.FIREBASE_PRIVATE_KEY) &&
  Boolean(env.FIREBASE_PROJECT_ID || env.NEXT_PUBLIC_FIREBASE_PROJECT_ID);

console.log("\nAdmin SDK (server writes):");
console.log(`  ${hasAdminJson || hasAdminParts ? "✓" : "✗"} Service account configured`);
if (!hasAdminJson && !hasAdminParts) {
  ok = false;
  console.log("    → Add FIREBASE_SERVICE_ACCOUNT_JSON or FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY");
}

console.log("\nProject files:");
for (const file of ["firebase.json", "firestore.rules", "firestore.indexes.json", ".firebaserc"]) {
  const exists = fs.existsSync(path.join(root, file));
  console.log(`  ${exists ? "✓" : "✗"} ${file}`);
  if (!exists) ok = false;
}

console.log(`\nProject ID: ${env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "(not set)"}`);

if (ok) {
  console.log("\nAll checks passed. Deploy rules with: npm run firebase:deploy");
} else {
  console.log("\nSome checks failed. See .env.local.example for required variables.");
  process.exit(1);
}
