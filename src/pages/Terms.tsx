
import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Hawkly</title>
        <meta name="description" content="Hawkly's terms of service and legal information." />
      </Helmet>

      <div className="container px-4 py-12 mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <section className="prose prose-slate max-w-none">
          <h2>1. Introduction</h2>
          <p>
            Welcome to Hawkly, the Web3 security marketplace. By accessing or using our platform, 
            you agree to be bound by these Terms of Service.
          </p>
          
          <h2>2. Services</h2>
          <p>
            Hawkly provides a platform connecting Web3 projects with security professionals 
            for auditing, security assessments, and related services.
          </p>
          
          <h2>3. User Accounts</h2>
          <p>
            Users are responsible for maintaining the confidentiality of their account credentials
            and for all activities that occur under their account.
          </p>
          
          <h2>4. Service Provider Terms</h2>
          <p>
            Security professionals on Hawkly agree to provide services according to industry
            standards and best practices in Web3 security.
          </p>
          
          <h2>5. Disclaimer</h2>
          <p>
            Hawkly is a marketplace platform and does not provide security services directly.
            We do not guarantee the quality or accuracy of services provided by third-party professionals.
          </p>
        </section>
      </div>
    </>
  );
};

export default Terms;
