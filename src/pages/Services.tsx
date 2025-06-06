
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function Services() {
  return (
    <>
      <Helmet>
        <title>Services | Hawkly</title>
        <meta name="description" content="Explore our comprehensive blockchain security services" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Security Services
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional blockchain security auditing services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Smart Contract Audits</h3>
              <p className="text-muted-foreground">
                Comprehensive security reviews of your smart contracts
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">DeFi Protocol Audits</h3>
              <p className="text-muted-foreground">
                Specialized audits for DeFi protocols and yield farming contracts
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">NFT Collection Audits</h3>
              <p className="text-muted-foreground">
                Security reviews for NFT smart contracts and marketplaces
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
