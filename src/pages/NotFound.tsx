import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 py-16 sm:px-6 sm:py-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Shield className="h-24 w-24 text-primary/30" />
              <AlertTriangle className="h-10 w-10 text-web3-orange absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          <h1 className="text-6xl font-extrabold text-gradient mb-6">404</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This page is still being secured. Our security experts are working on it!
          </p>
          <div className="bg-card border border-border/30 rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground mb-3">
              You tried to access:
            </p>
            <code className="px-2 py-1 bg-background rounded text-sm">
              {location.pathname}
            </code>
          </div>
          <Button asChild size="lg">
            <a href="/">Return to Secure Homepage</a>
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
