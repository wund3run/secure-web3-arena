
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfService() {
  return (
    <StandardLayout title="Terms of Service - Hawkly" description="Terms of Service for the Hawkly Web3 Security Platform">
      <div className="container py-8 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>1. Acceptance of Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                By accessing and using Hawkly ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>2. Platform Description</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Hawkly is a Web3 security marketplace that connects project owners with verified security auditors. 
                The platform facilitates smart contract audits, security reviews, and vulnerability assessments for blockchain projects.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. User Responsibilities</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide accurate and complete information during registration</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Use the platform in compliance with all applicable laws and regulations</li>
                <li>Respect intellectual property rights of other users</li>
                <li>Report any security vulnerabilities or suspicious activities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. Auditor Obligations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain professional standards and ethical conduct</li>
                <li>Provide thorough and accurate security assessments</li>
                <li>Protect client confidentiality and proprietary information</li>
                <li>Meet agreed-upon deadlines and deliverables</li>
                <li>Disclose any conflicts of interest</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. Payment and Escrow</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                All payments are processed through our secure escrow system. Funds are released to auditors upon successful completion 
                and client approval of audit deliverables. Platform fees apply as disclosed during the engagement process.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                Hawkly acts as a platform facilitator and is not responsible for the quality, accuracy, or completeness of audits 
                performed by independent auditors. Users engage auditors at their own risk and should perform due diligence.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p>
                For questions about these Terms of Service, please contact us at:
                <br />
                Email: legal@hawkly.com
                <br />
                Address: [To be added based on legal entity location]
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}
