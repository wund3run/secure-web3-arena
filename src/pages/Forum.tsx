
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, ChevronRight, Search, Users, Calendar, PlusCircle, Eye, MessageCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { SecurityDiscussionCard } from "@/components/security/security-discussion-card";
import { securityDiscussions } from "@/data/security-discussions";

export default function Forum() {
  return (
    <>
      <Helmet>
        <title>Community Forum | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Join the Hawkly Web3 security community forum to discuss security best practices, vulnerabilities, and emerging threats."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Community Forum</h1>
              <p className="text-lg text-muted-foreground">
                Join discussions with the Web3 security community
              </p>
            </div>
            <div className="flex gap-3">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <PlusCircle className="h-4 w-4 mr-1.5" /> New Discussion
              </Button>
              <Button variant="outline">Popular Topics</Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border/40 rounded-lg p-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search discussions..." className="pl-10" />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1.5" /> Latest
                </Button>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-1.5" /> Top
                </Button>
                <Button variant="outline" size="sm">
                  <Users className="h-4 w-4 mr-1.5" /> Following
                </Button>
              </div>
            </div>
          </div>

          {/* Forum Categories and Discussions */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border/40 rounded-lg overflow-hidden sticky top-4">
                <div className="bg-muted p-4 border-b border-border/40">
                  <h3 className="font-medium flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" /> Categories
                  </h3>
                </div>
                <div className="p-2">
                  <Button variant="ghost" className="w-full justify-start text-primary font-medium mb-1">
                    All Discussions
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Smart Contracts</span> <Badge variant="secondary" className="ml-2">42</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>DeFi Security</span> <Badge variant="secondary" className="ml-2">37</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Layer 2</span> <Badge variant="secondary" className="ml-2">19</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Zero Knowledge</span> <Badge variant="secondary" className="ml-2">31</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Exploits & Post-mortems</span> <Badge variant="secondary" className="ml-2">56</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Security Tools</span> <Badge variant="secondary" className="ml-2">28</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm mb-1 hover:text-primary">
                    <span>Blockchain Security</span> <Badge variant="secondary" className="ml-2">45</Badge>
                  </Button>
                  <Button variant="ghost" className="w-full justify-between text-sm hover:text-primary">
                    <span>NFT Security</span> <Badge variant="secondary" className="ml-2">22</Badge>
                  </Button>
                </div>
                <div className="bg-muted p-4 border-t border-b border-border/40 mt-2">
                  <h3 className="font-medium flex items-center">
                    <Users className="h-4 w-4 mr-2" /> Groups
                  </h3>
                </div>
                <div className="p-4 text-sm">
                  <p className="text-muted-foreground mb-3">Join specialized security groups to collaborate with professionals.</p>
                  <Button size="sm" variant="outline" className="w-full">
                    Browse Groups <ChevronRight className="ml-2 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="discussions">
                <TabsList>
                  <TabsTrigger value="discussions" className="flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    <span>Discussions</span>
                  </TabsTrigger>
                  <TabsTrigger value="popular" className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>Popular</span>
                  </TabsTrigger>
                  <TabsTrigger value="latest" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Latest</span>
                  </TabsTrigger>
                  <TabsTrigger value="unanswered" className="flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    <span>Unanswered</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="discussions" className="mt-6">
                  <div className="grid grid-cols-1 gap-4">
                    {securityDiscussions.map((discussion) => (
                      <SecurityDiscussionCard key={discussion.id} discussion={discussion} />
                    ))}
                    
                    {/* Additional Discussions */}
                    {[
                      {
                        id: 7,
                        title: "Implementing secure randomness in NFT mint functions",
                        category: "nft-security",
                        categoryLabel: "NFT Security",
                        author: {
                          name: "James Wilson",
                          avatar: "https://i.pravatar.cc/150?img=7"
                        },
                        date: "3 days ago",
                        preview: "I'm working on an NFT collection with random traits. What's the most secure way to implement randomness that can't be gamed by miners?",
                        replies: 24,
                        points: 58,
                        href: "/community"
                      },
                      {
                        id: 8,
                        title: "Security considerations for ERC-6551 implementation",
                        category: "nft-security",
                        categoryLabel: "NFT Security",
                        author: {
                          name: "Aisha Johnson",
                          avatar: "https://i.pravatar.cc/150?img=8"
                        },
                        date: "1 week ago",
                        preview: "Implementing the Token Bound Account standard (ERC-6551) and wondering about security considerations around NFT-owned accounts.",
                        replies: 16,
                        points: 42,
                        href: "/community"
                      }
                    ].map((discussion) => (
                      <SecurityDiscussionCard key={discussion.id} discussion={discussion} />
                    ))}
                  </div>
                  
                  <div className="mt-8 flex justify-center">
                    <Button variant="outline" size="lg">Load More</Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="popular" className="mt-6">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-4">Popular Discussions</h3>
                      <p className="text-muted-foreground mb-6">
                        The most engaging and helpful discussions from our community.
                      </p>
                      
                      <div className="space-y-4">
                        {securityDiscussions
                          .sort((a, b) => b.points - a.points)
                          .slice(0, 5)
                          .map((discussion) => (
                            <Link to={discussion.href} key={discussion.id} className="block">
                              <div className="flex items-start gap-3 p-3 hover:bg-muted rounded-lg transition-colors">
                                <Badge variant="secondary" className="mt-1.5">{discussion.points}</Badge>
                                <div>
                                  <h4 className="font-medium hover:text-primary">{discussion.title}</h4>
                                  <p className="text-sm text-muted-foreground mt-1">{discussion.author.name} • {discussion.date}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="latest">
                  <p className="text-center p-12 text-muted-foreground">Loading latest discussions...</p>
                </TabsContent>
                
                <TabsContent value="unanswered">
                  <p className="text-center p-12 text-muted-foreground">Loading unanswered discussions...</p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
