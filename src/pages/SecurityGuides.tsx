
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { BookOpen, Download, ExternalLink, Clock, User } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

export default function SecurityGuides() {
  const guides = [
    {
      title: "Smart Contract Security Checklist 2025",
      description: "Complete checklist for securing smart contracts with the latest best practices and vulnerability prevention techniques.",
      category: "Smart Contracts",
      difficulty: "Intermediate",
      readTime: "15 min",
      author: "Hawkly Security Team",
      downloadUrl: "/guides/smart-contract-checklist-2025.pdf",
      topics: ["Access Control", "Reentrancy Prevention", "Gas Optimization", "Testing Strategies"]
    },
    {
      title: "DeFi Protocol Security Framework",
      description: "Comprehensive framework for securing DeFi protocols against flash loan attacks, oracle manipulation, and MEV exploitation.",
      category: "DeFi",
      difficulty: "Advanced",
      readTime: "25 min",
      author: "Dr. Sarah Chen",
      downloadUrl: "/guides/defi-security-framework.pdf",
      topics: ["Flash Loan Protection", "Oracle Security", "MEV Mitigation", "Governance Security"]
    },
    {
      title: "NFT Security Best Practices",
      description: "Essential security considerations for NFT projects, including metadata protection and marketplace integration security.",
      category: "NFTs",
      difficulty: "Beginner",
      readTime: "10 min", 
      author: "Alex Rodriguez",
      downloadUrl: "/guides/nft-security-guide.pdf",
      topics: ["Metadata Security", "Royalty Protection", "Transfer Safety", "Marketplace Integration"]
    },
    {
      title: "Cross-Chain Bridge Security",
      description: "Security analysis and best practices for cross-chain bridges and multi-chain applications.",
      category: "Cross-Chain",
      difficulty: "Advanced",
      readTime: "30 min",
      author: "Michael Thompson",
      downloadUrl: "/guides/bridge-security-guide.pdf",
      topics: ["Validator Security", "Message Verification", "Multi-Sig Management", "Emergency Procedures"]
    },
    {
      title: "Web3 Frontend Security",
      description: "Securing Web3 frontend applications, wallet integration, and user interaction security.",
      category: "Frontend",
      difficulty: "Intermediate",
      readTime: "20 min",
      author: "Emma Wilson",
      downloadUrl: "/guides/frontend-security-guide.pdf",
      topics: ["Wallet Security", "Transaction Safety", "Phishing Prevention", "UI/UX Security"]
    },
    {
      title: "Governance Attack Prevention",
      description: "Protecting DAO governance mechanisms from manipulation and ensuring fair decision-making processes.",
      category: "Governance",
      difficulty: "Advanced",
      readTime: "35 min",
      author: "David Kim",
      downloadUrl: "/guides/governance-security-guide.pdf",
      topics: ["Voting Security", "Proposal Validation", "Sybil Resistance", "Emergency Governance"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Security Guides | Hawkly</title>
        <meta name="description" content="Comprehensive security guides and best practices for Web3 development, smart contracts, and blockchain applications." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
            <BookOpen className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Security Guides</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Security 
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"> Guides</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            In-depth guides and best practices from leading security experts. Stay updated with the latest 
            security methodologies and protect your Web3 projects effectively.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/request-audit">
            <Button>Get Professional Audit</Button>
          </Link>
          <Link to="/ai-tools">
            <Button variant="outline">Try AI Security Tools</Button>
          </Link>
          <Link to="/vulnerabilities">
            <Button variant="outline">View Vulnerability Database</Button>
          </Link>
        </div>

        {/* Guides Grid */}
        <div className="grid lg:grid-cols-2 gap-6 mb-16">
          {guides.map((guide, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant="secondary">{guide.category}</Badge>
                  <Badge className={getDifficultyColor(guide.difficulty)}>
                    {guide.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl mb-2">{guide.title}</CardTitle>
                <CardDescription>{guide.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Topics */}
                  <div className="flex flex-wrap gap-2">
                    {guide.topics.map((topic) => (
                      <span key={topic} className="px-2 py-1 bg-muted rounded-md text-xs">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {guide.readTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {guide.author}
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Read Guide
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Resources */}
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Custom Security Guidance?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our security experts can provide personalized guidance and custom security solutions for your specific project needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button>Contact Security Experts</Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline">Browse Auditor Profiles</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
