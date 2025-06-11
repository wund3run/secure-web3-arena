
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Terms() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Effective Date: March 1, 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Last updated: March 1, 2025. These terms govern your use of the Hawkly platform and services.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using the Hawkly platform ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                If you disagree with any part of these terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground mb-4">
                Hawkly is a Web3 security marketplace that connects blockchain projects with verified security experts for 
                auditing and security assessment services. We facilitate connections between service providers and clients 
                but are not responsible for the quality or outcomes of services provided.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>To use certain features of our Service, you must register for an account. You agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information during registration</li>
                  <li>Maintain and update your information to keep it accurate and current</li>
                  <li>Maintain the security of your password and identification</li>
                  <li>Accept responsibility for all activities under your account</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. User Conduct</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Transmit malicious code or attempt to gain unauthorized access</li>
                  <li>Impersonate others or provide false information</li>
                  <li>Engage in fraud or deceptive practices</li>
                  <li>Interfere with the proper functioning of the Service</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Service Provider Responsibilities</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>Security professionals using our platform agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Accurately represent their qualifications and experience</li>
                  <li>Maintain confidentiality of client information</li>
                  <li>Deliver services as described and agreed upon</li>
                  <li>Follow industry best practices and standards</li>
                  <li>Report findings honestly and completely</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Payments for services are processed through our platform. We charge a service fee for facilitating 
                transactions. All fees are clearly disclosed before completion of any transaction.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Intellectual Property</h2>
              <p className="text-muted-foreground mb-4">
                The Service and its content are protected by copyright, trademark, and other laws. You retain ownership 
                of content you submit, but grant us a license to use it for Service operations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Disclaimers</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                  EXPRESS OR IMPLIED, INCLUDING WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                </p>
                <p>
                  We do not guarantee the accuracy, completeness, or quality of security audits or assessments 
                  performed by service providers on our platform.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR USE.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Indemnification</h2>
              <p className="text-muted-foreground mb-4">
                You agree to indemnify and hold us harmless from any claims, damages, or expenses arising from 
                your use of the Service or violation of these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We may terminate or suspend your account at any time for violations of these Terms. 
                You may close your account at any time.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify these Terms at any time. We will notify users of significant 
                changes via email or platform notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">13. Contact Information</h2>
              <p className="text-muted-foreground">
                For questions about these Terms, please contact us at legal@hawkly.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
