
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Transparent pricing options for Hawkly's Web3 security services. Choose the plan that best fits your project needs."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12 md:py-16">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the plan that fits your project's security needs. All plans include access to verified security experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Basic Plan */}
            <div className="rounded-lg border shadow-sm hover:shadow-md transition-all p-6 bg-card">
              <div className="mb-5">
                <h3 className="text-xl font-semibold mb-2">Basic</h3>
                <div className="text-3xl font-bold">$499<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground mt-2">For startups and smaller Web3 projects</p>
              </div>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Up to 3 smart contract reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Basic vulnerability assessment</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Access to verified auditors</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Community support</span>
                </li>
              </ul>

              <Button asChild className="w-full">
                <Link to="/auth">Get Started</Link>
              </Button>
            </div>

            {/* Pro Plan - Highlighted */}
            <div className="rounded-lg border border-primary shadow-md hover:shadow-lg transition-all p-6 bg-card relative">
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                <div className="bg-primary text-primary-foreground text-xs font-medium py-1 px-3 rounded-full">
                  Most Popular
                </div>
              </div>
              
              <div className="mb-5">
                <h3 className="text-xl font-semibold mb-2">Professional</h3>
                <div className="text-3xl font-bold">$1,499<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <p className="text-muted-foreground mt-2">For growing DeFi projects and DAOs</p>
              </div>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Unlimited smart contract reviews</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Comprehensive vulnerability detection</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Priority access to top auditors</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>24-hour response time</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Monthly security reports</span>
                </li>
              </ul>

              <Button asChild className="w-full bg-primary hover:bg-primary/90">
                <Link to="/auth">Start Pro Plan</Link>
              </Button>
            </div>

            {/* Enterprise Plan */}
            <div className="rounded-lg border shadow-sm hover:shadow-md transition-all p-6 bg-card">
              <div className="mb-5">
                <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
                <div className="text-3xl font-bold">Custom<span className="text-lg font-normal text-muted-foreground"> pricing</span></div>
                <p className="text-muted-foreground mt-2">For established protocols and large projects</p>
              </div>

              <ul className="space-y-3 my-6">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>All Professional features</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Dedicated security team</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Continuous monitoring</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Custom integration support</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>Advanced governance security</span>
                </li>
              </ul>

              <Button asChild variant="outline" className="w-full">
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-medium mb-4">Need a custom solution?</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
              Our team can help build a security plan tailored to your specific blockchain project needs.
            </p>
            <Button asChild variant="outline" className="px-6">
              <Link to="/contact">Get in touch</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
