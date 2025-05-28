
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Users, MessageSquare, Calendar, Trophy, Star, ExternalLink, Github, Twitter, Youtube } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function Community() {
  const communityFeatures = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: "Security Forum",
      description: "Discuss security vulnerabilities, share findings, and collaborate with experts worldwide.",
      link: "/forum",
      members: "12,500+",
      activity: "Daily discussions"
    },
    {
      icon: <Calendar className="h-8 w-8 text-green-500" />,
      title: "Events & Workshops",
      description: "Join virtual workshops, conferences, and security training sessions.",
      link: "/events",
      members: "8,200+",
      activity: "Weekly events"
    },
    {
      icon: <Trophy className="h-8 w-8 text-purple-500" />,
      title: "Security Challenges",
      description: "Test your skills with hands-on security challenges and CTF competitions.",
      link: "/challenges",
      members: "5,800+",
      activity: "Monthly challenges"
    },
    {
      icon: <Star className="h-8 w-8 text-yellow-500" />,
      title: "Leaderboard",
      description: "See top-performing auditors and community contributors.",
      link: "/leaderboard",
      members: "3,400+",
      activity: "Real-time updates"
    }
  ];

  const socialChannels = [
    {
      name: "Discord",
      icon: <MessageSquare className="h-6 w-6" />,
      description: "Real-time chat with the community",
      members: "25,000+",
      url: "https://discord.gg/hawkly",
      color: "bg-indigo-100 text-indigo-800"
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-6 w-6" />,
      description: "Latest updates and security news",
      members: "18,500+",
      url: "https://twitter.com/hawkly",
      color: "bg-blue-100 text-blue-800"
    },
    {
      name: "GitHub",
      icon: <Github className="h-6 w-6" />,
      description: "Open source tools and templates",
      members: "12,200+",
      url: "https://github.com/hawkly",
      color: "bg-gray-100 text-gray-800"
    },
    {
      name: "YouTube",
      icon: <Youtube className="h-6 w-6" />,
      description: "Security tutorials and webinars",
      members: "8,900+",
      url: "https://youtube.com/hawkly",
      color: "bg-red-100 text-red-800"
    }
  ];

  const upcomingEvents = [
    {
      title: "Web3 Security Summit 2025",
      date: "March 15-17, 2025",
      type: "Virtual Conference",
      description: "Three-day conference featuring the latest in Web3 security research and best practices.",
      speakers: "50+ speakers",
      attendees: "2,000+ expected"
    },
    {
      title: "Smart Contract Security Workshop",
      date: "March 8, 2025",
      type: "Workshop",
      description: "Hands-on workshop covering advanced smart contract security techniques.",
      speakers: "Expert auditors",
      attendees: "Limited to 100"
    },
    {
      title: "DeFi Security CTF",
      date: "March 22, 2025",
      type: "Competition",
      description: "Capture-the-flag competition focused on DeFi protocol security.",
      speakers: "Community-driven",
      attendees: "Open to all"
    }
  ];

  const communityStats = [
    { label: "Active Members", value: "45,000+" },
    { label: "Security Experts", value: "1,200+" },
    { label: "Monthly Discussions", value: "8,500+" },
    { label: "Resources Shared", value: "15,000+" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Community | Hawkly</title>
        <meta name="description" content="Join the Hawkly Web3 security community. Connect with experts, participate in events, and stay updated on the latest security trends." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <Users className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Join Our Community</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Web3 Security 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Community</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with thousands of security professionals, developers, and researchers working to make 
            Web3 safer. Share knowledge, learn from experts, and stay ahead of emerging threats.
          </p>
          
          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {communityStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Features */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
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
                <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                  <span>{feature.members} members</span>
                  <span>{feature.activity}</span>
                </div>
                <Link to={feature.link}>
                  <Button className="w-full">Join Discussion</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Social Channels */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Connect With Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialChannels.map((channel, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg mb-3 ${channel.color}`}>
                    {channel.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{channel.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{channel.description}</p>
                  <p className="text-xs text-muted-foreground mb-3">{channel.members} followers</p>
                  <Button size="sm" variant="outline" className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Follow
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Upcoming Events</h2>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{event.type}</Badge>
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                      <p className="text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{event.speakers}</span>
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline">Learn More</Button>
                      <Button>Register</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Start connecting with security experts, participate in discussions, and contribute to making 
            Web3 more secure for everyone.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">Join Discord</Button>
            <Link to="/forum">
              <Button variant="outline" size="lg">Browse Forum</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
