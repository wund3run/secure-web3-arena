
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronUp, 
  Shield, 
  Clock, 
  DollarSign, 
  Users,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: "How long does a typical security audit take?",
    answer: "Most audits are completed within 1-2 weeks depending on complexity. Our AI-powered matching system ensures you get connected with available experts within 2 hours."
  },
  {
    question: "What types of blockchain projects do you audit?",
    answer: "We support 15+ blockchain ecosystems including Ethereum, Solana, Polygon, BSC, Avalanche, and more. Our experts handle DeFi protocols, NFT projects, DAOs, and custom smart contracts."
  },
  {
    question: "How does the escrow payment system work?",
    answer: "Our smart contract escrow holds your payment securely until milestones are met. You only pay when satisfied with the audit results, providing complete protection for your investment."
  },
  {
    question: "Are your auditors verified and qualified?",
    answer: "Yes, all auditors go through rigorous verification including credential checks, portfolio reviews, and practical testing. We maintain detailed reputation scores and client feedback."
  },
  {
    question: "What happens if vulnerabilities are found?",
    answer: "You'll receive a detailed report with severity ratings, exploitation scenarios, and step-by-step remediation guidance. Many auditors also provide fix verification services."
  },
  {
    question: "Do you offer continuous monitoring after the audit?",
    answer: "Yes, we provide ongoing security monitoring services to detect new threats and ensure your project remains secure as it evolves and scales."
  }
];

const quickStartSteps = [
  {
    icon: Shield,
    title: "Request Your Audit",
    description: "Tell us about your project and security requirements",
    action: "Start Request",
    href: "/request-audit",
    time: "2 min"
  },
  {
    icon: Users,
    title: "Get Matched",
    description: "Our AI connects you with the perfect security expert",
    action: "Browse Experts",
    href: "/marketplace",
    time: "< 2 hours"
  },
  {
    icon: CheckCircle,
    title: "Begin Audit",
    description: "Work directly with your chosen auditor",
    action: "View Process",
    href: "/how-it-works",
    time: "1-2 weeks"
  }
];

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-16 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security Questions Answered</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get clear answers to common questions about Web3 security audits and our platform
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button variant="outline" asChild>
            <Link to="/faq">View All FAQs</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function QuickStartSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-secondary/5">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            <Zap className="h-3 w-3 mr-1" />
            Quick Start
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From request to audit results in just a few simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {quickStartSteps.map((step, index) => (
            <Card key={index} className="text-center relative overflow-hidden group hover:shadow-lg transition-all">
              <CardContent className="p-6">
                <div className="mb-4">
                  <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    {step.time}
                  </Badge>
                </div>
                <h3 className="text-lg font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{step.description}</p>
                <Button variant="outline" size="sm" asChild className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Link to={step.href} className="flex items-center">
                    {step.action}
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
              {index < quickStartSteps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-4 bg-background/50 rounded-lg border">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <span className="text-sm text-muted-foreground">
              Security vulnerabilities cost projects an average of $2.3M. Start protecting your assets today.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
