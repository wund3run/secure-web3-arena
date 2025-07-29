
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Plus, Pin, Lock, TrendingUp, Users } from 'lucide-react';

export const ForumLayout = () => {
  return (
    <StandardLayout
      title="Community Forum | Hawkly"
      description="Connect with Web3 security experts and share knowledge"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-hawkly-gradient mb-2">
              Community Forum
            </h1>
            <p className="text-lg text-muted-foreground">
              Join discussions about Web3 security, share insights, and learn from experts
            </p>
          </div>
          <Button size="lg">
            <Plus className="h-4 w-4 mr-2" />
            New Topic
          </Button>
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: "Active Members", value: "2,847", icon: Users },
            { label: "Topics", value: "1,256", icon: MessageCircle },
            { label: "This Week", value: "89", icon: TrendingUp }
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="flex items-center space-x-4 p-4">
                <stat.icon className="h-8 w-8 text-primary" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              name: "General Discussion",
              description: "General Web3 security discussions",
              topics: 234,
              posts: 1847,
              color: "#3B82F6",
              icon: MessageCircle,
              lastPost: "2 hours ago"
            },
            {
              name: "Smart Contract Security",
              description: "Discussions about smart contract vulnerabilities and best practices",
              topics: 189,
              posts: 1523,
              color: "#EF4444",
              icon: Lock,
              lastPost: "4 hours ago"
            },
            {
              name: "DeFi Security",
              description: "DeFi protocol security discussions",
              topics: 156,
              posts: 967,
              color: "#10B981",
              icon: TrendingUp,
              lastPost: "1 hour ago"
            },
            {
              name: "Audit Reports",
              description: "Share and discuss security audit findings",
              topics: 89,
              posts: 445,
              color: "#F59E0B",
              icon: Pin,
              lastPost: "6 hours ago"
            },
            {
              name: "Tools & Resources",
              description: "Security tools, resources, and recommendations",
              topics: 167,
              posts: 823,
              color: "#8B5CF6",
              icon: Users,
              lastPost: "3 hours ago"
            },
            {
              name: "Announcements",
              description: "Platform updates and important announcements",
              topics: 12,
              posts: 89,
              color: "#06B6D4",
              icon: Pin,
              lastPost: "1 day ago"
            }
          ].map((category, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${category.color}20`, color: category.color }}
                  >
                    <category.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4 text-sm text-muted-foreground">
                    <span>{category.topics} topics</span>
                    <span>{category.posts} posts</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {category.lastPost}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
          <Card>
            <CardContent className="p-0">
              {[
                {
                  title: "Critical vulnerability found in popular DeFi protocol",
                  author: "SecurityExpert",
                  category: "DeFi Security",
                  replies: 23,
                  time: "2 hours ago",
                  isPinned: true
                },
                {
                  title: "Best practices for smart contract testing",
                  author: "AuditPro",
                  category: "Smart Contract Security",
                  replies: 15,
                  time: "4 hours ago",
                  isPinned: false
                },
                {
                  title: "New security tool released: ContractGuard v2.0",
                  author: "DevTeam",
                  category: "Tools & Resources",
                  replies: 8,
                  time: "6 hours ago",
                  isPinned: false
                }
              ].map((topic, index) => (
                <div key={index} className="flex items-center space-x-4 p-4 border-b last:border-b-0 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      {topic.isPinned && <Pin className="h-4 w-4 text-primary" />}
                      <h3 className="font-medium">{topic.title}</h3>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>by {topic.author}</span>
                      <Badge variant="secondary" className="text-xs">
                        {topic.category}
                      </Badge>
                      <span>{topic.time}</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium">{topic.replies}</div>
                    <div className="text-xs text-muted-foreground">replies</div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};
