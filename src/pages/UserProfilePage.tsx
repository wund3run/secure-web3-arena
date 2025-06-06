
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useAuth } from '@/contexts/auth';

export default function UserProfilePage() {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>Profile | Hawkly</title>
        <meta name="description" content="Manage your profile settings" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              User Profile
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Profile Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-muted-foreground">{user?.email || 'Not available'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">User ID</label>
                  <p className="text-muted-foreground">{user?.id || 'Not available'}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
