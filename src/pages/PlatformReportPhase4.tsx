
import React from "react";
import { ProductionNavbar } from "@/components/layout/production-navbar";
import { Footer } from "@/components/layout/footer";
import { ComprehensiveErrorBoundary } from "@/components/error/comprehensive-error-boundary";
import { PageMeta } from "@/components/seo/PageMeta";
import { SkipNavigation } from "@/components/accessibility/SkipNavigation";
import { LazyComponentWrapper, LazyAdminPlatformReport } from "@/components/performance/LazyComponents";
import { ScreenReaderAnnouncementProvider } from "@/components/accessibility/ScreenReaderAnnouncements";
import { KeyboardNavigationManager } from "@/components/navigation/KeyboardNavigationManager";
import { PlatformValidatorWidgetEnhanced } from "@/components/validation/PlatformValidatorWidgetEnhanced";
import { EnhancedLoadingState } from "@/components/ui/enhanced-loading-state";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Rocket, Shield, Zap } from "lucide-react";

const PlatformReportPhase4 = () => {
  const skipLinks = [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#platform-analysis", label: "Skip to platform analysis" },
    { href: "#validation-results", label: "Skip to validation results" }
  ];

  return (
    <>
      <PageMeta
        title="Platform Phase 4 Audit Report - Production Ready"
        description="Complete production-ready audit report of the Hawkly platform with comprehensive error handling, accessibility features, and performance optimizations."
        keywords={["platform audit", "production ready", "accessibility", "performance", "web3 security", "error handling"]}
        type="article"
      />
      
      <ScreenReaderAnnouncementProvider>
        <KeyboardNavigationManager>
          <SkipNavigation links={skipLinks} />
          
          <div className="min-h-screen bg-background">
            <ProductionNavbar />
            <main 
              id="main-content"
              className="container py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              tabIndex={-1}
            >
              <ComprehensiveErrorBoundary>
                {/* Phase 4 Summary */}
                <section className="mb-8">
                  <div className="text-center space-y-4">
                    <Badge variant="default" className="text-lg px-4 py-2 bg-green-100 text-green-800">
                      <Rocket className="mr-2 h-5 w-5" />
                      Phase 4 Complete - Production Ready
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight">
                      Hawkly Platform Audit Report
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                      Comprehensive production-ready platform with enhanced error handling, 
                      accessibility features, performance optimizations, and mobile responsiveness.
                    </p>
                  </div>
                </section>

                {/* Phase 4 Features Grid */}
                <section className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-green-600" />
                          Error Handling
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Production Error Boundaries
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Enhanced Toast System
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Accessibility Error Handler
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Zap className="h-5 w-5 text-blue-600" />
                          Performance
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Optimized Image Loading
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Lazy Component Loading
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Web Vitals Monitoring
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Shield className="h-5 w-5 text-purple-600" />
                          Accessibility
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Screen Reader Support
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Keyboard Navigation
                          </li>
                          <li className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            Focus Management
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Enhanced Validation Widget */}
                <section id="validation-results" className="mb-8" aria-label="Platform Validation Results">
                  <PlatformValidatorWidgetEnhanced 
                    stakeholderType="developer"
                    showDetailedView={true}
                    className="w-full"
                  />
                </section>

                {/* Main Platform Analysis */}
                <section id="platform-analysis" aria-label="Platform Analysis Report">
                  <LazyComponentWrapper fallback={
                    <div className="min-h-[400px] flex items-center justify-center">
                      <EnhancedLoadingState 
                        message="Loading comprehensive platform analysis..."
                        variant="skeleton"
                        size="lg"
                      />
                    </div>
                  }>
                    <LazyAdminPlatformReport />
                  </LazyComponentWrapper>
                </section>
              </ComprehensiveErrorBoundary>
            </main>
            <Footer />
          </div>
        </KeyboardNavigationManager>
      </ScreenReaderAnnouncementProvider>
    </>
  );
};

export default PlatformReportPhase4;
