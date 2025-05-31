
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, ArrowRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Blog() {
  const blogPosts = [
    {
      title: "AI-Powered Security Analysis: The Future of Smart Contract Auditing",
      excerpt: "Exploring how GPT-4 and machine learning are revolutionizing vulnerability detection in Web3.",
      author: "Dr. Sarah Chen",
      date: "March 15, 2025",
      category: "AI Security",
      readTime: "8 min",
      featured: true
    },
    {
      title: "Cross-Chain Bridge Security: Lessons from 2024's Major Exploits",
      excerpt: "Analysis of bridge vulnerabilities and how to build more secure cross-chain infrastructure.",
      author: "Marcus Rodriguez",
      date: "March 12, 2025", 
      category: "DeFi Security",
      readTime: "12 min",
      featured: true
    },
    {
      title: "Layer 2 Security Considerations: Optimistic vs ZK Rollups",
      excerpt: "Comprehensive comparison of security models in different Layer 2 scaling solutions.",
      author: "Elena Nakamura",
      date: "March 8, 2025",
      category: "Layer 2",
      readTime: "10 min",
      featured: false
    },
    {
      title: "The Rise of MEV Attacks: Protection Strategies for DeFi Protocols",
      excerpt: "Understanding Maximum Extractable Value attacks and implementing robust defenses.",
      author: "Ahmed Hassan",
      date: "March 5, 2025",
      category: "MEV Protection",
      readTime: "15 min",
      featured: false
    },
    {
      title: "Zero-Knowledge Protocol Security: Best Practices for 2025",
      excerpt: "Security considerations for ZK-SNARK and ZK-STARK implementations in production.",
      author: "Dr. Jennifer Wu",
      date: "March 1, 2025",
      category: "Zero Knowledge",
      readTime: "11 min",
      featured: false
    }
  ];

  return (
    <StandardLayout 
      title="Security Blog" 
      description="Latest insights and trends in Web3 security - March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Security Insights</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Stay ahead of the latest Web3 security trends, vulnerabilities, and best practices. 
            Expert insights from our community of security professionals.
          </p>
        </div>

        {/* Featured Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.filter(post => post.featured).map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime} read</span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="text-base">{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {post.date}
                      </span>
                    </div>
                    <Button variant="outline" size="sm">
                      Read More <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg">{post.title}</CardTitle>
                  <CardDescription>{post.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    Read Article
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild size="lg">
            <Link to="/contact">
              Subscribe to Newsletter <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </StandardLayout>
  );
}
