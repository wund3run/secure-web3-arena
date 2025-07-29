
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Shield, Search, FileSearch, Code, Bot, Zap, Info, ChevronRight } from "lucide-react";
import { SkipToContent } from "@/components/layout/SkipToContent";

const EnhancedAITools = () => {
  const [activeTab, setActiveTab] = useState("code-review");
  const [loading, setLoading] = useState(false);
  const [sampleCode, setSampleCode] = useState("// Paste your smart contract code here\ncontract Example {\n  // ...\n}");
  
  const handleAnalyzeClick = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // In a real implementation, this would contain the analysis results
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>AI-Powered Security Tools | Hawkly</title>
        <meta name="description" content="Advanced AI tools for smart contract security, vulnerability detection, and automated code reviews" />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent targetId="main-content" />
        <Navbar />
        <main className="flex-grow" id="main-content">
          <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">AI-Powered Security Tools</h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Leverage advanced artificial intelligence to enhance your security posture and automate vulnerability detection
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-10">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-border">
                    <TabsList className="bg-transparent h-14 p-0 w-full flex justify-start overflow-x-auto">
                      <TabsTrigger 
                        value="code-review" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-6 h-14"
                      >
                        <Code className="mr-2 h-4 w-4" />
                        Smart Contract Review
                      </TabsTrigger>
                      <TabsTrigger 
                        value="vulnerability-scan" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-6 h-14"
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Vulnerability Scanner
                      </TabsTrigger>
                      <TabsTrigger 
                        value="security-assistant" 
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-6 h-14"
                      >
                        <Bot className="mr-2 h-4 w-4" />
                        Security Assistant
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <TabsContent value="code-review" className="p-6">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-4">AI Smart Contract Review</h2>
                      <p className="text-muted-foreground mb-6">
                        Our AI-powered code analysis helps identify potential vulnerabilities before they reach production.
                        Paste your smart contract code below for an automated review.
                      </p>
                      
                      <div className="mb-6">
                        <Textarea 
                          value={sampleCode} 
                          onChange={(e) => setSampleCode(e.target.value)} 
                          rows={12}
                          className="font-mono text-sm"
                          placeholder="// Paste your smart contract code here"
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button onClick={handleAnalyzeClick} disabled={loading}>
                          {loading ? (
                            <>
                              <span className="mr-2">Analyzing</span>
                              <span className="animate-spin">⚙️</span>
                            </>
                          ) : (
                            <>
                              <Zap className="mr-2 h-4 w-4" />
                              Analyze Code
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="vulnerability-scan" className="p-6">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-4">Blockchain Vulnerability Scanner</h2>
                      <p className="text-muted-foreground mb-6">
                        Scan deployed contracts or blockchain addresses for known vulnerabilities and security issues.
                      </p>
                      
                      <div className="mb-6 grid gap-4">
                        <div>
                          <label htmlFor="contract-address" className="block text-sm font-medium mb-1">
                            Contract Address
                          </label>
                          <div className="flex gap-2">
                            <Input 
                              id="contract-address"
                              placeholder="0x..."
                              className="font-mono"
                            />
                            <Button>Scan</Button>
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="blockchain" className="block text-sm font-medium mb-1">
                            Blockchain
                          </label>
                          <select 
                            id="blockchain" 
                            className="w-full rounded-md border border-border bg-background px-3 py-2"
                          >
                            <option value="ethereum">Ethereum Mainnet</option>
                            <option value="polygon">Polygon</option>
                            <option value="bsc">Binance Smart Chain</option>
                            <option value="avalanche">Avalanche</option>
                            <option value="arbitrum">Arbitrum</option>
                            <option value="optimism">Optimism</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="bg-muted/50 rounded-lg p-4 flex items-start">
                        <Info className="h-5 w-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">
                          Our scanner checks for 150+ known vulnerabilities including reentrancy, overflow, 
                          front-running opportunities, and access control issues. Results include severity 
                          ratings and recommendations for remediation.
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="security-assistant" className="p-6">
                    <div className="max-w-4xl mx-auto">
                      <h2 className="text-2xl font-bold mb-4">AI Security Assistant</h2>
                      <p className="text-muted-foreground mb-6">
                        Chat with our AI security assistant to get answers to your Web3 security questions.
                      </p>
                      
                      <div className="bg-muted/30 rounded-lg p-4 mb-6 h-[300px] overflow-auto">
                        <div className="flex flex-col space-y-4">
                          <div className="bg-card p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm font-medium mb-1">AI Assistant</p>
                            <p className="text-sm">
                              Hello! I'm your Web3 security assistant. How can I help you today?
                              I can answer questions about smart contract security, audit processes, 
                              vulnerability types, or security best practices.
                            </p>
                          </div>
                          
                          <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] self-end">
                            <p className="text-sm font-medium mb-1">You</p>
                            <p className="text-sm">
                              What are the most common vulnerabilities in DeFi smart contracts?
                            </p>
                          </div>
                          
                          <div className="bg-card p-3 rounded-lg max-w-[80%]">
                            <p className="text-sm font-medium mb-1">AI Assistant</p>
                            <p className="text-sm">
                              The most common vulnerabilities in DeFi smart contracts include:
                            </p>
                            <ol className="list-decimal list-inside text-sm mt-2 space-y-1">
                              <li>Reentrancy attacks</li>
                              <li>Oracle manipulation</li>
                              <li>Flash loan exploits</li>
                              <li>Access control issues</li>
                              <li>Integer overflow/underflow (pre-Solidity 0.8.x)</li>
                              <li>Front-running vulnerabilities</li>
                            </ol>
                            <p className="text-sm mt-2">
                              Would you like me to explain any of these in more detail?
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Input 
                          placeholder="Ask a security question..." 
                          className="flex-1"
                        />
                        <Button>
                          Send
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="mr-2 h-5 w-5 text-primary" />
                      Preventative Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Identify vulnerabilities before deployment, reducing the risk of exploits and saving costly fixes later.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <FileSearch className="mr-2 h-5 w-5 text-primary" />
                      Comprehensive Scans
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Our AI tools analyze against a database of known vulnerabilities and blockchain-specific attack vectors.
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Zap className="mr-2 h-5 w-5 text-primary" />
                      Continuous Learning
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      AI models continuously update based on new vulnerabilities and attack patterns in the Web3 ecosystem.
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Need a more comprehensive security assessment?
                </p>
                <Button asChild size="lg">
                  <a href="/request-audit">
                    Request a Full Security Audit
                    <ChevronRight className="ml-2 h-5 w-5" />
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
};

export default EnhancedAITools;
