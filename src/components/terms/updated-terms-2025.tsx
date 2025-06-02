
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface UpdatedTerms2025Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpdatedTerms2025({ open, onOpenChange }: UpdatedTerms2025Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Terms of Service - Updated 2025</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h2 className="text-xl font-semibold">Hawkly Security Marketplace Terms of Service</h2>
          <p className="text-muted-foreground">Effective Date: January 1, 2025 | Version 2.0</p>
          
          <div className="space-y-4">
            <section>
              <h3 className="text-lg font-medium">1. Service Overview</h3>
              <p>
                Hawkly operates as a professional Web3 security marketplace connecting blockchain 
                projects with certified security auditors. We facilitate secure, transparent 
                audit processes while maintaining the highest industry standards.
              </p>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">2. Updated Pricing Structure</h3>
              <p>
                All pricing is transparently displayed in both USD and INR. Current exchange 
                rates are applied at the time of service agreement. Pricing includes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Basic Audits: Starting at $5,000 (₹4,16,500)</li>
                <li>Comprehensive Audits: Starting at $15,000 (₹12,49,500)</li>
                <li>Enterprise Solutions: Custom pricing based on scope</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">3. Quality Assurance</h3>
              <p>
                All security auditors on our platform are verified professionals with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Minimum 2 years of blockchain security experience</li>
                <li>Certification from recognized security institutions</li>
                <li>Proven track record of successful audits</li>
                <li>Continuous performance monitoring</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">4. Indian Market Compliance</h3>
              <p>
                For Indian users, we ensure compliance with:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Reserve Bank of India (RBI) guidelines for digital transactions</li>
                <li>Information Technology Act, 2000 and amendments</li>
                <li>Data Protection and Privacy regulations</li>
                <li>Goods and Services Tax (GST) requirements where applicable</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">5. Dispute Resolution</h3>
              <p>
                Updated dispute resolution process includes:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>48-hour response time for all disputes</li>
                <li>Mediation through certified blockchain arbitrators</li>
                <li>Escrow protection for all transactions</li>
                <li>Option for legal arbitration in Indian courts for Indian users</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">6. Intellectual Property</h3>
              <p>
                Clear guidelines on code ownership and audit report usage:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Clients retain full ownership of their source code</li>
                <li>Audit reports are confidential to the commissioning party</li>
                <li>Auditors may not disclose vulnerabilities without client consent</li>
                <li>Platform retains rights to anonymized security statistics</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">7. Limitation of Liability</h3>
              <p>
                Updated liability framework:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Hawkly's liability is limited to the audit fee paid</li>
                <li>No liability for losses due to undiscovered vulnerabilities</li>
                <li>Force majeure clauses covering blockchain network issues</li>
                <li>Insurance options available for high-value audits</li>
              </ul>
            </section>
            
            <section>
              <h3 className="text-lg font-medium">8. Termination and Refunds</h3>
              <p>
                Clear termination and refund policies:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>7-day cooling-off period for audit bookings</li>
                <li>Milestone-based payments with partial refund options</li>
                <li>Full refund if auditor fails to deliver within agreed timeline</li>
                <li>Pro-rata refunds for cancelled ongoing audits</li>
              </ul>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
