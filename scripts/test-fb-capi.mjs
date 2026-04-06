/**
 * Test script for Facebook Conversions API — Careers Pixel
 * Sends test ViewContent and SubmitApplication events.
 *
 * Usage:
 *   FB_CAREERS_PIXEL_DATA_ACCESS_TOKEN=<token> node scripts/test-fb-capi.mjs
 *
 * Or with the token inline:
 *   node scripts/test-fb-capi.mjs --token <token>
 */

const PIXEL_ID = "1461622248739350";
const API_VERSION = "v21.0";

const TOKEN =
  process.argv.includes("--token")
    ? process.argv[process.argv.indexOf("--token") + 1]
    : process.env.FB_CAREERS_PIXEL_DATA_ACCESS_TOKEN;

if (!TOKEN) {
  console.error("Missing access token. Set FB_CAREERS_PIXEL_DATA_ACCESS_TOKEN or pass --token <token>");
  process.exit(1);
}

const CAPI_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`;

async function sha256(str) {
  const buf = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(str.trim().toLowerCase())
  );
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function sendEvent(eventData) {
  const res = await fetch(CAPI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [eventData], test_event_code: "TEST42" }),
  });
  const json = await res.json();
  return { status: res.status, body: json };
}

async function main() {
  console.log("Testing Facebook Conversions API for Careers Pixel...\n");

  // Test 1: ViewContent event
  console.log("1. Sending ViewContent event...");
  const viewContentEvent = {
    event_name: "ViewContent",
    event_time: Math.floor(Date.now() / 1000),
    event_id: "test_vc_" + Date.now(),
    event_source_url: "https://attorneyassistant.com/careers",
    action_source: "website",
    user_data: {
      client_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      client_ip_address: "1.2.3.4",
    },
  };

  const vcResult = await sendEvent(viewContentEvent);
  console.log(
    `   Status: ${vcResult.status}`,
    vcResult.body.events_received ? `| Events received: ${vcResult.body.events_received}` : "",
    vcResult.body.error ? `| Error: ${vcResult.body.error.message}` : ""
  );
  console.log(`   Response:`, JSON.stringify(vcResult.body, null, 2));

  // Test 2: SubmitApplication event (with hashed user data)
  console.log("\n2. Sending SubmitApplication event...");
  const submitEvent = {
    event_name: "SubmitApplication",
    event_time: Math.floor(Date.now() / 1000),
    event_id: "test_sa_" + Date.now(),
    event_source_url: "https://attorneyassistant.com/apply/thank-you",
    action_source: "website",
    user_data: {
      client_user_agent:
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      em: [await sha256("test@example.com")],
      ph: [await sha256("+16101234567")],
      ct: [await sha256("san ignacio")],
    },
  };

  const saResult = await sendEvent(submitEvent);
  console.log(
    `   Status: ${saResult.status}`,
    saResult.body.events_received ? `| Events received: ${saResult.body.events_received}` : "",
    saResult.body.error ? `| Error: ${saResult.body.error.message}` : ""
  );
  console.log(`   Response:`, JSON.stringify(saResult.body, null, 2));

  console.log("\nDone. Check Events Manager > Test Events for results.");
  console.log("Note: Remove test_event_code from production events.");
}

main().catch(console.error);
