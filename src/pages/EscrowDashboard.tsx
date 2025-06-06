
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function EscrowDashboard() {
  return (
    <>
      <Helmet>
        <title>Escrow Dashboard | Hawkly</title>
        <meta name="description" content="Manage your escrow contracts and payments" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Escrow Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your secure payment contracts
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Active Contracts</h3>
              <p className="text-muted-foreground">
                View and manage your active escrow contracts
              </p>
            </div>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Payment History</h3>
              <p className="text-muted-foreground">
                Track your payment transactions and milestones
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
