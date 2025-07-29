
import React from "react";
import { Code, Search, FileCheck, Shield, CheckCircle, Users, Bookmark } from "lucide-react";
import { JourneyStep } from "../JourneyStep";
import { JourneyPath } from "../JourneyPath";

export function ProjectOwnerJourney() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Project Owner Journey</h3>
        <p className="text-muted-foreground">The path for blockchain project owners seeking security services</p>
      </div>
      
      <JourneyPath>
        <JourneyStep
          stepNumber={1}
          title="Problem Awareness"
          description="Project owner recognizes security needs for their blockchain project"
          pages={["/", "/web3-security", "/vulnerabilities", "/resources"]}
          conversionRate={20}
          revenueImpact="low"
          icon={<Shield className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={2}
          title="Research & Comparison"
          description="Exploring security service options and comparing auditors"
          pages={["/marketplace", "/audits", "/audit-guidelines", "/pricing"]}
          conversionRate={40}
          revenueImpact="low"
          icon={<Search className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={3}
          title="Registration & Project Submission"
          description="Creating account and submitting project for audit"
          pages={["/auth", "/request-audit", "/dashboard"]}
          conversionRate={65}
          revenueImpact="medium"
          icon={<Code className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={4}
          title="Auditor Selection"
          description="Reviewing auditor profiles and selecting based on expertise and reputation"
          pages={["/marketplace", "/leaderboard", "/achievements"]}
          conversionRate={70}
          revenueImpact="medium"
          icon={<Users className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={5}
          title="Escrow & Contracting"
          description="Setting up escrow payment and finalizing audit agreement"
          pages={["/escrow", "/dashboard", "/contact-provider"]}
          conversionRate={80}
          revenueImpact="high"
          icon={<FileCheck className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={6}
          title="Collaboration & Review"
          description="Providing additional information and reviewing audit progress"
          pages={["/audit/:id", "/dashboard", "/contact-provider/:id"]}
          conversionRate={85}
          revenueImpact="medium"
          icon={<Bookmark className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={7}
          title="Audit Completion & Publication"
          description="Reviewing final audit report and optionally publishing results"
          pages={["/dashboard", "/audit/:id", "/security-insights"]}
          conversionRate={95}
          revenueImpact="high"
          icon={<CheckCircle className="h-5 w-5" />}
        />
      </JourneyPath>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Key Revenue & Engagement Opportunities:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Platform fees on audit transactions (5-10%)</li>
          <li>Express audit request matching (premium fee)</li>
          <li>Tiered service options (basic, comprehensive, ongoing)</li>
          <li>Continuous monitoring subscription services</li>
          <li>Urgent security assessment fast-tracking</li>
          <li>Escrow service fees for transaction protection</li>
          <li>Premium report publishing and certification</li>
        </ul>
      </div>
    </div>
  );
}
