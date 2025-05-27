
import React from 'react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Star, MapPin, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Marketplace = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gradient mb-4">Security Marketplace</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with verified security auditors for your Web3 project
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-primary" />
                      Security Expert {i}
                    </CardTitle>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">4.{9-i}</span>
                    </div>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Global
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Specialized in smart contract audits, DeFi protocols, and blockchain security.
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      2-3 weeks
                    </span>
                    <span className="font-semibold">From $5,000</span>
                  </div>
                  <Button asChild className="w-full">
                    <Link to="/contact-provider/1">Contact Auditor</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/request-audit">Request Custom Audit</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
