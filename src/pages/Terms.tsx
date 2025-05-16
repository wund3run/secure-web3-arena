
import React from "react";
import { ContentPage } from "@/components/content/content-page";

export default function Terms() {
  return (
    <ContentPage 
      title="Terms of Service" 
      description="Terms and conditions for using the Hawkly Web3 Security Marketplace."
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Terms of Service</h1>
      
      <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
        <h2 className="text-2xl font-semibold mb-4">Last Updated: May 16, 2025</h2>
        <p className="text-muted-foreground mb-4">
          Please read these Terms of Service ("Terms") carefully before using the Hawkly Web3 Security Marketplace.
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
      <p className="mb-4">
        By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">2. Platform Overview</h2>
      <p className="mb-4">
        Hawkly is a specialized marketplace connecting blockchain projects with security professionals for auditing and related services. We facilitate connections but are not responsible for the quality of services provided by auditors.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">3. User Responsibilities</h2>
      <p className="mb-4">
        Users must provide accurate information, maintain confidentiality of login credentials, and use the platform in compliance with applicable laws and regulations.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">4. Service Provider Responsibilities</h2>
      <p className="mb-4">
        Security professionals on our platform must accurately represent their qualifications and experience, maintain confidentiality of client information, and deliver services as agreed.
      </p>
      
      <h2 className="text-2xl font-semibold mb-4">5. Beta Platform Limitations</h2>
      <p className="mb-6">
        As Hawkly is currently in beta:
      </p>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Features may not be fully operational or may contain bugs</li>
        <li>Service availability may be inconsistent</li>
        <li>Terms may be updated frequently as we refine our offering</li>
        <li>Platform security and features are still being enhanced</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
      <p className="mb-4">
        Hawkly is not liable for any damages arising from use of our services, including but not limited to direct, indirect, incidental, or consequential damages.
      </p>
      
      <div className="mt-12 bg-primary/5 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
        <p>For questions about these Terms, please contact us at <a href="mailto:legal@hawkly.com" className="text-primary hover:underline">legal@hawkly.com</a></p>
      </div>
    </ContentPage>
  );
}
