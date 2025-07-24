import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, TrendingUp, Calendar, User, ExternalLink, BookOpen, Shield, Zap } from 'lucide-react';

const ResearchPage: React.FC = () => {
  const researchPapers = [
    {
      id: 1,
      title: 'Advanced Smart Contract Vulnerability Detection Using AI',
      authors: ['Dr. Sarah Chen', 'Prof. Michael Rodriguez'],
      date: '2025-03-10',
      category: 'AI Security',
      tags: ['Smart Contracts', 'Machine Learning', 'Vulnerability Detection'],
      abstract: 'This paper presents a novel approach to detecting vulnerabilities in smart contracts using advanced machine learning techniques...',
      views: 1245,
      downloads: 892,
      featured: true
    },
    {
      id: 2,
      title: 'Cross-Chain Security: Challenges and Solutions',
      authors: ['Alex Thompson', 'Maria Garcia'],
      date: '2025-03-08',
      category: 'Cross-Chain',
      tags: ['Cross-Chain', 'Interoperability', 'Security'],
      abstract: 'An in-depth analysis of security challenges in cross-chain protocols and proposed mitigation strategies...',
      views: 987,
      downloads: 654,
      featured: false
    },
    {
      id: 3,
      title: 'Zero-Knowledge Proofs in DeFi Security',
      authors: ['Dr. James Wilson', 'Lisa Park'],
      date: '2025-03-05',
      category: 'DeFi',
      tags: ['Zero-Knowledge', 'DeFi', 'Privacy'],
      abstract: 'Exploring the application of zero-knowledge proofs to enhance security and privacy in decentralized finance...',
      views: 1567,
      downloads: 1023,
      featured: true
    },
    {
      id: 4,
      title: 'Automated Audit Tools: A Comparative Study',
      authors: ['Kevin Zhang', 'Rachel Adams'],
      date: '2025-03-01',
      category: 'Tools',
      tags: ['Automation', 'Audit Tools', 'Comparison'],
      abstract: 'A comprehensive comparison of existing automated audit tools and their effectiveness in real-world scenarios...',
      views: 2134,
      downloads: 1456,
      featured: false
    }
  ];

  const categories = ['All', 'AI Security', 'Cross-Chain', 'DeFi', 'Tools', 'Privacy'];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI Security':
        return <Zap className="h-4 w-4" />;
      case 'Cross-Chain':
        return <Shield className="h-4 w-4" />;
      case 'DeFi':
        return <TrendingUp className="h-4 w-4" />;
      case 'Tools':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Security Research - Hawkly Community</title>
        <meta name="description" content="Latest security research, papers, and findings from the Hawkly community" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Security Research</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Cutting-edge research and findings from the global security community
            </p>
            
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search research papers..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Featured Research */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Featured Research
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {researchPapers.filter(paper => paper.featured).map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-primary">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2 line-clamp-2">
                          {paper.title}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-2 mb-2">
                          {getCategoryIcon(paper.category)}
                          {paper.category}
                        </CardDescription>
                      </div>
                      <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
                        Featured
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {paper.abstract}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {paper.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {paper.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {paper.authors[0]} {paper.authors.length > 1 && `+${paper.authors.length - 1}`}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {paper.views} views • {paper.downloads} downloads
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        Read Paper <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* All Research */}
          <div>
            <h2 className="text-2xl font-bold mb-6">All Research Papers</h2>
            <div className="grid gap-6">
              {researchPapers.map((paper) => (
                <Card key={paper.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-semibold line-clamp-2 flex-1">
                            {paper.title}
                          </h3>
                          {paper.featured && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 ml-2">
                              Featured
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            {getCategoryIcon(paper.category)}
                            {paper.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {paper.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {paper.authors.join(', ')}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {paper.abstract}
                        </p>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {paper.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {paper.views} views • {paper.downloads} downloads
                          </div>
                          <Button size="sm" variant="outline" className="gap-2">
                            Read Paper <ExternalLink className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Card className="max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Contribute to Security Research</h3>
                <p className="text-muted-foreground mb-6">
                  Share your security research findings with the community and help advance Web3 security
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Submit Research
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <User className="h-4 w-4" />
                    Join Research Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResearchPage; 