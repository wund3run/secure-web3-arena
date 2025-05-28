
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Helmet>
        <title>Privacy Policy | Hawkly</title>
        <meta name="description" content="Hawkly's privacy policy and data protection practices for Web3 security auditing platform." />
      </Helmet>

      <div className="container py-12 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Privacy Policy</CardTitle>
            <p className="text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
              <div className="space-y-3">
                <h3 className="text-lg font-medium">Personal Information</h3>
                <p className="text-muted-foreground">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Account information (email, name, profile details)</li>
                  <li>Wallet addresses and blockchain transaction data</li>
                  <li>Audit requests and security assessment data</li>
                  <li>Communication data (messages, support tickets)</li>
                  <li>Payment information (processed securely through Stripe)</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Provide and maintain our security auditing services</li>
                <li>Process transactions and payments securely</li>
                <li>Match projects with qualified security auditors</li>
                <li>Communicate about services, updates, and security alerts</li>
                <li>Improve our platform and develop new features</li>
                <li>Comply with legal obligations and industry standards</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Web3 and Blockchain Data</h2>
              <p className="text-muted-foreground">
                As a Web3 platform, we handle blockchain-related data with special considerations:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Wallet addresses are pseudonymous and recorded on public blockchains</li>
                <li>Smart contract interactions are permanently recorded on-chain</li>
                <li>We implement non-custodial wallet management through Web3Auth MPC</li>
                <li>Audit results may be stored using decentralized storage solutions</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-leading security measures:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>End-to-end encryption for sensitive audit data</li>
                <li>Multi-factor authentication with TOTP and hardware key support</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC2 Type II compliance and monitoring</li>
                <li>Cryptographic audit trails for all platform actions</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Data Sharing and Disclosure</h2>
              <p className="text-muted-foreground">
                We may share your information in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>With auditors for legitimate security assessment purposes</li>
                <li>With service providers who assist in platform operations</li>
                <li>When required by law or to protect platform security</li>
                <li>In connection with business transfers (with notice)</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Your Rights and Choices</h2>
              <p className="text-muted-foreground">
                You have the following rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Access and review your personal information</li>
                <li>Correct inaccurate or incomplete data</li>
                <li>Request deletion of your account and associated data</li>
                <li>Data portability for certain information types</li>
                <li>Opt-out of non-essential communications</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. International Data Transfers</h2>
              <p className="text-muted-foreground">
                As a global platform, we may transfer data across borders in compliance with:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>GDPR Article 30 data processing requirements</li>
                <li>Standard contractual clauses for international transfers</li>
                <li>Local data residency requirements where applicable</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Contact Us</h2>
              <p className="text-muted-foreground">
                For privacy-related questions or to exercise your rights, contact us at:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Privacy Officer</p>
                <p className="text-muted-foreground">Email: privacy@hawkly.com</p>
                <p className="text-muted-foreground">Address: [Company Address]</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
