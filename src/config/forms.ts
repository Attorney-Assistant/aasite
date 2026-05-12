/**
 * Source of truth for HubSpot Form IDs, Meeting URLs, and lead-magnet asset URLs
 * used by Simple Campaign landing pages (`/lp/simple/benchmark`, `/lp/comic/biggest-villain`).
 *
 * HubSpot portal: 49161090 (na1 region).
 * TODO(nicole): verify each form ID matches its display name in HubSpot
 * (Marketing → Forms) before launch — IDs were transcribed from chat.
 */

export const HUBSPOT_PORTAL_ID = '49161090';
export const HUBSPOT_REGION = 'na1';

export const FORM_IDS = {
  benchmarkMicroForm: '54776250-0e82-4808-aade-290f0a211d65',
  benchmarkEmailGate: 'd6486e3f-fec1-4d72-b52d-94dda32e9e86',
  villainEmailGate: 'c9fc48ee-12df-4f02-a972-a91bf7aa857d',
} as const;

export const MEETING_URLS = {
  benchmarkOperationsReview:
    'https://meet.attorneyassistant.com/meetings/attorney-assistant/simple-campaign-operations-review',
  villainDeployRescueCall:
    'https://meet.attorneyassistant.com/meetings/attorney-assistant/simple-campaign-deploy-aa-rescue-call',
} as const;

export const ASSET_URLS = {
  benchmarkReportPdf:
    'https://49161090.fs1.hubspotusercontent-na1.net/hubfs/49161090/Simple%20Campaign/2026_Law_Firm_Operations_Benchmark.pdf',
} as const;
