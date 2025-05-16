
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Shield, Book, Video, Code, MessageCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SecurityDiscussionCard } from "@/components/security/security-discussion-card";
import { securityDiscussions } from "@/data/security-discussions";

export default function Resources() {
  const [activeTab, setActiveTab] = useState("resources");

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
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-10">
            <TabsList className="grid grid-cols-2 max-w-[400px] mx-auto">
              <TabsTrigger value="resources">Resource Library</TabsTrigger>
              <TabsTrigger value="security-hub">Security Hub</TabsTrigger>
            </TabsList>
            
            <TabsContent value="resources" className="mt-6">
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
            </TabsContent>
            
            <TabsContent value="security-hub" className="mt-6">
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-6">Security Discussion Hub</h2>
                
                <div className="bg-card rounded-lg p-4 mb-8">
                  <Tabs defaultValue="discussions" className="w-full">
                    <TabsList className="grid grid-cols-4 w-full mb-6">
                      <TabsTrigger value="discussions" className="flex items-center gap-2">
                        <MessageCircle className="h-4 w-4" />
                        <span>Discussions</span>
                      </TabsTrigger>
                      <TabsTrigger value="groups" className="flex items-center gap-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M8 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM16 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM2 21h8m4 0h8M12 11v10M2 11v10M22 11v10" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Groups</span>
                      </TabsTrigger>
                      <TabsTrigger value="events" className="flex items-center gap-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Events</span>
                      </TabsTrigger>
                      <TabsTrigger value="challenges" className="flex items-center gap-2">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 22V12c0-5.523 4.477-10 10-10s10 4.477 10 10v10M12 11l-2 3h4l-2 3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>Challenges</span>
                      </TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="discussions">
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {securityDiscussions.map((discussion) => (
                          <SecurityDiscussionCard 
                            key={discussion.id} 
                            discussion={discussion} 
                          />
                        ))}
                      </div>
                      <div className="flex justify-center mt-8">
                        <Button asChild>
                          <Link to="/community">View All Discussions</Link>
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="groups">
                      <div className="p-8 text-center">
                        <h3 className="text-xl font-medium mb-2">Groups Coming Soon</h3>
                        <p className="text-muted-foreground">Join security focus groups to collaborate with other professionals.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="events">
                      <div className="p-8 text-center">
                        <h3 className="text-xl font-medium mb-2">Events Coming Soon</h3>
                        <p className="text-muted-foreground">Upcoming security events, webinars and workshops.</p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="challenges">
                      <div className="p-8 text-center">
                        <h3 className="text-xl font-medium mb-2">Challenges Coming Soon</h3>
                        <p className="text-muted-foreground">Test your security skills with interactive challenges.</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
        <Footer />
      </div>
    </>
  );
}
