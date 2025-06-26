
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Index() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Hero Section */}
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground">
                Welcome to{" "}
                <span className="text-primary">Hawkly</span>
              </h1>
              <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
                The leading Web3 security marketplace. Connect with verified security experts 
                for comprehensive smart contract audits.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/request-audit">
                  Request Audit
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/marketplace">
                  Browse Auditors
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Features Grid */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">Fast & Secure</h3>
              <p className="text-muted-foreground">
                Get your smart contracts audited quickly by verified security experts.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Matching</h3>
              <p className="text-muted-foreground">
                Our AI matches your project with the most suitable security experts.
              </p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <div className="w-8 h-8 bg-primary rounded" />
              </div>
              <h3 className="text-xl font-semibold">Transparent Pricing</h3>
              <p className="text-muted-foreground">
                Clear, upfront pricing with no hidden fees or surprises.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
