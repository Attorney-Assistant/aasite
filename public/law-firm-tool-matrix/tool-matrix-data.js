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
    desc: "AI agents that capture, qualify, and nurture every inbound lead so no case slips through the cracks.",
    agents: [
      {
        name: "Smart Lead Qualifier",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Auto-scores inbound leads on liability strength, injury severity, and insurance coverage using intake call data.",
        impact: "Reduces bad-fit sign-ups by 30%, saves 2+ hrs/day of intaker time",
        tools: ["Call Sophia", "Litify", "CallRail"]
      },
      {
        name: "Intake Form Auto-Filler",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Pulls data from call transcripts and web forms to pre-fill CMS intake records, eliminating double-entry.",
        impact: "Saves 8-12 min per intake; reduces data entry errors by 90%",
        tools: ["Litify", "Call Sophia", "Zapier", "LitifAI"]
      },
      {
        name: "Lead Nurture Sequencer",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Automated multi-channel drip (SMS, email, voice) for leads who haven't signed, with smart timing and escalation.",
        impact: "Recovers 15-20% of leads that would otherwise go cold",
        tools: ["SMS Magic", "Mailerlight", "Call Sophia", "Zapier"]
      },
      {
        name: "Conflict Check Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Searches existing matters, adverse parties, and related entities for conflicts before signing a new client.",
        impact: "Catches conflicts in seconds vs. 15+ min manual search",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "After-Hours Intake Bot",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Handles after-hours and overflow calls, captures full incident details, qualifies leads, and books next-day callbacks.",
        impact: "Captures 100% of after-hours leads; typical firms miss 40%+",
        tools: ["Call Sophia", "Calendly", "Litify"]
      },
      {
        name: "Referral Source Tracker",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Auto-logs and attributes every lead to its marketing source for ROI tracking across channels.",
        impact: "Accurate attribution across all channels; saves 3+ hrs/week of manual tracking",
        tools: ["CallRail", "Litify", "Zapier", "SEMRush"]
      },
      {
        name: "SOL Watchdog",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Flags approaching statutes of limitations on every new intake and open matter, with escalating alerts to attorneys.",
        impact: "Eliminates SOL-related malpractice risk; catches 100% of deadlines",
        tools: ["Litify", "LitifAI", "Outlook"]
      },
      {
        name: "Lead Scoring Optimizer",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "ML model that continuously improves lead scoring based on actual case outcomes and settlement values.",
        impact: "Improves lead quality over time; 20%+ lift in conversion-to-sign rate after 6 months",
        tools: ["Litify", "LitifAI", "Sapio"]
      }
    ]
  },

  onboard: {
    title: "Onboarding",
    desc: "AI agents that streamline new client onboarding from signed retainer to treatment-ready status.",
    agents: [
      {
        name: "Onboarding Checklist Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Tracks completion of all onboarding steps per client, auto-sends reminders for missing items.",
        impact: "Reduces onboarding time by 40%; no client falls through the cracks",
        tools: ["Litify", "SMS Magic", "Zapier"]
      },
      {
        name: "Document Collection Bot",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-requests missing documents via SMS/email with smart follow-up cadence until complete.",
        impact: "Cuts document collection time from weeks to days; 85%+ completion rate",
        tools: ["SMS Magic", "Hona", "Litify", "Make"]
      },
      {
        name: "Welcome Packet Generator",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Auto-generates personalized welcome materials based on case type, attorney, and practice area.",
        impact: "Professional first impression; saves 20 min per new client",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Client ID Verification",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Automated identity verification and conflict checks during onboarding.",
        impact: "Eliminates manual ID checks; flags issues before work begins",
        tools: ["Litify", "Zapier"]
      },
      {
        name: "Treatment Plan Advisor",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Suggests initial treatment referrals based on injury type, severity, and provider network.",
        impact: "Gets clients into treatment faster; improves case value trajectory",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Fee Agreement Auto-Router",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Generates correct CFA based on case type and jurisdiction, routes for e-sign immediately.",
        impact: "Reduces CFA turnaround from days to minutes",
        tools: ["Litify", "Adobe", "Make"]
      }
    ]
  },

  case: {
    title: "Case Management",
    desc: "AI agents that keep every case on track, surface insights, and eliminate manual busywork for attorneys and paralegals.",
    agents: [
      {
        name: "Case Status Summarizer",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "One-click AI summary of any case's current state, next steps, and blockers pulled from all case data.",
        impact: "Saves 10+ min per case review; attorneys prep for calls in seconds",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Deadline & SOL Tracker",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Proactive alerts for all case deadlines, court dates, and statutes of limitations with escalation chains.",
        impact: "Zero missed deadlines; reduces malpractice exposure to near-zero",
        tools: ["Litify", "LitifAI", "Outlook", "Teams"]
      },
      {
        name: "Task Auto-Assigner",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Routes tasks to the right team member based on case stage, workload, and specialization.",
        impact: "Eliminates manual task routing; balances workload automatically",
        tools: ["Litify", "LitifAI", "Make"]
      },
      {
        name: "Case Valuation Estimator",
        priority: "high",
        complexity: "Complex impl.",
        desc: "AI-powered case value estimates based on injury type, jurisdiction, liability, and comparable settlements.",
        impact: "Instant preliminary valuations; within 15% of actual settlement 70% of the time",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Document Auto-Labeler",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Classifies and labels every incoming document by type, relevance, and urgency using AI vision.",
        impact: "Processes 200+ docs/day; eliminates manual sorting backlog",
        tools: ["LitifAI", "Ingrid", "Litify"]
      },
      {
        name: "Cross-Matter Pattern Finder",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Identifies patterns across similar cases for strategy insights (same adjuster, same defense counsel, same judge).",
        impact: "Strategic intelligence that manual review can't surface",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Case Milestone Monitor",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Tracks case progression against expected timeline, flags cases that are stalling or off-track.",
        impact: "Identifies stuck cases 2-3 weeks earlier; improves case velocity by 20%",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "Workload Balancer",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Distributes new cases and tasks evenly across team members based on capacity and expertise.",
        impact: "Prevents burnout; ensures consistent client experience across the firm",
        tools: ["Litify", "LitifAI", "Make"]
      }
    ]
  },

  med: {
    title: "Medical & Records",
    desc: "AI agents that automate the retrieval, organization, and analysis of medical records and bills.",
    agents: [
      {
        name: "Medical Record Retrieval Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-sends HIPAA-compliant record requests, tracks responses, and follows up on outstanding requests.",
        impact: "Cuts retrieval time by 50%; no request falls through the cracks",
        tools: ["NOKA", "Litify", "Make", "Adobe"]
      },
      {
        name: "Medical Chronology Builder",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Auto-generates medical chronologies from retrieved records with AI-powered summarization.",
        impact: "Turns 500+ pages into a structured chronology in minutes vs. 8+ hours",
        tools: ["LitifAI", "Ingrid", "Sapio", "Litify"]
      },
      {
        name: "Missing Records Detector",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Analyzes treatment history and flags gaps where records or bills are missing.",
        impact: "Catches missing records before demand; prevents case value leakage",
        tools: ["Litify", "LitifAI", "NOKA"]
      },
      {
        name: "Bill Reconciliation Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Matches medical bills to treatments, flags discrepancies, and calculates running totals.",
        impact: "Accurate bill tracking; catches duplicate charges and billing errors",
        tools: ["Litify", "LitifAI", "Ingrid"]
      },
      {
        name: "Provider Network Mapper",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Maps all treating providers per case with contact info, outstanding requests, and status.",
        impact: "Complete provider picture at a glance; saves 15 min per case",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "Treatment Gap Analyzer",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Flags gaps in client treatment that could reduce case value and alerts paralegals to follow up.",
        impact: "Protects case value; identifies at-risk cases 4+ weeks earlier",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Police Report Auto-Requester",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Auto-files police report requests by jurisdiction with correct forms and fees, tracks fulfillment.",
        impact: "Eliminates manual research per jurisdiction; 100% request accuracy",
        tools: ["Litify", "Make", "Adobe"]
      }
    ]
  },

  docgen: {
    title: "Doc Gen",
    desc: "AI agents that draft, assemble, and manage legal documents so attorneys focus on strategy, not formatting.",
    agents: [
      {
        name: "One-Click Demand Generator",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Pulls case facts, medical chronology, liability narrative, and bill totals from your CMS to draft a complete demand letter. Attorney reviews and edits \u2014 not drafts.",
        impact: "Reduces demand prep from 6-8 hours to 30 minutes",
        tools: ["Litify", "LitifAI", "Sapio", "Adobe"]
      },
      {
        name: "Discovery Auto-Drafter",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Generates tailored interrogatories, RFPs, and RPAs based on the case type, injuries, and jurisdiction. Pulls from a best-practices library and adapts to the specific facts.",
        impact: "Cuts discovery prep time by 75%; consistent quality across all cases",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Settlement Agreement Generator",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-populates settlement agreements and releases from CMS data the moment a settlement is reached. Routes immediately for e-sign from all parties.",
        impact: "Settlement docs ready in minutes, not days; faster disbursement",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Pleading & Motion Drafter",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Drafts complaints, motions to compel, motions for summary judgment, and other common pleadings from templates enhanced with case-specific facts. Attorney reviews and finalizes.",
        impact: "Saves 3-5 hours per pleading; maintains firm quality standards",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Lien Negotiation Letter Agent",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Drafts lien negotiation letters to Medicare, Medicaid, health insurers, and medical providers automatically based on settlement amount and lien balances.",
        impact: "Generates all lien letters in one batch; saves 2+ hours per settlement",
        tools: ["Litify", "LitifAI", "Adobe"]
      },
      {
        name: "Court Filing Prep Agent",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Assembles filing packages (complaint + exhibits + summons + cover sheet), checks jurisdiction-specific requirements, and prepares the e-filing submission. Attorney reviews before submit.",
        impact: "Eliminates filing rejections; saves 1-2 hours per filing",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Blueprint / Template Manager",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Maintains a living library of your best demand letters, motions, and agreements. AI suggests the best template based on case type and auto-fills known fields.",
        impact: "Institutional knowledge preserved; new staff productive on day one",
        tools: ["Litify", "LitifAI", "Google Workspace"]
      }
    ]
  },

  settle: {
    title: "Settlement",
    desc: "AI agents that power data-driven settlement negotiations from initial valuation through disbursement.",
    agents: [
      {
        name: "Settlement Calculator",
        priority: "high",
        complexity: "Complex impl.",
        desc: "AI-powered settlement range estimator using injury type, treatment costs, liability %, jurisdiction data, and comparable verdicts.",
        impact: "Data-driven negotiation; attorneys enter talks with confidence",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Demand Package Assembler",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-compiles all documents needed for a demand package: chronology, bills, records, photos, police report into one organized PDF.",
        impact: "Demand packages assembled in minutes; consistent professional format",
        tools: ["Litify", "LitifAI", "Adobe", "Ingrid"]
      },
      {
        name: "Counteroffer Analyzer",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Evaluates insurance counteroffers against case data, comparable settlements, and risk factors. Provides a recommended response range.",
        impact: "Data-backed negotiation decisions; reduces emotional decision-making",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Disbursement Sheet Generator",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Auto-calculates disbursement breakdowns including attorney fees, costs, liens, and client net from settlement amount.",
        impact: "Accurate disbursement sheets in seconds; eliminates calculation errors",
        tools: ["Litify", "LitifAI", "Make"]
      },
      {
        name: "Client Settlement Communicator",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Generates clear, plain-language settlement explanations and disbursement summaries for client review.",
        impact: "Better client understanding; fewer confused follow-up calls",
        tools: ["Litify", "LitifAI", "Hona", "SMS Magic"]
      },
      {
        name: "Settlement Timeline Tracker",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Monitors every step from demand sent through check received, with alerts for delays at each stage.",
        impact: "Full visibility into settlement pipeline; catches delays 1-2 weeks earlier",
        tools: ["Litify", "LitifAI"]
      }
    ]
  },

  ins: {
    title: "Insurance",
    desc: "AI agents that analyze policies, track claims, and maximize recovery from every available coverage source.",
    agents: [
      {
        name: "Insurance Policy Analyzer",
        priority: "high",
        complexity: "Complex impl.",
        desc: "Extracts coverage limits, exclusions, deductibles, and stacking opportunities from uploaded policy documents.",
        impact: "Complete policy analysis in minutes vs. hours of manual review",
        tools: ["LitifAI", "Ingrid", "Sapio", "Litify"]
      },
      {
        name: "Claims Status Tracker",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-monitors claim status with carriers, logs updates, and alerts team to changes or denials.",
        impact: "No claim falls through the cracks; proactive response to denials",
        tools: ["Litify", "LitifAI", "Make"]
      },
      {
        name: "Lien Resolution Calculator",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Calculates optimal lien reduction strategies across Medicare, Medicaid, ERISA, and private liens.",
        impact: "Maximizes client net recovery; identifies best reduction arguments",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Subrogation Identifier",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Flags potential subrogation interests early in the case lifecycle before they become surprises at settlement.",
        impact: "No subrogation surprises; clean settlements every time",
        tools: ["Litify", "LitifAI"]
      },
      {
        name: "UM/UIM Coverage Finder",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Identifies all potential underinsured and uninsured motorist coverage across household policies.",
        impact: "Finds coverage other firms miss; can double case value on thin-policy cases",
        tools: ["LitifAI", "Ingrid", "Litify"]
      },
      {
        name: "Adjuster Communication Logger",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Auto-logs all adjuster calls, emails, and letters with searchable summaries in the case file.",
        impact: "Complete adjuster interaction history; supports bad faith claims if needed",
        tools: ["Litify", "LitifAI", "CallRail", "Otter AI"]
      }
    ]
  },

  lit: {
    title: "Litigation",
    desc: "AI agents that accelerate litigation prep from research and depositions through trial readiness.",
    agents: [
      {
        name: "Legal Research Agent",
        priority: "high",
        complexity: "Complex impl.",
        desc: "AI-powered case law, statute, and regulation research with jurisdiction-specific results and citation checking.",
        impact: "Research in minutes, not hours; catches relevant authority manual research misses",
        tools: ["Lexis", "Sapio", "LitifAI"]
      },
      {
        name: "Deposition Prep Assistant",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Generates deposition outlines from the case file, including suggested questions organized by topic and impeachment material.",
        impact: "Deposition prep cut from 3 hours to 30 minutes",
        tools: ["Litify", "LitifAI", "Sapio", "Lexis"]
      },
      {
        name: "Motion Brief Drafter",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Drafts common litigation motions with case-specific facts, applicable law, and proper formatting for the jurisdiction.",
        impact: "First draft in 15 minutes; attorney focuses on strategy, not formatting",
        tools: ["LitifAI", "Sapio", "Lexis", "Adobe"]
      },
      {
        name: "Court Calendar Manager",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Tracks all court dates, filing deadlines, and discovery cutoffs with escalating reminders to attorneys and staff.",
        impact: "Zero missed court dates; firm-wide calendar visibility",
        tools: ["Litify", "Outlook", "Google Workspace", "Teams"]
      },
      {
        name: "Expert Witness Coordinator",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Manages expert witness engagement: scheduling, document delivery, report tracking, and deposition coordination.",
        impact: "Streamlines expert management; no expert deadline missed",
        tools: ["Litify", "Calendly", "Outlook", "Adobe"]
      },
      {
        name: "E-Filing Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Prepares and validates e-filing packages against court-specific requirements before submission. Flags formatting issues and missing components.",
        impact: "Eliminates filing rejections; saves re-work time",
        tools: ["Litify", "Adobe", "Make"]
      },
      {
        name: "Trial Notebook Builder",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Compiles and organizes all trial materials: exhibits, witness lists, motions in limine, jury instructions, and opening/closing outlines.",
        impact: "Trial-ready in hours, not weeks; nothing gets left out",
        tools: ["Litify", "LitifAI", "Adobe", "Google Workspace"]
      }
    ]
  },

  comms: {
    title: "Client Comms",
    desc: "AI agents that keep clients informed, engaged, and satisfied throughout the life of their case.",
    agents: [
      {
        name: "Client Status Update Agent",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Sends automated periodic case updates to clients via their preferred channel, personalized with actual case progress.",
        impact: "90% reduction in 'what's happening with my case?' calls",
        tools: ["Hona", "SMS Magic", "Litify", "Mailerlight"]
      },
      {
        name: "Appointment Reminder Bot",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Multi-channel appointment reminders (SMS + email + voice) with smart timing and reschedule links.",
        impact: "Reduces no-shows by 60%+; saves front-desk staff 2+ hrs/day",
        tools: ["Calendly", "SMS Magic", "Call Sophia"]
      },
      {
        name: "Client Satisfaction Monitor",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Post-interaction sentiment tracking via micro-surveys, with alerts for unhappy clients before they become complaints.",
        impact: "Catches dissatisfied clients early; reduces bar complaints and bad reviews",
        tools: ["Litify", "SMS Magic", "Zapier"]
      },
      {
        name: "Secure Message Router",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Routes client portal messages to the right team member based on content and urgency.",
        impact: "Faster response times; no message sits unread",
        tools: ["Hona", "Litify", "LitifAI"]
      },
      {
        name: "Client FAQ Responder",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "AI answers common client questions instantly via chat or portal (case status, next steps, what to bring to appointment).",
        impact: "Instant answers 24/7; reduces inbound call volume by 30%",
        tools: ["Hona", "LitifAI", "Call Sophia"]
      },
      {
        name: "Review Request Agent",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Auto-requests Google and social reviews from clients at optimal moments (post-settlement, positive interaction).",
        impact: "Consistent review generation; builds firm's online reputation on autopilot",
        tools: ["SMS Magic", "Zapier", "Litify", "Mailerlight"]
      }
    ]
  },

  ops: {
    title: "Operations",
    desc: "AI agents that give firm leadership real-time visibility into performance, costs, and process health.",
    agents: [
      {
        name: "KPI Dashboard Builder",
        priority: "high",
        complexity: "Moderate impl.",
        desc: "Auto-generates firm performance dashboards from CMS data: cases by stage, revenue pipeline, team productivity, marketing ROI.",
        impact: "Real-time firm health visibility; replaces manual spreadsheet reporting",
        tools: ["Litify", "LitifAI", "Google Workspace"]
      },
      {
        name: "Automated Report Generator",
        priority: "high",
        complexity: "Easy impl.",
        desc: "Scheduled generation and distribution of key reports: weekly pipeline, monthly financials, quarterly case outcomes.",
        impact: "Reports delivered on schedule without anyone manually pulling them",
        tools: ["Litify", "LitifAI", "Google Workspace", "Outlook"]
      },
      {
        name: "Process Bottleneck Finder",
        priority: "medium",
        complexity: "Complex impl.",
        desc: "Analyzes case flow data to identify operational bottlenecks: where cases stall, which steps take longest, which team members are overloaded.",
        impact: "Data-driven process improvement; finds issues leadership can't see",
        tools: ["Litify", "LitifAI", "Sapio"]
      },
      {
        name: "Vendor Invoice Processor",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Auto-processes vendor invoices: matches to cases, categorizes costs, routes for approval, and tracks payments.",
        impact: "Eliminates invoice processing backlog; accurate cost tracking per case",
        tools: ["Litify", "Make", "Adobe", "Google Workspace"]
      },
      {
        name: "Compliance Monitor",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Tracks regulatory compliance requirements: trust account rules, continuing education, insurance renewals, bar requirements.",
        impact: "Never miss a compliance deadline; protects firm licenses",
        tools: ["Litify", "Outlook", "Google Workspace"]
      }
    ]
  },

  hr: {
    title: "HR & Staff",
    desc: "AI agents that streamline hiring, onboarding, training, and performance management for firm staff.",
    agents: [
      {
        name: "New Hire Onboarding Agent",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Automates employee onboarding: system access provisioning, training assignment, policy acknowledgment, equipment requests.",
        impact: "New hires productive on day one; nothing falls through the cracks",
        tools: ["Google Workspace", "Teams", "Make", "Zapier"]
      },
      {
        name: "Time & Attendance Tracker",
        priority: "medium",
        complexity: "Easy impl.",
        desc: "Monitors staff attendance, PTO balances, and schedule adherence with automated alerts for managers.",
        impact: "Eliminates manual timekeeping; fair and consistent attendance tracking",
        tools: ["Google Workspace", "Teams", "Zapier"]
      },
      {
        name: "Training Module Assigner",
        priority: "low",
        complexity: "Easy impl.",
        desc: "Auto-routes required training (compliance, software, process updates) to staff based on role and tracks completion.",
        impact: "100% training compliance; no one misses required updates",
        tools: ["Google Workspace", "Teams", "Make"]
      },
      {
        name: "Performance Review Aggregator",
        priority: "medium",
        complexity: "Moderate impl.",
        desc: "Compiles performance data from CMS (tasks completed, cases handled, client satisfaction) for review periods.",
        impact: "Objective performance reviews backed by data, not just manager impressions",
        tools: ["Litify", "LitifAI", "Google Workspace"]
      },
      {
        name: "Team Communication Digest",
        priority: "low",
        complexity: "Easy impl.",
        desc: "Generates a daily digest of key internal communications, announcements, and action items from Teams/email.",
        impact: "No one misses important updates; reduces information overload",
        tools: ["Teams", "Outlook", "Google Workspace", "Otter AI"]
      }
    ]
  }
};
