
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Events | Hawkly</title>
        <meta name="description" content="Security events, workshops, and meetups" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Security Events</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our security events, workshops, and community meetups
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Workshops</CardTitle>
              <CardDescription>
                Hands-on security workshops and training sessions
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader>
              <Users className="h-12 w-12 text-green-600 mb-4" />
              <CardTitle>Meetups</CardTitle>
              <CardDescription>
                Local and virtual meetups with security professionals
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/community">View All Events</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Events;
