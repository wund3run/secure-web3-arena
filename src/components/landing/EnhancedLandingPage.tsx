import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  Zap, 
  CheckCircle, 
  Star, 
  ArrowRight,
  TrendingUp,
  Globe,
  Lock,
  Award
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';
import { Button } from '@/components/ui/button';
import { HawklyCard, SecurityBadge, ProgressIndicator, AuditorAvatar, LiveMetric } from '@/components/ui/hawkly-components';

// Mock data for demonstration
const liveMetrics = [
  { label: 'Active Audits', value: 247, trend: 'up' as const, format: 'number' as const },
  { label: 'Security Score', value: 98.5, trend: 'stable' as const, format: 'percentage' as const },
  { label: 'Total Secured', value: 1250000, trend: 'up' as const, format: 'currency' as const },
  { label: 'Auditors Online', value: 156, trend: 'up' as const, format: 'number' as const }
];

const featuredAuditors = [
  {
    name: 'Alex Chen',
    skills: ['Smart Contracts', 'DeFi', 'Layer 2'],
    verified: true,
    rating: 4.9,
    src: ''
  },
  {
    name: 'Maria Rodriguez', 
    skills: ['NFT Security', 'Cross-chain', 'Governance'],
    verified: true,
    rating: 4.8,
    src: ''
  },
  {
    name: 'David Kim',
    skills: ['Protocol Security', 'MEV', 'Flash Loans'],
    verified: true,
    rating: 4.9,
    src: ''
  }
];

const testimonials = [
  {
    quote: "Hawkly's auditors found critical vulnerabilities that could have cost us millions. Their platform makes security accessible.",
    author: "Sarah Johnson",
    title: "CTO, DeFi Protocol",
    rating: 5
  },
  {
    quote: "The most comprehensive Web3 security platform I've used. The AI-powered matching is incredible.",
    author: "Michael Brown",
    title: "Security Lead, NFT Marketplace", 
    rating: 5
  },
  {
    quote: "Professional, thorough, and fast. Hawkly helped us achieve enterprise-grade security.",
    author: "Lisa Wang",
    title: "Founder, Gaming DAO",
    rating: 5
  }
];

