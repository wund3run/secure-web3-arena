
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
              The leading Web3 security marketplace connecting projects with verified auditors.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/marketplace" className="text-gray-300 hover:text-white">Marketplace</Link></li>
              <li><Link to="/request-audit" className="text-gray-300 hover:text-white">Request Audit</Link></li>
              <li><Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/audit-guidelines" className="text-gray-300 hover:text-white">Guidelines</Link></li>
              <li><Link to="/support" className="text-gray-300 hover:text-white">Help Center</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-300 hover:text-white">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; 2025 Hawkly. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
