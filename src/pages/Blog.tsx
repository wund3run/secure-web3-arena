
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredArticles = [
    {
      id: 1,
      title: "Understanding Reentrancy Attacks: A Comprehensive Guide",
      excerpt: "An in-depth analysis of reentrancy vulnerabilities and how to prevent them in your smart contracts.",
      author: "Alex Johnson",
      date: "May 10, 2025",
      category: "Smart Contract Security",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2070&auto=format&fit=crop",
      slug: "understanding-reentrancy-attacks"
    },
    {
      id: 2,
      title: "The Rise of MEV Protection Mechanisms in DeFi",
      excerpt: "Exploring various approaches to mitigating Maximal Extractable Value (MEV) in decentralized finance protocols.",
      author: "Sarah Ahmed",
      date: "May 5, 2025",
      category: "DeFi Security",
      imageUrl: "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?q=80&w=2072&auto=format&fit=crop",
      slug: "mev-protection-mechanisms"
    },
    {
      id: 3,
      title: "Security Implications of EIP-4844 for Layer 2 Solutions",
      excerpt: "How Proto-Danksharding affects the security model of rollups and other Layer 2 scaling solutions.",
      author: "Michael Zhang",
      date: "Apr 28, 2025",
      category: "Layer 2",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop",
      slug: "eip-4844-security-implications"
    }
  ];

  const recentArticles = [
    {
      id: 4,
      title: "Best Practices for Secure Upgradable Smart Contracts",
      excerpt: "A guide to implementing secure upgrade patterns for your blockchain applications.",
      author: "Elena Rodriguez",
      date: "Apr 22, 2025",
      category: "Smart Contract Development",
      slug: "secure-upgradable-contracts"
    },
    {
      id: 5,
      title: "Auditing ZK Circuits: Tools and Methodologies",
      excerpt: "An overview of approaches and tools for auditing zero-knowledge proof implementations.",
      author: "David Wilson",
      date: "Apr 18, 2025",
      category: "Zero Knowledge",
      slug: "auditing-zk-circuits"
    },
    {
      id: 6,
      title: "Cross-Chain Bridge Security: Lessons from Recent Exploits",
      excerpt: "Analysis of recent bridge exploits and recommendations for more secure bridge designs.",
      author: "Sophia Parker",
      date: "Apr 15, 2025",
      category: "Exploits",
      slug: "cross-chain-bridge-security"
    },
    {
      id: 7,
      title: "Security Considerations for ERC-6551 Token Bound Accounts",
      excerpt: "Understanding the security implications of NFT-owned smart contract accounts.",
      author: "James Wilson",
      date: "Apr 10, 2025",
      category: "NFT Security",
      slug: "erc-6551-security"
    },
    {
      id: 8,
      title: "Implementing Effective Security Monitoring for DApps",
      excerpt: "Best practices for ongoing security monitoring of decentralized applications.",
      author: "Aisha Johnson",
      date: "Apr 5, 2025",
      category: "Security Operations",
      slug: "dapp-security-monitoring"
    }
  ];

  const categories = [
    "Smart Contract Security",
    "DeFi Security",
    "NFT Security",
    "Layer 2",
    "Zero Knowledge",
    "Exploits",
    "Security Operations",
    "Smart Contract Development"
  ];

  return (
    <>
      <Helmet>
        <title>Security Blog | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Latest articles on Web3 security, vulnerabilities, and best practices from the Hawkly security experts."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Security Blog</h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              The latest insights, research, and best practices in blockchain and Web3 security from our community of experts.
            </p>
          </div>

          {/* Search and Categories */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search articles..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex-shrink-0 flex gap-2 flex-wrap">
              <Button variant="outline" size="sm" className="text-xs">All Topics</Button>
              {categories.slice(0, 3).map((category) => (
                <Button key={category} variant="outline" size="sm" className="text-xs">
                  {category}
                </Button>
              ))}
              <Button variant="outline" size="sm" className="text-xs">
                More...
              </Button>
            </div>
          </div>

          {/* Featured Articles */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <div className="bg-card rounded-lg overflow-hidden border border-border/40 hover:shadow-md transition-all h-full flex flex-col">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={article.imageUrl} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform hover:scale-105" 
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <Badge variant="outline" className="self-start mb-2">{article.category}</Badge>
                      <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{article.title}</h3>
                      <p className="text-muted-foreground mb-4 text-sm flex-1">{article.excerpt}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Recent Articles */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Recent Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentArticles.map((article) => (
                <Link to={`/blog/${article.slug}`} key={article.id}>
                  <div className="bg-card p-5 rounded-lg border border-border/40 hover:shadow-md transition-all">
                    <Badge variant="outline" className="mb-2">{article.category}</Badge>
                    <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors">{article.title}</h3>
                    <p className="text-muted-foreground mb-4 text-sm">{article.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <User className="h-3.5 w-3.5 mr-1" />
                        <span>{article.author}</span>
                        <span className="mx-2">•</span>
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
