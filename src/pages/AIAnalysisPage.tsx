
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { AICodeAnalysisWidget } from '@/components/integrations/AICodeAnalysisWidget';

const AIAnalysisPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Code Analysis | Hawkly</title>
        <meta name="description" content="AI-powered smart contract security analysis" />
      </Helmet>
      
      <StandardLayout
        title="AI Code Analysis"
        description="Advanced AI-powered security analysis for smart contracts"
      >
        <div className="container py-8">
          <AICodeAnalysisWidget />
        </div>
      </StandardLayout>
    </>
  );
};

export default AIAnalysisPage;
