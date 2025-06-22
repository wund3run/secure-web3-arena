
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, Clock, DollarSign, Shield, Users } from 'lucide-react';

export function VisibleFAQ() {
  const faqs = [
    {
      icon: <Clock className="h-5 w-5" />,
      question: "How long does an audit take?",
      answer: "Most audits are completed within 2-5 business days. Complex projects may take up to 2 weeks.",
      highlight: "2-5 days typical"
    },
    {
      icon: <DollarSign className="h-5 w-5" />,
      question: "How much does an audit cost?",
      answer: "Pricing depends on code complexity and scope. Basic audits start at $2,500, with most projects ranging $5,000-$15,000.",
      highlight: "Starting at $2,500"
    },
    {
      icon: <Shield className="h-5 w-5" />,
      question: "What does the audit cover?",
      answer: "We examine smart contract vulnerabilities, logic flaws, access controls, and compliance with security best practices.",
      highlight: "Comprehensive coverage"
    },
    {
      icon: <Users className="h-5 w-5" />,
      question: "Who are the auditors?",
      answer: "Our auditors are certified security professionals with proven blockchain experience and rigorous background checks.",
      highlight: "Certified experts only"
    }
  ];

  return (
    <section className="py-20 bg-gray-800">
      <div className="container">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 bg-blue-900/30 border-blue-600 text-blue-300">
            <HelpCircle className="h-4 w-4 mr-2" />
            Common Questions
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-6">Everything You Need to Know</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Quick answers to help you get started with confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-gray-600 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                    <div className="text-blue-400">
                      {faq.icon}
                    </div>
                  </div>
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-3">
                  <Badge variant="secondary" className="bg-green-900/50 text-green-300 border-green-700 text-xs">
                    {faq.highlight}
                  </Badge>
                </div>
                <CardDescription className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
