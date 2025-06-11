
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EnhancedContactForm } from '@/components/contact/EnhancedContactForm';

const ContactPage = () => {
  return (
    <StandardLayout
      title="Contact Us | Hawkly"
      description="Get in touch with the Hawkly team for security audits, partnerships, or inquiries"
    >
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Get Your Security Audit Quote
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to secure your Web3 project? Get a personalized quote from our certified security experts.
            We'll respond within 24 hours with a detailed proposal.
          </p>
        </div>

        <EnhancedContactForm />
      </div>
    </StandardLayout>
  );
};

export default ContactPage;
