
import React from 'react';
import { Link } from 'react-router-dom';
import { StandardizedLogo } from '@/components/ui/StandardizedLogo';
import { footerNavigation, socialLinks } from '@/config/navigation';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12" role="contentinfo">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
            <StandardizedLogo 
              size="medium" 
              variant="white" 
              showText={true}
            />
            <p className="text-gray-300 text-sm max-w-md">
              The leading Web3 security marketplace connecting projects with verified security experts. 
              Securing the future of blockchain technology.
            </p>
            <div className="text-sm text-gray-400">
              <p><strong>500+</strong> verified experts • <strong>$350M+</strong> protected • <strong>2,500+</strong> audits</p>
            </div>
            <div className="text-sm text-gray-400">
              © 2025 Hawkly. All rights reserved.
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.services.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.resources.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Platform */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.platform.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company & Legal */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {footerNavigation.company.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold mt-6 mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              {footerNavigation.legal.map((link) => (
                <li key={link.href}>
                  <Link 
                    to={link.href} 
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links & Contact */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap justify-center md:justify-start gap-6">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                  aria-label={`Hawkly on ${link.title}`}
                >
                  {link.title}
                </a>
              ))}
            </div>
            <div className="text-sm text-gray-400">
              Contact: <a href="mailto:hello@hawkly.com" className="hover:text-white">hello@hawkly.com</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
