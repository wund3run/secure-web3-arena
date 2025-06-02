
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UpdatedPrivacy2025Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatedPrivacy2025({ open, onOpenChange }: UpdatedPrivacy2025Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Privacy Policy - Updated 2025</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h2 className="text-xl font-semibold">Hawkly Privacy Policy</h2>
          <p className="text-muted-foreground">Effective Date: January 1, 2025 | Version 2.0</p>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-medium">1. Information Collection</h3>
              <p className="mb-3">We collect the following types of information:</p>
              
              <h4 className="font-semibold">Personal Information:</h4>
              <ul className="list-disc pl-6 space-y-1 mb-3">
                <li>Name, email address, and professional credentials</li>
                <li>Payment information (processed securely through third parties)</li>
                <li>Wallet addresses for cryptocurrency transactions</li>
                <li>Communication logs for audit coordination</li>
              </ul>
              
              <h4 className="font-semibold">Technical Information:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP addresses and device information</li>
                <li>Browser fingerprinting for security purposes</li>
                <li>Platform usage analytics</li>
                <li>Audit report metadata (excluding sensitive code)</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">2. Data Usage and Sharing</h3>
              <p className="mb-3">Your information is used exclusively for:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Facilitating audit services and communications</li>
                <li>Verifying auditor credentials and maintaining quality</li>
                <li>Processing payments and maintaining transaction records</li>
                <li>Improving platform security and user experience</li>
                <li>Compliance with regulatory requirements</li>
              </ul>
              
              <p className="mt-3 font-semibold">We never sell your data to third parties.</p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">3. Data Protection Measures</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>End-to-end encryption for all sensitive communications</li>
                <li>Regular security audits of our own infrastructure</li>
                <li>Multi-factor authentication for all user accounts</li>
                <li>Segregated storage for audit reports and source code</li>
                <li>Regular backup and disaster recovery procedures</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">4. Indian Data Protection Compliance</h3>
              <p className="mb-3">For Indian users, we comply with:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Digital Personal Data Protection Act, 2023</li>
                <li>Information Technology (Reasonable Security Practices) Rules, 2011</li>
                <li>Reserve Bank of India data localization requirements</li>
                <li>Specific consent mechanisms for Indian users</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">5. Your Rights</h3>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access and review all your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Data portability (export your data)</li>
                <li>Withdraw consent for non-essential data processing</li>
                <li>File complaints with data protection authorities</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">6. Data Retention</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Personal information: Retained while account is active + 7 years</li>
                <li>Audit reports: Retained for 10 years for compliance purposes</li>
                <li>Communication logs: Retained for 3 years</li>
                <li>Payment records: Retained as required by financial regulations</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">7. Cross-Border Data Transfers</h3>
              <p className="mb-3">
                When data is transferred internationally, we ensure:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Adequate protection measures are in place</li>
                <li>Compliance with local data protection laws</li>
                <li>Explicit consent for transfers outside India</li>
                <li>Standard contractual clauses with international partners</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">8. Contact Information</h3>
              <p className="mb-2">For privacy-related inquiries:</p>
              <ul className="list-none space-y-1">
                <li>Email: privacy@hawkly.com</li>
                <li>Data Protection Officer: dpo@hawkly.com</li>
                <li>Indian Operations: privacy.india@hawkly.com</li>
                <li>Response time: Within 72 hours</li>
              </ul>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
