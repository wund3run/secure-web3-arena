
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, 
  HelpCircle, 
  BookOpen, 
  MessageSquare, 
  Mail, 
  Phone, 
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    priority: 'medium'
  });

  const supportCategories = [
    {
      title: "Getting Started",
      description: "Learn the basics of using Hawkly",
      icon: BookOpen,
      articles: 12,
      color: "bg-blue-100 text-blue-800"
    },
    {
      title: "Audit Process",
      description: "Understanding how audits work",
      icon: HelpCircle,
      articles: 8,
      color: "bg-green-100 text-green-800"
    },
    {
      title: "Payment & Billing",
      description: "Questions about payments and escrow",
      icon: MessageSquare,
      articles: 6,
      color: "bg-purple-100 text-purple-800"
    }
  ];

  const faqItems = [
    {
      question: "How long does a typical audit take?",
      answer: "Most audits are completed within 2-7 days, depending on the complexity of your project and the scope of the audit. Our AI matching system helps connect you with auditors who can meet your timeline requirements."
    },
    {
      question: "How does the escrow payment system work?",
      answer: "Our secure escrow system holds your payment until milestone deliverables are met. You release payments as each milestone is completed to your satisfaction, ensuring both parties are protected."
    },
    {
      question: "What types of blockchain projects can be audited?",
      answer: "We support audits for smart contracts on Ethereum, Solana, Polygon, Avalanche, BNB Chain, and many other blockchains. Our auditors specialize in DeFi protocols, NFT contracts, DAOs, and custom blockchain applications."
    },
    {
      question: "How are auditors verified on the platform?",
      answer: "All auditors go through a rigorous verification process including portfolio review, technical assessments, and background checks. We maintain high standards to ensure quality and reliability."
    },
    {
      question: "Can I request specific auditors for my project?",
      answer: "Yes, you can browse auditor profiles and request specific auditors. You can also use our AI matching system to get recommendations based on your project requirements."
    },
    {
      question: "What happens if I'm not satisfied with an audit?",
      answer: "We offer a satisfaction guarantee. If you're not satisfied with the audit quality, we'll work with you to resolve any issues or provide a refund according to our terms of service."
    }
  ];

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Support ticket submitted successfully. We\'ll get back to you within 24 hours.');
    setContactForm({ subject: '', message: '', priority: 'medium' });
  };

  return (
    <StandardLayout
      title="Support Center"
      description="Get help and find answers to your questions"
      className="container py-12"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Support Center</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Find answers to your questions or get in touch with our support team.
          </p>
          
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search for help..." 
              className="pl-10" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="faq" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="status">Status</TabsTrigger>
          </TabsList>

          <TabsContent value="faq" className="space-y-6">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>

          <TabsContent value="guides" className="space-y-6">
            <h2 className="text-2xl font-bold">Help Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {supportCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <div className={`mx-auto p-3 rounded-full w-fit ${category.color}`}>
                      <category.icon className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    <Badge variant="secondary">{category.articles} articles</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Describe your issue..."
                        rows={5}
                        value={contactForm.message}
                        onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full">Send Message</Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Mail className="h-5 w-5 mr-2" />
                      Email Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-2">For general inquiries:</p>
                    <p className="font-medium">support@hawkly.com</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Response time: 24 hours
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2" />
                      Live Chat
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Chat with our support team in real-time
                    </p>
                    <Button variant="outline" className="w-full">
                      Start Live Chat
                    </Button>
                    <p className="text-sm text-muted-foreground mt-2">
                      Available: Mon-Fri, 9AM-6PM UTC
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="status" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    All Systems Operational
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>API Services</span>
                      <Badge variant="success">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Payment Processing</span>
                      <Badge variant="success">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Authentication</span>
                      <Badge variant="success">Operational</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>File Storage</span>
                      <Badge variant="success">Operational</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Average API Response</span>
                      <span className="font-medium">120ms</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Support Response</span>
                      <span className="font-medium">< 24h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Uptime (30 days)</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default Support;
