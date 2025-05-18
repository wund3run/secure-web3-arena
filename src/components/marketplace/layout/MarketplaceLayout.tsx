
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReactNode } from "react";
import { SkipToContent } from "@/components/layout/SkipToContent";

interface MarketplaceLayoutProps {
  children: ReactNode;
}

export function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <SkipToContent targetId="marketplace-content" />
      <Navbar />
      <div className="flex-grow">
        <main 
          id="marketplace-content" 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
}
