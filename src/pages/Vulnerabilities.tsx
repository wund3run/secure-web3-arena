
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertTriangle, Filter, ArrowRight, ChevronDown, Info, Shield } from "lucide-react";

export default function Vulnerabilities() {
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [severity, setSeverity] = useState("all");

  // Sample vulnerability data
  const vulnerabilities = [
    {
      id: "SWC-107",
      title: "Reentrancy",
      description: "Vulnerability enabling an attacker to drain funds by recursively calling the contract's withdraw function.",
      severity: "Critical",
      category: "Smart Contract",
      cwe: "CWE-841",
      related: ["SWC-102", "SWC-103"],
      prevention: [
        "Use Checks-Effects-Interactions pattern",
        "Implement reentrancy guards",
        "Use OpenZeppelin's ReentrancyGuard"
      ],
      examples: [
        "The DAO Hack (2016)",
        "Cream Finance Exploit (2021)"
      ]
    },
    {
      id: "SWC-115",
      title: "Authorization Through tx.origin",
      description: "Using tx.origin for authorization allows phishing attacks as it refers to the original sender of a transaction.",
      severity: "High",
      category: "Smart Contract",
      cwe: "CWE-285",
      related: ["SWC-112"],
      prevention: [
        "Always use msg.sender for authorization",
        "Never trust tx.origin for authentication"
      ],
      examples: [
        "Multiple DAO governance attacks"
      ]
    },
    {
      id: "DEFI-01",
      title: "Price Oracle Manipulation",
      description: "Attack where on-chain price oracles are manipulated through flash loans to exploit DeFi protocols.",
      severity: "Critical",
      category: "DeFi",
      cwe: "CWE-352",
      related: ["DEFI-02"],
      prevention: [
        "Use Time-Weighted Average Price (TWAP)",
        "Implement circuit breakers",
        "Use multiple oracle sources"
      ],
      examples: [
        "Harvest Finance (2020)",
        "Cheese Bank (2020)"
      ]
    },
    {
      id: "NFT-03",
      title: "Unchecked Token Transfers",
      description: "Not verifying successful token transfers can lead to loss of funds or exploitable states.",
      severity: "Medium",
      category: "NFT",
      cwe: "CWE-252",
      related: ["SWC-113"],
      prevention: [
        "Check return values of transfers",
        "Use SafeERC20 for ERC20 transfers",
        "Implement proper error handling"
      ],
      examples: [
        "Multiple marketplace exploits"
      ]
    },
    {
      id: "L2-01",
      title: "Cross-Layer Message Verification",
      description: "Improper verification of cross-layer messages can allow fraudulent withdrawals or state changes.",
      severity: "High",
      category: "Layer 2",
      cwe: "CWE-345",
      related: ["BRIDGE-01"],
      prevention: [
        "Implement proper signature verification",
        "Use Merkle proofs for state verification",
        "Wait for sufficient confirmations"
      ],
      examples: [
        "Multiple bridge exploits (2022-2023)"
      ]
    },
    {
      id: "SWC-101",
      title: "Integer Overflow and Underflow",
      description: "Arithmetic operations reaching the maximum or minimum size of the type, causing wrap-around.",
      severity: "High",
      category: "Smart Contract",
      cwe: "CWE-190",
      related: ["SWC-102"],
      prevention: [
        "Use SafeMath library for Solidity <0.8.0",
        "Use Solidity 0.8.0+ with built-in overflow checks",
        "Validate inputs and implement bounds checking"
      ],
      examples: [
        "Beauty Chain (2018)",
        "PoWHC (2018)"
      ]
    }
  ];

  // Filter vulnerabilities based on search, category and severity
  const filteredVulnerabilities = vulnerabilities.filter(vuln => {
    const matchesSearch = searchQuery === "" || 
      vuln.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      vuln.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vuln.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = category === "all" || vuln.category === category;
    const matchesSeverity = severity === "all" || vuln.severity === severity;
    
    return matchesSearch && matchesCategory && matchesSeverity;
  });

  const severityColor = {
    "Critical": "bg-red-100 text-red-800 border-red-200",
    "High": "bg-orange-100 text-orange-800 border-orange-200",
    "Medium": "bg-amber-100 text-amber-800 border-amber-200",
    "Low": "bg-green-100 text-green-800 border-green-200"
  };

  return (
    <>
      <Helmet>
        <title>Vulnerability Database | Hawkly Web3 Security Marketplace</title>
        <meta
          name="description"
          content="Comprehensive database of Web3 security vulnerabilities, exploits, and mitigation strategies."
        />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-12">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 flex items-center">
              <Shield className="h-8 w-8 text-primary mr-3" />
              Vulnerability Database
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              A comprehensive repository of known Web3 security vulnerabilities with practical prevention strategies and real-world examples.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-card border border-border/40 rounded-lg p-4 mb-8">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              <div className="relative md:col-span-6">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search vulnerabilities by ID, name, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Smart Contract">Smart Contract</SelectItem>
                    <SelectItem value="DeFi">DeFi</SelectItem>
                    <SelectItem value="NFT">NFT</SelectItem>
                    <SelectItem value="Layer 2">Layer 2</SelectItem>
                    <SelectItem value="Infrastructure">Infrastructure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-3">
                <Select
                  value={severity}
                  onValueChange={setSeverity}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vulnerability List & Details */}
          <div>
            <Tabs defaultValue="list">
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                </TabsList>
                <div className="flex items-center">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <Filter className="h-4 w-4 mr-1.5" />
                    Advanced Filters
                  </Button>
                </div>
              </div>

              <TabsContent value="list">
                <div className="space-y-4">
                  {filteredVulnerabilities.map((vuln) => (
                    <Card key={vuln.id} className="hover:shadow-md transition-all">
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center">
                            <Badge variant="outline" className="mr-3 bg-primary/10">{vuln.id}</Badge>
                            <CardTitle>{vuln.title}</CardTitle>
                          </div>
                          <Badge className={`${severityColor[vuln.severity]} border`}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">{vuln.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <h4 className="font-medium mb-2">Prevention Strategies</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {vuln.prevention.map((item, index) => (
                                <li key={index} className="text-muted-foreground">{item}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="font-medium mb-2">Notable Examples</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {vuln.examples.map((example, index) => (
                                <li key={index} className="text-muted-foreground">{example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <Badge variant="outline">{vuln.category}</Badge>
                          <Badge variant="outline">CWE: {vuln.cwe}</Badge>
                          {vuln.related.map(rel => (
                            <Badge key={rel} variant="outline" className="bg-primary/5">{rel}</Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredVulnerabilities.length === 0 && (
                    <div className="text-center py-12">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No vulnerabilities found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search criteria or filters
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="grid">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredVulnerabilities.map((vuln) => (
                    <Card key={vuln.id} className="hover:shadow-md transition-all">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <Badge variant="outline" className="bg-primary/10">{vuln.id}</Badge>
                          <Badge className={`${severityColor[vuln.severity]} border`}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        <CardTitle className="mt-2 text-lg">{vuln.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{vuln.description}</p>
                        <Badge>{vuln.category}</Badge>
                        <Button variant="ghost" size="sm" className="w-full mt-4 text-primary">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}

                  {filteredVulnerabilities.length === 0 && (
                    <div className="col-span-full text-center py-12">
                      <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No vulnerabilities found</h3>
                      <p className="text-muted-foreground">
                        Try adjusting your search criteria or filters
                      </p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-card border border-border/40 rounded-lg p-6">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mr-4">
                <Info className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2">About the Vulnerability Database</h2>
                <p className="text-muted-foreground mb-4">
                  This database is continuously updated with new vulnerabilities, prevention strategies, and real-world examples from the Web3 security community. Our goal is to provide a comprehensive resource for developers, auditors, and security professionals.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button variant="outline" size="sm">
                    Submit a Vulnerability
                  </Button>
                  <Button variant="outline" size="sm">
                    Contribute to Database
                  </Button>
                  <Button variant="outline" size="sm">
                    Export Database
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
