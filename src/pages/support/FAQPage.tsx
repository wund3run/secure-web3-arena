import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle } from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';

const FAQPage = () => {
  return (
    <StandardLayout
      title="FAQ | Hawkly"
      description="Frequently asked questions about Hawkly's Web3 security services"
    >
      <AppContainer maxWidth="max-w-4xl" padding="px-4 py-8" elevation>
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Find answers to common questions about our security services and platform
          </p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search FAQ..." 
              className="pl-10 h-12"
            />
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              category: "General",
              questions: [
                {
                  q: "What is Hawkly?",
                  a: "Hawkly is a comprehensive Web3 security platform that connects projects with expert security auditors, provides automated security tools, and offers educational resources for the Web3 community."
                },
                {
                  q: "How does the audit process work?",
                  a: "Submit your project details, get matched with qualified auditors, receive a comprehensive security audit report, and implement recommended fixes with ongoing support."
                },
                {
                  q: "What types of projects do you audit?",
                  a: "We audit all types of Web3 projects including smart contracts, DeFi protocols, NFT marketplaces, DAOs, and blockchain infrastructure."
                }
              ]
            },
            {
              category: "Pricing & Payment",
              questions: [
                {
                  q: "How much does an audit cost?",
                  a: "Audit costs vary based on code complexity and requirements. Basic audits start at $2,999, professional audits at $7,999, and enterprise audits are custom priced."
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept crypto payments (ETH, USDC, BTC) and traditional payment methods (credit cards, bank transfers) for your convenience."
                },
                {
                  q: "Do you offer refunds?",
                  a: "We offer refunds within 24 hours of booking if the audit hasn't started. Once the audit begins, refunds are handled case-by-case."
                }
              ]
            },
            {
              category: "Security & Audits",
              questions: [
                {
                  q: "What vulnerabilities do you check for?",
                  a: "We check for all common vulnerabilities including reentrancy, overflow/underflow, access control issues, front-running, flash loan attacks, and more."
                },
                {
                  q: "How long does an audit take?",
                  a: "Basic audits take 5-7 days, professional audits take 7-10 days, and enterprise audits have custom timelines based on complexity."
                },
                {
                  q: "Do you provide re-audits?",
                  a: "Yes, we offer discounted re-audits after you implement our recommended fixes. Professional and Enterprise packages include one free re-audit."
                }
              ]
            },
            {
              category: "For Auditors",
              questions: [
                {
                  q: "How do I become a Hawkly auditor?",
                  a: "Apply through our auditor onboarding process, complete our technical assessment, provide references, and undergo background verification."
                },
                {
                  q: "What are the requirements to join?",
                  a: "Minimum 3 years security experience, proven track record in Web3 security, technical certifications, and successful completion of our assessment."
                },
                {
                  q: "How much can I earn as an auditor?",
                  a: "Earnings vary based on expertise and audit complexity. Top auditors earn $100-500+ per hour depending on the project and their experience level."
                }
              ]
            }
          ].map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h2 className="text-2xl font-bold mb-4">{section.category}</h2>
              <div className="space-y-4">
                {section.questions.map((faq, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <HelpCircle className="h-5 w-5 text-hawkly-primary" />
                        {faq.q}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <button className="bg-hawkly-primary hover:bg-hawkly-primary/90 text-white px-8 py-3 rounded-lg font-medium">
              Contact Support
            </button>
          </CardContent>
        </Card>
      </AppContainer>
    </StandardLayout>
  );
};

export default FAQPage;
