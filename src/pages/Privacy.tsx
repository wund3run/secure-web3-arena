
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Shield } from "lucide-react";

export default function Privacy() {
  return (
    <ContentPage 
      title="Privacy Policy" 
      description="Privacy policy for the Hawkly Web3 Security Marketplace."
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="bg-card rounded-lg p-6 mb-8 border border-border/40 flex items-start">
        <Shield className="h-8 w-8 text-primary mr-4 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-2xl font-semibold mb-2">Your Privacy Matters</h2>
          <p className="text-muted-foreground">
            Last Updated: May 16, 2025
          </p>
        </div>
      </div>
      
      <p className="mb-6 text-lg">
        At Hawkly, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our Web3 security marketplace.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
      <p className="mb-4">
        We collect information that you provide directly when registering or using our services:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Account information (name, email, wallet address)</li>
        <li>Profile details (experience, expertise, portfolio)</li>
        <li>Service and transaction information</li>
        <li>Communications and feedback</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
      <p className="mb-4">
        We use your information to:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Provide and improve our services</li>
        <li>Facilitate connections between projects and security professionals</li>
        <li>Process transactions and payments</li>
        <li>Communicate with you about our services</li>
        <li>Ensure security and prevent fraud</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">Blockchain Data</h2>
      <p className="mb-6">
        Given the nature of blockchain technology, certain information (such as wallet addresses and transaction data) may be publicly visible on the blockchain. We cannot alter or remove this data.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
      <p className="mb-4">
        Depending on your location, you may have rights regarding your personal data, including:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Access to your personal information</li>
        <li>Correction of inaccurate information</li>
        <li>Deletion of your information</li>
        <li>Restriction or objection to processing</li>
      </ul>
      
      <div className="mt-12 bg-primary/5 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
        <p>For privacy-related inquiries, please contact us at <a href="mailto:privacy@hawkly.com" className="text-primary hover:underline">privacy@hawkly.com</a></p>
      </div>
    </ContentPage>
  );
}
