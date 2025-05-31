
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const featuredPost = {
    title: "The State of Web3 Security in 2025: What Every Project Needs to Know",
    excerpt: "As we enter 2025, the Web3 security landscape continues to evolve rapidly. With over $3.8 billion lost to exploits in 2024, understanding current threats and mitigation strategies is crucial for any blockchain project.",
    author: "Sarah Chen",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Security Insights",
    image: "/api/placeholder/600/300"
  };

  const blogPosts = [
    {
      title: "Smart Contract Audit Checklist for 2025",
      excerpt: "Updated security checklist covering the latest vulnerability patterns and best practices for smart contract development.",
      author: "Marcus Rodriguez",
      date: "March 12, 2025",
      readTime: "6 min read",
      category: "Best Practices",
      trending: true
    },
    {
      title: "Layer 2 Security Considerations: A Comprehensive Guide",
      excerpt: "Deep dive into security implications of scaling solutions including Arbitrum, Optimism, and Polygon zkEVM.",
      author: "Elena Vasquez",
      date: "March 10, 2025",
      readTime: "12 min read",
      category: "Technical Analysis"
    },
    {
      title: "DeFi Protocol Security: Lessons from Recent Exploits",
      excerpt: "Analysis of major DeFi exploits in Q1 2025 and actionable insights for protocol developers.",
      author: "Ahmed Hassan",
      date: "March 8, 2025",
      readTime: "10 min read",
      category: "Case Studies"
    },
    {
      title: "Cross-Chain Bridge Security: The Ultimate Guide",
      excerpt: "Comprehensive overview of cross-chain security challenges and mitigation strategies for 2025.",
      author: "Jennifer Liu",
      date: "March 5, 2025",
      readTime: "9 min read",
      category: "Infrastructure"
    },
    {
      title: "AI-Powered Security Auditing: The Future is Here",
      excerpt: "How artificial intelligence is revolutionizing smart contract auditing and vulnerability detection.",
      author: "David Kumar",
      date: "March 3, 2025",
      readTime: "7 min read",
      category: "Innovation",
      trending: true
    },
    {
      title: "Regulatory Compliance in Web3: 2025 Updates",
      excerpt: "Latest regulatory developments affecting Web3 projects and their security implications.",
      author: "Rachel Green",
      date: "March 1, 2025",
      readTime: "11 min read",
      category: "Regulatory"
    }
  ];

  const categories = ["All", "Security Insights", "Best Practices", "Technical Analysis", "Case Studies", "Innovation", "Regulatory"];

  return (
    <StandardLayout
      title="Security Blog"
      description="Latest insights, best practices, and trends in Web3 security"
    >
      <div className="container py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Web3 Security Insights</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of the curve with the latest security insights, best practices, and industry trends from our team of experts.
          </p>
        </div>

        {/* Featured Post */}
        <Card className="mb-12 overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <div className="h-64 md:h-full bg-gradient-to-br from-primary/20 to-secondary/20"></div>
            </div>
            <div className="md:w-1/2 p-8">
              <Badge variant="secondary" className="mb-4">Featured</Badge>
              <h2 className="text-2xl font-bold mb-4">{featuredPost.title}</h2>
              <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {featuredPost.author}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {featuredPost.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {featuredPost.readTime}
                </span>
              </div>
              <Button className="group">
                Read Full Article
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">{post.category}</Badge>
                  {post.trending && (
                    <Badge variant="secondary" className="text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg hover:text-primary transition-colors cursor-pointer">
                  {post.title}
                </CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.date}</span>
                  <Button variant="ghost" size="sm" className="group">
                    Read More
                    <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter and get the latest Web3 security insights delivered directly to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default Blog;
