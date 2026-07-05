/**
 * Firebase CLI login without MCP session timing issues.
 *
 * Step 1 — opens browser automatically:
 *   node scripts/firebase-login.mjs
 *
 * Step 2 — if needed, paste the code:
 *   node scripts/firebase-login.mjs --code "4/0Adk..."
 *
 * Then run:
 *   node scripts/firebase-setup.mjs
 */

import { createHash, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const STATE_FILE = join(process.cwd(), ".firebase-login-state.json");
const CONFIG_DIR = join(homedir(), ".config", "configstore");
const CONFIG_FILE = join(CONFIG_DIR, "firebase-tools.json");

function base64Url(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function createPkce() {
  const verifier = base64Url(randomBytes(32));
  const challenge = base64Url(createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function loadState() {
  if (!existsSync(STATE_FILE)) return null;
  return JSON.parse(readFileSync(STATE_FILE, "utf8"));
}

function buildLoginUrl(challenge, session) {
  const params = new URLSearchParams({
    code_challenge: challenge,
    session,
    attest: base64Url(randomBytes(32)),
  });
  return `https://auth.firebase.tools/login?${params}`;
}

async function exchangeCode(code, verifier, session) {
  const response = await fetch("https://auth.firebase.tools/token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      code_verifier: verifier,
      session_id: session,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token exchange failed (${response.status}): ${text.slice(0, 400)}`);
  }

  return response.json();
}

function saveFirebaseConfig(tokens, user) {
  mkdirSync(CONFIG_DIR, { recursive: true });

  let config = {};
  if (existsSync(CONFIG_FILE)) {
    config = JSON.parse(readFileSync(CONFIG_FILE, "utf8"));
  }

  config.tokens = {
    ...config.tokens,
    expires_at: Date.now() + tokens.expires_in * 1000,
    refresh_token: tokens.refresh_token,
    access_token: tokens.access_token,
    scope: tokens.scope,
    token_type: tokens.token_type,
  };
  config.user = user;

  writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

async function startLogin() {
  const session = crypto.randomUUID();
  const { verifier, challenge } = createPkce();
  saveState({ session, verifier, challenge, createdAt: Date.now() });

  const url = buildLoginUrl(challenge, session);
  console.log("\n1. Open this URL in your browser:\n");
  console.log(url);
  console.log("\n2. Sign in with umtkyck@gmail.com");
  console.log("3. Copy the authorization code shown on the page");
  console.log("4. Run:\n");
  console.log('   node scripts/firebase-login.mjs --code "PASTE_CODE_HERE"\n');

  try {
    const { execSync } = await import("node:child_process");
    execSync(`start "" "${url}"`, { shell: true, stdio: "ignore" });
    console.log("(Browser opened automatically)\n");
  } catch {
    // ignore if browser launch fails
  }
}

async function completeLogin(code) {
  const state = loadState();
  if (!state) {
    throw new Error("No login session found. Run: node scripts/firebase-login.mjs");
  }

  if (Date.now() - state.createdAt > 10 * 60 * 1000) {
    throw new Error("Login session expired (>10 min). Run step 1 again.");
  }

  const tokens = await exchangeCode(code.trim(), state.verifier, state.session);
  saveFirebaseConfig(tokens, tokens.user ?? { email: "umtkyck@gmail.com" });

  console.log("\nFirebase login successful.");
  console.log(`Logged in as: ${tokens.user?.email ?? "unknown"}\n`);
  console.log("Next: node scripts/firebase-setup.mjs\n");
}

const codeArg =
  process.argv.find((a) => a.startsWith("--code="))?.slice(7) ??
  (process.argv.indexOf("--code") >= 0 ? process.argv[process.argv.indexOf("--code") + 1] : null);

if (codeArg) {
  completeLogin(codeArg).catch((error) => {
    console.error(error.message || error);
    process.exit(1);
  });
} else {
  startLogin();
}
