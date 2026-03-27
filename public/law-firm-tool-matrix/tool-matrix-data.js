/* Law Firm Tool Matrix — Data */

const TOOLS = [
  { name: "Calendly", status: "active", description: "Scheduling & rescheduling appointments" },
  { name: "Call Sophia", status: "active", description: "AI-powered phone answering & routing" },
  { name: "Even Up", status: "rolling-off", description: "AI demand letter generation" },
  { name: "Titan", status: "future", description: "Next-gen case valuation platform" },
  { name: "Hona", status: "expiring", description: "Client communication portal", expires: "Sep 2025" },
  { name: "DropSign", status: "rolling-off", description: "E-signature platform (legacy)" },
  { name: "CallRail", status: "active", description: "Call tracking & analytics" },
  { name: "Zapier", status: "active", description: "Workflow automation & integrations" },
  { name: "Make", status: "active", description: "Advanced automation scenarios" },
  { name: "Adobe", status: "active", description: "PDF editing, e-sign, document tools" },
  { name: "Litify", status: "active", description: "Legal practice management on Salesforce" },
  { name: "Advo Logic", status: "future", description: "AI-powered legal analytics" },
  { name: "SMS Magic", status: "active", description: "Salesforce-native SMS messaging" },
  { name: "SEMRush", status: "active", description: "SEO & marketing analytics" },
  { name: "WordPress", status: "active", description: "Website & blog CMS" },
  { name: "Squarespace", status: "active", description: "Secondary web presence" },
  { name: "RingCentral", status: "future", description: "Unified communications & VoIP" },
  { name: "Regal", status: "rolling-off", description: "Outbound call automation" },
  { name: "NOKA", status: "active", description: "Medical record retrieval service" },
  { name: "Lexis", status: "active", description: "Legal research & case law database" },
  { name: "Google Workspace", status: "active", description: "Email, docs, sheets, calendar" },
  { name: "Teams", status: "active", description: "Internal messaging & video calls" },
  { name: "Outlook", status: "active", description: "Email & calendar management" },
  { name: "JotForm", status: "rolling-off", description: "Online form builder (legacy)" },
  { name: "Mailerlight", status: "active", description: "Email marketing & newsletters" },
  { name: "Otter AI", status: "active", description: "AI meeting transcription & notes" },
  { name: "Pixie", status: "active", description: "Client intake & communication" },
  { name: "Ingrid", status: "active", description: "AI document processing assistant" },
  { name: "LitifAI", status: "active", description: "Litify AI companion features" },
  { name: "Sapio", status: "active", description: "AI-powered legal intelligence" }
];

const STATUS_META = {
  "active":      { label: "Active",      bg: "#dcfce7", color: "#166534" },
  "future":      { label: "Future",      bg: "#dbeafe", color: "#1e40af" },
  "rolling-off": { label: "Rolling Off", bg: "#fee2e2", color: "#991b1b" },
  "expiring":    { label: "Expiring",    bg: "#fef9c3", color: "#854d0e" }
};

const TASK_GROUPS = [
  {
    id: "intake",
    label: "Intake & Onboarding",
    tasks: ["Self Intake", "Onboarding", "Initial Appt Set", "Notice Letters", "Initial Atty Review"]
  },
  {
    id: "case",
    label: "Case Management",
    tasks: ["Valuing Cases", "Label Incoming Docs", "Conversation Companion", "Intelligent Query", "Cross-Matter Search", "Data Extraction"]
  },
  {
    id: "docgen",
    label: "Doc Gen",
    tasks: ["Doc Gen / Demands", "Blueprints", "Doc Retrieval & Recog.", "Medical Indexing"]
  },
  {
    id: "client",
    label: "Client & Portal",
    tasks: ["Client Portal", "Client Check-In", "Client Reminders", "Outbound Mail"]
  },
  {
    id: "voice",
    label: "Voice Agents & AI",
    tasks: ["Client Voice Agent", "Phone AI \u2192 Notes", "Voice Memo \u2192 SF", "Zoom/Teams AI Notes", "AI Task Creation"]
  },
  {
    id: "esign",
    label: "E-Sign & SMS",
    tasks: ["E-Sign", "SMS"]
  },
  {
    id: "med",
    label: "Medical & Records",
    tasks: ["Med Record Retrieval", "Med Chronologies", "Missing Bills & Records", "Police Report Retrieval"]
  },
  {
    id: "ins",
    label: "Insurance & Legal",
    tasks: ["Insurance Calls / Claim", "Lien Reduction", "Bill Balance", "Researching Briefs"]
  },
  {
    id: "admin",
    label: "Admin & Reporting",
    tasks: ["Service Tracking", "Filing", "Salesforce Reports", "Event Booking"]
  }
];

