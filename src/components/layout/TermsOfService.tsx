
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsOfService() {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Terms of Service</h3>
        
        <h4 className="text-md font-medium">1. Acceptance of Terms</h4>
        <p>
          By accessing or using the Hawkly platform (the "Service"), you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, you may not access or use the Service.
        </p>
        
        <h4 className="text-md font-medium">2. Security Provider Responsibilities</h4>
        <p>
          As a security provider on our platform, you are responsible for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Maintaining the confidentiality of all client data and code</li>
          <li>Providing accurate information about your skills and experience</li>
          <li>Delivering services as described and within agreed timeframes</li>
          <li>Following all security best practices and disclosure policies</li>
          <li>Maintaining professional conduct with all platform users</li>
        </ul>
        
        <h4 className="text-md font-medium">3. Quality Standards</h4>
        <p>
          All security providers must maintain high quality standards:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Thorough audit methodologies following industry standards</li>
          <li>Clear and comprehensive documentation</li>
          <li>Responsive communication within agreed SLA timeframes</li>
          <li>Professional remediation guidance</li>
        </ul>
        
        <h4 className="text-md font-medium">4. Payment Terms</h4>
        <p>
          Hawkly facilitates payments between clients and security providers. Fees are calculated based on:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service type and scope</li>
          <li>Timeline and urgency</li>
          <li>Provider expertise level</li>
        </ul>
        <p>
          Hawkly retains a platform fee from each transaction. Detailed payment breakdowns will be provided for each project.
        </p>
        
        <h4 className="text-md font-medium">5. Dispute Resolution</h4>
        <p>
          In case of disputes between providers and clients, Hawkly will:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Review all communications and deliverables</li>
          <li>Assess compliance with agreed terms</li>
          <li>Provide a fair resolution</li>
          <li>Retain final decision authority on all platform disputes</li>
        </ul>
        
        <h4 className="text-md font-medium">6. Account Termination</h4>
        <p>
          Hawkly reserves the right to suspend or terminate provider accounts for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Violation of these terms</li>
          <li>Consistent low-quality service</li>
          <li>Fraudulent activity</li>
          <li>Inappropriate conduct</li>
        </ul>
        
        <h4 className="text-md font-medium">7. Modifications to Terms</h4>
        <p>
          Hawkly may modify these terms at any time. Providers will be notified of significant changes, and continued use of the platform constitutes acceptance of modified terms.
        </p>
        
        <h4 className="text-md font-medium">8. Limitation of Liability</h4>
        <p>
          Hawkly is not liable for:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Security issues not identified during audits</li>
          <li>Damages resulting from client implementation of recommendations</li>
          <li>Disputes between providers and clients outside our platform</li>
        </ul>
        
        <p className="pt-4 text-sm text-muted-foreground">
          Last updated: May 20, 2025
        </p>
      </div>
    </ScrollArea>
  );
}
