
import React from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { RoadmapTimeline } from "@/components/roadmap/RoadmapTimeline";
import { RoadmapHeader } from "@/components/roadmap/RoadmapHeader";
import { CompletedMilestones } from "@/components/roadmap/CompletedMilestones";
import { FeedbackForm } from "@/components/roadmap/FeedbackForm";
import { SkipToContent } from "@/components/layout/SkipToContent";

export default function Roadmap() {
  return (
    <>
      <Helmet>
        <title>Product Roadmap | Hawkly Web3 Security Marketplace</title>
        <meta 
          name="description" 
          content="Explore Hawkly's roadmap and upcoming features for our Web3 security marketplace. Follow our journey from Foundation to Community Governance." 
        />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent targetId="roadmap-content" />
        <Navbar />
        
        <main id="roadmap-content" className="flex-grow container py-8 md:py-12" tabIndex={-1}>
          <RoadmapHeader />
          <RoadmapTimeline />
          <CompletedMilestones />
          <FeedbackForm />
          
          <div className="mt-16 border-t pt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">Stay Updated</h2>
            <p className="mb-6 text-muted-foreground max-w-2xl mx-auto">
              Follow our progress through monthly updates on our blog and social media channels.
              Join our Discord community to participate in discussions about upcoming features.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline" asChild>
                <a href="https://twitter.com/hawklysecurity" target="_blank" rel="noopener noreferrer">
                  Follow on X
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://discord.gg/hawkly" target="_blank" rel="noopener noreferrer">
                  Join Discord
                </a>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/blog">
                  Read Monthly Updates
                </Link>
              </Button>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  );
}
