
import React from "react";
import { Info, Book, BookOpen, HelpCircle, MessageSquare, Award, Eye } from "lucide-react";
import { JourneyStep } from "../JourneyStep";
import { JourneyPath } from "../JourneyPath";

export function GeneralUserJourney() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General User Journey</h3>
        <p className="text-muted-foreground">The path for visitors seeking Web3 security information and resources</p>
      </div>
      
      <JourneyPath>
        <JourneyStep
          stepNumber={1}
          title="Initial Discovery"
          description="General visitor discovers the platform through content or referrals"
          pages={["/", "/web3-security", "/blog"]}
          conversionRate={10}
          revenueImpact="low"
          icon={<Info className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={2}
          title="Educational Content Exploration"
          description="Exploring educational resources on blockchain security"
          pages={["/resources", "/guides", "/tutorials", "/knowledge-base"]}
          conversionRate={15}
          revenueImpact="low"
          icon={<Book className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={3}
          title="Community Engagement"
          description="Participating in forums, events, or challenges"
          pages={["/community", "/forum", "/events", "/challenges"]}
          conversionRate={8}
          revenueImpact="medium"
          icon={<MessageSquare className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={4}
          title="Self-Service Resources"
          description="Using templates, guides, or FAQ resources"
          pages={["/templates", "/faq", "/security-policy", "/docs"]}
          conversionRate={12}
          revenueImpact="medium"
          icon={<BookOpen className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={5}
          title="Browsing Audited Projects"
          description="Accessing and evaluating security reports of audited projects"
          pages={["/audits", "/security-insights", "/marketplace"]}
          conversionRate={7}
          revenueImpact="medium"
          icon={<Eye className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={6}
          title="Support & Conversion"
          description="Seeking help or converting to project owner/auditor"
          pages={["/support", "/contact", "/auth", "/service-provider-onboarding"]}
          conversionRate={5}
          revenueImpact="high"
          icon={<HelpCircle className="h-5 w-5" />}
        />
      </JourneyPath>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Key Revenue & Engagement Opportunities:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Educational content subscriptions</li>
          <li>Premium resource access</li>
          <li>Self-service security tools</li>
          <li>Conversion to active platform users</li>
          <li>Lead generation for security services</li>
          <li>Sponsored educational content</li>
          <li>Community membership tiers</li>
        </ul>
      </div>
    </div>
  );
}
