
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Shield, Search, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Vulnerabilities() {
  const vulnerabilities = [
    {
      id: "CVE-2025-0023",
      title: "Cross-Chain Bridge Reentrancy Vulnerability",
      severity: "Critical",
      category: "Bridge Security",
      description: "Reentrancy vulnerability in cross-chain bridge contracts allowing unauthorized fund extraction.",
      affectedProtocols: ["Ethereum", "Polygon", "BSC"],
      discoveredDate: "March 10, 2025",
      status: "Patched"
    },
    {
      id: "CVE-2025-0019",
      title: "DeFi Flash Loan Oracle Manipulation",
      severity: "High", 
      category: "DeFi",
      description: "Price oracle manipulation through flash loan attacks affecting multiple AMM protocols.",
      affectedProtocols: ["Uniswap V3", "SushiSwap"],
      discoveredDate: "March 5, 2025",
      status: "Mitigated"
    },
    {
      id: "CVE-2025-0015",
      title: "Layer 2 State Verification Bypass",
      severity: "High",
      category: "Layer 2",
      description: "State verification bypass in optimistic rollup allowing invalid state transitions.",
      affectedProtocols: ["Optimism", "Arbitrum"],
      discoveredDate: "February 28, 2025", 
      status: "Patched"
    },
    {
      id: "CVE-2025-0012",
      title: "NFT Smart Contract Integer Overflow",
      severity: "Medium",
      category: "NFT",
      description: "Integer overflow in NFT minting functions leading to unauthorized token generation.",
      affectedProtocols: ["ERC-721"],
      discoveredDate: "February 25, 2025",
      status: "Disclosed"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical": return "error";
      case "High": return "error";
      case "Medium": return "secondary";
      case "Low": return "outline";
      default: return "outline";
    }
  };

  return (
    <StandardLayout 
      title="Vulnerability Database" 
      description="Comprehensive database of Web3 security vulnerabilities - Updated March 2025"
    >
      <div className="container py-12">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Updated March 2025</Badge>
          <h1 className="text-4xl font-bold mb-4">Web3 Vulnerability Database</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive database of known vulnerabilities in Web3 protocols, smart contracts, and DeFi applications. 
            Stay informed about the latest security threats and their mitigations.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-destructive mb-2">47</div>
              <p className="text-sm text-muted-foreground">Critical Vulnerabilities</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-orange-500 mb-2">128</div>
              <p className="text-sm text-muted-foreground">High Severity Issues</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">$2.4B</div>
              <p className="text-sm text-muted-foreground">Total Value at Risk</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">89%</div>
              <p className="text-sm text-muted-foreground">Patched Vulnerabilities</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Vulnerabilities */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            Recent Discoveries
          </h2>
          <div className="space-y-4">
            {vulnerabilities.map((vuln, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-lg">{vuln.title}</CardTitle>
                        <Badge variant={getSeverityColor(vuln.severity)}>{vuln.severity}</Badge>
                        <Badge variant="outline">{vuln.category}</Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span className="font-mono">{vuln.id}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {vuln.discoveredDate}
                        </span>
                        <span>•</span>
                        <span className={`font-medium ${vuln.status === 'Patched' ? 'text-green-600' : 'text-orange-600'}`}>
                          {vuln.status}
                        </span>
                      </div>
                      <CardDescription className="text-base">{vuln.description}</CardDescription>
                    </div>
                    <AlertTriangle className="h-6 w-6 text-destructive flex-shrink-0" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Affected Protocols:</p>
                      <div className="flex flex-wrap gap-2">
                        {vuln.affectedProtocols.map((protocol, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {protocol}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 text-center">
          <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-4">Protect Your Project</h3>
          <p className="text-muted-foreground mb-6">
            Don't let your project become the next vulnerability. Get a professional security audit today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link to="/request-audit">Request Security Audit</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/marketplace">Browse Security Experts</Link>
            </Button>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
