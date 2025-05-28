import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PageMeta } from '@/components/seo/PageMeta';
import { Mail, Shield, Clock, Truck, FileText, Lock } from 'lucide-react';

export function Terms() {
  return (
    <>
      <PageMeta
        title="Terms and Conditions"
        description="Terms and conditions for using the Hawkly Web3 security marketplace platform."
        keywords={['terms', 'conditions', 'legal', 'web3', 'security', 'blockchain']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Terms and Conditions</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By accessing and using Hawkly, you accept and agree to be bound by the terms and provision of this agreement. 
                  Hawkly is a Web3 security marketplace platform that connects blockchain projects with verified security experts.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Platform Services</h2>
                <p className="mb-4">
                  Hawkly provides a marketplace for security auditing services including:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Smart contract security audits</li>
                  <li>DeFi protocol security reviews</li>
                  <li>Blockchain infrastructure assessments</li>
                  <li>Web3 application security testing</li>
                  <li>Escrow services for secure payments</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
                <p className="mb-4">
                  Users are responsible for maintaining the confidentiality of their account credentials and for all activities 
                  that occur under their account. You agree to provide accurate and complete information when creating an account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Service Provider Obligations</h2>
                <p className="mb-4">
                  Security service providers must maintain professional standards, deliver services as specified, and comply 
                  with platform guidelines. All providers undergo verification before joining the platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
                <p className="mb-4">
                  Payments are processed through our secure escrow system. Platform fees are clearly disclosed before transaction completion. 
                  Refunds are subject to our refund policy and dispute resolution process.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                <p className="mb-4">
                  All audit reports and security assessments remain the intellectual property of the client. 
                  Service providers retain rights to methodologies and tools used in their assessments.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                <p className="mb-4">
                  Hawkly acts as an intermediary platform. While we verify service providers, we are not liable for the quality 
                  or accuracy of security audits. Our liability is limited to the platform fees paid.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact Information</h2>
                <p className="mb-4">
                  For questions about these terms, please contact us at{' '}
                  <a href="mailto:legal@hawkly.com" className="text-primary hover:underline">
                    legal@hawkly.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function Privacy() {
  return (
    <>
      <PageMeta
        title="Privacy Policy"
        description="Privacy policy for the Hawkly Web3 security marketplace platform."
        keywords={['privacy', 'policy', 'data protection', 'web3', 'security']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Privacy Policy</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                <p className="mb-4">
                  We collect information you provide directly to us, such as when you create an account, request services, 
                  or communicate with us. This includes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Account information (name, email, profile details)</li>
                  <li>Project information for security assessments</li>
                  <li>Payment and billing information</li>
                  <li>Communication records</li>
                  <li>Usage data and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Provide and maintain our marketplace services</li>
                  <li>Process transactions and payments</li>
                  <li>Match clients with appropriate security experts</li>
                  <li>Communicate with you about services and updates</li>
                  <li>Improve platform security and functionality</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                <p className="mb-4">
                  We do not sell or rent your personal information. We may share information in limited circumstances:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>With service providers to facilitate transactions</li>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights and prevent fraud</li>
                  <li>With your explicit consent</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information 
                  against unauthorized access, alteration, disclosure, or destruction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Web3 and Blockchain Data</h2>
                <p className="mb-4">
                  When you connect Web3 wallets or interact with blockchain services, some data may be publicly visible 
                  on the blockchain. We do not control this data once it's on the blockchain.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                <p className="mb-4">
                  You have the right to access, update, or delete your personal information. You can also opt out of 
                  certain communications and data processing activities.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                <p className="mb-4">
                  For privacy-related questions, contact us at{' '}
                  <a href="mailto:privacy@hawkly.com" className="text-primary hover:underline">
                    privacy@hawkly.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function SecurityPolicy() {
  return (
    <>
      <PageMeta
        title="Security Policy"
        description="Security policy and practices for the Hawkly Web3 security marketplace platform."
        keywords={['security', 'policy', 'web3', 'blockchain', 'cybersecurity']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Lock className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Security Policy</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Platform Security</h2>
                <p className="mb-4">
                  Hawkly implements industry-leading security measures to protect our platform and users:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>End-to-end encryption for all communications</li>
                  <li>Multi-factor authentication (MFA) support</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>SOC 2 Type II compliance</li>
                  <li>GDPR and data protection compliance</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Data Protection</h2>
                <p className="mb-4">
                  We protect sensitive information through:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>AES-256 encryption for data at rest</li>
                  <li>TLS 1.3 for data in transit</li>
                  <li>Secure key management practices</li>
                  <li>Regular automated backups</li>
                  <li>Access controls and audit logging</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Web3 Security</h2>
                <p className="mb-4">
                  For Web3 integrations, we implement:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Secure wallet connection protocols</li>
                  <li>Smart contract security verification</li>
                  <li>Multi-signature transaction support</li>
                  <li>Blockchain transaction monitoring</li>
                  <li>DeFi protocol risk assessment</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Auditor Verification</h2>
                <p className="mb-4">
                  Security service providers undergo rigorous verification:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Identity and credential verification</li>
                  <li>Technical skill assessments</li>
                  <li>Background checks where applicable</li>
                  <li>Portfolio and reference validation</li>
                  <li>Ongoing performance monitoring</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibent mb-4">5. Incident Response</h2>
                <p className="mb-4">
                  Our incident response process includes:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>24/7 security monitoring</li>
                  <li>Rapid incident detection and response</li>
                  <li>Automated threat mitigation</li>
                  <li>User notification procedures</li>
                  <li>Post-incident analysis and improvement</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Responsible Disclosure</h2>
                <p className="mb-4">
                  We encourage responsible disclosure of security vulnerabilities:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Bug bounty program for verified researchers</li>
                  <li>Secure reporting channels</li>
                  <li>Timely acknowledgment and resolution</li>
                  <li>Recognition for responsible disclosure</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. User Security Best Practices</h2>
                <p className="mb-4">
                  We recommend users follow these security practices:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Enable two-factor authentication</li>
                  <li>Use strong, unique passwords</li>
                  <li>Keep wallet software updated</li>
                  <li>Verify transaction details before signing</li>
                  <li>Report suspicious activities immediately</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Compliance and Certifications</h2>
                <p className="mb-4">
                  Hawkly maintains compliance with:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>SOC 2 Type II certification</li>
                  <li>GDPR and CCPA requirements</li>
                  <li>ISO 27001 information security standards</li>
                  <li>Industry-specific regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Contact Security Team</h2>
                <p className="mb-4">
                  For security-related concerns, contact our security team at{' '}
                  <a href="mailto:security@hawkly.com" className="text-primary hover:underline">
                    security@hawkly.com
                  </a>
                </p>
                <p className="mb-4">
                  For urgent security incidents, use our{' '}
                  <a href="mailto:incident@hawkly.com" className="text-primary hover:underline">
                    incident@hawkly.com
                  </a>{' '}
                  address for immediate attention.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function CancellationRefund() {
  return (
    <>
      <PageMeta
        title="Cancellation and Refund Policy"
        description="Cancellation and refund policy for Hawkly Web3 security services."
        keywords={['cancellation', 'refund', 'policy', 'web3', 'security', 'audit']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Clock className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Cancellation and Refund Policy</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Service Cancellation</h2>
                <p className="mb-4">
                  Clients may cancel security audit services under the following conditions:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Before the auditor begins work: Full refund minus platform fees</li>
                  <li>After work has begun: Refund based on completed milestones</li>
                  <li>Emergency cancellations: Subject to individual review</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Refund Eligibility</h2>
                <p className="mb-4">Refunds may be issued in the following situations:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Service provider fails to deliver as specified</li>
                  <li>Major delays beyond agreed timelines</li>
                  <li>Quality issues that cannot be resolved</li>
                  <li>Breach of service agreement by provider</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Escrow Protection</h2>
                <p className="mb-4">
                  All payments are held in escrow until milestone completion. This protects both clients and service providers:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Funds released only upon milestone approval</li>
                  <li>Dispute resolution process available</li>
                  <li>Automatic refund for unresolved disputes</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Refund Process</h2>
                <p className="mb-4">
                  Refund requests are processed within 5-10 business days. Funds are returned to the original payment method. 
                  Platform fees (typically 5%) are non-refundable except in cases of platform error.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Dispute Resolution</h2>
                <p className="mb-4">
                  Before requesting a refund, we encourage using our dispute resolution process:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Direct communication with service provider</li>
                  <li>Platform mediation services</li>
                  <li>Independent arbitration if needed</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Contact for Refunds</h2>
                <p className="mb-4">
                  To request a refund or cancellation, contact our support team at{' '}
                  <a href="mailto:support@hawkly.com" className="text-primary hover:underline">
                    support@hawkly.com
                  </a>{' '}
                  with your project details and reason for the request.
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function ShippingDelivery() {
  return (
    <>
      <PageMeta
        title="Service Delivery Policy"
        description="Service delivery terms and timelines for Hawkly Web3 security audits."
        keywords={['delivery', 'timeline', 'service', 'web3', 'security', 'audit']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Truck className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Service Delivery Policy</h1>
            </div>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Digital Service Delivery</h2>
                <p className="mb-4">
                  Hawkly provides digital security services delivered electronically. All audit reports, assessments, 
                  and recommendations are delivered through our secure platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Delivery Timelines</h2>
                <p className="mb-4">Standard delivery timelines by service type:</p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Smart Contract Audit: 5-14 business days</li>
                  <li>DeFi Protocol Review: 7-21 business days</li>
                  <li>Full Platform Assessment: 14-30 business days</li>
                  <li>Emergency Security Review: 1-3 business days</li>
                </ul>
                <p className="mb-4">
                  Actual timelines depend on project complexity and current auditor workload.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Milestone-Based Delivery</h2>
                <p className="mb-4">
                  Most security services are delivered in milestones:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Initial assessment and scope confirmation</li>
                  <li>Preliminary findings report</li>
                  <li>Detailed vulnerability analysis</li>
                  <li>Final report with recommendations</li>
                  <li>Follow-up verification (if needed)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Report Delivery Format</h2>
                <p className="mb-4">
                  Security audit reports are delivered in multiple formats:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Interactive platform dashboard</li>
                  <li>PDF executive summary</li>
                  <li>Detailed technical documentation</li>
                  <li>Remediation guidelines</li>
                  <li>Code annotations and suggestions</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Communication During Delivery</h2>
                <p className="mb-4">
                  Throughout the service delivery process:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Regular progress updates via platform messaging</li>
                  <li>Real-time milestone tracking</li>
                  <li>Direct access to auditor for questions</li>
                  <li>Escalation support if needed</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Quality Assurance</h2>
                <p className="mb-4">
                  All delivered services undergo quality checks:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>Peer review by senior auditors</li>
                  <li>Completeness verification</li>
                  <li>Format and clarity standards</li>
                  <li>Client satisfaction follow-up</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Post-Delivery Support</h2>
                <p className="mb-4">
                  After service delivery:
                </p>
                <ul className="list-disc pl-6 mb-4">
                  <li>30-day clarification period included</li>
                  <li>Follow-up verification services available</li>
                  <li>Remediation guidance and support</li>
                  <li>Annual security check recommendations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Contact for Delivery Issues</h2>
                <p className="mb-4">
                  For questions about service delivery, contact us at{' '}
                  <a href="mailto:delivery@hawkly.com" className="text-primary hover:underline">
                    delivery@hawkly.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export function Contact() {
  return (
    <>
      <PageMeta
        title="Contact Us"
        description="Get in touch with the Hawkly team for Web3 security services and support."
        keywords={['contact', 'support', 'web3', 'security', 'help']}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Mail className="h-8 w-8 text-primary mr-3" />
              <h1 className="text-4xl font-bold">Contact Us</h1>
            </div>
            <p className="text-muted-foreground mb-8">
              Get in touch with our team for support, partnerships, or security services.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">General Inquiries</h3>
                    <p className="text-muted-foreground mb-2">
                      For general questions about our platform and services.
                    </p>
                    <a href="mailto:hello@hawkly.com" className="text-primary hover:underline">
                      hello@hawkly.com
                    </a>
                  </div>

                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Support</h3>
                    <p className="text-muted-foreground mb-2">
                      Technical support and platform assistance.
                    </p>
                    <a href="mailto:support@hawkly.com" className="text-primary hover:underline">
                      support@hawkly.com
                    </a>
                  </div>

                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Security Services</h3>
                    <p className="text-muted-foreground mb-2">
                      Request security audits and assessments.
                    </p>
                    <a href="mailto:audits@hawkly.com" className="text-primary hover:underline">
                      audits@hawkly.com
                    </a>
                  </div>

                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Partnerships</h3>
                    <p className="text-muted-foreground mb-2">
                      Business partnerships and collaboration opportunities.
                    </p>
                    <a href="mailto:partnerships@hawkly.com" className="text-primary hover:underline">
                      partnerships@hawkly.com
                    </a>
                  </div>

                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Join as Auditor</h3>
                    <p className="text-muted-foreground mb-2">
                      Apply to become a verified security expert.
                    </p>
                    <a href="mailto:join@hawkly.com" className="text-primary hover:underline">
                      join@hawkly.com
                    </a>
                  </div>

                  <div className="p-6 bg-card rounded-lg border">
                    <h3 className="font-semibold mb-2">Legal & Compliance</h3>
                    <p className="text-muted-foreground mb-2">
                      Legal inquiries and compliance matters.
                    </p>
                    <a href="mailto:legal@hawkly.com" className="text-primary hover:underline">
                      legal@hawkly.com
                    </a>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold mb-6">Quick Actions</h2>
                
                <div className="space-y-4">
                  <a
                    href="/request-audit"
                    className="block p-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">Request Security Audit</h3>
                    <p className="text-sm opacity-90">
                      Get started with a comprehensive security assessment for your Web3 project.
                    </p>
                  </a>

                  <a
                    href="/service-provider-onboarding"
                    className="block p-4 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">Become an Auditor</h3>
                    <p className="text-sm opacity-90">
                      Join our network of verified security experts and offer your services.
                    </p>
                  </a>

                  <a
                    href="/marketplace"
                    className="block p-4 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <h3 className="font-semibold mb-2">Browse Services</h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our marketplace of security services and expert auditors.
                    </p>
                  </a>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                  <div className="flex space-x-4">
                    <a
                      href="https://twitter.com/hawkly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Twitter
                    </a>
                    <a
                      href="https://github.com/hawkly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href="https://discord.gg/hawkly"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Discord
                    </a>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <h3 className="font-semibold text-amber-800 mb-2">Emergency Security Issues</h3>
                  <p className="text-sm text-amber-700">
                    For urgent security vulnerabilities or incidents, please email{' '}
                    <a href="mailto:security@hawkly.com" className="underline">
                      security@hawkly.com
                    </a>{' '}
                    immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
