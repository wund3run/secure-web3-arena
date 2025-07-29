import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Search, 
  BookOpen, 
  Code, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Download,
  Video,
  FileText,
  Zap
} from 'lucide-react';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  format: 'Video' | 'Article' | 'Interactive';
  rating: number;
  enrollments: number;
  tags: string[];
  progress?: number;
  featured?: boolean;
  thumbnail?: string;
}

const tutorials: Tutorial[] = [
  {
    id: '1',
    title: 'Smart Contract Security Fundamentals',
    description: 'Learn the essential security principles for building secure smart contracts from scratch.',
    category: 'Security Basics',
    difficulty: 'Beginner',
    duration: '45 min',
    format: 'Video',
    rating: 4.9,
    enrollments: 2847,
    tags: ['Security', 'Smart Contracts', 'Solidity'],
    featured: true,
    progress: 0
  },
  {
    id: '2',
    title: 'Setting Up Your First Security Audit',
    description: 'Step-by-step guide to conducting your first professional security audit.',
    category: 'Audit Process',
    difficulty: 'Intermediate',
    duration: '1h 20min',
    format: 'Interactive',
    rating: 4.8,
    enrollments: 1923,
    tags: ['Auditing', 'Process', 'Tools'],
    featured: true,
    progress: 25
  },
  {
    id: '3',
    title: 'Advanced Vulnerability Detection',
    description: 'Master advanced techniques for identifying complex security vulnerabilities.',
    category: 'Advanced Security',
    difficulty: 'Advanced',
    duration: '2h 15min',
    format: 'Video',
    rating: 4.7,
    enrollments: 856,
    tags: ['Vulnerabilities', 'Detection', 'Analysis'],
    progress: 0
  },
  {
    id: '4',
    title: 'DeFi Protocol Security Analysis',
    description: 'Comprehensive guide to analyzing and securing DeFi protocols.',
    category: 'DeFi Security',
    difficulty: 'Advanced',
    duration: '1h 45min',
    format: 'Article',
    rating: 4.8,
    enrollments: 1247,
    tags: ['DeFi', 'Protocols', 'Security'],
    progress: 60
  },
  {
    id: '5',
    title: 'Gas Optimization Techniques',
    description: 'Learn how to optimize gas usage while maintaining security standards.',
    category: 'Optimization',
    difficulty: 'Intermediate',
    duration: '55 min',
    format: 'Interactive',
    rating: 4.6,
    enrollments: 1654,
    tags: ['Gas', 'Optimization', 'Performance'],
    progress: 100
  },
  {
    id: '6',
    title: 'Cross-Chain Security Best Practices',
    description: 'Security considerations for multi-chain and bridge applications.',
    category: 'Cross-Chain',
    difficulty: 'Advanced',
    duration: '1h 30min',
    format: 'Video',
    rating: 4.9,
    enrollments: 743,
    tags: ['Cross-Chain', 'Bridges', 'Security'],
    progress: 0
  }
];

const categories = [
  'All',
  'Security Basics',
  'Audit Process',
  'DeFi Security',
  'Advanced Security',
  'Optimization',
  'Cross-Chain'
];

const TutorialsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedFormat, setSelectedFormat] = useState('All');

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || tutorial.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tutorial.difficulty === selectedDifficulty;
    const matchesFormat = selectedFormat === 'All' || tutorial.format === selectedFormat;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesFormat;
  });

  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);
  const inProgressTutorials = tutorials.filter(tutorial => tutorial.progress && tutorial.progress > 0 && tutorial.progress < 100);
  const completedTutorials = tutorials.filter(tutorial => tutorial.progress === 100);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case 'Video': return Video;
      case 'Article': return FileText;
      case 'Interactive': return Zap;
      default: return BookOpen;
    }
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case 'Video': return 'text-red-600';
      case 'Article': return 'text-blue-600';
      case 'Interactive': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Security Tutorials
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Step-by-step tutorials to help you master Web3 security, from basic concepts 
            to advanced audit techniques.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search tutorials and guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hawkly-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hawkly-primary"
              >
                <option value="All">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <select
                value={selectedFormat}
                onChange={(e) => setSelectedFormat(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-hawkly-primary"
              >
                <option value="All">All Formats</option>
                <option value="Video">Video</option>
                <option value="Article">Article</option>
                <option value="Interactive">Interactive</option>
              </select>
            </div>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all">All Tutorials</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => {
                const FormatIcon = getFormatIcon(tutorial.format);
                return (
                  <Card key={tutorial.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className={getDifficultyColor(tutorial.difficulty)}>
                          {tutorial.difficulty}
                        </Badge>
                        <div className="flex items-center gap-1">
                          <FormatIcon className={`h-4 w-4 ${getFormatColor(tutorial.format)}`} />
                          <span className="text-xs text-gray-500">{tutorial.format}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {tutorial.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {tutorial.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {tutorial.enrollments.toLocaleString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          {tutorial.rating}
                        </div>
                      </div>

                      {tutorial.progress !== undefined && tutorial.progress > 0 && (
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{tutorial.progress}%</span>
                          </div>
                          <Progress value={tutorial.progress} className="h-2" />
                        </div>
                      )}
                      
                      <Button className="w-full" variant={tutorial.progress === 100 ? "outline" : "default"}>
                        {tutorial.progress === 100 ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Review
                          </>
                        ) : tutorial.progress && tutorial.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Tutorial
                          </>
                        )}
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <Badge variant="default" className="bg-hawkly-primary">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl">{tutorial.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {tutorial.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {tutorial.duration}
                        </span>
                        <Badge className={getDifficultyColor(tutorial.difficulty)}>
                          {tutorial.difficulty}
                        </Badge>
                      </div>
                      <Button>
                        <Play className="h-4 w-4 mr-2" />
                        Start Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="progress" className="mt-6">
            {inProgressTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgressTutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{tutorial.progress}% complete</span>
                      </div>
                      <Progress value={tutorial.progress} className="h-3 mb-4" />
                      <div className="flex justify-between items-center">
                        <Badge className={getDifficultyColor(tutorial.difficulty)}>
                          {tutorial.difficulty}
                        </Badge>
                        <Button>
                          <Play className="h-4 w-4 mr-2" />
                          Continue
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No tutorials in progress</h3>
                  <p className="text-gray-600 mb-4">Start a tutorial to see your progress here.</p>
                  <Button>Browse All Tutorials</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedTutorials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTutorials.map((tutorial) => (
                  <Card key={tutorial.id} className="hover:shadow-lg transition-shadow border-green-200">
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Completed
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{tutorial.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <Badge className={getDifficultyColor(tutorial.difficulty)}>
                          {tutorial.difficulty}
                        </Badge>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Certificate
                          </Button>
                          <Button variant="outline" size="sm">
                            Review
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-semibold mb-2">No completed tutorials</h3>
                  <p className="text-gray-600 mb-4">Complete tutorials to earn certificates and track your achievements.</p>
                  <Button>Start Learning</Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="paths" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Security Auditor Path',
                  description: 'Complete learning path to become a professional security auditor',
                  tutorials: 8,
                  duration: '12 hours',
                  level: 'Beginner to Advanced',
                  icon: Shield,
                  color: 'text-blue-600'
                },
                {
                  title: 'DeFi Security Specialist',
                  description: 'Master DeFi protocol security and become a specialist',
                  tutorials: 6,
                  duration: '8 hours',
                  level: 'Intermediate to Advanced',
                  icon: Code,
                  color: 'text-purple-600'
                }
              ].map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <path.icon className={`h-8 w-8 ${path.color}`} />
                      <div>
                        <CardTitle className="text-xl">{path.title}</CardTitle>
                        <p className="text-sm text-gray-600">{path.level}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {path.description}
                    </p>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{path.tutorials} tutorials</span>
                        <span>{path.duration}</span>
                      </div>
                    </div>
                    <Button className="w-full">
                      Start Learning Path
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Need Help Getting Started?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Our learning specialists can help you choose the right tutorials for your goals.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  Get Learning Guidance
                </Button>
                <Button className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Join Study Group
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductionLayout>
  );
};

export default TutorialsPage;
