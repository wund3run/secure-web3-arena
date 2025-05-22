
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import PlatformAuditReport from "@/components/platform-report/PlatformAuditReport";
import { ErrorBoundary } from "@/utils/error-handling";

const PlatformReport = () => {
  return (
    <>
      <Helmet>
        <title>Platform Audit Report | Hawkly</title>
        <meta
          name="description"
          content="Comprehensive audit report of the Hawkly platform security, accessibility, and performance."
        />
      </Helmet>
      <Navbar />
      <main className="container py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ErrorBoundary>
          <PlatformAuditReport />
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
};

export default PlatformReport;
