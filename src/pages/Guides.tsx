
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight, Shield, BookOpen, Code, Award, Layers } from "lucide-react";

const Guides = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Categories for the guides
  const categories = [
    { id: "all", name: "All Guides" },
    { id: "beginner", name: "Beginner" },
    { id: "intermediate", name: "Intermediate" },
    { id: "advanced", name: "Advanced" }
  ];
  
  // Guide data organized by difficulty level
  const guides = {
    beginner: [
      {
        id: "guide-1",
        title: "Introduction to Smart Contract Security",
        description: "Learn the basics of smart contract security and why it's crucial for your blockchain project.",
        readingTime: "10 min read",
        difficulty: "Beginner",
        icon: <Shield className="h-5 w-5" />
      },
      {
        id: "guide-2",
        title: "Understanding Audit Reports",
        description: "How to read, interpret, and act on security audit findings for your project.",
        readingTime: "8 min read",
        difficulty: "Beginner",
        icon: <BookOpen className="h-5 w-5" />
      },
      {
        id: "guide-3",
        title: "Common Vulnerabilities for New Developers",
        description: "Discover the most frequent security issues that new blockchain developers encounter.",
        readingTime: "12 min read",
        difficulty: "Beginner",
        icon: <Code className="h-5 w-5" />
      }
    ],
    intermediate: [
      {
        id: "guide-4",
        title: "DeFi Security Best Practices",
        description: "Learn security patterns specific to decentralized finance protocols and applications.",
        readingTime: "15 min read",
        difficulty: "Intermediate",
        icon: <Layers className="h-5 w-5" />
      },
      {
        id: "guide-5",
        title: "Gas Optimization Without Security Tradeoffs",
        description: "How to optimize your contract for gas efficiency while maintaining robust security.",
        readingTime: "14 min read",
        difficulty: "Intermediate",
        icon: <Code className="h-5 w-5" />
      },
      {
        id: "guide-6",
        title: "Security Patterns for Token Standards",
        description: "Implementing secure patterns for ERC20, ERC721, and other token standards.",
        readingTime: "18 min read",
        difficulty: "Intermediate",
        icon: <Shield className="h-5 w-5" />
      }
    ],
    advanced: [
      {
        id: "guide-7",
        title: "Advanced Exploit Prevention Techniques",
        description: "Sophisticated strategies to protect against complex attacks and vulnerabilities.",
        readingTime: "20 min read",
        difficulty: "Advanced",
        icon: <Shield className="h-5 w-5" />
      },
      {
        id: "guide-8",
        title: "Automated Security Testing Frameworks",
        description: "Building comprehensive testing frameworks to catch vulnerabilities before deployment.",
        readingTime: "25 min read",
        difficulty: "Advanced",
        icon: <Code className="h-5 w-5" />
      },
      {
        id: "guide-9",
        title: "Formal Verification for Smart Contracts",
        description: "Using mathematical proofs to verify the correctness of your smart contract code.",
        readingTime: "22 min read",
        difficulty: "Advanced",
        icon: <Award className="h-5 w-5" />
      }
    ]
  };
  
  // Featured guides for the hero section
  const featuredGuides = [
    {
      id: "featured-1",
      title: "The Complete Guide to Smart Contract Security",
      description: "A comprehensive overview of smart contract security principles, common vulnerabilities, and best practices for developers at all levels.",
      image: "https://i.imgur.com/xM0nBw6.png",
      readingTime: "30 min read",
      difficulty: "All Levels"
    },
    {
      id: "featured-2",
      title: "Security Audit Preparation: Step-by-Step",
      description: "Everything you need to know to prepare your project for a successful security audit, from documentation to testing.",
      image: "https://i.imgur.com/xM0nBw6.png", 
      readingTime: "25 min read",
      difficulty: "All Levels"
    }
  ];
  
  // Get guides based on active category
  const getFilteredGuides = () => {
    if (activeCategory === "all") {
      return [
        ...guides.beginner,
        ...guides.intermediate,
        ...guides.advanced
      ];
    }
    return guides[activeCategory];
  };

  return (
    <>
      <Helmet>
        <title>Security Guides | Hawkly</title>
        <meta name="description" content="Comprehensive Web3 security guides for blockchain developers, from beginner concepts to advanced protection techniques." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Featured Guides */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Security Guides</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Comprehensive resources to help you build secure blockchain applications
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredGuides.map((guide) => (
                <Card key={guide.id} className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="aspect-video relative bg-muted/40">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="h-20 w-20 text-primary/20" />
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Featured Guide</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">{guide.difficulty}</span>
                        <span className="text-xs text-muted-foreground">|</span>
                        <span className="text-xs text-muted-foreground">{guide.readingTime}</span>
                      </div>
                    </div>
                    <CardTitle className="text-2xl">{guide.title}</CardTitle>
                    <CardDescription>{guide.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">
                      Read Full Guide
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Guide Categories and Listings */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-8">Browse by Difficulty Level</h2>
            
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="grid grid-cols-4 gap-2">
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {getFilteredGuides().map((guide) => (
                <Card key={guide.id} className="hover:shadow-md transition-all">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center">
                        <div className="mr-2 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          {guide.icon}
                        </div>
                        <span className="text-xs font-medium text-muted-foreground">
                          {guide.difficulty}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">{guide.readingTime}</span>
                    </div>
                    <CardTitle className="text-lg">{guide.title}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {guide.description}
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      Read Guide
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Need Personalized Security Guidance?</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Our security experts can provide custom guidance tailored to your project's specific needs and challenges.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/request-audit">Request Security Consultation</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/marketplace">Find Security Experts</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Guides;
