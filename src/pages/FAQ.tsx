
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Search, HelpCircle, MessageSquare, Clock, DollarSign, 
  Shield, Users, Star, ArrowRight, CheckCircle, AlertTriangle,
  FileText, Zap, Lock, Bot
} from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Questions', count: 42, icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'getting-started', name: 'Getting Started', count: 8, icon: <Zap className="h-4 w-4" /> },
    { id: 'pricing', name: 'Pricing & Plans', count: 12, icon: <DollarSign className="h-4 w-4" /> },
    { id: 'security', name: 'Security Process', count: 10, icon: <Shield className="h-4 w-4" /> },
    { id: 'platform', name: 'Platform Features', count: 7, icon: <Bot className="h-4 w-4" /> },
    { id: 'support', name: 'Support & Billing', count: 5, icon: <MessageSquare className="h-4 w-4" /> }
  ];

  const faqData = [
    // Getting Started
    {
      category: 'getting-started',
      question: "How do I get started with Hawkly's security auditing platform?",
      answer: "Getting started is simple: 1) Create your free account, 2) Complete your profile (project owner or auditor), 3) For project owners: submit your first audit request using our guided wizard, 4) For auditors: complete verification and set up your service offerings. New users get $100 in credits to explore our services.",
      popular: true
    },
    {
      category: 'getting-started',
      question: "What information do I need to submit an audit request?",
      answer: "You'll need: project description, smart contract repository (GitHub/GitLab), blockchain platform, estimated contract count and lines of code, preferred timeline, budget range, and specific security concerns. Our AI wizard helps gather this information efficiently.",
      popular: false
    },
    {
      category: 'getting-started',
      question: "How long does the auditor matching process take?",
      answer: "Our AI-powered matching system typically finds suitable auditors within 30 minutes for standard projects. Complex or specialized projects may take 2-4 hours. You'll receive notifications as soon as matches are available.",
      popular: true
    },

    // Pricing & Plans
    {
      category: 'pricing',
      question: "What are Hawkly's pricing plans for 2025?",
      answer: "We offer flexible pricing: Basic Audit ($3,500 - simple contracts), Professional Audit ($12,500 - complex DeFi), AI-Enhanced Audit ($8,500 - includes automated scanning), Enterprise (custom pricing from $25,000). All plans include escrow protection and detailed reports.",
      popular: true
    },
    {
      category: 'pricing',
      question: "What's included in the AI-Enhanced Audit package?",
      answer: "AI-Enhanced Audits include: automated vulnerability scanning with 95% accuracy, real-time code analysis, predictive threat modeling, automated report generation, and human expert review. This hybrid approach reduces costs while maintaining thoroughness.",
      popular: true
    },
    {
      category: 'pricing',
      question: "Do you offer discounts for multiple audits or long-term partnerships?",
      answer: "Yes! We offer: 15% discount for 3+ audits within 6 months, 25% discount for annual partnerships, 10% discount for open-source projects, and special rates for educational institutions. Contact our sales team for custom enterprise packages.",
      popular: false
    },
    {
      category: 'pricing',
      question: "What payment methods do you accept?",
      answer: "We accept: major cryptocurrencies (ETH, BTC, USDC, USDT), traditional payment methods (credit cards, bank transfers, PayPal), and invoice-based payments for enterprises. All payments are secured through our multi-signature escrow system.",
      popular: false
    },

    // Security Process
    {
      category: 'security',
      question: "What does a typical security audit process look like?",
      answer: "Our audit process includes: 1) Initial assessment and scope definition, 2) Automated AI scanning and analysis, 3) Manual code review by certified auditors, 4) Vulnerability testing and exploit simulation, 5) Detailed report with remediation steps, 6) Re-testing after fixes, 7) Final security certification.",
      popular: true
    },
    {
      category: 'security',
      question: "How do you ensure the quality and accuracy of audits?",
      answer: "Quality assurance includes: certified auditors with proven track records, AI-powered double-checking, peer review for complex findings, standardized methodologies following industry best practices, client feedback systems, and continuous auditor training on latest threats.",
      popular: true
    },
    {
      category: 'security',
      question: "What types of vulnerabilities can your audits detect?",
      answer: "We detect: reentrancy attacks, integer overflow/underflow, access control issues, front-running vulnerabilities, oracle manipulation, flash loan attacks, governance exploits, cross-chain bridge risks, and emerging AI-powered threats. Our database includes 500+ known vulnerability patterns.",
      popular: false
    },
    {
      category: 'security',
      question: "Do you provide ongoing security monitoring after the audit?",
      answer: "Yes, we offer: continuous monitoring plans starting at $500/month, real-time threat alerts, automated rescanning for code changes, quarterly security updates, and emergency response for zero-day threats. Perfect for protocols with high TVL.",
      popular: false
    },

    // Platform Features
    {
      category: 'platform',
      question: "What blockchains and protocols do you support?",
      answer: "We support: Ethereum, Polygon, Arbitrum, Optimism, BSC, Avalanche, Solana, Cosmos, Polkadot, and 15+ other major blockchains. We also audit: DeFi protocols, NFT platforms, DAOs, cross-chain bridges, and Layer 2 solutions.",
      popular: true
    },
    {
      category: 'platform',
      question: "How does your AI-powered vulnerability detection work?",
      answer: "Our AI system uses: machine learning models trained on 10,000+ audited contracts, pattern recognition for known exploits, predictive analysis for emerging threats, automated code flow analysis, and continuous learning from new vulnerabilities. It achieves 95% accuracy in detecting critical issues.",
      popular: true
    },
    {
      category: 'platform',
      question: "Can I track the progress of my audit in real-time?",
      answer: "Absolutely! Our dashboard provides: real-time progress updates, milestone notifications, direct communication with auditors, preliminary findings as they're discovered, estimated completion times, and mobile app notifications.",
      popular: false
    },

    // Support & Billing
    {
      category: 'support',
      question: "What kind of support do you provide during and after audits?",
      answer: "We provide: 24/7 technical support via chat/email, dedicated account managers for enterprise clients, post-audit remediation guidance, emergency security response, and access to our security expert community forum.",
      popular: false
    },
    {
      category: 'support',
      question: "What happens if I'm not satisfied with the audit results?",
      answer: "We offer: full refund within 30 days if not satisfied, free re-audit if significant issues are missed, third-party arbitration for disputes, and additional expert review at no cost. Your satisfaction and security are our top priorities.",
      popular: false
    },
    {
      category: 'support',
      question: "How do I handle billing disputes or payment issues?",
      answer: "Contact our billing team at billing@hawkly.com or through the platform chat. We typically resolve payment issues within 24 hours. For disputes, we have a structured resolution process with clear timelines and escalation procedures.",
      popular: false
    }
  ];

  const filteredFAQs = faqData.filter(faq => 
    (selectedCategory === 'all' || faq.category === selectedCategory) &&
    (searchQuery === '' || 
     faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
     faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const popularFAQs = faqData.filter(faq => faq.popular);

  return (
    <ContentPage
      title="Frequently Asked Questions"
      description="Find answers to common questions about Hawkly's Web3 security audit platform, pricing, AI-powered features, and support services."
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-green-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <HelpCircle className="h-4 w-4" />
            Updated March 2025 - Latest pricing and AI features
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Frequently Asked <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">Questions</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get instant answers about our security auditing platform, AI-powered features, 
            pricing plans, and everything you need to know about protecting your Web3 project.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold mb-2">Support Statistics</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4 text-center">
            <div className="space-y-1">
              <div className="text-2xl font-bold text-blue-600">< 2hrs</div>
              <div className="text-sm text-muted-foreground">Avg response time</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-green-600">98.5%</div>
              <div className="text-sm text-muted-foreground">Question resolution rate</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-muted-foreground">Support availability</div>
            </div>
            <div className="space-y-1">
              <div className="text-2xl font-bold text-orange-600">4.9★</div>
              <div className="text-sm text-muted-foreground">Support satisfaction</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              {category.icon}
              {category.name} ({category.count})
            </Button>
          ))}
        </div>

        {/* Popular Questions */}
        {selectedCategory === 'all' && (
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Most Popular Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularFAQs.slice(0, 4).map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-base">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3">{faq.answer}</p>
                    <Button variant="ghost" size="sm" className="mt-2 p-0">
                      Read more <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* FAQ Accordion */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold">
            {selectedCategory === 'all' ? 'All Questions' : categories.find(c => c.id === selectedCategory)?.name}
          </h2>
          
          {filteredFAQs.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <HelpCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or browse different categories.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFAQs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex items-start gap-3">
                      {faq.popular && (
                        <Star className="h-4 w-4 text-yellow-500 mt-1 flex-shrink-0" />
                      )}
                      <span className="font-medium">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pt-2 pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Can't find what you're looking for? Our support team is available 24/7 to help you 
            with any questions about security audits, pricing, or platform features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/support">
                <MessageSquare className="mr-2 h-4 w-4" />
                Contact Support
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/docs">
                <FileText className="mr-2 h-4 w-4" />
                Browse Documentation
              </Link>
            </Button>
          </div>
        </section>

        {/* Related Resources */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold">Related Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Security Guides
                </CardTitle>
                <CardDescription>
                  Comprehensive guides on Web3 security best practices and audit processes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/guides">
                    Explore Guides <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-purple-600" />
                  AI Tools
                </CardTitle>
                <CardDescription>
                  Learn about our AI-powered vulnerability detection and automated auditing tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/ai-tools">
                    Try AI Tools <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Community Forum
                </CardTitle>
                <CardDescription>
                  Connect with other developers and security experts in our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm" asChild className="w-full">
                  <Link to="/forum">
                    Join Community <ArrowRight className="ml-1 h-3 w-3" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </ContentPage>
  );
};

export default FAQ;
