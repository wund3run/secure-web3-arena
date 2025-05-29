
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicy() {
  return (
    <StandardLayout title="Privacy Policy - Hawkly" description="Privacy Policy for the Hawkly Web3 Security Platform">
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Information We Collect</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold mb-2">Personal Information:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Name, email address, and contact information</li>
                <li>Professional credentials and experience</li>
                <li>Wallet addresses for payment processing</li>
                <li>Profile information and portfolio details</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-4">Technical Information:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>IP addresses and device information</li>
                <li>Usage analytics and platform interactions</li>
                <li>Communication logs and messages</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. How We Use Your Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ul className="list-disc pl-6 space-y-2">
                <li>Facilitate connections between clients and auditors</li>
                <li>Process payments and manage escrow services</li>
                <li>Verify auditor credentials and maintain quality standards</li>
                <li>Improve platform functionality and user experience</li>
                <li>Communicate important updates and notifications</li>
                <li>Ensure platform security and prevent fraud</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. Data Protection</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We implement industry-standard security measures to protect your data, including:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication mechanisms</li>
                <li>Secure cloud infrastructure with redundancy</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Data Sharing</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                We do not sell your personal information. We may share data only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>With auditors and clients to facilitate engagements</li>
                <li>With service providers who assist in platform operations</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In connection with business transfers or acquisitions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Your Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2">
                <li>Access and review your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt out of non-essential communications</li>
                <li>Data portability for your personal information</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For privacy-related questions or to exercise your rights:
                <br />
                Email: privacy@hawkly.com
                <br />
                Data Protection Officer: dpo@hawkly.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}
