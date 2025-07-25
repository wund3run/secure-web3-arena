
import React from "react";
import { Shield, FileCheck, Users, Scroll, Award, BarChart3, Wallet } from "lucide-react";
import { JourneyStep } from "../JourneyStep";
import { JourneyPath } from "../JourneyPath";

export function AuditorJourney() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Auditor User Journey</h3>
        <p className="text-muted-foreground">The path for security auditors to join, verify credentials, and provide services on the platform</p>
      </div>
      
      <JourneyPath>
        <JourneyStep
          stepNumber={1}
          title="Discovery & Initial Interest"
          description="Auditor discovers the platform through search, referrals, or marketing efforts"
          pages={["/", "/web3-security", "/resources"]}
          conversionRate={25}
          revenueImpact="low"
          icon={<Shield className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={2}
          title="Registration & Onboarding"
          description="Registration, profile creation, and initial onboarding steps including the auditor application"
          pages={["/auth", "/service-provider-onboarding", "/onboarding/auditor"]}
          conversionRate={70}
          revenueImpact="medium"
          icon={<Users className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={3}
          title="Verification & Skill Assessment"
          description="Identity verification, credential validation, and technical skill assessment"
          pages={["/application-submitted", "/auditor-onboarding", "/audit-guidelines"]}
          conversionRate={85}
          revenueImpact="high"
          icon={<FileCheck className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={4}
          title="Service Offering Creation"
          description="Creating audit service listings and defining expertise areas"
          pages={["/submit-service", "/dashboard"]}
          conversionRate={90}
          revenueImpact="high"
          icon={<Scroll className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={5}
          title="Browsing & Applying for Audits"
          description="Reviewing available projects and submitting proposals or bids"
          pages={["/marketplace", "/dashboard", "/audits"]}
          conversionRate={75}
          revenueImpact="medium"
          icon={<BarChart3 className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={6}
          title="Performing Audits"
          description="Using platform tools to identify vulnerabilities and assess security risks"
          pages={["/audit/:id", "/security-insights", "/ai-tools"]}
          conversionRate={95}
          revenueImpact="high"
          icon={<FileCheck className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={7}
          title="Payment & Reputation Building"
          description="Receiving payment and gaining reputation points based on performance"
          pages={["/escrow", "/achievements", "/leaderboard"]}
          conversionRate={98}
          revenueImpact="high"
          icon={<Wallet className="h-5 w-5" />}
        />
      </JourneyPath>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Key Revenue & Engagement Opportunities:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Commission on completed audits (15-20% platform fee)</li>
          <li>Featured listing placement fees for enhanced visibility</li>
          <li>Premium badge verification for higher trust score</li>
          <li>Priority matching with high-value projects</li>
          <li>Leaderboard visibility and reputation incentives</li>
          <li>Advanced tool access for comprehensive audits</li>
          <li>Performance-based bonuses and rewards</li>
        </ul>
      </div>
    </div>
  );
}
