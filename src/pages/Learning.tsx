import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard, SecurityBadge } from '@/components/ui/hawkly-components';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';

import {
  BookOpen,
  Search,
  Filter,
  ChevronDown,
  Check,
  Clock,
  Star,
  Medal,
  Trophy,
  Play,
  Sparkles,
  Brain,
  Target,
  Code,
  Shield,
  AlertTriangle,
  Users,
  Layers,
  Terminal,
  Flame,
  TrendingUp,
  Zap,
  Hash,
  Database,
  Network,
  GraduationCap,
  BarChart3,
  ChevronRight,
  MessageSquare,
  HeartHandshake,
  Award,
  ExternalLink,
  FileText,
  Calendar
} from 'lucide-react';

// Custom icon aliases
// Custom icon aliases
const Lock = Shield;
const Image = Award;

// Define interfaces for the learning content
interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  duration: number; // in hours
  lessons: number;
  enrolled: number;
  progress?: number;
  instructor: string;
  rating: number;
  tags: string[];
  category: string;
  featured?: boolean;
  certifiable?: boolean;
  image?: string;
  icon: React.ElementType;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'article' | 'video' | 'guide' | 'documentation';
  author: string;
  date: string;
  readTime?: number;
  url: string;
  tags: string[];
  featured?: boolean;
  image?: string;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: number;
  duration: number; // in hours
  level: 'beginner' | 'intermediate' | 'advanced' | 'mixed';
  progress?: number;
  image?: string;
  category: string;
  color: string;
}

// Mock data for learning content
const featuredCourses: Course[] = [
  {
    id: 'c1',
    title: 'Smart Contract Vulnerability Analysis',
    description: 'Learn to identify and mitigate common smart contract vulnerabilities.',
    level: 'intermediate',
    duration: 12,
    lessons: 24,
    enrolled: 1243,
    instructor: 'Alex Thompson',
    rating: 4.9,
    tags: ['Solidity', 'Security', 'Vulnerabilities'],
    category: 'Security',
    featured: true,
    certifiable: true,
    icon: Shield
  },
  {
    id: 'c2',
    title: 'Web3 Security Fundamentals',
    description: 'Essential security concepts every Web3 developer should know.',
    level: 'beginner',
    duration: 8,
    lessons: 16,
    enrolled: 3450,
    instructor: 'Maria Rodriguez',
    rating: 4.8,
    tags: ['Security', 'Fundamentals', 'Web3'],
    category: 'Security',
    featured: true,
    icon: Lock
  },
  {
    id: 'c3',
    title: 'Advanced DeFi Protocol Auditing',
    description: 'Deep dive into auditing complex DeFi protocols and lending markets.',
    level: 'expert',
    duration: 15,
    lessons: 30,
    enrolled: 876,
    instructor: 'Satoshi Wong',
    rating: 4.9,
    tags: ['DeFi', 'Auditing', 'Advanced'],
    category: 'DeFi',
    featured: true,
    certifiable: true,
    icon: TrendingUp
  },
  {
    id: 'c4',
    title: 'NFT Security and Exploits',
    description: 'Understanding NFT security issues and how to prevent common exploits.',
    level: 'intermediate',
    duration: 6,
    lessons: 12,
    enrolled: 1589,
    instructor: 'Elena Bright',
    rating: 4.7,
    tags: ['NFT', 'Security', 'Exploits'],
    category: 'NFT',
    featured: true,
    icon: Image
  }
];

const recommendedCourses: Course[] = [
  {
    id: 'c5',
    title: 'Audit Report Writing Masterclass',
    description: 'Learn how to write professional and comprehensive audit reports.',
    level: 'intermediate',
    duration: 6,
    lessons: 12,
    enrolled: 890,
    instructor: 'David Chen',
    rating: 4.8,
    tags: ['Reports', 'Documentation', 'Communication'],
    category: 'Professional Skills',
    icon: FileText
  },
  {
    id: 'c6',
    title: 'Zero Knowledge Proofs in Blockchain',
    description: 'Understanding ZK proofs and their applications in blockchain security.',
    level: 'advanced',
    duration: 10,
    lessons: 20,
    enrolled: 567,
    instructor: 'Zoe Nakamoto',
    rating: 4.9,
    tags: ['ZK Proofs', 'Privacy', 'Cryptography'],
    category: 'Cryptography',
    icon: Lock
  },
  {
    id: 'c7',
    title: 'Solidity Security Patterns',
    description: 'Best practices and patterns for writing secure Solidity code.',
    level: 'intermediate',
    duration: 8,
    lessons: 16,
    progress: 35,
    enrolled: 2350,
    instructor: 'Mark Stevens',
    rating: 4.7,
    tags: ['Solidity', 'Patterns', 'Best Practices'],
    category: 'Development',
    icon: Code
  }
];

