
import React from 'react';

interface TermsOfServiceProps {
  onAccept?: () => void;
}

export function TermsOfService({ onAccept }: TermsOfServiceProps) {
  return (
    <div className="space-y-4 py-4">
      <h2 className="text-xl font-semibold">Hawkly Security Marketplace Terms</h2>
      <p className="text-muted-foreground">Last Updated: May 16, 2025</p>
      
      <div className="space-y-4">
        <section>
          <h3 className="text-lg font-medium">1. Acceptance of Terms</h3>
          <p>
            By accessing or using our platform, you agree to be bound by these Terms. 
            If you disagree with any part of the terms, you may not access the service.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium">2. Platform Overview</h3>
          <p>
            Hawkly is a specialized marketplace connecting blockchain projects with security professionals 
            for auditing and related services. We facilitate connections but are not responsible for the 
            quality of services provided by auditors.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium">3. User Responsibilities</h3>
          <p>
            Users must provide accurate information, maintain confidentiality of login credentials, 
            and use the platform in compliance with applicable laws and regulations.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium">4. Service Provider Responsibilities</h3>
          <p>
            Security professionals on our platform must accurately represent their qualifications and experience, 
            maintain confidentiality of client information, and deliver services as agreed.
          </p>
        </section>
        
        <section>
          <h3 className="text-lg font-medium">5. Limitation of Liability</h3>
          <p>
            Hawkly is not liable for any damages arising from use of our services, including but not 
            limited to direct, indirect, incidental, or consequential damages.
          </p>
        </section>
      </div>
      
      {onAccept && (
        <div className="mt-6 flex justify-end">
          <button
            className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90 transition-colors"
            onClick={onAccept}
          >
            Accept Terms
          </button>
        </div>
      )}
    </div>
  );
}
