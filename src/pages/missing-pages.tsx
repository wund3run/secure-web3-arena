
import React from 'react';
import { PlaceholderPage } from './placeholder-template';
import { 
  HelpCircle, 
  FileText, 
  Book, 
  Phone, 
  Shield, 
  MessageSquare,
  Package,
  Truck,
  RefreshCw,
  Calculator
} from 'lucide-react';

// FAQ Page
export const FAQ = () => {
  return (
    <PlaceholderPage
      title="Frequently Asked Questions"
      description="Find answers to common questions about security audits, our platform, and the audit process."
      icon={HelpCircle}
      features={[
        "Security audit FAQs",
        "Platform usage guides", 
        "Pricing information",
        "Process explanations"
      ]}
    />
  );
};

// Documentation Pages
export const Docs = () => {
  return (
    <PlaceholderPage
      title="Documentation"
      description="Comprehensive documentation for developers, including API references, integration guides, and best practices."
      icon={Book}
      features={[
        "API documentation",
        "Integration tutorials",
        "SDK references",
        "Code examples"
      ]}
    />
  );
};

// Contact Page
export const Contact = () => {
  return (
    <PlaceholderPage
      title="Contact Us"
      description="Get in touch with our security experts and support team for personalized assistance."
      icon={Phone}
      features={[
        "24/7 support availability",
        "Expert consultation",
        "Custom audit requests",
        "Partnership inquiries"
      ]}
    />
  );
};

// Support Page  
export const Support = () => {
  return (
    <PlaceholderPage
      title="Support Center"
      description="Access help resources, submit tickets, and get assistance with your security audits and platform usage."
      icon={MessageSquare}
      features={[
        "Help documentation",
        "Ticket system",
        "Live chat support",
        "Video tutorials"
      ]}
    />
  );
};

// Legal Pages
export const Terms = () => {
  return (
    <PlaceholderPage
      title="Terms of Service"
      description="Review our terms of service, user agreements, and platform policies for security audit services."
      icon={FileText}
      features={[
        "Service agreements",
        "User responsibilities",
        "Platform policies",
        "Legal compliance"
      ]}
    />
  );
};

export const Privacy = () => {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Learn how we protect your data, handle personal information, and maintain confidentiality in security audits."
      icon={Shield}
      features={[
        "Data protection policies",
        "Privacy controls",
        "GDPR compliance",
        "Security measures"
      ]}
    />
  );
};

// Tutorial and Template Pages
export const Tutorials = () => {
  return (
    <PlaceholderPage
      title="Security Tutorials"
      description="Step-by-step tutorials for Web3 security, smart contract development, and vulnerability prevention."
      icon={Book}
      features={[
        "Interactive tutorials",
        "Code walkthroughs",
        "Best practice guides",
        "Security patterns"
      ]}
    />
  );
};

export const Templates = () => {
  return (
    <PlaceholderPage
      title="Security Templates"
      description="Ready-to-use templates for security audits, smart contracts, and development best practices."
      icon={Package}
      features={[
        "Audit checklists",
        "Smart contract templates",
        "Security frameworks",
        "Testing templates"
      ]}
    />
  );
};

// Shipping and Delivery (for services)
export const ShippingDelivery = () => {
  return (
    <PlaceholderPage
      title="Service Delivery"
      description="Information about our audit delivery process, timelines, and what to expect from our security services."
      icon={Truck}
      features={[
        "Delivery timelines",
        "Report formats",
        "Communication process",
        "Quality assurance"
      ]}
    />
  );
};

// Cancellation and Refund Policy
export const CancellationRefund = () => {
  return (
    <PlaceholderPage
      title="Cancellation & Refund Policy"
      description="Review our policies for audit cancellations, refunds, and service modifications."
      icon={RefreshCw}
      features={[
        "Cancellation terms",
        "Refund conditions",
        "Service modifications",
        "Policy exceptions"
      ]}
    />
  );
};
