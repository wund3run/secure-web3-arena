
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Shield, TrendingUp, AlertTriangle, Search, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function SecurityInsights() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Helmet>
        <title>Security Insights | Hawkly Web3 Security Marketplace</title>
        <meta 
          name="description" 
          content="Latest trends, vulnerabilities, and security insights for Web3 projects. Stay informed about emerging threats and best practices." 
        />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow container py-12" id="main-content">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Web3 Security Insights</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Stay informed about the latest security trends, vulnerabilities, and best practices in the Web3 ecosystem.
          </p>
        </div>
        
        {/* Latest Trends Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <TrendingUp className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Latest Security Trends</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Rise in RPC Endpoint Attacks",
                description: "Attackers are increasingly targeting RPC endpoints to compromise Web3 applications.",
                readMoreLink: "/blog"
              },
              {
                title: "MEV Protection Improvements",
                description: "New techniques for protecting against Maximal Extractable Value (MEV) attacks in DeFi.",
                readMoreLink: "/blog"
              },
              {
                title: "Layer 2 Security Considerations",
                description: "Unique security challenges facing Layer 2 scaling solutions and rollups.",
                readMoreLink: "/blog"
              }
            ].map((trend, index) => (
              <div key={index} className="bg-card rounded-lg border border-border/40 p-6 hover:shadow-md transition-all">
                <h3 className="text-lg font-semibold mb-2">{trend.title}</h3>
                <p className="text-muted-foreground mb-4">{trend.description}</p>
                <Link to={trend.readMoreLink} className="text-primary flex items-center hover:underline">
                  Read more <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
        
        {/* Recent Vulnerabilities Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <AlertTriangle className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Recent Vulnerabilities</h2>
          </div>
          
          <div className="bg-card rounded-lg border border-border/40 p-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-2">Vulnerability</th>
                    <th className="text-left pb-2">Impact</th>
                    <th className="text-left pb-2">Affected Systems</th>
                    <th className="text-left pb-2">Discovered</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "Reentrancy in ERC-4626 Implementations",
                      impact: "High",
                      affected: "Multiple DeFi protocols",
                      date: "May 12, 2025"
                    },
                    {
                      name: "Oracle Price Manipulation",
                      impact: "Critical",
                      affected: "DEXes, Lending platforms",
                      date: "May 8, 2025"
                    },
                    {
                      name: "Cross-Chain Bridge Exploit",
                      impact: "Critical",
                      affected: "Multiple bridge protocols",
                      date: "May 5, 2025"
                    },
                    {
                      name: "Signature Replay Attack",
                      impact: "Medium",
                      affected: "NFT marketplaces",
                      date: "Apr 28, 2025"
                    },
                    {
                      name: "Unsafe Delegate Call",
                      impact: "High",
                      affected: "Smart contract proxies",
                      date: "Apr 22, 2025"
                    }
                  ].map((vuln, index) => (
                    <tr key={index} className="border-b last:border-b-0">
                      <td className="py-3">
                        <Link to="/vulnerabilities" className="text-primary hover:underline">
                          {vuln.name}
                        </Link>
                      </td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          vuln.impact === "Critical" ? "bg-red-100 text-red-800" : 
                          vuln.impact === "High" ? "bg-orange-100 text-orange-800" : 
                          "bg-yellow-100 text-yellow-800"
                        }`}>
                          {vuln.impact}
                        </span>
                      </td>
                      <td className="py-3 text-muted-foreground">{vuln.affected}</td>
                      <td className="py-3 text-muted-foreground">{vuln.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Link to="/vulnerabilities">
                <Button variant="outline" size="sm">
                  View All Vulnerabilities
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Security Tools Section */}
        <section className="mb-16">
          <div className="flex items-center mb-6">
            <Shield className="mr-2 h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Security Tools & Resources</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border border-border/40 p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold mb-2">Smart Contract Security Scanner</h3>
              <p className="text-muted-foreground mb-4">
                Scan your smart contracts for common vulnerabilities and security issues.
              </p>
              <Link to="/ai-tools">
                <Button className="w-full">
                  Try AI Security Scanner
                </Button>
              </Link>
            </div>
            
            <div className="bg-card rounded-lg border border-border/40 p-6 hover:shadow-md transition-all">
              <h3 className="text-lg font-semibold mb-2">Security Best Practices</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive guide to Web3 security best practices and standards.
              </p>
              <Link to="/audit-guidelines">
                <Button variant="outline" className="w-full">
                  View Security Guidelines
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Newsletter Sign-up */}
        <section>
          <div className="bg-primary/10 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-2">Stay Informed</h2>
            <p className="text-muted-foreground mb-6">
              Subscribe to our security alerts newsletter to receive updates about the latest vulnerabilities and security trends.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Button>
                Subscribe to Security Alerts
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
