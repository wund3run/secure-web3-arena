
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, BookOpen, TrendingUp, Star, Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock data - replace with actual data from Supabase
  const categories = [
    { id: 'all', name: 'All Articles', count: 42 },
    { id: 'smart-contracts', name: 'Smart Contracts', count: 15 },
    { id: 'defi', name: 'DeFi Security', count: 12 },
    { id: 'auditing', name: 'Auditing Process', count: 8 },
    { id: 'tools', name: 'Security Tools', count: 7 }
  ];

  const featuredArticles = [
    {
      id: '1',
      title: 'Complete Guide to Smart Contract Security Auditing',
      excerpt: 'Learn the essential steps and methodologies for conducting thorough smart contract security audits.',
      category: 'auditing',
      author: 'Sarah Chen',
      readTime: '12 min read',
      viewCount: 2156,
      helpful: 89,
      featured: true,
      slug: 'complete-guide-smart-contract-auditing'
    },
    {
      id: '2', 
      title: 'Top 10 DeFi Vulnerabilities and How to Prevent Them',
      excerpt: 'Discover the most common DeFi protocol vulnerabilities and best practices to avoid them.',
      category: 'defi',
      author: 'Marcus Rodriguez',
      readTime: '8 min read',
      viewCount: 1874,
      helpful: 76,
      featured: true,
      slug: 'top-10-defi-vulnerabilities'
    }
  ];

  const recentArticles = [
    {
      id: '3',
      title: 'Understanding Reentrancy Attacks',
      excerpt: 'Deep dive into reentrancy vulnerabilities and prevention techniques.',
      category: 'smart-contracts',
      author: 'Alex Kim',
      readTime: '6 min read',
      viewCount: 934,
      helpful: 42,
      featured: false,
      slug: 'understanding-reentrancy-attacks'
    },
    {
      id: '4',
      title: 'Gas Optimization Techniques for Smart Contracts',
      excerpt: 'Learn how to optimize gas usage in your smart contracts effectively.',
      category: 'smart-contracts',
      author: 'Emma Thompson',
      readTime: '10 min read',
      viewCount: 1205,
      helpful: 58,
      featured: false,
      slug: 'gas-optimization-techniques'
    }
  ];

  const filteredArticles = [...featuredArticles, ...recentArticles].filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <StandardLayout
      title="Knowledge Base"
      description="Comprehensive guides and resources for Web3 security"
    >
      <div className="space-y-8">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Articles */}
        {selectedCategory === 'all' && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="h-6 w-6 text-yellow-500" />
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {featuredArticles.map((article) => (
                <Card key={article.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge variant="secondary">{categories.find(c => c.id === article.category)?.name}</Badge>
                      <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                        <Star className="h-3 w-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">
                      <Link 
                        to={`/knowledge-base/${article.slug}`}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4 line-clamp-3">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span>{article.viewCount} views</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {article.helpful}% helpful
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* All Articles */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen className="h-6 w-6" />
            {selectedCategory === 'all' ? 'Recent Articles' : `${categories.find(c => c.id === selectedCategory)?.name} Articles`}
          </h2>
          <div className="space-y-4">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{categories.find(c => c.id === article.category)?.name}</Badge>
                        {article.featured && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            <Star className="h-3 w-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        <Link 
                          to={`/knowledge-base/${article.slug}`}
                          className="hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                      </h3>
                      <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {article.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {article.readTime}
                        </span>
                        <span>{article.viewCount} views</span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3 w-3" />
                          {article.helpful}% helpful
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h3>
            <p className="text-muted-foreground mb-6">
              Join our community forum to ask questions and get help from security experts.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/forum">
                <Button>Visit Forum</Button>
              </Link>
              <Link to="/tutorials">
                <Button variant="outline">Browse Tutorials</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default KnowledgeBase;
