
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SearchIcon, FileText, MessageSquare, Mail, HelpCircle, Book, ChevronRight, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/components/admin/dashboard/utils/formatters";

const SupportCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('help-center');
  
  // Sample support articles
  const supportArticles = [
    {
      id: 'article-1',
      title: 'Getting Started with Security Audits',
      category: 'Audits',
      excerpt: 'Learn how to prepare your project for a comprehensive security audit.',
      readTime: '5 min read'
    },
    {
      id: 'article-2',
      title: 'Understanding Vulnerability Reports',
      category: 'Security',
      excerpt: 'How to interpret and prioritize findings in your security audit report.',
      readTime: '8 min read'
    },
    {
      id: 'article-3',
      title: 'Working with AI Security Tools',
      category: 'Tools',
      excerpt: 'Leverage our AI tools to improve your project security before audits.',
      readTime: '6 min read'
    },
    {
      id: 'article-4',
      title: 'Escrow System Guide',
      category: 'Payments',
      excerpt: 'Learn how our secure escrow system protects both auditors and projects.',
      readTime: '7 min read'
    },
    {
      id: 'article-5',
      title: 'Two-Factor Authentication Setup',
      category: 'Security',
      excerpt: 'How to enable and configure 2FA for your Hawkly account.',
      readTime: '4 min read'
    },
    {
      id: 'article-6',
      title: 'Service Provider Application Process',
      category: 'Auditors',
      excerpt: 'Guide for security experts applying to join the Hawkly platform.',
      readTime: '6 min read'
    }
  ];
  
  // Sample FAQ items
  const faqItems = [
    {
      question: "How long does a typical audit take?",
      answer: "The duration of an audit depends on the complexity and size of your project. Simple smart contracts might take 3-5 days, while complex protocols could take 2-4 weeks. During the request process, you'll receive an estimated timeline based on your specific project details."
    },
    {
      question: "How much does a security audit cost?",
      answer: `Audit costs vary based on complexity, codebase size, and timeline requirements. Typical prices range from ${formatCurrency(5000)} for small contracts to ${formatCurrency(50000)}+ for complex DeFi protocols. You'll receive a custom quote after submitting your project details.`
    },
    {
      question: "How are auditors vetted on the platform?",
      answer: "Auditors undergo a rigorous application process that includes credential verification, technical assessments, background checks, and reference validations. Only about 8% of applicants are accepted to ensure the highest quality of security reviews."
    },
    {
      question: "What happens if vulnerabilities are found after an audit?",
      answer: "Many auditors offer a warranty period (typically 30-90 days) where they'll review fixes and updates at no additional cost. We also offer continuous monitoring services that can alert you to potential new vulnerabilities as they emerge."
    },
    {
      question: "Can I request specific auditors for my project?",
      answer: "Yes, you can request specific auditors based on their expertise, reputation, or previous work. Our platform also offers AI-powered matching to suggest the best auditors for your specific project requirements."
    },
    {
      question: "How does the escrow payment system work?",
      answer: "Our escrow system holds funds securely until predefined milestones are met. Funds are only released when both parties agree that work has been completed satisfactorily, protecting both clients and auditors throughout the process."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Support Center | Hawkly</title>
        <meta name="description" content="Get help with Web3 security audits, platform features, and connect with our support team" />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Search */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-bold mb-6">How can we help you?</h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Find answers, resources, and connect with our support team
            </p>
            <div className="max-w-2xl mx-auto relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input 
                type="search"
                placeholder="Search for guides, FAQs, and resources..."
                className="pl-10 h-12 text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </section>
        
        {/* Support Categories */}
        <section className="py-16 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="w-full grid grid-cols-1 sm:grid-cols-4 h-auto gap-2 sm:gap-0">
                  <TabsTrigger value="help-center" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 h-auto">
                    <FileText className="mr-2 h-5 w-5" />
                    <span>Help Center</span>
                  </TabsTrigger>
                  <TabsTrigger value="faq" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 h-auto">
                    <HelpCircle className="mr-2 h-5 w-5" />
                    <span>FAQs</span>
                  </TabsTrigger>
                  <TabsTrigger value="live-chat" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 h-auto">
                    <MessageSquare className="mr-2 h-5 w-5" />
                    <span>Live Chat</span>
                  </TabsTrigger>
                  <TabsTrigger value="contact" className="data-[state=active]:bg-primary data-[state=active]:text-white py-3 h-auto">
                    <Mail className="mr-2 h-5 w-5" />
                    <span>Contact Us</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="help-center" className="mt-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                      <div className="grid grid-cols-1 gap-6">
                        {supportArticles.map(article => (
                          <Card key={article.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start">
                                <CardTitle>{article.title}</CardTitle>
                                <span className="text-xs px-2 py-1 bg-muted rounded-full">
                                  {article.category}
                                </span>
                              </div>
                              <CardDescription>{article.excerpt}</CardDescription>
                            </CardHeader>
                            <CardFooter className="pt-0 flex justify-between items-center">
                              <span className="text-xs text-muted-foreground">{article.readTime}</span>
                              <Button variant="link" size="sm" className="flex items-center p-0">
                                Read Article
                                <ChevronRight className="ml-1 h-4 w-4" />
                              </Button>
                            </CardFooter>
                          </Card>
                        ))}
                      </div>
                      
                      <div className="mt-8 flex justify-center">
                        <Button asChild variant="outline">
                          <a href="/knowledge-base">
                            View All Knowledge Base Articles
                            <ChevronRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-2xl font-bold mb-6">Support Categories</h2>
                      <div className="space-y-3">
                        <Card className="hover:bg-muted/30 cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Audits</h3>
                              <p className="text-sm text-muted-foreground">Security audit process</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="hover:bg-muted/30 cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Wallet className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Payments & Escrow</h3>
                              <p className="text-sm text-muted-foreground">Managing transactions</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="hover:bg-muted/30 cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <Bot className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">AI Tools</h3>
                              <p className="text-sm text-muted-foreground">Using security assistants</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="hover:bg-muted/30 cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <UserCog className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Account Management</h3>
                              <p className="text-sm text-muted-foreground">Profile and settings</p>
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="hover:bg-muted/30 cursor-pointer transition-colors">
                          <CardContent className="p-4 flex items-center">
                            <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                              <BookOpen className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium">Marketplace</h3>
                              <p className="text-sm text-muted-foreground">Finding security services</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="faq" className="mt-8">
                  <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                    <Accordion type="single" collapsible className="w-full">
                      {faqItems.map((item, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-lg font-medium">{item.question}</AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    
                    <div className="mt-12 text-center">
                      <p className="text-muted-foreground mb-4">
                        Can't find what you're looking for?
                      </p>
                      <Button asChild>
                        <a href="/contact">Contact Our Support Team</a>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="live-chat" className="mt-8">
                  <div className="max-w-3xl mx-auto text-center">
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                      </div>
                      <h2 className="text-2xl font-bold">Connect with Live Support</h2>
                      <p className="text-muted-foreground mt-2">
                        Our team is available to help you with any questions or issues
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto mt-8">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-center">
                            <MessageSquare className="mr-2 h-5 w-5 text-primary" />
                            Live Chat
                          </CardTitle>
                          <CardDescription>
                            Available 24/7 for all users
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-6">
                            Chat with our support team in real-time for immediate assistance with your questions
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button className="w-full">
                            Start Live Chat
                          </Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-center">
                            <Phone className="mr-2 h-5 w-5 text-primary" />
                            Phone Support
                          </CardTitle>
                          <CardDescription>
                            Available 9am-5pm EST
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground mb-6">
                            Speak directly with our technical support team for complex issues requiring detailed assistance
                          </p>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">
                            Schedule a Call
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contact" className="mt-8">
                  <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                      <h2 className="text-2xl font-bold mb-2">Contact Our Support Team</h2>
                      <p className="text-muted-foreground">
                        We'll get back to you within 24 hours
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <form className="space-y-6">
                          <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Your Name</label>
                            <Input id="name" placeholder="Enter your name" />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium">Email</label>
                            <Input id="email" type="email" placeholder="your@email.com" />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                            <Input id="subject" placeholder="What is your inquiry about?" />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium">Message</label>
                            <textarea 
                              id="message" 
                              rows={5} 
                              className="w-full min-h-[120px] rounded-md border border-border bg-transparent px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-primary"
                              placeholder="Please describe your issue in detail..."
                            ></textarea>
                          </div>
                          
                          <Button className="w-full">Submit Request</Button>
                        </form>
                      </div>
                      
                      <div className="space-y-8">
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center">
                            <Mail className="mr-2 h-5 w-5 text-primary" />
                            Email Us
                          </h3>
                          <p className="text-muted-foreground mb-2">For general inquiries:</p>
                          <a href="mailto:support@hawkly.com" className="text-primary hover:underline">
                            support@hawkly.com
                          </a>
                          
                          <p className="text-muted-foreground mt-4 mb-2">For security issues:</p>
                          <a href="mailto:security@hawkly.com" className="text-primary hover:underline">
                            security@hawkly.com
                          </a>
                        </div>
                        
                        <div>
                          <h3 className="font-semibold mb-4 flex items-center">
                            <Book className="mr-2 h-5 w-5 text-primary" />
                            Documentation
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            Find detailed guides and resources in our documentation portal.
                          </p>
                          <Button asChild variant="outline" size="sm">
                            <a href="/documentation" className="flex items-center">
                              Browse Documentation
                              <ChevronRight className="ml-2 h-4 w-4" />
                            </a>
                          </Button>
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-semibold mb-2">Support Hours</h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            Our team is available to help you:
                          </p>
                          <ul className="space-y-2 text-sm">
                            <li className="flex justify-between">
                              <span>Monday - Friday:</span>
                              <span>24 hours</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Saturday:</span>
                              <span>9am - 5pm EST</span>
                            </li>
                            <li className="flex justify-between">
                              <span>Sunday:</span>
                              <span>9am - 5pm EST</span>
                            </li>
                          </ul>
                          <p className="text-xs text-muted-foreground mt-4">
                            Emergency security support is available 24/7
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>
        
        {/* Resources Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Resources</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Explore our library of security guides, templates, and educational content
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-card/80">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Security Guides</h3>
                  <p className="text-muted-foreground mb-6">
                    Comprehensive guides on Web3 security best practices and vulnerability prevention
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="/guides">View Guides</a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Audit Templates</h3>
                  <p className="text-muted-foreground mb-6">
                    Sample templates for audit requests, security requirements, and verification checklists
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="/templates">Download Templates</a>
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-card/80">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Video className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Video Tutorials</h3>
                  <p className="text-muted-foreground mb-6">
                    Step-by-step tutorials on using the platform and implementing security recommendations
                  </p>
                  <Button asChild variant="outline" size="sm">
                    <a href="/tutorials">Watch Tutorials</a>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

// These icons are used in the component but need to be defined
const Shield = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 22s8-4 8-10V6a9 9 0 0 0-12-3A9 9 0 0 0 4 6v6c0 6 8 10 8 10" />
  </svg>
);

const Wallet = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
  </svg>
);

const UserCog = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="9" cy="6" r="4" />
    <path d="M4 18a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4" />
    <circle cx="19" cy="13" r="1" />
    <path d="m18.66 16.75-.93-1.31" />
    <path d="m19.27 10.56-.93 1.31" />
    <path d="m16.65 12.62-1.31-.93" />
    <path d="m21.35 12.62-1.31.93" />
  </svg>
);

const Bot = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="11" width="18" height="10" rx="2" />
    <circle cx="12" cy="17" r="1" />
    <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
  </svg>
);

const BookOpen = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 2q1 5 1 9t-1 9" />
    <path d="M 16 3 C 16.5 3.5 17.5 5.5 18 7 C 18.5 8.5 19 11.5 19 13 C 19 14.5 19.5 17.5 18 19 C 16.5 20.5 13 20 12 20 C 11 20 7.5 20.5 6 19 C 4.5 17.5 5 14.5 5 13 C 5 11.5 5.5 8.5 6 7 C 6.5 5.5 7.5 3.5 8 3 C 8.5 2.5 11 2 12 2 C 13 2 15.5 2.5 16 3 Z" />
  </svg>
);

const Video = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m22 8-6 4 6 4V8Z" />
    <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
  </svg>
);

export default SupportCenter;
