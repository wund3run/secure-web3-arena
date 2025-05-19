
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SearchIcon, BookOpen, ChevronRight, FileText, Shield, Code, Wallet, Bot } from "lucide-react";

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  
  // Knowledge base articles data
  const articles = [
    {
      id: "kb-1",
      title: "Understanding Smart Contract Vulnerabilities",
      description: "Learn about common smart contract vulnerabilities and how to identify them in your code.",
      category: "Security",
      readingTime: "8 min read",
      icon: <Shield className="h-5 w-5" />,
      featured: true
    },
    {
      id: "kb-2",
      title: "Preparing Your Project for an Audit",
      description: "A comprehensive guide on how to prepare your codebase and documentation for a security audit.",
      category: "Audit Process",
      readingTime: "10 min read",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "kb-3",
      title: "Working with the Escrow System",
      description: "Step-by-step guide to using Hawkly's secure escrow system for audit payments and milestone tracking.",
      category: "Payments",
      readingTime: "6 min read",
      icon: <Wallet className="h-5 w-5" />
    },
    {
      id: "kb-4",
      title: "Advanced Solidity Security Patterns",
      description: "Explore advanced security patterns and best practices for writing secure Solidity code.",
      category: "Development",
      readingTime: "12 min read",
      icon: <Code className="h-5 w-5" />,
      featured: true
    },
    {
      id: "kb-5",
      title: "Security Tools for Continuous Protection",
      description: "Overview of tools and services for continuous security monitoring after audits are complete.",
      category: "Tools",
      readingTime: "7 min read",
      icon: <Bot className="h-5 w-5" />
    },
    {
      id: "kb-6",
      title: "Understanding Audit Reports",
      description: "How to read and interpret security audit reports and vulnerability classifications.",
      category: "Audit Process",
      readingTime: "9 min read",
      icon: <FileText className="h-5 w-5" />
    },
    {
      id: "kb-7",
      title: "Security for DeFi Protocols",
      description: "Special security considerations and common vulnerabilities in DeFi applications.",
      category: "Security",
      readingTime: "11 min read",
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: "kb-8",
      title: "Blockchain-Specific Attack Vectors",
      description: "Understanding the unique security challenges and attack vectors in different blockchain ecosystems.",
      category: "Security",
      readingTime: "10 min read",
      icon: <Shield className="h-5 w-5" />
    },
    {
      id: "kb-9",
      title: "Creating Security Requirements Documents",
      description: "How to document your security requirements for more effective audit outcomes.",
      category: "Audit Process",
      readingTime: "8 min read",
      icon: <FileText className="h-5 w-5" />
    }
  ];
  
  // Categories for filtering
  const categories = [
    { id: "all", name: "All Articles" },
    { id: "security", name: "Security" },
    { id: "audit-process", name: "Audit Process" },
    { id: "development", name: "Development" },
    { id: "payments", name: "Payments" },
    { id: "tools", name: "Tools" }
  ];
  
  // Filter articles based on search query and active tab
  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchQuery === '' || 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeTab === 'all' || 
      article.category.toLowerCase() === activeTab.replace('-', ' ');
    
    return matchesSearch && matchesCategory;
  });
  
  // Featured articles for the hero section
  const featuredArticles = articles.filter(article => article.featured);

  return (
    <>
      <Helmet>
        <title>Knowledge Base | Hawkly</title>
        <meta name="description" content="Access comprehensive guides, tutorials, and resources on Web3 security, smart contract audits, and blockchain security best practices." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Featured Articles */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Knowledge Base</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                In-depth resources, guides and best practices for Web3 security
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto relative mb-12">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search the knowledge base..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="bg-card/80 border-primary/20 hover:border-primary/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Featured</span>
                      <span className="text-xs text-muted-foreground">{article.readingTime}</span>
                    </div>
                    <CardTitle className="text-xl mt-2">{article.title}</CardTitle>
                    <CardDescription>{article.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="link" className="p-0">
                      Read Article
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Article Categories and Listings */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-6 gap-2">
                {categories.map((category) => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                  <Card key={article.id} className="hover:shadow-md transition-all">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            {article.icon}
                          </div>
                          <span className="text-xs font-medium text-muted-foreground">
                            {article.category}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground">{article.readingTime}</span>
                      </div>
                      <CardTitle className="text-lg">{article.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {article.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Read More
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  No articles match your current search criteria.
                </p>
                <Button onClick={() => {setSearchQuery(''); setActiveTab('all');}}>
                  Reset Filters
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Help Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our support team is ready to help with any questions you might have about Web3 security or using our platform.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/support">Visit Support Center</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default KnowledgeBase;
