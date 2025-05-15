
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SecurityDashboard } from '@/components/security-analytics/SecurityDashboard';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";

const SecurityAnalytics = () => {
  // State to track if the user has completed the initial assessment
  const [hasAssessment, setHasAssessment] = useState<boolean>(false);

  return (
    <>
      <Helmet>
        <title>Security Analytics | Hawkly</title>
        <meta 
          name="description" 
          content="Advanced security assessment tools, threat detection, and vulnerability management for Web3 projects" 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold">Security Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Advanced security assessment tools for your Web3 projects
            </p>
          </div>
          
          {!hasAssessment && (
            <Alert className="mb-8 bg-primary/10 border border-primary">
              <Info className="h-5 w-5 text-primary" />
              <AlertTitle>Get started with your security assessment</AlertTitle>
              <AlertDescription className="mt-2">
                Connect your smart contract or repository to begin a comprehensive security analysis. 
                Our tools will scan for vulnerabilities, potential threats, and security best practices.
                <div className="mt-4">
                  <Button onClick={() => setHasAssessment(true)}>
                    Start Security Assessment
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <SecurityDashboard hasInitialAssessment={hasAssessment} />
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default SecurityAnalytics;
