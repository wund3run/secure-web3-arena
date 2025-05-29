
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

export default function SecurityPolicy() {
  return (
    <StandardLayout title="Security Policy - Hawkly" description="Security Policy and Vulnerability Disclosure for Hawkly">
      <div className="container py-8 max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-blue-600" />
          <h1 className="text-4xl font-bold">Security Policy</h1>
        </div>
        <p className="text-xl text-muted-foreground mb-8">
          Our commitment to platform security and responsible disclosure practices
        </p>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Platform Security Standards
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold mb-2">Infrastructure Security:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>End-to-end encryption for all data transmission</li>
                <li>Multi-factor authentication for all accounts</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliant infrastructure</li>
                <li>Automated vulnerability scanning and monitoring</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-4">Application Security:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Secure coding practices and code review processes</li>
                <li>Input validation and sanitization</li>
                <li>Protection against OWASP Top 10 vulnerabilities</li>
                <li>Rate limiting and DDoS protection</li>
                <li>Regular dependency updates and security patches</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Responsible Disclosure Program
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="mb-4">
                We welcome security researchers to help us maintain the highest security standards. 
                If you discover a vulnerability, please follow our responsible disclosure process:
              </p>
              
              <h4 className="font-semibold mb-2">Reporting Process:</h4>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Email details to security@hawkly.com with subject "Security Vulnerability"</li>
                <li>Include detailed description, reproduction steps, and potential impact</li>
                <li>Allow us 90 days to investigate and address the issue</li>
                <li>Do not publicly disclose the vulnerability until we've had time to fix it</li>
                <li>We will acknowledge receipt within 24 hours and provide regular updates</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Scope and Guidelines
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <h4 className="font-semibold mb-2">In Scope:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>hawkly.com and all subdomains</li>
                <li>API endpoints and authentication systems</li>
                <li>Web application vulnerabilities (XSS, CSRF, SQLi, etc.)</li>
                <li>Business logic flaws</li>
                <li>Access control issues</li>
              </ul>
              
              <h4 className="font-semibold mb-2 mt-4">Out of Scope:</h4>
              <ul className="list-disc pl-6 space-y-1">
                <li>Third-party services and dependencies</li>
                <li>Social engineering attacks</li>
                <li>Physical security issues</li>
                <li>Denial of service attacks</li>
                <li>Spam or content injection</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bug Bounty Program</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="mb-4">
                We offer rewards for qualifying security vulnerabilities based on their severity and impact:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold text-red-600">Critical (9.0-10.0 CVSS)</h5>
                  <p className="text-2xl font-bold">$5,000 - $10,000</p>
                  <p className="text-sm text-muted-foreground">Remote code execution, privilege escalation</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold text-orange-600">High (7.0-8.9 CVSS)</h5>
                  <p className="text-2xl font-bold">$1,000 - $5,000</p>
                  <p className="text-sm text-muted-foreground">Authentication bypass, data exposure</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold text-yellow-600">Medium (4.0-6.9 CVSS)</h5>
                  <p className="text-2xl font-bold">$250 - $1,000</p>
                  <p className="text-sm text-muted-foreground">XSS, CSRF, information disclosure</p>
                </div>
                <div className="border rounded-lg p-4">
                  <h5 className="font-semibold text-blue-600">Low (0.1-3.9 CVSS)</h5>
                  <p className="text-2xl font-bold">$50 - $250</p>
                  <p className="text-sm text-muted-foreground">Minor security misconfigurations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Incident Response</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <p className="mb-4">
                In the event of a security incident, we follow a structured response process:
              </p>
              
              <ol className="list-decimal pl-6 space-y-2">
                <li><strong>Detection & Analysis:</strong> Immediate assessment of the incident scope and impact</li>
                <li><strong>Containment:</strong> Isolate affected systems to prevent further damage</li>
                <li><strong>Eradication:</strong> Remove the threat and close security gaps</li>
                <li><strong>Recovery:</strong> Restore services and monitor for additional threats</li>
                <li><strong>Communication:</strong> Notify affected users within 72 hours if required</li>
                <li><strong>Lessons Learned:</strong> Document improvements to prevent future incidents</li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-gray max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-semibold">Security Team</h5>
                  <p>security@hawkly.com</p>
                  <p>GPG Key: [Available on request]</p>
                </div>
                <div>
                  <h5 className="font-semibold">Emergency Response</h5>
                  <p>incident@hawkly.com</p>
                  <p>24/7 monitoring and response</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}
