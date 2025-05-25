
import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Shield, AlertTriangle, ArrowLeft, Search, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { getFallbackRoute } from "@/utils/navigation";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const suggestedRoute = getFallbackRoute(location.pathname);
  const hasSuggestion = suggestedRoute !== "/";

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Auto-redirect countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [location.pathname, navigate]);

  const handleStopRedirect = () => {
    setCountdown(0);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow flex items-center justify-center px-4 py-16">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Shield className="h-24 w-24 text-primary/30" />
              <AlertTriangle className="h-10 w-10 text-amber-500 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </div>
          
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent mb-4">
            404
          </h1>
          
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Page Not Found
          </h2>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            This page is still being secured by our security experts. 
            Please check back later or explore our other features.
          </p>
          
          <div className="bg-card border border-border/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground mb-2">
              You tried to access:
            </p>
            <code className="px-2 py-1 bg-muted rounded text-sm font-mono text-foreground">
              {location.pathname}
            </code>
          </div>
          
          {countdown > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-6">
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Redirecting to homepage in {countdown} seconds...
              </p>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleStopRedirect}
                className="mt-2 text-blue-600 hover:text-blue-700"
              >
                Cancel redirect
              </Button>
            </div>
          )}
          
          <div className="flex flex-col space-y-3">
            <Button asChild size="lg" className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Link>
            </Button>
            
            {hasSuggestion && (
              <Button asChild variant="outline" size="lg" className="w-full">
                <Link to={suggestedRoute}>
                  <Search className="mr-2 h-4 w-4" />
                  Try: {suggestedRoute.replace('/', '').replace('-', ' ').toUpperCase()}
                </Link>
              </Button>
            )}
            
            <Button asChild variant="ghost" size="lg" className="w-full">
              <Link to="/marketplace">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Browse Marketplace
              </Link>
            </Button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground">
              If you believe this is an error, please{" "}
              <Link to="/support" className="text-primary hover:underline">
                contact our support team
              </Link>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
