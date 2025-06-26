
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AuditWorkspace } from '@/components/workspace/AuditWorkspace';

export default function WorkspacePage() {
  const { id } = useParams();

  // Mock data - in real app this would come from API
  const mockParticipants = [
    {
      id: 'user-1',
      name: 'Sarah Chen',
      role: 'auditor' as const,
      avatar: ''
    },
    {
      id: 'user-2',
      name: 'Alex Rodriguez',
      role: 'client' as const,
      avatar: ''
    }
  ];

  return (
    <>
      <Helmet>
        <title>Audit Workspace | Hawkly</title>
        <meta name="description" content="Collaborative audit workspace with real-time communication and tools" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <AuditWorkspace
          auditId={id || 'default'}
          projectName="DeFi Protocol Security Audit"
          participants={mockParticipants}
        />
        <Footer />
      </div>
    </>
  );
}
