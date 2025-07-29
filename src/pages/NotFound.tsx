
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AlertTriangle, Home, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();

  const popularPages = [
    { title: "Security Marketplace", href: "/marketplace", description: "Find verified security auditors" },
    { title: "Request Audit", href: "/request-audit", description: "Submit your project for review" },
    { title: "Documentation", href: "/docs", description: "Platform guides and API docs" },
    { title: "Web3 Security", href: "/web3-security", description: "Learn about blockchain security" },
    { title: "Contact Support", href: "/contact", description: "Get help from our team" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Page Not Found | Hawkly</title>
        <meta name="description" content="The page you're looking for doesn't exist. Explore our security marketplace and resources." />
      </Helmet>
      
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* Error Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-full mb-8">
            <AlertTriangle className="h-10 w-10 text-muted-foreground" />
          </div>
          
          {/* Error Message */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Page Not Found
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Sorry, we couldn't find the page you're looking for. The page may have been moved, deleted, or the URL might be incorrect.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button onClick={() => navigate(-1)} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
            <Link to="/">
              <Button>
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </div>
          
          {/* Popular Pages */}
          <div className="text-left">
            <h2 className="text-2xl font-bold text-center mb-6">Popular Pages</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {popularPages.map((page, index) => (
                <Link 
                  key={index}
                  to={page.href}
                  className="block p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold mb-1">{page.title}</h3>
                  <p className="text-sm text-muted-foreground">{page.description}</p>
                </Link>
              ))}
            </div>
          </div>
          
          {/* Help Section */}
          <div className="mt-12 p-6 bg-muted/50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Still need help?</h3>
            <p className="text-muted-foreground mb-4">
              If you believe this is an error or you need assistance finding what you're looking for, 
              our support team is here to help.
            </p>
            <Link to="/contact">
              <Button variant="outline">Contact Support</Button>
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
