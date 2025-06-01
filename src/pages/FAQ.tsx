
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Hawkly</title>
        <meta name="description" content="Find answers to common questions about Hawkly's Web3 security services." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <SimplifiedNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find answers to common questions about our Web3 security services
              </p>
            </div>
            
            <div className="space-y-8">
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">What is a smart contract audit?</h3>
                <p className="text-muted-foreground">
                  A smart contract audit is a comprehensive security review of your blockchain code to identify vulnerabilities, 
                  bugs, and potential security risks before deployment. Our experts analyze your code for common attack vectors 
                  and provide detailed recommendations for improvements.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">How long does an audit take?</h3>
                <p className="text-muted-foreground">
                  Audit duration depends on the complexity and size of your project. Typically, audits range from 1-4 weeks. 
                  Simple contracts may take 3-5 days, while complex DeFi protocols can take several weeks. We provide estimated 
                  timelines during the initial consultation.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">What does an audit cost?</h3>
                <p className="text-muted-foreground">
                  Audit costs vary based on project complexity, lines of code, and required turnaround time. Our audits typically 
                  range from $2,500 for simple contracts to $25,000+ for complex protocols. We provide detailed quotes after 
                  reviewing your project requirements.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">What blockchains do you support?</h3>
                <p className="text-muted-foreground">
                  We support all major blockchains including Ethereum, BSC, Polygon, Arbitrum, Optimism, Avalanche, Fantom, 
                  Solana, and more. Our auditors are experienced across different blockchain ecosystems and their specific 
                  security considerations.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">Do you provide ongoing security support?</h3>
                <p className="text-muted-foreground">
                  Yes! Beyond initial audits, we offer ongoing security monitoring, incident response, and re-audits for 
                  contract updates. Many clients work with us long-term to ensure their protocols remain secure as they evolve.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">What makes Hawkly different?</h3>
                <p className="text-muted-foreground">
                  Hawkly combines AI-powered initial screening with expert human review, providing faster turnaround times 
                  without compromising quality. Our marketplace model connects you with specialized auditors, and our transparent 
                  process keeps you informed throughout the audit.
                </p>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-3">How do I get started?</h3>
                <p className="text-muted-foreground">
                  Simply click "Request Audit" to submit your project details. We'll review your requirements, provide a quote, 
                  and match you with qualified auditors. The entire process is streamlined through our platform.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
