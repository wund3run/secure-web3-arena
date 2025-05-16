
import React from "react";
import { ContentPage } from "@/components/content/content-page";
import { Shield, Lock, AlertTriangle, FileCheck } from "lucide-react";

export default function SecurityPolicy() {
  return (
    <ContentPage 
      title="Security Policy" 
      description="Security policy for the Hawkly Web3 Security Marketplace."
    >
      <h1 className="text-3xl md:text-4xl font-bold mb-6">Security Policy</h1>
      
      <div className="bg-card rounded-lg p-6 mb-8 border border-border/40">
        <div className="flex items-center mb-2">
          <Shield className="h-6 w-6 text-primary mr-2" />
          <h2 className="text-2xl font-semibold">Platform Security Commitment</h2>
        </div>
        <p className="text-muted-foreground">
          Last Updated: May 16, 2025
        </p>
      </div>
      
      <p className="mb-6 text-lg">
        This security policy outlines how Hawkly protects user data and maintains the security of our platform. As a Web3 security marketplace, we understand the critical importance of robust security measures.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-background rounded-lg p-6 border border-border/40">
          <Lock className="h-6 w-6 text-primary mb-3" />
          <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
          <p className="text-muted-foreground">
            We implement industry-standard encryption for data at rest and in transit, secure authentication mechanisms, and regular security audits.
          </p>
        </div>
        
        <div className="bg-background rounded-lg p-6 border border-border/40">
          <AlertTriangle className="h-6 w-6 text-amber-500 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Incident Response</h3>
          <p className="text-muted-foreground">
            We maintain a comprehensive incident response plan to quickly address any security breaches or vulnerabilities.
          </p>
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Security Practices</h2>
      <ul className="list-disc pl-6 mb-6 space-y-2">
        <li>Regular security assessments and penetration testing</li>
        <li>Secure software development lifecycle</li>
        <li>Employee security awareness training</li>
        <li>Access controls based on the principle of least privilege</li>
        <li>Regular backups and disaster recovery planning</li>
      </ul>
      
      <h2 className="text-2xl font-semibold mb-4">Smart Contract Security</h2>
      <p className="mb-6">
        Any smart contracts deployed by Hawkly undergo rigorous security audits by multiple independent security firms. Audit reports are made public for transparency.
      </p>
      
      <div className="bg-card p-6 rounded-lg border border-border/40 mb-8">
        <div className="flex items-center mb-3">
          <FileCheck className="h-6 w-6 text-secondary mr-2" />
          <h3 className="text-xl font-semibold">Vulnerability Disclosure</h3>
        </div>
        <p className="mb-4">
          We encourage responsible disclosure of security vulnerabilities. If you discover a vulnerability, please report it to us at <a href="mailto:security@hawkly.com" className="text-primary hover:underline">security@hawkly.com</a>.
        </p>
        <p className="text-sm text-muted-foreground">
          We are committed to acknowledging reports within 24 hours and providing a timeline for resolution.
        </p>
      </div>
      
      <h2 className="text-2xl font-semibold mb-4">Beta Platform Notice</h2>
      <p className="mb-4">
        As Hawkly is currently in beta, we are continuously improving our security measures. Users should be aware that security features may be updated or modified as we enhance the platform.
      </p>
      
      <div className="mt-12 bg-primary/5 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
        <p>For security-related inquiries, please contact us at <a href="mailto:security@hawkly.com" className="text-primary hover:underline">security@hawkly.com</a></p>
      </div>
    </ContentPage>
  );
}
