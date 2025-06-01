
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";

export default function Marketplace() {
  return (
    <>
      <Helmet>
        <title>Security Marketplace | Hawkly</title>
        <meta name="description" content="Browse verified Web3 security experts and audit services." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <SimplifiedNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Security Marketplace</h1>
              <p className="text-xl text-muted-foreground">
                Connect with verified Web3 security experts for comprehensive audit services
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Smart Contract Audits</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive security audits for smart contracts across all major blockchains
                </p>
                <div className="text-sm text-primary font-medium">Starting from $2,500</div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Code Reviews</h3>
                <p className="text-muted-foreground mb-4">
                  Expert code analysis and security recommendations for your Web3 project
                </p>
                <div className="text-sm text-primary font-medium">Starting from $1,000</div>
              </div>
              
              <div className="border rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-3">Penetration Testing</h3>
                <p className="text-muted-foreground mb-4">
                  Advanced security testing to identify vulnerabilities in your application
                </p>
                <div className="text-sm text-primary font-medium">Starting from $3,500</div>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Ready to secure your project?</p>
              <a 
                href="/request-audit" 
                className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                Request Security Audit
              </a>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
