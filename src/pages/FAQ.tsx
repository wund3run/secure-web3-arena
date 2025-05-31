
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const faqs = [
    {
      question: "How long does a security audit take?",
      answer: "Audit duration depends on code complexity. Simple contracts take 3-5 days, while complex DeFi protocols may require 1-2 weeks. Emergency audits can be completed within 24-48 hours."
    },
    {
      question: "What types of vulnerabilities do you check for?",
      answer: "We check for all common Web3 vulnerabilities including reentrancy, overflow/underflow, access control issues, oracle manipulation, flash loan attacks, and blockchain-specific risks."
    },
    {
      question: "How much does a security audit cost?",
      answer: "Audit costs typically range from $5,000 for basic contracts to $50,000+ for complex protocols. Pricing depends on code size, complexity, and timeline requirements."
    },
    {
      question: "Do you audit all blockchain platforms?",
      answer: "Yes, we support audits across 15+ blockchains including Ethereum, Solana, Polygon, BSC, Avalanche, Arbitrum, Optimism, and more. Our experts specialize in platform-specific security considerations."
    },
    {
      question: "What happens if vulnerabilities are found?",
      answer: "We provide detailed reports with vulnerability descriptions, severity ratings, and specific remediation steps. Our team is available for consultation during the fix implementation process."
    },
    {
      question: "Can you audit already deployed contracts?",
      answer: "Yes, we can audit deployed contracts to identify potential vulnerabilities and provide security recommendations for future updates or incident response procedures."
    }
  ];

  return (
    <StandardLayout 
      title="FAQ" 
      description="Frequently asked questions about Web3 security audits"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <HelpCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Find answers to common questions about our security audit services and platform.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6 mb-12">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{faq.question}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
          <p className="text-muted-foreground mb-6">
            Our team is here to help you understand our security audit process and find the right solution for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/request-audit">
                Request Audit <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