export default function EnhancedLandingPage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [animatedMetrics, setAnimatedMetrics] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimatedMetrics(true);
        }
      },
      { threshold: 0.5 }
    );

    const metricsElement = document.getElementById('live-metrics');
    if (metricsElement) {
      observer.observe(metricsElement);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] via-[#181f2f] to-[#212842] relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#a879ef]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#32d9fa]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#a879ef]/5 to-[#32d9fa]/5 rounded-full blur-3xl animate-spin" style={{ animationDuration: '20s' }}></div>
      </div>

      {/* Hero Section */}
      <AppContainer className="pt-20 pb-16 relative z-10">
        <div className="text-center space-y-8">
          {/* Main Headline */}
          <div className="space-y-4">
            <SecurityBadge level="enterprise" verified={true} animated={true} size="lg" className="mx-auto" />
            <h1 className="text-5xl md:text-7xl font-black text-[#f8f9fb] leading-tight">
              Secure Your{' '}
              <span className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] bg-clip-text text-transparent">
                Web3 Future
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-[#b2bfd4] max-w-4xl mx-auto leading-relaxed">
              Connect with elite security auditors, protect your smart contracts, and build trust in the decentralized world with AI-powered matching and real-time insights.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] text-white font-bold px-8 py-4 text-lg shadow-[0_0_24px_rgba(168,121,239,0.4)] hover:shadow-[0_0_32px_rgba(168,121,239,0.6)] transition-all duration-300"
            >
              <Link to="/request-audit" className="flex items-center gap-2">
                Request Security Audit
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-[#a879ef] text-[#a879ef] hover:bg-[#a879ef]/10 px-8 py-4 text-lg"
            >
              <Link to="/auditors" className="flex items-center gap-2">
                Browse Auditors
                <Users className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-70">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#2de08e]" />
              <span className="text-[#b2bfd4]">SOC 2 Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#ffd553]" />
              <span className="text-[#b2bfd4]">250+ Audits Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-[#32d9fa]" />
              <span className="text-[#b2bfd4]">$1B+ Secured</span>
            </div>
          </div>
        </div>
      </AppContainer>

      {/* Live Metrics Section */}
      <AppContainer className="py-16">
        <div id="live-metrics">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#f8f9fb] mb-4">Platform Activity</h2>
            <p className="text-[#b2bfd4] text-lg">Real-time security metrics from our platform</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {liveMetrics.map((metric, index) => (
              <HawklyCard key={index} variant="glass" elevation="subtle" className="p-6 text-center">
                <LiveMetric 
                  {...metric} 
                  animated={animatedMetrics}
                  className="w-full"
                />
              </HawklyCard>
            ))}
          </div>
        </div>
      </AppContainer>

      {/* How It Works Section */}
      <AppContainer className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#f8f9fb] mb-4">How Hawkly Works</h2>
          <p className="text-[#b2bfd4] text-lg">Four simple steps to enterprise-grade security</p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: 1,
              title: 'Submit Project',
              description: 'Upload your smart contracts and security requirements',
              icon: Globe
            },
            {
              step: 2,
              title: 'AI Matching',
              description: 'Our AI matches you with the perfect security experts',
              icon: Zap
            },
            {
              step: 3,
              title: 'Security Audit',
              description: 'Expert auditors review your code with cutting-edge tools',
              icon: Shield
            },
            {
              step: 4,
              title: 'Secure & Deploy',
              description: 'Receive detailed reports and deploy with confidence',
              icon: CheckCircle
            }
          ].map((step, index) => (
            <HawklyCard 
              key={index} 
              variant="interactive" 
              glow={true}
              className="p-6 text-center group hover:scale-105 transition-all duration-300"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-full flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,121,239,0.5)] transition-all duration-300">
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <div className="bg-[#a879ef] text-white w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-2">{step.title}</h3>
              <p className="text-[#b2bfd4]">{step.description}</p>
            </HawklyCard>
          ))}
        </div>
      </AppContainer>

      {/* Featured Auditors Section */}
      <AppContainer className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#f8f9fb] mb-4">Elite Security Experts</h2>
          <p className="text-[#b2bfd4] text-lg">Meet our top-rated auditors</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredAuditors.map((auditor, index) => (
            <HawklyCard key={index} variant="glass" className="p-6">
              <AuditorAvatar 
                {...auditor} 
                size="xl" 
                showDetails={true}
                className="flex-col items-center text-center"
              />
              <div className="mt-4 space-y-3">
                <ProgressIndicator 
                  value={Math.floor(auditor.rating * 20)} 
                  max={100} 
                  label="Reputation Score"
                  glowEffect={true}
                />
                <div className="flex justify-center">
                  <SecurityBadge level="enterprise" verified={auditor.verified} />
                </div>
              </div>
            </HawklyCard>
          ))}
        </div>

        <div className="text-center mt-8">
          <Button asChild variant="outline" size="lg" className="border-[#a879ef] text-[#a879ef] hover:bg-[#a879ef]/10">
            <Link to="/auditors">View All Auditors</Link>
          </Button>
        </div>
      </AppContainer>

      {/* Testimonials Section */}
      <AppContainer className="py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#f8f9fb] mb-4">Trusted by Leaders</h2>
          <p className="text-[#b2bfd4] text-lg">What our clients say about Hawkly</p>
        </div>

        <HawklyCard variant="highlighted" elevation="strong" className="max-w-4xl mx-auto p-8">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 text-[#ffd553] fill-current" />
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-[#f8f9fb] leading-relaxed italic">
              "{testimonials[currentTestimonial].quote}"
            </blockquote>
            <div className="space-y-1">
              <div className="text-lg font-bold text-[#a879ef]">
                {testimonials[currentTestimonial].author}
              </div>
              <div className="text-[#b2bfd4]">
                {testimonials[currentTestimonial].title}
              </div>
            </div>
          </div>
        </HawklyCard>

        {/* Testimonial Navigation */}
        <div className="flex justify-center mt-6 gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-[#a879ef] shadow-[0_0_8px_#a879ef]' 
                  : 'bg-[#23283e] hover:bg-[#a879ef]/50'
              }`}
            />
          ))}
        </div>
      </AppContainer>

      {/* Final CTA Section */}
      <AppContainer className="py-20">
        <HawklyCard variant="highlighted" elevation="strong" glow={true} className="text-center p-12">
          <h2 className="text-4xl font-bold text-[#f8f9fb] mb-4">
            Ready to Secure Your Project?
          </h2>
          <p className="text-xl text-[#b2bfd4] mb-8 max-w-2xl mx-auto">
            Join thousands of Web3 projects that trust Hawkly for their security needs. Get started today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] text-white font-bold px-8 py-4 text-lg shadow-[0_0_24px_rgba(168,121,239,0.4)] hover:shadow-[0_0_32px_rgba(168,121,239,0.6)]"
            >
              <Link to="/auth" className="flex items-center gap-2">
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-[#32d9fa] text-[#32d9fa] hover:bg-[#32d9fa]/10 px-8 py-4 text-lg"
            >
              <Link to="/contact">Contact Sales</Link>
            </Button>
          </div>
        </HawklyCard>
      </AppContainer>
    </div>
  );
}
