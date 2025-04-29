import { useState } from "react";
import { Shield, Search, Filter, ArrowUpDown, Clock, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AuditCard } from "@/components/audits/audit-card";
import { AuditFilters } from "@/components/audits/audit-filters";
import { AuditsHeader } from "@/components/audits/audits-header";
import { AuditsFooter } from "@/components/audits/audits-footer";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

export default function Audits() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow">
        {/* Header Section */}
        <AuditsHeader />
        
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats Overview - We'll keep this compact since we have stats in the header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Audits</div>
                    <div className="text-2xl font-bold">2,387</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Clock className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Avg Completion</div>
                    <div className="text-2xl font-bold">4.2 days</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="hover-lift">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-web3-orange/10 rounded-full">
                    <BadgeCheck className="h-6 w-6 text-web3-orange" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Verified Fixes</div>
                    <div className="text-2xl font-bold">7,129</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Controls Row */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  type="text" 
                  placeholder="Search audits by project, auditor or type..." 
                  className="pl-10 w-full"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Filters"}
              </Button>
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-r-none border-r"
                  onClick={() => setViewMode("grid")}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M4 2H2V13H4V2ZM7 2H5V13H7V2ZM8 2H10V13H8V2ZM13 2H11V13H13V2Z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">Grid view</span>
                </Button>
                <Button
                  variant={viewMode === "list" ? "secondary" : "ghost"}
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => setViewMode("list")}
                >
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path d="M2 4H13V5.5H2V4ZM2 6.5H13V8H2V6.5ZM2 9H13V10.5H2V9Z" fill="currentColor" />
                  </svg>
                  <span className="sr-only">List view</span>
                </Button>
              </div>
              <Button variant="outline" size="sm">
                <ArrowUpDown className="h-4 w-4 mr-2" />
                Sort
              </Button>
            </div>
          </div>

          {/* Tabs + Content */}
          <Tabs defaultValue="all" className="w-full mt-6">
            <TabsList className="w-full md:w-auto inline-flex mb-6">
              <TabsTrigger value="all">All Audits</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="requests">Requests</TabsTrigger>
            </TabsList>

            <div className="flex gap-6">
              {/* Filters Panel - Conditionally Shown */}
              {showFilters && (
                <div className="w-64 shrink-0">
                  <AuditFilters />
                </div>
              )}

              {/* Audit Results */}
              <TabsContent value="all" className="w-full m-0 p-0">
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                    : "grid-cols-1"
                }`}>
                  <AuditCard 
                    id="1"
                    title="DeFi Lending Protocol Audit"
                    status="completed"
                    severity="high"
                    date="2025-03-15"
                    auditor={{
                      name: "CryptoShield Security",
                      verified: true,
                      imageUrl: "https://placekitten.com/40/40"
                    }}
                    project={{
                      name: "LendFlow Finance",
                      type: "DeFi Protocol"
                    }}
                    findings={{
                      critical: 2,
                      high: 3,
                      medium: 7,
                      low: 12
                    }}
                    viewMode={viewMode}
                  />
                  <AuditCard 
                    id="2"
                    title="NFT Marketplace Smart Contract Audit"
                    status="in-progress"
                    severity="medium"
                    date="2025-04-20"
                    auditor={{
                      name: "SecureLabs",
                      verified: true,
                      imageUrl: "https://placekitten.com/39/39"
                    }}
                    project={{
                      name: "PixelVerse Market",
                      type: "NFT Protocol"
                    }}
                    findings={{
                      critical: 0,
                      high: 2,
                      medium: 4,
                      low: 8
                    }}
                    viewMode={viewMode}
                  />
                  <AuditCard 
                    id="3"
                    title="Cross-Chain Bridge Security Review"
                    status="completed"
                    severity="critical"
                    date="2025-03-28"
                    auditor={{
                      name: "ChainGuardian",
                      verified: false,
                      imageUrl: "https://placekitten.com/38/38"
                    }}
                    project={{
                      name: "OmniBridge",
                      type: "Cross-Chain"
                    }}
                    findings={{
                      critical: 3,
                      high: 5,
                      medium: 9,
                      low: 11
                    }}
                    viewMode={viewMode}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="w-full m-0 p-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select "All Audits" to see completed audits</p>
                </div>
              </TabsContent>
              
              <TabsContent value="in-progress" className="w-full m-0 p-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select "All Audits" to see in-progress audits</p>
                </div>
              </TabsContent>
              
              <TabsContent value="requests" className="w-full m-0 p-0">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Select "All Audits" to see audit requests</p>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        
          {/* Footer CTA */}
          <AuditsFooter />
        </div>
      </div>
      <Footer />
    </div>
  );
}
