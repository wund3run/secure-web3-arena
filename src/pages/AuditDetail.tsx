
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const AuditDetail = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Helmet>
        <title>Audit Details | Hawkly</title>
        <meta name="description" content="Detailed view of security audit results and findings" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Audit Detail</h1>
        <p>Viewing audit ID: {id}</p>
        {/* Audit detail content will be implemented in future updates */}
      </main>
      
      <Footer />
    </>
  );
};

export default AuditDetail;
