
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AIMatchingBanner() {
  return (
    <Card className="bg-gradient-to-r from-primary/10 to-purple-500/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">AI-Powered Matching</h3>
              <p className="text-muted-foreground">Get personalized auditor recommendations based on your project requirements</p>
            </div>
          </div>
          <Button asChild className="flex items-center gap-2">
            <Link to="/request-audit">
              Try AI Matching
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
