
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, TrendingUp } from 'lucide-react';

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {[
              {
                title: "Best practices for smart contract testing?",
                author: "alice_dev",
                replies: 12,
                views: 234,
                category: "Smart Contracts",
                lastActivity: "2 hours ago"
              },
              {
                title: "DeFi protocol security considerations",
                author: "security_expert",
                replies: 8,
                views: 156,
                category: "DeFi",
                lastActivity: "4 hours ago"
              },
              {
                title: "How to handle private key management?",
                author: "crypto_newbie",
                replies: 15,
                views: 289,
                category: "Security",
                lastActivity: "6 hours ago"
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
                    "Audit Methodologies"
                  ].map((topic, index) => (
                    <div key={index} className="flex items-center justify-between">
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
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default ForumPage;
