
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Book, Video, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Resources | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Educational resources, guides, and documentation for Web3 security and smart contract auditing."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Security Resources</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Learn about Web3 security best practices and access tools to improve your project's security posture.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <Book className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Audit Guidelines</CardTitle>
                <CardDescription>Comprehensive audit preparation guide for project owners</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Learn how to prepare your smart contracts for an audit, what to expect during the process, and how to interpret results.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/audit-guidelines" className="flex items-center justify-center">
                    Read Guidelines <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Security Insights</CardTitle>
                <CardDescription>Latest trends and vulnerabilities in Web3 security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Stay updated on the latest security vulnerabilities, exploits, and best practices for securing blockchain applications.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/security-insights" className="flex items-center justify-center">
                    View Insights <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <FileText className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Documentation</CardTitle>
                <CardDescription>Technical documentation and reference materials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access in-depth technical documentation on security patterns, common vulnerabilities, and integration guidelines.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/community" className="flex items-center justify-center">
                    View Documentation <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <Video className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Video Tutorials</CardTitle>
                <CardDescription>Visual guides for implementing security best practices</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Watch step-by-step video tutorials on implementing security best practices and using security tools effectively.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/community" className="flex items-center justify-center">
                    Watch Tutorials <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <Code className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Code Examples</CardTitle>
                <CardDescription>Secure code patterns and implementations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Browse a library of secure code snippets, patterns, and reference implementations for common blockchain functionality.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/web3-security" className="flex items-center justify-center">
                    Explore Code <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader>
                <Shield className="h-8 w-8 mb-2 text-primary" />
                <CardTitle>Security Tools</CardTitle>
                <CardDescription>Tools for enhancing your project's security</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Access security tools like vulnerability scanners, auditing frameworks, and risk assessment tools for your projects.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full">
                  <Link to="/ai-tools" className="flex items-center justify-center">
                    Browse Tools <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
