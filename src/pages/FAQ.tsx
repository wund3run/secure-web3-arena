
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, MessageCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      items: [
        {
          question: "What is Hawkly?",
          answer: "Hawkly is a Web3 security marketplace that connects blockchain projects with verified security auditors. We provide comprehensive security audit services, vulnerability assessments, and security consulting for smart contracts and DeFi protocols."
        },
        {
          question: "How do I request a security audit?",
          answer: "You can request a security audit by clicking 'Request Audit' in the navigation menu. Fill out the project details form, specify your requirements, and our system will match you with qualified auditors based on your project's needs."
        },
        {
          question: "What types of projects can be audited?",
          answer: "We audit all types of Web3 projects including smart contracts, DeFi protocols, NFT marketplaces, DAOs, cross-chain bridges, and other blockchain applications across multiple networks like Ethereum, Polygon, BSC, and more."
        }
      ]
    },
    {
      title: "Pricing & Payments",
      items: [
        {
          question: "How much does a security audit cost?",
          answer: "Audit costs vary based on project complexity, codebase size, and timeline. Basic smart contract audits start from ₹2,08,250 ($2,500), while comprehensive DeFi protocol audits can range from ₹12,49,500 ($15,000) and up. Visit our pricing page for detailed information."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept multiple payment methods including bank transfers, cryptocurrency payments (ETH, USDC, USDT), and traditional payment methods. Payment terms and options will be discussed during the project scoping phase."
        },
        {
          question: "Is there a refund policy?",
          answer: "We offer a satisfaction guarantee for all audit services. If you're not satisfied with the audit quality, we'll work to address your concerns or provide a partial refund based on the specific circumstances."
        }
      ]
    },
    {
      title: "Audit Process",
      items: [
        {
          question: "How long does a typical audit take?",
          answer: "Audit duration depends on project complexity. Simple smart contracts typically take 3-5 days, while complex DeFi protocols may require 1-3 weeks. We provide estimated timelines during the initial consultation."
        },
        {
          question: "What does an audit report include?",
          answer: "Our comprehensive audit reports include vulnerability findings with severity ratings, detailed descriptions of issues, remediation recommendations, gas optimization suggestions, and a final security assessment with our professional opinion."
        },
        {
          question: "Do you provide post-audit support?",
          answer: "Yes, we provide post-audit support including clarifications on findings, guidance for implementing fixes, and re-testing of resolved issues. Extended support packages are also available."
        }
      ]
    },
    {
      title: "For Auditors",
      items: [
        {
          question: "How can I become an auditor on Hawkly?",
          answer: "To become an auditor, complete our verification process which includes submitting your credentials, portfolio review, technical assessment, and background check. Apply through our 'Become an Auditor' page."
        },
        {
          question: "What are the requirements to join as an auditor?",
          answer: "We require proven experience in blockchain security, relevant certifications, a portfolio of previous audit work, and successful completion of our technical assessment. Strong knowledge of Solidity, security patterns, and audit methodologies is essential."
        },
        {
          question: "How do auditors get paid?",
          answer: "Auditors receive payment upon successful completion of audit milestones. We use an escrow system to ensure secure transactions. Payment rates are competitive and based on auditor experience and project complexity."
        }
      ]
    }
  ];

  const filteredFAQs = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <>
      <Helmet>
        <title>Frequently Asked Questions | Hawkly</title>
        <meta name="description" content="Find answers to common questions about Hawkly's Web3 security audit services, pricing, and platform features" />
      </Helmet>

      <StandardLayout 
        title="Frequently Asked Questions" 
        description="Find answers to common questions about our Web3 security audit platform"
      >
        <div className="container py-12">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto">
            {filteredFAQs.map((category, index) => (
              <Card key={index} className="mb-8">
                <CardHeader>
                  <CardTitle className="text-xl">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Support */}
          <div className="max-w-2xl mx-auto mt-16">
            <Card>
              <CardHeader className="text-center">
                <CardTitle>Still have questions?</CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <p className="text-muted-foreground">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/contact">
                    <Button className="w-full sm:w-auto">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Support
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Email us at: <a href="mailto:support@hawkly.com" className="text-primary hover:underline">support@hawkly.com</a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
