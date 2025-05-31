
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageSquare,
  Users,
  Clock,
  Star,
  Search,
  Filter,
  ArrowRight,
  TrendingUp,
  Shield,
  AlertTriangle,
  HelpCircle,
  Code,
  Zap,
  ThumbsUp,
  Eye,
  Pin
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Forum = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  const categories = [
    { value: 'all', label: 'All Categories', count: 1247 },
    { value: 'general', label: 'General Discussion', count: 324 },
    { value: 'vulnerabilities', label: 'Vulnerability Reports', count: 189 },
    { value: 'tools', label: 'Security Tools', count: 156 },
    { value: 'defi', label: 'DeFi Security', count: 203 },
    { value: 'help', label: 'Help & Support', count: 98 },
    { value: 'ai', label: 'AI Security', count: 87 },
    { value: 'announcements', label: 'Announcements', count: 45 }
  ];

  const discussions = [
    {
      id: 1,
      title: "New Reentrancy Pattern Found in Cross-Chain Bridges",
      category: "vulnerabilities",
      author: {
        name: "Dr. Sarah Chen",
        avatar: "/api/placeholder/32/32",
        badge: "Security Expert",
        reputation: 2847
      },
      content: "Discovered a novel reentrancy attack vector affecting several popular cross-chain bridge implementations. The vulnerability exploits...",
      replies: 23,
      views: 1342,
      likes: 67,
      lastActivity: "2 hours ago",
      pinned: true,
      tags: ["Critical", "Cross-Chain", "Reentrancy"],
      new: true
    },
    {
      id: 2,
      title: "AI-Powered Security Analysis: Best Practices for 2025",
      category: "ai",
      author: {
        name: "Marcus Rodriguez",
        avatar: "/api/placeholder/32/32",
        badge: "AI Specialist",
        reputation: 1923
      },
      content: "With the rise of AI tools in security analysis, what are the best practices for integrating GPT-4 and other models into...",
      replies: 45,
      views: 2134,
      likes: 89,
      lastActivity: "4 hours ago",
      pinned: false,
      tags: ["AI", "Best Practices", "Analysis"],
      new: true
    },
    {
      id: 3,
      title: "DeFi Flash Loan Attack Prevention Strategies",
      category: "defi",
      author: {
        name: "Elena Vasquez",
        avatar: "/api/placeholder/32/32",
        badge: "DeFi Expert",
        reputation: 3156
      },
      content: "Comprehensive discussion on preventing flash loan attacks in DeFi protocols. Recent incidents show that traditional...",
      replies: 67,
      views: 3245,
      likes: 134,
      lastActivity: "6 hours ago",
      pinned: false,
      tags: ["DeFi", "Flash Loans", "Prevention"],
      new: false
    },
    {
      id: 4,
      title: "Slither vs MythX: Tool Comparison for 2025",
      category: "tools",
      author: {
        name: "Alex Kim",
        avatar: "/api/placeholder/32/32",
        badge: "Tool Expert",
        reputation: 1678
      },
      content: "Updated comparison of popular security analysis tools. Both have received significant updates this year...",
      replies: 34,
      views: 1876,
      likes: 56,
      lastActivity: "8 hours ago",
      pinned: false,
      tags: ["Tools", "Comparison", "Analysis"],
      new: false
    },
    {
      id: 5,
      title: "Help: Setting up automated security scanning in CI/CD",
      category: "help",
      author: {
        name: "Jordan Park",
        avatar: "/api/placeholder/32/32",
        badge: "Developer",
        reputation: 542
      },
      content: "I'm trying to integrate automated security scanning into our CI/CD pipeline but running into issues with...",
      replies: 18,
      views: 892,
      likes: 23,
      lastActivity: "12 hours ago",
      pinned: false,
      tags: ["Help", "CI/CD", "Automation"],
      new: false
    },
    {
      id: 6,
      title: "Layer 2 Security Considerations for Arbitrum and Optimism",
      category: "general",
      author: {
        name: "Lisa Thompson",
        avatar: "/api/placeholder/32/32",
        badge: "L2 Specialist",
        reputation: 2234
      },
      content: "Deep dive into the security models of different Layer 2 solutions and their unique attack vectors...",
      replies: 56,
      views: 2789,
      likes: 98,
      lastActivity: "1 day ago",
      pinned: false,
      tags: ["Layer 2", "Arbitrum", "Optimism"],
      new: false
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'recent': return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
      case 'popular': return b.likes - a.likes;
      case 'replies': return b.replies - a.replies;
      default: return 0;
    }
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vulnerabilities': return AlertTriangle;
      case 'tools': return Shield;
      case 'defi': return TrendingUp;
      case 'help': return HelpCircle;
      case 'ai': return Zap;
      case 'general': return MessageSquare;
      default: return MessageSquare;
    }
  };

  return (
    <StandardLayout
      title="Community Forum"
      description="Engage with the Web3 security community and share knowledge"
    >
      <div className="container py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Active Community</Badge>
          <h1 className="text-4xl font-bold mb-4">Security Community Forum</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with security experts, share knowledge, discuss vulnerabilities, 
            and stay updated on the latest Web3 security trends and discoveries.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">8.2k</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">1.2k</div>
            <div className="text-sm text-muted-foreground">Discussions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">156</div>
            <div className="text-sm text-muted-foreground">Vulnerabilities Reported</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">89%</div>
            <div className="text-sm text-muted-foreground">Response Rate</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {categories.map(category => {
                  const Icon = getCategoryIcon(category.value);
                  return (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full flex items-center justify-between p-2 rounded text-sm hover:bg-accent ${
                        selectedCategory === category.value ? 'bg-accent' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        {category.label}
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {category.count}
                      </Badge>
                    </button>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Contributors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Dr. Sarah Chen", reputation: 2847, badge: "Security Expert" },
                  { name: "Elena Vasquez", reputation: 3156, badge: "DeFi Expert" },
                  { name: "Marcus Rodriguez", reputation: 1923, badge: "AI Specialist" }
                ].map((contributor, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/api/placeholder/32/32" />
                      <AvatarFallback>{contributor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{contributor.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.reputation} rep</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search discussions, topics, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="replies">Most Replies</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <MessageSquare className="mr-2 h-4 w-4" />
                New Discussion
              </Button>
            </div>

            {/* Discussions */}
            <div className="space-y-4">
              {filteredDiscussions.map((discussion) => (
                <Card key={discussion.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {discussion.pinned && (
                            <Pin className="h-4 w-4 text-primary" />
                          )}
                          {discussion.new && (
                            <Badge variant="default" className="text-xs">New</Badge>
                          )}
                          {discussion.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <CardTitle className="text-lg hover:text-primary cursor-pointer">
                          {discussion.title}
                        </CardTitle>
                        <CardDescription className="line-clamp-2 mt-2">
                          {discussion.content}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={discussion.author.avatar} />
                            <AvatarFallback>{discussion.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm font-medium">{discussion.author.name}</span>
                          <Badge variant="secondary" className="text-xs">
                            {discussion.author.badge}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {discussion.replies}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {discussion.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <ThumbsUp className="h-4 w-4" />
                          {discussion.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {discussion.lastActivity}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <Button variant="outline">
                Load More Discussions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-12 mt-12">
          <h2 className="text-3xl font-bold mb-4">Join the Security Community</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Share your expertise, learn from others, and help make Web3 more secure for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <MessageSquare className="mr-2 h-4 w-4" />
              Start Your First Discussion
            </Button>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                Join Community
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Forum;
