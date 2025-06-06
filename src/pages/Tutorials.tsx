
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Play,
  Clock,
  Users,
  Star,
  Search,
  Filter,
  BookOpen,
  Video,
  FileText,
  Zap,
  Shield,
  Trophy,
  CheckCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const tutorials = [
    {
      id: 1,
      title: "AI-Powered Smart Contract Security Analysis",
      description: "Learn to leverage GPT-4, Claude, and specialized AI tools for automated vulnerability detection and code analysis in 2025",
      duration: "85 min",
      level: "Advanced",
      views: "24.3k",
      rating: 4.9,
      instructor: "Dr. Sarah Chen",
      publishDate: "March 2025",
      new: true,
      category: "AI Security",
      progress: 0,
      thumbnail: "ai-security",
      lessons: 12,
      type: "video",
      tags: ["AI", "GPT-4", "Automation", "Static Analysis"]
    },
    {
      id: 2,
      title: "DeFi Security Fundamentals 2025",
      description: "Master the latest DeFi security patterns including MEV protection, flash loan defense, and cross-protocol risk assessment",
      duration: "120 min",
      level: "Intermediate",
      views: "31.7k",
      rating: 4.8,
      instructor: "Marcus Rodriguez",
      publishDate: "March 2025",
      new: true,
      category: "DeFi",
      progress: 45,
      thumbnail: "defi-security",
      lessons: 15,
      type: "video",
      tags: ["DeFi", "Flash Loans", "MEV", "Liquidity"]
    },
    {
      id: 3,
      title: "Layer 2 Security Architecture Deep Dive",
      description: "Comprehensive guide to securing rollups, state channels, and other L2 solutions with hands-on examples and real exploits",
      duration: "95 min",
      level: "Expert",
      views: "18.2k",
      rating: 4.9,
      instructor: "Dr. Alex Kim",
      publishDate: "March 2025",
      category: "Layer 2",
      progress: 0,
      thumbnail: "l2-security",
      lessons: 10,
      type: "video",
      tags: ["L2", "Rollups", "ZK", "Optimistic"]
    },
    {
      id: 4,
      title: "Zero-Knowledge Protocol Security",
      description: "Understand zk-SNARK and zk-STARK security, circuit vulnerabilities, and trusted setup considerations",
      duration: "110 min",
      level: "Expert",
      views: "12.8k",
      rating: 4.7,
      instructor: "Dr. Elena Vasquez",
      publishDate: "February 2025",
      category: "ZK Proofs",
      progress: 0,
      thumbnail: "zk-security",
      lessons: 14,
      type: "video",
      tags: ["ZK", "SNARKs", "STARKs", "Circuits"]
    },
    {
      id: 5,
      title: "Cross-Chain Bridge Security Assessment",
      description: "Learn to audit cross-chain bridges, identify consensus vulnerabilities, and assess validator network security",
      duration: "75 min",
      level: "Advanced",
      views: "15.9k",
      rating: 4.6,
      instructor: "Jordan Park",
      publishDate: "March 2025",
      category: "Cross-Chain",
      progress: 0,
      thumbnail: "bridge-security",
      lessons: 9,
      type: "video",
      tags: ["Bridges", "Cross-chain", "Validators"]
    },
    {
      id: 6,
      title: "Smart Contract Security for Beginners",
      description: "Start your Web3 security journey with fundamental concepts, common vulnerabilities, and basic audit techniques",
      duration: "60 min",
      level: "Beginner",
      views: "45.2k",
      rating: 4.8,
      instructor: "Lisa Thompson",
      publishDate: "March 2025",
      category: "Fundamentals",
      progress: 100,
      thumbnail: "fundamentals",
      lessons: 8,
      type: "video",
      tags: ["Basics", "Solidity", "Security", "Intro"]
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'AI Security', label: 'AI Security' },
    { value: 'DeFi', label: 'DeFi' },
    { value: 'Layer 2', label: 'Layer 2' },
    { value: 'ZK Proofs', label: 'ZK Proofs' },
    { value: 'Cross-Chain', label: 'Cross-Chain' },
    { value: 'Fundamentals', label: 'Fundamentals' }
  ];

  const levels = [
    { value: 'all', label: 'All Levels' },
    { value: 'Beginner', label: 'Beginner' },
    { value: 'Intermediate', label: 'Intermediate' },
    { value: 'Advanced', label: 'Advanced' },
    { value: 'Expert', label: 'Expert' }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = selectedLevel === 'all' || tutorial.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesLevel && matchesCategory;
  });

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-orange-100 text-orange-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardLayout
      title="Security Tutorials"
      description="Master Web3 security with expert-led tutorials updated for March 2025"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Learning Center</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security with comprehensive tutorials covering the latest threats, 
            AI-powered analysis techniques, and cutting-edge security practices for 2025.
          </p>
        </div>

        {/* Learning Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">150+</div>
            <div className="text-sm text-muted-foreground">Expert Tutorials</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">89k</div>
            <div className="text-sm text-muted-foreground">Students Enrolled</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.8</div>
            <div className="text-sm text-muted-foreground">Avg. Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">95%</div>
            <div className="text-sm text-muted-foreground">Completion Rate</div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tutorials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedLevel} onValueChange={setSelectedLevel}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {levels.map(level => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Tutorials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTutorials.map((tutorial) => (
            <Card key={tutorial.id} className="hover:shadow-lg transition-shadow overflow-hidden">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                <Play className="h-16 w-16 text-white" />
                {tutorial.new && (
                  <Badge className="absolute top-3 left-3" variant="default">
                    New 2025
                  </Badge>
                )}
                <Badge className={`absolute top-3 right-3 ${getLevelColor(tutorial.level)}`}>
                  {tutorial.level}
                </Badge>
              </div>
              
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg mb-2">{tutorial.title}</CardTitle>
                    <CardDescription className="line-clamp-3">
                      {tutorial.description}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {/* Progress Bar (if started) */}
                  {tutorial.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{tutorial.progress}%</span>
                      </div>
                      <Progress value={tutorial.progress} className="h-2" />
                    </div>
                  )}
                  
                  {/* Tutorial Info */}
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Video className="h-4 w-4" />
                      {tutorial.lessons} lessons
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {tutorial.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {tutorial.rating}
                    </div>
                  </div>
                  
                  {/* Instructor */}
                  <div className="text-sm">
                    <span className="text-muted-foreground">Instructor: </span>
                    <span className="font-medium">{tutorial.instructor}</span>
                  </div>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {tutorial.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Action Button */}
                  <Button className="w-full">
                    {tutorial.progress > 0 ? (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Continue Learning
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Tutorial
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Paths Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Structured Learning Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <CardTitle>Beginner Path</CardTitle>
                    <CardDescription>Start your security journey</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Perfect for developers new to Web3 security. Learn fundamentals and basic audit techniques.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Smart Contract Basics
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Common Vulnerabilities
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Basic Audit Tools
                  </div>
                </div>
                <Button variant="outline" className="w-full">Start Path</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Shield className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle>Advanced Path</CardTitle>
                    <CardDescription>Master complex security patterns</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  For experienced developers ready to tackle DeFi, L2, and advanced security concepts.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    DeFi Security Patterns
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Layer 2 Architecture
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-500" />
                    Cross-chain Security
                  </div>
                </div>
                <Button variant="outline" className="w-full">Start Path</Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-red-200">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Zap className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle>AI Security Path</CardTitle>
                    <CardDescription>Cutting-edge AI-powered security</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Learn to leverage AI tools for automated security analysis and advanced threat detection.
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    AI-powered Analysis
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    Machine Learning Detection
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-red-500" />
                    Automated Auditing
                  </div>
                </div>
                <Button variant="outline" className="w-full">Start Path</Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Ready to Test Your Skills?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Apply your knowledge with hands-on challenges or start earning by providing security services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/challenges">
              <Button size="lg">
                <Trophy className="mr-2 h-4 w-4" />
                Take Security Challenge
              </Button>
            </Link>
            <Link to="/service-provider-onboarding">
              <Button size="lg" variant="outline">
                Become Security Expert
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Tutorials;
