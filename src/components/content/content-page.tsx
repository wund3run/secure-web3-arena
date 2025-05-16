
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { SkipToContent } from "@/components/layout/SkipToContent";

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
        <meta property="og:title" content={`${title} | Hawkly`} />
        <meta property="og:description" content={description} />
        <meta name="twitter:title" content={`${title} | Hawkly`} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent targetId="main-content" />
        <Navbar />
        <main className="flex-grow container py-12" id="main-content">
          <div className="prose prose-lg max-w-none">
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
