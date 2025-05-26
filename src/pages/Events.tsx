
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Events() {
  const upcomingEvents = [
    {
      title: "Web3 Security Summit 2025",
      date: "June 15-17, 2025",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco, CA",
      type: "Conference",
      attendees: 500,
      description: "The premier Web3 security conference featuring talks from leading experts.",
      isVirtual: false
    },
    {
      title: "Smart Contract Security Workshop",
      date: "May 30, 2025",
      time: "2:00 PM - 5:00 PM",
      location: "Virtual",
      type: "Workshop",
      attendees: 150,
      description: "Hands-on workshop covering advanced smart contract security techniques.",
      isVirtual: true
    },
    {
      title: "DeFi Security Roundtable",
      date: "June 5, 2025",
      time: "1:00 PM - 3:00 PM",
      location: "New York, NY",
      type: "Roundtable",
      attendees: 50,
      description: "Expert panel discussion on current DeFi security challenges.",
      isVirtual: false
    }
  ];

  const pastEvents = [
    {
      title: "Hawkly Security Office Hours",
      date: "May 15, 2025",
      type: "Community Call",
      recording: true
    },
    {
      title: "Cross-Chain Security Deep Dive",
      date: "May 8, 2025",
      type: "Technical Talk",
      recording: true
    }
  ];

  return (
    <ContentPage
      title="Security Events"
      description="Upcoming and past Web3 security events, workshops, and community gatherings"
      className="px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <Calendar className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Events</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Join our community events to learn, network, and stay updated on the latest in Web3 security.
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
          <div className="space-y-6">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center mb-2">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mr-3">
                        {event.type}
                      </span>
                      {event.isVirtual && (
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                          Virtual
                        </span>
                      )}
                    </div>
                    
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center mt-3">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{event.attendees} attendees expected</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6">
                    <Button>Register Now</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Past Events</h2>
          <div className="bg-card rounded-lg border border-border/40">
            <div className="divide-y divide-border/40">
              {pastEvents.map((event, index) => (
                <div key={index} className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">{event.title}</h3>
                      <div className="flex items-center mt-1 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{event.date}</span>
                        <span className="mx-2">•</span>
                        <span>{event.type}</span>
                      </div>
                    </div>
                    {event.recording && (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Watch Recording
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-primary/5 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-2">Stay Informed</h3>
          <p className="text-muted-foreground mb-4">
            Subscribe to our events newsletter to get notified about upcoming security events and workshops.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button>Subscribe to Events</Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
