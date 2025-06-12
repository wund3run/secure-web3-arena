
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Plus, 
  Search, 
  TrendingUp, 
  Clock, 
  Users, 
  Pin,
  Lock,
  Eye
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual data from Supabase
  const categories = [
    {
      id: '1',
      name: 'General Discussion',
      slug: 'general',
      description: 'General Web3 security discussions',
      color: '#3B82F6',
      icon: 'MessageCircle',
      topicCount: 156,
      replyCount: 892,
      lastPost: {
        title: 'Best practices for smart contract deployment',
        author: 'Alex Chen',
        avatar: null,
        time: '2 hours ago'
      }
    },
    {
      id: '2',
      name: 'Smart Contract Security',
      slug: 'smart-contracts',
      description: 'Discussions about smart contract vulnerabilities and best practices',
      color: '#EF4444',
      icon: 'Shield',
      topicCount: 89,
      replyCount: 567,
      lastPost: {
        title: 'Reentrancy attack prevention strategies',
        author: 'Sarah Kim',
        avatar: null,
        time: '4 hours ago'
      }
    },
    {
      id: '3',
      name: 'DeFi Security',
      slug: 'defi',
      description: 'DeFi protocol security discussions',
      color: '#10B981',
      icon: 'DollarSign',
      topicCount: 67,
      replyCount: 423,
      lastPost: {
        title: 'Flash loan attack analysis',
        author: 'Marcus Rodriguez',
        avatar: null,
        time: '1 day ago'
      }
    }
  ];

  const recentTopics = [
    {
      id: '1',
      title: 'New vulnerability discovered in popular DeFi protocol',
      slug: 'new-vulnerability-defi-protocol',
      category: 'DeFi Security',
      author: {
        name: 'Emma Thompson',
        avatar: null,
        reputation: 1250
      },
      isPinned: true,
      isLocked: false,
      replyCount: 23,
      viewCount: 456,
      lastReply: {
        author: 'David Wilson',
        time: '30 minutes ago'
      },
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Best tools for automated security analysis',
      slug: 'best-tools-automated-security',
      category: 'Tools & Resources',
      author: {
        name: 'James Lee',
        avatar: null,
        reputation: 890
      },
      isPinned: false,
      isLocked: false,
      replyCount: 15,
      viewCount: 234,
      lastReply: {
        author: 'Anna Garcia',
        time: '1 hour ago'
      },
      createdAt: '2024-01-14'
    }
  ];

  const stats = {
    totalTopics: 312,
    totalReplies: 1882,
    activeUsers: 156,
    onlineNow: 23
  };

  return (
    <StandardLayout
      title="Community Forum"
      description="Connect with Web3 security experts and share knowledge"
    >
      <div className="space-y-8">
        {/* Header with Search and New Topic */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground">
              Connect with security experts, share knowledge, and get help with Web3 security challenges
            </p>
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Topic
            </Button>
          </div>
        </div>

        {/* Forum Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalTopics}</div>
              <div className="text-sm text-muted-foreground">Topics</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.totalReplies}</div>
              <div className="text-sm text-muted-foreground">Replies</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{stats.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Members</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-500">{stats.onlineNow}</div>
              <div className="text-sm text-muted-foreground">Online Now</div>
            </CardContent>
          </Card>
        </div>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Categories</h2>
          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: `${category.color}20` }}
                      >
                        <MessageCircle className="h-6 w-6" style={{ color: category.color }} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">
                          <Link 
                            to={`/forum/category/${category.slug}`}
                            className="hover:text-primary transition-colors"
                          >
                            {category.name}
                          </Link>
                        </h3>
                        <p className="text-muted-foreground mb-2">{category.description}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{category.topicCount} topics</span>
                          <span>{category.replyCount} replies</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">{category.lastPost.title}</div>
                      <div className="text-sm text-muted-foreground">
                        by {category.lastPost.author} • {category.lastPost.time}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Topics */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Recent Discussions
          </h2>
          <div className="space-y-4">
            {recentTopics.map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={topic.author.avatar} />
                      <AvatarFallback>{topic.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {topic.isPinned && <Pin className="h-4 w-4 text-green-500" />}
                            {topic.isLocked && <Lock className="h-4 w-4 text-yellow-500" />}
                            <h3 className="font-semibold">
                              <Link 
                                to={`/forum/topic/${topic.slug}`}
                                className="hover:text-primary transition-colors"
                              >
                                {topic.title}
                              </Link>
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{topic.category}</Badge>
                            <span className="text-sm text-muted-foreground">
                              by {topic.author.name} • {topic.createdAt}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              {topic.replyCount} replies
                            </span>
                            <span className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              {topic.viewCount} views
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Last reply by {topic.lastReply.author} {topic.lastReply.time}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Community Guidelines */}
        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Community Guidelines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li>• Be respectful and professional in all interactions</li>
              <li>• Stay on topic and provide constructive feedback</li>
              <li>• Search before posting to avoid duplicates</li>
              <li>• Share code responsibly and avoid posting vulnerable examples</li>
              <li>• Help maintain a welcoming environment for all skill levels</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default Forum;
