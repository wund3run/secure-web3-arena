
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AIVulnerabilityInsights } from '@/components/audit-insights/AIVulnerabilityInsights';
import { Card, CardContent } from "@/components/ui/card";

const SecurityInsights = () => {
  // In a real implementation, this would come from a route param or context
  const projectName = "DefiSwap Protocol";
  const repositoryUrl = "https://github.com/example/defiswap";

  return (
    <>
      <Helmet>
        <title>AI Security Insights | Hawkly</title>
        <meta name="description" content="AI-powered security vulnerability insights and continuous monitoring for your Web3 project" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Security Insights Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              AI-powered continuous vulnerability monitoring for {projectName}
            </p>
          </div>
          
          <AIVulnerabilityInsights 
            projectName={projectName}
            repositoryUrl={repositoryUrl}
          />
          
          <div className="mt-12 text-center">
            <Card className="bg-primary/5">
              <CardContent className="py-6">
                <p className="text-sm text-muted-foreground">
                  Want a human expert review? <a href="/request-audit" className="text-primary font-medium hover:underline">Request a full security audit</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SecurityInsights;
