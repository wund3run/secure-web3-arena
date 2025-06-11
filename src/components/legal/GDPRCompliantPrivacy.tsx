
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Globe, Users, Lock } from 'lucide-react';

export function GDPRCompliantPrivacy() {
  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="h-6 w-6 text-primary" />
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <Badge variant="secondary" className="ml-2">GDPR & India Compliant</Badge>
        </div>
        <p className="text-muted-foreground">
          Last updated: January 2025 | Effective globally including EU and India
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Globe className="h-4 w-4" />
              Global Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Compliant with GDPR, Indian DPDP Act 2023, and international privacy laws
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Users className="h-4 w-4" />
              Your Rights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Right to access, rectify, delete, and port your personal data
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-sm">
              <Lock className="h-4 w-4" />
              Data Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              End-to-end encryption and secure data processing practices
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1. Data Controller Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">For EU Users (GDPR):</h4>
              <p className="text-sm text-muted-foreground">
                Hawkly Technologies Ltd.<br />
                Data Protection Officer: dpo@hawkly.com<br />
                EU Representative: eu-representative@hawkly.com
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Indian Users (DPDP Act 2023):</h4>
              <p className="text-sm text-muted-foreground">
                Hawkly India Private Limited<br />
                Data Protection Officer: dpo.india@hawkly.com<br />
                Indian Operations: privacy.india@hawkly.com
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Legal Basis for Processing (GDPR Art. 6)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li><strong>Contract Performance:</strong> Processing necessary for audit services delivery</li>
              <li><strong>Legitimate Interest:</strong> Platform security, fraud prevention, service improvement</li>
              <li><strong>Consent:</strong> Marketing communications, optional data processing</li>
              <li><strong>Legal Obligation:</strong> Compliance with financial and security regulations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Data Categories and Processing Purposes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Personal Data We Collect:</h4>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Identity data (name, email, phone number)</li>
                  <li>Professional credentials and certifications</li>
                  <li>Payment and transaction information</li>
                  <li>Technical data (IP address, browser info, device data)</li>
                  <li>Usage data and platform interactions</li>
                  <li>Communication records for audit coordination</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Special Categories (Art. 9 GDPR):</h4>
                <p className="text-sm text-muted-foreground">
                  We do not process special categories of personal data unless explicitly consented to by the user.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Your Rights Under GDPR and Indian DPDP Act</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">GDPR Rights (EU Users):</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Right of access (Art. 15)</li>
                  <li>• Right to rectification (Art. 16)</li>
                  <li>• Right to erasure (Art. 17)</li>
                  <li>• Right to restrict processing (Art. 18)</li>
                  <li>• Right to data portability (Art. 20)</li>
                  <li>• Right to object (Art. 21)</li>
                  <li>• Right to withdraw consent</li>
                  <li>• Right to lodge a complaint with supervisory authority</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">DPDP Act Rights (Indian Users):</h4>
                <ul className="space-y-1 text-sm">
                  <li>• Right to confirmation and access</li>
                  <li>• Right to correction and erasure</li>
                  <li>• Right to grievance redressal</li>
                  <li>• Right to nominate (for deceased users)</li>
                  <li>• Right to withdraw consent</li>
                  <li>• Right to file complaints with Data Protection Board</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. International Data Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <p className="text-sm">
                <strong>For EU Users:</strong> Data transfers outside the EEA are protected by:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>European Commission adequacy decisions</li>
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>Binding Corporate Rules where applicable</li>
              </ul>
              <p className="text-sm">
                <strong>For Indian Users:</strong> Cross-border transfers comply with DPDP Act requirements including:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-sm">
                <li>Explicit consent for transfers to non-adequate countries</li>
                <li>Data localization for sensitive personal data</li>
                <li>Contractual safeguards with international processors</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Data Retention and Deletion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ul className="space-y-2 text-sm">
                <li><strong>Account Data:</strong> Retained while account is active + 7 years for legal compliance</li>
                <li><strong>Audit Reports:</strong> 10 years retention for professional liability requirements</li>
                <li><strong>Communication Logs:</strong> 3 years for dispute resolution purposes</li>
                <li><strong>Payment Records:</strong> As required by financial regulations (typically 7 years)</li>
                <li><strong>Marketing Data:</strong> Until consent is withdrawn or data subject objects</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-3">
                <strong>Automated Deletion:</strong> We implement automated deletion processes to ensure data is not retained longer than necessary.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Contact Information for Privacy Matters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">General Privacy Inquiries:</h4>
                <p className="text-sm">Email: privacy@hawkly.com</p>
                <p className="text-sm">Response time: Within 72 hours</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Data Protection Officers:</h4>
                <p className="text-sm">EU DPO: dpo@hawkly.com</p>
                <p className="text-sm">India DPO: dpo.india@hawkly.com</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted/50 rounded-lg">
              <p className="text-sm">
                <strong>Emergency Data Breach Notification:</strong> security-incident@hawkly.com<br />
                We will notify relevant supervisory authorities and affected individuals within 72 hours of becoming aware of a breach, as required by law.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