const popularPaths: LearningPath[] = [
  {
    id: 'p1',
    title: 'Security Auditor Certification',
    description: 'Comprehensive path to become a certified blockchain security auditor',
    courses: 5,
    duration: 45,
    level: 'mixed',
    progress: 22,
    category: 'Certification',
    color: 'from-blue-600 to-purple-600'
  },
  {
    id: 'p2',
    title: 'DeFi Security Specialist',
    description: 'Master the security aspects of DeFi protocols and yield farms',
    courses: 4,
    duration: 32,
    level: 'advanced',
    category: 'DeFi',
    color: 'from-green-600 to-emerald-600'
  },
  {
    id: 'p3',
    title: 'Smart Contract Developer Security',
    description: 'Security-first approach to smart contract development',
    courses: 6,
    duration: 40,
    level: 'intermediate',
    category: 'Development',
    color: 'from-amber-600 to-orange-600'
  }
];

const latestResources: Resource[] = [
  {
    id: 'r1',
    title: 'Understanding Reentrancy Attacks in 2025',
    description: 'A comprehensive guide to reentrancy vulnerabilities with real-world examples.',
    type: 'article',
    author: 'Security Team',
    date: '2025-07-15',
    readTime: 12,
    url: '/resources/reentrancy-attacks-2025',
    tags: ['Reentrancy', 'Vulnerabilities', 'Case Study'],
    featured: true
  },
  {
    id: 'r2',
    title: 'Analyzing the CryptoVault Hack',
    description: 'Breaking down the $45M exploit of the CryptoVault protocol.',
    type: 'video',
    author: 'Alex Thompson',
    date: '2025-07-10',
    url: '/resources/cryptovault-hack-analysis',
    tags: ['Hack Analysis', 'DeFi', 'Exploit'],
  },
  {
    id: 'r3',
    title: 'Security Best Practices for Cross-Chain Bridges',
    description: 'How to prevent the most common vulnerabilities in blockchain bridges.',
    type: 'guide',
    author: 'Bridge Security Guild',
    date: '2025-07-05',
    readTime: 20,
    url: '/resources/cross-chain-bridge-security',
    tags: ['Bridges', 'Cross-Chain', 'Best Practices'],
  }
];

// Mock categories for filters
const categories = [
  { name: 'Security', count: 42 },
  { name: 'DeFi', count: 28 },
  { name: 'NFT', count: 16 },
  { name: 'Development', count: 31 },
  { name: 'Cryptography', count: 14 },
  { name: 'Professional Skills', count: 12 },
  { name: 'Certification', count: 8 }
];

const levels = [
  { name: 'Beginner', count: 26 },
  { name: 'Intermediate', count: 42 },
  { name: 'Advanced', count: 30 },
  { name: 'Expert', count: 12 }
];

