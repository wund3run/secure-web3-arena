
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Hawkly</title>
        <meta name="description" content="Privacy Policy for the Hawkly Web3 Security Marketplace" />
      </Helmet>
      
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when using our platform, including but not limited to your name, email address, wallet address, and professional qualifications.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information to provide and improve our services, match security providers with clients, process transactions, and maintain the security and integrity of our platform.
          </p>
          
          <h2>3. Information Sharing</h2>
          <p>
            We may share your information with other users as necessary to facilitate services, with service providers who help us operate our platform, and as required by law.
          </p>
          
          <h2>4. Your Privacy Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information. You can manage your privacy settings through your account dashboard.
          </p>
          
          <h2>5. Security Measures</h2>
          <p>
            We implement security measures to protect your personal information from unauthorized access and maintain data accuracy.
          </p>
        </div>
      </div>
    </>
  );
}
