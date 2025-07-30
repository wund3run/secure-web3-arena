import React from 'react';
import { ArrowRight, Shield, Zap, Users } from 'lucide-react';

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen" style={{
      fontFamily: 'var(--font)',
      background: 'var(--bg)',
      color: 'var(--text)'
    }}>
      {/* Navigation */}
      <nav className="navbar border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="container flex items-center justify-between">
          <div className="logo text-accent">
            Hawkly
          </div>
          
          <ul className="nav-links hidden md:flex">
            <li><a href="/features">Features</a></li>
            <li><a href="/pricing">Pricing</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
          
          <div className="flex items-center gap-4">
            <a href="/auth" className="btn btn-primary">
              Sign In
            </a>
            <a href="/auth?mode=signup" className="btn btn-cta">
              Get Started
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-bg">
          <svg className="hero-lines" viewBox="0 0 1200 800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            <circle cx="600" cy="400" r="200" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            <circle cx="600" cy="400" r="300" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"/>
          </svg>
        </div>
        
        <div className="hero-content">
          <h1>
            Secure Your Web3 Future with 
            <span className="text-accent"> Expert Audits</span>
          </h1>
          <p>
            Connect with top-tier security auditors and protect your blockchain projects 
            with comprehensive smart contract audits and security reviews.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a href="/auth?mode=signup" className="btn btn-cta flex items-center">
              Start Free Audit
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a href="/marketplace" className="btn btn-primary">
              Browse Auditors
            </a>
          </div>
          
          <div className="partner-text">
            Trusted by 500+ Web3 projects worldwide
            <div className="badge bg-white/10 rounded-full px-4 py-1 text-xs mt-2">
              🛡️ SOC 2 Certified
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Hawkly?</h2>
            <p style={{ color: 'var(--muted)' }} className="max-w-2xl mx-auto">
              Our platform connects you with verified security experts and provides 
              comprehensive audit solutions for your Web3 projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-dark p-6 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent-start)' }} />
              <h3 className="text-xl font-semibold mb-2">Expert Auditors</h3>
              <p style={{ color: 'var(--muted)' }}>
                Access vetted security professionals with proven track records
              </p>
            </div>
            
            <div className="card-dark p-6 text-center">
              <Zap className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent-start)' }} />
              <h3 className="text-xl font-semibold mb-2">Fast Turnaround</h3>
              <p style={{ color: 'var(--muted)' }}>
                Get comprehensive audit reports in days, not weeks
              </p>
            </div>
            
            <div className="card-dark p-6 text-center">
              <Users className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--accent-start)' }} />
              <h3 className="text-xl font-semibold mb-2">Collaborative Platform</h3>
              <p style={{ color: 'var(--muted)' }}>
                Work directly with auditors through our integrated tools
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 border-t" style={{ borderColor: 'var(--border)' }}>
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Project?</h2>
          <p style={{ color: 'var(--muted)' }} className="mb-8 max-w-2xl mx-auto">
            Join thousands of Web3 projects that trust Hawkly for their security needs.
          </p>
          <a href="/auth?mode=signup" className="btn btn-cta text-lg px-8 py-3 flex items-center justify-center mx-auto w-fit">
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </a>
        </div>
      </section>
    </div>
  );
}
