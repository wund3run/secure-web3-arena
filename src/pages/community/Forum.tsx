
import React from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, TrendingUp, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Forum() {
  const forumStats = [
    { label: "Active Members", value: "15,420", icon: Users },
    { label: "Discussions", value: "3,247", icon: MessageSquare },
    { label: "Topics Today", value: "127", icon: TrendingUp },
    { label: "Online Now", value: "234", icon: Clock }
  ];

  const recentTopics = [
    {
      title: "Best practices for upgrading smart contracts?",
      author: "alex_dev",
      replies: 23,
      category: "Development",
      timeAgo: "2 hours ago",
      isHot: true
    },
    {
      title: "Security considerations for cross-chain bridges",
      author: "security_expert",
      replies: 45,
      category: "Security",
      timeAgo: "4 hours ago",
      isHot: true
    },
    {
      title: "Gas optimization techniques for large contracts",
      author: "efficiency_guru",
      replies: 18,
      category: "Optimization",
      timeAgo: "6 hours ago",
      isHot: false
    }
  ];

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MessageSquare className="h-8 w-8 text-primary" />
              <h1 className="text-4xl font-bold">Community Forum</h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with security experts, developers, and project owners. 
              Share knowledge, ask questions, and stay updated on the latest in Web3 security.
            </p>
          </div>

          {/* Forum Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {forumStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index}>
                  <CardContent className="p-6 text-center">
                    <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Categories */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  General Discussion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  General Web3 security topics and community discussions
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>1,247 topics</span>
                  <span>8,392 posts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  Security Research
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Latest security research, vulnerabilities, and findings
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>567 topics</span>
                  <span>3,891 posts</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  Project Showcase
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Share your projects and get feedback from the community
                </p>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>234 topics</span>
                  <span>1,567 posts</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Topics */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6">Recent Discussions</h2>
            <div className="space-y-4">
              {recentTopics.map((topic, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold hover:text-primary cursor-pointer">
                            {topic.title}
                          </h3>
                          {topic.isHot && <Badge variant="destructive">Hot</Badge>}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {topic.author}</span>
                          <Badge variant="outline">{topic.category}</Badge>
                          <span>{topic.replies} replies</span>
                          <span>{topic.timeAgo}</span>
                        </div>
                      </div>
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-muted/50 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Join the Conversation</h2>
            <p className="text-muted-foreground mb-6">
              Connect with thousands of security professionals and Web3 enthusiasts
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/auth">
                  Sign Up to Participate <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/auth">Browse All Topics</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
}
