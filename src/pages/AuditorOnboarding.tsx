
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuditorParametersForm } from "@/components/auditor-parameters/AuditorParametersForm";

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
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Complete Your Auditor Profile
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Provide your expertise details to help our AI matching system connect you with
              the perfect projects for your skills
            </p>
          </div>
          
          <AuditorParametersForm />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AuditorOnboarding;
