import React from 'react';
import EnhancedMainNavigation from '@/components/navigation/EnhancedMainNavigation';
import { Link } from 'react-router-dom';
import { Shield, Twitter, Linkedin, Github, Mail } from 'lucide-react';

interface EnhancedLayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

export default function EnhancedLayout({ children, hideFooter = false }: EnhancedLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-black text-white">
      <EnhancedMainNavigation />
      
      {/* Main Content with top padding for navigation */}
      <main className="flex-grow pt-16">
        {children}
      </main>
      
      {/* Footer */}
      {!hideFooter && (
        <footer className="border-t border-gray-800 mt-16">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo and Tagline */}
              <div className="col-span-1">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-purple-500" />
                  <span className="ml-2 text-xl font-bold">Hawkly</span>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  The premier Web3 security platform connecting projects with expert auditors.
                </p>
                <div className="mt-4 flex space-x-4">
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Linkedin className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Github className="h-5 w-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition">
                    <Mail className="h-5 w-5" />
                  </a>
                </div>
              </div>
              
              {/* Platform Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Platform
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/marketplace" className="text-gray-400 hover:text-purple-400 transition">
                      Marketplace
                    </Link>
                  </li>
                  <li>
                    <Link to="/request-audit" className="text-gray-400 hover:text-purple-400 transition">
                      Request Audit
                    </Link>
                  </li>
                  <li>
                    <Link to="/security" className="text-gray-400 hover:text-purple-400 transition">
                      Security Tools
                    </Link>
                  </li>
                  <li>
                    <Link to="/ai/features" className="text-gray-400 hover:text-purple-400 transition">
                      AI Features
                    </Link>
                  </li>
                  <li>
                    <Link to="/community" className="text-gray-400 hover:text-purple-400 transition">
                      Community
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Services Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Services
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/security-audits" className="text-gray-400 hover:text-purple-400 transition">
                      Security Audits
                    </Link>
                  </li>
                  <li>
                    <Link to="/code-reviews" className="text-gray-400 hover:text-purple-400 transition">
                      Code Reviews
                    </Link>
                  </li>
                  <li>
                    <Link to="/penetration-testing" className="text-gray-400 hover:text-purple-400 transition">
                      Penetration Testing
                    </Link>
                  </li>
                  <li>
                    <Link to="/consulting" className="text-gray-400 hover:text-purple-400 transition">
                      Consulting
                    </Link>
                  </li>
                  <li>
                    <Link to="/enterprise" className="text-gray-400 hover:text-purple-400 transition">
                      Enterprise
                    </Link>
                  </li>
                </ul>
              </div>
              
              {/* Company Links */}
              <div>
                <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">
                  Company
                </h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <Link to="/about" className="text-gray-400 hover:text-purple-400 transition">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-gray-400 hover:text-purple-400 transition">
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-gray-400 hover:text-purple-400 transition">
                      Contact
                    </Link>
                  </li>
                  <li>
                    <Link to="/privacy" className="text-gray-400 hover:text-purple-400 transition">
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-gray-400 hover:text-purple-400 transition">
                      Terms
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-gray-400">
                &copy; {new Date().getFullYear()} Hawkly Security. All rights reserved.
              </p>
              <div className="mt-4 md:mt-0 flex space-x-6">
                <Link to="/privacy" className="text-sm text-gray-400 hover:text-purple-400 transition">
                  Privacy Policy
                </Link>
                <Link to="/terms" className="text-sm text-gray-400 hover:text-purple-400 transition">
                  Terms of Service
                </Link>
                <Link to="/faq" className="text-sm text-gray-400 hover:text-purple-400 transition">
                  FAQ
                </Link>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
