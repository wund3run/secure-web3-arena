
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Lock, Database, Cookie, UserCheck } from 'lucide-react';

const Privacy = () => {
  return (
    <StandardLayout
      title="Privacy Policy"
      description="How Hawkly protects and handles your personal data"
    >
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Last updated: March 15, 2025 • Effective Date: March 15, 2025
          </p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-600" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                At Hawkly, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Web3 security marketplace platform. We are committed to protecting your personal data and maintaining transparency about our data practices.
              </p>
              <p>
                By using our services, you agree to the collection and use of information in accordance with this policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-green-600" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Personal Information You Provide</h4>
              <ul>
                <li><strong>Account Information:</strong> Name, email address, username, password</li>
                <li><strong>Profile Information:</strong> Professional background, expertise areas, certifications</li>
                <li><strong>Communication Data:</strong> Messages, support tickets, forum posts</li>
                <li><strong>Payment Information:</strong> Wallet addresses, transaction history (on-chain data)</li>
                <li><strong>Project Data:</strong> Smart contract code, audit reports, security assessments</li>
              </ul>

              <h4>Automatically Collected Information</h4>
              <ul>
                <li><strong>Usage Data:</strong> Pages visited, features used, time spent on platform</li>
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Analytics Data:</strong> User interactions, performance metrics</li>
                <li><strong>Blockchain Data:</strong> Public transaction data from connected wallets</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-purple-600" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>We use the collected information for the following purposes:</p>
              <ul>
                <li><strong>Service Delivery:</strong> Provide, maintain, and improve our platform</li>
                <li><strong>Auditor Matching:</strong> AI-powered matching between projects and auditors</li>
                <li><strong>Communication:</strong> Send updates, notifications, and support responses</li>
                <li><strong>Security:</strong> Monitor for fraudulent activity and platform abuse</li>
                <li><strong>Analytics:</strong> Understand usage patterns and improve user experience</li>
                <li><strong>Legal Compliance:</strong> Meet regulatory requirements and legal obligations</li>
                <li><strong>Marketing:</strong> Send relevant updates about platform features (with consent)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-red-600" />
                Information Sharing and Disclosure
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>We do not sell, trade, or rent your personal information. We may share information in the following circumstances:</p>
              
              <h4>With Your Consent</h4>
              <ul>
                <li>When you explicitly authorize us to share specific information</li>
                <li>When connecting with auditors for project matching</li>
              </ul>

              <h4>Service Providers</h4>
              <ul>
                <li>Third-party vendors who assist in platform operations</li>
                <li>Analytics and monitoring services</li>
                <li>Cloud infrastructure providers</li>
              </ul>

              <h4>Legal Requirements</h4>
              <ul>
                <li>When required by law or legal process</li>
                <li>To protect our rights, property, or safety</li>
                <li>To prevent fraud or security threats</li>
              </ul>

              <h4>Business Transfers</h4>
              <p>In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of the transaction.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-5 w-5 text-orange-600" />
                Cookies and Tracking Technologies
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>We use cookies and similar tracking technologies to enhance your experience:</p>
              
              <h4>Essential Cookies</h4>
              <ul>
                <li>Required for platform functionality</li>
                <li>Authentication and security</li>
                <li>Cannot be disabled</li>
              </ul>

              <h4>Analytics Cookies</h4>
              <ul>
                <li>Help us understand how you use our platform</li>
                <li>Improve user experience and performance</li>
                <li>Can be disabled in settings</li>
              </ul>

              <h4>Preference Cookies</h4>
              <ul>
                <li>Remember your settings and preferences</li>
                <li>Personalize your experience</li>
                <li>Optional and configurable</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Security and Storage</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>We implement industry-standard security measures to protect your data:</p>
              <ul>
                <li><strong>Encryption:</strong> Data encrypted in transit and at rest</li>
                <li><strong>Access Controls:</strong> Strict employee access limitations</li>
                <li><strong>Regular Audits:</strong> Security assessments and penetration testing</li>
                <li><strong>Incident Response:</strong> Procedures for handling security breaches</li>
                <li><strong>Data Backup:</strong> Regular backups with secure storage</li>
              </ul>
              
              <p>
                <strong>Data Retention:</strong> We retain personal data only as long as necessary for the purposes outlined in this policy or as required by law.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Privacy Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>Depending on your location, you may have the following rights:</p>
              
              <h4>Access and Portability</h4>
              <ul>
                <li>Request a copy of your personal data</li>
                <li>Export your data in a structured format</li>
              </ul>

              <h4>Correction and Updates</h4>
              <ul>
                <li>Correct inaccurate or incomplete information</li>
                <li>Update your profile and preferences</li>
              </ul>

              <h4>Deletion</h4>
              <ul>
                <li>Request deletion of your personal data</li>
                <li>Account deactivation and data removal</li>
              </ul>

              <h4>Objection and Restriction</h4>
              <ul>
                <li>Object to certain data processing activities</li>
                <li>Restrict how we use your information</li>
              </ul>

              <p>
                To exercise these rights, contact us at privacy@hawkly.com. We will respond within 30 days of receiving your request.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>International Data Transfers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                Your information may be transferred to and processed in countries other than your own. We ensure adequate protection through:
              </p>
              <ul>
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Other lawful transfer mechanisms</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                Our platform is not intended for children under 18 years of age. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe your child has provided us with personal information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. For material changes, we will provide additional notice through email or platform notifications.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <ul>
                <li><strong>Email:</strong> privacy@hawkly.com</li>
                <li><strong>Data Protection Officer:</strong> dpo@hawkly.com</li>
                <li><strong>Address:</strong> 123 Blockchain Ave, Web3 City, Digital State 12345</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Privacy;
