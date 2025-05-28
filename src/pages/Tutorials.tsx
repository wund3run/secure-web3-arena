import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Search, PlayCircle, Clock, Users, Star, Download,
  Code, Shield, Zap, CheckCircle, ArrowRight, BookOpen,
  Video, FileText, Lightbulb, Target, Bot, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [completedTutorials, setCompletedTutorials] = useState<number[]>([]);

  const markComplete = (tutorialIndex: number) => {
    if (!completedTutorials.includes(tutorialIndex)) {
      setCompletedTutorials([...completedTutorials, tutorialIndex]);
    }
  };

  const featuredTutorials = [
    {
      title: "Smart Contract Security Audit Fundamentals",
      description: "Learn the complete process of conducting thorough smart contract security audits from industry experts",
      duration: "45 min",
      difficulty: "Beginner",
      students: "2,847",
      rating: 4.9,
      category: "Security Fundamentals",
      type: "Video + Interactive",
      modules: 6,
      href: "#audit-fundamentals",
      thumbnail: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400",
      instructor: "Sarah Chen, Lead Security Auditor"
    },
    {
      title: "AI-Powered Vulnerability Detection Setup",
      description: "Configure and optimize AI tools for automated smart contract vulnerability scanning and threat detection",
      duration: "30 min", 
      difficulty: "Intermediate",
      students: "1,923",
      rating: 4.8,
      category: "AI Security",
      type: "Interactive Lab",
      modules: 4,
      href: "#ai-detection",
      thumbnail: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400",
      instructor: "Dr. Alex Kumar, AI Security Specialist"
    },
    {
      title: "Cross-Chain Bridge Security Analysis",
      description: "Deep dive into cross-chain bridge vulnerabilities and implement robust security measures",
      duration: "60 min",
      difficulty: "Advanced",
      students: "1,456",
      rating: 4.7,
      category: "Cross-Chain Security",
      type: "Case Study + Lab",
      modules: 8,
      href: "#bridge-security",
      thumbnail: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400",
      instructor: "Marcus Rodriguez, Bridge Security Expert"
    },
    {
      title: "DeFi Protocol Security Best Practices",
      description: "Essential security patterns for DeFi protocols including flash loan protection and oracle security",
      duration: "40 min",
      difficulty: "Intermediate",
      students: "2,156",
      rating: 4.9,
      category: "DeFi Security",
      type: "Video + Code Review",
      modules: 5,
      href: "#defi-security",
      thumbnail: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400",
      instructor: "Elena Vasquez, DeFi Security Lead"
    }
  ];

  const learningPaths = [
    {
      title: "Security Auditor Certification Path",
      description: "Complete learning path from beginner to certified security auditor",
      duration: "8-12 weeks",
      courses: 12,
      difficulty: "All Levels",
      students: "5,234",
      completionRate: "87%",
      badge: "Certified Security Auditor",
      href: "#auditor-path"
    },
    {
      title: "AI Security Specialist Track",
      description: "Master AI-powered security tools and automated vulnerability detection",
      duration: "6-8 weeks",
      courses: 8,
      difficulty: "Intermediate+",
      students: "2,891",
      completionRate: "92%",
      badge: "AI Security Specialist",
      href: "#ai-specialist-path"
    },
    {
      title: "DeFi Security Expert Program",
      description: "Specialized track for DeFi protocol security and risk management",
      duration: "10-14 weeks",
      courses: 15,
      difficulty: "Advanced",
      students: "1,567",
      completionRate: "89%",
      badge: "DeFi Security Expert",
      href: "#defi-expert-path"
    }
  ];

  const quickTutorials = [
    {
      title: "Setting Up Slither for Smart Contract Analysis",
      duration: "10 min",
      type: "Quick Setup",
      icon: <Code className="h-4 w-4" />
    },
    {
      title: "Using MythX for Vulnerability Scanning",
      duration: "15 min", 
      type: "Tool Tutorial",
      icon: <Shield className="h-4 w-4" />
    },
    {
      title: "Configuring Echidna for Fuzz Testing",
      duration: "12 min",
      type: "Testing Setup",
      icon: <Target className="h-4 w-4" />
    },
    {
      title: "AI Audit Report Generation",
      duration: "8 min",
      type: "AI Tutorial",
      icon: <Bot className="h-4 w-4" />
    }
  ];

  const categories = [
    { name: "Security Fundamentals", count: 24, icon: <Shield className="h-4 w-4" /> },
    { name: "AI Security", count: 18, icon: <Bot className="h-4 w-4" /> },
    { name: "DeFi Security", count: 21, icon: <Zap className="h-4 w-4" /> },
    { name: "Cross-Chain", count: 15, icon: <Link className="h-4 w-4" /> },
    { name: "Tools & Setup", count: 32, icon: <Code className="h-4 w-4" /> },
    { name: "Compliance", count: 12, icon: <FileText className="h-4 w-4" /> }
  ];

  return (
    <ContentPage
      title="Security Tutorials"
      description="Comprehensive video tutorials, interactive labs, and hands-on guides for mastering Web3 security auditing and AI-powered vulnerability detection."
    >
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            <PlayCircle className="h-4 w-4" />
            147 tutorials updated for March 2025 security standards
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            Security <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Tutorials</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with hands-on tutorials covering smart contract auditing, 
            AI-powered vulnerability detection, and the latest security frameworks for 2025.
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tutorials, tools, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Badge key={category.name} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
                {category.icon}
                <span className="ml-1">{category.name} ({category.count})</span>
              </Badge>
            ))}
          </div>
        </div>

        <Tabs defaultValue="featured" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="learning-paths">Learning Paths</TabsTrigger>
            <TabsTrigger value="quick-tutorials">Quick Start</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
          </TabsList>

          <TabsContent value="featured" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {featuredTutorials.map((tutorial, index) => (
                <Card key={index} className="hover:shadow-lg transition-all cursor-pointer group">
                  <div className="relative">
                    <img 
                      src={tutorial.thumbnail} 
                      alt={tutorial.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-t-lg" />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-black/50 text-white border-0">
                        {tutorial.type}
                      </Badge>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
                        {tutorial.duration}
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="lg" className="bg-white/20 backdrop-blur border-white/20 text-white hover:bg-white/30">
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Start Tutorial
                      </Button>
                    </div>
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{tutorial.category}</Badge>
                      <Badge variant={tutorial.difficulty === 'Beginner' ? 'default' : tutorial.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      <a href={tutorial.href}>{tutorial.title}</a>
                    </CardTitle>
                    <CardDescription>{tutorial.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {tutorial.students} students
                        </span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          {tutorial.rating}
                        </span>
                        <span>{tutorial.modules} modules</span>
                      </div>
                      <p className="text-sm text-muted-foreground">By {tutorial.instructor}</p>
                      <div className="flex items-center justify-between">
                        <Button variant="ghost" size="sm" asChild>
                          <a href={tutorial.href}>
                            View Details <ArrowRight className="ml-1 h-3 w-3" />
                          </a>
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => markComplete(index)}
                          disabled={completedTutorials.includes(index)}
                        >
                          {completedTutorials.includes(index) ? (
                            <>
                              <CheckCircle className="mr-1 h-3 w-3" />
                              Completed
                            </>
                          ) : (
                            'Start Learning'
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="learning-paths" className="space-y-6">
            <div className="grid md:grid-cols-1 gap-6">
              {learningPaths.map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <CardDescription className="text-base">{path.description}</CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {path.duration}
                          </span>
                          <span>{path.courses} courses</span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {path.students} students
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
                        {path.badge}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Completion Rate</span>
                        <span className="font-medium">{path.completionRate}</span>
                      </div>
                      <Progress value={parseInt(path.completionRate)} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline">{path.difficulty}</Badge>
                      <Button asChild>
                        <a href={path.href}>
                          Start Learning Path <ArrowRight className="ml-1 h-3 w-3" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quick-tutorials" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickTutorials.map((tutorial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        {tutorial.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base group-hover:text-primary transition-colors">
                          {tutorial.title}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{tutorial.duration}</Badge>
                          <Badge variant="secondary" className="text-xs">{tutorial.type}</Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-primary/10 rounded-lg text-primary">
                        {category.icon}
                      </div>
                      <div>
                        <CardTitle className="group-hover:text-primary transition-colors">
                          {category.name}
                        </CardTitle>
                        <CardDescription>{category.count} tutorials</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Explore Category <ArrowRight className="ml-1 h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Progress Section */}
        <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Your Learning Progress</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{completedTutorials.length}</div>
              <div className="text-sm text-muted-foreground">Tutorials Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {Math.round((completedTutorials.length / featuredTutorials.length) * 100)}%
              </div>
              <div className="text-sm text-muted-foreground">Featured Tutorials</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">0</div>
              <div className="text-sm text-muted-foreground">Certificates Earned</div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-4">Ready to Become a Security Expert?</h2>
          <p className="text-muted-foreground mb-6">
            Join our comprehensive training programs and earn industry-recognized certifications 
            in Web3 security and AI-powered auditing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/auth">
                Start Free Trial
              </Link>
            </Button>
            <Button variant="outline" size="lg">
              <Download className="mr-2 h-4 w-4" />
              Download Syllabus
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default Tutorials;
