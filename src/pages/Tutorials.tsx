
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  Search, 
  BookOpen, 
  CheckCircle,
  TrendingUp,
  Filter
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'smart-contracts', name: 'Smart Contracts' },
    { id: 'defi', name: 'DeFi Security' },
    { id: 'auditing', name: 'Security Auditing' },
    { id: 'tools', name: 'Security Tools' }
  ];

  const difficulties = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const featuredTutorials = [
    {
      id: '1',
      title: 'Complete Smart Contract Security Audit Course',
      slug: 'complete-smart-contract-audit-course',
      description: 'Learn end-to-end smart contract auditing with hands-on examples and real-world case studies.',
      instructor: {
        name: 'Dr. Sarah Chen',
        avatar: null,
        title: 'Senior Security Researcher'
      },
      duration: 240,
      difficulty: 'intermediate',
      category: 'auditing',
      rating: 4.8,
      studentCount: 1247,
      completionRate: 85,
      videoUrl: 'https://example.com/video1',
      thumbnail: null,
      isCompleted: false,
      progress: 0,
      isFeatured: true,
      prerequisites: ['Basic Solidity knowledge', 'Understanding of blockchain concepts'],
      learningObjectives: [
        'Identify common smart contract vulnerabilities',
        'Use professional auditing tools',
        'Write comprehensive audit reports'
      ]
    },
    {
      id: '2',
      title: 'DeFi Security Best Practices',
      slug: 'defi-security-best-practices',
      description: 'Comprehensive guide to securing DeFi protocols against common attack vectors.',
      instructor: {
        name: 'Marcus Rodriguez',
        avatar: null,
        title: 'DeFi Security Expert'
      },
      duration: 180,
      difficulty: 'advanced',
      category: 'defi',
      rating: 4.9,
      studentCount: 892,
      completionRate: 78,
      videoUrl: 'https://example.com/video2',
      thumbnail: null,
      isCompleted: false,
      progress: 0,
      isFeatured: true,
      prerequisites: ['Advanced Solidity', 'DeFi protocol understanding'],
      learningObjectives: [
        'Implement secure DeFi patterns',
        'Prevent flash loan attacks',
        'Design robust governance mechanisms'
      ]
    }
  ];

  const tutorials = [
    {
      id: '3',
      title: 'Introduction to Web3 Security',
      slug: 'intro-web3-security',
      description: 'Get started with Web3 security fundamentals and basic concepts.',
      instructor: {
        name: 'Alex Kim',
        avatar: null,
        title: 'Security Engineer'
      },
      duration: 90,
      difficulty: 'beginner',
      category: 'smart-contracts',
      rating: 4.6,
      studentCount: 2156,
      completionRate: 92,
      videoUrl: 'https://example.com/video3',
      thumbnail: null,
      isCompleted: true,
      progress: 100,
      isFeatured: false,
      prerequisites: [],
      learningObjectives: [
        'Understand blockchain security basics',
        'Recognize common vulnerabilities',
        'Set up security testing environment'
      ]
    },
    {
      id: '4',
      title: 'Advanced Solidity Security Patterns',
      slug: 'advanced-solidity-patterns',
      description: 'Master advanced security patterns and defensive programming techniques.',
      instructor: {
        name: 'Emma Thompson',
        avatar: null,
        title: 'Blockchain Architect'
      },
      duration: 150,
      difficulty: 'advanced',
      category: 'smart-contracts',
      rating: 4.7,
      studentCount: 567,
      completionRate: 73,
      videoUrl: 'https://example.com/video4',
      thumbnail: null,
      isCompleted: false,
      progress: 45,
      isFeatured: false,
      prerequisites: ['Intermediate Solidity', 'Smart contract development experience'],
      learningObjectives: [
        'Implement secure design patterns',
        'Use access control mechanisms',
        'Optimize for gas and security'
      ]
    }
  ];

  const allTutorials = [...featuredTutorials, ...tutorials];

  const filteredTutorials = allTutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <StandardLayout
      title="Security Tutorials"
      description="Learn Web3 security through comprehensive video tutorials and hands-on exercises"
    >
      <div className="space-y-8">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Security Tutorials</h1>
            <p className="text-muted-foreground">
              Master Web3 security through expert-led tutorials and practical exercises
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search tutorials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            {difficulties.map(diff => (
              <option key={diff.id} value={diff.id}>{diff.name}</option>
            ))}
          </select>
        </div>

        {/* Featured Tutorials */}
        {selectedCategory === 'all' && selectedDifficulty === 'all' && !searchTerm && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Courses
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                      <Badge className={getDifficultyColor(tutorial.difficulty)}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link 
                        to={`/tutorials/${tutorial.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {tutorial.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{tutorial.description}</p>
                    
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={tutorial.instructor.avatar} />
                        <AvatarFallback>{tutorial.instructor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{tutorial.instructor.name}</div>
                        <div className="text-xs text-muted-foreground">{tutorial.instructor.title}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {formatDuration(tutorial.duration)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {tutorial.studentCount} students
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-current text-yellow-500" />
                        {tutorial.rating}
                      </span>
                    </div>

                    {tutorial.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{tutorial.progress}%</span>
                        </div>
                        <Progress value={tutorial.progress} className="h-2" />
                      </div>
                    )}

                    <Link to={`/tutorials/${tutorial.slug}`}>
                      <Button className="w-full">
                        {tutorial.isCompleted ? (
                          <>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : tutorial.progress > 0 ? (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Continue Learning
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start Learning
                          </>
                        )}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Tutorials */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            All Tutorials ({filteredTutorials.length})
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTutorials.map((tutorial) => (
              <Card key={tutorial.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge className={getDifficultyColor(tutorial.difficulty)}>
                      {tutorial.difficulty}
                    </Badge>
                    {tutorial.isFeatured && (
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">
                    <Link 
                      to={`/tutorials/${tutorial.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {tutorial.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">{tutorial.description}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={tutorial.instructor.avatar} />
                      <AvatarFallback className="text-xs">{tutorial.instructor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm text-muted-foreground">{tutorial.instructor.name}</div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDuration(tutorial.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {tutorial.studentCount}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current text-yellow-500" />
                      {tutorial.rating}
                    </span>
                  </div>

                  {tutorial.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progress</span>
                        <span>{tutorial.progress}%</span>
                      </div>
                      <Progress value={tutorial.progress} className="h-1" />
                    </div>
                  )}

                  <Link to={`/tutorials/${tutorial.slug}`}>
                    <Button className="w-full" size="sm">
                      {tutorial.isCompleted ? (
                        <>
                          <CheckCircle className="h-3 w-3 mr-2" />
                          Review
                        </>
                      ) : tutorial.progress > 0 ? (
                        <>
                          <Play className="h-3 w-3 mr-2" />
                          Continue
                        </>
                      ) : (
                        <>
                          <Play className="h-3 w-3 mr-2" />
                          Start
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Learning Path Suggestion */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <TrendingUp className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4">Suggested Learning Path</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Follow our curated learning paths designed by security experts to take you from beginner to advanced levels systematically.
            </p>
            <div className="flex gap-4 justify-center">
              <Button>View Learning Paths</Button>
              <Button variant="outline">Track Progress</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default Tutorials;
