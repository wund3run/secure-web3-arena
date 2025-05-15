
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReactNode } from "react";

interface MarketplaceLayoutProps {
  children: ReactNode;
}

export function MarketplaceLayout({ children }: MarketplaceLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
