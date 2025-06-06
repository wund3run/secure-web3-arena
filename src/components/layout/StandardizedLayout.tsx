
import React from "react";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/contexts/auth";
import { SimplifiedNavbar } from "./simplified-navbar";
import { ProductionNavbar } from "./production-navbar";
import { Footer } from "./footer";

interface StandardizedLayoutProps {
  title: string;
  description: string;
  keywords?: string;
  children: React.ReactNode;
  showFooter?: boolean;
  showSimplifiedNavigation?: boolean;
  showAuthAwareNavigation?: boolean;
  className?: string;
}

export function StandardizedLayout({
  title,
  description,
  keywords,
  children,
  showFooter = true,
  showSimplifiedNavigation = false,
  showAuthAwareNavigation = true,
  className = "",
}: StandardizedLayoutProps) {
  const { user } = useAuth();
  
  // Determine which navigation to show based on props and auth state
  const renderNavigation = () => {
    if (showSimplifiedNavigation) {
      return <SimplifiedNavbar />;
    }
    
    if (showAuthAwareNavigation) {
      return user ? <ProductionNavbar /> : <SimplifiedNavbar />;
    }
    
    return null;
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        
        {/* Essential preconnects for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      <div className={`min-h-screen bg-background flex flex-col ${className}`}>
        {renderNavigation()}
        
        {children}
        
        {showFooter && <Footer />}
      </div>
    </>
  );
}
