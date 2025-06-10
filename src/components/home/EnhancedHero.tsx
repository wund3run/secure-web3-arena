
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserProfiling } from '@/hooks/useUserProfiling';

export function EnhancedHero() {
  const { trackFeatureUsage } = useUserProfiling();

  const handleCTAClick = (action: string) => {
    trackFeatureUsage(`hero_cta_${action}`);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary-950/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />
      
      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* AI Badge */}
          <Badge variant="secondary" className="bg-card/50 border border-primary-400/20 text-primary-300 px-4 py-2">
            <Eye className="h-4 w-4 mr-2" />
            Sharp-eyed AI-powered auditor matching
          </Badge>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="block text-white mb-2">Vigilant Web3</span>
            <span className="block bg-gradient-to-r from-secondary-400 via-primary-400 to-secondary-300 bg-clip-text text-transparent">
              Security Guardians
            </span>
            <span className="block text-primary-300 text-3xl md:text-4xl lg:text-5xl mt-4">
              at Your Service
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-neutral-300 max-w-3xl leading-relaxed">
            Where <span className="text-white font-semibold">sharp-eyed security experts</span> meet{' '}
            <span className="text-white font-semibold">blockchain innovation</span>. Our AI-powered platform connects your project with the perfect guardians of your digital assets.
          </p>

          {/* Stats Badge */}
          <div className="flex items-center gap-2 bg-card/30 backdrop-blur-sm border border-primary-400/20 rounded-full px-6 py-3">
            <CheckCircle className="h-5 w-5 text-success-400" />
            <span className="text-white font-semibold">2,500+ Audits Completed</span>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              asChild
              size="lg"
              className="bg-transparent border-2 border-primary-400 text-primary-300 hover:bg-primary-400/10 hover:text-primary-200 px-8 py-6 text-lg font-semibold"
              onClick={() => handleCTAClick('find_guardian')}
            >
              <Link to="/marketplace" className="flex items-center gap-2">
                <span>Find Your Guardian</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            
            <Button 
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-700 hover:to-secondary-600 text-white px-8 py-6 text-lg font-semibold"
              onClick={() => handleCTAClick('request_quote')}
            >
              <Link to="/request-audit">
                Request Protection Quote
              </Link>
            </Button>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-2xl mt-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-neutral-400">Expert Guardians</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">$1B+</div>
              <div className="text-neutral-400">Assets Protected</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-success-400 to-secondary-400 bg-clip-text text-transparent mb-2">2,500+</div>
              <div className="text-neutral-400">Audits Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
    </section>
  );
}
