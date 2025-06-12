
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function KnowledgeBasePage() {
  return (
    <StandardLayout
      title="Knowledge Base | Hawkly"
      description="Comprehensive Web3 security knowledge base"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Comprehensive Web3 security knowledge base coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
