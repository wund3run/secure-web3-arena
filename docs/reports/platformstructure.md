# Secure Web3 Arena Platform Structure & Onboarding Guide

---

## 1. Project Overview

**Secure Web3 Arena** is a comprehensive platform for Web3 security audits, auditor discovery, escrow payments, analytics, and compliance. It connects project owners with security auditors, manages the full audit lifecycle, and provides dashboards, reporting, and community features. The platform is built with a modern TypeScript/React stack, leverages Supabase for backend and authentication, and is designed for extensibility and security.

---

## 2. Quick Start / Onboarding

**Prerequisites:**
- Node.js (v18+ recommended)
- npm (v9+ recommended)
- Supabase project (for backend)

**Setup Steps:**
1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd secure-web3-arena
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Copy and configure environment variables:
   ```sh
   cp .env.example .env
   # Edit .env with your Supabase and API keys
   ```
4. Start the development server:
   ```sh
   npm run dev
   # Visit http://localhost:8080 (or next available port)
   ```
5. Run tests:
   ```sh
   npm run test:unit   # Unit tests
   npx cypress open    # E2E tests
   ```

---

## 3. High-Level Architecture Diagram

```mermaid
graph TD;
  User[User/Browser]
  subgraph Frontend
    App[React App]
    UI[UI Components]
    Auth[Auth Context]
    Dashboard[Dashboards]
    Audit[Audit Flows]
    Marketplace[Marketplace]
    Escrow[Escrow]
    Analytics[Analytics]
    Community[Community]
  end
  subgraph Backend
    Supabase[Supabase (DB, Auth, Functions)]
    Serverless[Serverless Functions]
    Blockchain[Blockchain Integrations]
    Email[Email Service]
  end
  User-->|Interacts|App
  App-->|API Calls|Supabase
  App-->|Serverless|Serverless
  App-->|Wallet|Blockchain
  App-->|Email|Email
  Supabase-->|DB|Supabase
  Serverless-->|DB|Supabase
  Serverless-->|Blockchain|Blockchain
```

---

## 4. Key Workflows

### Authentication Flow
1. User registers or logs in via the React app (email/password, OAuth, or wallet).
2. Supabase Auth handles authentication and session management.
3. 2FA and RBAC enforced via context and Supabase roles.
4. User redirected to appropriate dashboard based on role.

### Audit Request Flow
1. Project owner submits an audit request via the UI.
2. Request is stored in Supabase and triggers notifications.
3. Auditors can view, accept, and manage audit requests.
4. Progress, findings, and reports are tracked and delivered via dashboards.

### Escrow & Payment Flow
1. Payment intent is created when an audit is accepted.
2. Funds are held in escrow (blockchain or off-chain).
3. Upon audit completion, payment is released to the auditor.

---

## 5. Coding Conventions & Best Practices
- Use **TypeScript** for all code in `src/`.
- Prefer **functional React components** and **React hooks**.
- Use **context** for global state (auth, theme, etc.).
- Style with **Tailwind CSS** and utility-first classes.
- Organize code by **domain/feature** (see directory structure).
- Use **async/await** for async code, handle errors with try/catch.
- Write **unit tests** (Vitest) and **E2E tests** (Cypress) for all features.
- Use **environment variables** for secrets and config.
- Document new features and update this guide as needed.

---

## 6. Major Third-Party Dependencies
- **React**: UI framework
- **Supabase**: Backend, Auth, Database, Serverless
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible UI primitives
- **Ethers.js**: Blockchain interactions
- **React Query**: Data fetching/caching
- **Sonner**: Toast notifications
- **Vitest**: Unit testing
- **Cypress**: E2E testing
- **Other**: Framer Motion, Zod, Lucide, etc.

---

## 7. Glossary
- **RBAC**: Role-Based Access Control
- **2FA**: Two-Factor Authentication
- **E2E**: End-to-End (testing)
- **Escrow**: Payment held until audit completion
- **Supabase**: Open-source Firebase alternative (Postgres, Auth, Functions)
- **Audit**: Security review of a smart contract or project
- **Dashboard**: User interface for managing audits, payments, analytics

---

## 8. Where to Start for Common Tasks
- **Add a new page**: `src/pages/`, update routes in `App.tsx`
- **Add a new feature/component**: `src/components/<feature>/`
- **Add a new context/global state**: `src/contexts/`
- **Add a new API/service**: `src/services/` or `src/integrations/`
- **Add a new test**: `src/test/` (unit), `cypress/e2e/` (E2E)
- **Update styles**: `src/styles/`, Tailwind classes in components
- **Update documentation**: `docs/`, `platformstructure.md`

---

