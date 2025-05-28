
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const FAQ = () => {
  const faqs = [
    {
      question: "How does the audit process work?",
      answer: "Our audit process involves initial consultation, code review, testing, and detailed reporting. Each audit is conducted by verified security experts with blockchain expertise."
    },
    {
      question: "How long does an audit take?",
      answer: "Audit duration varies based on project complexity. Simple smart contracts may take 3-5 days, while complex protocols can take 2-4 weeks."
    },
    {
      question: "What types of audits do you offer?",
      answer: "We offer smart contract audits, protocol security reviews, penetration testing, and ongoing security monitoring for various blockchain platforms."
    },
    {
      question: "How are audit fees determined?",
      answer: "Fees are based on project complexity, scope, timeline, and auditor expertise. Our escrow system ensures secure payment processing."
    },
    {
      question: "What happens if vulnerabilities are found?",
      answer: "All findings are documented in a detailed report with severity levels and remediation recommendations. We offer follow-up reviews after fixes are implemented."
    }
  ];

  return (
    <StandardLayout
      title="Frequently Asked Questions"
      description="Find answers to common questions about Hawkly"
      className="container py-12"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Get quick answers to the most common questions about our platform.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>General Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default FAQ;
