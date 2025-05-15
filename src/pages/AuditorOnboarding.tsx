
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { EnhancedAuditorOnboarding } from "@/components/onboarding/auditor/enhanced-auditor-onboarding";

const AuditorOnboarding = () => {
  return (
    <>
      <Helmet>
        <title>Auditor Onboarding | Hawkly</title>
        <meta
          name="description"
          content="Complete your auditor profile to be matched with suitable Web3 projects."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EnhancedAuditorOnboarding />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuditorOnboarding;
