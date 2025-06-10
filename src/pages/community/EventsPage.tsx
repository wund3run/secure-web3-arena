
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

const EventsPage = () => {
  return (
    <StandardLayout
      title="Events | Hawkly"
      description="Web3 security events, workshops, and conferences"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Events
          </h1>
          <p className="text-xl text-muted-foreground">
            Join workshops, conferences, and meetups with security experts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Smart Contract Security Workshop",
              date: "Jan 15, 2025",
              time: "2:00 PM - 5:00 PM UTC",
              location: "Virtual",
              attendees: 245,
              type: "Workshop",
              status: "upcoming"
            },
            {
              title: "DeFi Security Best Practices",
              date: "Jan 22, 2025",
              time: "1:00 PM - 3:00 PM UTC",
              location: "San Francisco, CA",
              attendees: 89,
              type: "Meetup",
              status: "upcoming"
            },
            {
              title: "Web3 Security Conference 2025",
              date: "Feb 5-7, 2025",
              time: "All Day",
              location: "New York, NY",
              attendees: 1200,
              type: "Conference",
              status: "upcoming"
            }
          ].map((event, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{event.type}</Badge>
                  <Badge 
                    variant={event.status === 'upcoming' ? 'default' : 'secondary'}
                    className={event.status === 'upcoming' ? 'bg-green-500' : ''}
                  >
                    {event.status}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{event.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    {event.attendees} attending
                  </div>
                </div>
                <Button className="w-full">
                  {event.status === 'upcoming' ? 'Register' : 'View Details'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </StandardLayout>
  );
};

export default EventsPage;
