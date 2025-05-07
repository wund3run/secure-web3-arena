
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate, useLocation } from 'react-router-dom';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuth } from '@/contexts/AuthContext';
import AuditRequestHeader from '@/components/audit-request/AuditRequestHeader';
import AuditRequestForm from '@/components/audit-request/AuditRequestForm';
import RequestSuccessMessage from '@/components/audit-request/RequestSuccessMessage';

const RequestAudit = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if we have pre-filled data from a specific service
  const prefilledData = location.state?.serviceInfo ? {
    serviceType: location.state.serviceInfo.category,
    serviceName: location.state.serviceInfo.title,
    providerId: location.state.serviceInfo.id,
    providerName: location.state.serviceInfo.provider
  } : undefined;

  return (
    <>
      <Helmet>
        <title>Request an Audit | Hawkly</title>
        <meta name="description" content="Request a comprehensive security audit for your Web3 project. Connect with top security experts." />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-10 pb-16">
        {formSubmitted ? (
          <RequestSuccessMessage />
        ) : (
          <>
            <AuditRequestHeader />
            <AuditRequestForm 
              onSubmitSuccess={() => setFormSubmitted(true)} 
              prefilledData={prefilledData}
            />
            
            {/* Contact Info */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground">
                Questions? Contact our support team at <a href="mailto:join@hawkly.com" className="text-primary hover:underline">join@hawkly.com</a>
              </p>
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
};

export default RequestAudit;
