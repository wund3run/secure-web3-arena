
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { AuditCollaborationPanel } from '@/components/collaboration/AuditCollaborationPanel';

// Import custom hooks and components
import { useAuditDetails } from '@/hooks/useAuditDetails';
import { AuditHeader } from '@/components/audits/detail/AuditHeader';
import { AuditTabs } from '@/components/audits/detail/AuditTabs';
import { AuditLoadingState } from '@/components/audits/detail/LoadingState';
import { AuditNotFound } from '@/components/audits/detail/AuditNotFound';
import { OverviewTab } from '@/components/audits/detail/tabs/OverviewTab';
import { VulnerabilitiesTab } from '@/components/audits/detail/tabs/VulnerabilitiesTab';
import { PlaceholderTab } from '@/components/audits/detail/tabs/PlaceholderTab';

const AuditDetails = () => {
  const { auditId } = useParams();
  const { isLoading, auditData, activeTab, setActiveTab, handleSendMessage } = useAuditDetails(auditId);
  
  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <AuditLoadingState />
        </main>
        <Footer />
      </>
    );
  }
  
  if (!auditData) {
    return (
      <>
        <Navbar />
        <main className="container py-8">
          <AuditNotFound />
        </main>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{auditData.name} | Hawkly Audit</title>
        <meta name="description" content={`Security audit details for ${auditData.name}`} />
      </Helmet>
      <Navbar />
      <main className="container py-4 md:py-8">
        {/* Header Section */}
        <AuditHeader 
          auditName={auditData.name}
          status={auditData.status}
          clientName={auditData.client.name}
          startDate={auditData.startDate}
          dueDate={auditData.dueDate}
          isMobile={window.innerWidth < 768}
        />
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <AuditTabs activeTab={activeTab} onTabChange={setActiveTab} />
          
          {/* Tab Contents */}
          <TabsContent value="overview" className="mt-6">
            <OverviewTab auditData={auditData} />
          </TabsContent>
          
          <TabsContent value="collaborate" className="mt-6">
            <AuditCollaborationPanel
              auditId={auditData.id}
              auditName={auditData.name}
              messages={auditData.messages}
              onSendMessage={handleSendMessage}
              participants={auditData.participants}
            />
          </TabsContent>
          
          <TabsContent value="vulnerabilities" className="mt-6">
            <VulnerabilitiesTab vulnerabilities={auditData.vulnerabilities} />
          </TabsContent>
          
          {/* Placeholder tabs */}
          <TabsContent value="reports" className="mt-6">
            <PlaceholderTab title="Reports" />
          </TabsContent>
          
          <TabsContent value="timeline" className="mt-6">
            <PlaceholderTab title="Timeline" />
          </TabsContent>
          
          <TabsContent value="team" className="mt-6">
            <PlaceholderTab title="Team" />
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </>
  );
};

export default AuditDetails;
