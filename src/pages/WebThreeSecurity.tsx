
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, AlertTriangle, Lock, Shield, ExternalLink, ArrowRight, Code, FileText } from "lucide-react";

export default function WebThreeSecurity() {
  return (
    <ContentPage
      title="Web3 Security Best Practices"
      description="Comprehensive guide to Web3 security best practices, common vulnerabilities, and protection strategies."
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6 flex items-center">
        <Shield className="mr-3 h-8 w-8 text-primary" />
        Web3 Security Best Practices
      </h1>
      
      <div className="prose prose-lg mb-10">
        <p className="lead">
          Security is paramount in Web3 development. This guide provides comprehensive security best practices for developers, auditors, and project owners to protect blockchain applications from common vulnerabilities and attacks.
        </p>
      </div>
      
      <Tabs defaultValue="smart-contracts" className="mb-12">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
          <TabsTrigger value="smart-contracts">Smart Contracts</TabsTrigger>
          <TabsTrigger value="defi">DeFi Protocols</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
        </TabsList>
        
        <TabsContent value="smart-contracts">
          <Card>
            <CardHeader>
              <CardTitle>Smart Contract Security</CardTitle>
              <CardDescription>
                Best practices for securing smart contract code and logic
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h3 className="text-xl font-semibold mb-4">Common Vulnerabilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Reentrancy Attacks</h4>
                      <p className="text-sm text-muted-foreground">
                        Occurs when external contract calls allow attackers to recursively call back into the original function before the first execution completes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Integer Overflow/Underflow</h4>
                      <p className="text-sm text-muted-foreground">
                        Arithmetic operations that exceed the maximum or minimum size of a variable's type, causing wrap-around.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Access Control Issues</h4>
                      <p className="text-sm text-muted-foreground">
                        Improper implementation of access controls allowing unauthorized users to execute restricted functions.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Front-Running</h4>
                      <p className="text-sm text-muted-foreground">
                        Exploiting transaction ordering to gain advantage, particularly in decentralized exchanges and markets.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-4">Best Practices</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Follow the Checks-Effects-Interactions Pattern</h4>
                      <p className="text-sm text-muted-foreground">
                        Always perform validations first, then update contract state, and finally interact with external contracts to prevent reentrancy vulnerabilities.
                      </p>
                      <div className="mt-2 p-3 bg-muted rounded-md text-xs">
                        <pre><code>
                          // Good practice<br />
                          function withdraw(uint amount) external &#123;<br />
                          &nbsp;&nbsp;// Checks<br />
                          &nbsp;&nbsp;require(balances[msg.sender] >= amount);<br /><br />
                          &nbsp;&nbsp;// Effects<br />
                          &nbsp;&nbsp;balances[msg.sender] -= amount;<br /><br />
                          &nbsp;&nbsp;// Interactions<br />
                          &nbsp;&nbsp;(bool success, ) = msg.sender.call&#123;value: amount&#125;("");<br />
                          &nbsp;&nbsp;require(success, "Transfer failed");<br />
                          &#125;
                        </code></pre>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Use Reentrancy Guards</h4>
                      <p className="text-sm text-muted-foreground">
                        Implement mutex locks to prevent reentrant calls or use established libraries like OpenZeppelin's ReentrancyGuard.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Implement Proper Access Controls</h4>
                      <p className="text-sm text-muted-foreground">
                        Use role-based access control systems for permission management. Consider OpenZeppelin's AccessControl contract for complex permission structures.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Use Safe Math Libraries</h4>
                      <p className="text-sm text-muted-foreground">
                        For Solidity versions before 0.8.0, use SafeMath or similar libraries to prevent integer overflows and underflows. Newer Solidity versions have built-in overflow checks.
                      </p>
                    </div>
                  </div>
                </div>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold mb-4">Tools & Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-background border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium">Slither</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Static analysis framework for detecting common Solidity vulnerabilities.
                      </p>
                      <a href="https://github.com/crytic/slither" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center hover:underline">
                        View Tool <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium">MythX</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Security analysis platform for Ethereum smart contracts.
                      </p>
                      <a href="https://mythx.io" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center hover:underline">
                        View Tool <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <FileText className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium">SWC Registry</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Smart contract weakness classification and test cases.
                      </p>
                      <a href="https://swcregistry.io" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center hover:underline">
                        View Resource <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-background border-border/40">
                    <CardContent className="p-4">
                      <div className="flex items-center mb-2">
                        <Code className="h-4 w-4 text-primary mr-2" />
                        <h4 className="font-medium">Echidna</h4>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">
                        Ethereum smart contract fuzzer for finding vulnerabilities.
                      </p>
                      <a href="https://github.com/crytic/echidna" target="_blank" rel="noopener noreferrer" className="text-xs text-primary flex items-center hover:underline">
                        View Tool <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </CardContent>
                  </Card>
                </div>
              </section>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="defi">
          <div className="text-center p-12">
            <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">DeFi Security Best Practices</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Comprehensive security guidelines for DeFi protocols including oracle security, economic attack vectors, and liquidity considerations.
            </p>
            <Button>
              View DeFi Security Guidelines <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="nfts">
          <div className="text-center p-12">
            <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">NFT Security Best Practices</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Best practices for securing NFT projects, including metadata security, marketplace integration, and royalty enforcement.
            </p>
            <Button>
              View NFT Security Guidelines <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="infrastructure">
          <div className="text-center p-12">
            <Lock className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h3 className="text-xl font-semibold mb-2">Web3 Infrastructure Security</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Guidelines for securing Web3 infrastructure, including RPC endpoints, wallets, private keys, and frontend security considerations.
            </p>
            <Button>
              View Infrastructure Guidelines <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Secure Development Lifecycle</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-full w-fit mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Planning & Design</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">1</Badge>
                <p>Define security requirements and threat models</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">2</Badge>
                <p>Design with security patterns and principles</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">3</Badge>
                <p>Conduct architecture security review</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-full w-fit mb-3">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">1</Badge>
                <p>Adhere to secure coding guidelines</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">2</Badge>
                <p>Use established libraries and patterns</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">3</Badge>
                <p>Implement comprehensive test coverage</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="p-2 bg-primary/10 rounded-full w-fit mb-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Verification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">1</Badge>
                <p>Conduct internal security review</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">2</Badge>
                <p>Perform automated analysis and testing</p>
              </div>
              <div className="flex items-start">
                <Badge className="mt-1 mr-2">3</Badge>
                <p>Engage third-party security audit</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <section>
        <div className="bg-card border border-border/40 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Need Professional Security Assistance?</h2>
          <p className="text-muted-foreground mb-6">
            Our platform connects you with vetted security experts who can help secure your blockchain project through audits, code reviews, and security assessments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Find Security Experts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline">
              Browse Security Services
            </Button>
          </div>
        </div>
      </section>
    </ContentPage>
  );
}