// Component for rendering a course card
const CourseCard = ({ course }: { course: Course }) => {
  return (
    <HawklyCard 
      variant="glass" 
      elevation="subtle" 
      glow={course.featured} 
      className="h-full transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div className="h-12 w-12 rounded-lg bg-slate-800/60 flex items-center justify-center">
            {React.createElement(course.icon, { className: "h-6 w-6 text-blue-400" })}
          </div>
          <div>
            <Badge 
              className={course.level === 'beginner' ? 'bg-green-600' : 
                course.level === 'intermediate' ? 'bg-blue-600' : 
                course.level === 'advanced' ? 'bg-amber-600' : 'bg-red-600'}
            >
              {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
            </Badge>
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-100 mb-2">{course.title}</h3>
        <p className="text-sm text-slate-300 mb-4 flex-1">{course.description}</p>
        
        <div className="space-y-4 mt-auto">
          {course.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span>{course.progress}%</span>
              </div>
              <Progress value={course.progress} className="h-1" indicatorClassName="bg-blue-500" />
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 mt-2">
            {course.tags.map(tag => (
              <Badge key={tag} variant="outline" className="bg-slate-800/50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-between pt-2 text-sm">
            <div className="flex items-center text-slate-300">
              <Clock className="h-3 w-3 mr-1" />
              <span>{course.duration} hours</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Users className="h-3 w-3 mr-1" />
              <span>{course.enrolled.toLocaleString()}</span>
            </div>
            <div className="flex items-center text-yellow-400">
              <Star className="h-3 w-3 mr-1 fill-yellow-400" />
              <span>{course.rating}</span>
            </div>
          </div>
          
          <Button className="w-full mt-4" variant="default">
            {course.progress !== undefined ? 'Continue' : 'Enroll Now'}
          </Button>
        </div>
      </div>
    </HawklyCard>
  );
};

// Component for rendering a learning path card
const LearningPathCard = ({ path }: { path: LearningPath }) => {
  return (
    <HawklyCard 
      variant="glass" 
      elevation="subtle" 
      className="h-full transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="mb-4">
          <div className={`h-2 w-20 rounded-full bg-gradient-to-r ${path.color}`}></div>
        </div>
        
        <h3 className="text-lg font-bold text-slate-100 mb-2">{path.title}</h3>
        <p className="text-sm text-slate-300 mb-4 flex-1">{path.description}</p>
        
        <div className="space-y-4 mt-auto">
          {path.progress !== undefined && (
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progress</span>
                <span>{path.progress}%</span>
              </div>
              <Progress 
                value={path.progress} 
                className="h-1" 
                indicatorClassName={`bg-gradient-to-r ${path.color}`} 
              />
            </div>
          )}
          
          <div className="flex items-center justify-between pt-2 text-sm">
            <div className="flex items-center text-slate-300">
              <BookOpen className="h-3 w-3 mr-1" />
              <span>{path.courses} Courses</span>
            </div>
            <div className="flex items-center text-slate-300">
              <Clock className="h-3 w-3 mr-1" />
              <span>{path.duration} hours</span>
            </div>
            <Badge variant="outline" className="bg-slate-800/50 text-xs">
              {path.level.charAt(0).toUpperCase() + path.level.slice(1)}
            </Badge>
          </div>
          
          <Button 
            className="w-full mt-4" 
            variant="default"
            style={{
              background: `linear-gradient(to right, ${path.color.replace('from-', '').replace(' to-', ', ')})`
            }}
          >
            View Path
          </Button>
        </div>
      </div>
    </HawklyCard>
  );
};

// Component for rendering a resource card
const ResourceCard = ({ resource }: { resource: Resource }) => {
  const getIcon = () => {
    switch (resource.type) {
      case 'article':
        return <FileText className="h-5 w-5 text-blue-400" />;
      case 'video':
        return <Play className="h-5 w-5 text-red-400" />;
      case 'guide':
        return <BookOpen className="h-5 w-5 text-green-400" />;
      case 'documentation':
        return <Code className="h-5 w-5 text-amber-400" />;
      default:
        return <FileText className="h-5 w-5 text-blue-400" />;
    }
  };
  
  return (
    <HawklyCard 
      variant="glass" 
      elevation="subtle" 
      className="h-full transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-8 w-8 rounded-lg bg-slate-800/60 flex items-center justify-center">
            {getIcon()}
          </div>
          <Badge className="capitalize">{resource.type}</Badge>
        </div>
        
        <h3 className="text-md font-bold text-slate-100 mb-1">{resource.title}</h3>
        <p className="text-xs text-slate-300 mb-3 line-clamp-2 flex-1">{resource.description}</p>
        
        <div className="flex flex-wrap gap-1 mt-2">
          {resource.tags.slice(0, 2).map(tag => (
            <Badge key={tag} variant="outline" className="bg-slate-800/50 text-xs">
              {tag}
            </Badge>
          ))}
          {resource.tags.length > 2 && (
            <Badge variant="outline" className="bg-slate-800/50 text-xs">
              +{resource.tags.length - 2}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-3 text-xs text-slate-400 mt-auto">
          <div>{resource.author}</div>
          <div>
            {resource.readTime ? (
              <span>{resource.readTime} min read</span>
            ) : (
              <span>{resource.date}</span>
            )}
          </div>
        </div>
        
        <Button className="w-full mt-3" variant="outline" size="sm" asChild>
          <a href={resource.url}>
            Read More
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </Button>
      </div>
    </HawklyCard>
  );
};

// Learning.tsx - Main component
const Learning = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // This would normally come from a user context or API
  const userRole = 'auditor';
  const userName = 'Alex';
  
  // Filter handling - this would be more robust in a real implementation
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementation would filter content based on search query
  };
  
  return (
    <ProductionLayout
      title="Learning Center | Hawkly"
      description="Comprehensive security learning resources, courses, and certifications for blockchain auditors"
    >
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
<SecurityBadge level="enterprise" verified={true} animated={true} size="lg" />
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
                  Learning Center
                </h1>
              </div>
              <p className="text-slate-300 max-w-2xl">
                Enhance your security skills with comprehensive courses, tutorials, and resources designed for blockchain auditors.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="relative w-full lg:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
                <Input
                  placeholder="Search courses, resources..."
                  className="pl-8 w-full lg:w-[250px] bg-slate-800/50 border-slate-700"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </form>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <Filter className="h-4 w-4" />
                {showFilters && (
                  <div className="absolute right-0 top-full mt-2 w-64 p-4 bg-slate-900 border border-slate-700 rounded-lg shadow-lg z-50">
                    <h4 className="text-sm font-semibold mb-2">Categories</h4>
                    <div className="space-y-1 mb-3">
                      {categories.slice(0, 4).map(category => (
                        <div key={category.name} className="flex items-center">
                          <input type="checkbox" id={category.name} className="mr-2" />
                          <label htmlFor={category.name} className="text-xs flex-1">{category.name}</label>
                          <span className="text-xs text-slate-500">{category.count}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="text-sm font-semibold mb-2">Level</h4>
                    <div className="space-y-1">
                      {levels.map(level => (
                        <div key={level.name} className="flex items-center">
                          <input type="checkbox" id={level.name} className="mr-2" />
                          <label htmlFor={level.name} className="text-xs flex-1">{level.name}</label>
                          <span className="text-xs text-slate-500">{level.count}</span>
                        </div>
                      ))}
                    </div>
                    
                    <Button className="w-full mt-4" size="sm">
                      Apply Filters
                    </Button>
                  </div>
                )}
              </Button>
            </div>
          </div>
        </div>
        
        {/* Personalized Welcome Card */}
        <HawklyCard 
          variant="glass" 
          elevation="subtle" 
          glow={true} 
          className="mb-8 overflow-hidden"
        >
          <div className="p-6 md:p-8 relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl -ml-24 -mb-24"></div>
            
            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 text-slate-50">Welcome back, {userName}</h2>
                <p className="text-slate-300 mb-4">
                  Continue your learning journey and keep building your security expertise. Your profile shows strong progress in DeFi security concepts.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Continue Learning
                  </Button>
                  <Button variant="outline">
                    View Your Progress
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-800/40 rounded-lg p-5">
                <h3 className="text-md font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-400" />
                  Your Learning Stats
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-blue-400">3</div>
                    <div className="text-xs text-slate-400">Courses In Progress</div>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-green-400">5</div>
                    <div className="text-xs text-slate-400">Courses Completed</div>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-purple-400">124</div>
                    <div className="text-xs text-slate-400">Hours Learned</div>
                  </div>
                  <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                    <div className="text-xl font-bold text-amber-400">2</div>
                    <div className="text-xs text-slate-400">Certifications</div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Overall Progress</span>
                      <span className="text-blue-400">68%</span>
                    </div>
                    <Progress value={68} className="h-1" indicatorClassName="bg-blue-500" />
                  </div>
                  
                  <div className="text-xs text-slate-400 flex items-center mt-3">
                    <Award className="h-3 w-3 mr-1 text-yellow-400" />
                    <span>Next milestone: Advanced DeFi Security Certification</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HawklyCard>
        
        {/* Main Content Tabs */}
        <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-4">
            <TabsList className="bg-slate-800/60">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="paths">Learning Paths</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="certifications">Certifications</TabsTrigger>
            </TabsList>
          </div>
          
          {/* All Tab */}
          <TabsContent value="all" className="space-y-8">
            {/* Featured Courses */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Featured Courses
                </h2>
                <Button variant="ghost" className="text-sm gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {featuredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
            
            {/* Learning Paths */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Popular Learning Paths
                </h2>
                <Button variant="ghost" className="text-sm gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {popularPaths.map(path => (
                  <LearningPathCard key={path.id} path={path} />
                ))}
              </div>
            </section>
            
            {/* Recommended Courses */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Recommended For You
                </h2>
                <Button variant="ghost" className="text-sm gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </section>
            
            {/* Latest Resources */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Latest Security Resources
                </h2>
                <Button variant="ghost" className="text-sm gap-1">
                  View all <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestResources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </section>
          </TabsContent>
          
          {/* Courses Tab */}
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <HawklyCard variant="glass" elevation="subtle" className="p-4">
                  <h3 className="text-lg font-semibold mb-4">Filter Courses</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Categories</h4>
                      <div className="space-y-1">
                        {categories.map(category => (
                          <div key={category.name} className="flex items-center">
                            <input type="checkbox" id={`cat-${category.name}`} className="mr-2" />
                            <label htmlFor={`cat-${category.name}`} className="text-sm flex-1">{category.name}</label>
                            <span className="text-xs text-slate-500">{category.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Level</h4>
                      <div className="space-y-1">
                        {levels.map(level => (
                          <div key={level.name} className="flex items-center">
                            <input type="checkbox" id={`lvl-${level.name}`} className="mr-2" />
                            <label htmlFor={`lvl-${level.name}`} className="text-sm flex-1">{level.name}</label>
                            <span className="text-xs text-slate-500">{level.count}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="text-sm font-medium mb-2">Duration</h4>
                      <div className="space-y-1">
                        <div className="flex items-center">
                          <input type="checkbox" id="duration-1" className="mr-2" />
                          <label htmlFor="duration-1" className="text-sm">Under 5 hours</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="duration-2" className="mr-2" />
                          <label htmlFor="duration-2" className="text-sm">5-10 hours</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="duration-3" className="mr-2" />
                          <label htmlFor="duration-3" className="text-sm">10-20 hours</label>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" id="duration-4" className="mr-2" />
                          <label htmlFor="duration-4" className="text-sm">20+ hours</label>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">Apply Filters</Button>
                  </div>
                </HawklyCard>
              </div>
              
              <div className="md:col-span-9">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">All Courses</h2>
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      All Topics
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Security
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Smart Contracts
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      DeFi
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      NFT
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Cryptography
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...featuredCourses, ...recommendedCourses].map(course => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline">
                    Load More Courses
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Learning Paths Tab */}
          <TabsContent value="paths">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Learning Paths</h2>
              <p className="text-slate-300 mb-6">
                Structured learning journeys to help you master specific areas of blockchain security and advance your career.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[...popularPaths, {
                  id: 'p4',
                  title: 'NFT & Gaming Security',
                  description: 'Security considerations for NFTs, marketplaces, and blockchain gaming',
                  courses: 5,
                  duration: 35,
                  level: 'intermediate',
                  category: 'NFT',
                  color: 'from-purple-600 to-indigo-600'
                }, {
                  id: 'p5',
                  title: 'Blockchain Cryptography Expert',
                  description: 'Deep dive into cryptographic foundations of blockchain security',
                  courses: 7,
                  duration: 55,
                  level: 'expert',
                  category: 'Cryptography',
                  color: 'from-red-600 to-pink-600'
                }, {
                  id: 'p6',
                  title: 'Security Team Leadership',
                  description: 'Leadership and management skills for security team leads',
                  courses: 4,
                  duration: 30,
                  level: 'advanced',
                  category: 'Professional Skills',
                  color: 'from-cyan-600 to-blue-600'
                }].map(path => (
<LearningPathCard key={path.id} path={path as LearningPath} />
                ))}
              </div>
            </div>
          </TabsContent>
          
          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <HawklyCard variant="glass" elevation="subtle" className="p-4 sticky top-24">
                  <h3 className="text-lg font-semibold mb-4">Resource Types</h3>
                  
                  <div className="space-y-1 mb-6">
                    <div className="flex items-center">
                      <input type="checkbox" id="type-articles" className="mr-2" checked readOnly />
                      <label htmlFor="type-articles" className="text-sm flex-1">Articles</label>
                      <span className="text-xs text-slate-500">32</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="type-videos" className="mr-2" checked readOnly />
                      <label htmlFor="type-videos" className="text-sm flex-1">Videos</label>
                      <span className="text-xs text-slate-500">18</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="type-guides" className="mr-2" checked readOnly />
                      <label htmlFor="type-guides" className="text-sm flex-1">Guides</label>
                      <span className="text-xs text-slate-500">24</span>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="type-docs" className="mr-2" checked readOnly />
                      <label htmlFor="type-docs" className="text-sm flex-1">Documentation</label>
                      <span className="text-xs text-slate-500">16</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Topics</h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Vulnerabilities
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Case Studies
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Best Practices
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Tool Guides
                    </Badge>
                    <Badge variant="outline" className="bg-slate-800/50 cursor-pointer">
                      Auditing
                    </Badge>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-4">Community Resources</h3>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-between text-left" asChild>
                      <a href="#">
                        <span>Security Forum</span>
                        <MessageSquare className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-between text-left" asChild>
                      <a href="#">
                        <span>Knowledge Base</span>
                        <BookOpen className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full justify-between text-left" asChild>
                      <a href="#">
                        <span>Security Discord</span>
                        <HeartHandshake className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </HawklyCard>
              </div>
              
              <div className="md:col-span-9">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Security Resources</h2>
                  <p className="text-slate-300 mb-6">
                    Browse our extensive collection of security resources including articles, videos, guides, and documentation.
                  </p>
                </div>
                
                <div className="space-y-8">
                  <section>
                    <h3 className="text-xl font-bold mb-4">Featured Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {latestResources.map(resource => (
<ResourceCard key={resource.id} resource={resource as Resource} />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold mb-4">Recent Vulnerability Reports</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'r4',
                          title: 'Unchecked Return Values Vulnerability',
                          description: 'How ignoring return values can lead to critical security exploits.',
                          type: 'article' as 'article',
                          author: 'Security Research Team',
                          date: '2025-07-01',
                          readTime: 15,
                          url: '/resources/unchecked-return-values',
                          tags: ['Smart Contracts', 'Common Pitfalls', 'Code Review'],
                          // removed duplicate type
                        },
                        {
                          id: 'r5',
                          title: 'Price Manipulation in Oracle Systems',
                          description: 'Understanding and preventing flash loan attacks targeting oracle systems.',
                          type: 'video' as 'video',
                          author: 'DeFi Security Working Group',
                          date: '2025-06-28',
                          readTime: 12,
                          url: '/resources/oracle-manipulation',
                          tags: ['DeFi', 'Oracles', 'Flash Loans'],
                        },
                        {
                          id: 'r6',
                          title: 'Access Control Best Practices',
                          description: 'Implementing robust access control in smart contracts.',
                          type: 'guide' as 'guide',
                          author: 'Access Control Team',
                          date: '2025-06-25',
                          readTime: 10,
                          url: '/resources/access-control-best-practices',
                          tags: ['Access Control', 'Best Practices', 'Security'],
                          // removed duplicate type
                        }
                      ].map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </section>
                  
                  <section>
                    <h3 className="text-xl font-bold mb-4">Security Tool Guides</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          id: 'r7',
                          title: 'Effective Static Analysis with Slither',
                          description: 'Complete guide to using Slither for static analysis of smart contracts.',
                          type: 'guide' as 'guide',
                          author: 'Tool Experts Team',
                          date: '2025-06-20',
                          readTime: 18,
                          url: '/resources/slither-guide',
                          tags: ['Tools', 'Static Analysis', 'Slither'],
                        },
                        {
                          id: 'r8',
                          title: 'Fuzzing Smart Contracts with Echidna',
                          description: 'How to use Echidna to find vulnerabilities through fuzzing techniques.',
                          type: 'video' as 'video',
                          author: 'Security Tool Team',
                          date: '2025-06-15',
                          readTime: 14,
                          url: '/resources/echidna-fuzzing',
                          tags: ['Tools', 'Fuzzing', 'Echidna'],
                        },
                        {
                          id: 'r9',
                          title: 'Symbolic Execution with Mythril',
                          description: 'Comprehensive guide to symbolic execution using Mythril.',
                          type: 'guide' as 'guide',
                          author: 'Advanced Security Team',
                          date: '2025-06-10',
                          readTime: 22,
                          url: '/resources/mythril-symbolic-execution',
                          tags: ['Tools', 'Symbolic Execution', 'Mythril'],
                        }
                      ].map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </TabsContent>
          
          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Professional Certifications</h2>
              <p className="text-slate-300 mb-6">
                Earn industry-recognized credentials that validate your security expertise and enhance your professional profile.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {[
                  {
                    title: "Hawkly Certified Security Auditor",
                    description: "Our comprehensive certification program covering all aspects of smart contract auditing and blockchain security.",
                    level: "Professional",
                    duration: "100 hours",
                    exam: true,
                    recognition: "Industry Standard",
                    color: "from-blue-600 to-purple-600",
                    icon: Shield
                  },
                  {
                    title: "DeFi Security Specialist",
                    description: "Specialized certification focused on the unique security challenges of decentralized finance protocols.",
                    level: "Advanced",
                    duration: "80 hours",
                    exam: true,
                    recognition: "DeFi Industry",
                    color: "from-green-600 to-emerald-600",
                    icon: TrendingUp
                  }
                ].map((cert, index) => (
                  <HawklyCard 
                    key={index} 
                    variant="glass" 
                    elevation="subtle" 
                    className="overflow-hidden"
                  >
                    <div className="h-2 bg-gradient-to-r w-full" style={{
                      backgroundImage: `linear-gradient(to right, ${cert.color.replace('from-', '').replace(' to-', ', ')})`
                    }}></div>
                    <div className="p-6 flex flex-col md:flex-row gap-6">
                      <div className="h-16 w-16 rounded-lg bg-slate-800/60 flex items-center justify-center">
                        {React.createElement(cert.icon, { className: "h-8 w-8 text-blue-400" })}
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-100 mb-2">{cert.title}</h3>
                        <p className="text-slate-300 mb-4">{cert.description}</p>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-start gap-2">
                            <GraduationCap className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-slate-200">Level</div>
                              <div className="text-sm text-slate-400">{cert.level}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Clock className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-slate-200">Duration</div>
                              <div className="text-sm text-slate-400">{cert.duration}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <FileText className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-slate-200">Exam</div>
                              <div className="text-sm text-slate-400">{cert.exam ? 'Required' : 'Not Required'}</div>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Award className="h-4 w-4 text-slate-400 mt-0.5" />
                            <div>
                              <div className="text-sm font-medium text-slate-200">Recognition</div>
                              <div className="text-sm text-slate-400">{cert.recognition}</div>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          className="w-full md:w-auto" 
                          style={{
                            background: `linear-gradient(to right, ${cert.color.replace('from-', '').replace(' to-', ', ')})`
                          }}
                        >
                          View Certification
                        </Button>
                      </div>
                    </div>
                  </HawklyCard>
                ))}
              </div>
              
              <h3 className="text-xl font-bold mb-4">Specialized Certifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "NFT Security Expert",
                    description: "Specialized knowledge of NFT marketplace and collection security.",
                    hours: 40,
                    icon: Image,
                    color: "bg-purple-600"
                  },
                  {
                    title: "Cross-Chain Bridge Security",
                    description: "Security considerations for cross-chain bridge protocols.",
                    hours: 35,
                    icon: Network,
                    color: "bg-blue-600"
                  },
                  {
                    title: "Secure Smart Contract Developer",
                    description: "Security-first approach to smart contract development.",
                    hours: 45,
                    icon: Code,
                    color: "bg-amber-600"
                  },
                  {
                    title: "Security Tooling Expert",
                    description: "Mastery of security analysis tools and frameworks.",
                    hours: 30,
                    icon: Terminal,
                    color: "bg-red-600"
                  },
                  {
                    title: "ZK Protocol Security",
                    description: "Security aspects of zero-knowledge proof systems.",
                    hours: 50,
                    icon: Lock,
                    color: "bg-green-600"
                  },
                  {
                    title: "DAO Security Specialist",
                    description: "Governance and security for decentralized autonomous organizations.",
                    hours: 35,
                    icon: Users,
                    color: "bg-cyan-600"
                  }
                ].map((cert, index) => (
                  <HawklyCard 
                    key={index} 
                    variant="glass" 
                    elevation="subtle" 
                    className="p-6 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`h-10 w-10 rounded-lg ${cert.color} flex items-center justify-center`}>
                        {React.createElement(cert.icon, { className: "h-5 w-5 text-white" })}
                      </div>
                      <h3 className="font-bold text-slate-100">{cert.title}</h3>
                    </div>
                    <p className="text-sm text-slate-300 mb-3">{cert.description}</p>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-slate-400">
                        <Clock className="h-3 w-3 inline mr-1" />
                        {cert.hours} hours
                      </div>
                      <Button variant="outline" size="sm">Details</Button>
                    </div>
                  </HawklyCard>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Community Learning Section */}
        <section className="pt-8">
          <HawklyCard 
            variant="glass" 
            elevation="subtle" 
            className="p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Join the Security Community
                </h2>
                <p className="text-slate-300 mb-6">
                  Connect with fellow security professionals, share knowledge, and participate in collaborative learning opportunities.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800/60 flex items-center justify-center mt-1">
                      <Users className="h-5 w-5 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Discussion Forums</h4>
                      <p className="text-sm text-slate-400">
                        Engage in technical discussions and share insights with the security community.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800/60 flex items-center justify-center mt-1">
                      <Layers className="h-5 w-5 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Study Groups</h4>
                      <p className="text-sm text-slate-400">
                        Join focused study groups tackling specific security topics and challenges.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-slate-800/60 flex items-center justify-center mt-1">
                      <Flame className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Security Challenges</h4>
                      <p className="text-sm text-slate-400">
                        Test your skills with practical security challenges and CTF competitions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
                    Join Community
                  </Button>
                </div>
              </div>
              
              <div className="bg-slate-800/40 rounded-lg p-5">
                <h3 className="text-lg font-bold mb-4">Upcoming Events</h3>
                
                <ScrollArea className="h-64 pr-4">
                  <div className="space-y-4">
                    {[
                      {
                        title: "Advanced Vulnerability Analysis Workshop",
                        date: "August 10, 2025",
                        time: "10:00 AM - 2:00 PM UTC",
                        instructor: "Alex Thompson",
                        type: "Workshop"
                      },
                      {
                        title: "Security Research Presentation: Zero-Day Exploits",
                        date: "August 15, 2025",
                        time: "3:00 PM - 4:30 PM UTC",
                        instructor: "Maria Rodriguez",
                        type: "Webinar"
                      },
                      {
                        title: "Monthly Security Challenge: Find the Vulnerability",
                        date: "August 20-22, 2025",
                        time: "48 hours",
                        instructor: "Security Team",
                        type: "Challenge"
                      },
                      {
                        title: "Secure Code Review Best Practices",
                        date: "August 25, 2025",
                        time: "11:00 AM - 12:30 PM UTC",
                        instructor: "David Chen",
                        type: "Training"
                      }
                    ].map((event, index) => (
                      <HawklyCard 
                        key={index} 
                        variant="glass" 
                        elevation="subtle" 
                        className="p-4"
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-semibold text-slate-200">{event.title}</h4>
                          <Badge>{event.type}</Badge>
                        </div>
                        <div className="text-sm text-slate-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{event.time}</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-slate-500">By {event.instructor}</span>
                          <Button variant="outline" size="sm">Register</Button>
                        </div>
                      </HawklyCard>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            </div>
          </HawklyCard>
        </section>
      </div>
    </ProductionLayout>
  );
};


export default Learning;
