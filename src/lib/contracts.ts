export interface SowClause {
  section: string;
  title: string;
  content: string;
}

export interface ProjectSow {
  id: string;
  _id?: string;
  projectName: string;
  clientName: string;
  hourlyRate: number;
  currency: string;
  ndaLevel: string;
  clauses: SowClause[];
  storageMode?: "mongodb-atlas" | "local-fallback";
}

export const DEFAULT_PROJECTS: ProjectSow[] = [
  {
    id: "proj_fintech_mvp",
    projectName: "FinTech Mobile Dashboard Redesign (NDA-2026-09)",
    clientName: "Apex Financial Labs LLC",
    hourlyRate: 85,
    currency: "USD",
    ndaLevel: "STRICT_COMMERCIAL_CONFIDENTIAL",
    clauses: [
      {
        section: "Section 1.1",
        title: "Core Deliverables",
        content:
          "Design and build 6 React Native mobile screens: Portfolio Overview, Asset Detail, Transaction Feed, Send/Receive Transfer Modal, Profile/Settings, and Biometric PIN Auth setup.",
      },
      {
        section: "Section 2.1",
        title: "Deliverables & Scope Exclusions",
        content:
          "Explicitly excluded from fixed scope: Web Admin Portals, desktop browser dashboards, Role-Based Access Control (RBAC) permissions or audit logs, Dark Mode theme tokens/switching, multi-tenant workspace management, and direct Stripe/Plaid/Finicity server-side webhook pipelines.",
      },
      {
        section: "Section 3.2",
        title: "Change Orders & Overages",
        content:
          "Any additional deliverable, third-party API integration, or dashboard variant requested outside Section 1.1 shall be billed at the standard contract rate of $85.00/hour via a formal, written Change Order amendment prior to engineering commencement.",
      },
      {
        section: "Section 4.5",
        title: "Revisions & Boundaries",
        content:
          "Scope includes up to 2 rounds of visual polish on agreed mobile screens. Functional modifications, backend endpoints, or administrative tooling constitute new milestone deliverables requiring separate billing approval.",
      },
    ],
  },
  {
    id: "proj_ecom_headless",
    projectName: "Headless Shopify Storefront Migration (NDA-2026-14)",
    clientName: "Kura Apparel Direct Inc.",
    hourlyRate: 95,
    currency: "USD",
    ndaLevel: "STANDARD_NDA_RESTRICTED",
    clauses: [
      {
        section: "Section 1.2",
        title: "Storefront Deliverables",
        content:
          "Implementation of exactly 8 Next.js storefront page templates: Home, Collection Catalog, PDP (Product Detail Page), Slide-out Cart Drawer, Search Overlay, About Brand, Policy/Legal, and Customer Account overview consuming Shopify Storefront GraphQL API.",
      },
      {
        section: "Section 2.4",
        title: "Architecture & Integration Exclusions",
        content:
          "Explicitly excluded: Custom ERP/WMS inventory synchronization webhooks, NetSuite integrations, multi-currency automated tax engines (Avalara/Vertex), localized translation pipelines, and custom checkout logic bypassing standard Shopify Checkout.",
      },
      {
        section: "Section 3.1",
        title: "Scope Boundaries & Hourly Extension",
        content:
          "Any custom microservice, webhook listener, or external checkout mutation outside standard Shopify Storefront API requires a signed Change Order at $95.00/hour before implementation.",
      },
      {
        section: "Section 5.1",
        title: "Acceptance Criteria",
        content:
          "Scope is deemed fulfilled when the 8 specified templates achieve >90 Lighthouse performance score on standard Shopify demo catalog without custom inventory middleware.",
      },
    ],
  },
];
