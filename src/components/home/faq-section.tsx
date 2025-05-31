
import React, { useState } from "react";
import { Shield, ChevronDown, Search, MessageCircle, ExternalLink, Zap, Lock, Users } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const FAQ_CATEGORIES = [
  {
    id: "security-services",
    title: "Security Services",
    icon: Shield,
    faqs: [
      {
        question: "What types of security services does Hawkly offer?",
        answer: "Hawkly provides comprehensive Web3 security services including smart contract audits, DeFi protocol reviews, NFT security assessments, blockchain infrastructure audits, and continuous security monitoring. Our vetted experts specialize across Ethereum, Solana, Polygon, and other major blockchain ecosystems."
      },
      {
        question: "How long does a typical security audit take?",
        answer: "Audit timelines vary by complexity: Simple smart contracts (2-5 days), Medium protocols (1-2 weeks), Complex DeFi systems (2-4 weeks). Our platform shows estimated timelines upfront, and you can discuss expedited options with auditors for urgent needs."
      },
      {
        question: "What's included in a smart contract audit report?",
        answer: "Our audit reports include vulnerability assessments, severity classifications, detailed findings with exploit scenarios, gas optimization recommendations, code quality analysis, and actionable remediation steps. All reports follow industry-standard formats for easy integration into your development workflow."
      }
    ]
  },
  {
    id: "auditor-process",
    title: "Auditor Verification",
    icon: Users,
    faqs: [
      {
        question: "How are security auditors verified on Hawkly?",
        answer: "Our rigorous verification process includes technical skill assessments, credential verification, background checks, and peer reviews. Auditors must demonstrate proven experience with successful audit portfolios, maintain quality standards, and undergo continuous performance monitoring."
      },
      {
        question: "How does the reputation system work?",
        answer: "Our reputation algorithm considers audit quality scores, client feedback ratings, vulnerability discovery rates, response times, and community contributions. Auditors progress through tiers (Verified → Expert → Elite) with increasing privileges and access to premium projects."
      },
      {
        question: "What happens if vulnerabilities are found after an audit?",
        answer: "We have a comprehensive post-audit support system with responsible disclosure protocols, original auditor review processes, and continuous monitoring services. Our insurance coverage and dispute resolution ensure accountability throughout the entire security lifecycle."
      }
    ]
  },
  {
    id: "platform-security",
    title: "Platform & Payments",
    icon: Lock,
    faqs: [
      {
        question: "How secure is the escrow payment system?",
        answer: "Our smart contract-based escrow system uses multi-signature wallets, time-locked releases, and automated milestone verification. Payments are secured on-chain with dispute resolution mechanisms, ensuring both auditors and clients are fully protected throughout the engagement."
      },
      {
        question: "How is my code kept confidential during audits?",
        answer: "We employ military-grade encryption, private repositories, secure communication channels, and strict NDAs for all participants. Access is granted on a need-to-know basis with complete audit trails, and all access is immediately revoked upon project completion."
      },
      {
        question: "What are the pricing models for security audits?",
        answer: "We offer flexible pricing: Fixed-price packages for standard audits, hourly rates for consulting, milestone-based payments for large projects, and subscription models for ongoing security monitoring. Transparent pricing with no hidden fees and competitive rates across all service tiers."
      }
    ]
  }
];

export function FaqSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredFaqs = FAQ_CATEGORIES.map(category => ({
    ...category,
    faqs: category.faqs.filter(faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.faqs.length > 0);

  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 mb-6">
            <MessageCircle className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Security Q&A Hub</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              Security Questions
            </span>{" "}
            <span className="text-foreground">Answered</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Get instant answers to your Web3 security questions. From audit processes to platform features, 
            we've got comprehensive answers from our security experts.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search security questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg bg-background/80 backdrop-blur-sm border-border/50 focus:border-primary/50 rounded-2xl shadow-sm"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex justify-center mb-12">
          <div className="flex gap-2 p-1 bg-background/60 backdrop-blur-sm rounded-2xl border border-border/50 shadow-sm">
            <Button
              variant={activeCategory === null ? "default" : "ghost"}
              onClick={() => setActiveCategory(null)}
              className="rounded-xl px-6 h-10"
            >
              All Categories
            </Button>
            {FAQ_CATEGORIES.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                className="rounded-xl px-6 h-10 flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                {category.title}
              </Button>
            ))}
          </div>
        </div>

        {/* FAQ Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredFaqs
            .filter(category => !activeCategory || category.id === activeCategory)
            .map((category) => (
            <Card key={category.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-0">
                {/* Category Header */}
                <div className="p-6 border-b border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                      <category.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{category.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {category.faqs.length} questions
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* FAQ Items */}
                <div className="p-6">
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`${category.id}-${index}`} 
                        className="border border-border/30 rounded-xl overflow-hidden hover:border-primary/30 transition-colors bg-background/40"
                      >
                        <AccordionTrigger className="text-left font-medium px-4 py-4 hover:bg-muted/20 transition-colors group no-underline">
                          <span className="group-hover:text-primary transition-colors pr-4">
                            {faq.question}
                          </span>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results State */}
        {filteredFaqs.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-muted/50 rounded-full mb-6">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No matching questions found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or browse all categories
            </p>
            <Button variant="outline" onClick={() => setSearchTerm("")} className="rounded-xl">
              Clear Search
            </Button>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="border-border/50 bg-gradient-to-r from-primary/5 to-purple-500/5 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                  <Zap className="h-8 w-8 text-primary" />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Our security experts are standing by to help. Get personalized answers and guidance 
                for your specific Web3 security needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-primary hover:bg-primary/90 rounded-xl">
                  <a href="/faq" className="flex items-center gap-2">
                    View Complete FAQ
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl">
                  <a href="/contact" className="flex items-center gap-2">
                    Contact Support Team
                    <MessageCircle className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
