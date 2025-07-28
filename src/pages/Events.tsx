
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  ExternalLink,
  Video,
  Globe,
  Star,
  Bookmark
} from 'lucide-react';

const Events = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const eventCategories = [
    { id: 'all', name: 'All Events' },
    { id: 'workshops', name: 'Workshops' },
    { id: 'webinars', name: 'Webinars' },
    { id: 'conferences', name: 'Conferences' },
    { id: 'hackathons', name: 'Hackathons' }
  ];

  const events = [
    {
      id: 1,
      title: 'Advanced Smart Contract Security Workshop',
      description: 'Deep dive into advanced security patterns and common vulnerabilities in smart contracts.',
      type: 'workshop',
      date: '2024-01-15',
      time: '14:00 UTC',
      duration: '3 hours',
      location: 'Online',
      organizer: 'Hawkly Security Team',
      attendees: 245,
      maxAttendees: 500,
      price: 'Free',
      status: 'upcoming',
      featured: true,
      tags: ['smart-contracts', 'security', 'solidity'],
      image: '/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    },
    {
      id: 2,
      title: 'DeFi Security Conference 2024',
      description: 'Annual conference featuring the latest in DeFi security research and best practices.',
      type: 'conference',
      date: '2024-02-20',
      time: '09:00 UTC',
      duration: '2 days',
      location: 'San Francisco, CA',
      organizer: 'DeFi Security Alliance',
      attendees: 1250,
      maxAttendees: 2000,
      price: '$299',
      status: 'upcoming',
      featured: true,
      tags: ['defi', 'conference', 'security'],
      image: '/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png'
    },
    {
      id: 3,
      title: 'Web3 Security Hackathon',
      description: 'Build innovative security solutions for the Web3 ecosystem and compete for prizes.',
      type: 'hackathon',
      date: '2024-03-10',
      time: '00:00 UTC',
      duration: '48 hours',
      location: 'Global (Online)',
      organizer: 'Web3 Security Foundation',
      attendees: 892,
      maxAttendees: 1000,
      price: 'Free',
      status: 'upcoming',
      featured: false,
      tags: ['hackathon', 'web3', 'security'],
      image: '/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png'
    },
    {
      id: 4,
      title: 'Smart Contract Audit Fundamentals',
      description: 'Learn the basics of smart contract auditing from industry experts.',
      type: 'webinar',
      date: '2023-12-10',
      time: '16:00 UTC',
      duration: '1.5 hours',
      location: 'Online',
      organizer: 'Security Academy',
      attendees: 567,
      maxAttendees: 1000,
      price: 'Free',
      status: 'completed',
      featured: false,
      tags: ['audit', 'fundamentals', 'webinar'],
      image: '/hawkly-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png'
    }
  ];

  const filteredEvents = events.filter(event => 
    selectedCategory === 'all' || event.type === selectedCategory
  );

  const upcomingEvents = filteredEvents.filter(event => event.status === 'upcoming');
  const pastEvents = filteredEvents.filter(event => event.status === 'completed');

  const EventCard = ({ event }: { event: typeof events[0] }) => (
    <Card className="hover:shadow-lg transition-all">
      <div className="relative">
        <img 
          src={event.image} 
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        {event.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
        <Button variant="ghost" size="icon" className="absolute top-3 right-3 bg-white/80">
          <Bookmark className="h-4 w-4" />
        </Button>
      </div>
      
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Badge variant="outline" className="mb-2">
              {event.type}
            </Badge>
            <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
            <p className="text-muted-foreground text-sm">{event.description}</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{event.time} ({event.duration})</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{event.attendees} / {event.maxAttendees} attendees</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-1">
          {event.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-lg font-semibold text-primary">
            {event.price}
          </div>
          <div className="flex gap-2">
            {event.status === 'upcoming' ? (
              <>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
                <Button size="sm">
                  Register
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm">
                <Video className="h-4 w-4 mr-2" />
                Watch Recording
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <StandardLayout
      title="Security Events | Hawkly"
      description="Discover security workshops, webinars, conferences, and hackathons in the Web3 space"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest security workshops, webinars, conferences, 
            and hackathons in the Web3 ecosystem.
          </p>
        </div>

        {/* Category Tabs */}
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="mb-8">
          <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
            {eventCategories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Featured Events */}
        {upcomingEvents.some(event => event.featured) && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Events
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.filter(event => event.featured).map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        )}

        {/* Upcoming Events */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.filter(event => !event.featured).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* Past Events */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Past Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Want to host an event?</h3>
              <p className="text-muted-foreground mb-6">
                Partner with us to organize security workshops, conferences, or hackathons 
                for the Web3 community.
              </p>
              <Button size="lg">
                <ExternalLink className="h-4 w-4 mr-2" />
                Submit Event Proposal
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Events;
