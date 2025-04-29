
import React from "react";
import { Shield, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";

export function FaqSection() {
  const faqs = [
    {
      question: "What types of security services does Hawkly offer?",
      answer: "Hawkly provides a comprehensive range of Web3 security services including smart contract audits, DeFi protocol reviews, blockchain security assessments, NFT security audits, and ongoing security monitoring. Our platform connects you with vetted security experts specialized in various blockchain ecosystems."
    },
    {
      question: "How are security experts verified on Hawkly?",
      answer: "All security experts on our platform undergo a rigorous verification process that includes technical assessments, credential verification, and background checks. Experts must demonstrate proven experience in blockchain security, maintain a track record of successful audits, and adhere to our quality standards."
    },
    {
      question: "What is the typical process for getting a smart contract audit?",
      answer: "The typical audit process involves: 1) Submitting your project details through our marketplace, 2) Getting matched with qualified security experts, 3) Receiving and accepting a proposal, 4) The expert conducting a comprehensive audit, 5) Receiving a detailed report with vulnerability findings and recommendations, and 6) Verification of fixes if vulnerabilities are found."
    },
    {
      question: "How long does a typical security audit take?",
      answer: "Audit timeframes vary based on the complexity and size of your project. A simple smart contract might take 2-5 days, while a complex protocol could take 2-4 weeks. Our platform allows you to discuss timeline requirements with experts before engaging their services."
    },
    {
      question: "How does the reputation system work for auditors?",
      answer: "Our reputation system calculates scores based on multiple factors: audit quality, client feedback, vulnerability discovery rate, community contributions, and peer reviews. Auditors earn badges and rise through tiers (Verified, Expert, Elite) as they successfully complete projects and demonstrate expertise."
    },
    {
      question: "What happens if vulnerabilities are found after an audit?",
      answer: "If vulnerabilities are discovered after an audit is complete, we have a responsible disclosure process in place. The original auditor is notified and given the opportunity to review the findings. We also offer continuous monitoring services that can help detect new vulnerabilities as they emerge."
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-muted/30 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Shield className="h-12 w-12 text-primary" />
              <div className="absolute -top-1 right-0 h-4 w-4 bg-secondary rounded-full" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Security Questions</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about blockchain security, our audit process, and how our marketplace connects projects with security experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-card/50 backdrop-blur-sm border-primary/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-primary/10 to-transparent p-4 border-b border-primary/10">
                <h3 className="text-xl font-semibold flex items-center">
                  <Shield className="h-5 w-5 text-primary mr-2" />
                  Security Services
                </h3>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.slice(0, 3).map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/40">
                      <AccordionTrigger className="text-left font-medium py-4 hover:text-primary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/50 backdrop-blur-sm border-secondary/10 overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-gradient-to-r from-secondary/10 to-transparent p-4 border-b border-secondary/10">
                <h3 className="text-xl font-semibold flex items-center">
                  <Shield className="h-5 w-5 text-secondary mr-2" />
                  Auditor Process
                </h3>
              </div>
              <div className="p-4">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.slice(3, 6).map((faq, index) => (
                    <AccordionItem key={index + 3} value={`item-${index + 3}`} className="border-b border-border/40">
                      <AccordionTrigger className="text-left font-medium py-4 hover:text-secondary transition-colors">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-10 text-center">
          <p className="text-muted-foreground mb-6">
            Still have questions about our security services?
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/faq" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4">
              View All FAQs
              <ChevronDown className="ml-1 h-4 w-4" />
            </a>
            <a href="/contact" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