## 9. Troubleshooting
- **Port in use**: Vite will auto-increment the port (8080, 8081, 8082...)
- **Missing module error**: Run `npm install` to install dependencies
- **TypeScript config errors**: Ensure `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json` exist
- **Supabase errors**: Check `.env` for correct keys and project URL
- **Wallet/ethereum errors**: Disable browser extensions or check for multiple wallet providers
- **Styling issues**: Ensure Tailwind and PostCSS configs are correct
- **Test failures**: Run tests locally and check logs for details

---

## 10. Contact & Contribution Guidelines
- **Contact**: [Add your team email, Discord, or Slack here]
- **Contributing**:
  - Fork the repo and create a feature branch
  - Follow coding conventions and add tests
  - Open a pull request with a clear description
  - Tag reviewers and respond to feedback
  - Update documentation as needed

---

# Platform Structure Report

This document provides a detailed overview of the Secure Web3 Arena codebase structure, including the purpose of each major directory and notable files. It is intended to help new developers, auditors, and integrators quickly understand the organization and entry points of the project.

---

## 1. Project Root
- **Configuration & Scripts:**
  - `package.json`, `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`: Project, TypeScript, and build configs.
  - `tailwind.config.ts`, `postcss.config.js`: Tailwind CSS and PostCSS configs.
  - `scripts/`: Custom scripts for testing, security, and deployment.
  - `public/`: Static assets (favicon, manifest, offline.html, images, etc.).

---

## 2. Source Code (`src/`)
- **Entry Point:**
  - `src/main.tsx`: Main React entry file.
  - `src/App.tsx`: Root React component, sets up providers and routing.

- **Core App Structure:**
  - **Pages:**
    - `src/pages/`: Top-level route components (e.g., `About.tsx`, `EnhancedAuth.tsx`, `SecuritySettings.tsx`, etc.).
  - **Components:**
    - `src/components/`: Reusable UI and feature components, organized by domain (e.g., `auth/`, `dashboard/`, `audit/`, `ui/`, etc.).
  - **Contexts:**
    - `src/contexts/`: React context providers for global state (e.g., `auth/`, `marketplace/`, etc.).
  - **Hooks:**
    - `src/hooks/`: Custom React hooks, often grouped by feature.
  - **Utils & Libs:**
    - `src/utils/`: Utility functions and helpers (e.g., error handling, ethereum conflict resolver, validation, etc.).
    - `src/lib/`: General-purpose library code (e.g., colors, env, utils).
  - **Types:**
    - `src/types/`: TypeScript type definitions for various domains (e.g., `audit.ts`, `content.ts`, etc.).
  - **Styles:**
    - `src/styles/`: CSS files, including Tailwind and custom animations.

---

## 3. Integrations
- **Supabase:**
  - `src/integrations/supabase/`: Supabase client and related logic.
  - `supabase/`: Supabase serverless functions, migrations, and config.

---

## 4. Testing
- **Automated Tests:**
  - `src/test/`, `src/tests/`, `cypress/`: Unit, integration, and end-to-end tests.
  - `cypress/e2e/`: Cypress E2E test specs.
  - `cypress/support/`: Custom Cypress commands and setup.

---

## 5. Documentation
- **Docs:**
  - `docs/`: Markdown documentation (changelog, deployment, analysis, etc.).
  - `launchScope.md`: Production-readiness and launch checklist.

---

## 6. Domain-Driven Folders
- **Feature/Domain Folders:**
  - Many subfolders in `src/components/` and `src/pages/` are organized by feature or business domain (e.g., `audit/`, `dashboard/`, `marketplace/`, `security/`, `user-journey/`, etc.).
  - This supports modularity and separation of concerns.

---

## 7. UI & Design System
- **UI Components:**
  - `src/components/ui/`: Shared UI primitives (buttons, cards, inputs, tooltips, etc.), some of which use Radix UI and Tailwind CSS.

---

## 8. Error Handling & Security
- **Error Handling:**
  - `src/utils/error-handling/`, `src/pages/ErrorBoundary.tsx`, etc.
- **Security:**
  - `src/components/security/`, `src/utils/security/`, and related hooks/components.

---

## 9. Analytics, Monitoring, Performance
- **Analytics, Monitoring, Performance:**
  - `src/services/analyticsService.ts`, `src/utils/performance/`, etc.

---

## 10. Admin, Compliance, Community, etc.
- **Dedicated folders for admin tools, compliance, community features, etc.**

---

## 11. Summary Table

| Area                | Location(s)                                 | Purpose/Contents                                 |
|---------------------|---------------------------------------------|--------------------------------------------------|
| Config & Scripts    | Root, `scripts/`, `public/`                 | Project setup, build, static assets              |
| Source Code         | `src/`                                      | Main app code, organized by feature/domain       |
| Integrations        | `src/integrations/`, `supabase/`            | External services, serverless functions          |
| Testing             | `src/test/`, `src/tests/`, `cypress/`       | Unit, integration, and E2E tests                 |
| Documentation       | `docs/`, `launchScope.md`                   | Project and launch documentation                 |
| UI/Design System    | `src/components/ui/`                        | Shared UI primitives                             |
| Error/Security      | `src/utils/error-handling/`, `security/`    | Error boundaries, security utilities             |
| Analytics           | `src/services/`, `src/utils/performance/`    | Analytics, monitoring, performance               |
| Admin/Compliance    | `src/components/admin/`, `compliance/`      | Admin tools, compliance, legal                   |

