
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Privacy() {
  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Effective Date: March 1, 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                This Privacy Policy describes how Hawkly collects, uses, and protects your personal information.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <h3 className="text-lg font-semibold">Personal Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Name, email address, and contact information</li>
                  <li>Professional qualifications and experience</li>
                  <li>Payment and billing information</li>
                  <li>Profile information and preferences</li>
                </ul>
                
                <h3 className="text-lg font-semibold">Technical Information</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>IP address and device information</li>
                  <li>Browser type and version</li>
                  <li>Usage data and platform interactions</li>
                  <li>Cookies and similar technologies</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. How We Use Your Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We use collected information to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide and improve our services</li>
                  <li>Facilitate connections between users</li>
                  <li>Process payments and transactions</li>
                  <li>Send important updates and notifications</li>
                  <li>Ensure platform security and prevent fraud</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Information Sharing</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>We may share your information with:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Other users as necessary for service delivery</li>
                  <li>Service providers who assist our operations</li>
                  <li>Legal authorities when required by law</li>
                  <li>Business partners with your consent</li>
                </ul>
                <p className="mt-4">We do not sell your personal information to third parties.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement industry-standard security measures to protect your information, including encryption, 
                secure data centers, and regular security audits. However, no method of transmission over the 
                internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Retention</h2>
              <p className="text-muted-foreground mb-4">
                We retain your information for as long as necessary to provide services and comply with legal 
                obligations. You may request deletion of your data, subject to certain legal requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Your Rights</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access and review your personal information</li>
                  <li>Correct inaccurate or incomplete data</li>
                  <li>Request deletion of your information</li>
                  <li>Object to processing of your data</li>
                  <li>Data portability where applicable</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar technologies to enhance your experience, analyze usage, and provide 
                personalized content. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect 
                personal information from children under 18.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. International Transfers</h2>
              <p className="text-muted-foreground mb-4">
                Your information may be transferred to and processed in countries other than your own. 
                We ensure appropriate safeguards are in place for such transfers.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy periodically. We will notify you of significant changes 
                via email or platform notification.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <div className="text-muted-foreground">
                <p className="mb-2">For privacy-related questions or requests, contact us at:</p>
                <p>Email: privacy@hawkly.com</p>
                <p>Address: Hawkly Privacy Team</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
