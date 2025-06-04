
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { TensorFlowMatchingDashboard } from '@/components/ai-matching/TensorFlowMatchingDashboard';

export default function AIMatchingV2() {
  return (
    <StandardLayout 
      title="TensorFlow.js AI Matching - Hawkly"
      description="Advanced machine learning matching with TensorFlow.js and Hugging Face integration"
    >
      <Helmet>
        <title>AI Matching Engine V2 - Hawkly</title>
        <meta name="description" content="Next-generation AI matching with TensorFlow.js neural networks and Hugging Face semantic analysis" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <TensorFlowMatchingDashboard />
      </div>
    </StandardLayout>
  );
}
