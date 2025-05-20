
import React from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export function TermsOfService() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
      <Separator className="mb-4" />
      <ScrollArea className="h-[300px]">
        <div className="space-y-4 pr-4">
          <section>
            <h3 className="text-lg font-semibold">1. Introduction</h3>
            <p className="text-muted-foreground">
              Welcome to Hawkly, a platform connecting blockchain projects with security auditors. These Terms of Service govern your use of our platform and services.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">2. Acceptance of Terms</h3>
            <p className="text-muted-foreground">
              By using the Hawkly platform, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our platform.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">3. Definitions</h3>
            <p className="text-muted-foreground">
              "Service" refers to the Hawkly platform.<br />
              "User" refers to individuals who register for and use our platform.<br />
              "Project Owner" refers to users who submit projects for audit.<br />
              "Auditor" refers to users who provide audit services through our platform.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">4. Service Usage</h3>
            <p className="text-muted-foreground">
              Users may only use the Service for lawful purposes and in accordance with these Terms. Users are responsible for maintaining the confidentiality of their account credentials.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">5. Content Guidelines</h3>
            <p className="text-muted-foreground">
              Users must not post content that is illegal, harmful, threatening, abusive, defamatory, or otherwise objectionable. We reserve the right to remove content that violates these guidelines.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">6. Intellectual Property</h3>
            <p className="text-muted-foreground">
              The Service and its original content, features, and functionality are owned by Hawkly and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">7. Privacy</h3>
            <p className="text-muted-foreground">
              Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms of Service.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">8. Payment and Fees</h3>
            <p className="text-muted-foreground">
              Project Owners agree to pay the fees associated with audit services. Hawkly will collect and distribute payments in accordance with our payment policies.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">9. Termination</h3>
            <p className="text-muted-foreground">
              We reserve the right to terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including a breach of the Terms.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">10. Changes to Terms</h3>
            <p className="text-muted-foreground">
              We reserve the right to modify or replace these Terms at any time. We will notify users of material changes to the Terms.
            </p>
          </section>
          
          <section>
            <h3 className="text-lg font-semibold">11. Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about these Terms, please contact us at terms@hawkly.io.
            </p>
          </section>
        </div>
      </ScrollArea>
    </div>
  );
}

export default TermsOfService;
