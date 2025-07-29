import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Shield,
  MessageCircle,
  BarChart3,
  Users,
  HelpCircle,
  Lock,
  DollarSign,
  LineChart,
  Activity,
  Download,
  Plus,
  Bell,
  Send,
  Search,
  CheckCircle2,
  Clock,
  Filter,
  ArrowRight
} from 'lucide-react';

// Platform Features Page
export function Features() {
  const features = [
    {
      icon: Shield,
      title: "Security First",
      description: "Enterprise-grade security measures"
    },
    // ... other features
  ];

  return (
    <StandardLayout title="Platform Features" description="Comprehensive platform capabilities and tools">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive security audit platform built for Web3
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg">
            Start Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}

// Escrow System Page
export function Escrow() {
  const steps = [
    {
      title: "Project Setup",
      description: "Create project and define milestones"
    },
    {
      title: "Fund Escrow",
      description: "Secure deposit of project funds"
    },
    {
      title: "Milestone Release",
      description: "Automatic payment on milestone completion"
    },
    {
      title: "Final Settlement",
      description: "Release remaining funds upon project completion"
    }
  ];

  return (
    <StandardLayout title="Escrow System" description="Secure milestone-based payment system">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Secure Escrow System</h1>
          <p className="text-lg text-muted-foreground">
            Protected payments for audits and security services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {steps.map((step, index) => (
            <Card key={index} className="p-6">
              <Badge variant="secondary" className="mb-4">Step {index + 1}</Badge>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-8">
          <CardHeader>
            <CardTitle>Current Rates</CardTitle>
            <CardDescription>Transparent fee structure for all services</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium">Escrow Fee</h4>
                <p className="text-2xl font-bold">1%</p>
              </div>
              <div>
                <h4 className="font-medium">Release Time</h4>
                <p className="text-2xl font-bold">24h</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
}

// Collaboration Tools Page
export function Collaboration() {
  return (
    <StandardLayout title="Collaboration Tools" description="Real-time collaboration and communication">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Collaboration Tools</h1>
          <p className="text-lg text-muted-foreground">
            Real-time collaboration for auditors and project teams
          </p>
        </div>

        <Tabs defaultValue="chat" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="chat">Chat</TabsTrigger>
            <TabsTrigger value="files">File Sharing</TabsTrigger>
            <TabsTrigger value="reviews">Code Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Chat</CardTitle>
                <CardDescription>Instant communication with team members</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Chat UI components would go here */}
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">Found a potential vulnerability in the smart contract</p>
                    </div>
                    <span className="text-xs text-muted-foreground">2m ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Other tab contents */}
        </Tabs>
      </div>
    </StandardLayout>
  );
}

// Analytics Dashboard Page
export function AnalyticsDashboard() {
  return (
    <StandardLayout title="Analytics Dashboard" description="Advanced insights and performance metrics">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <div className="flex space-x-4">
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Total Audits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">247</div>
              <p className="text-sm text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          {/* Add more metric cards */}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Audit Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Chart component would go here */}
              <div className="h-[300px] bg-muted/10 rounded-lg flex items-center justify-center">
                Timeline Chart
              </div>
            </CardContent>
          </Card>
          {/* Add more charts/graphs */}
        </div>
      </div>
    </StandardLayout>
  );
}

// My Audits Page
export function MyAudits() {
  const audits = [
    {
      id: "AUD-001",
      projectName: "DeFi Protocol X",
      status: "In Progress",
      progress: 65,
      dueDate: "2025-08-15"
    },
    // Add more audit entries
  ];

  return (
    <StandardLayout title="My Audits" description="Manage and track your security audits">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">My Audits</h1>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Audit
          </Button>
        </div>

        <div className="space-y-4">
          {audits.map((audit) => (
            <Card key={audit.id}>
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{audit.projectName}</CardTitle>
                    <CardDescription>ID: {audit.id}</CardDescription>
                  </div>
                  <Badge>{audit.status}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{audit.progress}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full"
                      style={{ width: `${audit.progress}%` }}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="ghost">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </StandardLayout>
  );
}

// Messages Page
export function Messages() {
  const conversations = [
    {
      id: "1",
      name: "Alice Chen",
      avatar: "AC",
      lastMessage: "I've reviewed the smart contract changes",
      time: "2m ago",
      unread: true
    },
    // Add more conversations
  ];

  return (
    <StandardLayout title="Messages" description="Communication center for all your projects">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Messages</h1>
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>

        <div className="grid md:grid-cols-[300px,1fr] gap-6">
          <Card className="h-[600px]">
            <CardHeader>
              <Input placeholder="Search conversations..." />
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="space-y-2">
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="p-3 rounded-lg hover:bg-muted cursor-pointer flex items-center space-x-4"
                    >
                      <Avatar>
                        <AvatarFallback>{conv.avatar}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{conv.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {conv.lastMessage}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {conv.time}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card className="h-[600px]">
            <CardHeader className="border-b">
              <CardTitle>Select a conversation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col h-full justify-center items-center text-center p-8">
                <MessageCircle className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                <p className="text-sm text-muted-foreground">
                  Choose a conversation from the sidebar or start a new one
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </StandardLayout>
  );
}

// FAQ Page
export function FAQ() {
  const faqs = [
    {
      question: "What types of audits do you support?",
      answer: "We support comprehensive security audits for smart contracts, DeFi protocols, NFT projects, and general Web3 applications. Our platform enables both automated and manual audits by expert security researchers."
    },
    {
      question: "How long does an audit typically take?",
      answer: "Audit duration varies based on project complexity and scope. Simple smart contracts may take 1-2 weeks, while complex DeFi protocols can take 4-6 weeks. We provide estimated timelines during project setup."
    },
    {
      question: "What are your security standards?",
      answer: "We follow industry best practices and frameworks including OWASP Top 10, CWE/SANS Top 25, and custom Web3-specific security guidelines. All auditors are verified experts with proven track records."
    },
    // Add more FAQs
  ];

  return (
    <StandardLayout title="FAQ" description="Frequently asked questions and answers">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our platform and services
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-start">
                    <span className="mr-4">Q:</span>
                    <span>{faq.question}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex">
                    <span className="mr-4">A:</span>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>Still have questions?</CardTitle>
                <CardDescription>
                  Can't find the answer you're looking for? Reach out to our support team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button>
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
