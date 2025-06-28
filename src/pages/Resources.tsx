
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FileText, Video, Download, ExternalLink, Search } from 'lucide-react';

export default function Resources() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-background to-blue-50 dark:from-green-950/20 dark:to-blue-950/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-green-100 dark:bg-green-900/20 px-4 py-2 rounded-full text-green-600 dark:text-green-400 mb-6">
            <BookOpen className="h-5 w-5 mr-2" />
            <span className="font-medium">Security Resources</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Security Resources Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive collection of security guides, best practices, and educational 
            materials for Web3 developers and security professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/audit-guidelines">View Audit Guidelines</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/vulnerabilities">Browse Vulnerabilities</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Resource Categories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find the information you need to build secure Web3 applications
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Security Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive guides covering Web3 security best practices, 
                  common vulnerabilities, and prevention strategies.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/security-guides">
                    Browse Guides
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Documentation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Technical documentation for platform features, API references, 
                  and integration guides for developers.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/documentation">
                    View Docs
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Video className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Step-by-step video tutorials covering security auditing, 
                  platform usage, and Web3 development best practices.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/tutorials">
                    Watch Tutorials
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Featured Resources</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Popular and recently updated security resources
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Smart Contract Security Checklist",
                description: "Comprehensive checklist for auditing smart contracts",
                type: "Guide",
                updated: "March 2025"
              },
              {
                title: "Common DeFi Vulnerabilities",
                description: "Database of known DeFi protocol vulnerabilities",
                type: "Database",
                updated: "March 2025"
              },
              {
                title: "Gas Optimization Techniques",
                description: "Best practices for reducing gas costs in smart contracts",
                type: "Tutorial",
                updated: "February 2025"
              },
              {
                title: "Web3 Security Testing Framework",
                description: "Complete framework for testing Web3 applications",
                type: "Framework",
                updated: "March 2025"
              }
            ].map((resource, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                      <p className="text-muted-foreground mb-4">{resource.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {resource.type}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Updated {resource.updated}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button size="sm" variant="ghost">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-card border rounded-lg p-8 text-center">
            <Search className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">Can't Find What You're Looking For?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Use our advanced search to find specific security topics, vulnerabilities, 
              or best practices across all our resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search resources..."
                className="flex-1 px-4 py-2 border border-input rounded-lg bg-background"
              />
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 opacity-90">
            Subscribe to our newsletter for the latest security resources and updates
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg text-gray-900"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
