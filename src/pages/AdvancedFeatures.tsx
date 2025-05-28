
import React, { useState } from "react";
import { ContentPage } from "@/components/content/content-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, Search, Bell, Target, Zap, Settings, 
  TrendingUp, Shield, Sparkles 
} from "lucide-react";
import { PredictiveAnalytics } from "@/components/advanced/PredictiveAnalytics";
import { AccessibilityEnhancer } from "@/components/advanced/AccessibilityEnhancer";
import { SmartNotificationSystem } from "@/components/advanced/SmartNotificationSystem";
import { AdvancedSearch } from "@/components/advanced/AdvancedSearch";
import { PersonalizationEngine } from "@/components/advanced/PersonalizationEngine";

const AdvancedFeatures = () => {
  const [activeTab, setActiveTab] = useState("analytics");

  return (
    <ContentPage
      title="Advanced Features"
      description="Cutting-edge AI-powered features and intelligent automation for the future of Web3 security."
    >
      <div className="space-y-8">
        {/* Header Section */}
        <section className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-50 to-blue-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Powered by Advanced AI & Machine Learning
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold">
            Advanced <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">AI Features</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of Web3 security with our advanced AI-powered features, 
            intelligent automation, and predictive analytics designed for security professionals.
          </p>
        </section>

        {/* Features Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:mx-auto">
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">AI Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="search" className="flex items-center gap-2">
              <Search className="h-4 w-4" />
              <span className="hidden sm:inline">Smart Search</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="personalization" className="flex items-center gap-2">
              <Target className="h-4 w-4" />
              <span className="hidden sm:inline">Personalization</span>
            </TabsTrigger>
            <TabsTrigger value="accessibility" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Accessibility</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Brain className="h-6 w-6 text-purple-600" />
                Predictive Analytics & AI Insights
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced machine learning algorithms analyze market trends, security patterns, 
                and user behavior to provide actionable insights and predictions.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  95% Accuracy
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Analysis
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  <Shield className="h-3 w-3 mr-1" />
                  Proactive Alerts
                </Badge>
              </div>
            </div>
            <PredictiveAnalytics />
          </TabsContent>

          <TabsContent value="search" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Search className="h-6 w-6 text-blue-600" />
                Advanced Search & Discovery
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Intelligent search with semantic understanding, advanced filtering, 
                and personalized recommendations to find exactly what you need.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-blue-100 text-blue-700">
                  <Brain className="h-3 w-3 mr-1" />
                  AI-Powered
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  <Search className="h-3 w-3 mr-1" />
                  Semantic Search
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Target className="h-3 w-3 mr-1" />
                  Smart Filters
                </Badge>
              </div>
            </div>
            <AdvancedSearch />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Bell className="h-6 w-6 text-orange-600" />
                Smart Notification System
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Intelligent notifications that learn from your behavior, prioritize important updates, 
                and respect your preferences and schedule.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-orange-100 text-orange-700">
                  <Bell className="h-3 w-3 mr-1" />
                  Priority-Based
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Brain className="h-3 w-3 mr-1" />
                  Learning System
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  <Settings className="h-3 w-3 mr-1" />
                  Fully Configurable
                </Badge>
              </div>
            </div>
            <SmartNotificationSystem />
          </TabsContent>

          <TabsContent value="personalization" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                AI Personalization Engine
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Advanced personalization that adapts to your preferences, behavior patterns, 
                and professional goals to deliver the most relevant experience.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-green-100 text-green-700">
                  <Target className="h-3 w-3 mr-1" />
                  Behavioral Learning
                </Badge>
                <Badge className="bg-purple-100 text-purple-700">
                  <Sparkles className="h-3 w-3 mr-1" />
                  Dynamic Adaptation
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Brain className="h-3 w-3 mr-1" />
                  Predictive Suggestions
                </Badge>
              </div>
            </div>
            <PersonalizationEngine />
          </TabsContent>

          <TabsContent value="accessibility" className="space-y-6">
            <div className="text-center space-y-4 mb-8">
              <h2 className="text-2xl font-bold flex items-center justify-center gap-2">
                <Settings className="h-6 w-6 text-gray-600" />
                Advanced Accessibility Features
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive accessibility tools and customization options to ensure 
                our platform is usable by everyone, regardless of ability or preference.
              </p>
              <div className="flex justify-center gap-2">
                <Badge className="bg-gray-100 text-gray-700">
                  <Settings className="h-3 w-3 mr-1" />
                  WCAG 2.1 AA
                </Badge>
                <Badge className="bg-blue-100 text-blue-700">
                  <Zap className="h-3 w-3 mr-1" />
                  Real-time Adaptation
                </Badge>
                <Badge className="bg-green-100 text-green-700">
                  <Shield className="h-3 w-3 mr-1" />
                  Privacy-First
                </Badge>
              </div>
            </div>
            <div className="bg-muted/30 rounded-lg p-8 text-center">
              <Settings className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Accessibility Enhancer</h3>
              <p className="text-muted-foreground mb-4">
                The accessibility enhancer is always available via the floating button. 
                Try it out to customize your experience!
              </p>
              <Badge variant="outline">Look for the accessibility icon in the bottom-right corner</Badge>
            </div>
            <AccessibilityEnhancer />
          </TabsContent>
        </Tabs>

        {/* Feature Highlights */}
        <section className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Why These Features Matter</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our advanced features are designed to enhance security professionals' productivity, 
              improve decision-making, and create a more inclusive platform for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold">AI-Powered Insights</h3>
              <p className="text-sm text-muted-foreground">
                Machine learning algorithms provide predictive analytics and intelligent recommendations
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                <Target className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold">Personalized Experience</h3>
              <p className="text-sm text-muted-foreground">
                Adaptive interface that learns from your behavior and preferences
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold">Intelligent Automation</h3>
              <p className="text-sm text-muted-foreground">
                Smart notifications and automated workflows to boost productivity
              </p>
            </div>

            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-orange-600" />
              </div>
              <h3 className="font-semibold">Inclusive Design</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive accessibility features for users with diverse needs
              </p>
            </div>
          </div>
        </section>
      </div>
    </ContentPage>
  );
};

export default AdvancedFeatures;
