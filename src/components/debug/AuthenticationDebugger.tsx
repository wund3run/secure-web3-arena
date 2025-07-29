import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  RefreshCw, 
  Database, 
  Key, 
  Shield,
  Link,
  Settings,
  Eye,
  EyeOff,
  User
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://divymuaksqdgjsrlptct.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU';

interface DiagnosticResult {
  test: string;
  status: 'pass' | 'fail' | 'warning' | 'info';
  message: string;
  details?: string;
  icon: React.ReactNode;
}

export function AuthenticationDebugger() {
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);
  const [showEnvVars, setShowEnvVars] = useState(false);

  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  const runDiagnostics = async () => {
    setLoading(true);
    const diagnostics: DiagnosticResult[] = [];

    try {
      // Test 1: Database Connection
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
        
        if (error) {
          diagnostics.push({
            test: 'Database Connection',
            status: 'fail',
            message: 'Database query failed',
            details: error.message,
            icon: <XCircle className="w-5 h-5 text-red-500" />
          });
        } else {
          diagnostics.push({
            test: 'Database Connection',
            status: 'pass',
            message: 'Database accessible',
            details: `Found ${data.length} profiles in database`,
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'Database Connection',
          status: 'fail',
          message: 'Database connection failed',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

      // Test 2: Count Operations
      try {
        const { count, error } = await supabase
          .from('profiles')
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          diagnostics.push({
            test: 'Count Operations',
            status: 'warning',
            message: 'Count queries blocked',
            details: error.message,
            icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
          });
        } else {
          diagnostics.push({
            test: 'Count Operations',
            status: 'pass',
            message: 'Count queries working',
            details: `Total profiles: ${count}`,
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'Count Operations',
          status: 'fail',
          message: 'Count queries failed',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

      // Test 3: Authentication System
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          diagnostics.push({
            test: 'Authentication System',
            status: 'fail',
            message: 'Auth system error',
            details: error.message,
            icon: <XCircle className="w-5 h-5 text-red-500" />
          });
        } else {
          diagnostics.push({
            test: 'Authentication System',
            status: 'pass',
            message: 'Auth system functional',
            details: session ? `Active session: ${session.user.email}` : 'No active session',
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'Authentication System',
          status: 'fail',
          message: 'Auth system failed',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

      // Test 4: Sign-in API
      try {
        const { error } = await supabase.auth.signInWithPassword({
          email: 'test@invalid.com',
          password: 'invalid'
        });
        
        if (error && error.message.includes('Invalid login credentials')) {
          diagnostics.push({
            test: 'Sign-in API',
            status: 'pass',
            message: 'API correctly rejects invalid credentials',
            details: 'Authentication endpoint working properly',
            icon: <CheckCircle className="w-5 h-5 text-green-500" />
          });
        } else if (error && error.message.includes('Invalid API key')) {
          diagnostics.push({
            test: 'Sign-in API',
            status: 'fail',
            message: 'Invalid API key',
            details: 'Check environment configuration',
            icon: <XCircle className="w-5 h-5 text-red-500" />
          });
        } else {
          diagnostics.push({
            test: 'Sign-in API',
            status: 'warning',
            message: 'Unexpected API response',
            details: error?.message || 'Unknown response',
            icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'Sign-in API',
          status: 'fail',
          message: 'Sign-in API failed',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

      // Test 5: RLS Security
      try {
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: '00000000-0000-0000-0000-000000000000',
            full_name: 'Test User',
            is_arbitrator: false
          });
        
        if (error && error.message.includes('row-level security')) {
          diagnostics.push({
            test: 'RLS Security',
            status: 'pass',
            message: 'Row Level Security active',
            details: 'Database properly protected against unauthorized writes',
            icon: <Shield className="w-5 h-5 text-green-500" />
          });
        } else if (error) {
          diagnostics.push({
            test: 'RLS Security',
            status: 'warning',
            message: 'RLS configuration unclear',
            details: error.message,
            icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
          });
        } else {
          diagnostics.push({
            test: 'RLS Security',
            status: 'warning',
            message: 'RLS may be disabled',
            details: 'Unauthorized insert succeeded',
            icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'RLS Security',
          status: 'fail',
          message: 'RLS test failed',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

      // Test 6: Environment Configuration
      try {
        const keyParts = SUPABASE_ANON_KEY.split('.');
        if (keyParts.length === 3) {
          const payload = JSON.parse(atob(keyParts[1]));
          const expiresAt = new Date(payload.exp * 1000);
          const now = new Date();
          
          if (expiresAt > now) {
            diagnostics.push({
              test: 'Environment Config',
              status: 'pass',
              message: 'ANON_KEY valid',
              details: `Expires: ${expiresAt.toLocaleDateString()}`,
              icon: <Key className="w-5 h-5 text-green-500" />
            });
          } else {
            diagnostics.push({
              test: 'Environment Config',
              status: 'fail',
              message: 'ANON_KEY expired',
              details: `Expired: ${expiresAt.toLocaleDateString()}`,
              icon: <XCircle className="w-5 h-5 text-red-500" />
            });
          }
        } else {
          diagnostics.push({
            test: 'Environment Config',
            status: 'fail',
            message: 'Invalid ANON_KEY format',
            details: 'Key is not a valid JWT',
            icon: <XCircle className="w-5 h-5 text-red-500" />
          });
        }
      } catch (err) {
        diagnostics.push({
          test: 'Environment Config',
          status: 'fail',
          message: 'Environment config error',
          details: (err as Error).message,
          icon: <XCircle className="w-5 h-5 text-red-500" />
        });
      }

    } catch (error) {
      diagnostics.push({
        test: 'System Error',
        status: 'fail',
        message: 'Diagnostic system failed',
        details: (error as Error).message,
        icon: <XCircle className="w-5 h-5 text-red-500" />
      });
    }

    setResults(diagnostics);
    setLastRun(new Date());
    setLoading(false);
  };

  const fixEnvironmentIssues = () => {
    toast.info("Environment Fix Instructions", {
      description: "Please check the console for detailed steps to fix environment issues",
      duration: 5000
    });

    console.log(`
🔧 AUTHENTICATION FIX INSTRUCTIONS:

1. Create or update your .env file in the project root:
   
   VITE_SUPABASE_URL=https://divymuaksqdgjsrlptct.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU

2. Restart your development server:
   npm run dev

3. Clear browser cache and localStorage:
   - Open DevTools (F12)
   - Go to Application tab
   - Clear Storage -> Clear site data

4. Try authentication again

⚠️ Note: Make sure the ANON_KEY is on a single line in your .env file!
    `);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pass': return 'text-green-600 bg-green-50 border-green-200';
      case 'fail': return 'text-red-600 bg-red-50 border-red-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'info': return 'text-blue-600 bg-blue-50 border-blue-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  useEffect(() => {
    runDiagnostics();
  }, []);

  const passedTests = results.filter(r => r.status === 'pass').length;
  const failedTests = results.filter(r => r.status === 'fail').length;
  const warningTests = results.filter(r => r.status === 'warning').length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="w-6 h-6" />
            Authentication System Diagnostics
          </CardTitle>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              {lastRun && `Last run: ${lastRun.toLocaleTimeString()}`}
            </div>
            <Button 
              onClick={runDiagnostics} 
              disabled={loading}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              Refresh Tests
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600">{passedTests}</div>
              <div className="text-sm text-green-600">Passed</div>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600">{failedTests}</div>
              <div className="text-sm text-red-600">Failed</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="text-2xl font-bold text-yellow-600">{warningTests}</div>
              <div className="text-sm text-yellow-600">Warnings</div>
            </div>
          </div>

          <div className="space-y-3">
            {results.map((result, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {result.icon}
                    <div>
                      <div className="font-medium">{result.test}</div>
                      <div className="text-sm opacity-80">{result.message}</div>
                    </div>
                  </div>
                  <div className="text-xs uppercase font-medium tracking-wide">
                    {result.status}
                  </div>
                </div>
                {result.details && (
                  <div className="mt-2 text-xs opacity-70 font-mono bg-white/50 p-2 rounded">
                    {result.details}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h3 className="font-medium text-blue-900 flex items-center gap-2 mb-3">
              <User className="w-5 h-5" />
              Next Steps & Recommendations
            </h3>
            
            {failedTests === 0 && warningTests === 0 ? (
              <div className="space-y-2 text-sm text-blue-800">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  All systems operational! Authentication is working correctly.
                </div>
                <div className="mt-3 space-y-1">
                  <div>• Visit <a href="/auth" className="font-medium underline">the authentication page</a> to create a test account</div>
                  <div>• Try signing up with a valid email address</div>
                  <div>• Test the complete user registration flow</div>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-sm text-blue-800">
                {failedTests > 0 && (
                  <div>
                    <strong>Critical Issues:</strong> {failedTests} tests failed. Check error details above and verify configuration.
                  </div>
                )}
                {warningTests > 0 && (
                  <div>
                    <strong>Minor Issues:</strong> {warningTests} warnings detected. System should still work but may need attention.
                  </div>
                )}
                <div className="mt-3 space-y-1">
                  <div>• Check Supabase dashboard for RLS policies</div>
                  <div>• Verify environment variables are correctly set</div>
                  <div>• Test authentication flow in browser</div>
                  <div>• Create a test user account to verify full functionality</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Authentication Debugger
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Diagnose and fix authentication issues with the Hawkly platform
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Button 
              variant="outline"
              onClick={fixEnvironmentIssues}
              className="flex items-center gap-2"
            >
              <Settings className="h-4 w-4" />
              Fix Environment
            </Button>

            <Button 
              variant="outline"
              onClick={() => setShowEnvVars(!showEnvVars)}
              className="flex items-center gap-2"
            >
              {showEnvVars ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              {showEnvVars ? 'Hide' : 'Show'} Env Vars
            </Button>
          </div>

          {showEnvVars && (
            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                <div className="font-mono text-xs mt-2">
                  <div>VITE_SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL || 'NOT SET'}</div>
                  <div>VITE_SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? 'SET (length: ' + import.meta.env.VITE_SUPABASE_ANON_KEY.length + ')' : 'NOT SET'}</div>
                </div>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => window.location.reload()}
            className="w-full"
          >
            Reload Page
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              localStorage.clear();
              sessionStorage.clear();
              toast.success("Browser storage cleared");
            }}
            className="w-full"
          >
            Clear Browser Storage
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              supabase.auth.signOut();
              toast.success("Signed out");
            }}
            className="w-full"
          >
            Force Sign Out
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 