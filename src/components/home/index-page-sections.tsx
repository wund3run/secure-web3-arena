
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Zap, Users, CheckCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

// Quick Start Section Component
export function QuickStartSection() {
  const quickSteps = [
    {
      icon: Users,
      title: "Create Your Profile",
      description: "Set up your account and specify your project needs",
      action: "Sign Up",
      link: "/auth"
    },
    {
      icon: Shield,
      title: "Browse Expert Guardians",
      description: "Explore verified security experts matched to your requirements",
      action: "View Marketplace",
      link: "/marketplace"
    },
    {
      icon: Zap,
      title: "Request Protection",
      description: "Submit your audit request and get rapid response",
      action: "Start Request",
      link: "/request-audit"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Start Your <span className="text-brand-gradient bg-clip-text text-transparent">Security Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get enterprise-grade Web3 security in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {quickSteps.map((step, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
              <CardHeader>
                <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{step.description}</p>
                <Button asChild className="w-full">
                  <Link to={step.link} className="flex items-center justify-center gap-2">
                    {step.action}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section Component
export function FaqSection() {
  const faqs = [
    {
      question: "How does Hawkly's expert matching work?",
      answer: "Our AI-powered system analyzes your project requirements, technology stack, and security needs to match you with the most qualified security experts. Each auditor is thoroughly vetted and verified."
    },
    {
      question: "What types of security audits do you offer?",
      answer: "We offer comprehensive audits including smart contract security, DeFi protocol reviews, NFT marketplace audits, cross-chain bridge security, and custom blockchain application assessments."
    },
    {
      question: "How long does a typical audit take?",
      answer: "Audit timelines vary based on project complexity. Simple smart contracts typically take 3-5 days, while comprehensive DeFi protocols may require 2-3 weeks. We provide detailed timelines upfront."
    },
    {
      question: "What makes Hawkly different from other audit platforms?",
      answer: "Hawkly combines AI-powered expert matching, real-time collaboration tools, transparent pricing, and our unique Guardian network of top-tier security experts to deliver faster, more accurate audits."
    },
    {
      question: "How do you ensure audit quality?",
      answer: "All our auditors undergo rigorous verification, maintain high completion rates, and are continuously rated by clients. We also provide audit insurance and follow industry-standard security frameworks."
    },
    {
      question: "What are your pricing options?",
      answer: "We offer flexible pricing including fixed-price audits, hourly consulting, and subscription plans for ongoing security support. Contact us for a customized quote based on your specific needs."
    }
  ];

  return (
    <section className="py-20 bg-muted/20">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Frequently Asked <span className="text-brand-gradient bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about Web3 security with Hawkly
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-lg px-6 data-[state=open]:shadow-md transition-all duration-300"
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="font-semibold">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6 pl-8">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">Still have questions?</p>
          <Button variant="outline" asChild>
            <Link to="/support">Contact Our Security Experts</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
