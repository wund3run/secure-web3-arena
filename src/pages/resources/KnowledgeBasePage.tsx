import React, { useState } from 'react';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Search, 
  BookOpen, 
  Shield, 
  Code, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Star,
  ArrowRight,
  Download,
  ExternalLink
} from 'lucide-react';

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;
  rating: number;
  tags: string[];
  lastUpdated: string;
  featured?: boolean;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'Smart Contract Security Fundamentals',
    description: 'Essential security principles every developer should know when building smart contracts.',
    category: 'Security Basics',
    difficulty: 'Beginner',
    readTime: '8 min',
    rating: 4.9,
    tags: ['Security', 'Smart Contracts', 'Best Practices'],
    lastUpdated: '2024-01-15',
    featured: true
  },
  {
    id: '2',
    title: 'Common Vulnerabilities in DeFi Protocols',
    description: 'Comprehensive guide to identifying and preventing common DeFi security issues.',
    category: 'DeFi Security',
    difficulty: 'Intermediate',
    readTime: '12 min',
    rating: 4.8,
    tags: ['DeFi', 'Vulnerabilities', 'Prevention'],
    lastUpdated: '2024-01-12',
    featured: true
  },
  {
    id: '3',
    title: 'Advanced Audit Techniques',
    description: 'Professional methodologies for conducting thorough security audits.',
    category: 'Audit Methods',
    difficulty: 'Advanced',
    readTime: '15 min',
    rating: 4.7,
    tags: ['Auditing', 'Methodology', 'Tools'],
    lastUpdated: '2024-01-10'
  },
  {
    id: '4',
    title: 'Gas Optimization Strategies',
    description: 'Techniques to optimize gas usage while maintaining security standards.',
    category: 'Optimization',
    difficulty: 'Intermediate',
    readTime: '10 min',
    rating: 4.6,
    tags: ['Gas', 'Optimization', 'Performance'],
    lastUpdated: '2024-01-08'
  },
  {
    id: '5',
    title: 'Cross-Chain Security Considerations',
    description: 'Security challenges and solutions for multi-chain applications.',
    category: 'Cross-Chain',
    difficulty: 'Advanced',
    readTime: '18 min',
    rating: 4.8,
    tags: ['Cross-Chain', 'Bridges', 'Security'],
    lastUpdated: '2024-01-05'
  },
  {
    id: '6',
    title: 'Testing Smart Contracts with Foundry',
    description: 'Complete guide to testing smart contracts using the Foundry framework.',
    category: 'Testing',
    difficulty: 'Intermediate',
    readTime: '14 min',
    rating: 4.7,
    tags: ['Testing', 'Foundry', 'Development'],
    lastUpdated: '2024-01-03'
  }
];

const categories = [
  'All',
  'Security Basics',
  'DeFi Security',
  'Audit Methods',
  'Testing',
  'Optimization',
  'Cross-Chain'
];

const KnowledgeBasePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || article.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const featuredArticles = articles.filter(article => article.featured);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Advanced': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <ProductionLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Knowledge Base
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Comprehensive documentation and guides for Web3 security best practices, 
            audit methodologies, and development techniques.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search articles, guides, and documentation..."
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
            </div>
          </div>
        </div>

        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="articles">All Articles</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="guides">Quick Guides</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="outline" className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{article.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                      {article.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {article.readTime}
                      </div>
                      <span>Updated {article.lastUpdated}</span>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline">
                      Read Article
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="featured" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <Badge variant="default" className="bg-hawkly-primary">Featured</Badge>
                    </div>
                    <CardTitle className="text-xl">{article.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {article.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge className={getDifficultyColor(article.difficulty)}>
                        {article.difficulty}
                      </Badge>
                      <Button>
                        Read Now
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="guides" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'Security Checklist', icon: CheckCircle, color: 'text-green-600' },
                { title: 'Vulnerability Guide', icon: AlertTriangle, color: 'text-red-600' },
                { title: 'Code Review Tips', icon: Code, color: 'text-blue-600' },
                { title: 'Audit Process', icon: Shield, color: 'text-purple-600' }
              ].map((guide, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <guide.icon className={`h-12 w-12 mx-auto mb-4 ${guide.color}`} />
                    <h3 className="font-semibold mb-2">{guide.title}</h3>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Documentation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">API Reference <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">SDK Documentation <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Integration Guide <ExternalLink className="h-4 w-4" /></a></li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5" />
                    Code Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Sample Contracts <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Test Suites <ExternalLink className="h-4 w-4" /></a></li>
                    <li><a href="#" className="text-hawkly-primary hover:underline flex items-center gap-2">Security Patterns <ExternalLink className="h-4 w-4" /></a></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Help Section */}
        <Card className="mt-12 bg-hawkly-primary/5 border-hawkly-primary/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Need More Help?</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline">
                  Contact Support
                </Button>
                <Button className="bg-hawkly-primary hover:bg-hawkly-primary/90">
                  Request Documentation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProductionLayout>
  );
};

export default KnowledgeBasePage;
