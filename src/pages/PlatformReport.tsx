
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AccessibilityReport } from "@/components/reports/AccessibilityReport";

export default function PlatformReport() {
  return (
    <>
      <Helmet>
        <title>Platform Status Report | Hawkly</title>
        <meta name="description" content="Comprehensive analysis of platform health, accessibility, and performance metrics." />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-grow container py-8">
          <AccessibilityReport />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
