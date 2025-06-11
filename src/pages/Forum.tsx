
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  MessageSquare, 
  Search, 
  TrendingUp, 
  Clock, 
  Users, 
  Pin,
  ThumbsUp,
  Reply,
  Star,
  Filter
} from 'lucide-react';

const Forum = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 234 },
    { id: 'smart-contracts', name: 'Smart Contracts', count: 89 },
    { id: 'defi', name: 'DeFi Security', count: 67 },
    { id: 'nft', name: 'NFT Security', count: 45 },
    { id: 'general', name: 'General Discussion', count: 33 }
  ];

  const forumTopics = [
    {
      id: 1,
      title: 'Best practices for Solidity smart contract security',
      content: 'What are the most critical security considerations when developing Solidity smart contracts?',
      author: {
        name: 'Sarah Chen',
        avatar: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
        reputation: 2847,
        badge: 'Expert'
      },
      category: 'smart-contracts',
      replies: 24,
      views: 1523,
      lastActivity: '2 hours ago',
      isPinned: true,
      likes: 67,
      tags: ['solidity', 'smart-contracts', 'security']
    },
    {
      id: 2,
      title: 'Common vulnerabilities in DeFi protocols',
      content: 'Discussion on the most frequent security issues found in DeFi applications and how to prevent them.',
      author: {
        name: 'Marcus Rodriguez',
        avatar: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png',
        reputation: 1956,
        badge: 'Verified'
      },
      category: 'defi',
      replies: 18,
      views: 892,
      lastActivity: '4 hours ago',
      isPinned: false,
      likes: 43,
      tags: ['defi', 'vulnerabilities', 'protocols']
    },
    {
      id: 3,
      title: 'Flash loan attack vectors and prevention',
      content: 'Let\'s discuss different types of flash loan attacks and mitigation strategies.',
      author: {
        name: 'Alex Kim',
        avatar: null,
        reputation: 1234,
        badge: 'Active'
      },
      category: 'defi',
      replies: 31,
      views: 2156,
      lastActivity: '6 hours ago',
      isPinned: false,
      likes: 89,
      tags: ['flash-loans', 'attacks', 'prevention']
    }
  ];

  const trendingTopics = [
    'Reentrancy attacks',
    'Oracle manipulation',
    'MEV protection',
    'Cross-chain security',
    'Governance attacks'
  ];

  const filteredTopics = forumTopics.filter(topic => {
    const matchesSearch = topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <StandardLayout
      title="Security Forum | Hawkly"
      description="Join discussions about Web3 security, share knowledge, and connect with security experts"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Forum
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with security experts, discuss best practices, and share knowledge 
            about Web3 security challenges and solutions.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search discussions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
          <Button>New Topic</Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
              <TabsList className="grid w-full grid-cols-5">
                {categories.map((category) => (
                  <TabsTrigger key={category.id} value={category.id} className="text-xs">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-6">
                <div className="space-y-4">
                  {filteredTopics.map((topic) => (
                    <Card key={topic.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={topic.author.avatar} />
                            <AvatarFallback>
                              {topic.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {topic.isPinned && <Pin className="h-4 w-4 text-primary" />}
                                <h3 className="font-semibold text-lg hover:text-primary cursor-pointer">
                                  {topic.title}
                                </h3>
                              </div>
                              <Badge variant="outline">{topic.category}</Badge>
                            </div>
                            
                            <p className="text-muted-foreground mb-3 line-clamp-2">
                              {topic.content}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-3">
                              {topic.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <MessageSquare className="h-4 w-4" />
                                  {topic.replies} replies
                                </div>
                                <div className="flex items-center gap-1">
                                  <Users className="h-4 w-4" />
                                  {topic.views} views
                                </div>
                                <div className="flex items-center gap-1">
                                  <ThumbsUp className="h-4 w-4" />
                                  {topic.likes}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span>by {topic.author.name}</span>
                                <Badge variant="outline" className="text-xs">
                                  {topic.author.badge}
                                </Badge>
                                <Clock className="h-3 w-3" />
                                <span>{topic.lastActivity}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Community Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Total Topics</span>
                  <span className="font-semibold">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span>Active Members</span>
                  <span className="font-semibold">5,892</span>
                </div>
                <div className="flex justify-between">
                  <span>Expert Contributors</span>
                  <span className="font-semibold">156</span>
                </div>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {trendingTopics.map((topic, index) => (
                    <Button key={topic} variant="ghost" className="w-full justify-start text-sm">
                      #{index + 1} {topic}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', points: 2847, avatar: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png' },
                    { name: 'Marcus Rodriguez', points: 1956, avatar: '/lovable-uploads/ba568bdc-629c-43ca-a343-58b3c786ecba.png' },
                    { name: 'Alex Kim', points: 1234, avatar: null }
                  ].map((contributor, index) => (
                    <div key={contributor.name} className="flex items-center gap-3">
                      <span className="text-sm font-semibold w-6">#{index + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback className="text-xs">
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{contributor.name}</div>
                        <div className="text-xs text-muted-foreground">{contributor.points} points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Forum;
