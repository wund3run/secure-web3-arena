
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Mail, Phone, Search } from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: "How do I request a security audit?",
      answer: "Navigate to the 'Request Audit' page, fill out the project details form, and submit your request. Our team will match you with qualified auditors within 24 hours.",
      category: "Getting Started"
    },
    {
      question: "What types of blockchain projects can be audited?",
      answer: "We support audits for smart contracts on Ethereum, Solana, Polygon, Avalanche, and other major blockchain networks. This includes DeFi protocols, NFT projects, and custom smart contracts.",
      category: "Services"
    },
    {
      question: "How long does a typical audit take?",
      answer: "Audit duration depends on project complexity. Small projects take 3-5 days, medium projects 1-2 weeks, and large projects 2-4 weeks. Expedited audits are available for smaller codebases.",
      category: "Timeline"
    },
    {
      question: "What qualifications do Hawkly auditors have?",
      answer: "All auditors are verified security professionals with proven experience in Web3 security. They undergo background checks and demonstrate expertise in relevant blockchain technologies.",
      category: "Auditors"
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-secondary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Support Center</h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Get help with your Web3 security audit needs
            </p>
          </div>

          <div className="grid gap-8">
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="text-center">
                  <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Email Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Get detailed help via email</p>
                  <a href="mailto:support@hawkly.com" className="text-primary hover:underline">
                    support@hawkly.com
                  </a>
                  <p className="text-xs text-muted-foreground mt-2">Response within 24 hours</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Live Chat</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">Real-time assistance</p>
                  <Button variant="outline" className="w-full">
                    Start Chat
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Available 9 AM - 6 PM EST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="text-center">
                  <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                  <CardTitle className="text-lg">Priority Support</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">For enterprise clients</p>
                  <Badge variant="secondary">Enterprise Only</Badge>
                  <p className="text-xs text-muted-foreground mt-2">Dedicated account manager</p>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium">{faq.question}</h3>
                        <Badge variant="outline" className="ml-2 text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Send us a message.
                </p>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Name</label>
                      <Input placeholder="Your name" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input placeholder="your@email.com" type="email" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <Input placeholder="How can we help?" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Message</label>
                    <Textarea placeholder="Describe your issue or question..." rows={4} />
                  </div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
