
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IntelligentRecommendationEngine } from "@/components/ai-recommendations/IntelligentRecommendationEngine";
import { AdvancedBehaviorAnalytics } from "@/components/analytics/AdvancedBehaviorAnalytics";
import { PredictiveOptimization } from "@/components/optimization/PredictiveOptimization";
import { UserJourneyTracker } from "@/components/analytics/UserJourneyTracker";
import { useState } from "react";
import { Brain, BarChart3, TrendingUp, Target, Zap } from "lucide-react";

export default function Phase3Dashboard() {
  const [selectedUserType, setSelectedUserType] = useState<"project_owner" | "auditor" | "admin">("project_owner");

  return (
    <>
      <Helmet>
        <title>Phase 3: AI-Powered Intelligence | Hawkly</title>
        <meta
          name="description"
          content="Advanced AI-powered recommendations, predictive analytics, and intelligent optimization for the Hawkly platform."
        />
      </Helmet>
      
      <UserJourneyTracker />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                Phase 3: AI-Powered Intelligence Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Advanced machine learning algorithms, predictive analytics, and intelligent 
                optimization to revolutionize the user experience.
              </p>
            </div>

            {/* User Type Selector */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex gap-4">
                {(["project_owner", "auditor", "admin"] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedUserType(type)}
                    className={`px-6 py-3 rounded-lg text-sm font-medium transition-colors ${
                      selectedUserType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {type.replace("_", " ").toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="recommendations" className="space-y-8">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="recommendations" className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  AI Recommendations
                </TabsTrigger>
                <TabsTrigger value="analytics" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Behavior Analytics
                </TabsTrigger>
                <TabsTrigger value="optimization" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Predictive Optimization
                </TabsTrigger>
                <TabsTrigger value="insights" className="flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Strategic Insights
                </TabsTrigger>
              </TabsList>

              <TabsContent value="recommendations" className="space-y-6">
                <IntelligentRecommendationEngine 
                  userType={selectedUserType}
                  userBehaviorData={{
                    sessionDuration: 280,
                    pageViews: 8,
                    conversions: 2,
                    lastActive: "2024-01-15"
                  }}
                />
              </TabsContent>

              <TabsContent value="analytics" className="space-y-6">
                <AdvancedBehaviorAnalytics />
              </TabsContent>

              <TabsContent value="optimization" className="space-y-6">
                <PredictiveOptimization />
              </TabsContent>

              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="h-8 w-8 text-blue-600" />
                      <h3 className="text-lg font-semibold">Real-time Intelligence</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      AI processes user interactions in real-time to provide instant optimization suggestions.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Live behavior pattern detection</li>
                      <li>• Dynamic content optimization</li>
                      <li>• Instant feedback loops</li>
                      <li>• Adaptive user interfaces</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Brain className="h-8 w-8 text-green-600" />
                      <h3 className="text-lg font-semibold">Machine Learning Models</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Advanced ML algorithms continuously learn from user behavior to improve predictions.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Conversion prediction models</li>
                      <li>• User lifetime value estimation</li>
                      <li>• Churn risk assessment</li>
                      <li>• Personalization engines</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Target className="h-8 w-8 text-purple-600" />
                      <h3 className="text-lg font-semibold">Strategic Optimization</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Data-driven insights to guide long-term platform strategy and growth.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Market trend analysis</li>
                      <li>• Competitive intelligence</li>
                      <li>• Growth opportunity identification</li>
                      <li>• Resource allocation optimization</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="h-8 w-8 text-orange-600" />
                      <h3 className="text-lg font-semibold">Performance Metrics</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive tracking of key performance indicators with predictive insights.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>User Engagement:</span>
                        <span className="font-semibold text-green-600">+24%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conversion Rate:</span>
                        <span className="font-semibold text-blue-600">+18%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Retention:</span>
                        <span className="font-semibold text-purple-600">+31%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Efficiency:</span>
                        <span className="font-semibold text-orange-600">+42%</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-950 dark:to-blue-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="h-8 w-8 text-cyan-600" />
                      <h3 className="text-lg font-semibold">Advanced Analytics</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Deep dive analytics with AI-powered insights and automated reporting.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Cohort analysis automation</li>
                      <li>• Behavioral segmentation</li>
                      <li>• Funnel optimization insights</li>
                      <li>• Predictive modeling dashboards</li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 p-6 rounded-lg border">
                    <div className="flex items-center gap-3 mb-4">
                      <Zap className="h-8 w-8 text-yellow-600" />
                      <h3 className="text-lg font-semibold">Automation & Intelligence</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Intelligent automation that learns and adapts to optimize user experiences.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Smart notification timing</li>
                      <li>• Dynamic pricing optimization</li>
                      <li>• Automated A/B testing</li>
                      <li>• Intelligent content curation</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
