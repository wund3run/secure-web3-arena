
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { SearchIcon, Video, Play, Clock, Users, ChevronRight, PlayCircle, BookOpen } from "lucide-react";

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Categories for the tutorials
  const categories = [
    { id: "all", name: "All Tutorials" },
    { id: "platform", name: "Platform Tutorials" },
    { id: "security", name: "Security Tutorials" },
    { id: "development", name: "Development Tutorials" }
  ];
  
  // Tutorial data organized by category
  const tutorials = {
    platform: [
      {
        id: "tut-1",
        title: "Getting Started with Hawkly",
        description: "Learn how to navigate the platform and access key features.",
        duration: "5:32",
        views: "1.2k",
        thumbnail: "",
        featured: false,
        category: "Platform"
      },
      {
        id: "tut-2",
        title: "Requesting Your First Audit",
        description: "Step-by-step guide to submitting your first security audit request.",
        duration: "8:15",
        views: "950",
        thumbnail: "",
        featured: true,
        category: "Platform"
      },
      {
        id: "tut-3",
        title: "Using the Escrow System",
        description: "How to use Hawkly's secure payment system for your audit transactions.",
        duration: "6:44",
        views: "780",
        thumbnail: "",
        featured: false,
        category: "Platform"
      }
    ],
    security: [
      {
        id: "tut-4",
        title: "Identifying Reentrancy Vulnerabilities",
        description: "Learn how to spot and fix reentrancy vulnerabilities in your smart contracts.",
        duration: "12:20",
        views: "1.5k",
        thumbnail: "",
        featured: true,
        category: "Security"
      },
      {
        id: "tut-5",
        title: "Access Control Best Practices",
        description: "Implement robust access control mechanisms in your smart contracts.",
        duration: "9:18",
        views: "1.1k",
        thumbnail: "",
        featured: false,
        category: "Security"
      },
      {
        id: "tut-6",
        title: "Secure Oracle Implementation",
        description: "Best practices for implementing and using oracles securely in your DApps.",
        duration: "15:42",
        views: "950",
        thumbnail: "",
        featured: false,
        category: "Security"
      }
    ],
    development: [
      {
        id: "tut-7",
        title: "Writing Secure Solidity Code",
        description: "Learn secure coding patterns and best practices for Solidity development.",
        duration: "18:35",
        views: "2.2k",
        thumbnail: "",
        featured: true,
        category: "Development"
      },
      {
        id: "tut-8",
        title: "Testing Smart Contracts Thoroughly",
        description: "Comprehensive testing strategies to ensure your contracts are secure.",
        duration: "14:27",
        views: "1.3k",
        thumbnail: "",
        featured: false,
        category: "Development"
      },
      {
        id: "tut-9",
        title: "Implementing EIP Standards Securely",
        description: "How to implement various Ethereum Improvement Proposals with security in mind.",
        duration: "16:53",
        views: "980",
        thumbnail: "",
        featured: false,
        category: "Development"
      }
    ]
  };
  
  // Featured tutorials for the hero section
  const featuredTutorials = Object.values(tutorials)
    .flat()
    .filter(tutorial => tutorial.featured);
  
  // Get tutorials based on active category and search query
  const getFilteredTutorials = () => {
    let filteredList = [];
    
    if (activeCategory === "all") {
      filteredList = Object.values(tutorials).flat();
    } else {
      filteredList = tutorials[activeCategory] || [];
    }
    
    // Filter by search query if one exists
    if (searchQuery) {
      return filteredList.filter(tutorial => 
        tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tutorial.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filteredList;
  };

  return (
    <>
      <Helmet>
        <title>Video Tutorials | Hawkly</title>
        <meta name="description" content="Watch step-by-step video tutorials on Web3 security, smart contract development, and using the Hawkly platform." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section with Featured Tutorials */}
        <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Video Tutorials</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Step-by-step video guides to help you navigate Web3 security
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto relative mb-12">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tutorials..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="overflow-hidden border-primary/20 hover:border-primary/50 transition-colors">
                  <div className="aspect-video relative bg-muted/40 group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <Play className="h-8 w-8 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center gap-2 text-white">
                        <Clock className="h-4 w-4" />
                        <span className="text-xs">{tutorial.duration}</span>
                        <Users className="h-4 w-4 ml-2" />
                        <span className="text-xs">{tutorial.views} views</span>
                      </div>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">Featured</span>
                      <span className="text-xs text-muted-foreground">{tutorial.category}</span>
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">
                      Watch Now
                      <PlayCircle className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        
        {/* Tutorial Categories and Listings */}
        <section className="py-16 bg-background">
          <div className="container px-4 mx-auto">
            <h2 className="text-2xl font-bold mb-8">Browse Tutorials</h2>
            
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2">
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
            
            {getFilteredTutorials().length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {getFilteredTutorials().map((tutorial) => (
                  <Card key={tutorial.id} className="hover:shadow-md transition-all">
                    <div className="aspect-video relative bg-muted/40 group cursor-pointer">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Video className="h-10 w-10 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-white text-xs">
                        {tutorial.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-medium text-muted-foreground">
                          {tutorial.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {tutorial.views} views
                        </span>
                      </div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {tutorial.description}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="ml-auto">
                        Watch Tutorial
                        <PlayCircle className="ml-1 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">No tutorials found</h3>
                <p className="text-muted-foreground mb-6">
                  No tutorials match your current search criteria.
                </p>
                <Button onClick={() => {setSearchQuery(''); setActiveCategory('all');}}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>
        
        {/* Subscription Section */}
        <section className="py-12 bg-muted/30">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated with New Tutorials</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Subscribe to our channel to receive notifications when new security tutorials are released.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <a href="/blog">
                  Subscribe to Updates
                  <ChevronRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/contact">Request a Tutorial Topic</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Tutorials;
