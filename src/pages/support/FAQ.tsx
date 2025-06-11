
import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Search, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      category: "Getting Started",
      questions: [
        {
          question: "How do I request a security audit?",
          answer: "You can request a security audit by navigating to our 'Request Audit' page, filling out the project details form, and selecting your preferred auditor or letting us match you with the best fit for your project."
        },
        {
          question: "What types of audits do you offer?",
          answer: "We offer comprehensive smart contract audits, code reviews, penetration testing, and security consulting services. Each service is tailored to different security needs and project phases."
        },
        {
          question: "How long does an audit typically take?",
          answer: "Audit duration depends on the scope and complexity of your project. Basic audits typically take 7-14 days, while comprehensive audits may take 2-4 weeks. You'll receive a timeline estimate during the initial consultation."
        }
      ]
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          question: "How is audit pricing determined?",
          answer: "Pricing is based on several factors including code complexity, lines of code, audit depth required, and timeline. We provide transparent, fixed-price quotes with no hidden fees."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including cryptocurrency (ETH, USDC, BTC) and traditional payments via credit card or bank transfer. All payments are secured through escrow."
        },
        {
          question: "Is there a refund policy?",
          answer: "Yes, we offer a satisfaction guarantee. If you're not satisfied with the audit quality, we provide a full refund within 7 days of delivery. We also offer pro-rata refunds for cancelled projects."
        }
      ]
    },
    {
      category: "Auditor Network",
      questions: [
        {
          question: "How are auditors vetted?",
          answer: "All auditors undergo rigorous background checks, technical assessments, and portfolio reviews. They must have proven experience, relevant certifications, and maintain high client satisfaction ratings."
        },
        {
          question: "Can I choose my auditor?",
          answer: "Yes, you can browse our marketplace and select a specific auditor based on their expertise, reviews, and availability. Alternatively, we can recommend the best match for your project."
        },
        {
          question: "What if I'm not satisfied with my auditor?",
          answer: "If you're not satisfied with your auditor's work, you can request a different auditor or escalate to our quality assurance team. We're committed to ensuring you receive high-quality service."
        }
      ]
    }
  ];

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about our security audit services
            </p>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
                <div className="space-y-4">
                  {category.questions.map((faq, questionIndex) => {
                    const itemIndex = categoryIndex * 100 + questionIndex;
                    const isOpen = openItems.includes(itemIndex);
                    
                    return (
                      <Card key={questionIndex}>
                        <CardContent className="p-0">
                          <button
                            onClick={() => toggleItem(itemIndex)}
                            className="w-full p-6 text-left hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <h3 className="font-semibold pr-4">{faq.question}</h3>
                              {isOpen ? (
                                <ChevronUp className="h-5 w-5 flex-shrink-0" />
                              ) : (
                                <ChevronDown className="h-5 w-5 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6">
                              <p className="text-muted-foreground">{faq.answer}</p>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Still Need Help */}
          <div className="text-center mt-12 bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Still Need Help?</h2>
            <p className="text-muted-foreground mb-6">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/support">Contact Support</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/forum">Ask Community</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
