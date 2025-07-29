
import { FunnelData } from "./types";

// Staged conversion funnel data for each user type
export const funnelData: FunnelData = {
  auditor: [
    { name: "Discovery", value: 100, dropoff: 25, action: "Platform awareness", color: "#4ade80" },
    { name: "Registration", value: 75, dropoff: 5, action: "Account creation", color: "#60a5fa" },
    { name: "Verification", value: 70, dropoff: 10, action: "Identity verification", color: "#818cf8" },
    { name: "Service Creation", value: 60, dropoff: 5, action: "Profile setup", color: "#a78bfa" },
    { name: "First Audit", value: 55, dropoff: 15, action: "Initial engagement", color: "#c084fc" },
    { name: "Recurring Activity", value: 40, dropoff: 0, action: "Ongoing platform use", color: "#e879f9" }
  ],
  projectOwner: [
    { name: "Problem Awareness", value: 100, dropoff: 20, action: "Security need recognition", color: "#4ade80" },
    { name: "Research", value: 80, dropoff: 15, action: "Comparing options", color: "#60a5fa" },
    { name: "Registration", value: 65, dropoff: 5, action: "Account creation", color: "#818cf8" },
    { name: "Audit Request", value: 60, dropoff: 10, action: "Project submission", color: "#a78bfa" },
    { name: "Escrow Setup", value: 50, dropoff: 5, action: "Payment preparation", color: "#c084fc" },
    { name: "Audit Completion", value: 45, dropoff: 5, action: "Implementation of fixes", color: "#e879f9" },
    { name: "Recurring Projects", value: 40, dropoff: 0, action: "Ongoing security checks", color: "#f472b6" }
  ],
  general: [
    { name: "Initial Visit", value: 100, dropoff: 60, action: "Content exploration", color: "#4ade80" },
    { name: "Resource View", value: 40, dropoff: 15, action: "Educational content consumption", color: "#60a5fa" },
    { name: "Community Engagement", value: 25, dropoff: 10, action: "Forum activity", color: "#818cf8" },
    { name: "Self-Service Tools", value: 15, dropoff: 5, action: "Template usage", color: "#a78bfa" },
    { name: "Conversion", value: 10, dropoff: 0, action: "Becoming provider/client", color: "#c084fc" }
  ]
};
