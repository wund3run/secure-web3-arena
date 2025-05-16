
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

interface ContentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ContentPage({ title, description, children }: ContentPageProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Hawkly Web3 Security Marketplace</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
