
import React from "react";
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Hawkly</title>
        <meta name="description" content="Hawkly's privacy policy - how we collect and protect your data." />
      </Helmet>

      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <section className="prose prose-slate max-w-none">
          <h2>1. Information We Collect</h2>
          <p>
            We collect personal information such as your name, email address, 
            wallet address, and other relevant information needed for the platform operation.
          </p>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            Your information is used to operate the platform, match service providers with clients,
            process payments, and improve our services.
          </p>
          
          <h2>3. Data Security</h2>
          <p>
            We employ industry-standard security measures to protect your data
            against unauthorized access or disclosure.
          </p>
          
          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal information.
            Contact us to exercise these rights.
          </p>
          
          <h2>5. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience
            and collect usage information for platform improvements.
          </p>
        </section>
      </div>
    </>
  );
};

export default Privacy;
