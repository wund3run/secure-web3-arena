
import React, { useState } from "react";
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GuidelinesHeader } from "@/components/guidelines/guidelines-header";
import { GuidelinesTabs } from "@/components/guidelines/guidelines-tabs";
import { GuidelinesContent } from "@/components/guidelines/guidelines-content";

export default function AuditGuidelines() {
  const [activeTab, setActiveTab] = useState("process");
  
  return (
    <>
      <Helmet>
        <title>Audit Guidelines & Standards | Hawkly</title>
        <meta name="description" content="Comprehensive security audit standards and guidelines for Web3 projects. Learn about our audit methodology, vulnerability classifications, and best practices." />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow">
          <GuidelinesHeader />
          
          <div className="container mx-auto px-4 py-8">
            <GuidelinesTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <GuidelinesContent activeTab={activeTab} />
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
