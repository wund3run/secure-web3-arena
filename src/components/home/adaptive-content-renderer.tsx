
import React from 'react';
import { useUserProfiling } from '@/hooks/useUserProfiling';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Zap, Shield, Users, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AdaptiveContentProps {
  children: React.ReactNode;
}

export function AdaptiveContentRenderer({ children }: AdaptiveContentProps) {
  const { getUserSegment, behaviorProfile, trackInteraction } = useUserProfiling();
  const userSegment = getUserSegment();

  // Render segment-specific content
  const renderPersonalizedCTA = () => {
    const handleCTAClick = (action: string) => {
      trackInteraction('cta', action);
    };

    switch (userSegment) {
      case 'new_visitor':
        return (
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-primary" />
                <Badge variant="secondary">Welcome to Hawkly!</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">New to Web3 Security?</h3>
              <p className="text-muted-foreground mb-4">
                Discover how our expert auditors can protect your blockchain project from vulnerabilities.
              </p>
              <div className="flex gap-2">
                <Button asChild onClick={() => handleCTAClick('learn_more')}>
                  <Link to="/security-audits">Learn More</Link>
                </Button>
                <Button variant="outline" asChild onClick={() => handleCTAClick('quick_start')}>
                  <Link to="/request-audit">Quick Start</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'returning_visitor':
        return (
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Users className="h-5 w-5 text-blue-600" />
                <Badge variant="secondary">Welcome Back!</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">Ready to Secure Your Project?</h3>
              <p className="text-muted-foreground mb-4">
                Connect with our verified security experts and get your audit started today.
              </p>
              <Button asChild onClick={() => handleCTAClick('browse_experts')}>
                <Link to="/marketplace">Browse Experts</Link>
              </Button>
            </CardContent>
          </Card>
        );

      case 'engaged_user':
        return (
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-green-600" />
                <Badge variant="secondary">Power User</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">Advanced Security Tools</h3>
              <p className="text-muted-foreground mb-4">
                Access our AI-powered vulnerability scanner and advanced security analytics.
              </p>
              <div className="flex gap-2">
                <Button asChild onClick={() => handleCTAClick('ai_tools')}>
                  <Link to="/ai-tools">AI Tools</Link>
                </Button>
                <Button variant="outline" asChild onClick={() => handleCTAClick('analytics')}>
                  <Link to="/analytics">Analytics</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case 'authenticated_user':
        return (
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-purple-600" />
                <Badge variant="secondary">Member</Badge>
              </div>
              <h3 className="text-lg font-semibold mb-2">Your Security Dashboard</h3>
              <p className="text-muted-foreground mb-4">
                Check your audit progress and manage your security projects.
              </p>
              <Button asChild onClick={() => handleCTAClick('dashboard')}>
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {children}
      
      {/* Personalized CTA Section */}
      <section className="py-8">
        <div className="container px-4 md:px-6">
          {renderPersonalizedCTA()}
        </div>
      </section>
    </div>
  );
}
