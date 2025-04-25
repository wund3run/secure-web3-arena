
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { TableOfContents } from "lucide-react";

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

export function AuditStatsTable() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TableOfContents className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Platform Security Stats</h2>
          </div>
          <p className="text-muted-foreground">
            Comprehensive security analysis across different Web3 platforms
          </p>
        </div>

        <div className="glass-card p-6 rounded-xl">
          <Tabs defaultValue="defi" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="defi">DeFi</TabsTrigger>
              <TabsTrigger value="nft">NFT</TabsTrigger>
              <TabsTrigger value="gaming">Gaming</TabsTrigger>
            </TabsList>

            {Object.entries(platformData).map(([category, data]) => (
              <TabsContent key={category} value={category}>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Platform</TableHead>
                      <TableHead className="text-right">Audits</TableHead>
                      <TableHead className="text-right">Vulnerabilities</TableHead>
                      <TableHead className="text-right">Security Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row) => (
                      <TableRow key={row.platform}>
                        <TableCell className="font-medium">{row.platform}</TableCell>
                        <TableCell className="text-right">{row.audits}</TableCell>
                        <TableCell className="text-right">{row.vulnerabilities}</TableCell>
                        <TableCell className="text-right">{row.securityScore}%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
