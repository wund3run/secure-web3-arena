
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Bug } from 'lucide-react';

const SecurityPolicy = () => {
  return (
    <StandardLayout
      title="Security Policy"
      description="Hawkly's comprehensive security policies and procedures"
    >
      <div className="container py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Security Policy</h1>
          <p className="text-muted-foreground mb-4">
            Last updated: March 15, 2025
          </p>
          <Badge variant="secondary" className="text-sm">
            Version 2.1 - Enhanced for 2025 Compliance
          </Badge>
        </div>

        <Alert className="mb-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Security is our top priority.</strong> This policy outlines our commitment to protecting user data, 
            platform integrity, and the security of all Web3 projects on our marketplace.
          </AlertDescription>
        </Alert>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                Security Framework Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <p>
                Hawkly implements a comprehensive, multi-layered security framework designed to protect our platform, 
                users, and the Web3 projects we serve. Our security approach follows industry best practices and 
                complies with international security standards including ISO 27001, SOC 2 Type II, and Web3 security guidelines.
              </p>
              
              <h4>Core Security Principles</h4>
              <ul>
                <li><strong>Defense in Depth:</strong> Multiple layers of security controls</li>
                <li><strong>Zero Trust Architecture:</strong> Never trust, always verify</li>
                <li><strong>Continuous Monitoring:</strong> 24/7 security surveillance</li>
                <li><strong>Incident Response:</strong> Rapid response to security events</li>
                <li><strong>Regular Auditing:</strong> Ongoing security assessments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-600" />
                Data Protection and Encryption
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Data Encryption Standards</h4>
              <ul>
                <li><strong>In Transit:</strong> TLS 1.3 encryption for all data transmission</li>
                <li><strong>At Rest:</strong> AES-256 encryption for stored data</li>
                <li><strong>End-to-End:</strong> Encrypted communication for sensitive project data</li>
                <li><strong>Key Management:</strong> HSM-backed key rotation and management</li>
              </ul>

              <h4>Data Classification</h4>
              <ul>
                <li><strong>Public:</strong> General platform information, public audit reports</li>
                <li><strong>Internal:</strong> User profiles, platform analytics</li>
                <li><strong>Confidential:</strong> Project source code, private communications</li>
                <li><strong>Restricted:</strong> Payment information, security credentials</li>
              </ul>

              <h4>Data Retention and Disposal</h4>
              <p>
                We maintain strict data retention policies and secure disposal procedures for all categories of data. 
                Personal data is retained only as long as necessary for business purposes or legal requirements.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-purple-600" />
                Access Control and Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Multi-Factor Authentication (MFA)</h4>
              <ul>
                <li>Required for all user accounts</li>
                <li>Support for TOTP, hardware keys, and biometric authentication</li>
                <li>Backup recovery codes for account recovery</li>
              </ul>

              <h4>Role-Based Access Control (RBAC)</h4>
              <ul>
                <li><strong>Users:</strong> Basic platform access and project submission</li>
                <li><strong>Auditors:</strong> Enhanced access to audit tools and project details</li>
                <li><strong>Administrators:</strong> Platform management and security oversight</li>
                <li><strong>Developers:</strong> Technical platform management</li>
              </ul>

              <h4>Session Management</h4>
              <ul>
                <li>Secure session tokens with automatic expiration</li>
                <li>Device tracking and suspicious activity detection</li>
                <li>Concurrent session limits and management</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                Platform Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Infrastructure Security</h4>
              <ul>
                <li><strong>Cloud Security:</strong> AWS/Azure security controls and compliance</li>
                <li><strong>Network Segmentation:</strong> Isolated environments for different components</li>
                <li><strong>DDoS Protection:</strong> Advanced threat mitigation and load balancing</li>
                <li><strong>Intrusion Detection:</strong> Real-time monitoring and alerting</li>
              </ul>

              <h4>Application Security</h4>
              <ul>
                <li><strong>Secure Development:</strong> SAST/DAST integrated into CI/CD pipeline</li>
                <li><strong>Dependency Scanning:</strong> Automated vulnerability detection in dependencies</li>
                <li><strong>Container Security:</strong> Image scanning and runtime protection</li>
                <li><strong>API Security:</strong> Rate limiting, authentication, and input validation</li>
              </ul>

              <h4>Smart Contract Security</h4>
              <ul>
                <li><strong>Escrow Contracts:</strong> Formally verified smart contracts for payments</li>
                <li><strong>Multi-sig Wallets:</strong> Shared control over critical functions</li>
                <li><strong>Upgrade Mechanisms:</strong> Secure and transparent contract upgrades</li>
                <li><strong>External Audits:</strong> Regular third-party security assessments</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-red-600" />
                Vulnerability Management
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Bug Bounty Program</h4>
              <p>
                We operate a comprehensive bug bounty program to identify and resolve security vulnerabilities. 
                Responsible researchers are rewarded for discovering and reporting security issues.
              </p>
              
              <div className="bg-muted p-4 rounded-lg my-4">
                <h5 className="font-semibold mb-2">Reward Structure</h5>
                <ul className="text-sm space-y-1">
                  <li><strong>Critical:</strong> $5,000 - $25,000</li>
                  <li><strong>High:</strong> $1,000 - $5,000</li>
                  <li><strong>Medium:</strong> $250 - $1,000</li>
                  <li><strong>Low:</strong> $50 - $250</li>
                </ul>
              </div>

              <h4>Vulnerability Disclosure</h4>
              <ul>
                <li><strong>Responsible Disclosure:</strong> 90-day coordinated disclosure timeline</li>
                <li><strong>Communication:</strong> Regular updates to reporters</li>
                <li><strong>Recognition:</strong> Public acknowledgment (with permission)</li>
                <li><strong>Remediation:</strong> Prioritized fixing based on severity</li>
              </ul>

              <h4>Security Research Guidelines</h4>
              <ul>
                <li>No testing on production systems without permission</li>
                <li>No accessing or modifying user data</li>
                <li>No social engineering or physical attacks</li>
                <li>Report findings through security@hawkly.com</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident Response Plan</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Incident Classification</h4>
              <ul>
                <li><strong>Critical:</strong> Data breach, system compromise, service disruption</li>
                <li><strong>High:</strong> Unauthorized access, significant vulnerability</li>
                <li><strong>Medium:</strong> Minor security event, policy violation</li>
                <li><strong>Low:</strong> Suspicious activity, non-critical issues</li>
              </ul>

              <h4>Response Timeline</h4>
              <ul>
                <li><strong>Critical:</strong> 1 hour initial response, 4 hours assessment</li>
                <li><strong>High:</strong> 4 hours initial response, 24 hours assessment</li>
                <li><strong>Medium:</strong> 24 hours initial response, 72 hours assessment</li>
                <li><strong>Low:</strong> 72 hours initial response, 1 week assessment</li>
              </ul>

              <h4>Communication Protocol</h4>
              <ul>
                <li>Immediate notification to security team</li>
                <li>User notification within 72 hours (if applicable)</li>
                <li>Regular status updates during incident resolution</li>
                <li>Post-incident report and lessons learned</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance and Certifications</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Current Certifications</h4>
              <ul>
                <li><strong>SOC 2 Type II:</strong> Annual third-party security audit</li>
                <li><strong>ISO 27001:</strong> Information security management certification</li>
                <li><strong>GDPR Compliance:</strong> European data protection regulation</li>
                <li><strong>CCPA Compliance:</strong> California consumer privacy act</li>
              </ul>

              <h4>Industry Standards</h4>
              <ul>
                <li>NIST Cybersecurity Framework</li>
                <li>OWASP Application Security Verification Standard</li>
                <li>CIS Critical Security Controls</li>
                <li>Web3 Security Standards (EIP-4337, etc.)</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Training and Awareness</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Employee Training</h4>
              <ul>
                <li>Monthly security awareness training</li>
                <li>Phishing simulation and testing</li>
                <li>Secure coding practices for developers</li>
                <li>Incident response training and drills</li>
              </ul>

              <h4>User Education</h4>
              <ul>
                <li>Security best practices documentation</li>
                <li>Webinar series on Web3 security</li>
                <li>Platform security features guide</li>
                <li>Community security discussions</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-slate max-w-none">
              <h4>Security Team Contacts</h4>
              <ul>
                <li><strong>General Security:</strong> security@hawkly.com</li>
                <li><strong>Vulnerability Reports:</strong> bugbounty@hawkly.com</li>
                <li><strong>Security Incidents:</strong> incident@hawkly.com</li>
                <li><strong>Privacy Concerns:</strong> privacy@hawkly.com</li>
              </ul>

              <h4>Emergency Contact</h4>
              <p>
                For critical security incidents requiring immediate attention, 
                contact our 24/7 security hotline: +1-800-HAWKLY-SEC
              </p>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800">
                  <strong>Note:</strong> This security policy is reviewed and updated quarterly. 
                  The next scheduled review is June 15, 2025.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};

export default SecurityPolicy;
