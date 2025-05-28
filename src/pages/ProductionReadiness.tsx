
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { ProductionReadinessAssessment } from '@/components/production-readiness/ProductionReadinessAssessment';

export default function ProductionReadiness() {
  return (
    <>
      <Helmet>
        <title>Production Readiness Assessment | Hawkly</title>
        <meta
          name="description"
          content="Comprehensive production readiness assessment for web3 cybersecurity SaaS platform"
        />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <ProductionReadinessAssessment />
        </main>
        <Footer />
      </div>
    </>
  );
}
