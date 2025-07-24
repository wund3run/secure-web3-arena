import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ReactNode } from "react";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { AppContainer } from '@/components/layout/AppContainer';

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
          tabIndex={-1}
        >
          <AppContainer maxWidth="max-w-7xl" padding="px-4 sm:px-6 lg:px-8 py-6 sm:py-8" elevation>
            {children}
          </AppContainer>
        </main>
      </div>
      <Footer />
    </div>
  );
}
