# Hawkly Platform PRD: User Journey Mapping & Enhancement Plan

## 1. Project Owner Journey
### Pages
- Landing: `/`
- Authentication: `/auth`, `/auth/callback`
- Dashboard: `/dashboard`
- My Audits Dashboard: `/audits` (Missing, needs implementation)
- Project Details: `/project/:id`
- Project Dashboard: `/project-dashboard`
- Submit Project: `/submit-project`
- Audit Results: `/audit-results/:id`
- Support: `/support`, `/contact`
- Profile: `/profile`, `/profile/settings`


### New Features & Enhancements (July 2025)

#### Dedicated "My Audits" Dashboard
- **Page:** `/my-audits`
- **Purpose:** Track all audit requests, statuses, and actions for project owners.
- **Features:** List audits, status, creation date, quick actions, filtering, sorting, security event logging.
- **Enhancement:** Real-time updates, analytics, notifications.

#### Approval Center & Workflows (Super Admin)
- **Page:** `/approval-center`
- **Purpose:** Centralized dashboard for super admins to review, approve, or reject requests.
- **Features:** List pending requests, approve/reject actions, audit trail.
- **Enhancement:** Bulk actions, advanced filtering, notification system.

#### Enhanced Onboarding, Notifications, Collaboration

- **Onboarding:**
  - Personalized onboarding steps based on user type and project context
  - Real-time progress indicators and contextual help
  - Quick actions and tailored welcome screens

- **Notifications:**
  - Real-time notification center for audit status, approvals, collaboration invites
  - Multi-channel support (in-app, email, push)
  - Actionable notifications for workflow events

- **Collaboration:**
  - Integrated chat and messaging for audit teams
  - Real-time presence and activity indicators
  - Enhanced collaboration hub with file sharing and team invites

---

### User Journey Mapping (Updated)

| User Journey         | Page(s) / Feature                | Status         | Enhancement Notes |
|---------------------|----------------------------------|----------------|------------------|
| Project Owner       | `/my-audits`                     | NEW            | Real-time, analytics, notifications |
| Super Admin         | `/approval-center`               | NEW            | Bulk actions, audit trail, notifications |
| Onboarding          | `/onboarding`, personalized flows| Enhanced       | Quick actions, personalized welcome |
| Notifications       | `/notification-center`           | Enhanced       | Real-time, multi-channel |
| Collaboration       | `/collaboration-hub`, chat       | Enhanced       | Integrated messaging, invites |
| Audit Tracking      | `/dashboard`, `/my-audits`       | Enhanced       | Unified view, progress analytics |

---

**Next Steps:**
- Build out advanced analytics and notification integrations for dashboards.
- Expand approval workflows to cover more request types.
- Continue enhancing onboarding and collaboration features for all user roles.

---

## 2. Auditor Journey
### Pages
- Auditor Signup: `/auditor/signup`
- Email Verification: `/auditor/email-verification`
- Onboarding: `/auditor/onboarding`
- Auditor Dashboard: `/auditor/dashboard`
- Audit Details: `/audit/:id`
- Profile: `/profile`, `/profile/settings`

### Missing Pages/Features
- Personalized dashboard with assigned audits and performance metrics
- Feedback and rating system for completed audits

### Enhancement Suggestions
- Add audit assignment notifications
- Display performance analytics and feedback
- Enable direct messaging with project owners

---

## 3. Service Provider Journey
### Pages
- Service Provider Onboarding: `/service-provider-onboarding`
- Profile Completion: `/profile-completion`
- Marketplace: `/marketplace`

### Missing Pages/Features
- Service management dashboard
- Approval workflow for new service providers (admin/super admin)

### Enhancement Suggestions
- Add onboarding progress tracker
- Enable admin approval and feedback for onboarding
- Integrate service analytics and reviews

---

## 4. Admin/Super Admin Journey
### Pages
- Admin Dashboard: `/admin`, `/admin/dashboard`
- Analytics: `/admin/analytics`
- Audits, Disputes, Finance, Providers, Reports, Security, Services, Settings, Users: `/admin/*`
- Approval Center (Missing, needs implementation)

### Missing Pages/Features
- Centralized approval center for audits, service providers, and user actions
- Audit and onboarding approval workflow
- Advanced reporting and analytics

### Enhancement Suggestions
- Add approval queues and status tracking
- Integrate notifications for pending approvals
- Provide exportable reports and audit logs

---

