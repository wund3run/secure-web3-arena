
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  Clock, 
  User, 
  Star, 
  Search,
  Filter,
  BookOpen,
  Code,
  Shield,
  Target,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const tutorials = [
    {
      id: 1,
      title: 'Smart Contract Security Fundamentals',
      description: 'Learn the basics of smart contract security, common vulnerabilities, and best practices',
      duration: '45 min',
      difficulty: 'beginner',
      rating: 4.8,
      students: 1200,
      category: 'smart-contracts',
      lessons: 8,
      thumbnail: '/lovable-uploads/315b0088-3d48-449e-bd7e-5e51c332a1e6.png',
      tags: ['Solidity', 'Security', 'Blockchain']
    },
    {
      id: 2,
      title: 'Advanced DeFi Security Analysis',
      description: 'Deep dive into DeFi protocol security, flash loan attacks, and MEV protection',
      duration: '2h 15min',
      difficulty: 'advanced',
      rating: 4.9,
      students: 850,
      category: 'defi',
      lessons: 12,
      thumbnail: '/lovable-uploads/5eeb90f2-a19f-421d-814d-251d3a5374cc.png',
      tags: ['DeFi', 'Flash Loans', 'MEV']
    },
    {
      id: 3,
      title: 'Web3 Penetration Testing Basics',
      description: 'Introduction to penetration testing for Web3 applications and blockchain infrastructure',
      duration: '1h 30min',
      difficulty: 'intermediate',
      rating: 4.7,
      students: 950,
      category: 'pentesting',
      lessons: 10,
      thumbnail: '/lovable-uploads/65e03f83-0c8d-4b03-949b-60b5e384317d.png',
      tags: ['Penetration Testing', 'Web3', 'Security']
    },
    {
      id: 4,
      title: 'NFT Security and Best Practices',
      description: 'Comprehensive guide to NFT security, from smart contracts to marketplace vulnerabilities',
      duration: '1h 20min',
      difficulty: 'intermediate',
      rating: 4.6,
      students: 720,
      category: 'nft',
      lessons: 9,
      thumbnail: '/lovable-uploads/1c074bb3-8c7f-44c0-85c3-bf5b4123c592.png',
      tags: ['NFT', 'Marketplace', 'Security']
    },
    {
      id: 5,
      title: 'Blockchain Forensics and Investigation',
      description: 'Learn to track and analyze blockchain transactions for security investigations',
      duration: '3h 10min',
      difficulty: 'advanced',
      rating: 4.8,
      students: 420,
      category: 'forensics',
      lessons: 15,
      thumbnail: '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
      tags: ['Forensics', 'Investigation', 'Analysis']
    },
    {
      id: 6,
      title: 'Zero-Knowledge Proof Security',
      description: 'Understanding ZK proofs, their implementation, and security considerations',
      duration: '2h 45min',
      difficulty: 'advanced',
      rating: 4.9,
      students: 380,
      category: 'zk-proofs',
      lessons: 13,
      thumbnail: '/lovable-uploads/d96077a4-3ebd-4779-9a3e-a504ff6822f1.png',
      tags: ['Zero-Knowledge', 'Privacy', 'Cryptography']
    }
  ];

  const categories = [
    { id: 'all', name: 'All Tutorials', icon: <BookOpen className="h-4 w-4" /> },
    { id: 'smart-contracts', name: 'Smart Contracts', icon: <Code className="h-4 w-4" /> },
    { id: 'defi', name: 'DeFi Security', icon: <Shield className="h-4 w-4" /> },
    { id: 'pentesting', name: 'Penetration Testing', icon: <Target className="h-4 w-4" /> },
    { id: 'nft', name: 'NFT Security', icon: <Star className="h-4 w-4" /> },
    { id: 'forensics', name: 'Blockchain Forensics', icon: <Search className="h-4 w-4" /> },
    { id: 'zk-proofs', name: 'ZK Proofs', icon: <Shield className="h-4 w-4" /> }
  ];

  const learningPaths = [
    {
      title: 'Complete Smart Contract Security',
      description: 'Master smart contract security from basics to advanced topics',
      tutorials: [1, 2, 3],
      duration: '6h 30min',
      level: 'Beginner to Advanced'
    },
    {
      title: 'DeFi Security Specialist',
      description: 'Become an expert in DeFi protocol security and risk assessment',
      tutorials: [2, 4, 5],
      duration: '7h 5min',
      level: 'Intermediate to Advanced'
    },
    {
      title: 'Web3 Security Auditor',
      description: 'Complete training path for professional security auditing',
      tutorials: [1, 3, 5, 6],
      duration: '9h 40min',
      level: 'All Levels'
    }
  ];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDifficulty = selectedDifficulty === 'all' || tutorial.difficulty === selectedDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardLayout
      title="Security Tutorials | Hawkly"
      description="Interactive tutorials and learning paths for Web3 security"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <PlayCircle className="h-4 w-4 mr-2" />
            Interactive Learning
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Tutorials
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master Web3 security through hands-on tutorials, interactive exercises, and guided learning paths. 
            From beginner basics to advanced techniques.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search tutorials, topics, or technologies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="all">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        <Tabs defaultValue="tutorials" className="space-y-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="tutorials">All Tutorials</TabsTrigger>
            <TabsTrigger value="paths">Learning Paths</TabsTrigger>
          </TabsList>

          <TabsContent value="tutorials" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutorials.map((tutorial) => (
                <Card key={tutorial.id} className="hover:shadow-lg transition-all">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-primary/50" />
                  </div>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <CardTitle className="text-lg line-clamp-2">{tutorial.title}</CardTitle>
                      <Badge className={`text-xs ${getDifficultyColor(tutorial.difficulty)}`}>
                        {tutorial.difficulty}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {tutorial.description}
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {tutorial.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3 w-3" />
                          {tutorial.lessons} lessons
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        {tutorial.rating}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {tutorial.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">
                        {tutorial.students} students
                      </span>
                      <Button size="sm">
                        Start Tutorial
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="paths" className="space-y-8">
            <div className="space-y-6">
              {learningPaths.map((path, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{path.title}</CardTitle>
                        <p className="text-muted-foreground">{path.description}</p>
                      </div>
                      <Badge variant="outline">{path.level}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {path.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {path.tutorials.length} tutorials
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Included Tutorials:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {path.tutorials.map((tutorialId) => {
                          const tutorial = tutorials.find(t => t.id === tutorialId);
                          return tutorial ? (
                            <div key={tutorialId} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              {tutorial.title}
                            </div>
                          ) : null;
                        })}
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
      </div>
    </StandardLayout>
  );
};

export default Tutorials;
