
import React from 'react';
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const RequestSuccessMessage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8 bg-card border border-border/40 rounded-xl p-10 shadow-sm">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="p-4 bg-green-100 rounded-full">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Audit Request Submitted!</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Thank you for requesting a security audit. Our AI-powered system is now analyzing your project requirements to find the best security experts for your needs.
        </p>
        <div className="space-y-6 mb-8">
          <div className="p-4 bg-muted/50 rounded-lg">
            <h3 className="font-semibold mb-2">What happens next?</h3>
            <ol className="space-y-2 text-left list-decimal pl-5">
              <li>Our AI system matches your project with qualified security experts</li>
              <li>You'll receive an email within 24 hours with auditor recommendations</li>
              <li>Review the suggested auditors and their expertise</li>
              <li>Select your preferred auditor to begin the security audit process</li>
            </ol>
          </div>
        </div>
        
        <div className="flex justify-center gap-4">
          <Button 
            onClick={() => window.location.href = '/'}
            variant="outline"
            size="lg"
          >
            Return to Home
          </Button>
          <Button
            onClick={() => window.location.href = '/marketplace'}
            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            Explore Web3 Security Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">
          Questions? Contact our support team at <a href="mailto:join@hawkly.com" className="text-primary hover:underline">join@hawkly.com</a>
        </p>
      </div>
    </div>
  );
};

export default RequestSuccessMessage;
