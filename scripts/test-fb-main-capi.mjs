/**
 * Test script for Facebook Conversions API — Main Site Pixel (819356476465129)
 *
 * Usage:
 *   FB_PIXEL_DATA_ACCESS_TOKEN=<token> node scripts/test-fb-main-capi.mjs
 *   node scripts/test-fb-main-capi.mjs --token <token>
 */

const PIXEL_ID = "819356476465129";
const API_VERSION = "v21.0";
const TEST_EVENT_CODE = "TEST_MAIN_01";

const TOKEN =
  process.argv.includes("--token")
    ? process.argv[process.argv.indexOf("--token") + 1]
    : process.env.FB_PIXEL_DATA_ACCESS_TOKEN;

if (!TOKEN) {
  console.error("Missing token. Set FB_PIXEL_DATA_ACCESS_TOKEN or pass --token <token>");
  process.exit(1);
}

const CAPI_URL = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${TOKEN}`;
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36";

async function sha256(str) {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str.trim().toLowerCase()));
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, "0")).join("");
}

async function sendEvent(event) {
  const res = await fetch(CAPI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [event], test_event_code: TEST_EVENT_CODE }),
  });
  return { status: res.status, body: await res.json().catch(() => ({})) };
}

function log(name, result) {
  const ok = result.status === 200;
  console.log(`  ${ok ? "✓" : "✗"} ${name} — ${result.status} ${ok ? `(${result.body.events_received} received)` : JSON.stringify(result.body.error?.message || result.body)}`);
}

async function main() {
  console.log("Testing Main Pixel CAPI (819356476465129)...\n");
  const now = Math.floor(Date.now() / 1000);

  // 1. PageView
  log("PageView", await sendEvent({
    event_name: "PageView", event_time: now, event_id: "test_pv_" + now,
    event_source_url: "https://attorneyassistant.com/",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 2. ViewContent (landing page)
  log("ViewContent", await sendEvent({
    event_name: "ViewContent", event_time: now, event_id: "test_vc_" + now,
    event_source_url: "https://attorneyassistant.com/lp/frontline",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 3. Lead (HubSpot form submit)
  log("Lead", await sendEvent({
    event_name: "Lead", event_time: now, event_id: "test_lead_" + now,
    event_source_url: "https://attorneyassistant.com/contact",
    action_source: "website",
    user_data: {
      client_user_agent: UA, client_ip_address: "1.2.3.4",
      em: [await sha256("jane.doe@lawfirm.com")],
      ln: [await sha256("doe")],
      ph: [await sha256("+12155551234")],
      ct: [await sha256("philadelphia")],
      st: [await sha256("pa")],
      zp: [await sha256("19103")]
    }
  }));

  // 4. Contact
  log("Contact", await sendEvent({
    event_name: "Contact", event_time: now, event_id: "test_contact_" + now,
    event_source_url: "https://attorneyassistant.com/thank-you",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 5. CompleteRegistration (form thank-you)
  log("CompleteRegistration", await sendEvent({
    event_name: "CompleteRegistration", event_time: now, event_id: "test_cr_" + now,
    event_source_url: "https://attorneyassistant.com/thank-you",
    action_source: "website",
    user_data: {
      client_user_agent: UA, client_ip_address: "1.2.3.4",
      em: [await sha256("jane.doe@lawfirm.com")],
      ct: [await sha256("philadelphia")]
    }
  }));

  // 6. Schedule (booking confirmed)
  log("Schedule", await sendEvent({
    event_name: "Schedule", event_time: now, event_id: "test_sched_" + now,
    event_source_url: "https://attorneyassistant.com/thank-you-booking",
    action_source: "website",
    user_data: {
      client_user_agent: UA, client_ip_address: "1.2.3.4",
      em: [await sha256("jane.doe@lawfirm.com")],
      fn: [await sha256("jane")],
      ln: [await sha256("doe")],
      ph: [await sha256("+12155551234")]
    }
  }));

  // 7. SubscribedButtonClick (CTA click)
  log("SubscribedButtonClick", await sendEvent({
    event_name: "SubscribedButtonClick", event_time: now, event_id: "test_sbc_" + now,
    event_source_url: "https://attorneyassistant.com/pricing",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 8. invitee_event_type_page (Calendly view)
  log("invitee_event_type_page", await sendEvent({
    event_name: "invitee_event_type_page", event_time: now, event_id: "test_ietp_" + now,
    event_source_url: "https://attorneyassistant.com/book-call",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 9. invitee_select_day
  log("invitee_select_day", await sendEvent({
    event_name: "invitee_select_day", event_time: now, event_id: "test_isd_" + now,
    event_source_url: "https://attorneyassistant.com/book-call",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 10. invitee_select_time
  log("invitee_select_time", await sendEvent({
    event_name: "invitee_select_time", event_time: now, event_id: "test_ist_" + now,
    event_source_url: "https://attorneyassistant.com/book-call",
    action_source: "website",
    user_data: { client_user_agent: UA, client_ip_address: "1.2.3.4" }
  }));

  // 11. invitee_meeting_scheduled
  log("invitee_meeting_scheduled", await sendEvent({
    event_name: "invitee_meeting_scheduled", event_time: now, event_id: "test_ims_" + now,
    event_source_url: "https://attorneyassistant.com/book-call",
    action_source: "website",
    user_data: {
      client_user_agent: UA, client_ip_address: "1.2.3.4",
      em: [await sha256("jane.doe@lawfirm.com")],
      fn: [await sha256("jane")],
      ln: [await sha256("doe")],
      ph: [await sha256("+12155551234")]
    }
  }));

  console.log("\nDone! Check Events Manager > Test Events (code: " + TEST_EVENT_CODE + ")");
}

main().catch(console.error);
