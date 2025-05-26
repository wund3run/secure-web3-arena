
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Blog() {
  const blogPosts = [
    {
      title: "The Evolution of Smart Contract Security in 2025",
      excerpt: "Exploring the latest trends and emerging threats in blockchain security.",
      author: "Security Team",
      date: "May 20, 2025",
      category: "Security Trends",
      readTime: "5 min read"
    },
    {
      title: "Best Practices for DeFi Protocol Audits",
      excerpt: "A comprehensive guide to auditing decentralized finance applications.",
      author: "Lead Auditor",
      date: "May 15, 2025",
      category: "DeFi Security",
      readTime: "8 min read"
    },
    {
      title: "Understanding Cross-Chain Bridge Vulnerabilities",
      excerpt: "Common attack vectors and mitigation strategies for bridge protocols.",
      author: "Research Team",
      date: "May 10, 2025",
      category: "Infrastructure",
      readTime: "6 min read"
    }
  ];

  return (
    <ContentPage
      title="Security Blog"
      description="Latest insights, trends, and best practices in Web3 security"
      className="px-4 md:px-6"
    >
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
          <div className="flex items-center mb-4">
            <BookOpen className="h-8 w-8 text-primary mr-3" />
            <h1 className="text-3xl md:text-4xl font-bold">Security Blog</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Stay updated with the latest insights, trends, and best practices in Web3 security.
          </p>
        </div>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-card rounded-lg p-6 border border-border/40 hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full mb-2 md:mb-0">
                  {post.category}
                </span>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {post.date}
                  <span className="mx-2">•</span>
                  {post.readTime}
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{post.author}</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                  Read More <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-primary/5 rounded-lg p-8">
            <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-6">
              Subscribe to our newsletter for the latest security insights and platform updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </div>
    </ContentPage>
  );
}
