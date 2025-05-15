
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const Guidelines = () => {
  return (
    <>
      <Helmet>
        <title>Audit Guidelines | Hawkly</title>
        <meta name="description" content="Security audit guidelines and best practices for Web3 projects" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Audit Guidelines</h1>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Audit Process</h2>
          <p className="text-gray-700">
            Our comprehensive audit process ensures thorough security review of your Web3 projects.
            We follow industry-standard methodologies and best practices to identify vulnerabilities
            and provide actionable remediation guidance.
          </p>
        </section>
        
        {/* Additional guidelines content will be implemented in future updates */}
      </main>
      
      <Footer />
    </>
  );
};

export default Guidelines;
