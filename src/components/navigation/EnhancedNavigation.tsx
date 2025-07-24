import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Shield, 
  Users, 
  BookOpen, 
  Zap, 
  Search,
  Bell,
  User,
  ChevronDown,
  Globe,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { HawklyCard } from '@/components/ui/hawkly-components';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string;
  children?: NavItem[];
}

const navigationItems: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    icon: Shield,
    children: [
      { label: 'Smart Contract Audits', href: '/services/smart-contracts' },
      { label: 'Code Reviews', href: '/services/code-reviews' },
      { label: 'Penetration Testing', href: '/services/penetration-testing' },
      { label: 'Security Consulting', href: '/services/consulting' }
    ]
  },
  {
    label: 'Marketplace',
    href: '/marketplace',
    icon: Users
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: BookOpen,
    children: [
      { label: 'Security Guides', href: '/resources/guides' },
      { label: 'Knowledge Base', href: '/resources/knowledge-base' },
      { label: 'Tutorials', href: '/resources/tutorials' },
      { label: 'Vulnerability Database', href: '/resources/vulnerabilities' }
    ]
  },
  {
    label: 'Tools',
    href: '/tools',
    icon: Zap,
    badge: 'AI',
    children: [
      { label: 'AI Security Suite', href: '/tools/ai-security' },
      { label: 'Vulnerability Scanner', href: '/tools/scanner' },
      { label: 'Security Insights', href: '/tools/insights' }
    ]
  }
];

export function EnhancedNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isActive = (href: string) => {
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <nav className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'bg-[rgba(24,31,47,0.95)] backdrop-blur-[20px] border-b border-[rgba(168,121,239,0.08)] shadow-[0_8px_40px_0_rgba(50,60,130,0.15)]'
          : 'bg-transparent'
      )}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-xl flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(168,121,239,0.5)] transition-all duration-300">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-black text-[#f8f9fb] group-hover:text-[#a879ef] transition-colors duration-300">
                Hawkly
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationItems.map((item) => (
                <div key={item.href} className="relative">
                  <button
                    onMouseEnter={() => setActiveDropdown(item.children ? item.label : null)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                      'hover:bg-[rgba(168,121,239,0.1)] hover:text-[#a879ef]',
                      isActive(item.href) 
                        ? 'text-[#a879ef] bg-[rgba(168,121,239,0.1)]' 
                        : 'text-[#b2bfd4]'
                    )}
                  >
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-1.5 py-0.5 text-xs bg-gradient-to-r from-[#a879ef] to-[#32d9fa] text-white rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                    {item.children && <ChevronDown className="w-4 h-4" />}
                  </button>

                  {/* Dropdown Menu */}
                  {item.children && activeDropdown === item.label && (
                    <div
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                      className="absolute top-full left-0 mt-2 w-64 py-2 bg-[#1e2332] border border-[#23283e] rounded-xl shadow-[0_8px_40px_0_rgba(50,60,130,0.23)] z-50"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            'flex items-center gap-3 px-4 py-3 text-sm transition-all duration-300',
                            'hover:bg-[rgba(168,121,239,0.1)] hover:text-[#a879ef]',
                            isActive(child.href) 
                              ? 'text-[#a879ef] bg-[rgba(168,121,239,0.1)]' 
                              : 'text-[#b2bfd4]'
                          )}
                        >
                          <div className="w-2 h-2 bg-current rounded-full opacity-60" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button className="hidden md:flex items-center gap-2 px-3 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#8391ad] hover:border-[#a879ef] hover:text-[#a879ef] transition-all duration-300">
                <Search className="w-4 h-4" />
                <span className="text-sm">Search...</span>
                <kbd className="px-1.5 py-0.5 text-xs bg-[#23283e] rounded">⌘K</kbd>
              </button>

              {/* Notifications */}
              <button className="relative p-2 text-[#b2bfd4] hover:text-[#a879ef] transition-colors duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#fc3574] rounded-full border-2 border-[#131822]" />
              </button>

              {/* User Menu */}
              <div className="relative">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-[rgba(168,121,239,0.1)] transition-all duration-300">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
              </div>

              {/* CTA Button */}
              <Button 
                asChild
                className="hidden sm:flex bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] text-white font-bold shadow-[0_0_20px_rgba(168,121,239,0.3)] hover:shadow-[0_0_24px_rgba(168,121,239,0.5)]"
              >
                <Link to="/request-audit">Request Audit</Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 text-[#b2bfd4] hover:text-[#a879ef] transition-colors duration-300"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-[#23283e] bg-[#1e2332]">
            <div className="max-w-7xl mx-auto px-6 py-4 space-y-4">
              {/* Search */}
              <div className="flex items-center gap-2 px-3 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg">
                <Search className="w-4 h-4 text-[#8391ad]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="flex-1 bg-transparent text-[#f8f9fb] placeholder-[#8391ad] outline-none"
                />
              </div>

              {/* Navigation Items */}
              {navigationItems.map((item) => (
                <div key={item.href} className="space-y-2">
                  <Link
                    to={item.href}
                    className={cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300',
                      isActive(item.href)
                        ? 'text-[#a879ef] bg-[rgba(168,121,239,0.1)]'
                        : 'text-[#b2bfd4] hover:bg-[rgba(168,121,239,0.1)] hover:text-[#a879ef]'
                    )}
                  >
                    {item.icon && <item.icon className="w-5 h-5" />}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-[#a879ef] to-[#32d9fa] text-white rounded-full font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>

                  {/* Mobile Submenu */}
                  {item.children && (
                    <div className="ml-8 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          className={cn(
                            'block px-4 py-2 text-sm rounded-lg transition-all duration-300',
                            isActive(child.href)
                              ? 'text-[#a879ef] bg-[rgba(168,121,239,0.1)]'
                              : 'text-[#8391ad] hover:text-[#a879ef] hover:bg-[rgba(168,121,239,0.05)]'
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-[#23283e]">
                <Button 
                  asChild
                  className="w-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7] text-white font-bold"
                >
                  <Link to="/request-audit">Request Audit</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from being hidden behind fixed nav */}
      <div className="h-18" />
    </>
  );
}

// Quick Action Floating Button Component
export function QuickActionButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const quickActions = [
    { label: 'Request Audit', href: '/request-audit', icon: Shield },
    { label: 'Find Auditors', href: '/marketplace', icon: Users },
    { label: 'AI Tools', href: '/tools', icon: Zap },
    { label: 'Resources', href: '/resources', icon: BookOpen }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-2 mb-2">
          {quickActions.map((action, index) => (
            <HawklyCard
              key={action.href}
              variant="glass"
              className="p-3 animate-fade-in-up"
            >
              <Link
                to={action.href}
                className="flex items-center gap-3 text-[#f8f9fb] hover:text-[#a879ef] transition-colors duration-300 whitespace-nowrap"
                onClick={() => setIsExpanded(false)}
              >
                <action.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{action.label}</span>
              </Link>
            </HawklyCard>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-14 h-14 bg-gradient-to-r from-[#a879ef] to-[#32d9fa] rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(168,121,239,0.4)] hover:shadow-[0_6px_24px_rgba(168,121,239,0.6)] transition-all duration-300 hover:scale-110"
      >
        {isExpanded ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Zap className="w-6 h-6 text-white" />
        )}
      </button>
    </div>
  );
}
