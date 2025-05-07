
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HawklyLogo } from "@/components/layout/hawkly-logo";

interface AuthLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const AuthLayout = ({ 
  children, 
  title = "Authentication | Hawkly",
  description = "Sign in or sign up to Hawkly - Web3 Security Marketplace" 
}: AuthLayoutProps) => {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <Navbar />
      <main className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-16">
        <div className="w-full max-w-md px-4">
          <div className="flex justify-center mb-6">
            <HawklyLogo variant="large" />
          </div>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
};
