
import React from "react";
import { AlertTriangle, Award, BadgeCheck, Check, CircleHelp, Clock, FileCheck, Search, Settings, Shield, Star, Users, Wallet } from "lucide-react";

export const securityCriteria = [
  {
    title: "Verification Status",
    description: (
      <div>
        <p>Look for auditors with verified badges that indicate they've undergone Hawkly's verification process.</p>
        <div className="flex items-center gap-2 mt-2">
          <Shield className="h-4 w-4 text-primary" /> 
          <span className="text-xs font-medium">Verified</span>
          <BadgeCheck className="h-4 w-4 text-secondary ml-4" /> 
          <span className="text-xs font-medium">Expert</span>
        </div>
      </div>
    ),
    icon: <Shield className="h-5 w-5" />,
    detailComponentId: "verification-status"
  },
  {
    title: "Past Experience",
    description: (
      <div>
        <p>Review the auditor's history with similar projects and technologies. Look for experience with your specific blockchain platform and smart contract language.</p>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full">Solidity</span>
          <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">DeFi</span>
          <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full">NFT Projects</span>
        </div>
      </div>
    ),
    icon: <FileCheck className="h-5 w-5" />,
    detailComponentId: "past-experience"
  },
  {
    title: "Reviews & Ratings",
    description: "Check testimonials from previous clients and the auditor's overall rating. Pay attention to detailed reviews that explain the audit process and outcomes.",
    icon: <Users className="h-5 w-5" />,
    detailComponentId: "reviews-ratings"
  },
  {
    title: "Response Time",
    description: "Consider how quickly the auditor responds to inquiries. Fast communication is crucial, especially when dealing with critical security vulnerabilities.",
    icon: <Clock className="h-5 w-5" />,
    detailComponentId: "response-time"
  },
  {
    title: "Transparent Pricing",
    description: "Look for clear pricing structures. Be wary of quotes that seem too low, as quality security audits require time and expertise.",
    icon: <Wallet className="h-5 w-5" />,
    detailComponentId: "transparent-pricing"
  }
];
