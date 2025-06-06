
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Star, Globe } from 'lucide-react';

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Web3 Security Summit 2025",
      description: "The premier conference for blockchain security professionals featuring keynotes from industry leaders.",
      date: "April 15-16, 2025",
      time: "9:00 AM - 6:00 PM UTC",
      location: "Virtual & San Francisco",
      type: "Conference",
      attendees: 2500,
      price: "Free",
      featured: true
    },
    {
      id: 2,
      title: "Smart Contract Auditing Workshop",
      description: "Hands-on workshop covering advanced smart contract auditing techniques and tools.",
      date: "March 22, 2025",
      time: "2:00 PM - 5:00 PM UTC",
      location: "Online",
      type: "Workshop",
      attendees: 150,
      price: "$99",
      featured: false
    },
    {
      id: 3,
      title: "DeFi Security Best Practices Webinar",
      description: "Learn about the latest DeFi security threats and how to protect your protocols.",
      date: "March 25, 2025",
      time: "1:00 PM - 2:30 PM UTC",
      location: "Online",
      type: "Webinar",
      attendees: 500,
      price: "Free",
      featured: false
    },
    {
      id: 4,
      title: "Cross-Chain Bridge Security Masterclass",
      description: "Deep dive into cross-chain bridge architecture and security considerations.",
      date: "March 28, 2025",
      time: "10:00 AM - 4:00 PM UTC",
      location: "Online",
      type: "Masterclass",
      attendees: 100,
      price: "$199",
      featured: false
    }
  ];

  const pastEvents = [
    {
      title: "Blockchain Security Fundamentals",
      date: "February 28, 2025",
      attendees: 892,
      rating: 4.8
    },
    {
      title: "NFT Security Workshop",
      date: "February 20, 2025",
      attendees: 456,
      rating: 4.7
    },
    {
      title: "Web3 Threat Intelligence Summit",
      date: "February 15, 2025",
      attendees: 1234,
      rating: 4.9
    }
  ];

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Conference": return "bg-blue-500";
      case "Workshop": return "bg-green-500";
      case "Webinar": return "bg-purple-500";
      case "Masterclass": return "bg-orange-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <>
      <Helmet>
        <title>Security Events | Hawkly</title>
        <meta name="description" content="Join Web3 security events, workshops, and conferences. Stay updated with the latest trends and network with security professionals." />
      </Helmet>

      <StandardLayout 
        title="Security Events" 
        description="Join live events, workshops, and conferences focused on Web3 security"
      >
        <div className="container py-12">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">March 2025 Events</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Web3 Security Events
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Join our community events to learn from industry experts, share knowledge, 
              and network with security professionals from around the world.
            </p>
            <Button size="lg">
              <Calendar className="mr-2 h-5 w-5" />
              View Calendar
            </Button>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className={`hover:shadow-lg transition-shadow ${event.featured ? 'border-primary' : ''}`}>
                  {event.featured && (
                    <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                      Featured Event
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={getEventTypeColor(event.type)}>
                        {event.type}
                      </Badge>
                      <Badge variant="outline">{event.price}</Badge>
                    </div>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                    <CardDescription>{event.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span>{event.attendees} attendees</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Register Now</Button>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Event Types */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-8">Event Types</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <Globe className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Conferences</h3>
                  <p className="text-sm text-muted-foreground">
                    Large-scale events with keynotes and networking
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Users className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Workshops</h3>
                  <p className="text-sm text-muted-foreground">
                    Hands-on learning with practical exercises
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Calendar className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Webinars</h3>
                  <p className="text-sm text-muted-foreground">
                    Online presentations and Q&A sessions
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="p-6">
                  <Star className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">Masterclasses</h3>
                  <p className="text-sm text-muted-foreground">
                    In-depth training from industry experts
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Past Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastEvents.map((event, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>{event.attendees} attendees</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{event.rating}/5.0 rating</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="mt-4">
                      View Recording
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-muted-foreground mb-6">
              Get notified about upcoming events and exclusive invitations to private sessions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button>Subscribe to Updates</Button>
              <Button variant="outline">Join Community</Button>
            </div>
          </div>
        </div>
      </StandardLayout>
    </>
  );
}
