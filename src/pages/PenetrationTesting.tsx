
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Bug, Shield, AlertTriangle, Search, Lock } from 'lucide-react';

export default function PenetrationTesting() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 via-background to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-red-100 dark:bg-red-900/20 px-4 py-2 rounded-full text-red-600 dark:text-red-400 mb-6">
            <Target className="h-5 w-5 mr-2" />
            <span className="font-medium">Advanced Penetration Testing</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            Penetration Testing Services
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Comprehensive security testing to identify and exploit vulnerabilities 
            before malicious actors do. Protect your Web3 applications with professional pentesting.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-red-600 hover:bg-red-700">
              <Link to="/request-audit">Request Pentest</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/marketplace">Find Pentesters</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testing Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Penetration Testing Services</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive security testing across all layers of your Web3 application
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow border-red-200 dark:border-red-800">
              <CardHeader>
                <Bug className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Smart Contract Pentesting</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Comprehensive testing of smart contracts to identify exploitable 
                  vulnerabilities and business logic flaws.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Reentrancy exploitation</li>
                  <li>• Access control bypass</li>
                  <li>• Economic attack vectors</li>
                  <li>• Flash loan attacks</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-orange-200 dark:border-orange-800">
              <CardHeader>
                <Search className="h-12 w-12 text-orange-600 mb-4" />
                <CardTitle>DApp Security Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Full-stack security assessment of decentralized applications 
                  including frontend and backend components.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Frontend security flaws</li>
                  <li>• API vulnerabilities</li>
                  <li>• Authentication bypass</li>
                  <li>• Data exposure risks</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="hover:shadow-lg transition-shadow border-yellow-200 dark:border-yellow-800">
              <CardHeader>
                <Lock className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Infrastructure Testing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Assessment of supporting infrastructure including servers, 
                  databases, and cloud configurations.
                </p>
                <ul className="text-sm space-y-2">
                  <li>• Server misconfigurations</li>
                  <li>• Network vulnerabilities</li>
                  <li>• Cloud security issues</li>
                  <li>• DevOps pipeline security</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Testing Methodology</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our systematic approach follows industry standards and best practices
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">1</div>
                  <h3 className="text-xl font-semibold">Reconnaissance</h3>
                </div>
                <p className="text-muted-foreground">
                  Comprehensive information gathering and attack surface mapping 
                  to understand the target environment.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">2</div>
                  <h3 className="text-xl font-semibold">Vulnerability Assessment</h3>
                </div>
                <p className="text-muted-foreground">
                  Systematic identification of potential security weaknesses 
                  using automated tools and manual techniques.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-yellow-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">3</div>
                  <h3 className="text-xl font-semibold">Exploitation</h3>
                </div>
                <p className="text-muted-foreground">
                  Controlled exploitation of identified vulnerabilities to 
                  demonstrate real-world impact and risk.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">4</div>
                  <h3 className="text-xl font-semibold">Post-Exploitation</h3>
                </div>
                <p className="text-muted-foreground">
                  Assessment of potential damage and lateral movement 
                  possibilities following successful exploitation.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">5</div>
                  <h3 className="text-xl font-semibold">Reporting</h3>
                </div>
                <p className="text-muted-foreground">
                  Comprehensive documentation of findings with executive 
                  summaries and technical details for remediation.
                </p>
              </div>
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4">6</div>
                  <h3 className="text-xl font-semibold">Remediation Support</h3>
                </div>
                <p className="text-muted-foreground">
                  Ongoing support to help fix identified issues and 
                  verify the effectiveness of implemented solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg p-8 text-center">
            <AlertTriangle className="h-16 w-16 text-amber-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4 text-amber-800 dark:text-amber-400">
              Ethical Testing Only
            </h3>
            <p className="text-amber-700 dark:text-amber-300 max-w-2xl mx-auto">
              All penetration testing is conducted with explicit permission and follows 
              strict ethical guidelines. We operate under comprehensive legal agreements 
              to ensure responsible disclosure and protection of your assets.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Secure Your Application Today</h2>
          <p className="text-xl mb-8 opacity-90">
            Identify vulnerabilities before attackers do
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link to="/request-audit">Schedule Penetration Test</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
