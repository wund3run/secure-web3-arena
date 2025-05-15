
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, MessageSquare, Users, Trophy, Clock, CalendarDays, Search, Filter } from "lucide-react";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");

  const upcomingEvents = [
    {
      id: 1,
      title: "Smart Contract Audit Workshop",
      date: "May 25, 2025",
      time: "2:00 PM UTC",
      participants: 124,
      type: "Workshop"
    },
    {
      id: 2,
      title: "Web3 Security Hackathon",
      date: "June 10-12, 2025",
      time: "All day",
      participants: 256,
      type: "Hackathon"
    },
    {
      id: 3,
      title: "AMA with Top Auditors",
      date: "May 30, 2025",
      time: "4:00 PM UTC",
      participants: 89,
      type: "AMA"
    }
  ];

  const popularGroups = [
    {
      id: 1,
      name: "EVM Security Experts",
      members: 1245,
      topics: ["Solidity", "EVM", "Security"]
    },
    {
      id: 2,
      name: "Smart Contract Auditors",
      members: 876,
      topics: ["Auditing", "Best Practices"]
    },
    {
      id: 3,
      name: "Zero Knowledge Proofs",
      members: 543,
      topics: ["ZK", "Privacy", "Cryptography"]
    }
  ];

  const activeChallenges = [
    {
      id: 1,
      title: "Bug Bounty Challenge",
      deadline: "May 31, 2025",
      reward: "5,000 USDC",
      participants: 78,
      difficulty: "Advanced"
    },
    {
      id: 2,
      title: "Code Review Contest",
      deadline: "June 15, 2025",
      reward: "2,500 USDC",
      participants: 124,
      difficulty: "Intermediate"
    },
    {
      id: 3,
      title: "Security Quiz Challenge",
      deadline: "May 25, 2025",
      reward: "1,000 USDC",
      participants: 215,
      difficulty: "Beginner"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Community | Hawkly - Web3 Security Platform</title>
        <meta 
          name="description" 
          content="Join the Hawkly community of security professionals. Participate in discussions, events, and challenges to enhance your Web3 security expertise."
        />
      </Helmet>
      
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Hawkly Community
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect, collaborate, and grow with fellow security professionals in the Web3 space
            </p>
          </div>
          
          {/* Search and filter bar */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex-grow relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search the community..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" className="sm:w-auto">
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Button className="sm:w-auto bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <MessageSquare className="mr-2 h-4 w-4" />
              New Post
            </Button>
          </div>
          
          {/* Main content tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2">
              <TabsTrigger value="discussions" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Discussions</span>
                <span className="sm:hidden">Discuss</span>
              </TabsTrigger>
              <TabsTrigger value="groups" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Groups</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Events</span>
              </TabsTrigger>
              <TabsTrigger value="challenges" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Challenges</span>
              </TabsTrigger>
              <TabsTrigger value="leaderboard" className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span>Leaderboard</span>
              </TabsTrigger>
            </TabsList>
            
            {/* Discussions Tab */}
            <TabsContent value="discussions" className="space-y-6">
              <div className="bg-card border rounded-lg p-6">
                <h2 className="font-semibold text-xl mb-4">Popular Discussions</h2>
                <div className="space-y-6">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium hover:text-primary transition-colors cursor-pointer">
                          Best practices for smart contract auditing
                        </h3>
                        <Badge variant="outline" className="ml-2">
                          Hot
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                        In this thread we're discussing the latest best practices for conducting thorough smart contract audits...
                      </p>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" /> 42 replies
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" /> 128 views
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" /> 2 hours ago
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">Load More Discussions</Button>
                </div>
              </div>
            </TabsContent>
            
            {/* Groups Tab */}
            <TabsContent value="groups" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {popularGroups.map((group) => (
                  <Card key={group.id}>
                    <CardHeader>
                      <CardTitle>{group.name}</CardTitle>
                      <CardDescription>{group.members} members</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {group.topics.map((topic, i) => (
                          <Badge key={i} variant="secondary">{topic}</Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" size="sm">View Group</Button>
                      <Button size="sm">Join</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline">Explore All Groups</Button>
              </div>
            </TabsContent>
            
            {/* Events Tab */}
            <TabsContent value="events" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {upcomingEvents.map((event) => (
                  <Card key={event.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{event.title}</CardTitle>
                        <Badge>{event.type}</Badge>
                      </div>
                      <CardDescription className="flex items-center mt-2">
                        <CalendarDays className="h-4 w-4 mr-2" />
                        {event.date} • {event.time}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm">
                        <span className="text-muted-foreground">{event.participants} participants</span>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Register Now</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline">View Calendar</Button>
              </div>
            </TabsContent>
            
            {/* Challenges Tab */}
            <TabsContent value="challenges" className="space-y-6">
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {activeChallenges.map((challenge) => (
                  <Card key={challenge.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{challenge.title}</CardTitle>
                        <Badge variant={challenge.difficulty === "Advanced" ? "destructive" : 
                                       challenge.difficulty === "Intermediate" ? "default" : "outline"}>
                          {challenge.difficulty}
                        </Badge>
                      </div>
                      <CardDescription className="flex items-center mt-2">
                        <Clock className="h-4 w-4 mr-2" />
                        Deadline: {challenge.deadline}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-sm space-y-2">
                        <div>
                          <span className="font-medium">Reward:</span> {challenge.reward}
                        </div>
                        <div>
                          <span className="text-muted-foreground">{challenge.participants} participants</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Join Challenge</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Button variant="outline">View All Challenges</Button>
              </div>
            </TabsContent>
            
            {/* Leaderboard Tab */}
            <TabsContent value="leaderboard" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Leaderboard</CardTitle>
                  <CardDescription>Top contributors based on activity and achievements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((position) => (
                      <div key={position} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="text-lg font-bold w-6 text-center">
                            {position}
                          </div>
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Users className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">Alex Thompson</p>
                            <p className="text-xs text-muted-foreground">Senior Security Auditor</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <p className="text-sm font-medium">Points</p>
                            <p className="text-lg font-bold">{1500 - position * 125}</p>
                          </div>
                          <div className="flex gap-1">
                            {[1, 2, 3].map((badge) => (
                              <div key={badge} className="h-6 w-6 rounded-full bg-primary/20" />
                            ))}
                            <EnhancedTooltip content="View all badges">
                              <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs">+5</div>
                            </EnhancedTooltip>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button variant="outline">View Full Leaderboard</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Call to action */}
          <div className="mt-16 bg-card border rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Join Our Next Community Event</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Connect with security experts, learn best practices, and stay ahead of emerging threats in our live events
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <CalendarDays className="mr-2 h-4 w-4" />
                Browse Upcoming Events
              </Button>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Subscribe to Calendar
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}