const TABS = [
  { id: "grid",    label: "Tool Grid",          icon: "\ud83d\udcca" },
  { id: "intake",  label: "Intake & Lead",       icon: "\ud83d\udce5" },
  { id: "onboard", label: "Onboarding",          icon: "\ud83e\udd1d" },
  { id: "case",    label: "Case Mgmt",           icon: "\ud83d\udcc1" },
  { id: "med",     label: "Medical & Records",   icon: "\ud83c\udfe5" },
  { id: "docgen",  label: "Doc Gen",             icon: "\ud83d\udcc4" },
  { id: "settle",  label: "Settlement",          icon: "\ud83d\udcb0" },
  { id: "ins",     label: "Insurance",           icon: "\ud83d\udee1\ufe0f" },
  { id: "lit",     label: "Litigation",          icon: "\u2696\ufe0f" },
  { id: "comms",   label: "Client Comms",        icon: "\ud83d\udcac" },
  { id: "ops",     label: "Operations",          icon: "\u2699\ufe0f" },
  { id: "hr",      label: "HR & Staff",          icon: "\ud83d\udc65" }
];

const AGENTS = {
  intake: {
    title: "Intake & Lead",
    desc: "AI agents that handle the moment a potential client first contacts your firm — before a human ever gets involved.",
    agents: [
      {
        name: "24/7 Intake Voice Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Answers every call after hours, weekends, and holidays. Qualifies the lead, captures injury details, accident date, insurance info, and schedules a consultation — all without a human.",
        impact: "Never miss a lead again. Most PI clients call multiple firms; whoever answers first wins.",
        tools: ["Call Sophia", "NOKA"]
      },
      {
        name: "Web Chat Intake Bot",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Embedded on your website and landing pages. Captures leads 24/7 via chat, qualifies by practice area, and routes to the right team or books a callback.",
        impact: "Converts website visitors into qualified leads around the clock without staffing a live chat team.",
        tools: ["Litify", "Calendly", "Zapier"]
      },
      {
        name: "Lead Scoring Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Scores every new intake by liability strength, injury severity, insurance availability, and fault clarity. Surfaces the best cases to attorneys immediately.",
        impact: "Attorneys focus on the highest-value cases first instead of working leads in the order they came in.",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Conflict Check Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "The moment a new contact is created, auto-runs a conflict check against all existing clients, adverse parties, and related entities. Flags any hits before onboarding proceeds.",
        impact: "Catches conflicts in seconds instead of 15+ minutes of manual searching across systems.",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "Auto SOL Calculator",
        priority: "high",
        complexity: "Easy impl.",
        desc: "On intake, calculates the statute of limitations deadline based on accident date, state, and injury type. Auto-creates a task and calendar entry for the SOL date.",
        impact: "Eliminates SOL-related malpractice risk by catching 100% of deadlines at the moment of intake.",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "Referral Source Attribution Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Tags every intake with its true source (Google, referral attorney, prior client, billboard, etc.) and tracks it through to case resolution and fees collected.",
        impact: "Know exactly which marketing channels produce signed cases and revenue, not just leads.",
        tools: ["CallRail", "Litify", "Zapier"]
      },
      {
        name: "Multi-Channel Lead Nurture",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "If a lead doesn't sign immediately, enrolls them in a drip sequence of SMS, email, and voice touches until they sign, hire someone else, or opt out.",
        impact: "Recovers 15-20% of leads that would otherwise go cold and sign with a competitor.",
        tools: ["SMS Magic", "Mailerlight", "Call Sophia"]
      }
    ]
  },

  onboard: {
    title: "Client Onboarding",
    desc: "AI agents that take a signed client from retainer to fully onboarded without staff having to manually send every email and form.",
    agents: [
      {
        name: "Onboarding Orchestrator Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "As soon as a retainer is signed, auto-triggers the full onboarding sequence: welcome email, portal invite, document checklist, photo upload request, provider auth forms, and first appointment.",
        impact: "Clients are fully onboarded in hours instead of days, with zero manual coordination by staff.",
        tools: ["Litify", "Make", "Hona"]
      },
      {
        name: "Auto LOA/LOP Generator",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Generates Letters of Authorization and Letters of Protection pre-filled from intake data. Routes for e-sign immediately after retainer is signed.",
        impact: "LOAs and LOPs sent within minutes of signing instead of waiting days for manual prep.",
        tools: ["Litify", "Adobe", "LitifAI"]
      },
      {
        name: "Missing Info Chaser Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Monitors what's missing from the client file (photos, insurance cards, prior records, provider info). Sends automated SMS and email nudges until items are received.",
        impact: "Complete client files in days instead of weeks, without staff manually chasing every item.",
        tools: ["SMS Magic", "Mailerlight", "Litify"]
      },
      {
        name: "Insurance Verification Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Calls or queries the at-fault driver's insurance to verify coverage, confirm policy limits, and log claim numbers — all automated on intake.",
        impact: "Coverage verified on day one so the team knows what they're working with before investing time in the case.",
        tools: ["Call Sophia", "Litify", "LitifAI"]
      },
      {
        name: "Provider Onboarding Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Contacts treatment providers on behalf of the client to confirm appointments are booked, send LOPs, set up billing communication, and confirm treatment start dates.",
        impact: "Clients start treatment faster and providers have everything they need from day one.",
        tools: ["Call Sophia", "Litify", "Adobe"]
      }
    ]
  },

  case: {
    title: "Case Management",
    desc: "AI agents that actively manage your cases day-to-day — monitoring deadlines, flagging issues, and keeping the file moving.",
    agents: [
      {
        name: "Case Health Monitor Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Daily scans every active case and flags ones that are stuck (no treatment update in 30+ days, no contact with client in 14 days, SOL within 90 days, no demand sent post-MMI). Pushes a daily digest to case managers.",
        impact: "Stalled cases get caught in days instead of months, preventing value erosion and client dissatisfaction.",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "MMI Detection Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Monitors incoming medical records for language indicating Maximum Medical Improvement. Flags the case manager to begin demand prep immediately.",
        impact: "Demand prep starts the day MMI is reached instead of weeks later when someone finally notices.",
        tools: ["Ingrid", "LitifAI", "Litify"]
      },
      {
        name: "Treatment Gap Alerter",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Tracks treatment frequency per client. If a client misses appointments or has a gap > 21 days, alerts the case manager to follow up. Also flags to attorney for settlement strategy.",
        impact: "Protects case value by catching treatment gaps before they become a defense argument.",
        tools: ["Litify", "LitifAI", "SMS Magic"]
      },
      {
        name: "Inbound Document Classifier",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Every document that hits your inbox (email, fax, portal) is automatically read, classified (medical record, bill, insurance letter, court doc, etc.), linked to the correct matter, and saved to the right folder.",
        impact: "Eliminates the document sorting bottleneck that buries paralegals every morning.",
        tools: ["Ingrid", "LitifAI", "Litify"]
      },
      {
        name: "Deadline & Docket Monitor",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Tracks all case deadlines — discovery cutoffs, mediation dates, filing deadlines, SOL dates — and sends escalating alerts to attorneys and staff as deadlines approach.",
        impact: "Zero missed deadlines across the entire firm, with escalation that prevents last-minute scrambles.",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "Case Timeline Auto-Builder",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Pulls dates from records, correspondence, and notes to auto-generate a chronological case timeline. Updates dynamically as new records arrive.",
        impact: "Attorneys have a living case timeline that builds itself instead of spending hours assembling one manually.",
        tools: ["LitifAI", "Ingrid", "Litify"]
      },
      {
        name: "Inbound Mail Routing Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Reads incoming emails and faxes and routes each one to the right person or queue based on content (new demand response goes to attorney, med bill goes to paralegal, etc.).",
        impact: "Every inbound communication reaches the right person immediately instead of sitting in a shared inbox.",
        tools: ["Outlook", "Litify", "Make"]
      }
    ]
  },

  med: {
    title: "Medical & Records",
    desc: "AI agents that handle the most time-consuming part of PI — chasing, reading, organizing, and summarizing medical records and bills.",
    agents: [
      {
        name: "Record Request Automation Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Automatically sends record requests to all known providers via fax, portal, and certified mail on intake. Tracks which providers have responded and which haven't. Sends follow-up requests at set intervals.",
        impact: "Records requested on day one and followed up automatically, cutting retrieval time by 50% or more.",
        tools: ["NOKA", "Litify", "Make"]
      },
      {
        name: "Medical Chronology Builder",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Reads incoming records and builds a structured medical chronology automatically — visits, diagnoses, treatment, medications, and gaps — formatted for demand and litigation.",
        impact: "Turns 500+ pages of records into a structured chronology in minutes instead of 8+ hours of paralegal time.",
        tools: ["LitifAI", "Ingrid", "Litify"]
      },
      {
        name: "Missing Bill & Record Detector",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Cross-references known providers against records and bills received. Identifies gaps (e.g., 10 chiro visits but only 6 bills received) and auto-sends requests for missing items.",
        impact: "No missing record goes unnoticed before demand, preventing case value leakage.",
        tools: ["Litify", "LitifAI", "NOKA"]
      },
      {
        name: "Bill Audit Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Reviews all medical bills for overbilling, duplicate charges, and CPT code inconsistencies. Flags for negotiation or dispute before demand is sent.",
        impact: "Catches billing errors and duplicates that inflate costs and complicate lien negotiations.",
        tools: ["Litify", "LitifAI", "Ingrid"]
      },
      {
        name: "Med Pay Tracker",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Tracks med pay coverage, payments made, and reimbursement status for every client. Auto-alerts when med pay is exhausted or when reimbursement is owed.",
        impact: "No med pay dollar left on the table and no reimbursement deadline missed.",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "Provider Call Agent (Records)",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "AI voice agent that calls provider offices to confirm records are ready, request expedited release, and follow up on outstanding authorizations — without a human making the call.",
        impact: "Eliminates hours of staff phone time chasing records from provider offices every week.",
        tools: ["Call Sophia", "NOKA", "Litify"]
      },
      {
        name: "Insurance Coverage Extractor",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Reads declarations pages and insurance correspondence to extract policy limits, UM/UIM coverage, med pay amounts, and claim numbers. Logs directly to the matter.",
        impact: "Coverage details extracted and logged in seconds instead of manual review and data entry.",
        tools: ["Ingrid", "LitifAI", "Litify"]
      }
    ]
  },

  docgen: {
    title: "Doc Generation",
    desc: "AI agents that draft, generate, and manage the documents your firm produces — from demand letters to discovery to settlement agreements.",
    agents: [
      {
        name: "One-Click Demand Generator",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Pulls case facts, medical chronology, liability narrative, and bill totals from your CMS to draft a complete demand letter. Attorney reviews and edits — not drafts.",
        impact: "Reduces demand prep from 6-8 hours to 30 minutes of attorney review and refinement.",
        tools: ["Litify", "LitifAI", "Sapio", "Adobe"]
      },
      {
        name: "Discovery Auto-Drafter",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Generates tailored interrogatories, RFPs, and RPAs based on the case type, injuries, and jurisdiction. Pulls from a best-practices library and adapts to the specific facts.",
        impact: "Cuts discovery prep time by 75% while maintaining consistent quality across all cases.",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Settlement Agreement Generator",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-populates settlement agreements and releases from CMS data the moment a settlement is reached. Routes immediately for e-sign from all parties.",
        impact: "Settlement docs ready in minutes instead of days, accelerating the path to disbursement.",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Pleading & Motion Drafter",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Drafts complaints, motions to compel, motions for summary judgment, and other common pleadings from templates enhanced with case-specific facts. Attorney reviews and finalizes.",
        impact: "Saves 3-5 hours per pleading while maintaining firm quality standards.",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Lien Negotiation Letter Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Drafts lien negotiation letters to Medicare, Medicaid, health insurers, and medical providers automatically based on settlement amount and lien balances.",
        impact: "Generates all lien letters in one batch, saving 2+ hours per settlement close.",
        tools: ["Litify", "LitifAI", "Adobe"]
      },
      {
        name: "Court Filing Prep Agent",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Assembles filing packages (complaint + exhibits + summons + cover sheet), checks jurisdiction-specific requirements, and prepares the e-filing submission. Attorney reviews before submit.",
        impact: "Eliminates filing rejections and saves 1-2 hours of assembly time per filing.",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Blueprint / Template Manager",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Maintains a living library of your best demand letters, motions, and agreements. AI suggests the best template based on case type and auto-fills known fields.",
        impact: "Institutional knowledge preserved so new staff produce quality documents from day one.",
        tools: ["Litify", "LitifAI", "Google Workspace"]
      }
    ]
  },

  settle: {
    title: "Settlement & Disbursement",
    desc: "AI agents that manage the critical (and often delayed) path from settlement agreement to money in the client's pocket.",
    agents: [
      {
        name: "Lien Resolution Orchestrator",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Once settlement is confirmed, auto-identifies all outstanding liens (Medicare, Medicaid, health, provider, workers comp), requests payoff amounts, and tracks resolution status for each.",
        impact: "Lien resolution starts immediately instead of waiting weeks, cutting disbursement delays significantly.",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Disbursement Calculator Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-calculates the client's net settlement after fees, costs, and lien payoffs. Generates a clear disbursement breakdown memo for the client prior to the closing call.",
        impact: "Accurate disbursement sheets in seconds, eliminating calculation errors and client confusion.",
        tools: ["Litify", "LitifAI", "Make"]
      },
      {
        name: "Settlement Status Communicator",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Auto-notifies clients at each stage: settlement reached, lien negotiation in progress, docs sent for signature, check received, disbursement date set. Reduces inbound calls by 60%+.",
        impact: "Clients stay informed at every step, dramatically reducing 'where's my money?' calls.",
        tools: ["SMS Magic", "Hona", "Litify"]
      },
      {
        name: "Medical Provider Pay Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Manages the issuance of lien payoff checks to medical providers after settlement — confirms amounts, generates payment letters, and tracks confirmation of receipt.",
        impact: "Provider payments handled systematically instead of ad hoc, preventing missed payments and disputes.",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Post-Settlement Survey Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "After disbursement, auto-sends a satisfaction survey and, for happy clients, triggers a Google/Avvo review request. Flags unhappy clients for immediate partner follow-up.",
        impact: "Turns every closed case into a reputation-building opportunity while catching problems early.",
        tools: ["SMS Magic", "Zapier", "Litify"]
      },
      {
        name: "Referral Request Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "After a successful settlement close, auto-sends a personalized message to the client thanking them and asking if they know anyone who needs help. Tracks referrals back to source.",
        impact: "Systematizes the referral ask so every happy client becomes a potential lead source.",
        tools: ["SMS Magic", "Mailerlight", "Litify"]
      }
    ]
  },

  ins: {
    title: "Insurance & Claims",
    desc: "AI agents that handle the back-and-forth with insurance companies — one of the biggest time drains in any PI firm.",
    agents: [
      {
        name: "Claim Setup Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "AI voice agent that calls the at-fault insurer to open a claim, get a claim number, confirm adjuster assignment, and log all info to the matter — immediately after intake is complete.",
        impact: "Claims opened on day one instead of waiting for staff to find time to make the call.",
        tools: ["Call Sophia", "Litify", "CallRail"]
      },
      {
        name: "Coverage Investigation Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Investigates all potentially applicable coverage: at-fault BI, UM/UIM, med pay, umbrella, commercial policies, and employer policies. Flags any coverage the team might have missed.",
        impact: "Finds coverage other firms miss, potentially doubling case value on thin-policy cases.",
        tools: ["LitifAI", "Ingrid", "Litify"]
      },
      {
        name: "Adjuster Follow-Up Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Tracks outstanding items from adjusters (liability decision, offer, recorded statement request, etc.) and sends automated follow-ups via phone and email at set intervals.",
        impact: "No adjuster request or outstanding item goes without follow-up, keeping claims moving.",
        tools: ["Call Sophia", "Outlook", "Litify"]
      },
      {
        name: "Offer Evaluation Agent",
        priority: "high",
        complexity: "Complex impl.",
        desc: "When an offer comes in, runs a comparison against similar settled cases in your database, current medical specials, future treatment estimates, and wage loss. Gives attorney a data-backed counter recommendation.",
        impact: "Data-driven negotiation decisions replace gut feelings, improving settlement outcomes.",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Recorded Statement Monitor",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Flags immediately when an insurance company requests a recorded statement from your client. Auto-notifies the attorney and sends the client instructions to decline and contact the firm.",
        impact: "Prevents clients from giving damaging recorded statements before the attorney can intervene.",
        tools: ["Litify", "SMS Magic", "Outlook"]
      },
      {
        name: "UIM/UM Demand Tracker",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Specifically tracks the status of UM/UIM claims separately from BI claims — deadlines, demands sent, offers received, and arbitration/litigation status.",
        impact: "UM/UIM claims get dedicated tracking so they don't get lost behind the primary BI claim.",
        tools: ["Litify", "LitifAI"]
      }
    ]
  },

  lit: {
    title: "Litigation",
    desc: "AI agents that support your litigation workflow — from filing to trial prep — so your attorneys can focus on advocacy, not administration.",
    agents: [
      {
        name: "Deposition Prep Agent",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Using the case file, generates a tailored deposition outline for each witness — key questions, anticipated answers, exhibits to use, and areas to probe based on the specific facts.",
        impact: "Deposition prep cut from 3+ hours to 30 minutes of attorney review and customization.",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Expert Witness Coordinator Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Manages the full expert witness workflow — outreach, engagement letters, deadline tracking, report receipt, and scheduling — for every expert on every case.",
        impact: "No expert deadline missed and no engagement letter forgotten across the entire caseload.",
        tools: ["Litify", "Calendly", "Outlook", "Adobe"]
      },
      {
        name: "Discovery Response Monitor",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Tracks every outstanding discovery request — sent and received — with deadlines. Escalates to attorney when responses are overdue. Auto-drafts meet-and-confer letters when needed.",
        impact: "Complete visibility into discovery status across all cases with automatic escalation.",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "Mediation Prep Package Builder",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-assembles the mediation brief, case timeline, damages summary, and comparable verdicts into a ready-to-send package for the mediator and opposing counsel.",
        impact: "Mediation packages assembled in hours instead of days of paralegal time.",
        tools: ["Litify", "LitifAI", "Adobe", "Sapio"]
      },
      {
        name: "Trial Exhibit Organizer",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Ingests all case documents and organizes them by exhibit category. Generates exhibit lists, labels, and a cross-reference index. Flags any exhibit with authenticity or admissibility concerns.",
        impact: "Trial-ready exhibit packages in hours instead of weeks of manual organization.",
        tools: ["Litify", "LitifAI", "Adobe", "Ingrid"]
      },
      {
        name: "Verdict & Settlement Database Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "After every case closes, auto-populates your internal verdict/settlement database with case type, injuries, liability %, demand, offer, settlement, and jurisdiction. Searchable by future attorneys.",
        impact: "Builds institutional knowledge that makes every future negotiation and valuation more accurate.",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Opposing Counsel Monitor",
        priority: "low",
        complexity: "Easy impl.",
        desc: "Tracks opposing counsel's track record, tendencies, recent cases, and verdicts. Surfaces intelligence before each hearing and mediation.",
        impact: "Attorneys walk into every hearing knowing the other side's patterns and preferences.",
        tools: ["Lexis", "Sapio", "LitifAI"]
      }
    ]
  },

  comms: {
    title: "Client Communication",
    desc: "AI agents that keep clients informed, compliant with treatment, and engaged — without burning out your staff.",
    agents: [
      {
        name: "Case Status Update Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Proactively pushes case status updates to clients at every milestone — demand sent, offer received, counter made, mediation scheduled — so they never have to call to ask.",
        impact: "90% reduction in 'what's happening with my case?' calls that consume staff time.",
        tools: ["Hona", "SMS Magic", "Litify"]
      },
      {
        name: "Treatment Compliance Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Monitors treatment attendance from provider updates. If a client misses appointments, auto-sends SMS reminders, makes AI calls, and alerts the case manager if non-compliance continues.",
        impact: "Protects case value by keeping clients on track with treatment before gaps become a problem.",
        tools: ["SMS Magic", "Call Sophia", "Litify"]
      },
      {
        name: "Inbound Case Check-In Voice Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Client calls the firm's number and the AI answers, recognizes the client, tells them the current status of their case, and answers common questions — transferring to staff only if needed.",
        impact: "Clients get instant answers 24/7 and staff only handle calls that actually need a human.",
        tools: ["Call Sophia", "Litify", "LitifAI"]
      },
      {
        name: "Appointment Reminder Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Sends multi-channel reminders (SMS, email, voice) for all appointments — consultations, medical appointments, depositions, and mediations. Confirms attendance and reschedules no-shows.",
        impact: "Reduces no-shows by 60%+ across all appointment types firm-wide.",
        tools: ["Calendly", "SMS Magic", "Call Sophia"]
      },
      {
        name: "Document Signature Chaser",
        priority: "high",
        complexity: "Easy impl.",
        desc: "When a document is sent for e-sign and not completed within 24 hours, auto-sends reminders via SMS and email every day until signed. Escalates to staff after 72 hours.",
        impact: "Documents get signed in days instead of weeks, keeping cases moving forward.",
        tools: ["Adobe", "SMS Magic", "Litify"]
      },
      {
        name: "Non-Compliant Client Escalation",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "If a client is repeatedly non-compliant with treatment, unresponsive, or unreachable, the agent escalates through a defined sequence — SMS, call, certified letter — and ultimately alerts the attorney for case review.",
        impact: "Structured escalation process ensures no client is quietly abandoned or allowed to tank their own case.",
        tools: ["SMS Magic", "Call Sophia", "Litify", "Mailerlight"]
      },
      {
        name: "Settlement Explanation Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Before the settlement call, AI sends a personalized explainer video or message breaking down the settlement amount, fees, liens, and net-to-client in plain English.",
        impact: "Clients understand their settlement before the call, leading to faster sign-offs and fewer disputes.",
        tools: ["Hona", "LitifAI", "Litify"]
      }
    ]
  },

  ops: {
    title: "Firm Operations",
    desc: "AI agents that run the business side of the firm — so leadership can focus on strategy, not administrative firefighting.",
    agents: [
      {
        name: "Daily Case Dashboard Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Every morning, delivers a digest to each case manager and attorney showing: their cases, what needs attention today, upcoming deadlines, and stalled cases — personalized per person.",
        impact: "Every team member starts the day knowing exactly what to focus on without digging through the CMS.",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "Staff Performance Monitor",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Tracks key metrics per staff member: cases managed, tasks completed on time, documents filed, client contacts made, and average case cycle time. Generates weekly reports for leadership.",
        impact: "Objective performance data replaces guesswork, enabling fair and effective management.",
        tools: ["Litify", "LitifAI", "Google Workspace"]
      },
      {
        name: "Cost Advance Tracker",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Tracks every case cost advance (filing fees, expert costs, investigations, medical records) with amounts, dates, and status. Reconciles against settlement at close.",
        impact: "No cost advance is forgotten at settlement, protecting firm profitability on every case.",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "Vendor Invoice Processor",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Reads incoming vendor invoices (court reporters, process servers, investigators), extracts amount and matter, routes for approval, and logs to the case cost ledger — automatically.",
        impact: "Eliminates invoice processing backlog and ensures accurate cost tracking per case.",
        tools: ["Ingrid", "Litify", "Make", "Adobe"]
      },
      {
        name: "Trust Account Reconciliation Agent",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Monitors trust account transactions, reconciles against case settlements and disbursements, and flags any discrepancy to the managing partner immediately. Generates monthly trust reports.",
        impact: "Protects the firm's license by ensuring trust account compliance at all times.",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Marketing ROI Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Tracks every lead from source to signed client to fee collected. Calculates true ROI per marketing channel (Google, TV, billboards, referral attorneys) on a rolling basis.",
        impact: "Marketing spend goes to the channels that actually produce revenue, not just leads.",
        tools: ["CallRail", "Litify", "SEMRush"]
      },
      {
        name: "New Case Profitability Predictor",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Using historical case data, predicts estimated costs, cycle time, and settlement range for new cases at intake. Helps management decide which cases to take and how to staff them.",
        impact: "Data-driven case acceptance decisions that improve firm profitability over time.",
        tools: ["Litify", "LitifAI", "Sapio"]
      }
    ]
  },

  hr: {
    title: "HR & Staff",
    desc: "AI agents that support your team — from hiring to training to daily workflow assistance.",
    agents: [
      {
        name: "AI Paralegal Assistant",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Each paralegal has an AI assistant that knows every case they manage. They can ask it: 'What's missing from the Johnson file?' or 'Draft a follow-up to Dr. Smith's office' and get a useful answer instantly.",
        impact: "Paralegals handle 30%+ more cases with the same effort by offloading routine questions and drafting.",
        tools: ["LitifAI", "Litify", "Sapio"]
      },
      {
        name: "New Hire Training Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Delivers structured onboarding for new staff — quizzes on firm procedures, guides through first tasks on real cases, and answers 'how do we do this here' questions 24/7.",
        impact: "New hires reach productivity in weeks instead of months, with consistent training quality.",
        tools: ["Google Workspace", "Teams", "LitifAI"]
      },
      {
        name: "Procedure & Policy Q&A Bot",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Staff can ask any question about firm procedures, templates, and processes and get an instant answer pulled from your internal knowledge base. 'What's our protocol for a slip and fall intake?' — instant answer.",
        impact: "Eliminates the constant 'how do we do this?' interruptions that pull senior staff away from real work.",
        tools: ["LitifAI", "Google Workspace"]
      },
      {
        name: "Task Delegation Voice Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Attorney speaks: 'After today's call with the Garcias, call their chiropractor and request updated bills, then send the client a treatment reminder for Friday.' AI parses, creates tasks, assigns to staff, and logs to the matter.",
        impact: "Attorneys delegate tasks by speaking naturally instead of typing into the CMS after every call.",
        tools: ["Call Sophia", "Otter AI", "Litify"]
      },
      {
        name: "Time Entry Automation",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Listens to calls, reads emails, and monitors document creation to auto-suggest time entries for billable matters. Reduces time write-offs and captures revenue that would otherwise be lost.",
        impact: "Captures 20-30% more billable time that would otherwise go unrecorded.",
        tools: ["Otter AI", "Litify", "Outlook"]
      }
    ]
  }
};
