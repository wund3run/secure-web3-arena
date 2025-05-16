
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowRight, Shield, AlertTriangle, TrendingUp, LineChart, Eye, Search } from "lucide-react";

export default function SecurityInsights() {
  return (
    <>
      <Helmet>
        <title>Security Insights | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Latest trends, vulnerabilities, and insights in Web3 security to keep your blockchain projects protected."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Security Insights</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Stay updated on the latest security vulnerabilities, exploits, and best practices for securing blockchain applications.
            </p>
          </div>
          
          <Tabs defaultValue="trends">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="trends">Trends & Analytics</TabsTrigger>
              <TabsTrigger value="vulnerabilities">Recent Vulnerabilities</TabsTrigger>
              <TabsTrigger value="practices">Best Practices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="trends">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <TrendingUp className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Emerging Threat Vectors</CardTitle>
                    <CardDescription>Latest security threats in the Web3 ecosystem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-red-100 text-red-800 border-red-200">High Risk</Badge>
                        <span>Cross-chain bridge vulnerabilities</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-amber-100 text-amber-800 border-amber-200">Medium Risk</Badge>
                        <span>MEV attacks in new L2 networks</span>
                      </li>
                      <li className="flex items-start">
                        <Badge className="mr-2 bg-amber-100 text-amber-800 border-amber-200">Medium Risk</Badge>
                        <span>Oracle manipulation in DeFi protocols</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/vulnerabilities" className="flex items-center justify-center">
                        View Full Analysis <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <LineChart className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Security Incident Metrics</CardTitle>
                    <CardDescription>Statistical analysis of recent security incidents</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-1">Vulnerability Types (Last 30 Days)</h4>
                        <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-red-500" style={{ width: "35%" }}></div>
                        </div>
                        <div className="flex justify-between text-sm mt-1">
                          <span>Access Control: 35%</span>
                          <span>Reentrancy: 28%</span>
                          <span>Others: 37%</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Average Loss Per Incident</h4>
                        <p className="text-lg font-semibold">$2.7M <span className="text-red-500 text-sm">↑12%</span></p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/stats" className="flex items-center justify-center">
                        View Detailed Stats <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="vulnerabilities">
              <div className="space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2 bg-red-100 text-red-800 border-red-200">Critical</Badge>
                        <CardTitle>Integer Overflow in ERC4626 Token Implementation</CardTitle>
                      </div>
                      <span className="text-sm text-muted-foreground">Published: May 10, 2025</span>
                    </div>
                    <CardDescription>
                      A critical vulnerability discovered in a popular ERC4626 implementation could lead to integer overflow during asset conversion.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      This vulnerability affects protocols using the impacted implementation and could allow attackers to extract excess tokens beyond their entitled amount.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Impacted Projects:</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">YieldAggregator</Badge>
                        <Badge variant="outline">DeFiVault</Badge>
                        <Badge variant="outline">+3 more</Badge>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to="/vulnerabilities" className="flex items-center justify-center">
                        View Full Details <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className="mb-2 bg-orange-100 text-orange-800 border-orange-200">High</Badge>
                        <CardTitle>Signature Replay in Cross-Chain Bridge</CardTitle>
                      </div>
                      <span className="text-sm text-muted-foreground">Published: May 5, 2025</span>
                    </div>
                    <CardDescription>
                      A signature replay vulnerability in a major cross-chain bridge allows attackers to replay valid signatures on different chains.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      The vulnerability stems from improper validation of chain identifiers in the signature verification process.
                    </p>
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Mitigation Strategy:</h4>
                      <ul className="list-disc pl-5 space-y-1">
                        <li className="text-muted-foreground">Include chain IDs in signature messages</li>
                        <li className="text-muted-foreground">Implement nonce-based replay protection</li>
                      </ul>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link to="/vulnerabilities" className="flex items-center justify-center">
                        View Full Details <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="practices">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Eye className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Security First Development</CardTitle>
                    <CardDescription>Building security into the development lifecycle</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Threat modeling before implementation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Automated scanning in CI/CD pipeline</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Code review focused on security patterns</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/audit-guidelines" className="flex items-center justify-center">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Smart Contract Patterns</CardTitle>
                    <CardDescription>Security patterns for smart contract development</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Checks-Effects-Interactions pattern</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Pull over push payment model</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Emergency pause mechanisms</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/web3-security" className="flex items-center justify-center">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <Search className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Audit Preparation</CardTitle>
                    <CardDescription>Preparing your project for security audits</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Documentation best practices</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Pre-audit security checklists</span>
                      </li>
                      <li className="flex items-start">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 mr-2"></div>
                        <span>Comprehensive test suite development</span>
                      </li>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/audit-guidelines" className="flex items-center justify-center">
                        Learn More <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-12 flex justify-center">
            <Button asChild size="lg">
              <Link to="/vulnerabilities" className="flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Browse the Vulnerability Database
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