## 5. General User Journey
### Pages
- Landing: `/`
- Authentication: `/auth`, `/auth/callback`
- Dashboard: `/dashboard`
- Profile: `/profile`, `/profile/settings`
- Marketplace: `/marketplace`
- Support: `/support`, `/contact`
- Documentation: `/documentation`, `/resources`, `/knowledge-base`, `/guides`, `/faq`, `/docs`
- Tutorials: `/tutorials`
- Terms & Privacy: `/terms`, `/privacy`

### Missing Pages/Features
- Enhanced onboarding flow for new users
- Unified notifications center

### Enhancement Suggestions
- Add onboarding checklist and progress bar
- Integrate notification center for all user actions
- Provide contextual help and tooltips

---

## 6. Community & Engagement Journey
### Pages
- Community: `/community`
- Achievements: `/community/achievements`
- Blog: `/community/blog`
- Calendar: `/community/calendar`
- Challenges: `/community/challenges`
- Events: `/community/events`
- Gamification: `/community/gamification`
- Leaderboard: `/community/leaderboard`
- Messaging: `/community/messaging`
- Notifications: `/community/notifications`

### Missing Pages/Features
- Forums and discussion boards
- Direct messaging between users

### Enhancement Suggestions
- Add forums and Q&A sections
- Enable direct and group messaging
- Integrate gamification rewards and badges

---

## 7. Business & Enterprise Journey
### Pages
- Enterprise: `/enterprise`
- Controls: `/enterprise/controls`
- Advantages: `/enterprise/advantages`
- For Auditors/Developers/Project Owners: `/for-auditors`, `/for-developers`, `/for-project-owners`
- Pricing Calculator: `/pricing-calculator`

### Missing Pages/Features
- Custom enterprise dashboards
- Advanced reporting and analytics

### Enhancement Suggestions
- Add customizable dashboards for enterprise clients
- Integrate advanced analytics and export options
- Enable enterprise support and onboarding

---

## 8. Tools & Utilities Journey
### Pages
- Database Tools: `/tools/database`
- File Management: `/tools/files`
- Integrations: `/tools/integrations`
- Platform Integration: `/tools/platform-integration`
- Optimization: `/tools/optimization`
- Performance: `/tools/performance`
- Templates: `/tools/templates`
- Workspace: `/tools/workspace`

### Missing Pages/Features
- Enhanced templates and integration guides
- Real-time collaboration tools

### Enhancement Suggestions
- Add template library with search and filtering
- Enable real-time collaboration and sharing
- Provide integration wizards and step-by-step guides

---

## 9. Security & Compliance Journey
### Pages
- Security Dashboard: `/security`
- Accessibility: `/security/accessibility`
- Compliance: `/security/compliance`
- Insights: `/security/insights`
- Monitoring: `/security/monitoring`
- Policy: `/security/policy`
- Settings: `/security/settings`
- Vulnerabilities: `/security/vulnerabilities`
- Scanner: `/security/scanner`
- Web3 Security: `/security/web3`

### Missing Pages/Features
- Automated compliance reporting
- Vulnerability management dashboard

### Enhancement Suggestions
- Add compliance report generator
- Integrate vulnerability tracking and remediation tools
- Provide security analytics and alerts

---

## 10. Platform Features (Currently Placeholders)
### Pages
- Features: `/features`
- Escrow: `/escrow`
- Collaboration: `/collaboration`
- Analytics: `/analytics`
- Audits: `/audits`
- Messages: `/messages`
- FAQ: `/faq`

### Recent Implementations (July 2025)
- Approval queues and status tracking in Approval Center
- Actionable, workflow-driven notifications (audit, approval, collaboration, bulk actions)
- Onboarding flow with progress indicators and contextual help
- Real-time presence and messaging in Collaboration Hub
- Interactive dashboards for audits, approvals, onboarding, and collaboration

### Remaining Missing Pages/Features
- Full backend integration for real-time features
- Advanced analytics and reporting tools

### Enhancement Suggestions
- Continue building out each feature with robust UI and backend logic
- Expand analytics, messaging, and collaboration tools
- Integrate all features with user journeys and approval workflows

---

## Next Steps
- Prioritize building missing dashboards and approval workflows
- Enhance onboarding, notifications, and collaboration features
- Regularly review and update user journey mapping as platform evolves

---

*This PRD provides a comprehensive mapping of user journeys, current pages, missing features, and actionable enhancement suggestions for the Hawkly platform.*
