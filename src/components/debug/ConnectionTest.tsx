
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

interface TestResult {
  name: string;
  status: 'success' | 'error' | 'warning' | 'pending';
  message: string;
  details?: string;
}

export function ConnectionTest() {
  const { user, loading: authLoading } = useAuth();
  const [results, setResults] = useState<TestResult[]>([]);
  const [testing, setTesting] = useState(false);

  const runTests = async () => {
    setTesting(true);
    const testResults: TestResult[] = [];

    // Test 1: Supabase Connection
    try {
      const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true });
      testResults.push({
        name: 'Supabase Connection',
        status: error ? 'error' : 'success',
        message: error ? 'Connection failed' : 'Connected successfully',
        details: error?.message
      });
    } catch (err) {
      testResults.push({
        name: 'Supabase Connection',
        status: 'error',
        message: 'Connection failed',
        details: err instanceof Error ? err.message : 'Unknown error'
      });
    }

    // Test 2: Authentication Status
    testResults.push({
      name: 'Authentication',
      status: user ? 'success' : 'warning',
      message: user ? `Authenticated as ${user.email}` : 'Not authenticated',
      details: user ? `User ID: ${user.id}` : 'Please sign in to test authenticated features'
    });

    // Test 3: Profile Access
    if (user) {
      try {
        const { data: extendedProfile, error: extError } = await supabase
          .from('extended_profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (extError && extError.code !== 'PGRST116') {
          testResults.push({
            name: 'Extended Profile Access',
            status: 'error',
            message: 'Failed to access extended profile',
            details: extError.message
          });
        } else {
          testResults.push({
            name: 'Extended Profile Access',
            status: extendedProfile ? 'success' : 'warning',
            message: extendedProfile ? 'Profile found' : 'No profile found',
            details: extendedProfile ? 'Extended profile accessible' : 'Profile may need to be created'
          });
        }

        // Test basic profile fallback
        const { data: basicProfile, error: basicError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        testResults.push({
          name: 'Basic Profile Access',
          status: basicError ? 'error' : (basicProfile ? 'success' : 'warning'),
          message: basicError ? 'Failed to access profile' : (basicProfile ? 'Profile found' : 'No profile found'),
          details: basicError?.message || (basicProfile ? 'Basic profile accessible' : 'Profile needs to be created')
        });
      } catch (err) {
        testResults.push({
          name: 'Profile Access',
          status: 'error',
          message: 'Profile test failed',
          details: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    // Test 4: Database Tables
    const tables = ['services', 'audit_requests', 'escrow_contracts'];
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('count', { count: 'exact', head: true });
        testResults.push({
          name: `Table: ${table}`,
          status: error ? 'error' : 'success',
          message: error ? 'Table access failed' : 'Table accessible',
          details: error?.message
        });
      } catch (err) {
        testResults.push({
          name: `Table: ${table}`,
          status: 'error',
          message: 'Table test failed',
          details: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    setResults(testResults);
    setTesting(false);
  };

  useEffect(() => {
    if (!authLoading) {
      runTests();
    }
  }, [authLoading]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>System Connection Test</CardTitle>
        <Button onClick={runTests} disabled={testing} size="sm">
          {testing ? (
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          {testing ? 'Testing...' : 'Run Tests'}
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {results.map((result, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 border rounded-lg">
            {getStatusIcon(result.status)}
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{result.name}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  result.status === 'success' ? 'bg-green-100 text-green-800' :
                  result.status === 'error' ? 'bg-red-100 text-red-800' :
                  result.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {result.status.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{result.message}</p>
              {result.details && (
                <p className="text-xs text-muted-foreground mt-1">{result.details}</p>
              )}
            </div>
          </div>
        ))}
        
        {results.length === 0 && !testing && (
          <div className="text-center py-8 text-muted-foreground">
            Click "Run Tests" to check system connectivity
          </div>
        )}
      </CardContent>
    </Card>
  );
}
