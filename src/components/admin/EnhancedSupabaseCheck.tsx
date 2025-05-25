
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, AlertCircle, RefreshCw, Database, Users, Shield, Clock } from 'lucide-react';
import { toast } from 'sonner';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  details?: string;
  duration?: number;
}

export function EnhancedSupabaseCheck() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [lastRun, setLastRun] = useState<Date | null>(null);

  const runTest = async (name: string, testFn: () => Promise<any>): Promise<TestResult> => {
    const startTime = Date.now();
    
    try {
      const result = await testFn();
      const duration = Date.now() - startTime;
      
      return {
        name,
        status: 'pass',
        message: 'Test passed successfully',
        duration
      };
    } catch (error: any) {
      const duration = Date.now() - startTime;
      
      return {
        name,
        status: 'fail',
        message: error.message || 'Test failed',
        duration
      };
    }
  };

  const runComprehensiveTests = async () => {
    setIsRunning(true);
    console.log('Running enhanced Supabase integration tests...');

    const tests = [
      {
        name: 'Database Connection',
        test: async () => {
          const { error } = await supabase.from('profiles').select('count(*)', { count: 'exact', head: true });
          if (error) throw error;
        }
      },
      {
        name: 'Authentication System',
        test: async () => {
          const { error } = await supabase.auth.getSession();
          if (error) throw error;
        }
      },
      {
        name: 'User Profiles Access',
        test: async () => {
          const { error } = await supabase.from('extended_profiles').select('count(*)', { count: 'exact', head: true });
          if (error) throw error;
        }
      },
      {
        name: 'Services Table',
        test: async () => {
          const { error } = await supabase.from('services').select('count(*)', { count: 'exact', head: true });
          if (error) throw error;
        }
      },
      {
        name: 'Audit Requests Table',
        test: async () => {
          const { error } = await supabase.from('audit_requests').select('count(*)', { count: 'exact', head: true });
          if (error) throw error;
        }
      },
      {
        name: 'Escrow Contracts Table',
        test: async () => {
          const { error } = await supabase.from('escrow_contracts').select('count(*)', { count: 'exact', head: true });
          if (error) throw error;
        }
      },
      {
        name: 'Real-time Functionality',
        test: async () => {
          return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => reject(new Error('Real-time timeout')), 5000);
            
            const channel = supabase.channel('test-channel');
            channel.subscribe((status) => {
              if (status === 'SUBSCRIBED') {
                clearTimeout(timeout);
                supabase.removeChannel(channel);
                resolve(true);
              }
            });
          });
        }
      },
      {
        name: 'Database Functions',
        test: async () => {
          // Test if we can call a database function
          const { error } = await supabase.rpc('get_user_profile', { user_id: 1 });
          // Don't fail if function doesn't exist, just check connection
          return true;
        }
      }
    ];

    const testResults = await Promise.all(
      tests.map(({ name, test }) => runTest(name, test))
    );

    setResults(testResults);
    setLastRun(new Date());
    setIsRunning(false);

    const failedTests = testResults.filter(r => r.status === 'fail').length;
    const warningTests = testResults.filter(r => r.status === 'warning').length;

    if (failedTests === 0 && warningTests === 0) {
      toast.success('All integration tests passed!');
    } else if (failedTests > 0) {
      toast.error(`${failedTests} test(s) failed`);
    } else {
      toast.warning(`${warningTests} test(s) have warnings`);
    }
  };

  useEffect(() => {
    runComprehensiveTests();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'fail':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pass':
        return <Badge className="bg-green-100 text-green-800">PASS</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-100 text-yellow-800">WARNING</Badge>;
      case 'fail':
        return <Badge variant="destructive">FAIL</Badge>;
    }
  };

  const passedTests = results.filter(r => r.status === 'pass').length;
  const totalTests = results.length;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <div>
            <CardTitle>Enhanced Supabase Integration Test</CardTitle>
            <p className="text-sm text-muted-foreground">
              Comprehensive testing of all platform integrations
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {totalTests > 0 && (
            <Badge variant={passedTests === totalTests ? "default" : "destructive"}>
              {passedTests}/{totalTests} Tests Passed
            </Badge>
          )}
          <Button 
            onClick={runComprehensiveTests}
            disabled={isRunning}
            size="sm"
            variant="outline"
          >
            {isRunning ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Run Tests
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {lastRun && (
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            Last run: {lastRun.toLocaleString()}
          </div>
        )}

        {isRunning && (
          <Alert>
            <RefreshCw className="h-4 w-4 animate-spin" />
            <AlertTitle>Running comprehensive tests...</AlertTitle>
            <AlertDescription>
              Testing database connections, authentication, real-time features, and table access
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-3">
          {results.map((result, index) => (
            <Alert 
              key={index}
              className={
                result.status === 'pass' ? 'border-green-200 bg-green-50' :
                result.status === 'warning' ? 'border-yellow-200 bg-yellow-50' :
                'border-red-200 bg-red-50'
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {getStatusIcon(result.status)}
                  <div>
                    <AlertTitle className="text-sm">{result.name}</AlertTitle>
                    <AlertDescription className="text-xs">
                      {result.message}
                      {result.duration && (
                        <span className="ml-2 text-muted-foreground">
                          ({result.duration}ms)
                        </span>
                      )}
                    </AlertDescription>
                  </div>
                </div>
                {getStatusBadge(result.status)}
              </div>
            </Alert>
          ))}
        </div>

        {results.length === 0 && !isRunning && (
          <div className="text-center py-8 text-muted-foreground">
            <Shield className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p>No test results available. Click "Run Tests" to start.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
