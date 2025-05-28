
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, AlertTriangle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Helmet>
        <title>Terms and Conditions | Hawkly</title>
        <meta name="description" content="Terms and conditions for using Hawkly's Web3 security auditing platform." />
      </Helmet>

      <div className="container py-12 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Terms and Conditions</CardTitle>
            <p className="text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                By using Hawkly's platform, you agree to these terms and our commitment to Web3 security excellence.
              </AlertDescription>
            </Alert>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Platform Overview</h2>
              <p className="text-muted-foreground">
                Hawkly is a decentralized security auditing platform that connects Web3 projects with 
                qualified security auditors. Our platform facilitates secure, transparent, and efficient 
                security assessments for blockchain-based applications and smart contracts.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. User Categories and Responsibilities</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Project Owners</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Provide accurate project information and scope details</li>
                  <li>Maintain reasonable budget expectations for security audits</li>
                  <li>Respond promptly to auditor questions and requests</li>
                  <li>Respect agreed-upon timelines and milestone payments</li>
                </ul>

                <h3 className="text-lg font-medium">Security Auditors</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Maintain professional certifications and demonstrate expertise</li>
                  <li>Deliver comprehensive, unbiased security assessments</li>
                  <li>Follow industry-standard audit methodologies</li>
                  <li>Maintain confidentiality of client code and business information</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Payment and Escrow Terms</h2>
              
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  All payments are processed through our secure escrow system with multi-signature protection.
                </AlertDescription>
              </Alert>

              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Platform fee: 5% of total project value</li>
                <li>Payments released based on milestone completion</li>
                <li>Dispute resolution through qualified arbitrators</li>
                <li>Refunds subject to project completion status</li>
                <li>Manual approval required for transactions >$10,000</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Security and Compliance</h2>
              <p className="text-muted-foreground">
                Our platform maintains the highest security standards:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>SOC2 Type II compliance with regular audits</li>
                <li>PCI DSS Level 1 certification for payment processing</li>
                <li>End-to-end encryption for all sensitive data</li>
                <li>Multi-factor authentication requirements</li>
                <li>Regular penetration testing and security assessments</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Intellectual Property</h2>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Clients retain ownership of their project code and documentation</li>
                <li>Auditors retain rights to their audit methodologies and tools</li>
                <li>Platform reserves rights to anonymized data for improving services</li>
                <li>Audit reports remain confidential between parties unless otherwise agreed</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Hawkly facilitates connections between parties but does not guarantee:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Complete security of audited projects</li>
                <li>Prevention of all potential vulnerabilities</li>
                <li>Specific business outcomes from security audits</li>
                <li>Compatibility with all blockchain networks</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Dispute Resolution</h2>
              <p className="text-muted-foreground">
                Disputes are resolved through our three-tier system:
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-muted-foreground">
                <li>Direct negotiation between parties</li>
                <li>Platform-mediated resolution with evidence review</li>
                <li>Binding arbitration by qualified security professionals</li>
              </ol>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Platform Modifications</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms with 30 days notice to users. 
                Continued use of the platform constitutes acceptance of updated terms.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Contact Information</h2>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Legal Department</p>
                <p className="text-muted-foreground">Email: legal@hawkly.com</p>
                <p className="text-muted-foreground">Address: [Company Address]</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Terms;
