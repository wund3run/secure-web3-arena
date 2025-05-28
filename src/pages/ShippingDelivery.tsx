
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Download, Shield, Clock, FileText } from 'lucide-react';

const ShippingDelivery = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Helmet>
        <title>Service Delivery Policy | Hawkly</title>
        <meta name="description" content="Hawkly's service delivery policy for Web3 security audit reports and digital deliverables." />
      </Helmet>

      <div className="container py-12 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Service Delivery Policy</CardTitle>
            <p className="text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <Alert>
              <Download className="h-4 w-4" />
              <AlertDescription>
                All audit reports and deliverables are delivered digitally through our secure platform.
              </AlertDescription>
            </Alert>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Digital Delivery Overview</h2>
              <p className="text-muted-foreground">
                As a Web3 security platform, all our services are delivered digitally. We do not ship 
                physical products. All audit reports, security assessments, and related documentation 
                are provided through our secure digital platform.
              </p>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Delivery Methods</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-border/40">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Shield className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Secure Platform Delivery</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Primary delivery method through encrypted dashboard with multi-factor authentication
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-border/40">
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="font-medium">Encrypted Email</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Secondary delivery via PGP-encrypted email for urgent or backup delivery
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Delivery Timeline</h2>
              
              <div className="space-y-4">
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    Delivery times are based on project complexity and agreed-upon milestones.
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <span className="font-medium">Quick Security Review</span>
                      <p className="text-sm text-muted-foreground">Basic smart contract assessment</p>
                    </div>
                    <span className="text-muted-foreground">1-3 days</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <span className="font-medium">Standard Security Audit</span>
                      <p className="text-sm text-muted-foreground">Comprehensive security assessment</p>
                    </div>
                    <span className="text-muted-foreground">5-10 days</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <span className="font-medium">Enterprise Security Audit</span>
                      <p className="text-sm text-muted-foreground">Full platform security review</p>
                    </div>
                    <span className="text-muted-foreground">2-4 weeks</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <div>
                      <span className="font-medium">Critical Security Response</span>
                      <p className="text-sm text-muted-foreground">Emergency security assessment</p>
                    </div>
                    <span className="text-muted-foreground">24-48 hours</span>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Deliverable Formats</h2>
              <p className="text-muted-foreground">
                We provide comprehensive deliverables in multiple formats:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Executive Summary</h3>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    <li>PDF format with digital signatures</li>
                    <li>High-level security overview</li>
                    <li>Risk assessment summary</li>
                    <li>Remediation roadmap</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Technical Report</h3>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    <li>Detailed PDF with code snippets</li>
                    <li>Interactive web dashboard</li>
                    <li>Vulnerability classifications</li>
                    <li>Proof-of-concept examples</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Code Analysis</h3>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    <li>Annotated source code</li>
                    <li>Security scan results (JSON/XML)</li>
                    <li>Automated tool reports</li>
                    <li>Custom analysis scripts</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Remediation Guide</h3>
                  <ul className="list-disc pl-4 text-sm text-muted-foreground">
                    <li>Step-by-step fix instructions</li>
                    <li>Code examples and patches</li>
                    <li>Best practices documentation</li>
                    <li>Re-testing guidelines</li>
                  </ul>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Delivery Security</h2>
              <p className="text-muted-foreground">
                We ensure the highest security for all deliverables:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>End-to-end encryption for all file transfers</li>
                <li>Digital signatures on all PDF reports</li>
                <li>Access logging and audit trails</li>
                <li>Time-limited download links</li>
                <li>Watermarked documents with client identification</li>
                <li>Secure deletion of temporary files</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Access and Retrieval</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Platform Access</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>24/7 access to completed deliverables</li>
                  <li>Multi-factor authentication required</li>
                  <li>Role-based access for team members</li>
                  <li>Download history and version control</li>
                </ul>

                <h3 className="text-lg font-medium">Backup Delivery</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Encrypted email delivery as backup</li>
                  <li>Secure file sharing links (password protected)</li>
                  <li>Emergency access procedures</li>
                  <li>Offline storage options for enterprises</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Re-delivery and Support</h2>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h3 className="font-medium">Free Re-delivery</h3>
                <ul className="list-disc pl-4 text-sm text-muted-foreground">
                  <li>Unlimited re-downloads for 12 months</li>
                  <li>Format conversion upon request</li>
                  <li>Technical support for accessing deliverables</li>
                  <li>Emergency access assistance (24/7)</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Delivery Confirmation</h2>
              <p className="text-muted-foreground">
                We provide multiple confirmation methods:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Automated email notifications upon delivery</li>
                <li>Platform notifications and alerts</li>
                <li>Delivery receipts with timestamps</li>
                <li>Download confirmation tracking</li>
                <li>Client acknowledgment requirements for critical reports</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">9. Delivery Issues</h2>
              <p className="text-muted-foreground">
                If you experience any delivery issues:
              </p>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Delivery Support</p>
                <p className="text-muted-foreground">Email: delivery@hawkly.com</p>
                <p className="text-muted-foreground">Emergency Line: +1 (555) 123-HAWK</p>
                <p className="text-muted-foreground">Response Time: Within 4 hours</p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShippingDelivery;
