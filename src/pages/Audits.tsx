
import { useAuditsPage } from "@/hooks/useAuditsPage";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AuditsHeader } from "@/components/audits/audits-header";
import { AuditsFooter } from "@/components/audits/audits-footer";
import { AuditStatsCards } from "@/components/audits/stats/AuditStatsCards";
import { AuditSearchControls } from "@/components/audits/search-filters/AuditSearchControls";
import { AuditTabs } from "@/components/audits/tabs/AuditTabs";

export default function Audits() {
  const { viewMode, setViewMode, showFilters, setShowFilters } = useAuditsPage();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Header Section */}
        <AuditsHeader />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview */}
          <AuditStatsCards />

          {/* Controls Row */}
          <AuditSearchControls 
            viewMode={viewMode}
            setViewMode={setViewMode}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />

          {/* Tabs + Content */}
          <AuditTabs 
            viewMode={viewMode}
            showFilters={showFilters}
          />
        
          {/* Footer CTA */}
          <AuditsFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
