
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserJourneyTracker } from "@/components/analytics/UserJourneyTracker";
import { ConversionFunnel } from "@/components/analytics/ConversionFunnel";
import { InteractiveTutorial } from "@/components/onboarding/InteractiveTutorial";
import { EnhancedResourceCenter } from "@/components/resources/EnhancedResourceCenter";
import { ABTestProvider } from "@/components/testing/ABTestProvider";
import { useState } from "react";

export default function EnhancedUserJourney() {
  const [selectedUserType, setSelectedUserType] = useState<"project_owner" | "auditor" | "admin">("project_owner");
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  return (
    <ABTestProvider>
      <Helmet>
        <title>Enhanced User Journey | Hawkly</title>
        <meta
          name="description"
          content="Experience the optimized user journey with personalized recommendations and interactive tutorials."
        />
      </Helmet>
      
      <UserJourneyTracker />
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="space-y-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-6">
                Enhanced User Journey Experience
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
                Explore our Phase 2 enhancements including personalized recommendations, 
                interactive tutorials, and advanced analytics.
              </p>
            </div>

            <Tabs defaultValue="analytics" className="space-y-6">
              <TabsList className="grid grid-cols-4 gap-2">
                <TabsTrigger value="analytics">Journey Analytics</TabsTrigger>
                <TabsTrigger value="tutorial">Interactive Tutorial</TabsTrigger>
                <TabsTrigger value="resources">Enhanced Resources</TabsTrigger>
                <TabsTrigger value="testing">A/B Testing</TabsTrigger>
              </TabsList>

              <TabsContent value="analytics" className="space-y-6">
                <ConversionFunnel />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">User Behavior Tracking</h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time tracking of user interactions and journey progression.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Page view tracking with metadata</li>
                      <li>• Conversion event recording</li>
                      <li>• User flow optimization insights</li>
                      <li>• Performance metrics collection</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-secondary/5 to-primary/5 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                    <p className="text-muted-foreground mb-4">
                      Comprehensive insights into user engagement and platform performance.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Funnel conversion analysis</li>
                      <li>• User segmentation insights</li>
                      <li>• Retention rate tracking</li>
                      <li>• Feature usage analytics</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="tutorial" className="space-y-6">
                <div className="flex items-center justify-center mb-6">
                  <div className="flex gap-4">
                    {(["project_owner", "auditor", "admin"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setSelectedUserType(type);
                          setTutorialCompleted(false);
                        }}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
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

                {!tutorialCompleted ? (
                  <InteractiveTutorial
                    userType={selectedUserType}
                    onComplete={() => setTutorialCompleted(true)}
                  />
                ) : (
                  <div className="text-center py-12">
                    <h3 className="text-2xl font-bold mb-4">Tutorial Completed! 🎉</h3>
                    <p className="text-muted-foreground mb-6">
                      You've successfully completed the {selectedUserType.replace("_", " ")} tutorial.
                    </p>
                    <button
                      onClick={() => setTutorialCompleted(false)}
                      className="px-6 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                    >
                      Restart Tutorial
                    </button>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="resources" className="space-y-6">
                <EnhancedResourceCenter userType={selectedUserType} />
              </TabsContent>

              <TabsContent value="testing" className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-950 dark:to-blue-950 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">A/B Testing Framework</h3>
                    <p className="text-muted-foreground mb-4">
                      Continuously optimize user experience through data-driven testing.
                    </p>
                    <ul className="space-y-2 text-sm">
                      <li>• Onboarding flow optimization</li>
                      <li>• CTA button text variations</li>
                      <li>• Pricing display experiments</li>
                      <li>• User interface improvements</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Test Results</h3>
                    <p className="text-muted-foreground mb-4">
                      Real-time insights from running experiments.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Conversion Rate Improvement:</span>
                        <span className="font-semibold text-green-600">+12.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Engagement:</span>
                        <span className="font-semibold text-blue-600">+8.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Time to First Action:</span>
                        <span className="font-semibold text-purple-600">-23%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        <Footer />
      </div>
    </ABTestProvider>
  );
}
