
import React from "react";
import { Helmet } from "react-helmet-async";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, CheckCircle } from "lucide-react";
import { SkipToContent } from "@/components/layout/SkipToContent";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Connect with top security auditors and protect your blockchain project. Smart contract audits, bug bounties, and continuous security services."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <main id="main-content" tabIndex={-1}>
            {/* Hero Section */}
            <section className="py-16 md:py-24 border-b">
              <div className="container px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                      Secure Your Web3 Projects with Expert Auditors
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                      Connect with verified security experts to protect your blockchain applications from vulnerabilities and exploits.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                        <Link to="/marketplace" className="flex items-center">
                          Explore Services <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                      </Button>
                      <Button asChild size="lg" variant="outline">
                        <Link to="/request-audit">Request Security Audit</Link>
                      </Button>
                    </div>
                    
                    <div className="mt-8 flex items-center text-muted-foreground">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                      <span>Verified auditors with proven expertise</span>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex justify-center">
                    <div className="relative">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-purple-600 rounded-lg blur opacity-30"></div>
                      <div className="relative bg-card p-8 rounded-lg shadow-xl border">
                        <div className="flex flex-col items-center text-center space-y-4">
                          <Shield className="h-16 w-16 text-primary" />
                          <h3 className="text-2xl font-bold">Web3 Security Marketplace</h3>
                          <p className="text-muted-foreground">
                            Find the right security services for your project's specific needs
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            {/* Clear user paths section */}
            <section className="py-16 bg-muted/30">
              <div className="container px-4 md:px-6">
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-bold mb-4">Simple Security for Every User</h2>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Whether you're a project owner or security expert, we've made the platform intuitive for you.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Project Owner Path */}
                  <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                    <h3 className="text-2xl font-semibold mb-4">Project Owners</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Find verified auditors for your project</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Submit audit requests with ease</span>
                      </li>
                    </ul>
                    <Button asChild className="w-full">
                      <Link to="/auth" className="flex items-center justify-center">
                        Sign In as Project Owner <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  
                  {/* Security Auditor Path */}
                  <div className="bg-card shadow-sm hover:shadow-md transition-all rounded-lg p-8 border">
                    <h3 className="text-2xl font-semibold mb-4">Security Auditors</h3>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Showcase your security expertise</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                        <span>Find new audit opportunities</span>
                      </li>
                    </ul>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/service-provider-onboarding" className="flex items-center justify-center">
                        Join as an Auditor <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
