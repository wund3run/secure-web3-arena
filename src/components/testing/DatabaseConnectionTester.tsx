import React, { useState } from 'react';
import { SupabaseConnectionTest, checkEnvironmentVariables } from '@/tests/SupabaseConnectionTest';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TestResult {
  success: boolean;
  error?: string;
  data?: any;
  count?: number;
  message?: string;
}

interface TestResults {
  connection?: TestResult;
  auth?: TestResult;
  profiles?: TestResult;
  auditorProfiles?: TestResult;
  projects?: TestResult;
  auditRequests?: TestResult;
  personalization?: TestResult;
  onboarding?: TestResult;
}

export function DatabaseConnectionTester() {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<TestResults>({});
  const [envCheck, setEnvCheck] = useState<any>(null);

  const runTests = async () => {
    setIsRunning(true);
    setResults({});

    try {
      // Check environment variables first
      const envResult = checkEnvironmentVariables();
      setEnvCheck(envResult);

      if (!envResult.success) {
        setIsRunning(false);
        return;
      }

      // Run all database tests
      const testResults = await SupabaseConnectionTest.runAllTests();
      setResults(testResults);
    } catch (error) {
      console.error('Test runner error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getStatusBadge = (result?: TestResult) => {
    if (!result) return <Badge variant="secondary">Not Run</Badge>;
    return result.success ? 
      <Badge variant="default" className="bg-green-500">✅ PASSED</Badge> : 
      <Badge variant="error">❌ FAILED</Badge>;
  };

  const getOverallStatus = () => {
    const testCount = Object.keys(results).length;
    if (testCount === 0) return { passed: 0, total: 0, percentage: 0 };
    
    const passed = Object.values(results).filter(r => r?.success).length;
    return { passed, total: testCount, percentage: Math.round((passed / testCount) * 100) };
  };

  const { passed, total, percentage } = getOverallStatus();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🔍 Supabase Backend Connection Test</span>
            <Button 
              onClick={runTests} 
              disabled={isRunning}
              className="ml-4"
            >
              {isRunning ? '🔄 Running Tests...' : '▶️ Run All Tests'}
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Environment Variables Check */}
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Environment Variables</h3>
              {envCheck ? (
                <div>
                  {getStatusBadge({ success: envCheck.success })}
                  {envCheck.success ? (
                    <div className="mt-2 text-sm text-green-600">
                      All required environment variables are configured
                    </div>
                  ) : (
                    <div className="mt-2 text-sm text-red-600">
                      Missing: {envCheck.missing?.join(', ')}
                    </div>
                  )}
                </div>
              ) : (
                <Badge variant="secondary">Not Checked</Badge>
              )}
            </div>

            {/* Overall Status */}
            {total > 0 && (
              <div className="border rounded-lg p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">Overall Test Results</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-2xl font-bold">{percentage}%</div>
                  <div>
                    <div className="text-sm text-gray-600">
                      {passed} of {total} tests passed
                    </div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className={`h-2 rounded-full ${percentage === 100 ? 'bg-green-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Individual Test Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TestResultCard 
                title="🔗 Connection Test"
                description="Basic Supabase connectivity"
                result={results.connection}
              />
              
              <TestResultCard 
                title="🔐 Authentication Test"
                description="Auth system functionality"
                result={results.auth}
              />
              
              <TestResultCard 
                title="👤 Profiles Table"
                description="User profiles access"
                result={results.profiles}
              />
              
              <TestResultCard 
                title="🛡️ Auditor Profiles Table"
                description="Auditor-specific data"
                result={results.auditorProfiles}
              />
              
              <TestResultCard 
                title="📁 Projects Table"
                description="Project data access"
                result={results.projects}
              />
              
              <TestResultCard 
                title="📋 Audit Requests Table"
                description="Audit request functionality"
                result={results.auditRequests}
              />
              
              <TestResultCard 
                title="🎯 Personalization Tables"
                description="AI personalization features"
                result={results.personalization}
              />
              
              <TestResultCard 
                title="🚀 Onboarding Data"
                description="New user registration flow"
                result={results.onboarding}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

interface TestResultCardProps {
  title: string;
  description: string;
  result?: TestResult;
}

function TestResultCard({ title, description, result }: TestResultCardProps) {
  return (
    <div className="border rounded-lg p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">{title}</h4>
        {result && (
          <Badge variant={result.success ? "default" : "error"} className={result.success ? "bg-green-500" : ""}>
            {result.success ? "✅" : "❌"}
          </Badge>
        )}
      </div>
      <p className="text-sm text-gray-600">{description}</p>
      
      {result && (
        <div className="text-xs">
          {result.success ? (
            <div className="text-green-600">
              {result.count !== undefined && `Found ${result.count} records`}
              {result.message && result.message}
            </div>
          ) : (
            <div className="text-red-600">
              Error: {result.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default DatabaseConnectionTester;
