
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Hawkly</title>
        <meta name="description" content="Hawkly's terms of service and platform usage guidelines" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Button variant="ghost" asChild>
              <Link to="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Platform
              </Link>
            </Button>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl">Terms of Service</CardTitle>
              <p className="text-muted-foreground">Last updated: December 2024</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">
                  By accessing and using Hawkly's Web3 security marketplace platform, you accept 
                  and agree to be bound by the terms and provision of this agreement.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">2. Platform Services</h2>
                <p className="text-muted-foreground">
                  Hawkly provides a marketplace for connecting Web3 projects with security auditors. 
                  We facilitate connections but do not directly provide audit services.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">3. User Responsibilities</h2>
                <p className="text-muted-foreground">
                  Users are responsible for maintaining the confidentiality of their account 
                  information and for all activities that occur under their account.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">4. Payment Terms</h2>
                <p className="text-muted-foreground">
                  All payments are processed securely through our payment partners. 
                  Fees and payment terms are clearly disclosed before any transaction.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">5. Limitation of Liability</h2>
                <p className="text-muted-foreground">
                  Hawkly shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages resulting from your use of the platform.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-3">6. Contact Information</h2>
                <p className="text-muted-foreground">
                  For questions about these Terms of Service, contact us at legal@hawkly.dev
                </p>
              </section>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default TermsOfService;
