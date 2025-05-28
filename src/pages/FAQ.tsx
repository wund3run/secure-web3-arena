
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, Shield, DollarSign, Clock, Users } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: <HelpCircle className="h-5 w-5" />,
      color: 'bg-blue-100 text-blue-800',
      questions: [
        {
          question: 'What is Hawkly?',
          answer: 'Hawkly is a Web3 security marketplace that connects blockchain projects with verified security auditors. We provide a platform for requesting, conducting, and managing smart contract audits and security assessments.'
        },
        {
          question: 'How does the platform ensure auditor quality?',
          answer: 'All auditors go through a rigorous verification process including background checks, technical assessments, and portfolio reviews. We also maintain performance metrics and user ratings for each auditor.'
        },
        {
          question: 'Is Hawkly suitable for all blockchain projects?',
          answer: 'Yes, we support audits for projects on Ethereum, Binance Smart Chain, Polygon, Arbitrum, Optimism, Solana, and many other blockchain ecosystems.'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security & Audits',
      icon: <Shield className="h-5 w-5" />,
      color: 'bg-green-100 text-green-800',
      questions: [
        {
          question: 'What types of security audits are available?',
          answer: 'We offer smart contract audits, DeFi protocol security reviews, NFT security assessments, bridge audits, DAO security evaluations, and comprehensive penetration testing.'
        },
        {
          question: 'How long does a typical audit take?',
          answer: 'Audit duration varies based on complexity and scope. Simple contracts may take 1-3 days, while complex DeFi protocols can take 2-4 weeks. Each auditor provides estimated timelines in their proposals.'
        },
        {
          question: 'What deliverables do I receive after an audit?',
          answer: 'You receive a comprehensive security report detailing all findings, risk assessments, remediation recommendations, and a summary suitable for stakeholders and users.'
        },
        {
          question: 'Can I request multiple audits for the same project?',
          answer: 'Absolutely! Many projects benefit from multiple independent audits. We can help coordinate multiple auditors or arrange for different audit phases.'
        }
      ]
    },
    {
      id: 'pricing',
      title: 'Pricing & Payments',
      icon: <DollarSign className="h-5 w-5" />,
      color: 'bg-yellow-100 text-yellow-800',
      questions: [
        {
          question: 'How much does a security audit cost?',
          answer: 'Audit costs vary based on project complexity, scope, and timeline. Basic audits start at $1,500, while comprehensive enterprise audits can range from $15,000-$50,000+. Get a custom quote through our platform.'
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept major cryptocurrencies (ETH, USDC, USDT, BTC) and traditional payments via credit card or bank transfer. All payments are secured through our escrow system.'
        },
        {
          question: 'How does the escrow system work?',
          answer: 'Payments are held in escrow until milestone completion. This protects both clients and auditors, ensuring payment upon satisfactory delivery of audit work.'
        },
        {
          question: 'Are there any additional fees?',
          answer: 'Hawkly charges a small platform fee (typically 5-10%) to cover platform operations, dispute resolution, and quality assurance. This is clearly disclosed before any agreement.'
        }
      ]
    },
    {
      id: 'process',
      title: 'Audit Process',
      icon: <Clock className="h-5 w-5" />,
      color: 'bg-purple-100 text-purple-800',
      questions: [
        {
          question: 'How do I request an audit?',
          answer: 'Simply create an account, fill out our audit request form with project details, and our AI matching system will connect you with suitable auditors who will submit proposals.'
        },
        {
          question: 'How are auditors matched to my project?',
          answer: 'Our AI system analyzes your project requirements, blockchain ecosystem, complexity, and budget to match you with auditors who have relevant expertise and availability.'
        },
        {
          question: 'Can I communicate directly with auditors?',
          answer: 'Yes! Our platform includes integrated messaging, video calls, and collaboration tools to facilitate clear communication throughout the audit process.'
        },
        {
          question: 'What happens if issues are found during the audit?',
          answer: 'Auditors provide detailed reports with remediation steps. You can implement fixes and request re-audits of specific areas. Many auditors offer limited re-audit services as part of their initial engagement.'
        }
      ]
    },
    {
      id: 'platform',
      title: 'Platform Features',
      icon: <Users className="h-5 w-5" />,
      color: 'bg-indigo-100 text-indigo-800',
      questions: [
        {
          question: 'Is there a community aspect to Hawkly?',
          answer: 'Yes! We have an active community with forums, events, workshops, security challenges, and educational resources where security professionals and project teams can connect and learn.'
        },
        {
          question: 'Do you offer educational resources?',
          answer: 'We provide comprehensive documentation, security guides, tutorials, best practices, and a knowledge base to help teams improve their security posture.'
        },
        {
          question: 'Can I become a verified auditor on the platform?',
          answer: 'Yes! We welcome qualified security professionals. Apply through our auditor onboarding process, which includes verification of credentials, experience, and technical capabilities.'
        },
        {
          question: 'Is there an API for integration?',
          answer: 'We offer API access for enterprise clients to integrate Hawkly security services into their development workflows and CI/CD pipelines.'
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => 
        q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <>
      <Helmet>
        <title>FAQ | Hawkly</title>
        <meta name="description" content="Frequently asked questions about Web3 security audits and the Hawkly platform" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find answers to common questions about security audits, our platform, and the audit process.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search frequently asked questions..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="max-w-4xl mx-auto space-y-8">
            {filteredCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${category.color}`}>
                      {category.icon}
                    </div>
                    {category.title}
                    <Badge variant="outline">{category.questions.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.questions.map((faq, index) => (
                      <AccordionItem key={index} value={`${category.id}-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-gray-600 leading-relaxed">
                            {faq.answer}
                          </p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* No Results */}
          {filteredCategories.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-600 mb-6">
                Try different keywords or browse all categories above
              </p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 text-center">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-4">Still have questions?</h3>
                <p className="text-gray-600 mb-6">
                  Our support team is here to help with any additional questions about security audits or platform features.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="/docs"
                    className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    View Documentation
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default FAQ;
