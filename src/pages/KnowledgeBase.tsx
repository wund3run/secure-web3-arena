
import React, { useState } from 'react';
import { StandardizedLayout } from '@/components/layout/StandardizedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Database, Search, HelpCircle, BookOpen, Lightbulb, AlertTriangle, CheckCircle, MessageSquare } from 'lucide-react';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const articles = [
    {
      id: 1,
      title: "What is a reentrancy attack and how to prevent it?",
      category: "Smart Contract Security",
      type: "FAQ",
      content: "A reentrancy attack occurs when a function makes an external call to another untrusted contract...",
      views: 3420,
      helpful: 89,
      lastUpdated: "2024-01-15"
    },
    {
      id: 2,
      title: "How to verify smart contracts on Etherscan",
      category: "Development",
      type: "Tutorial",
      content: "Smart contract verification is essential for transparency and trust...",
      views: 2150,
      helpful: 92,
      lastUpdated: "2024-01-12"
    },
    {
      id: 3,
      title: "Common gas optimization techniques",
      category: "Performance",
      type: "Guide",
      content: "Gas optimization is crucial for cost-effective smart contracts...",
      views: 1890,
      helpful: 85,
      lastUpdated: "2024-01-10"
    }
  ];

  const categories = [
    { name: "Smart Contract Security", count: 45, icon: AlertTriangle },
    { name: "Development", count: 32, icon: BookOpen },
    { name: "Performance", count: 28, icon: Lightbulb },
    { name: "Troubleshooting", count: 35, icon: HelpCircle }
  ];

  return (
    <StandardizedLayout
      title="Knowledge Base | Hawkly"
      description="Searchable database of security articles, FAQs, and troubleshooting guides"
      keywords="knowledge base, security articles, FAQ, troubleshooting"
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-pink-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-grid-white/[0.05] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-12">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-500/10 px-4 py-2 rounded-full border border-purple-500/20 mb-6">
              <Database className="h-5 w-5 text-purple-400" />
              <span className="text-purple-300 font-medium">Knowledge Center</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Knowledge Base
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Find answers to your questions with our comprehensive knowledge base covering 
              Web3 security, development best practices, and troubleshooting guides.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search articles, guides, and FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-4 text-lg bg-gray-800/50 border-gray-700 text-white"
              />
            </div>
          </div>

          <Tabs defaultValue="browse" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 border border-gray-700">
              <TabsTrigger value="browse" className="data-[state=active]:bg-purple-600">Browse Topics</TabsTrigger>
              <TabsTrigger value="popular" className="data-[state=active]:bg-purple-600">Popular Articles</TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-purple-600">Recently Updated</TabsTrigger>
            </TabsList>

            <TabsContent value="browse" className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {categories.map((category, index) => (
                  <Card key={index} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm hover:border-purple-500/50 transition-colors cursor-pointer">
                    <CardHeader className="text-center">
                      <div className="mx-auto p-3 bg-purple-600/20 rounded-lg w-fit mb-3">
                        <category.icon className="h-6 w-6 text-purple-400" />
                      </div>
                      <CardTitle className="text-white text-lg">{category.name}</CardTitle>
                      <Badge variant="outline" className="bg-purple-600/20 text-purple-300 mx-auto">
                        {category.count} articles
                      </Badge>
                    </CardHeader>
                  </Card>
                ))}
              </div>

              {/* Quick Access FAQ */}
              <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-purple-400" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      "How do I get started with Web3 security auditing?",
                      "What's the difference between static and dynamic analysis?",
                      "How much does a security audit typically cost?",
                      "What should I look for when choosing an auditor?",
                      "How long does a typical audit take to complete?"
                    ].map((question, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors cursor-pointer">
                        <span className="text-gray-300">{question}</span>
                        <CheckCircle className="h-4 w-4 text-purple-400" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="popular" className="mt-8">
              <div className="space-y-6">
                {articles.map((article) => (
                  <Card key={article.id} className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="bg-purple-600/20 text-purple-300">
                              {article.type}
                            </Badge>
                            <Badge variant="outline" className="bg-gray-600/20 text-gray-300">
                              {article.category}
                            </Badge>
                          </div>
                          <h3 className="text-xl font-semibold text-white mb-2">{article.title}</h3>
                          <p className="text-gray-400">{article.content}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>{article.views} views</span>
                          <span>{article.helpful}% found helpful</span>
                          <span>Updated {article.lastUpdated}</span>
                        </div>
                        <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                          Read Article
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="recent" className="mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Latest Updates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      { title: "New Vulnerability Pattern: Flash Loan Attacks", date: "2024-01-15" },
                      { title: "Updated Gas Optimization Guidelines", date: "2024-01-14" },
                      { title: "Cross-Chain Security Best Practices", date: "2024-01-12" },
                      { title: "DeFi Protocol Security Checklist", date: "2024-01-10" }
                    ].map((update, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{update.title}</span>
                          <p className="text-gray-400 text-sm">{update.date}</p>
                        </div>
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-purple-400" />
                      Community Q&A
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-400 mb-4">
                      Can't find what you're looking for? Ask our community of security experts.
                    </p>
                    <Button className="w-full bg-purple-600 hover:bg-purple-700">
                      Ask a Question
                    </Button>
                    <div className="text-center text-sm text-gray-400">
                      Average response time: 2 hours
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </StandardizedLayout>
  );
};

export default KnowledgeBase;
