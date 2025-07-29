import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileCode, 
  Shield, 
  Check, 
  AlertTriangle, 
  Zap, 
  FileSearch, 
  Code, 
  Database,
  RefreshCcw,
  Lock,
  Award,
  TrendingUp
} from 'lucide-react';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';
import { Helmet } from 'react-helmet-async';

export default function SmartContractAudit() {
  // Testimonials data
  const testimonials = [
    {
      name: "Sarah David",
      role: "CTO at DeFiProtocol",
      image: "/assets/testimonials/sarah-chen.jpg",
      quote: "The audit revealed critical vulnerabilities that could have resulted in a multi-million dollar hack. Hawkly's team was thorough, professional and explained everything clearly."
    },
    {
      name: "Michael Schoen",
      role: "Lead Dev at MetaDAO",
      image: "/assets/testimonials/michael-schoen.jpg",
      quote: "We've worked with multiple audit firms, and Hawkly consistently delivers the most comprehensive reports with actionable remediation steps. They're our trusted security partner."
    },
    {
      name: "Lauren Williams",
      role: "Founder of SecureBlocks",
      image: "/assets/testimonials/lauren-williams.jpg",
      quote: "The formal verification process gave us mathematical certainty about our protocol's security. Worth every penny for the peace of mind and user trust."
    }
  ];

  // Audit process steps
  const auditSteps = [
    {
      number: "01",
      title: "Manual Code Review",
      description: "Our expert auditors manually analyze each line of code to identify logical flaws and security vulnerabilities.",
      icon: FileSearch
    },
    {
      number: "02",
      title: "Automated Scanning",
      description: "Advanced static and dynamic analysis tools detect common vulnerabilities and coding errors.",
      icon: Zap
    },
    {
      number: "03",
      title: "Formal Verification",
      description: "Mathematical proofs verify that critical contract functions behave exactly as intended.",
      icon: Check
    },
    {
      number: "04",
      title: "Economic Risk Analysis",
      description: "We model potential economic attack vectors and game theory exploits in your system.",
      icon: TrendingUp
    },
    {
      number: "05",
      title: "Detailed Reporting",
      description: "Comprehensive reports with severity ratings and remediation recommendations.",
      icon: FileCode
    },
    {
      number: "06",
      title: "Remediation & Verification",
      description: "We verify your fixes and provide final clearance when all issues are resolved.",
      icon: RefreshCcw
    }
  ];

  return (
    <>
      <Helmet>
        <title>Smart Contract Audit Services | Hawkly</title>
        <meta name="description" content="Comprehensive smart contract security audits by expert Web3 security professionals. Protect your protocol with Hawkly's industry-leading audit services." />
      </Helmet>

      <div className="min-h-screen bg-[#0a0d16]">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-[#1e2332]/60 to-[#0a0d16] py-20">
          <div className="container mx-auto px-4 text-center">
            <SecurityBadge level="enterprise" verified={true} size="lg" className="mb-6 inline-block" />
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#a879ef] to-[#32d9fa] bg-clip-text text-transparent">
              Smart Contract Audit Services
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Protect your protocol with comprehensive security audits by industry-leading
              experts in Web3 security and formal verification.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                asChild 
                className="group bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
              >
                <Link to="/request-audit">
                  Request Smart Contract Audit
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                asChild 
                className="border-[#a879ef] text-[#a879ef] hover:bg-[#a879ef]/10"
              >
                <Link to="/marketplace">Find Auditors</Link>
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-[#32d9fa]" />
                <span className="text-gray-300">$10B+ in TVL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-[#32d9fa]" />
                <span className="text-gray-300">500+ Audits Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-[#32d9fa]" />
                <span className="text-gray-300">2,700+ Vulnerabilities Found</span>
              </div>
            </div>
          </div>
        </section>

        {/* Audit Types Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Comprehensive Audit Solutions</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Tailored security assessments for all smart contract systems and blockchain protocols
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <HawklyCard 
                variant="glass" 
                elevation="subtle" 
                glow={true} 
                interactive={true} 
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20 mb-4">
                    <FileCode className="h-6 w-6 text-[#a879ef]" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-[#a879ef] transition-colors">
                    Standard Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    Comprehensive manual and automated assessment of your smart contracts to identify security vulnerabilities and code quality issues.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Full manual code review",
                      "Automated vulnerability scanning",
                      "Gas optimization analysis",
                      "Detailed findings report",
                      "Remediation verification"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#32d9fa] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Badge className="bg-[#a879ef]/20 text-[#a879ef] border-[#a879ef]/30">
                      Most Popular
                    </Badge>
                  </div>
                </CardContent>
              </HawklyCard>

              <HawklyCard 
                variant="glass" 
                elevation="subtle" 
                glow={true} 
                interactive={true} 
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20 mb-4">
                    <Lock className="h-6 w-6 text-[#a879ef]" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-[#a879ef] transition-colors">
                    Advanced Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    In-depth security assessment with formal verification and economic risk analysis for complex protocols and high-value contracts.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Everything in Standard Audit",
                      "Formal verification",
                      "Economic risk analysis",
                      "Custom threat modeling",
                      "Advanced attack simulation",
                      "Executive summary presentation"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#32d9fa] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Badge className="bg-[#32d9fa]/20 text-[#32d9fa] border-[#32d9fa]/30">
                      Enterprise Grade
                    </Badge>
                  </div>
                </CardContent>
              </HawklyCard>

              <HawklyCard 
                variant="glass" 
                elevation="subtle" 
                glow={true} 
                interactive={true} 
                className="group transition-all duration-300 hover:scale-[1.02]"
              >
                <CardHeader>
                  <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20 mb-4">
                    <Database className="h-6 w-6 text-[#a879ef]" />
                  </div>
                  <CardTitle className="text-white text-xl group-hover:text-[#a879ef] transition-colors">
                    Protocol Audit
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300">
                    End-to-end security assessment for complex multi-contract protocols, covering all aspects from smart contracts to infrastructure.
                  </p>
                  <ul className="space-y-2">
                    {[
                      "Everything in Advanced Audit",
                      "Full protocol architecture review",
                      "Cross-contract interaction analysis",
                      "Governance mechanism review",
                      "Integration & dependency analysis",
                      "Long-term security partnership"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-[#32d9fa] mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4">
                    <Badge className="bg-[#a879ef]/20 text-[#a879ef] border-[#a879ef]/30">
                      Comprehensive
                    </Badge>
                  </div>
                </CardContent>
              </HawklyCard>
            </div>
          </div>
        </section>

        {/* Audit Process */}
        <section className="py-20 bg-gradient-to-br from-[#1e2332]/30 to-[#0a0d16]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Our Audit Process</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                A rigorous methodology ensures comprehensive security assessment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {auditSteps.map((step, index) => (
                <HawklyCard key={index} variant="glass" elevation="subtle">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <div className="rounded-full w-12 h-12 flex items-center justify-center bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20">
                          <step.icon className="h-6 w-6 text-[#a879ef]" />
                        </div>
                      </div>
                      <div>
                        <div className="text-[#a879ef] font-mono font-bold mb-1">
                          {step.number}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-300">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </HawklyCard>
              ))}
            </div>
          </div>
        </section>

        {/* Security Standards */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">Security Standards</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Our auditors follow industry-leading security standards
              </p>
            </div>
            
            <HawklyCard variant="glass" elevation="subtle">
              <CardContent className="py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    {
                      title: "CWE/SANS Top 25",
                      description: "Common Weakness Enumeration security standards",
                      icon: Shield
                    },
                    {
                      title: "SCSVS",
                      description: "Smart Contract Security Verification Standard",
                      icon: Check
                    },
                    {
                      title: "OWASP Top 10",
                      description: "Open Web Application Security Project standards",
                      icon: AlertTriangle
                    },
                    {
                      title: "ConsenSys Best Practices",
                      description: "Industry-standard smart contract guidelines",
                      icon: Award
                    },
                    {
                      title: "EEA Security Standards",
                      description: "Enterprise Ethereum Alliance security framework",
                      icon: Lock
                    },
                    {
                      title: "Custom Security Models",
                      description: "Tailored security models for unique protocols",
                      icon: FileSearch
                    }
                  ].map((standard, index) => (
                    <div key={index} className="flex items-start gap-4 p-4">
                      <div className="rounded-full w-10 h-10 flex items-center justify-center bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20">
                        <standard.icon className="h-5 w-5 text-[#a879ef]" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-1">{standard.title}</h3>
                        <p className="text-gray-400">{standard.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </HawklyCard>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-[#1e2332]/30 to-[#0a0d16]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-white">What Our Clients Say</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Trusted by leading Web3 projects and protocols
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <HawklyCard key={index} variant="glass" elevation="subtle">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#a879ef] to-[#32d9fa] flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-white font-medium">{testimonial.name}</h4>
                        <p className="text-gray-400 text-sm">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-300 italic">&ldquo;{testimonial.quote}&rdquo;</p>
                  </CardContent>
                </HawklyCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <HawklyCard variant="highlighted" elevation="strong" glow={true} className="max-w-5xl mx-auto">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to secure your smart contracts?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Join hundreds of Web3 projects that trust Hawkly with their security needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg" 
                    asChild 
                    className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
                  >
                    <Link to="/request-audit">
                      Request an Audit
                    </Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild 
                    className="border-white/30 text-white hover:bg-white/10"
                  >
                    <Link to="/contact">Contact Our Team</Link>
                  </Button>
                </div>
              </CardContent>
            </HawklyCard>
          </div>
        </section>

        {/* FAQ or Resources could go here */}
      </div>
    </>
  );
}
