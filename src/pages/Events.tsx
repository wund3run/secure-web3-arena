
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Video, ExternalLink, ArrowRight, Filter } from "lucide-react";

export default function Events() {
  const upcomingEvents = [
    {
      id: 1,
      title: "Web3 Security Summit 2025",
      date: "June 15-16, 2025",
      location: "Virtual Event",
      description: "A two-day virtual conference featuring top security experts discussing the latest threats and best practices in blockchain security.",
      type: "Conference",
      speakers: ["Alex Johnson", "Sarah Ahmed", "Michael Zhang"],
      link: "/events/web3-security-summit"
    },
    {
      id: 2,
      title: "Smart Contract Auditing Workshop",
      date: "May 28, 2025",
      location: "New York, NY",
      description: "A hands-on workshop covering advanced techniques for auditing complex smart contracts and identifying vulnerabilities.",
      type: "Workshop",
      speakers: ["Elena Rodriguez", "David Wilson"],
      link: "/events/auditing-workshop"
    },
    {
      id: 3,
      title: "Security Office Hours: MEV Protection",
      date: "May 20, 2025",
      location: "Virtual",
      description: "Weekly office hours focusing on MEV protection strategies for DeFi protocols with Q&A session.",
      type: "Office Hours",
      speakers: ["Sophia Parker"],
      link: "/events/office-hours-mev"
    },
  ];

  const pastEvents = [
    {
      id: 4,
      title: "Hawkly Security Hackathon",
      date: "April 10-12, 2025",
      location: "London, UK",
      description: "A 48-hour hackathon focused on building secure blockchain applications with substantial prizes for the winners.",
      type: "Hackathon",
      link: "/events/hackathon-2025"
    },
    {
      id: 5,
      title: "ZK Security Masterclass",
      date: "March 25, 2025",
      location: "Virtual Event",
      description: "An in-depth exploration of zero-knowledge proof security with practical examples and implementation guidance.",
      type: "Masterclass",
      link: "/events/zk-security-masterclass"
    }
  ];

  return (
    <ContentPage
      title="Security Events"
      description="Upcoming and past security events, webinars, workshops, and conferences in the Web3 security space."
    >
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Security Events</h1>
          <p className="text-lg text-muted-foreground">
            Connect with the Web3 security community through conferences, workshops, and online events.
          </p>
        </div>
        <div className="flex gap-3 mt-4 md:mt-0">
          <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
            Submit Event
          </Button>
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-1.5" /> Filter
          </Button>
        </div>
      </div>

      <div className="space-y-10">
        {/* Upcoming Events */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-primary" /> Upcoming Events
          </h2>
          <div className="space-y-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-all">
                <CardHeader className="p-6 pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <Badge className="mb-2">{event.type}</Badge>
                      <CardTitle className="text-xl mb-1">{event.title}</CardTitle>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href={event.link}>Register <ArrowRight className="ml-1 h-3 w-3" /></a>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-2">
                  <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-x-4 gap-y-2 mb-3">
                    <div className="flex items-center">
                      <Calendar className="mr-1.5 h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1.5 h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    {event.location === "Virtual" || event.location === "Virtual Event" ? (
                      <div className="flex items-center">
                        <Video className="mr-1.5 h-4 w-4" />
                        <span>Online</span>
                      </div>
                    ) : null}
                  </div>
                  <p className="mb-4">{event.description}</p>
                  {event.speakers && (
                    <div className="flex items-center mt-3">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div className="text-sm">
                        <span className="text-muted-foreground mr-1">Speakers:</span>
                        {event.speakers.join(", ")}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Past Events */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Calendar className="mr-2 h-5 w-5 text-muted-foreground" /> Past Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-all">
                <CardHeader className="p-4 pb-2">
                  <Badge variant="outline" className="mb-1">{event.type}</Badge>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-2">
                  <div className="flex flex-wrap items-center text-xs text-muted-foreground gap-x-3 gap-y-1 mb-3">
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3.5 w-3.5" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-3.5 w-3.5" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <p className="text-sm mb-3">{event.description}</p>
                  <Button variant="ghost" size="sm" className="text-primary" asChild>
                    <a href={event.link}>
                      View Recording <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" size="lg">View All Past Events</Button>
          </div>
        </section>

        {/* Event Calendar */}
        <section className="bg-card border border-border/40 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Event Calendar</h2>
          <p className="text-muted-foreground mb-6">
            Subscribe to our security events calendar to stay updated on upcoming workshops, conferences, and webinars.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Add to Google Calendar
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Add to iCal
            </Button>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" /> Add to Outlook
            </Button>
          </div>
        </section>
      </div>
    </ContentPage>
  );
}
