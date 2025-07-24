import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { IntelligentAuditWorkspace } from '@/components/workspace/IntelligentAuditWorkspace';

export default function IntelligentAuditWorkspacePage() {
  return (
    <StandardLayout
      title="Intelligent Audit Workspace"
      description="AI-powered, collaborative, and automated audit environment for Web3 security teams."
    >
      <IntelligentAuditWorkspace />
    </StandardLayout>
  );
} 