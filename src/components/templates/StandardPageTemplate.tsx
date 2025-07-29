import React from 'react';
import { HawklyCard, SecurityBadge, LiveMetric, ProgressIndicator, AuditorAvatar } from '@/components/ui/hawkly-components';
import { EnhancedNavigation } from '@/components/navigation/EnhancedNavigation';
import { Shield, Zap, Users, BarChart3 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * StandardPageTemplate
 * 
 * Base template for standard content pages following the Hawkly UI Overhaul guidelines.
 * Use this template for creating new pages or migrating existing ones.
 */

interface StandardPageTemplateProps {
  children?: React.ReactNode;
  title: string;
  description?: string;
  showNavigation?: boolean;
  showFooter?: boolean;
  headerMetrics?: {
    label: string;
    value: string | number;
    icon?: LucideIcon;
    trend?: 'up' | 'down' | 'stable';
  }[];
}

export default function StandardPageTemplate({
  children,
  title,
  description,
  showNavigation = true,
  showFooter = true,
  headerMetrics = []
}: StandardPageTemplateProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] to-[#1a1f2e] text-white">
      {/* Navigation */}
      {showNavigation && <EnhancedNavigation />}
      
      {/* Page Header */}
      <header className="px-4 py-8 md:px-8 lg:px-12 pt-24">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            {title}
          </h1>
          
          {description && (
            <p className="text-gray-400 text-lg mb-6 max-w-3xl">
              {description}
            </p>
          )}
          
          {/* Header Metrics */}
          {headerMetrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {headerMetrics.map((metric, index) => (
                <LiveMetric
                  key={`header-metric-${index}`}
                  label={metric.label}
                  value={metric.value}
                  icon={metric.icon}
                  trend={metric.trend}
                  animated={true}
                />
              ))}
            </div>
          )}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-4 py-6 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {children || (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Example Content - Replace with your actual content */}
              <HawklyCard variant="default">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-[#32d9fa]" />
                    Security Overview
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Comprehensive security analysis and vulnerability assessment for your project.
                  </p>
                  <ProgressIndicator 
                    value={85} 
                    max={100} 
                    label="Security Score" 
                    animated={true} 
                  />
                </div>
              </HawklyCard>
              
              <HawklyCard variant="glass">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-[#a879ef]" />
                    Performance Metrics
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Real-time performance tracking and optimization recommendations.
                  </p>
                  <div className="space-y-3">
                    <LiveMetric 
                      label="Response Time" 
                      value="124ms" 
                      trend="down" 
                    />
                    <LiveMetric 
                      label="Success Rate" 
                      value="99.8%" 
                      trend="up" 
                    />
                  </div>
                </div>
              </HawklyCard>
              
              <HawklyCard variant="interactive" onClick={() => console.log('Card clicked')}>
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#32d9fa]" />
                    Auditor Marketplace
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Connect with specialized security auditors tailored to your project needs.
                  </p>
                  <div className="flex -space-x-3">
                    <AuditorAvatar 
                      src="/avatars/auditor-1.jpg" 
                      name="Alex Chen" 
                      verified={true} 
                    />
                    <AuditorAvatar 
                      src="/avatars/auditor-2.jpg" 
                      name="Maria Santos" 
                      verified={true} 
                    />
                    <AuditorAvatar 
                      src="/avatars/auditor-3.jpg" 
                      name="Sam Wilson" 
                      verified={false} 
                    />
                    <div className="h-10 w-10 rounded-full bg-[#2a224e] flex items-center justify-center text-sm border border-[#a879ef]">
                      +12
                    </div>
                  </div>
                </div>
              </HawklyCard>
              
              <HawklyCard variant="highlighted">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-[#a879ef]" />
                    Analytics Dashboard
                  </h2>
                  <p className="text-gray-400 mb-4">
                    Comprehensive analytics and insights for your security profile.
                  </p>
                  <div className="h-32 flex items-center justify-center">
                    <p className="text-sm text-center text-gray-400">
                      [Chart Visualization]
                    </p>
                  </div>
                  <SecurityBadge 
                    level="advanced" verified={true} animated={true} size="md" 
                  />
                </div>
              </HawklyCard>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      {showFooter && (
        <footer className="bg-[#131822] border-t border-gray-800 py-12 px-4 md:px-8 lg:px-12 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Platform</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#a879ef] transition">Home</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Dashboard</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Marketplace</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Audits</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#a879ef] transition">Documentation</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Guides</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Blog</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Support</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#a879ef] transition">About</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Careers</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Contact</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Partners</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Legal</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-[#a879ef] transition">Privacy</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Terms</a></li>
                  <li><a href="#" className="hover:text-[#a879ef] transition">Security</a></li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm">© 2025 Hawkly. All rights reserved.</p>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
