
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const ApplicationSubmitted = () => {
  return (
    <>
      <Helmet>
        <title>Application Submitted | Hawkly</title>
        <meta
          name="description"
          content="Thank you for applying to join the Hawkly security network."
        />
      </Helmet>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-secondary/5 pt-16 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-xl border border-border/40 p-8 text-center">
            <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            
            <h1 className="text-3xl font-bold tracking-tight mb-4">
              Application Submitted!
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for applying to join the Hawkly security provider network. 
              Our team will carefully review your application.
            </p>
            
            <div className="flex items-center justify-center gap-2 mb-8 text-muted-foreground">
              <Clock className="h-5 w-5" />
              <span>Typical review time: 3-5 business days</span>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-6 mb-8">
              <h2 className="font-semibold mb-3">What happens next?</h2>
              <ol className="text-left list-decimal pl-5 space-y-2 text-muted-foreground">
                <li>Our security council reviews your application</li>
                <li>We may reach out for additional information or verification</li>
                <li>Upon approval, your profile will be activated on the marketplace</li>
                <li>You'll start receiving matched project requests based on your expertise</li>
              </ol>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/">
                <Button variant="default">
                  Return to Homepage
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="gap-2">
                  Contact Support
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ApplicationSubmitted;
