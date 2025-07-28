import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useRBAC } from '../contexts/RBACContext';
import { HawklyCard, SecurityBadge, LiveMetric } from '@/components/ui/hawkly-components';
import { Shield, User, Lock } from 'lucide-react';

// Define form state type
interface FormState {
  email: string;
  password: string;
  rememberMe: boolean;
}

export default function AuthPage() {
  const { login, isAuthenticated } = useRBAC();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state, or default to dashboard
  const from = (location.state as { from?: string })?.from || '/dashboard';
  
  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);
  
  // Form state
  const [formState, setFormState] = useState<FormState>({
    email: '',
    password: '',
    rememberMe: false,
  });
  
  // Error and loading states
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Update form fields
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear any previous errors when user types
    if (error) setError(null);
  };
  
  // Submit the form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      const { email, password } = formState;
      
      // Validate form fields
      if (!email.trim() || !password.trim()) {
        throw new Error('Please enter both email and password');
      }
      
      // Attempt login
      const success = await login(email, password);
      
      if (success) {
        // Login successful, navigate to the redirected page
        navigate(from, { replace: true });
      } else {
        // Invalid credentials
        throw new Error('Invalid email or password');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };
  
  // For demo purposes - select a pre-defined user
  const selectUser = (email: string) => {
    setFormState(prev => ({
      ...prev,
      email,
      password: 'password' // This is the password for all demo users
    }));
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#131822] to-[#1a1f2e] p-4">
      <HawklyCard variant="glass" className="w-full max-w-md backdrop-blur-md border border-[#23283e] overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-[#a879ef]" />
            </div>
            <h2 className="text-3xl font-bold text-white bg-clip-text text-transparent bg-gradient-to-r from-[#a879ef] to-[#32d9fa]">
              Welcome to Hawkly
            </h2>
            <p className="text-gray-400 mt-2">Sign in to access the secure platform</p>
          </div>

          {/* Demo user selector - only for development */}
          <HawklyCard variant="default" className="mb-6">
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-300 mb-2 flex items-center">
                <User className="h-4 w-4 mr-2 text-[#32d9fa]" />
                Demo Users:
              </h3>
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => selectUser('admin@hawkly.io')}
                  className="px-3 py-1 text-xs rounded-full bg-[#a879ef] hover:bg-[#9665d8] text-white transition-all duration-300 hover:scale-105"
                >
                  Admin
                </button>
                <button
                  onClick={() => selectUser('auditor@hawkly.io')}
                  className="px-3 py-1 text-xs rounded-full bg-[#32d9fa] hover:bg-[#28b7d2] text-white transition-all duration-300 hover:scale-105"
                >
                  Auditor
                </button>
                <button
                  onClick={() => selectUser('project@hawkly.io')}
                  className="px-3 py-1 text-xs rounded-full bg-[#4ade80] hover:bg-[#3dba69] text-white transition-all duration-300 hover:scale-105"
                >
                  Project Owner
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2">Password: "password" for all demo users</p>
            </div>
          </HawklyCard>

          {error && (
            <HawklyCard variant="highlighted" className="mb-6">
              <div className="p-3 flex items-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            </HawklyCard>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 
                            bg-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formState.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-700 rounded-md shadow-sm placeholder-gray-500 
                            bg-gray-700/50 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formState.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-700 bg-gray-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-purple-400 hover:text-purple-300">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                          ${isLoading ? 'bg-[#9665d8] cursor-not-allowed' : 'bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:opacity-90 transition-all duration-300 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-[#a879ef]'}`}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
        
        <div className="px-6 py-4 bg-gray-700/10 text-center">
          <p className="text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="font-medium text-[#32d9fa] hover:text-[#28b7d2] transition-colors">
              Request access
            </a>
          </p>
        </div>
      </HawklyCard>
      
      <SecurityBadge 
        level="advanced" verified={true} animated={true} size="md" className="mt-4" 
      />
    </div>
  );
}
