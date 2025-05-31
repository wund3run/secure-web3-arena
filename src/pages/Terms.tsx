
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Terms() {
  return (
    <StandardLayout
      title="Terms of Service"
      description="Read Hawkly's terms of service and understand your rights and responsibilities when using our Web3 security marketplace platform."
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Terms of Service</CardTitle>
            <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using Hawkly ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Hawkly is a Web3 security marketplace that connects blockchain projects with qualified security auditors. Our platform provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>AI-powered matching between projects and auditors</li>
                <li>Secure escrow services for audit payments</li>
                <li>Real-time collaboration tools</li>
                <li>Comprehensive audit reporting and tracking</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Project Owners</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Provide accurate project information</li>
                    <li>Ensure code accessibility for auditors</li>
                    <li>Respond promptly to auditor queries</li>
                    <li>Pay agreed-upon fees through escrow</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Auditors</h3>
                  <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                    <li>Maintain professional qualifications</li>
                    <li>Provide thorough and accurate audit reports</li>
                    <li>Meet agreed-upon deadlines</li>
                    <li>Maintain confidentiality of project information</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Payment and Escrow</h2>
              <p className="text-muted-foreground mb-4">
                All audit payments are processed through our secure escrow system. Payments are released based on milestone completion and mutual agreement.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Platform fees are clearly disclosed before engagement</li>
                <li>Disputes are handled through our arbitration process</li>
                <li>Refunds are processed according to our refund policy</li>
              </ul>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                Users retain ownership of their intellectual property. By using the platform, you grant us a limited license to provide our services.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                Hawkly provides a platform for connecting auditors and projects. While we facilitate the process, the quality and accuracy of audits remain the responsibility of the individual auditors.
              </p>
            </section>

            <Separator />

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, please contact us at legal@hawkly.com
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
}
