
import React from 'react';
import { useParams } from 'react-router-dom';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ThumbsUp, ThumbsDown, Share, BookOpen, Clock, User, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const KnowledgeBaseArticle = () => {
  const { slug } = useParams();

  // Mock article data - replace with actual data from Supabase
  const article = {
    title: 'Complete Guide to Smart Contract Security Auditing',
    content: `
      <h2>Introduction to Smart Contract Security Auditing</h2>
      <p>Smart contract security auditing is a critical process in the Web3 ecosystem...</p>
      
      <h2>Common Vulnerabilities</h2>
      <h3>1. Reentrancy Attacks</h3>
      <p>Reentrancy attacks occur when external contracts call back into the calling contract...</p>
      
      <h3>2. Integer Overflow/Underflow</h3>
      <p>Before Solidity 0.8.0, integer overflow and underflow were common issues...</p>
      
      <h2>Auditing Process</h2>
      <ol>
        <li>Initial code review</li>
        <li>Automated testing</li>
        <li>Manual security analysis</li>
        <li>Report generation</li>
      </ol>
      
      <h2>Best Practices</h2>
      <ul>
        <li>Use established security patterns</li>
        <li>Implement comprehensive testing</li>
        <li>Follow the principle of least privilege</li>
        <li>Keep contracts simple and modular</li>
      </ul>
    `,
    author: 'Sarah Chen',
    category: 'auditing',
    readTime: '12 min read',
    publishedAt: '2024-01-15',
    viewCount: 2156,
    helpful: 89,
    notHelpful: 12
  };

  return (
    <StandardLayout
      title={article.title}
      description="Learn the essential steps and methodologies for conducting thorough smart contract security audits"
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Back Button */}
        <Link to="/knowledge-base">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Knowledge Base
          </Button>
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <Badge variant="outline">{article.category}</Badge>
          <h1 className="text-4xl font-bold leading-tight">{article.title}</h1>
          
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Avatar className="w-8 h-8">
                <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <span>By {article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              {article.viewCount} views
            </div>
            <span>{article.publishedAt}</span>
          </div>
        </div>

        {/* Article Content */}
        <Card>
          <CardContent className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </CardContent>
        </Card>

        {/* Article Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="text-sm font-medium">Was this article helpful?</div>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <ThumbsUp className="h-4 w-4 mr-2" />
                    Yes ({article.helpful})
                  </Button>
                  <Button variant="outline" size="sm">
                    <ThumbsDown className="h-4 w-4 mr-2" />
                    No ({article.notHelpful})
                  </Button>
                </div>
              </div>
              <Button variant="outline">
                <Share className="h-4 w-4 mr-2" />
                Share Article
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Related Articles</h3>
            <div className="space-y-3">
              <Link to="/knowledge-base/understanding-reentrancy-attacks" className="block hover:text-primary">
                Understanding Reentrancy Attacks
              </Link>
              <Link to="/knowledge-base/gas-optimization-techniques" className="block hover:text-primary">
                Gas Optimization Techniques for Smart Contracts
              </Link>
              <Link to="/knowledge-base/top-10-defi-vulnerabilities" className="block hover:text-primary">
                Top 10 DeFi Vulnerabilities and How to Prevent Them
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default KnowledgeBaseArticle;
