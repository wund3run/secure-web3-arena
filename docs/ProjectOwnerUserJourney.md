# Project Owner User Journey: Implementation & Verification Guide

## Overview
This document outlines the end-to-end journey for a Project Owner on the Hawkly Web3 Security Audit Platform. It provides actionable implementation steps, acceptance criteria, and verification instructions for each phase, ensuring a seamless and secure experience.

---

## Journey Phases & Steps

### 1. Account Creation & Onboarding
- **Implementation Tasks:**
  - [x] Design and implement the sign-up/login UI (email, wallet, SSO options)
  - [x] Integrate with Supabase/Auth provider for authentication
  - [x] Create onboarding flow (welcome, profile setup, project submission prompt)
- **Acceptance Criteria:**
  - User can create an account and log in
  - On first login, user is guided through onboarding
- **Verification Steps:**
  - Register a new account and confirm onboarding flow appears
  - Attempt login with valid/invalid credentials

---

### 2. Project Submission
- **Implementation Tasks:**
  - [x] Build project submission form (project name, description, repo link, requirements, etc.)
  - [x] Validate and store project data in the database
  - [x] Show confirmation and next steps after submission
- **Acceptance Criteria:**
  - Project Owner can submit a new project with all required fields
  - Data is saved and visible in their dashboard
- **Verification Steps:**
  - Submit a project and check for confirmation
  - Verify project appears in the dashboard and database

---

### 3. Project Review & Approval
- **Implementation Tasks:**
  - [x] Implement admin/auditor review UI for submitted projects
  - [x] Notify Project Owner of approval/rejection
  - [x] Allow Project Owner to edit/resubmit if rejected
- **Acceptance Criteria:**
  - Project status updates (pending, approved, rejected) are visible
  - Notifications are sent on status change
- **Verification Steps:**
  - Submit a project, change its status as admin, and verify notifications
  - Edit and resubmit a rejected project

---

### 4. Auditor Matching & Engagement
- **Implementation Tasks:**
  - [x] Display available auditors and their profiles
  - [x] Implement matching logic (auto/manual selection)
  - [x] Enable Project Owner to select/audit auditor(s)
  - [x] Initiate engagement (chat, contract, etc.)
- **Acceptance Criteria:**
  - Project Owner can view and select auditors
  - Engagement is initiated and tracked
- **Verification Steps:**
  - Select an auditor and verify engagement starts
  - Check for chat/contract initiation

---

### 5. Audit Progress & Communication
- **Implementation Tasks:**
  - [x] Show audit progress/status in dashboard
  - [x] Enable messaging between Project Owner and Auditor
  - [x] Provide notifications for key milestones
  - [x] Implement offer status badges and notification feed for engagement offers
  - [x] Add granular offer negotiation (counter-offers)
  - [x] Add automated status refresh (polling/real-time updates)
- **Acceptance Criteria:**
  - Project Owner can track audit status and communicate with auditor
  - Notifications are timely and accurate
  - Offer negotiation and status updates are visible in real time
- **Verification Steps:**
  - Simulate audit progress and verify dashboard updates
  - Send/receive messages between parties
  - Propose, accept, reject, and counter engagement offers and verify UI/notifications

---

### 6. Audit Review & Completion
- **Implementation Tasks:**
  - [x] Display audit report and findings to Project Owner
  - [x] Allow Project Owner to request clarifications or re-audit
  - [x] Mark audit as complete upon acceptance
  - [x] Add completion confirmation and feedback prompt
- **Acceptance Criteria:**
  - Project Owner can view/download audit report
  - Can request clarifications or accept audit
  - Can submit feedback after completion
- **Verification Steps:**
  - Review audit report, request clarification, and accept completion
  - Submit feedback and verify it is stored and visible to auditor

---

### 7. Payment & Feedback
- **Implementation Tasks:**
  - [x] Integrate payment system (crypto/fiat)
  - [x] Enable Project Owner to pay auditor upon completion
  - [x] Collect feedback/rating for auditor
  - [x] Implement payment status notifications (in-app/email)
  - [x] Generate and display downloadable payment receipts
  - [ ] Add dispute resolution flow (upcoming)
  - [ ] Add feedback analytics/export for auditors (upcoming)
- **Acceptance Criteria:**
  - Payment can be made securely
  - Feedback is collected and stored
  - Payment notifications and receipts are available
  - Disputes and analytics features are planned
- **Verification Steps:**
  - Complete payment flow and verify transaction
  - Submit feedback and check it appears in auditor profile
  - Download receipts and verify content

---

## Implementation Checklist
- [x] Account creation & onboarding
- [x] Project submission
- [x] Project review & approval
- [x] Auditor matching & engagement
- [x] Audit progress & communication
- [x] Audit review & completion
- [x] Payment & feedback (core)
- [ ] Dispute resolution (upcoming)
- [ ] Feedback analytics/export (upcoming)

---

## Testing & Verification Instructions
1. **Manual Testing:**
   - Follow the verification steps for each phase above as a Project Owner user.
   - Use different user accounts to test edge cases (e.g., rejected projects, multiple auditors).
2. **Automated Testing:**
   - Write E2E tests for critical flows (Cypress/Playwright recommended).
   - Cover authentication, project submission, auditor selection, payment, and receipts.
3. **Bug Reporting:**
   - Log any issues found during testing in the issue tracker with clear reproduction steps.

---

## Notes
- Update this document as the journey evolves or new features are added.
- Use this as a reference for onboarding new team members or for QA verification.
- **Current as of this update.**

---

## Advanced Enhancements (Planned & In Progress)

### Dispute Resolution (Upcoming)
- Allow project owners and auditors to raise, track, and resolve payment or audit disputes.
- Features: "Raise Dispute" button, dispute submission modal, status tracking, admin workflow, and UI for both parties.

### Feedback Analytics & Export (Upcoming)
- Provide auditors with analytics on their feedback (average rating, trends, common feedback).
- Allow exporting feedback as CSV or PDF.
- Add filters and summary visualizations.

### Receipt/UI Customization (Planned)
- Enhance PDF receipts with branding, legal text, and more details.
- Improve receipts UI with icons, filters, and details modals.
- Allow emailing receipts directly from the UI.

---

*This document should be revised as new features are completed or requirements change.* 