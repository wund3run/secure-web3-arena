
import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ErrorBoundary } from "@/utils/error-handling";
import { PageMeta } from "@/components/seo/PageMeta";
import { SkipNavigation } from "@/components/accessibility/SkipNavigation";
import { LazyComponentWrapper, LazyAdminPlatformReport } from "@/components/performance/LazyComponents";
import { ScreenReaderAnnouncementProvider } from "@/components/accessibility/ScreenReaderAnnouncements";
import { KeyboardNavigationManager } from "@/components/navigation/KeyboardNavigationManager";

const PlatformReport = () => {
  const skipLinks = [
    { href: "#main-content", label: "Skip to main content" },
    { href: "#navigation", label: "Skip to navigation" },
    { href: "#platform-analysis", label: "Skip to platform analysis" }
  ];

  return (
    <>
      <PageMeta
        title="Platform Audit Report"
        description="Comprehensive audit report of the Hawkly platform security, accessibility, and performance for production readiness."
        keywords={["platform audit", "security report", "accessibility", "performance", "web3 security"]}
        type="article"
      />
      
      <ScreenReaderAnnouncementProvider>
        <KeyboardNavigationManager>
          <SkipNavigation links={skipLinks} />
          
          <div className="min-h-screen bg-background">
            <Navbar />
            <main 
              id="main-content"
              className="container py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
              tabIndex={-1}
            >
              <ErrorBoundary>
                <section id="platform-analysis" aria-label="Platform Analysis Report">
                  <LazyComponentWrapper fallback={
                    <div className="min-h-[400px] flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                        <p className="text-muted-foreground">Loading platform analysis...</p>
                      </div>
                    </div>
                  }>
                    <LazyAdminPlatformReport />
                  </LazyComponentWrapper>
                </section>
              </ErrorBoundary>
            </main>
            <Footer />
          </div>
        </KeyboardNavigationManager>
      </ScreenReaderAnnouncementProvider>
    </>
  );
};

export default PlatformReport;
