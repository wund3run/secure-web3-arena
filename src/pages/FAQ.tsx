
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ContentPage } from '@/components/content/content-page';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { formatCurrency } from "@/components/admin/dashboard/utils/formatters";

const FAQ = () => {
  // FAQ categories with their respective questions and answers
  const faqCategories = [
    {
      category: "Audit Process",
      items: [
        {
          question: "How long does a typical audit take?",
          answer: "The duration of an audit depends on the complexity and size of your project. Simple smart contracts might take 3-5 days, while complex protocols could take 2-4 weeks. During the request process, you'll receive an estimated timeline based on your specific project details."
        },
        {
          question: "What should I prepare before requesting an audit?",
          answer: "You should prepare comprehensive documentation, a clean and well-commented codebase, test coverage details, and any specific concerns you want addressed. Having clear scope documentation will help auditors provide more accurate quotes and timelines."
        },
        {
          question: "What happens after vulnerabilities are found?",
          answer: "When vulnerabilities are identified, you'll receive a detailed report. You can then implement fixes and submit them for verification. Most auditors include a verification phase to ensure that vulnerabilities have been properly addressed."
        }
      ]
    },
    {
      category: "Pricing & Payment",
      items: [
        {
          question: "How much does a security audit cost?",
          answer: `Audit costs vary based on complexity, codebase size, and timeline requirements. Typical prices range from ${formatCurrency(5000)} for small contracts to ${formatCurrency(50000)}+ for complex DeFi protocols. You'll receive a custom quote after submitting your project details.`
        },
        {
          question: "How does the escrow payment system work?",
          answer: "Our escrow system holds funds securely until predefined milestones are met. When you initiate a contract, funds are locked in escrow and only released when both parties agree that work has been completed satisfactorily, protecting both clients and auditors throughout the process."
        },
        {
          question: "Do you offer any pricing packages or discounts?",
          answer: "Yes, we offer package deals for startups and projects requiring multiple audits. Additionally, returning customers may qualify for loyalty discounts. Please contact our support team to discuss available options for your specific needs."
        }
      ]
    },
    {
      category: "Auditors & Quality",
      items: [
        {
          question: "How are auditors vetted on the platform?",
          answer: "Auditors undergo a rigorous application process that includes credential verification, technical assessments, background checks, and reference validations. Only about 8% of applicants are accepted to ensure the highest quality of security reviews."
        },
        {
          question: "Can I request specific auditors for my project?",
          answer: "Yes, you can request specific auditors based on their expertise, reputation, or previous work. Our platform also offers AI-powered matching to suggest the best auditors for your specific project requirements."
        },
        {
          question: "What happens if vulnerabilities are found after an audit?",
          answer: "Many auditors offer a warranty period (typically 30-90 days) where they'll review fixes and updates at no additional cost. We also offer continuous monitoring services that can alert you to potential new vulnerabilities as they emerge."
        }
      ]
    },
    {
      category: "Security & Compliance",
      items: [
        {
          question: "Does Hawkly comply with industry security standards?",
          answer: "Yes, Hawkly adheres to industry best practices and security standards. Our platform implements robust security measures to protect client data and audit reports, including encryption, secure access controls, and regular security assessments."
        },
        {
          question: "How is confidentiality maintained during the audit process?",
          answer: "All auditors sign strict NDAs before accessing project code. Our platform enforces confidentiality through secure communication channels, access controls, and privacy protocols to ensure your project details remain protected."
        },
        {
          question: "Can Hawkly help with regulatory compliance?",
          answer: "Yes, many of our auditors specialize in regulatory compliance for blockchain projects. They can help identify issues related to specific regulations and standards in various jurisdictions and provide guidance on achieving compliance."
        }
      ]
    }
  ];

  return (
    <ContentPage 
      title="Frequently Asked Questions" 
      description="Find answers to common questions about Web3 security audits, our platform, and security best practices."
    >
      <h1>Frequently Asked Questions</h1>
      
      <p className="text-muted-foreground text-lg mb-8">
        Find answers to common questions about security audits, our platform, and blockchain security best practices. 
        If you can't find what you're looking for, please visit our <a href="/support" className="text-primary hover:underline">Support Center</a>.
      </p>
      
      {faqCategories.map((category, index) => (
        <div key={index} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{category.category}</h2>
          
          <Accordion type="single" collapsible className="w-full">
            {category.items.map((item, itemIndex) => (
              <AccordionItem key={itemIndex} value={`item-${index}-${itemIndex}`}>
                <AccordionTrigger className="text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
      
      <div className="mt-12 p-6 bg-muted/40 rounded-lg border border-border/40">
        <h3 className="text-lg font-medium mb-2">Still have questions?</h3>
        <p className="mb-4">Our support team is ready to help with any questions you might have.</p>
        <div className="flex flex-wrap gap-4">
          <a href="/contact" className="text-primary hover:underline">Contact Support</a>
          <a href="/support" className="text-primary hover:underline">Visit Support Center</a>
        </div>
      </div>
    </ContentPage>
  );
};

export default FAQ;
