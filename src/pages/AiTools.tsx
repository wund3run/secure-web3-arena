
import React, { useState } from 'react';
import { ContentPage } from '@/components/content/content-page';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Zap, Shield, Code, Scan, Brain, Target, 
  CheckCircle, AlertTriangle, PlayCircle, 
  Download, Upload, FileText, ArrowRight,
  Cpu, BarChart3, Settings, Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AiTools = () => {
  const [scanProgress, setScanProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);

  const aiTools = [
    {
      name: "Smart Contract Scanner",
      description: "AI-powered static analysis for Solidity smart contracts",
      icon: <Scan className="h-6 w-6" />,
      category: "Analysis",
      features: ["Vulnerability Detection", "Gas Optimization", "Code Quality"],
      accuracy: "94%",
      supported: ["Solidity", "Vyper"],
      color: "bg-blue-100 text-blue-700"
    },
    {
      name: "DeFi Protocol Analyzer", 
      description: "Specialized analysis for DeFi protocols and mechanisms",
      icon: <Target className="h-6 w-6" />,
      category: "DeFi",
      features: ["Flash Loan Detection", "Oracle Analysis", "Liquidity Risks"],
      accuracy: "91%",
      supported: ["Uniswap", "Compound", "Aave"],
      color: "bg-green-100 text-green-700"
    },
    {
      name: "Vulnerability Predictor",
      description: "Machine learning model for predicting potential vulnerabilities",
      icon: <Brain className="h-6 w-6" />,
      category: "Prediction",
      features: ["Risk Scoring", "Pattern Recognition", "Trend Analysis"],
      accuracy: "87%",
      supported: ["All EVM chains"],
      color: "bg-purple-100 text-purple-700"
    },
    {
      name: "Audit Report Generator",
      description: "Generate comprehensive audit reports using AI analysis",
      icon: <FileText className="h-6 w-6" />,
      category: "Reporting",
      features: ["Auto Documentation", "Risk Assessment", "Recommendations"],
      accuracy: "89%",
      supported: ["Multiple formats"],
      color: "bg-orange-100 text-orange-700"
    }
  ];

  const scanResults = [
    { type: "Critical", count: 0, color: "text-red-600" },
    { type: "High", count: 2, color: "text-orange-600" },
    { type: "Medium", count: 5, color: "text-yellow-600" },
    { type: "Low", count: 8, color: "text-green-600" },
    { type: "Info", count: 12, color: "text-blue-600" }
  ];

  const quickScanFeatures = [
    "Reentrancy Detection",
    "Access Control Issues", 
    "Integer Overflow/Underflow",
    "Gas Optimization",
    "Code Quality Checks",
    "Best Practice Validation"
  ];

  const startQuickScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <ContentPage
      title="AI Security Tools"
      description="Advanced AI-powered security analysis tools for smart contracts, DeFi protocols, and Web3 applications with real-time vulnerability detection."
    >
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            AI-Powered Security Analysis
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">
            AI Security <span className="text-primary">Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leverage cutting-edge artificial intelligence to identify vulnerabilities, 
            optimize code, and enhance the security of your Web3 applications.
          </p>
        </div>

        <Tabs defaultValue="scanner" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="scanner">Quick Scanner</TabsTrigger>
            <TabsTrigger value="tools">AI Tools</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="scanner" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Quick Scanner */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5 text-primary" />
                    Quick Security Scan
                  </CardTitle>
                  <CardDescription>
                    Upload your smart contract for instant AI-powered security analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground mb-4">
                      Drop your .sol files here or click to upload
                    </p>
                    <Button variant="outline">
                      <Upload className="mr-2 h-4 w-4" />
                      Choose Files
                    </Button>
                  </div>
                  
                  {isScanning && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing contract...</span>
                        <span>{scanProgress}%</span>
                      </div>
                      <Progress value={scanProgress} />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={startQuickScan} 
                      disabled={isScanning}
                      className="flex-1"
                    >
                      {isScanning ? (
                        <>
                          <Cpu className="mr-2 h-4 w-4 animate-spin" />
                          Scanning...
                        </>
                      ) : (
                        <>
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Start Scan
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <Settings className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Scan Features:</h4>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      {quickScanFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-1">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Panel */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Scan Results
                  </CardTitle>
                  <CardDescription>
                    {scanProgress === 100 ? "Analysis complete" : "Results will appear here after scanning"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {scanProgress === 100 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        {scanResults.map((result, index) => (
                          <div key={index} className="text-center">
                            <div className={`text-2xl font-bold ${result.color}`}>
                              {result.count}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.type}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Security Score</span>
                          <span className="font-medium">78/100</span>
                        </div>
                        <Progress value={78} className="h-2" />
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Download className="mr-2 h-3 w-3" />
                          Download Report
                        </Button>
                        <Button variant="outline" size="sm">
                          Share Results
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        Upload and scan your contract to see detailed security analysis
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="tools" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {aiTools.map((tool, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${tool.color}`}>
                          {tool.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg">{tool.name}</CardTitle>
                          <Badge variant="outline">{tool.category}</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Accuracy</div>
                        <div className="font-bold text-green-600">{tool.accuracy}</div>
                      </div>
                    </div>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-sm mb-2">Key Features:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.features.map((feature, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-2">Supported:</h4>
                      <div className="flex flex-wrap gap-1">
                        {tool.supported.map((item, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full">
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Try {tool.name}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analysis">
            <div className="text-center py-12">
              <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Advanced Analysis</h3>
              <p className="text-muted-foreground mb-6">
                Deep dive into your contract's security with advanced AI analysis and recommendations.
              </p>
              <Button asChild>
                <Link to="/vulnerabilities">
                  View Vulnerability Database
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">AI-Generated Reports</h3>
              <p className="text-muted-foreground mb-6">
                Get comprehensive, professional audit reports generated by our AI analysis.
              </p>
              <Button asChild>
                <Link to="/templates">
                  View Report Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need More Comprehensive Analysis?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            While AI tools provide excellent initial analysis, combine them with expert human audits 
            for the most thorough security assessment of your Web3 project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/request-audit">
                <Shield className="mr-2 h-4 w-4" />
                Request Expert Audit
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/marketplace">
                Browse Security Experts
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </ContentPage>
  );
};

export default AiTools;
