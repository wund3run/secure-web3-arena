
import React from 'react';
import { Helmet } from 'react-helmet-async';
import AuditRequestForm from '@/components/audit-request/AuditRequestForm';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

// Import Hawkly UI components
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { Separator } from '@/components/ui/separator';
import { 
  Shield, 
  CheckCircle2, 
  Clock, 
  Rocket, 
  Users,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

const RequestAudit = () => {
  const navigate = useNavigate();

  const handleSubmitSuccess = () => {
    toast.success('Audit request submitted successfully!', {
      description: 'You will be matched with suitable auditors within 24 hours.'
    });
    
    // Redirect to dashboard after successful submission
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <ProductionLayout
      title="Request Security Audit | Hawkly"
      description="Submit your Web3 project for a professional security audit by verified experts"
    >
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main content - form section */}
          <div className="lg:col-span-8 space-y-8">
            <div className="text-left">
              <div className="flex items-center gap-2 mb-3">
                <SecurityBadge level="enterprise" verified={true} animated={true} size="lg" />
                <h1 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
                  Request a Security Audit
                </h1>
              </div>
              <p className="text-gray-300 max-w-2xl">
                Get a comprehensive security assessment of your smart contracts and Web3 project from our verified experts.
              </p>
            </div>

            {/* Form component */}
            <AuditRequestForm onSubmitSuccess={handleSubmitSuccess} />
          </div>

          {/* Sidebar - information */}
          <div className="lg:col-span-4">
            {/* What to expect card */}
            <div className="sticky top-24 space-y-6">
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  What to Expect
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-blue-900/40 flex items-center justify-center mt-1">
                      <CheckCircle2 className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">AI-Powered Matching</h4>
                      <p className="text-sm text-slate-400">Our system will match your project with the most qualified security experts.</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-700/50" />
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-emerald-900/40 flex items-center justify-center mt-1">
                      <Clock className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Quick Turnaround</h4>
                      <p className="text-sm text-slate-400">Receive auditor matches within 24 hours of submitting your request.</p>
                    </div>
                  </div>
                  
                  <Separator className="bg-slate-700/50" />
                  
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-purple-900/40 flex items-center justify-center mt-1">
                      <Shield className="h-4 w-4 text-purple-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-200">Comprehensive Security</h4>
                      <p className="text-sm text-slate-400">Detailed security analysis of vulnerabilities, risks, and best practices.</p>
                    </div>
                  </div>
                </div>
              </HawklyCard>

              {/* Stats Card */}
              <HawklyCard variant="glass" elevation="subtle" glow={true} className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Hawkly Security Impact</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-400">$2.1B+</div>
                    <div className="text-xs text-slate-400">Funds Protected</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-emerald-400">1,200+</div>
                    <div className="text-xs text-slate-400">Projects Audited</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-amber-400">15,300+</div>
                    <div className="text-xs text-slate-400">Vulnerabilities Found</div>
                  </div>
                  <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-purple-400">98.7%</div>
                    <div className="text-xs text-slate-400">Customer Satisfaction</div>
                  </div>
                </div>
              </HawklyCard>

              {/* Additional resources */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Resources</h3>
                <ScrollArea className="h-64 pr-4">
                  <div className="space-y-3">
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/audit-process">
                        <span>Audit Process Guide</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/pricing">
                        <span>Pricing Information</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/audit-preparation">
                        <span>How to Prepare for an Audit</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/common-vulnerabilities">
                        <span>Common Smart Contract Vulnerabilities</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/sample-reports">
                        <span>Sample Audit Reports</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="w-full justify-between text-left" asChild>
                      <a href="/resources/security-best-practices">
                        <span>Security Best Practices</span>
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </ScrollArea>
              </HawklyCard>
            </div>
          </div>
        </div>
      </div>

    </ProductionLayout>
  );
}

export default RequestAudit;
