
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Calendar, Trophy, Zap, BookOpen, Shield, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Community() {
  const communityStats = [
    { label: "Active Members", value: "12,500+", icon: <Users className="h-5 w-5" /> },
    { label: "Security Experts", value: "2,400+", icon: <Shield className="h-5 w-5" /> },
    { label: "Monthly Discussions", value: "8,600+", icon: <MessageCircle className="h-5 w-5" /> },
    { label: "Knowledge Articles", value: "1,200+", icon: <BookOpen className="h-5 w-5" /> }
  ];

  const communityFeatures = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-500" />,
      title: "Expert Forums",
      description: "Connect with security professionals, share insights, and get answers to complex Web3 security questions.",
      link: "/forum"
    },
    {
      icon: <Trophy className="h-8 w-8 text-yellow-500" />,
      title: "Security Challenges",
      description: "Test your skills with real-world security scenarios and compete with other experts.",
      link: "/challenges"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Events & Webinars",
      description: "Join live sessions, workshops, and conferences focused on blockchain security.",
      link: "/events"
    },
    {
      icon: <Star className="h-8 w-8 text-purple-500" />,
      title: "Expert Rankings",
      description: "Discover top security auditors and track your progress on our leaderboard.",
      link: "/leaderboard"
    }
  ];

  const recentActivity = [
    {
      type: "Discussion",
      title: "New Reentrancy Attack Vector in DeFi Protocols",
      author: "Alex Chen",
      time: "2 hours ago",
      replies: 23
    },
    {
      type: "Challenge",
      title: "Cross-Chain Bridge Security Assessment",
      author: "Sarah Wilson",
      time: "4 hours ago",
      participants: 156
    },
    {
      type: "Event",
      title: "Web3 Security Summit 2025",
      author: "Hawkly Team",
      time: "1 day ago",
      attendees: 892
    },
    {
      type: "Article",
      title: "Smart Contract Auditing Best Practices",
      author: "Michael Rodriguez",
      time: "2 days ago",
      views: 1247
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community | Hawkly</title>
        <meta name="description" content="Join the largest Web3 security community. Connect with experts, participate in challenges, and stay updated on the latest security trends." />
      </Helmet>

      <StandardLayout 
        title="Web3 Security Community" 
        description="Connect with 12,500+ security professionals and blockchain enthusiasts"
      >
        <div className="container py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Active Community</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Join the Web3 Security Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Connect with leading security experts, share knowledge, and stay ahead of emerging threats 
              in the rapidly evolving Web3 ecosystem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/forum">Browse Discussions</Link>
              </Button>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {communityStats.map((stat, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-2 text-primary">
                    {stat.icon}
                  </div>
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Community Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Community Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {communityFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      {feature.icon}
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" asChild>
                      <Link to={feature.link}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Recent Community Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{activity.type}</Badge>
                          <span className="text-sm text-muted-foreground">{activity.time}</span>
                        </div>
                        <h3 className="font-semibold text-lg mb-1">{activity.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {activity.author}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          {activity.replies && (
                            <span>{activity.replies} replies</span>
                          )}
                          {activity.participants && (
                            <span>{activity.participants} participants</span>
                          )}
                          {activity.attendees && (
                            <span>{activity.attendees} attendees</span>
                          )}
                          {activity.views && (
                            <span>{activity.views} views</span>
                          )}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get access to exclusive content, participate in security challenges, and network with industry leaders.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Create Account
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
