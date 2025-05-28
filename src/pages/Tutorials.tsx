
import React from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle, Clock, Users, Star, BookOpen, Code, 
  Shield, Zap, Globe, Lock, ArrowRight, Trophy,
  CheckCircle, Video, FileText, Brain
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { KnowledgeHub } from '@/components/educational/knowledge-hub';

const Tutorials = () => {
  const featuredTutorials = [
    {
      id: 1,
      title: "Complete Smart Contract Security Masterclass",
      description: "From basic vulnerabilities to advanced exploit prevention techniques used by top security firms.",
      instructor: "Dr. Sarah Chen",
      rating: 4.9,
      students: 3420,
      duration: "8h 45m",
      level: "Intermediate",
      image: "https://i.imgur.com/xM0nBw6.png",
      price: "Free",
      skills: ["Reentrancy Prevention", "Access Control", "Oracle Security", "Gas Optimization"],
      href: "/tutorials"
    },
    {
      id: 2,
      title: "DeFi Security Deep Dive: MEV & Flash Loans",
      description: "Advanced course covering MEV protection strategies and flash loan attack prevention.",
      instructor: "Alex Rodriguez",
      rating: 4.8,
      students: 1840,
      duration: "6h 30m",
      level: "Advanced",
      image: "https://i.imgur.com/xM0nBw6.png",
      price: "Pro",
      skills: ["MEV Protection", "Flash Loan Security", "Arbitrage Detection", "Sandwich Attack Prevention"],
      href: "/tutorials"
    }
  ];

  const learningPaths = [
    {
      title: "Security Auditor Certification",
      description: "Complete certification program for professional security auditors",
      courses: 12,
      duration: "40+ hours",
      students: 2340,
      difficulty: "Beginner to Advanced",
      href: "/tutorials"
    },
    {
      title: "DeFi Security Specialist",
      description: "Specialized track for DeFi protocol security",
      courses: 8,
      duration: "28+ hours",
      students: 1420,
      difficulty: "Intermediate",
      href: "/tutorials"
    },
    {
      title: "Blockchain Security Researcher",
      description: "Research-oriented path for advanced security professionals",
      courses: 15,
      duration: "60+ hours",
      students: 890,
      difficulty: "Advanced",
      href: "/tutorials"
    }
  ];

  const quickStartTutorials = [
    {
      title: "Your First Smart Contract Audit",
      duration: "45 min",
      type: "Hands-on",
      difficulty: "Beginner",
      icon: <Shield className="h-5 w-5" />,
      href: "/tutorials"
    },
    {
      title: "Understanding DeFi Vulnerabilities",
      duration: "30 min",
      type: "Theory",
      difficulty: "Beginner",
      icon: <Zap className="h-5 w-5" />,
      href: "/tutorials"
    },
    {
      title: "Cross-Chain Security Basics",
      duration: "25 min",
      type: "Explainer",
      difficulty: "Beginner",
      icon: <Globe className="h-5 w-5" />,
      href: "/tutorials"
    },
    {
      title: "ZK-Proof Security Intro",
      duration: "35 min",
      type: "Technical",
      difficulty: "Intermediate",
      icon: <Lock className="h-5 w-5" />,
      href: "/tutorials"
    }
  ];

  return (
    <ContentPage
      title="Security Tutorials"
      description="Master Web3 security with hands-on tutorials, expert-led courses, and comprehensive learning paths designed for 2025's security challenges."
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            <Brain className="h-4 w-4" />
            150+ tutorials updated for 2025 security challenges
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            Learn Web3 Security <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Hands-On</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From smart contract basics to advanced DeFi security patterns. Learn from industry experts 
            with practical, up-to-date tutorials covering 2025's latest security challenges.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <PlayCircle className="mr-2 h-5 w-5" />
              Start Learning
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/challenges">
                <Trophy className="mr-2 h-5 w-5" />
                Practice Challenges
              </Link>
            </Button>
          </div>
        </section>

        {/* Quick Start Tutorials */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Quick Start Tutorials</h2>
            <p className="text-muted-foreground">Perfect for beginners - get started in under an hour</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickStartTutorials.map((tutorial, index) => (
              <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-primary/10 rounded-lg text-primary">
                      {tutorial.icon}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {tutorial.difficulty}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    <Link to={tutorial.href}>{tutorial.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tutorial.duration}
                    </span>
                    <span>{tutorial.type}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full" asChild>
                    <Link to={tutorial.href}>
                      Start Tutorial
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Tutorials */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Featured Masterclasses</h2>
            <p className="text-muted-foreground">In-depth courses from industry-leading security experts</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="overflow-hidden hover:shadow-xl transition-all">
                <div className="aspect-video relative bg-muted/40">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-primary/60" />
                  </div>
                  {tutorial.price === "Pro" && (
                    <Badge className="absolute top-4 right-4 bg-purple-100 text-purple-700">
                      PRO
                    </Badge>
                  )}
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{tutorial.level}</Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {tutorial.rating}
                    </div>
                  </div>
                  <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                  <CardDescription className="text-base">{tutorial.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>By {tutorial.instructor}</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {tutorial.students.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {tutorial.duration}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">What you'll learn:</p>
                    <div className="flex flex-wrap gap-1">
                      {tutorial.skills.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Button className="w-full" size="lg" asChild>
                    <Link to={tutorial.href}>
                      {tutorial.price === "Free" ? "Start Free Course" : "Unlock with Pro"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Paths */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Structured Learning Paths</h2>
            <p className="text-muted-foreground">Complete certification programs designed by security professionals</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <Badge variant="outline">Certification</Badge>
                  </div>
                  <CardTitle>{path.title}</CardTitle>
                  <CardDescription>{path.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-3 w-3" />
                      {path.courses} courses
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {path.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {path.students} students
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {path.difficulty}
                    </div>
                  </div>
                  
                  <Button className="w-full" asChild>
                    <Link to={path.href}>
                      Start Learning Path
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Knowledge Hub */}
        <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Complete Knowledge Hub</h2>
            <p className="text-muted-foreground">Browse all tutorials, learning paths, and educational resources</p>
          </div>
          
          <KnowledgeHub />
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Security Expert?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of security professionals who've advanced their careers with our comprehensive tutorials 
            and hands-on training programs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <PlayCircle className="mr-2 h-4 w-4" />
              Start Your Journey
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/marketplace">
                Browse Expert Auditors
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </ContentPage>
  );
};

export default Tutorials;
