
import { Trophy, Star, Shield, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

// Sample leaderboard data
const TOP_AUDITORS = [
  {
    rank: 1,
    name: "Alex CryptoShield",
    points: 7850,
    audits: 124,
    successRate: 98,
    badges: ["Smart Contract Pro", "Bug Hunter", "First Response"],
    recentFinds: "Critical vulnerability in DeFi protocol",
    level: "Expert"
  },
  {
    rank: 2,
    name: "BlockSafe Security",
    points: 7540,
    audits: 118,
    successRate: 96,
    badges: ["Protocol Expert", "Fast Responder"],
    recentFinds: "Multiple high-severity issues in NFT marketplace",
    level: "Expert"
  },
  {
    rank: 3,
    name: "SecureLabs",
    points: 6980,
    audits: 95,
    successRate: 94,
    badges: ["DApp Specialist", "Community Helper"],
    recentFinds: "Security optimization for major DEX",
    level: "Expert"
  }
];

const TIME_PERIODS = ["All Time", "This Month", "This Week", "Today"];

export default function Leaderboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Header Section */}
          <div className="text-center">
            <h1 className="text-4xl font-bold">Security Leaderboard</h1>
            <p className="mt-2 text-muted-foreground">
              Top performing security auditors and their achievements
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Total Audits</div>
                    <div className="text-2xl font-bold">1,234</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-secondary/10 rounded-full">
                    <Shield className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Success Rate</div>
                    <div className="text-2xl font-bold">96%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-web3-orange/10 rounded-full">
                    <Award className="h-6 w-6 text-web3-orange" />
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Active Auditors</div>
                    <div className="text-2xl font-bold">328</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Top Security Auditors</CardTitle>
                <div className="flex gap-2">
                  {TIME_PERIODS.map((period) => (
                    <button
                      key={period}
                      className="px-3 py-1 text-sm rounded-full hover:bg-accent transition-colors"
                    >
                      {period}
                    </button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Rank</TableHead>
                    <TableHead>Auditor</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>Audits</TableHead>
                    <TableHead>Success Rate</TableHead>
                    <TableHead>Badges</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {TOP_AUDITORS.map((auditor) => (
                    <TableRow key={auditor.rank}>
                      <TableCell className="font-medium">{auditor.rank}</TableCell>
                      <TableCell>
                        <HoverCard>
                          <HoverCardTrigger className="cursor-pointer font-medium text-primary">
                            {auditor.name}
                          </HoverCardTrigger>
                          <HoverCardContent>
                            <div className="space-y-2">
                              <h4 className="font-semibold">{auditor.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                Recent Achievement: {auditor.recentFinds}
                              </p>
                            </div>
                          </HoverCardContent>
                        </HoverCard>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{auditor.level}</Badge>
                      </TableCell>
                      <TableCell>{auditor.points.toLocaleString()}</TableCell>
                      <TableCell>{auditor.audits}</TableCell>
                      <TableCell>{auditor.successRate}%</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {auditor.badges.map((badge) => (
                            <Badge key={badge} variant="outline" className="text-xs">
                              {badge}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
