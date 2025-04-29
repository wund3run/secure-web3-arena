import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Users, Trophy, Calendar, Flag, Shield } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export default function Community() {
  const [activeTab, setActiveTab] = useState("discussions");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/20 to-primary/5 py-12 md:py-20">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">Web3 Security Community</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Connect with security professionals, participate in discussions, attend events, and build your reputation in the blockchain security space.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg">Join the Community</Button>
                <Button size="lg" variant="outline">Explore Events</Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Stats */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">12.5k+</p>
                <p className="text-muted-foreground">Active Members</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">350+</p>
                <p className="text-muted-foreground">Security Experts</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">4.2k+</p>
                <p className="text-muted-foreground">Forum Topics</p>
              </div>
              <div className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-primary">120+</p>
                <p className="text-muted-foreground">Events per Year</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Content Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <Tabs defaultValue="discussions" onValueChange={setActiveTab} className="w-full">
              <div className="flex justify-center mb-8">
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full max-w-2xl">
                  <TabsTrigger value="discussions" className="flex gap-2 items-center">
                    <MessageCircle className="h-4 w-4" />
                    <span className="hidden md:inline">Discussions</span>
                  </TabsTrigger>
                  <TabsTrigger value="groups" className="flex gap-2 items-center">
                    <Users className="h-4 w-4" />
                    <span className="hidden md:inline">Groups</span>
                  </TabsTrigger>
                  <TabsTrigger value="events" className="flex gap-2 items-center">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden md:inline">Events</span>
                  </TabsTrigger>
                  <TabsTrigger value="challenges" className="flex gap-2 items-center">
                    <Flag className="h-4 w-4" />
                    <span className="hidden md:inline">Challenges</span>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Discussions Tab */}
              <TabsContent value="discussions">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {discussionThreads.map((thread) => (
                    <Card key={thread.id} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{thread.title}</CardTitle>
                          <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                            {thread.category}
                          </div>
                        </div>
                        <CardDescription className="flex items-center gap-2 mt-2">
                          <img src={thread.author.avatar} alt={thread.author.name} className="w-6 h-6 rounded-full" />
                          {thread.author.name} • {thread.date}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3">{thread.preview}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" /> {thread.replies} replies
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4" /> {thread.points} points
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">View All Discussions</Button>
                </div>
              </TabsContent>

              {/* Groups Tab */}
              <TabsContent value="groups">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {communityGroups.map((group) => (
                    <Card key={group.id} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="flex items-center gap-2">
                            {group.icon}
                            {group.name}
                          </CardTitle>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            group.type === "Public" 
                              ? "bg-green-100 text-green-700" 
                              : "bg-blue-100 text-blue-700"
                          }`}>
                            {group.type}
                          </div>
                        </div>
                        <CardDescription>{group.members} members</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3">{group.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">View Group</Button>
                        <Button size="sm">Join</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">View All Groups</Button>
                </div>
              </TabsContent>

              {/* Events Tab */}
              <TabsContent value="events">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {communityEvents.map((event) => (
                    <Card key={event.id} className="h-full">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{event.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {event.date} • {event.time} • {event.format}
                            </CardDescription>
                          </div>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            event.status === "Upcoming" 
                              ? "bg-primary/10 text-primary" 
                              : "bg-zinc-100 text-zinc-700"
                          }`}>
                            {event.status}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Users className="h-4 w-4" />
                          {event.attendees} attendees
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="outline" size="sm">Learn More</Button>
                        <Button size="sm">{event.status === "Upcoming" ? "Register" : "Watch Recording"}</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">View All Events</Button>
                </div>
              </TabsContent>

              {/* Challenges Tab */}
              <TabsContent value="challenges">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {securityChallenges.map((challenge) => (
                    <Card key={challenge.id} className="h-full">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle>{challenge.title}</CardTitle>
                          <div className={`text-xs px-2 py-1 rounded-full ${
                            challenge.difficulty === "Easy" 
                              ? "bg-green-100 text-green-700" 
                              : challenge.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                            {challenge.difficulty}
                          </div>
                        </div>
                        <CardDescription>{challenge.category}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="line-clamp-3 mb-3">{challenge.description}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Trophy className="h-4 w-4" />
                          {challenge.points} points
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <div className="text-sm text-muted-foreground">{challenge.submissions} submissions</div>
                        <Button size="sm">Try Challenge</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <div className="flex justify-center mt-8">
                  <Button variant="outline">View All Challenges</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Join the Community */}
        <section className="py-16 bg-primary/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">Join Our Security Community</h2>
              <p className="text-muted-foreground mb-8">
                Connect with like-minded security professionals, expand your knowledge, and build your reputation in the blockchain security space.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button size="lg">Sign Up Now</Button>
                <Button size="lg" variant="outline">Learn More</Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Mock data for the community page tabs
const discussionThreads = [
  {
    id: 1,
    title: "Latest approaches to preventing reentrancy exploits",
    category: "Smart Contracts",
    author: {
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    date: "2 days ago",
    preview: "I've been working with several projects implementing various reentrancy prevention mechanisms. The classic mutex approach works well, but I've found some edge cases where it fails. Has anyone experimented with the newer OpenZeppelin ReentrancyGuard implementation?",
    replies: 42,
    points: 128
  },
  {
    id: 2,
    title: "MEV protection strategies for new DeFi protocols",
    category: "DeFi",
    author: {
      name: "Sarah Ahmed",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    date: "5 days ago",
    preview: "Building a new DEX and concerned about MEV. We're considering implementing a batch auction mechanism similar to what CoW Swap uses. Any experiences or recommendations from the community on this approach?",
    replies: 37,
    points: 95
  },
  {
    id: 3,
    title: "Best practices for secure upgradable proxy patterns",
    category: "Smart Contracts",
    author: {
      name: "Michael Zhang",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    date: "1 week ago",
    preview: "Working on a protocol that needs upgradeability, but I'm concerned about security implications. Is the UUPS pattern still considered best practice in 2025? What governance protections should we put in place?",
    replies: 28,
    points: 83
  },
  {
    id: 4,
    title: "Security implications of EIP-4844 (Proto-Danksharding)",
    category: "Layer 2",
    author: {
      name: "Elena Rodriguez",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    date: "2 weeks ago",
    preview: "With EIP-4844 now live, what security considerations should L2 developers be aware of? How does blob storage affect the security model of rollups?",
    replies: 19,
    points: 76
  },
  {
    id: 5,
    title: "Auditing ZK circuits - tools and approaches",
    category: "Zero Knowledge",
    author: {
      name: "David Wilson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    date: "3 weeks ago",
    preview: "ZK proofs are becoming ubiquitous, but auditing ZK circuits remains challenging. What tools and techniques are people using? Are there standards emerging for documenting circuit security properties?",
    replies: 31,
    points: 102
  },
  {
    id: 6,
    title: "Analyzing the recent cross-chain bridge exploit",
    category: "Exploits",
    author: {
      name: "Sophia Parker",
      avatar: "https://i.pravatar.cc/150?img=6"
    },
    date: "1 month ago",
    preview: "Deep diving into the recent bridge exploit. It looks like the attackers found a novel way to manipulate the message verification on the destination chain. I've created a POC that demonstrates the attack vector.",
    replies: 56,
    points: 210
  }
];

const communityGroups = [
  {
    id: 1,
    name: "Smart Contract Auditors",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Public",
    members: 3240,
    description: "A group for professional smart contract auditors to discuss methodologies, tools, and best practices for auditing blockchain applications."
  },
  {
    id: 2,
    name: "DeFi Security Working Group",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Private",
    members: 1875,
    description: "Focused on identifying and addressing security challenges specific to decentralized finance protocols and applications."
  },
  {
    id: 3,
    name: "ZK Security Research",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Public",
    members: 942,
    description: "Researching security aspects of zero-knowledge proof systems and their implementations in blockchain protocols."
  },
  {
    id: 4,
    name: "Security Mentorship Network",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Public",
    members: 2130,
    description: "Connecting security beginners with experienced mentors to foster growth and knowledge sharing in the Web3 security space."
  },
  {
    id: 5,
    name: "Exploit Analysis Team",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Private",
    members: 768,
    description: "A specialized group focusing on analyzing recent exploits, creating educational content, and developing prevention strategies."
  },
  {
    id: 6,
    name: "Layer 2 Security Coalition",
    icon: <Shield className="h-5 w-5 text-primary" />,
    type: "Public",
    members: 1453,
    description: "Focused on the unique security challenges of Layer 2 scaling solutions including rollups, state channels, and validiums."
  }
];

const communityEvents = [
  {
    id: 1,
    title: "Web3 Security Summit",
    date: "May 15, 2025",
    time: "9:00 AM - 6:00 PM UTC",
    format: "Virtual & In-person",
    status: "Upcoming",
    description: "Join top security researchers and protocol developers for a day of presentations and workshops on the latest in blockchain security.",
    attendees: 1200
  },
  {
    id: 2,
    title: "Smart Contract Auditing Masterclass",
    date: "June 3-5, 2025",
    time: "2:00 PM - 5:00 PM UTC",
    format: "Virtual Workshop",
    status: "Upcoming",
    description: "A three-day hands-on workshop covering advanced smart contract auditing techniques, featuring live code reviews and vulnerability hunting.",
    attendees: 500
  },
  {
    id: 3,
    title: "Security Tools Showcase",
    date: "April 22, 2025",
    time: "3:00 PM - 5:00 PM UTC",
    format: "Virtual",
    status: "Past",
    description: "Demonstrations of the latest security tools and frameworks for blockchain developers and auditors, with Q&A from the creators.",
    attendees: 850
  },
  {
    id: 4,
    title: "DeFi Security Best Practices Panel",
    date: "April 10, 2025",
    time: "6:00 PM - 7:30 PM UTC",
    format: "Virtual",
    status: "Past",
    description: "Security leads from major DeFi protocols discuss best practices, recent challenges, and future security trends in the ecosystem.",
    attendees: 1350
  }
];

const securityChallenges = [
  {
    id: 1,
    title: "Reentrancy Riddles",
    difficulty: "Medium",
    category: "Smart Contract Security",
    description: "A series of increasingly complex reentrancy challenges. Can you exploit the vulnerable contracts while also implementing proper fixes?",
    points: 500,
    submissions: 342
  },
  {
    id: 2,
    title: "MEV Extraction Challenge",
    difficulty: "Hard",
    category: "DeFi Security",
    description: "Identify profitable MEV opportunities in a simulated mempool environment. Points awarded for novel extraction strategies.",
    points: 750,
    submissions: 126
  },
  {
    id: 3,
    title: "Access Control Basics",
    difficulty: "Easy",
    category: "Smart Contract Security",
    description: "Find and exploit the access control vulnerabilities in these sample contracts. Perfect for security beginners.",
    points: 250,
    submissions: 958
  },
  {
    id: 4,
    title: "Bridge Security Audit",
    difficulty: "Hard",
    category: "Cross-chain Security",
    description: "Audit a cross-chain bridge implementation and identify as many vulnerabilities as possible. Real-world bridge exploits have resulted in losses of millions.",
    points: 1000,
    submissions: 87
  },
  {
    id: 5,
    title: "Oracle Manipulation",
    difficulty: "Medium",
    category: "DeFi Security",
    description: "Learn how price oracle manipulations work by exploiting vulnerable lending protocols in a sandboxed environment.",
    points: 500,
    submissions: 274
  },
  {
    id: 6,
    title: "ZK Circuit Bugs",
    difficulty: "Hard",
    category: "Zero Knowledge",
    description: "Find the vulnerabilities in these ZK circuit implementations. Test your understanding of zero-knowledge proof systems.",
    points: 1000,
    submissions: 62
  }
];
