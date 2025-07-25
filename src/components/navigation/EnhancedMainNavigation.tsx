import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  Lock, 
  Zap, 
  User, 
  Database,
  FileText,
  Award,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'react-router-dom';

/**
 * Enhanced Main Navigation component for the Hawkly Platform
 * Implements the new UI design standards with glassmorphism effects
 */
export default function EnhancedMainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  
  // Handle scroll events to apply glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  
  // Navigation categories with routes
  const navCategories = [
    {
      name: 'Platform',
      icon: <Shield className="h-4 w-4" />,
      items: [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'Marketplace', path: '/marketplace' },
        { name: 'Request Audit', path: '/request-audit' },
        { name: 'AI Tools', path: '/ai-tools' },
      ]
    },
    {
      name: 'Security',
      icon: <Lock className="h-4 w-4" />,
      items: [
        { name: 'Security Overview', path: '/security' },
        { name: 'Vulnerability Scanner', path: '/security/scanner' },
        { name: 'Compliance', path: '/security/compliance' },
        { name: 'Web3 Security', path: '/security/web3' },
        { name: 'Security Insights', path: '/security/insights' },
        { name: 'Security Policy', path: '/security/policy' },
      ]
    },
    {
      name: 'Analytics',
      icon: <BarChart3 className="h-4 w-4" />,
      items: [
        { name: 'Analytics Dashboard', path: '/analytics/dashboard' },
        { name: 'Live Dashboard', path: '/analytics/live' },
        { name: 'User Dashboard', path: '/analytics/user' },
        { name: 'Production Dashboard', path: '/analytics/production' },
      ]
    },
    {
      name: 'AI Features',
      icon: <Zap className="h-4 w-4" />,
      items: [
        { name: 'AI Analysis', path: '/ai/analysis' },
        { name: 'AI Matching', path: '/ai/matching' },
        { name: 'AI Workspace', path: '/ai/workspace' },
        { name: 'Smart Learning', path: '/ai/learning' },
        { name: 'AI Features', path: '/ai/features' },
      ]
    },
    {
      name: 'Community',
      icon: <Users className="h-4 w-4" />,
      items: [
        { name: 'Community Hub', path: '/community' },
        { name: 'Events', path: '/community/events' },
        { name: 'Leaderboard', path: '/community/leaderboard' },
        { name: 'Blog', path: '/community/blog' },
        { name: 'Challenges', path: '/community/challenges' },
      ]
    },
    {
      name: 'Resources',
      icon: <BookOpen className="h-4 w-4" />,
      items: [
        { name: 'Documentation', path: '/docs' },
        { name: 'Guides', path: '/guides' },
        { name: 'Knowledge Base', path: '/knowledge-base' },
        { name: 'Tutorials', path: '/tutorials' },
        { name: 'FAQ', path: '/faq' },
      ]
    },
    {
      name: 'Tools',
      icon: <Database className="h-4 w-4" />,
      items: [
        { name: 'File Management', path: '/tools/files' },
        { name: 'Integrations', path: '/tools/integrations' },
        { name: 'Templates', path: '/tools/templates' },
        { name: 'Workspace', path: '/tools/workspace' },
      ]
    },
  ];

  // For user dropdown menu
  const userMenuItems = [
    { name: 'Profile', path: '/profile', icon: <User className="h-4 w-4" /> },
    { name: 'Settings', path: '/profile/edit', icon: <Settings className="h-4 w-4" /> },
    { name: '2FA Setup', path: '/profile/2fa', icon: <Lock className="h-4 w-4" /> },
    { name: 'Admin', path: '/admin/dashboard', icon: <Shield className="h-4 w-4" /> },
  ];

  // Enterprise menu items
  const enterpriseMenuItems = [
    { name: 'For Enterprises', path: '/enterprise', icon: <Briefcase className="h-4 w-4" /> },
    { name: 'For Auditors', path: '/for-auditors', icon: <FileText className="h-4 w-4" /> },
    { name: 'For Developers', path: '/for-developers', icon: <Database className="h-4 w-4" /> },
    { name: 'For Project Owners', path: '/for-project-owners', icon: <Award className="h-4 w-4" /> },
  ];

  // Handle dropdown toggle
  const toggleDropdown = (e: React.MouseEvent, category: string) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === category ? null : category);
  };

  // Check if route is active
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-lg border-b border-gray-800/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <Shield className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold text-white">Hawkly</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-2">
            {navCategories.map((category) => (
              <div key={category.name} className="relative">
                <button
                  onClick={(e) => toggleDropdown(e, category.name)}
                  className={`px-3 py-2 rounded-md text-sm flex items-center space-x-1 transition
                    ${activeDropdown === category.name 
                      ? 'bg-purple-900/50 text-white' 
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}
                >
                  <span className="flex items-center">
                    {category.icon}
                    <span className="ml-1">{category.name}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === category.name ? 'rotate-180' : ''
                  }`} />
                </button>
                
                {/* Dropdown */}
                {activeDropdown === category.name && (
                  <div 
                    className="absolute mt-2 w-64 bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-lg shadow-lg py-2"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-4 py-2 text-sm hover:bg-purple-900/30 transition ${
                          isActive(item.path)
                            ? 'bg-purple-900/50 text-purple-300 font-medium'
                            : 'text-gray-300'
                        }`}
                        onClick={() => setActiveDropdown(null)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Search */}
            <button className="text-gray-400 hover:text-white transition">
              <Search className="h-5 w-5" />
            </button>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown(e, 'user')}
                className="flex items-center space-x-1 text-gray-300 hover:text-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${
                  activeDropdown === 'user' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {/* User dropdown */}
              {activeDropdown === 'user' && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-lg shadow-lg py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {userMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 transition"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                  <hr className="my-1 border-gray-700" />
                  <button
                    className="flex items-center w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 transition"
                    onClick={() => setActiveDropdown(null)}
                  >
                    <Lock className="h-4 w-4" />
                    <span className="ml-2">Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Enterprise Button with dropdown */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown(e, 'enterprise')}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              >
                Enterprise
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform ${
                  activeDropdown === 'enterprise' ? 'rotate-180' : ''
                }`} />
              </button>
              
              {activeDropdown === 'enterprise' && (
                <div 
                  className="absolute right-0 mt-2 w-48 bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-lg shadow-lg py-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  {enterpriseMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-purple-900/30 transition"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white transition"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 max-h-[80vh] overflow-y-auto">
            {navCategories.map((category) => (
              <div key={category.name} className="space-y-1">
                <button
                  onClick={(e) => toggleDropdown(e, category.name + '-mobile')}
                  className={`w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium ${
                    activeDropdown === category.name + '-mobile'
                      ? 'bg-purple-900/50 text-white'
                      : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'
                  }`}
                >
                  <span className="flex items-center">
                    {category.icon}
                    <span className="ml-2">{category.name}</span>
                  </span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === category.name + '-mobile' ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Mobile dropdown */}
                {activeDropdown === category.name + '-mobile' && (
                  <div className="pl-6 space-y-1">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path}
                        className={`block px-3 py-2 rounded-md text-base ${
                          isActive(item.path)
                            ? 'bg-purple-900/30 text-purple-300'
                            : 'text-gray-400 hover:bg-gray-800/30 hover:text-white'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="pt-4 pb-3 border-t border-gray-800">
              <div className="px-4 flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-cyan-400 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-white">User Name</div>
                  <div className="text-sm text-gray-400">user@email.com</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                {userMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md text-base text-gray-400 hover:bg-gray-800/30 hover:text-white transition"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.icon}
                    <span className="ml-2">{item.name}</span>
                  </Link>
                ))}
                <button
                  className="flex items-center w-full text-left px-3 py-2 rounded-md text-base text-red-400 hover:bg-gray-800/30 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Lock className="h-4 w-4" />
                  <span className="ml-2">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
