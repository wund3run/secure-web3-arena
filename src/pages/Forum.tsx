
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MessageCircle, TrendingUp, Clock, Pin, Users } from 'lucide-react';

export default function Forum() {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { name: "Smart Contract Security", count: 1247, color: "bg-blue-500" },
    { name: "DeFi Protocols", count: 892, color: "bg-green-500" },
    { name: "NFT Security", count: 634, color: "bg-purple-500" },
    { name: "Cross-Chain Bridges", count: 428, color: "bg-orange-500" },
    { name: "General Discussion", count: 2156, color: "bg-gray-500" }
  ];

  const featuredThreads = [
    {
      id: 1,
      title: "Critical Vulnerability Found in Popular DeFi Protocol",
      author: "SecurityExpert_Alice",
      category: "DeFi Protocols",
      replies: 45,
      views: 1289,
      lastActivity: "2 hours ago",
      isPinned: true,
      isHot: true
    },
    {
      id: 2,
      title: "Best Practices for Cross-Chain Security Audits in 2025",
      author: "AuditPro_Bob",
      category: "Cross-Chain Bridges",
      replies: 32,
      views: 967,
      lastActivity: "4 hours ago",
      isPinned: true,
      isHot: false
    }
  ];

  const recentThreads = [
    {
      id: 3,
      title: "Gas Optimization vs Security Trade-offs",
      author: "DevSecOps_Charlie",
      category: "Smart Contract Security",
      replies: 18,
      views: 423,
      lastActivity: "1 hour ago",
      isHot: true
    },
    {
      id: 4,
      title: "New Attack Vector: Sandwich Attacks on AMM Protocols",
      author: "ResearcherDave",
      category: "DeFi Protocols",
      replies: 27,
      views: 672,
      lastActivity: "3 hours ago",
      isHot: true
    },
    {
      id: 5,
      title: "NFT Metadata Security Considerations",
      author: "NFTAuditor_Eve",
      category: "NFT Security",
      replies: 12,
      views: 298,
      lastActivity: "6 hours ago",
      isHot: false
    },
    {
      id: 6,
      title: "Tools and Frameworks for Automated Security Testing",
      author: "ToolMaster_Frank",
      category: "General Discussion",
      replies: 35,
      views: 834,
      lastActivity: "8 hours ago",
      isHot: false
    }
  ];

  return (
    <>
      <Helmet>
        <title>Security Forum | Hawkly</title>
        <meta name="description" content="Join discussions with Web3 security experts. Share knowledge, ask questions, and stay updated on the latest security trends." />
      </Helmet>

      <StandardLayout 
        title="Security Forum" 
        description="Connect and discuss with the Web3 security community"
      >
        <div className="container py-12">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Security Discussions</h1>
              <p className="text-muted-foreground">
                Join conversations with 2,400+ security experts worldwide
              </p>
            </div>
            <Button className="mt-4 md:mt-0">
              <MessageCircle className="mr-2 h-4 w-4" />
              New Discussion
            </Button>
          </div>

          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Categories</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {categories.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Total Discussions</span>
                    <span className="font-semibold">5,357</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Members</span>
                    <span className="font-semibold">2,401</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Today's Posts</span>
                    <span className="font-semibold">87</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="recent" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="pinned">Pinned</TabsTrigger>
                </TabsList>

                <TabsContent value="recent" className="space-y-4">
                  {/* Featured Threads */}
                  {featuredThreads.map((thread) => (
                    <Card key={thread.id} className="border-l-4 border-l-primary">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {thread.isPinned && (
                                <Pin className="h-4 w-4 text-primary" />
                              )}
                              {thread.isHot && (
                                <Badge variant="destructive" className="text-xs">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  Hot
                                </Badge>
                              )}
                              <Badge variant="outline">{thread.category}</Badge>
                            </div>
                            <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                              {thread.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>by {thread.author}</span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {thread.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {thread.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {thread.lastActivity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Recent Threads */}
                  {recentThreads.map((thread) => (
                    <Card key={thread.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {thread.isHot && (
                                <Badge variant="secondary" className="text-xs">
                                  <TrendingUp className="mr-1 h-3 w-3" />
                                  Trending
                                </Badge>
                              )}
                              <Badge variant="outline">{thread.category}</Badge>
                            </div>
                            <h3 className="font-semibold mb-2 hover:text-primary cursor-pointer">
                              {thread.title}
                            </h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>by {thread.author}</span>
                              <span className="flex items-center gap-1">
                                <MessageCircle className="h-4 w-4" />
                                {thread.replies}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {thread.views}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {thread.lastActivity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="trending">
                  <div className="text-center py-12">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Trending Discussions</h3>
                    <p className="text-muted-foreground">
                      Most active discussions from the past 24 hours
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="pinned">
                  <div className="space-y-4">
                    {featuredThreads.filter(thread => thread.isPinned).map((thread) => (
                      <Card key={thread.id} className="border-l-4 border-l-primary">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <Pin className="h-4 w-4 text-primary" />
                                <Badge variant="outline">{thread.category}</Badge>
                              </div>
                              <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                                {thread.title}
                              </h3>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <span>by {thread.author}</span>
                                <span className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  {thread.replies}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {thread.views}
                                </span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
