import React from 'react';
import DatabaseConnectionTester from '@/components/testing/DatabaseConnectionTester';

export function TestPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Hawkly Backend Testing Dashboard
          </h1>
          <p className="text-gray-600">
            Test Supabase database connectivity and functionality
          </p>
        </div>
        
        <DatabaseConnectionTester />
      </div>
    </div>
  );
}

export default TestPage;
