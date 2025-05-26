
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const faqData: FAQItem[] = [
    {
      category: "Getting Started",
      question: "How do I get started on Hawkly?",
      answer: "To get started, simply sign up for an account, complete your profile, and choose whether you're a project owner looking for security audits or a security auditor offering services. Our onboarding process will guide you through the next steps."
    },
    {
      category: "Getting Started",
      question: "What types of security services are available?",
      answer: "Hawkly offers smart contract audits, security reviews, penetration testing, code reviews, and ongoing security monitoring. Our verified auditors specialize in various blockchain ecosystems including Ethereum, Solana, Polygon, and more."
    },
    {
      category: "Auditors",
      question: "How do I become a verified auditor on Hawkly?",
      answer: "To become a verified auditor, complete our auditor onboarding process, submit your credentials and past work examples, and pass our technical assessment. We verify experience, certifications, and technical expertise before approval."
    },
    {
      category: "Auditors",
      question: "How are auditor payments handled?",
      answer: "All payments are handled through our secure escrow system. Funds are held in escrow until milestones are completed and approved by the client. This ensures both parties are protected throughout the audit process."
    },
    {
      category: "Project Owners",
      question: "How much does a security audit cost?",
      answer: "Audit costs vary based on project complexity, code size, and scope. Basic audits start from $500, while comprehensive enterprise audits can range from $5,000-$50,000+. Request a quote for accurate pricing based on your specific needs."
    },
    {
      category: "Project Owners",
      question: "How long does a typical audit take?",
      answer: "Audit timelines depend on project scope and complexity. Simple smart contract audits typically take 1-2 weeks, while comprehensive protocol audits can take 4-8 weeks. Rush audits are available for urgent needs."
    },
    {
      category: "Security",
      question: "How is my code kept secure during the audit?",
      answer: "We use encrypted repositories, secure communication channels, and require all auditors to sign strict NDAs. Your code is never shared outside the audit team, and access is revoked immediately after completion."
    },
    {
      category: "Security",
      question: "What happens if vulnerabilities are found?",
      answer: "When vulnerabilities are discovered, auditors provide detailed reports with severity ratings, exploit scenarios, and recommended fixes. We support remediation verification to ensure all issues are properly addressed."
    },
    {
      category: "Platform",
      question: "How does the escrow system work?",
      answer: "Our escrow system holds payments securely until audit milestones are completed. Funds are released automatically upon milestone approval or through dispute resolution if needed. This protects both clients and auditors."
    },
    {
      category: "Platform",
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer refunds in cases where auditors fail to deliver according to agreed terms. Our dispute resolution system ensures fair outcomes for all parties. Specific refund terms are outlined in our service agreements."
    }
  ];

  const filteredFAQs = faqData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(faqData.map(faq => faq.category))];

  const toggleItem = (index: string) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <>
      <Helmet>
        <title>FAQ | Hawkly Web3 Security Marketplace</title>
        <meta name="description" content="Find answers to frequently asked questions about Hawkly's Web3 security marketplace, audits, and platform features." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground">
                Find quick answers to common questions about Hawkly's security marketplace.
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search FAQ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {categories.map(category => {
              const categoryFAQs = filteredFAQs.filter(faq => faq.category === category);
              
              if (categoryFAQs.length === 0) return null;

              return (
                <div key={category} className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">{category}</h2>
                  <div className="space-y-4">
                    {categoryFAQs.map((faq, index) => {
                      const itemKey = `${category}-${index}`;
                      return (
                        <Card key={itemKey}>
                          <Collapsible
                            open={openItems[itemKey]}
                            onOpenChange={() => toggleItem(itemKey)}
                          >
                            <CollapsibleTrigger asChild>
                              <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
                                <CardTitle className="flex items-center justify-between text-left">
                                  <span>{faq.question}</span>
                                  {openItems[itemKey] ? (
                                    <ChevronUp className="h-5 w-5" />
                                  ) : (
                                    <ChevronDown className="h-5 w-5" />
                                  )}
                                </CardTitle>
                              </CardHeader>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                              <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                  {faq.answer}
                                </p>
                              </CardContent>
                            </CollapsibleContent>
                          </Collapsible>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {filteredFAQs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No FAQs found matching your search.
                </p>
                <p className="text-muted-foreground mt-2">
                  Try a different search term or browse all categories.
                </p>
              </div>
            )}

            <div className="mt-12 bg-muted/40 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold mb-4">Still have questions?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex justify-center gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                >
                  Contact Support
                </a>
                <a
                  href="/support"
                  className="inline-flex items-center px-6 py-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                >
                  Visit Support Center
                </a>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
