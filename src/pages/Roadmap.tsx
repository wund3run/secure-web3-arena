
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";
import { RoadmapHeader } from "@/components/roadmap/RoadmapHeader";
import { CompletedMilestones } from "@/components/roadmap/CompletedMilestones";
import { FeedbackForm } from "@/components/roadmap/FeedbackForm";

export default function Roadmap() {
  return (
    <>
      <Helmet>
        <title>Product Roadmap | Hawkly Web3 Security Marketplace</title>
        <meta 
          name="description" 
          content="Explore Hawkly's roadmap and upcoming features for our Web3 security marketplace. Discover our plans for evolving blockchain security services." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        
        <main className="flex-grow container py-8 md:py-12">
          <RoadmapHeader />
          <RoadmapTimeline />
          <CompletedMilestones />
          <FeedbackForm />
        </main>
        
        <Footer />
      </div>
    </>
  );
}
