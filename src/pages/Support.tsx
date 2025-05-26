
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { HelpCircle, MessageCircle, Book, Mail, Phone, ExternalLink } from 'lucide-react';

export default function Support() {
  const supportCategories = [
    {
      title: "Getting Started",
      icon: Book,
      description: "Learn the basics of using Hawkly",
      articles: [
        "How to create your first audit request",
        "Setting up your auditor profile",
        "Understanding the escrow system",
        "Platform walkthrough for new users"
      ]
    },
    {
      title: "Account & Billing",
      icon: HelpCircle,
      description: "Manage your account and payments",
      articles: [
        "Update your profile information",
        "Payment methods and billing",
        "Subscription management",
        "Account security settings"
      ]
    },
    {
      title: "Auditor Resources",
      icon: MessageCircle,
      description: "Tools and guidance for security auditors",
      articles: [
        "Best practices for audit reports",
        "Using audit templates effectively",
        "Building your reputation on the platform",
        "Communication guidelines with clients"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Support Center | Hawkly Web3 Security Marketplace</title>
        <meta name="description" content="Get help with Hawkly platform, find answers to common questions, and access support resources." />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Support Center</h1>
              <p className="text-xl text-muted-foreground">
                Find answers, get help, and learn how to make the most of Hawkly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {supportCategories.map((category, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <category.icon className="h-6 w-6 text-primary" />
                      <CardTitle>{category.title}</CardTitle>
                    </div>
                    <p className="text-muted-foreground">{category.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.articles.map((article, i) => (
                        <li key={i}>
                          <a href="#" className="text-sm text-primary hover:underline flex items-center gap-2">
                            {article}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Contact Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Can't find what you're looking for? Our support team is here to help.
                  </p>
                  <div className="space-y-3">
                    <Button asChild className="w-full">
                      <Link to="/contact">
                        <Mail className="mr-2 h-4 w-4" />
                        Send us a message
                      </Link>
                    </Button>
                    <div className="text-center text-sm text-muted-foreground">
                      <p>📞 Phone: +1 (555) 123-4567</p>
                      <p>📧 Email: support@hawkly.security</p>
                      <p>⏰ Response time: Within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5" />
                    Popular Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <Link to="/faq" className="block text-primary hover:underline">
                      Frequently Asked Questions
                    </Link>
                    <Link to="/docs" className="block text-primary hover:underline">
                      Platform Documentation
                    </Link>
                    <Link to="/web3-security" className="block text-primary hover:underline">
                      Web3 Security Guide
                    </Link>
                    <Link to="/templates" className="block text-primary hover:underline">
                      Audit Templates
                    </Link>
                    <Link to="/system-health" className="block text-primary hover:underline">
                      System Status
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-12 bg-muted/40 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-muted-foreground mb-6">
                Connect with other users, share experiences, and get help from the community.
              </p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" asChild>
                  <Link to="/community">
                    Join Community Forum
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer">
                    Discord Server
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
