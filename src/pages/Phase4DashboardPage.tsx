import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Brain,
  Bot,
  Box,
  Building,
  TrendingUp,
  Sparkles,
  CheckCircle,
  Activity,
  Users,
  Shield,
  Zap
} from "lucide-react";
import { SmartAuditAnalyzer } from "@/components/ai/SmartAuditAnalyzer";
import { BlockchainIntegration } from "@/components/blockchain/BlockchainIntegration";
import { EnterpriseFeatures } from "@/components/enterprise/EnterpriseFeatures";
import { PredictiveAnalytics } from "@/components/ai-recommendations/PredictiveAnalytics";

export default function Phase4DashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const features = [
    {
      id: 'ai-analysis',
      title: 'AI-Powered Smart Analysis',
      description: 'Intelligent vulnerability detection and automated security recommendations',
      icon: Bot,
      status: 'active',
      capabilities: [
        'Automated vulnerability scanning',
        'Gas optimization recommendations',
        'Security pattern analysis',
        'AI-powered insights'
      ]
    },
    {
      id: 'blockchain',
      title: 'Blockchain Integration',
      description: 'Direct smart contract interaction and on-chain verification',
      icon: Box,
      status: 'active',
      capabilities: [
        'Multi-network support',
        'Smart contract analysis',
        'Transaction monitoring',
        'On-chain verification'
      ]
    },
    {
      id: 'enterprise',
      title: 'Enterprise Features',
      description: 'Advanced security, compliance, and organizational management',
      icon: Building,
      status: 'active',
      capabilities: [
        'SSO & Identity management',
        'Role-based permissions',
        'Compliance reporting',
        'Security policies'
      ]
    },
    {
      id: 'predictive',
      title: 'Predictive Analytics',
      description: 'ML-powered insights and strategic recommendations',
      icon: Brain,
      status: 'active',
      capabilities: [
        'Risk predictions',
        'Trend analysis',
        'Business insights',
        'Strategic recommendations'
      ]
    }
  ];

  const stats = [
    {
      title: 'AI Models Active',
      value: '4',
      change: '+100%',
      icon: Bot,
      color: 'text-blue-600'
    },
    {
      title: 'Networks Supported',
      value: '6',
      change: '+200%',
      icon: Box,
      color: 'text-purple-600'
    },
    {
      title: 'Enterprise Features',
      value: '12',
      change: '+400%',
      icon: Building,
      color: 'text-green-600'
    },
    {
      title: 'Prediction Accuracy',
      value: '89%',
      change: '+89%',
      icon: TrendingUp,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Phase 4: AI-Powered Intelligence
          </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Experience the future of Web3 security with advanced AI analysis, blockchain integration, 
          enterprise features, and predictive analytics.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            Phase 4 Complete
          </Badge>
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <Zap className="h-3 w-3 mr-1" />
            AI-Powered
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="ai-analysis">AI Analysis</TabsTrigger>
          <TabsTrigger value="blockchain">Blockchain</TabsTrigger>
          <TabsTrigger value="enterprise">Enterprise</TabsTrigger>
          <TabsTrigger value="predictive">Predictive</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <Card key={index} className="relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                      <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-2">
            {features.map((feature) => (
              <Card key={feature.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      {feature.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-muted-foreground">Key Capabilities:</h4>
                    <div className="grid gap-1">
                      {feature.capabilities.map((capability, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          {capability}
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => setActiveTab(feature.id)}
                  >
                    Explore Feature
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Phase Completion Summary */}
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6 text-blue-600" />
                Phase 4 Implementation Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="font-medium mb-2">Completed Components</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      SmartAuditAnalyzer - AI-powered vulnerability detection
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      BlockchainIntegration - Multi-network smart contract analysis
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      EnterpriseFeatures - SSO, permissions, compliance
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      PredictiveAnalytics - ML insights and recommendations
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Technical Achievements</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Advanced AI integration with confidence scoring
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Multi-blockchain network support
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Enterprise-grade security and compliance
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Predictive analytics and ML recommendations
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-analysis">
          <SmartAuditAnalyzer />
        </TabsContent>

        <TabsContent value="blockchain">
          <BlockchainIntegration />
        </TabsContent>

        <TabsContent value="enterprise">
          <EnterpriseFeatures />
        </TabsContent>

        <TabsContent value="predictive">
          <PredictiveAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
} 