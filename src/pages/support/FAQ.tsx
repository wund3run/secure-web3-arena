
import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Search, HelpCircle, ChevronDown, MessageSquare, Shield, DollarSign, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  { name: "General", icon: HelpCircle, count: 12 },
  { name: "Security", icon: Shield, count: 18 },
  { name: "Pricing", icon: DollarSign, count: 8 },
  { name: "Account", icon: Users, count: 10 }
];

const faqs = [
  {
    category: "General",
    question: "What is Hawkly and how does it work?",
    answer: "Hawkly is a Web3 security marketplace that connects project owners with certified security auditors. Our platform provides comprehensive smart contract audits, code reviews, and security consulting services to help secure your blockchain projects."
  },
  {
    category: "General", 
    question: "What types of blockchain projects do you support?",
    answer: "We support all major blockchain platforms including Ethereum, Binance Smart Chain, Polygon, Avalanche, and more. Our auditors are experienced with various protocols including DeFi, NFTs, DAOs, and custom smart contracts."
  },
  {
    category: "Security",
    question: "How do you ensure the quality of security audits?",
    answer: "All our auditors are certified professionals with proven track records. We use a rigorous vetting process, peer reviews, and standardized audit methodologies. Each audit includes automated testing, manual review, and detailed reporting."
  },
  {
    category: "Security",
    question: "What vulnerabilities can your audits detect?",
    answer: "Our audits cover a comprehensive range of vulnerabilities including reentrancy attacks, integer overflows, access control issues, front-running, flash loan attacks, and many others. We follow the latest security standards and threat models."
  },
  {
    category: "Security",
    question: "Do you provide post-audit support?",
    answer: "Yes, we offer post-audit support including remediation guidance, re-audits after fixes, and ongoing security monitoring services. Our goal is to ensure your project remains secure throughout its lifecycle."
  },
  {
    category: "Pricing",
    question: "How much does a security audit cost?",
    answer: "Audit costs vary based on project complexity, timeline, and scope. Basic audits start at $2,500, comprehensive audits at $5,000, and enterprise solutions are custom-priced. Contact us for a detailed quote based on your specific needs."
  },
  {
    category: "Pricing",
    question: "What payment methods do you accept?",
    answer: "We accept both traditional payment methods (credit cards, bank transfers) and cryptocurrency payments (ETH, USDC, DAI). All payments are secured through our escrow system to protect both parties."
  },
  {
    category: "Pricing",
    question: "Do you offer refunds?",
    answer: "We offer a satisfaction guarantee. If you're not satisfied with the audit quality, we'll work with you to address concerns or provide a partial refund based on our terms of service."
  },
  {
    category: "Account",
    question: "How do I create an account?",
    answer: "Simply click 'Sign Up' and provide your email address and basic information. You can create either a project owner account to request audits or a service provider account to offer audit services."
  },
  {
    category: "Account",
    question: "How long does the audit process take?",
    answer: "Audit timelines depend on project complexity. Basic audits typically take 3-5 days, comprehensive audits 7-10 days, and enterprise audits 2-4 weeks. Rush services are available for urgent needs."
  },
  {
    category: "Account",
    question: "Can I track my audit progress?",
    answer: "Yes, our platform provides real-time updates on your audit progress. You can view milestones, communicate with auditors, and receive notifications at each stage of the process through your dashboard."
  },
  {
    category: "Account",
    question: "How do I become a certified auditor on Hawkly?",
    answer: "To become an auditor, apply through our service provider onboarding process. We evaluate your experience, certifications, and conduct technical interviews. Successful candidates join our network of certified security professionals."
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openItems, setOpenItems] = useState<Set<number>>(new Set());

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find answers to common questions about our Web3 security services
          </p>
          
          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search FAQs..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant={!selectedCategory ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Questions
                </Button>
                {faqCategories.map((category) => (
                  <Button
                    key={category.name}
                    variant={selectedCategory === category.name ? "default" : "ghost"}
                    className="w-full justify-between"
                    onClick={() => setSelectedCategory(category.name)}
                  >
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4" />
                      {category.name}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {category.count}
                    </Badge>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-3 text-primary" />
                <h4 className="font-semibold mb-2">Still have questions?</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find what you're looking for? Contact our support team.
                </p>
                <Button asChild className="w-full">
                  <Link to="/support">Contact Support</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - FAQ List */}
          <div className="lg:col-span-3">
            {selectedCategory && (
              <div className="mb-6">
                <Badge variant="outline" className="mb-2">
                  {selectedCategory} Questions
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCategory(null)}
                  className="ml-2"
                >
                  Clear filter
                </Button>
              </div>
            )}

            <div className="space-y-4">
              {filteredFaqs.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <HelpCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or browsing different categories
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredFaqs.map((faq, index) => (
                  <Card key={index}>
                    <Collapsible
                      open={openItems.has(index)}
                      onOpenChange={() => toggleItem(index)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <CardHeader className="hover:bg-muted/50 transition-colors">
                          <div className="flex items-center justify-between text-left">
                            <div>
                              <Badge variant="outline" className="mb-2 text-xs">
                                {faq.category}
                              </Badge>
                              <CardTitle className="text-base">{faq.question}</CardTitle>
                            </div>
                            <ChevronDown 
                              className={`h-4 w-4 transition-transform ${
                                openItems.has(index) ? 'rotate-180' : ''
                              }`} 
                            />
                          </div>
                        </CardHeader>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <CardContent className="pt-0">
                          <p className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </CardContent>
                      </CollapsibleContent>
                    </Collapsible>
                  </Card>
                ))
              )}
            </div>

            {/* Additional Help Section */}
            <Card className="mt-8 bg-primary text-primary-foreground">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Need personalized help?</h3>
                <p className="mb-4 opacity-90">
                  Our security experts are available to answer specific questions about your project
                </p>
                <div className="flex gap-2">
                  <Button variant="secondary" asChild>
                    <Link to="/consulting">Get Consulting</Link>
                  </Button>
                  <Button variant="outline" asChild className="text-primary border-primary-foreground">
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
