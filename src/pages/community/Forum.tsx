
import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MessageSquare, Users, TrendingUp, Star, Search, Plus, Eye, ThumbsUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const forumStats = [
  { label: "Active Members", value: "2,847", icon: Users },
  { label: "Total Discussions", value: "1,234", icon: MessageSquare },
  { label: "Expert Contributors", value: "127", icon: Star },
  { label: "Weekly Posts", value: "89", icon: TrendingUp }
];

const topicCategories = [
  { name: "General Discussion", count: 234, color: "bg-blue-100 text-blue-600" },
  { name: "Smart Contract Security", count: 189, color: "bg-red-100 text-red-600" },
  { name: "Audit Reviews", count: 156, color: "bg-green-100 text-green-600" },
  { name: "Tools & Resources", count: 98, color: "bg-purple-100 text-purple-600" },
  { name: "Job Board", count: 67, color: "bg-orange-100 text-orange-600" },
  { name: "Beginner Help", count: 145, color: "bg-teal-100 text-teal-600" }
];

const recentDiscussions = [
  {
    title: "Best practices for auditing DeFi protocols?",
    author: "SecurityExpert",
    category: "Smart Contract Security",
    replies: 23,
    views: 1240,
    lastActivity: "2 hours ago",
    isHot: true
  },
  {
    title: "New vulnerability found in popular lending protocol",
    author: "AuditPro",
    category: "Audit Reviews", 
    replies: 45,
    views: 2890,
    lastActivity: "4 hours ago",
    isHot: true
  },
  {
    title: "Recommendations for automated security testing tools?",
    author: "DevSecOps",
    category: "Tools & Resources",
    replies: 12,
    views: 567,
    lastActivity: "6 hours ago",
    isHot: false
  },
  {
    title: "How to get started with smart contract auditing?",
    author: "Newbie2023",
    category: "Beginner Help",
    replies: 18,
    views: 834,
    lastActivity: "8 hours ago",
    isHot: false
  },
  {
    title: "Looking for senior Solidity auditor - Remote",
    author: "TechRecruiter",
    category: "Job Board",
    replies: 7,
    views: 423,
    lastActivity: "1 day ago",
    isHot: false
  }
];

const trendingTopics = [
  { title: "Zero-knowledge proof security", posts: 67 },
  { title: "Cross-chain bridge vulnerabilities", posts: 54 },
  { title: "Gas optimization techniques", posts: 43 },
  { title: "MEV protection strategies", posts: 38 },
  { title: "Upgradeable contract patterns", posts: 32 }
];

export default function Forum() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Community Forum</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Connect with Web3 security experts, share knowledge, and stay updated on the latest threats
          </p>
          <Button asChild>
            <Link to="/auth">
              <Plus className="h-4 w-4 mr-2" />
              Start Discussion
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {forumStats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search discussions..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline">Filter</Button>
            </div>

            <Tabs defaultValue="recent" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="recent">Recent</TabsTrigger>
                <TabsTrigger value="trending">Trending</TabsTrigger>
                <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
              </TabsList>
              
              <TabsContent value="recent" className="space-y-4">
                {recentDiscussions.map((discussion, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {discussion.isHot && (
                              <Badge variant="destructive" className="text-xs">Hot</Badge>
                            )}
                            <Badge variant="outline" className="text-xs">{discussion.category}</Badge>
                          </div>
                          <h3 className="font-semibold text-lg mb-2 hover:text-primary cursor-pointer">
                            {discussion.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>by {discussion.author}</span>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {discussion.views} views
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {discussion.lastActivity}
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
              
              <TabsContent value="trending">
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Trending Discussions</h3>
                    <p className="text-muted-foreground">
                      Discover the hottest topics in Web3 security
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="unanswered">
                <Card>
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">Help the Community</h3>
                    <p className="text-muted-foreground">
                      Answer unanswered questions and share your expertise
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {topicCategories.map((category) => (
                  <div key={category.name} className="flex items-center justify-between p-2 rounded hover:bg-muted cursor-pointer">
                    <span className="text-sm">{category.name}</span>
                    <Badge className={`${category.color} text-xs`}>{category.count}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Trending Topics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {trendingTopics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm hover:text-primary cursor-pointer">{topic.title}</span>
                    <Badge variant="outline" className="text-xs">{topic.posts}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary text-primary-foreground">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Become an Expert</h4>
                <p className="text-sm mb-4 opacity-90">
                  Share your security expertise and help the community
                </p>
                <Button variant="secondary" asChild className="w-full">
                  <Link to="/service-provider-onboarding">Join as Expert</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