---

## 12. Visual Directory Tree (Partial)

```
secure-web3-arena/
├── package.json
├── tsconfig.json
├── public/
├── scripts/
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── pages/
│   ├── components/
│   ├── contexts/
│   ├── hooks/
│   ├── utils/
│   ├── lib/
│   ├── types/
│   ├── styles/
│   └── integrations/
├── supabase/
├── docs/
└── ...
```

---

## 13. Focused Breakdown: Features & Tech Stack

### A. Major Features (by Domain/Folder)

| Feature/Domain         | Folder(s)                                      | Description/Contents                                      |
|-----------------------|------------------------------------------------|-----------------------------------------------------------|
| Authentication        | src/components/auth/, src/pages/EnhancedAuth.tsx| User login, registration, 2FA, wallet detection, RBAC      |
| Dashboard             | src/components/dashboard/, src/pages/           | User, auditor, admin dashboards, widgets, analytics        |
| Audit Management      | src/components/audit/, src/pages/audit-details/ | Audit request, progress, insights, reporting               |
| Marketplace           | src/components/marketplace/, src/data/          | Auditor discovery, service listings, search                |
| Escrow & Payments     | src/components/escrow/, src/services/           | Payment intent, escrow contract, payment release           |
| Notifications         | src/components/notifications/                   | Real-time notifications, alerts, messaging                 |
| Analytics & Reports   | src/components/analytics/, src/services/        | Analytics dashboards, export tools, scheduled reports      |
| Admin Tools           | src/components/admin/, src/pages/admin/         | User management, audit management, finance, settings       |
| Compliance/Legal      | src/components/compliance/, src/pages/terms/    | Privacy, terms, security policy, legal pages               |
| Community/Forum       | src/components/community/, src/pages/community/ | Forum, posting, moderation, events                         |
| Learning/Tutorials    | src/components/learning/, src/pages/tutorials/  | Educational modules, progress tracking                     |
| Leaderboard           | src/components/leaderboard/, src/pages/         | Scoring, badges, public profiles                           |
| File Upload           | src/components/file-upload/, public/hawkly-uploads/ | File upload, management, and access                   |
| Accessibility         | src/components/accessibility/, src/pages/       | Accessibility testing, compliance, settings                |
| Error Handling        | src/utils/error-handling/, src/pages/ErrorBoundary.tsx | Unified error boundaries, error reporting           |
| Security              | src/components/security/, src/utils/security/   | Security headers, audit logging, incident reporting        |
| Integrations          | src/integrations/, supabase/                    | Supabase, blockchain, email, analytics, etc.               |

---

### B. Coding Languages & Frameworks

- **Primary Language:**
  - TypeScript (mainly in `src/`)
- **Frontend Framework:**
  - React (with functional components, hooks, and context)
- **Styling:**
  - Tailwind CSS, PostCSS, custom CSS
- **UI Libraries:**
  - Radix UI, custom UI components
- **Backend/Serverless:**
  - Supabase (Postgres, Auth, Functions)
  - Node.js scripts (in `scripts/`)
- **Testing:**
  - Vitest (unit), Cypress (E2E)
- **Other Integrations:**
  - Ethers.js (blockchain), Sonner (toasts), React Query, etc.

---

### C. Tech Stack Summary

- **Languages:** TypeScript, JavaScript, SQL (Supabase/Postgres)
- **Frameworks:** React, Node.js, Supabase
- **Styling:** Tailwind CSS, PostCSS
- **Testing:** Vitest, Cypress
- **Build Tools:** Vite
- **UI/UX:** Radix UI, custom components
- **Other:** Ethers.js, Sonner, React Query, etc.

---

**For further details on all folders & features, request a focused breakdown.** 

---

### **Clerk + React (Vite) Integration (Current Best Practice)**

**Official Quickstart:**  
https://clerk.com/docs/quickstarts/react

---

#### **1. Install Clerk React SDK**

```bash
npm install @clerk/clerk-react@latest
```

---

#### **2. Set Environment Variable**

In your `.env.local` (or `.env`):

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_Y2hvaWNlLXNlYWwtNjAuY2xlcmsuYWNjb3VudHMuZGV2JA
```

---

#### **3. Wrap App with `<ClerkProvider>` in `main.tsx`**

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
```

---

#### **4. Use Clerk Components in Your App**

```typescript
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  );
}
```

---

**For more details, see the official Clerk React Quickstart:**  
https://clerk.com/docs/quickstarts/react

---

If you need a step-by-step integration into your existing Vite project, just let me know! 