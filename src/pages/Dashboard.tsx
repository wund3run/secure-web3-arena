
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { useAuth } from '@/contexts/auth';

const Dashboard = () => {
  const { user } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your personal dashboard for managing security audits" />
      </Helmet>
      
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        {user ? (
          <p>Welcome back, {user.email}!</p>
        ) : (
          <p>Loading user data...</p>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Audits</h2>
            <p className="text-gray-600">No recent audits found.</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
            <p className="text-gray-600">No upcoming deadlines.</p>
          </div>
          
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Activity Feed</h2>
            <p className="text-gray-600">No recent activity.</p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default Dashboard;
