
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RefreshCw, Shield, Clock } from 'lucide-react';

const CancellationRefund = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5">
      <Helmet>
        <title>Cancellation & Refund Policy | Hawkly</title>
        <meta name="description" content="Hawkly's cancellation and refund policy for Web3 security audit services." />
      </Helmet>

      <div className="container py-12 max-w-4xl">
        <Card className="bg-white/80 backdrop-blur border-border/40">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Cancellation & Refund Policy</CardTitle>
            <p className="text-muted-foreground text-center">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardHeader>
          <CardContent className="space-y-8">
            <Alert>
              <Shield className="h-4 w-4" />
              <AlertDescription>
                Our escrow system protects both clients and auditors with fair cancellation and refund policies.
              </AlertDescription>
            </Alert>

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">1. Cancellation Rights</h2>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Client Cancellation Rights</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Cancel within 24 hours of project initiation for full refund</li>
                  <li>Cancel before auditor assignment with 95% refund (5% platform fee retained)</li>
                  <li>Cancel after work begins subject to milestone completion status</li>
                  <li>Emergency cancellation available for security breaches or force majeure</li>
                </ul>

                <h3 className="text-lg font-medium">Auditor Cancellation Rights</h3>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Cancel within 48 hours of assignment without penalty</li>
                  <li>Emergency withdrawal for personal emergencies or conflicts of interest</li>
                  <li>Cancellation due to client non-cooperation or scope changes</li>
                </ul>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">2. Refund Structure</h2>
              
              <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <RefreshCw className="h-5 w-5" />
                  Milestone-Based Refunds
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium">Project Initiation (0-25%)</h4>
                    <p className="text-sm text-muted-foreground">90% refund available</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Initial Assessment (25-50%)</h4>
                    <p className="text-sm text-muted-foreground">70% refund available</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Deep Analysis (50-75%)</h4>
                    <p className="text-sm text-muted-foreground">40% refund available</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-medium">Final Report (75-100%)</h4>
                    <p className="text-sm text-muted-foreground">10% refund available</p>
                  </div>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">3. Escrow Protection</h2>
              <p className="text-muted-foreground">
                All payments are held in our secure escrow system:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Funds released only upon milestone completion and client approval</li>
                <li>Automatic refund processing for eligible cancellations</li>
                <li>Manual review for transactions over $10,000</li>
                <li>Multi-signature security for all fund movements</li>
                <li>Dispute resolution through qualified arbitrators</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">4. Processing Timeline</h2>
              
              <Alert>
                <Clock className="h-4 w-4" />
                <AlertDescription>
                  Refund processing times vary by payment method and amount.
                </AlertDescription>
              </Alert>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span className="font-medium">Cryptocurrency Refunds</span>
                  <span className="text-muted-foreground">1-24 hours</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span className="font-medium">Credit/Debit Card Refunds</span>
                  <span className="text-muted-foreground">3-7 business days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span className="font-medium">Bank Transfer Refunds</span>
                  <span className="text-muted-foreground">5-10 business days</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                  <span className="font-medium">Large Amount Refunds (greater than $10k)</span>
                  <span className="text-muted-foreground">Up to 30 days</span>
                </div>
              </div>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">5. Non-Refundable Items</h2>
              <p className="text-muted-foreground">
                The following items are not eligible for refunds:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Platform fees for completed transactions</li>
                <li>Third-party tool licenses purchased for specific audits</li>
                <li>Rush delivery fees for expedited audits</li>
                <li>Completed audit reports and deliverables</li>
                <li>Services consumed due to client-requested scope changes</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">6. Dispute Resolution Process</h2>
              <p className="text-muted-foreground">
                When refund disputes arise, we follow a structured resolution process:
              </p>
              <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                <li>
                  <strong>Direct Resolution (1-3 days):</strong> Platform mediates between parties
                </li>
                <li>
                  <strong>Evidence Review (3-7 days):</strong> Detailed analysis of work completed
                </li>
                <li>
                  <strong>Expert Arbitration (7-14 days):</strong> Independent security expert review
                </li>
                <li>
                  <strong>Final Decision:</strong> Binding resolution with refund determination
                </li>
              </ol>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">7. Force Majeure</h2>
              <p className="text-muted-foreground">
                In cases of extraordinary circumstances beyond our control:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Full refunds available for services not yet started</li>
                <li>Pro-rated refunds for partially completed services</li>
                <li>Extended timelines for completion without additional charges</li>
                <li>Alternative auditor assignment when possible</li>
              </ul>
            </section>

            <Separator />

            <section className="space-y-4">
              <h2 className="text-2xl font-semibold">8. Contact for Refunds</h2>
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium">Refund Requests</p>
                <p className="text-muted-foreground">Email: refunds@hawkly.com</p>
                <p className="text-muted-foreground">Response Time: Within 24 hours</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Please include your project ID, reason for refund, and any supporting documentation.
                </p>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CancellationRefund;
