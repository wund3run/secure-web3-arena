
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Bell, Clock, FileCheck } from "lucide-react";

export function ContinuousSecurity() {
  return (
    <div className="w-full space-y-8">
      <div className="text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Continuous Security Model</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Security doesn't end after a successful audit - our platform provides continuous protection
        </p>
      </div>
      
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="response">Response</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle>Initial Audit</CardTitle>
                </div>
                <CardDescription>The foundation of your security</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs">1</span>
                    </span>
                    <span>Comprehensive security assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs">2</span>
                    </span>
                    <span>Vulnerability identification and classification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <span className="text-primary text-xs">3</span>
                    </span>
                    <span>Detailed remediation recommendations</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-secondary/10 p-2 rounded-full">
                    <Bell className="h-5 w-5 text-secondary" />
                  </div>
                  <CardTitle>Ongoing Monitoring</CardTitle>
                </div>
                <CardDescription>Continuous vigilance</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                      <span className="text-secondary text-xs">1</span>
                    </span>
                    <span>Real-time vulnerability alerts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                      <span className="text-secondary text-xs">2</span>
                    </span>
                    <span>Ecosystem security updates</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-secondary/10 flex items-center justify-center mt-0.5">
                      <span className="text-secondary text-xs">3</span>
                    </span>
                    <span>Contract interaction monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="bg-web3-orange/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-web3-orange" />
                  </div>
                  <CardTitle>Rapid Response</CardTitle>
                </div>
                <CardDescription>Swift action when needed</CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5">
                      <span className="text-web3-orange text-xs">1</span>
                    </span>
                    <span>Emergency response team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5">
                      <span className="text-web3-orange text-xs">2</span>
                    </span>
                    <span>Mitigation strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="h-5 w-5 rounded-full bg-web3-orange/10 flex items-center justify-center mt-0.5">
                      <span className="text-web3-orange text-xs">3</span>
                    </span>
                    <span>Post-incident analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Button size="lg">
              Get Started with Continuous Security
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="monitoring" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Monitoring Services</CardTitle>
              <CardDescription>
                Real-time protection for your blockchain projects
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted/50 p-4 rounded-lg space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Bell className="h-5 w-5 text-secondary" />
                  Key Monitoring Features
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-card p-3 rounded-md border border-border/30">
                    <h4 className="font-medium">Vulnerability Database Integration</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Continuous cross-referencing with known vulnerability databases to identify emerging threats
                    </p>
                  </div>
                  
                  <div className="bg-card p-3 rounded-md border border-border/30">
                    <h4 className="font-medium">Transaction Monitoring</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Real-time monitoring of contract transactions to detect suspicious patterns
                    </p>
                  </div>
                  
                  <div className="bg-card p-3 rounded-md border border-border/30">
                    <h4 className="font-medium">Gas Anomaly Detection</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Identifies unusual gas consumption that could indicate an exploit attempt
                    </p>
                  </div>
                  
                  <div className="bg-card p-3 rounded-md border border-border/30">
                    <h4 className="font-medium">Dependency Tracking</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Monitors dependencies and external contracts for security updates and vulnerabilities
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row gap-4">
                <Card className="flex-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Basic Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Daily security scans</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Email notifications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Basic vulnerability alerts</span>
                      </li>
                    </ul>
                    <Button variant="outline" className="w-full">
                      Start Free
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="flex-1 border-primary">
                  <CardHeader className="pb-2 bg-primary/5">
                    <CardTitle className="text-lg">Premium Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Real-time monitoring</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Instant notifications</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Advanced threat detection</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-primary" />
                        <span>Emergency response team access</span>
                      </li>
                    </ul>
                    <Button className="w-full">
                      Get Premium
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="response" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rapid Response Protocol</CardTitle>
              <CardDescription>
                Quick, effective responses when security incidents occur
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center text-xs text-primary">1</span>
                      Detection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our system identifies potential security threats through continuous monitoring and expert analysis
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center text-xs text-primary">2</span>
                      Alert
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Immediate notifications are sent to both project owners and security team members
                    </p>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg border border-border/30">
                    <h3 className="font-semibold mb-2 flex items-center gap-2">
                      <span className="bg-primary/10 h-6 w-6 rounded-full flex items-center justify-center text-xs text-primary">3</span>
                      Response
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Expert security teams deploy immediate mitigation strategies to address vulnerabilities
                    </p>
                  </div>
                </div>
                
                <div className="bg-card p-5 rounded-lg border border-border/30">
                  <h3 className="font-semibold mb-3">Emergency Response Team</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Our elite team of security specialists is ready to respond to critical incidents 24/7
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Team Capabilities:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-primary mt-0.5" />
                          <span>Vulnerability triage and prioritization</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-primary mt-0.5" />
                          <span>Emergency patch development</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Shield className="h-4 w-4 text-primary mt-0.5" />
                          <span>Attack vector analysis</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">Response Times:</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center justify-between">
                          <span>Critical vulnerabilities:</span>
                          <span className="font-medium">< 30 minutes</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>High severity issues:</span>
                          <span className="font-medium">< 2 hours</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <span>Medium/Low severity:</span>
                          <span className="font-medium">< 24 hours</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Button>
                  Learn More About Response Protocols
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rewards" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Rewards Program</CardTitle>
              <CardDescription>
                Incentives for ongoing security contributions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="bg-muted/30 p-5 rounded-lg">
                  <h3 className="font-semibold mb-3">Rewards Structure</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-web3-purple/10 p-2 rounded-full">
                            <Shield className="h-5 w-5 text-web3-purple" />
                          </div>
                          <h4 className="font-medium">Vulnerability Reports</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Earn rewards for identifying and reporting security vulnerabilities
                        </p>
                        <div className="bg-muted/50 p-2 rounded-md text-xs">
                          <div className="flex justify-between mb-1">
                            <span>Critical:</span>
                            <span className="font-medium">5,000-10,000 USDC</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>High:</span>
                            <span className="font-medium">1,000-5,000 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Medium:</span>
                            <span className="font-medium">250-1,000 USDC</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-web3-teal/10 p-2 rounded-full">
                            <Bell className="h-5 w-5 text-web3-teal" />
                          </div>
                          <h4 className="font-medium">Monitoring Contributions</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Rewards for active participation in continuous security monitoring
                        </p>
                        <div className="bg-muted/50 p-2 rounded-md text-xs">
                          <div className="flex justify-between mb-1">
                            <span>First alert:</span>
                            <span className="font-medium">500-2,000 USDC</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Verified threat:</span>
                            <span className="font-medium">250-1,000 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Monthly activity:</span>
                            <span className="font-medium">100-500 USDC</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-border/50">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-web3-orange/10 p-2 rounded-full">
                            <Clock className="h-5 w-5 text-web3-orange" />
                          </div>
                          <h4 className="font-medium">Response Team</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Incentives for participating in rapid response to security incidents
                        </p>
                        <div className="bg-muted/50 p-2 rounded-md text-xs">
                          <div className="flex justify-between mb-1">
                            <span>Critical response:</span>
                            <span className="font-medium">1,000-5,000 USDC</span>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span>Solution implementation:</span>
                            <span className="font-medium">500-2,500 USDC</span>
                          </div>
                          <div className="flex justify-between">
                            <span>On-call premium:</span>
                            <span className="font-medium">200 USDC/week</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="text-center">
                  <Button>Join Security Rewards Program</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
