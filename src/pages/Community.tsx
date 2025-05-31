
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, MessageSquare, Calendar, Trophy, Star, ArrowRight, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Community() {
  const communityStats = [
    { label: "Security Experts", value: "500+", icon: Shield },
    { label: "Community Members", value: "12,000+", icon: Users },
    { label: "Monthly Discussions", value: "2,500+", icon: MessageSquare },
    { label: "Events This Year", value: "48", icon: Calendar }
  ];

  const upcomingEvents = [
    {
      title: "Web3 Security Office Hours",
      date: "March 25, 2025",
      type: "Virtual",
      attendees: 150,
      description: "Weekly Q&A session with top security experts"
    },
    {
      title: "DeFi Security Workshop",
      date: "March 28, 2025", 
      type: "Workshop",
      attendees: 75,
      description: "Hands-on workshop covering DeFi security patterns"
    },
    {
      title: "AI-Powered Security Tools Demo",
      date: "April 2, 2025",
      type: "Demo",
      attendees: 200,
      description: "Latest AI tools for automated vulnerability detection"
    }
  ];

  return (
    <StandardLayout 
      title="Security Community" 
      description="Join the largest Web3 security community - Connect, Learn, Grow"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Join 12,000+ Members</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with security professionals, share knowledge, participate in challenges, 
            and stay ahead of the latest Web3 security trends.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {communityStats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6 text-center">
                <stat.icon className="h-8 w-8 text-primary mx-auto mb-3" />
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageSquare className="h-10 w-10 text-primary mb-3" />
              <CardTitle>Discussion Forum</CardTitle>
              <CardDescription>
                Engage in technical discussions, share insights, and get help from security experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Technical Security Discussions</li>
                <li>• Vulnerability Analysis</li>
                <li>• Best Practices Sharing</li>
                <li>• Expert Q&A Sessions</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/forum">
                  Join Discussions <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Trophy className="h-10 w-10 text-primary mb-3" />
              <CardTitle>Security Challenges</CardTitle>
              <CardDescription>
                Test your skills with hands-on security challenges and earn recognition
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Weekly CTF Challenges</li>
                <li>• Smart Contract Puzzles</li>
                <li>• Bug Bounty Practice</li>
                <li>• Leaderboard Rankings</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/challenges">
                  Try Challenges <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <Calendar className="h-10 w-10 text-primary mb-3" />
              <CardTitle>Events & Workshops</CardTitle>
              <CardDescription>
                Attend virtual events, workshops, and conferences with industry experts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-4 text-sm">
                <li>• Weekly Office Hours</li>
                <li>• Expert-led Workshops</li>
                <li>• Conference Presentations</li>
                <li>• Networking Events</li>
              </ul>
              <Button asChild className="w-full">
                <Link to="/events">
                  View Events <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">{event.attendees} attending</span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription>{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{event.date}</span>
                    <Button size="sm">Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Community Leaders */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Community Leaders</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { name: "Dr. Sarah Chen", role: "Lead Security Researcher", audits: 87, rating: 4.9 },
              { name: "Marcus Rodriguez", role: "DeFi Security Expert", audits: 76, rating: 4.8 },
              { name: "Elena Nakamura", role: "Smart Contract Auditor", audits: 65, rating: 4.9 },
              { name: "Ahmed Hassan", role: "Cross-Chain Security", audits: 54, rating: 4.7 }
            ].map((leader, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {leader.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <h3 className="font-semibold mb-1">{leader.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{leader.role}</p>
                  <div className="flex items-center justify-center gap-4 text-xs">
                    <span>{leader.audits} audits</span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {leader.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Join Our Community?</h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with like-minded security professionals, expand your knowledge, 
            and contribute to the future of Web3 security.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">Join Community</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/forum">Browse Discussions</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
