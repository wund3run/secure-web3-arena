
import React, { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Eye, CheckCircle } from 'lucide-react';

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setMousePosition({ x, y });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove);
      setIsVisible(true);
    }

    return () => {
      if (heroElement) {
        heroElement.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative py-32 lg:py-40 bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden cursor-none"
    >
      {/* Dynamic Cursor Follower */}
      <div 
        className="absolute pointer-events-none z-30"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          transform: 'translate(-50%, -50%)',
          transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)'
        }}
      >
        <div className="w-32 h-32 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse" />
        <div className="absolute inset-0 w-16 h-16 bg-gradient-to-r from-blue-400/50 to-cyan-400/50 rounded-full blur-lg animate-ping" style={{ animationDuration: '2s' }} />
      </div>

      {/* Interactive Grid Background */}
      <div className="absolute inset-0">
        {/* Primary animated grid */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
            transition: 'transform 0.2s ease-out'
          }}
        />
        
        {/* Secondary grid that moves opposite direction */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.6) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.6) 1px, transparent 1px)
            `,
            backgroundSize: '120px 120px',
            transform: `translate(${-mousePosition.x * 0.05}px, ${-mousePosition.y * 0.05}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        />
        
        {/* Dynamic dots that scale with cursor proximity */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.6) 2px, transparent 2px)',
            backgroundSize: '100px 100px',
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px) scale(${1 + Math.sin(Date.now() * 0.001) * 0.1})`,
            transition: 'transform 0.2s ease-out'
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `translate(${Math.sin((mousePosition.x + i) * 0.01) * 20}px, ${Math.cos((mousePosition.y + i) * 0.01) * 20}px)`,
              transition: 'transform 0.5s ease-out',
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
      
      {/* Radial gradient that follows cursor */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(59, 130, 246, 0.15) 0%, 
            rgba(139, 92, 246, 0.08) 40%, 
            transparent 70%)`
        }}
      />
      
      {/* Additional animated overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))]" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      
      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge with hover effect */}
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 transition-all duration-700 hover:bg-blue-500/20 hover:scale-105 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Eye className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Sharp-eyed AI-powered auditor matching
            </span>
          </div>
          
          {/* Main Heading with staggered animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            <span 
              className={`block text-white mb-4 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Vigilant Web3
            </span>
            <span 
              className={`block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              Security Guardians
            </span>
            <span 
              className={`block text-purple-400 text-4xl md:text-5xl lg:text-6xl mt-4 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              at Your Service
            </span>
          </h1>
          
          {/* Subtitle */}
          <p 
            className={`text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            Where <span className="text-blue-400 font-semibold">sharp-eyed security experts</span> meet <span className="text-cyan-400 font-semibold">blockchain innovation</span>. Our AI-powered platform connects your project with the perfect guardians of your digital assets.
          </p>
          
          {/* Trust Indicator */}
          <div 
            className={`flex items-center justify-center gap-2 mb-12 transition-all duration-700 delay-500 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <CheckCircle className="h-5 w-5 text-green-400" />
            <span className="text-green-400 font-semibold">2,500+ Audits Completed</span>
          </div>
          
          {/* CTA Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-700 delay-600 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/marketplace">
                Find Your Guardian
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-cyan-400 hover:from-cyan-600 hover:to-cyan-500 text-white border-0 px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              asChild
            >
              <Link to="/request-audit">
                Request Protection Quote
              </Link>
            </Button>
          </div>
          
          {/* Security Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Shield,
                title: "AI-Powered Matching",
                description: "Smart algorithms connect you with the perfect security experts for your project needs",
                delay: 700
              },
              {
                icon: Eye,
                title: "Sharp-Eyed Experts",
                description: "Vigilant security professionals with proven track records in Web3 protection",
                delay: 800
              },
              {
                icon: CheckCircle,
                title: "Proven Results",
                description: "Over 2,500 successful audits protecting millions in digital assets",
                delay: 900
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`text-center p-6 rounded-xl bg-gradient-to-b from-blue-500/10 to-transparent border border-blue-500/20 hover:bg-gradient-to-b hover:from-blue-500/20 hover:to-transparent hover:border-blue-500/40 hover:scale-105 transition-all duration-500 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${feature.delay}ms` }}
              >
                <feature.icon className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-10px) translateX(5px);
          }
          66% {
            transform: translateY(5px) translateX(-5px);
          }
        }
      `}</style>
    </section>
  );
}
