
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardizedLogo } from '@/components/ui/StandardizedLogo';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <StandardizedLogo 
              size="medium" 
              variant="white" 
              showText={true}
            />
            <p className="text-gray-300 text-sm">
              The leading Web3 security marketplace connecting projects with verified security experts.
            </p>
            <div className="text-sm text-gray-400">
              © 2025 Hawkly. All rights reserved.
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/security-audits" className="text-gray-300 hover:text-white transition-colors">Security Audits</Link></li>
              <li><Link to="/code-reviews" className="text-gray-300 hover:text-white transition-colors">Code Reviews</Link></li>
              <li><Link to="/penetration-testing" className="text-gray-300 hover:text-white transition-colors">Penetration Testing</Link></li>
              <li><Link to="/consulting" className="text-gray-300 hover:text-white transition-colors">Security Consulting</Link></li>
              <li><Link to="/marketplace" className="text-gray-300 hover:text-white transition-colors">Browse Marketplace</Link></li>
              <li><Link to="/request-audit" className="text-gray-300 hover:text-white transition-colors">Request Audit</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="text-gray-300 hover:text-white transition-colors">Resource Hub</Link></li>
              <li><Link to="/audit-guidelines" className="text-gray-300 hover:text-white transition-colors">Audit Guidelines</Link></li>
              <li><Link to="/ai-tools" className="text-gray-300 hover:text-white transition-colors">AI Tools</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white transition-colors">Support Center</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/service-provider-onboarding" className="text-gray-300 hover:text-white transition-colors">Become an Auditor</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
