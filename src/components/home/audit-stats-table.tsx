
import { InfoIcon, Table2 } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { useState } from "react";

interface StatsData {
  platform: string;
  audits: number;
  vulnerabilities: number;
  securityScore: number;
}

const platformData: Record<string, StatsData[]> = {
  defi: [
    { platform: "UniSwap", audits: 12, vulnerabilities: 45, securityScore: 95 },
    { platform: "Aave", audits: 10, vulnerabilities: 32, securityScore: 94 },
    { platform: "Compound", audits: 8, vulnerabilities: 28, securityScore: 92 },
  ],
  nft: [
    { platform: "OpenSea", audits: 6, vulnerabilities: 25, securityScore: 91 },
    { platform: "Rarible", audits: 5, vulnerabilities: 18, securityScore: 89 },
    { platform: "Foundation", audits: 4, vulnerabilities: 15, securityScore: 90 },
  ],
  gaming: [
    { platform: "Axie", audits: 7, vulnerabilities: 30, securityScore: 88 },
    { platform: "Decentraland", audits: 5, vulnerabilities: 22, securityScore: 87 },
    { platform: "The Sandbox", audits: 4, vulnerabilities: 20, securityScore: 86 },
  ]
};

// Create explanation text for metrics
const metricExplanations = {
  platform: "The Web3 platform that underwent security auditing",
  audits: "Total number of comprehensive security audits conducted",
  vulnerabilities: "Total security issues identified across all audits",
  securityScore: "Overall security rating (0-100) based on audit results"
};

export function AuditStatsTable() {
  const [activeTab, setActiveTab] = useState("defi");

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Table2 className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Platform Security Stats</h2>
          </div>
          <p className="text-muted-foreground">
            Comprehensive security analysis across different Web3 platforms
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <Tabs defaultValue="defi" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="defi">DeFi</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
              <TabsTrigger value="gaming">Gaming</TabsTrigger>
            </TabsList>

            {Object.entries(platformData).map(([category, data]) => (
              <TabsContent key={category} value={category}>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex items-center space-x-1">
                            <span>Platform</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p className="text-xs">{metricExplanations.platform}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <span>Audits</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p className="text-xs">{metricExplanations.audits}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <span>Vulnerabilities</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p className="text-xs">{metricExplanations.vulnerabilities}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                        <TableHead className="text-right">
                          <div className="flex items-center justify-end space-x-1">
                            <span>Security Score</span>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <InfoIcon className="h-3.5 w-3.5 text-muted-foreground cursor-help ml-1" />
                                </TooltipTrigger>
                                <TooltipContent side="top" className="max-w-xs">
                                  <p className="text-xs">{metricExplanations.securityScore}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.map((row) => (
                        <TableRow key={row.platform}>
                          <TableCell className="font-medium">{row.platform}</TableCell>
                          <TableCell className="text-right">{row.audits}</TableCell>
                          <TableCell className="text-right">{row.vulnerabilities}</TableCell>
                          <TableCell className="text-right">
                            <span 
                              className={`${
                                row.securityScore > 90 ? 'text-green-500' :
                                row.securityScore > 80 ? 'text-amber-500' : 'text-orange-500'
                              }`}
                            >
                              {row.securityScore}%
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
