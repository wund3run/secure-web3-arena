
import React from "react";
import { Helmet } from "react-helmet-async";
import { HeroSection } from "@/components/home/hero-section";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Hawkly | Web3 Security Marketplace</title>
        <meta name="description" content="Find top security professionals to audit and secure your Web3 projects." />
      </Helmet>
      
      <HeroSection />
      
      {/* You can add more sections here as needed */}
    </>
  );
}
