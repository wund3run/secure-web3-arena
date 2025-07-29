
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare, Users, TrendingUp, Search, Plus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ForumPage = () => {
  return (
    <StandardLayout
      title="Community Forum | Hawkly"
      description="Connect with Web3 security experts and developers"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Community Forum
          </h1>
          <p className="text-xl text-muted-foreground">
            Connect, learn, and share with the Web3 security community
          </p>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search discussions..." className="pl-10" />
            </div>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>

        <Tabs defaultValue="recent" className="space-y-6">
          <TabsList>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <TabsContent value="recent" className="space-y-4">
                {[
                  {
                    title: "Best practices for smart contract testing?",
                    author: "alice_dev",
                    replies: 12,
                    views: 234,
                    category: "Smart Contracts",
                    lastActivity: "2 hours ago",
                    tags: ["testing", "solidity", "best-practices"]
                  },
                  {
                    title: "DeFi protocol security considerations",
                    author: "security_expert",
                    replies: 8,
                    views: 156,
                    category: "DeFi",
                    lastActivity: "4 hours ago",
                    tags: ["defi", "security", "protocols"]
                  },
                  {
                    title: "How to handle private key management?",
                    author: "crypto_newbie",
                    replies: 15,
                    views: 289,
                    category: "Security",
                    lastActivity: "6 hours ago",
                    tags: ["keys", "security", "wallets"]
                  },
                  {
                    title: "New vulnerability discovered in OpenZeppelin",
                    author: "researcher_mike",
                    replies: 23,
                    views: 445,
                    category: "Vulnerabilities",
                    lastActivity: "1 day ago",
                    tags: ["vulnerability", "openzeppelin", "critical"]
                  }
                ].map((topic, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-lg hover:text-hawkly-primary transition-colors">
                          {topic.title}
                        </h3>
                        <Badge variant="secondary">{topic.category}</Badge>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-3">
                        {topic.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-4">
                          <span>by {topic.author}</span>
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-4 w-4" />
                            {topic.replies} replies
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {topic.views} views
                          </div>
                        </div>
                        <span>{topic.lastActivity}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="trending" className="space-y-4">
                <Card>
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="font-semibold mb-2">Trending Discussions</h3>
                    <p className="text-muted-foreground">
                      The hottest topics in Web3 security will appear here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="categories" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: "Smart Contracts", count: 156, description: "Solidity, Vyper, and contract security" },
                    { name: "DeFi", count: 89, description: "Decentralized finance protocols" },
                    { name: "NFTs", count: 67, description: "Non-fungible token security" },
                    { name: "Governance", count: 45, description: "DAO and governance security" },
                    { name: "Infrastructure", count: 78, description: "Blockchain infrastructure security" },
                    { name: "Auditing", count: 234, description: "Security audit discussions" }
                  ].map((category) => (
                    <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{category.name}</h3>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{category.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Topics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Smart Contract Security",
                      "DeFi Vulnerabilities", 
                      "NFT Best Practices",
                      "Audit Methodologies",
                      "Zero-Knowledge Proofs"
                    ].map((topic, index) => (
                      <div key={index} className="flex items-center justify-between hover:bg-muted/50 p-2 rounded cursor-pointer">
                        <span className="text-sm">{topic}</span>
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Community Stats</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Total Members</span>
                      <span className="font-medium">12,543</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Topics</span>
                      <span className="font-medium">2,891</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Posts</span>
                      <span className="font-medium">18,436</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Online Now</span>
                      <span className="font-medium text-green-600">234</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expert Contributors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { name: "Dr. Sarah Chen", reputation: 4.9, posts: 156 },
                      { name: "Marcus Rodriguez", reputation: 4.8, posts: 134 },
                      { name: "Alex Thompson", reputation: 4.7, posts: 112 }
                    ].map((expert, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{expert.name}</p>
                          <p className="text-xs text-muted-foreground">{expert.posts} posts</p>
                        </div>
                        <Badge variant="outline">{expert.reputation}★</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Tabs>
      </div>
    </StandardLayout>
  );
};

export default ForumPage;
