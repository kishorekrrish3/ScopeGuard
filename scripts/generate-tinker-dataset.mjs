import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATASET = [
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 2.1: Excludes Web Admin Portals, RBAC, and Dark Mode. Section 3.2: $85/hr change order.",
      message: "Hey! Quick thought for launch: can we also get a lightweight web admin portal so operations can manage user roles (Admin, Moderator) and view audit logs?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 96,
      violatedClause: "Section 2.1 - Deliverables & Scope Exclusions",
      estimatedExtraHours: 14,
      revenueAtRisk: 1190,
      reasoning: "Section 2.1 explicitly excludes desktop Web Admin Portals and Role-Based Access Control hierarchies from the fixed project milestone.",
      lineItems: [
        { item: "Web Admin Role-Based Views", hours: 9, cost: 765 },
        { item: "Audit Logging & Security Middleware", hours: 5, cost: 425 }
      ],
      changeOrderEmail: "Hi Team,\n\nThanks for reaching out! Regarding the web admin portal and user roles:\n\nPer Section 2.1 of our signed SOW, our agreed scope covers the 6 mobile screens and excludes desktop web admin tools and RBAC roles.\n\nWe would love to build this out! Under Section 3.2, we can schedule this as a Change Order at our standard $85/hr rate (14 hrs — $1,190.00).\n\nPlease reply 'Approved' to authorize this amendment.\n\nBest regards,\nEngineering Lead"
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 2.1: Excludes Stripe/Plaid/Finicity server-side webhooks. Section 3.2: $85/hr change order.",
      message: "Could you wire up Stripe Sandbox test mode with custom checkout payment split webhooks for Apple Pay and 4 country checkout variations by this Friday?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 94,
      violatedClause: "Section 2.1 - Scope Exclusions",
      estimatedExtraHours: 16,
      revenueAtRisk: 1360,
      reasoning: "Section 2.1 excludes external third-party payment gateways and server webhook pipelines from the client mobile scope.",
      lineItems: [
        { item: "Stripe Sandbox & Custom Webhook Architecture", hours: 10, cost: 850 },
        { item: "Multi-Checkout Country Routing & QA", hours: 6, cost: 510 }
      ],
      changeOrderEmail: "Hi Team,\n\nPer Section 2.1 of our SOW, server-side Stripe sandbox and webhook pipelines are excluded from the current milestone. We can deliver this via Change Order #02 (16 hrs — $1,360.00 at $85/hr).\n\nPlease reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 4.5: Includes up to 2 rounds of visual polish on agreed screens.",
      message: "Can we tweak the primary button color on the Login screen from #0052FF to #0047E0 and adjust the padding from 12px to 16px to match our updated brand guide?"
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 8,
      violatedClause: "None (Covered under Section 4.5 - Revisions Policy)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Visual color and button padding adjustments on agreed mobile screens fall directly within Section 4.5's allocated visual polish rounds.",
      lineItems: [
        { item: "Login CTA Button Hex & Padding Adjustment", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nReceived! The button color adjustment (#0047E0) and padding refinements fall within our Section 4.5 visual polish allowance and will be deployed in today's build at zero extra cost.\n\nBest regards,\nEngineering Lead"
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 2.4: Excludes ERP/WMS inventory synchronization and multi-currency tax engines. Section 3.1: $95/hr change order.",
      message: "We need NetSuite ERP inventory sync webhooks so out-of-stock items update every 30 seconds across warehouses."
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 98,
      violatedClause: "Section 2.4 - Architecture & Integration Exclusions",
      estimatedExtraHours: 20,
      revenueAtRisk: 1900,
      reasoning: "Section 2.4 explicitly identifies NetSuite ERP synchronization and custom inventory middleware as out-of-scope.",
      lineItems: [
        { item: "NetSuite SOAP/REST Webhook Connector", hours: 12, cost: 1140 },
        { item: "Queue Worker & Conflict Resolution Logic", hours: 8, cost: 760 }
      ],
      changeOrderEmail: "Hi Team,\n\nPer Section 2.4 of our signed SOW, custom NetSuite ERP inventory sync is excluded. We can architect this as Change Order #03 (20 hrs — $1,900.00 at $95/hr). Reply 'Approved' to schedule."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 3.1: Change orders at $95/hr.",
      message: "What if we explore an AI semantic search bar using vector embeddings instead of standard Shopify search? Can you check what's involved?"
    },
    output: {
      verdict: "AMBIGUOUS_TRAP",
      riskScore: 74,
      violatedClause: "Section 3.1 - Scope Boundaries & Hourly Extension",
      estimatedExtraHours: 8,
      revenueAtRisk: 760,
      reasoning: "The client is requesting open-ended architectural research into vector embeddings without an approved technical discovery budget.",
      lineItems: [
        { item: "AI Vector Search Feasibility & Schema Spike", hours: 8, cost: 760 }
      ],
      changeOrderEmail: "Hi Team,\n\nAI semantic search is an intriguing enhancement! To evaluate API costs, latency, and catalog indexing, we recommend an 8-hour technical discovery spike under Section 3.1 ($760 at $95/hr). Let us know if you'd like to initiate this!"
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 2.1: Excludes Dark Mode theme tokens/switching. Section 3.2: $85/hr change order.",
      message: "Our CEO just tested the app at night and insists we must have a complete Dark Mode toggle with OLED pitch black cards."
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 92,
      violatedClause: "Section 2.1 - Scope Exclusions",
      estimatedExtraHours: 12,
      revenueAtRisk: 1020,
      reasoning: "Section 2.1 specifically lists Dark Mode theme tokens and dynamic theme switching under excluded deliverables.",
      lineItems: [
        { item: "Dark Theme Token Palette & CSS-in-JS Tokens", hours: 7, cost: 595 },
        { item: "6-Screen Contrast Audit & Accessibility Testing", hours: 5, cost: 425 }
      ],
      changeOrderEmail: "Hi Team,\n\nDark mode looks fantastic on mobile OLED! Per Section 2.1, Dark Mode was excluded from the fixed MVP scope. We can implement complete system dark mode via Change Order (12 hrs — $1,020.00 at $85/hr). Reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens including Transaction Feed. Section 4.5: Bug fixes covered.",
      message: "On iPhone 15 Pro, the timestamp text in the Transaction Feed overlaps with the dollar amount when over $10,000."
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 4,
      violatedClause: "None (Standard QA & Bug Fix in Section 1.1)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Layout clipping on agreed mobile screen resolutions constitutes a normal QA bug fix included within the Section 1.1 core deliverable.",
      lineItems: [
        { item: "Transaction Feed Currency Text Truncation & Flexbox Fix", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nThanks for catching that layout edge case! This is covered under our Section 1.1 deliverable QA and is being patched immediately in today's branch."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 4.5: Revisions. Section 2.4: Exclusions.",
      message: "Please change the copyright year in the footer from 2025 to 2026 and fix the typo in the Returns Policy paragraph."
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 2,
      violatedClause: "None (Minor Content Polish in Section 1.2)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Correcting footer copy and fixing typographical errors within agreed template content falls cleanly within standard development review.",
      lineItems: [
        { item: "Footer Year & Returns Policy Copy Polish", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nUpdated the copyright year to 2026 and fixed the typo on the Policy template. Changes are live on the preview URL at zero extra cost."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 2.1: Exclusions. Section 3.2: $85/hr change order.",
      message: "Can users have a button to export all their transaction history into a formatted CSV and PDF tax report?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 91,
      violatedClause: "Section 2.1 - Deliverables & Scope Exclusions",
      estimatedExtraHours: 11,
      revenueAtRisk: 935,
      reasoning: "CSV parsing, client-side/server-side PDF rendering engine, and device file system permissions exceed the agreed Transaction Feed display scope.",
      lineItems: [
        { item: "CSV Exporter & Native File Share Intent", hours: 4, cost: 340 },
        { item: "PDF Document Template & Layout Renderer", hours: 7, cost: 595 }
      ],
      changeOrderEmail: "Hi Team,\n\nExporting CSV and PDF tax reports is a great utility feature. Because this requires PDF document generation and file-sharing modules outside Section 1.1, we can add this via Change Order #04 (11 hrs — $935.00 at $85/hr). Reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 2.4: Excludes multi-currency tax engines. Section 3.1: $95/hr change order.",
      message: "We need automated real-time EU VAT and US state nexus tax calculations integrated into the cart drawer via Avalara AvaTax."
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 99,
      violatedClause: "Section 2.4 - Architecture & Integration Exclusions",
      estimatedExtraHours: 24,
      revenueAtRisk: 2280,
      reasoning: "Section 2.4 explicitly names multi-currency automated tax compliance engines (Avalara/Vertex) as excluded deliverables.",
      lineItems: [
        { item: "Avalara AvaTax REST API Client & Address Validation", hours: 14, cost: 1330 },
        { item: "Cart Drawer Tax Breakdown & Rate Caching Engine", hours: 10, cost: 950 }
      ],
      changeOrderEmail: "Hi Team,\n\nPer Section 2.4 of our agreement, automated multi-currency tax engines (Avalara/Vertex) are explicitly out-of-scope. We can implement the AvaTax integration under Change Order #05 (24 hrs — $2,280.00 at $95/hr). Reply 'Approved' to begin development."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 4.5: Revisions.",
      message: "The hero banner image on the homepage looks blurry on 4k screens. Can you switch the srcset to load the 2x resolution asset?"
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 5,
      violatedClause: "None (Responsive Optimization in Section 1.2)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "High-DPI retina asset optimization for the homepage template is standard responsive fidelity covered under Section 1.2.",
      lineItems: [
        { item: "Homepage Hero Next.js Image srcset Optimization", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nWe updated the Next.js image component on the Home template to serve retina 2x density for high-resolution displays. Deployed at zero extra cost."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 3.2: Change orders at $85/hr.",
      message: "Maybe we should consider adding a biometrics fall-back SMS OTP flow just in case users forget their PIN. Can you look into SMS providers?"
    },
    output: {
      verdict: "AMBIGUOUS_TRAP",
      riskScore: 76,
      violatedClause: "Section 3.2 - Change Orders & Overages",
      estimatedExtraHours: 6,
      revenueAtRisk: 510,
      reasoning: "Client is proposing an open-ended SMS OTP fallback mechanism without selecting an SMS gateway (Twilio/AWS SNS) or defining authentication state transitions.",
      lineItems: [
        { item: "SMS Provider Architecture & Security Boundary Spike", hours: 6, cost: 510 }
      ],
      changeOrderEmail: "Hi Team,\n\nAn SMS OTP recovery flow touches critical authentication infrastructure. To assess provider fees (Twilio vs SNS) and carrier regulations, we recommend a 6-hour technical discovery spike under Section 3.2 ($510 at $85/hr). Reply 'Approved' if you'd like us to conduct this assessment."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 2.4: Excludes localized translation pipelines. Section 3.1: $95/hr change order.",
      message: "We need full French and Spanish localized sub-paths (/fr and /es) with a currency selector dropdown in the header."
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 97,
      violatedClause: "Section 2.4 - Architecture & Integration Exclusions",
      estimatedExtraHours: 18,
      revenueAtRisk: 1710,
      reasoning: "Section 2.4 excludes localized translation pipelines and multi-currency routing from the 8 baseline storefront templates.",
      lineItems: [
        { item: "Next.js App Router i18n Sub-path Middleware", hours: 8, cost: 760 },
        { item: "Shopify Storefront Localization Directive & Currency Sync", hours: 10, cost: 950 }
      ],
      changeOrderEmail: "Hi Team,\n\nExpanding to French and Spanish is a huge milestone! Per Section 2.4, i18n localization pipelines and currency selectors are outside our initial 8-template scope. We can implement multi-language sub-paths via Change Order #06 (18 hrs — $1,710.00 at $95/hr). Reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 2.1: Excludes multi-tenant workspace management.",
      message: "Can we support corporate accounts where one parent company has 5 subsidiary company sub-accounts with delegated billing?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 99,
      violatedClause: "Section 2.1 - Deliverables & Scope Exclusions",
      estimatedExtraHours: 26,
      revenueAtRisk: 2210,
      reasoning: "Section 2.1 explicitly excludes multi-tenant workspace management and complex parent-subsidiary billing hierarchies.",
      lineItems: [
        { item: "Multi-Tenant Hierarchy Database Modeling", hours: 14, cost: 1190 },
        { item: "Delegated Account Switching UI & Session Handlers", hours: 12, cost: 1020 }
      ],
      changeOrderEmail: "Hi Team,\n\nParent-subsidiary account structures require enterprise multi-tenancy. Per Section 2.1, this is an excluded deliverable. We can implement this under Change Order #07 (26 hrs — $2,210.00 at $85/hr). Reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: Cart Drawer. Section 4.5: Visual polish.",
      message: "Can the slide-out Cart Drawer slide in from the right edge with a 250ms ease-out spring animation instead of an instant pop?"
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 7,
      violatedClause: "None (Animation Polish in Section 1.2)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Refining the drawer open animation timing falls within front-end UI polish on the contracted Cart Drawer deliverable.",
      lineItems: [
        { item: "Cart Drawer CSS Spring Animation Transition Polish", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nAdded smooth 250ms cubic-bezier transition easing to the Cart Drawer slide-out. Live now on preview at no extra cost!"
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 3.2: Change orders at $85/hr.",
      message: "Can we integrate Okta SAML enterprise Single Sign-On so hedge fund clients can authenticate via their corporate identity provider?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 98,
      violatedClause: "Section 2.1 - Scope Exclusions",
      estimatedExtraHours: 22,
      revenueAtRisk: 1870,
      reasoning: "Enterprise SAML 2.0 / Okta SSO authentication requires external IdP certificate handshakes not included in Section 1.1.",
      lineItems: [
        { item: "Okta SAML 2.0 Service Provider Handshake & Redirect Flow", hours: 12, cost: 1020 },
        { item: "Enterprise Token Validation & Certificate Rotation Logic", hours: 10, cost: 850 }
      ],
      changeOrderEmail: "Hi Team,\n\nEnterprise SAML SSO is essential for corporate funds! Because our baseline SOW specifies standard biometric PIN auth, SAML integration is a separate deliverable under Section 3.2 (22 hrs — $1,870.00 at $85/hr). Reply 'Approved' to authorize."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 3.1: Change orders at $95/hr.",
      message: "Might be cool to see if we can add real-time active visitor counts like '14 people are viewing this jacket right now' on PDP pages."
    },
    output: {
      verdict: "AMBIGUOUS_TRAP",
      riskScore: 78,
      violatedClause: "Section 3.1 - Scope Boundaries",
      estimatedExtraHours: 8,
      revenueAtRisk: 760,
      reasoning: "Real-time presence counts require a dedicated WebSocket server or Redis pub/sub infrastructure outside the stateless headless storefront.",
      lineItems: [
        { item: "Real-time Presence WebSocket / Edge KV Spike", hours: 8, cost: 760 }
      ],
      changeOrderEmail: "Hi Team,\n\nLive visitor counters require WebSocket servers or serverless KV presence clusters. We suggest an 8-hour technical discovery spike under Section 3.1 ($760 at $95/hr) to evaluate infrastructure hosting and reliability before scoping the feature."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: Asset Detail screen. Section 4.5: Revisions.",
      message: "Can we change the stock chart line color from neutral gray to green when daily returns are positive and red when negative?"
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 9,
      violatedClause: "None (Visual Polish in Section 1.1)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Dynamic stroke color based on existing signed return percentages is standard chart rendering logic within the Asset Detail deliverable.",
      lineItems: [
        { item: "Asset Detail Sparkline Conditional Stroke Color", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nUpdated the sparkline chart stroke logic to render green/red based on positive or negative daily return. Deployed on preview at no extra cost."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
      rate: 85,
      clauses: "Section 1.1: 6 Mobile screens. Section 2.1: Scope exclusions. Section 3.2: $85/hr change order.",
      message: "Can you set up an automated Firebase Cloud Messaging server to push notifications whenever a cryptocurrency moves more than 5%?"
    },
    output: {
      verdict: "OUT_OF_SCOPE_CREEP",
      riskScore: 95,
      violatedClause: "Section 2.1 - Scope Exclusions",
      estimatedExtraHours: 15,
      revenueAtRisk: 1275,
      reasoning: "Background price alerting cron workers and APNs/FCM push servers are backend infrastructure outside the mobile UI redesign.",
      lineItems: [
        { item: "Price Volatility Cron Worker & Alert Threshold Engine", hours: 9, cost: 765 },
        { item: "FCM / APNs Push Token Management & Dispatcher", hours: 6, cost: 510 }
      ],
      changeOrderEmail: "Hi Team,\n\nReal-time volatility push alerts require a background indexing worker and FCM push infrastructure. As this is outside our front-end mobile scope, we can implement it under Change Order #08 (15 hrs — $1,275.00 at $85/hr). Reply 'Approved' to proceed."
    }
  },
  {
    instruction: "Audit incoming client request against SOW and output classification, risk score, violated clause, extra hours, and change order email.",
    input: {
      project: "Headless Shopify Storefront Migration (NDA-2026-14)",
      rate: 95,
      clauses: "Section 1.2: 8 storefront templates. Section 4.5: Bug fixes.",
      message: "On mobile Safari, clicking the search icon doesn't autofocus the search input field until you tap it twice."
    },
    output: {
      verdict: "IN_SCOPE",
      riskScore: 3,
      violatedClause: "None (Search Overlay iOS Touch Event Fix)",
      estimatedExtraHours: 0,
      revenueAtRisk: 0,
      reasoning: "Fixing iOS WebKit autofocus behavior on the contracted Search Overlay template is a standard mobile browser QA bug fix.",
      lineItems: [
        { item: "Search Overlay iOS WebKit Autofocus & Touch Event Fix", hours: 0, cost: 0 }
      ],
      changeOrderEmail: "Hi Team,\n\nFixed the iOS Safari autofocus bug by calling .focus() synchronously inside the touch event handler. Tested and live on staging at zero cost."
    }
  }
];

const targetDir = path.resolve(__dirname);
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const outputPath = path.join(targetDir, "tinker-dataset.jsonl");
const lines = DATASET.map((entry) => JSON.stringify(entry)).join("\n") + "\n";
fs.writeFileSync(outputPath, lines, "utf8");

console.log(`[Tinker] Successfully generated ${DATASET.length} high-quality fine-tuning examples at:`);
console.log(outputPath);
