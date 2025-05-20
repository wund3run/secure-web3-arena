
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export function CodeOfConduct() {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Security Provider Code of Conduct</h3>
        
        <h4 className="text-md font-medium">1. Ethical Standards</h4>
        <p>
          All security providers on the Hawkly platform must adhere to the highest ethical standards:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Act with integrity and honesty in all professional activities</li>
          <li>Avoid conflicts of interest or disclose them when unavoidable</li>
          <li>Respect the confidentiality of client information</li>
          <li>Provide honest assessments regardless of financial implications</li>
          <li>Never exploit vulnerabilities discovered during security assessments</li>
        </ul>
        
        <h4 className="text-md font-medium">2. Professional Conduct</h4>
        <p>
          Maintain professional behavior at all times:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Communicate respectfully with clients and other providers</li>
          <li>Provide realistic timelines and deliver accordingly</li>
          <li>Acknowledge limitations in expertise and decline projects beyond your capabilities</li>
          <li>Continuously develop professional knowledge and skills</li>
          <li>Collaborate constructively with other security professionals</li>
        </ul>
        
        <h4 className="text-md font-medium">3. Responsible Disclosure</h4>
        <p>
          Follow responsible disclosure practices:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Report vulnerabilities directly to clients through secure channels</li>
          <li>Provide reasonable time for remediation before any public disclosure</li>
          <li>Respect client's disclosure policies</li>
          <li>Never disclose confidential findings without explicit permission</li>
        </ul>
        
        <h4 className="text-md font-medium">4. Quality of Service</h4>
        <p>
          Deliver the highest quality security services:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Use industry-standard methodologies and best practices</li>
          <li>Provide clear, comprehensive, and actionable reports</li>
          <li>Validate findings to minimize false positives</li>
          <li>Offer practical and effective remediation guidance</li>
          <li>Maintain detailed documentation of all security assessment activities</li>
        </ul>
        
        <h4 className="text-md font-medium">5. Continuous Improvement</h4>
        <p>
          Commit to ongoing professional development:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Stay current with evolving security threats and technologies</li>
          <li>Participate in relevant professional communities</li>
          <li>Learn from peer reviews and client feedback</li>
          <li>Share knowledge to advance the security community (while respecting confidentiality)</li>
        </ul>
        
        <h4 className="text-md font-medium">6. Compliance</h4>
        <p>
          Adhere to all applicable laws and regulations:
        </p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Obtain proper authorization before conducting security assessments</li>
          <li>Respect legal boundaries and scope limitations</li>
          <li>Maintain required licenses and certifications</li>
          <li>Report illegal activities to appropriate authorities</li>
        </ul>
        
        <p className="pt-4 text-sm text-muted-foreground">
          By joining Hawkly as a security provider, you commit to upholding this Code of Conduct. Violations may result in removal from the platform.
        </p>
        
        <p className="text-sm text-muted-foreground">
          Last updated: May 20, 2025
        </p>
      </div>
    </ScrollArea>
  );
}
