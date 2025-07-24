import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  MessageSquare, 
  Trophy, 
  Calendar, 
  BookOpen, 
  Zap, 
  TrendingUp,
  Star,
  ArrowRight,
  Target,
  Globe,
  Shield,
  Code,
  Award,
  Lightbulb
} from 'lucide-react';

const Community = () => {
  const communityFeatures = [
    {
      title: "Security Forum",
      description: "Discuss Web3 security topics with experts and peers",
      icon: MessageSquare,
      href: "/community/forum",
      stats: "15,000+ members",
      badge: "Active",
      color: "bg-blue-500"
    },
    {
      title: "Events & Workshops",
      description: "Join live events, workshops, and security conferences",
      icon: Calendar,
      href: "/community/events",
      stats: "50+ events monthly",
      badge: "Live",
      color: "bg-green-500"
    },
    {
      title: "Security Challenges",
      description: "Test your skills with real-world security challenges",
      icon: Target,
      href: "/community/challenges",
      stats: "100+ challenges",
      badge: "Gamified",
      color: "bg-purple-500"
    },
    {
      title: "Leaderboard",
      description: "Track your progress and compete with the community",
      icon: Trophy,
      href: "/community/leaderboard",
      stats: "Global rankings",
      badge: "Competitive",
      color: "bg-yellow-500"
    },
    {
      title: "Research Papers",
      description: "Access cutting-edge security research and publications",
      icon: BookOpen,
      href: "/community/research",
      stats: "500+ papers",
      badge: "Academic",
      color: "bg-red-500"
    },
    {
      title: "Expert Network",
      description: "Connect with top security professionals worldwide",
      icon: Globe,
      href: "/community/experts",
      stats: "1,000+ experts",
      badge: "Professional",
      color: "bg-cyan-500"
    }
  ];

  const featuredDiscussions = [
    {
      title: "AI-Enhanced Smart Contract Analysis: The Future of Security Audits",
      author: "Dr. Sarah Chen",
      replies: 127,
      views: "8.5K",
      category: "AI Security",
      time: "2 hours ago",
      trending: true
    },
    {
      title: "Cross-Chain Bridge Security: Lessons from Recent Exploits",
      author: "Marcus Rodriguez",
      replies: 89,
      views: "12.3K",
      category: "DeFi Security",
      time: "5 hours ago",
      trending: true
    },
    {
      title: "Zero-Knowledge Proof Vulnerabilities in 2025",
      author: "Alex Kim",
      replies: 156,
      views: "15.7K",
      category: "ZK Security",
      time: "1 day ago",
      trending: false
    }
  ];

  const upcomingEvents = [
    {
      title: "Web3 Security Summit 2025",
      date: "June 15-17, 2025",
      type: "Conference",
      location: "Virtual & San Francisco",
      attendees: "2,500+"
    },
    {
      title: "Smart Contract Audit Workshop",
      date: "June 20, 2025",
      type: "Workshop",
      location: "Online",
      attendees: "500+"
    },
    {
      title: "DeFi Security Masterclass",
      date: "June 25, 2025",
      type: "Masterclass",
      location: "Online",
      attendees: "200+"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "25,000+", icon: Users },
    { label: "Daily Discussions", value: "500+", icon: MessageSquare },
    { label: "Security Experts", value: "1,000+", icon: Shield },
    { label: "Research Papers", value: "500+", icon: BookOpen }
  ];

  return (
    <>
      <Helmet>
        <title>Community - Join the Web3 Security Community | Hawkly</title>
        <meta name="description" content="Join the largest Web3 security community. Connect with experts, participate in discussions, attend events, and advance your security knowledge." />
        <meta name="keywords" content="web3 security community, blockchain security forum, security experts, defi security, smart contract security" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <Badge variant="outline" className="mb-4">
              25,000+ Active Members
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent mb-6">
              Web3 Security Community
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join the world's largest community of Web3 security professionals. 
              Share knowledge, learn from experts, and shape the future of blockchain security.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Join Community
                  <Users className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/community/forum">
                  Browse Discussions
                  <MessageSquare className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Community Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              {communityStats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Features */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Community Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore all the ways to connect, learn, and grow within our community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communityFeatures.map((feature, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`p-2 rounded-lg ${feature.color}/10`}>
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <Badge variant="outline">{feature.badge}</Badge>
                    </div>
                    <CardTitle className="group-hover:text-primary transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{feature.stats}</span>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={feature.href}>
                          Explore <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Discussions */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Trending Discussions</h2>
                <p className="text-muted-foreground">Join the most active conversations in Web3 security</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/community/forum">
                  View All <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              {featuredDiscussions.map((discussion, index) => (
                <Card key={index} className="hover:shadow-md transition-all duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{discussion.category}</Badge>
                          {discussion.trending && (
                            <Badge variant="default" className="bg-orange-500">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              Trending
                            </Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-2 hover:text-primary cursor-pointer transition-colors">
                          {discussion.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>by {discussion.author}</span>
                          <span>{discussion.replies} replies</span>
                          <span>{discussion.views} views</span>
                          <span>{discussion.time}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Events */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Upcoming Events</h2>
                <p className="text-muted-foreground">Don't miss these exciting community events</p>
              </div>
              <Button variant="outline" asChild>
                <Link to="/community/events">
                  View All Events <Calendar className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <Badge variant="outline" className="w-fit">{event.type}</Badge>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>{event.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees} expected</span>
                      </div>
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      Register Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="bg-gradient-to-r from-primary/10 to-blue-600/10 border-primary/20">
              <CardContent className="pt-8">
                <h2 className="text-3xl font-bold mb-4">Ready to Join the Community?</h2>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Connect with like-minded security professionals, share your expertise, 
                  and stay ahead of the latest Web3 security trends.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/auth">
                      Create Account
                      <Users className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link to="/community/forum">
                      Start Exploring
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default Community;
