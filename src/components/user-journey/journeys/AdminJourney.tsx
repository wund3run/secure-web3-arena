
import React from "react";
import { Settings, UserCheck, LineChart, AlertCircle, Gavel, Shield, DollarSign } from "lucide-react";
import { JourneyStep } from "../JourneyStep";
import { JourneyPath } from "../JourneyPath";

export function AdminJourney() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Platform Admin Journey</h3>
        <p className="text-muted-foreground">Administrative workflows for platform management and oversight</p>
      </div>
      
      <JourneyPath>
        <JourneyStep
          stepNumber={1}
          title="Dashboard & Analytics"
          description="Monitoring platform performance, user growth, and financial metrics"
          pages={["/admin", "/admin/dashboard"]}
          revenueImpact="medium"
          icon={<LineChart className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={2}
          title="User Management"
          description="Auditor verification, user approvals, and account management"
          pages={["/admin/users", "/admin/providers"]}
          revenueImpact="low"
          icon={<UserCheck className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={3}
          title="Quality Control"
          description="Reviewing audit reports for adherence to standards and maintaining platform integrity"
          pages={["/admin/audits", "/admin/reports", "/admin/services"]}
          revenueImpact="high"
          icon={<Shield className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={4}
          title="Dispute Resolution"
          description="Managing and resolving disputes between auditors and project owners"
          pages={["/admin/disputes", "/escrow"]}
          revenueImpact="high"
          icon={<Gavel className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={5}
          title="Security Incident Response"
          description="Managing security incidents and platform vulnerabilities"
          pages={["/admin/security", "/admin/reports"]}
          revenueImpact="medium"
          icon={<AlertCircle className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={6}
          title="Revenue Management"
          description="Overseeing fee structures, payments, and financial operations"
          pages={["/admin/finance", "/admin/settings"]}
          revenueImpact="high"
          icon={<DollarSign className="h-5 w-5" />}
        />
        
        <JourneyStep
          stepNumber={7}
          title="Platform Configuration"
          description="Managing settings, integrations, and feature flags"
          pages={["/admin/settings", "/admin/services"]}
          revenueImpact="low"
          icon={<Settings className="h-5 w-5" />}
        />
      </JourneyPath>
      
      <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">Key Admin Focus Areas:</h4>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Revenue monitoring and optimization</li>
          <li>Auditor quality assurance</li>
          <li>Fraud prevention and detection</li>
          <li>Platform feature enablement based on user adoption</li>
          <li>Fee structure management and financial operations</li>
          <li>Crisis management and security incident response</li>
          <li>Performance tracking and platform health</li>
        </ul>
      </div>
    </div>
  );
}
