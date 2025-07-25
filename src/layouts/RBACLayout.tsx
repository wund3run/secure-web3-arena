import React from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';
import RBACNavigation from '@/components/navigation/RBACNavigation';

export default function RBACLayout() {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <RBACNavigation />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-800 text-gray-400 py-6 text-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <p>&copy; {new Date().getFullYear()} Hawkly. All rights reserved.</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
      <Toaster position="top-right" />
    </div>
  );
}
