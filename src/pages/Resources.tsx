
import React from "react";
import { Helmet } from "react-helmet-async";
import { SimplifiedNavbar } from "@/components/layout/simplified-navbar";
import { BookOpen, FileText, Video, Download } from "lucide-react";

export default function Resources() {
  return (
    <>
      <Helmet>
        <title>Security Resources | Hawkly</title>
        <meta name="description" content="Comprehensive Web3 security resources, guides, and documentation." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <SimplifiedNavbar />
        
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Security Resources</h1>
              <p className="text-xl text-muted-foreground">
                Everything you need to know about Web3 security best practices
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="border rounded-lg p-6 text-center">
                <BookOpen className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Security Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Comprehensive guides for securing Web3 applications
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <FileText className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Documentation</h3>
                <p className="text-sm text-muted-foreground">
                  Technical documentation and API references
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <Video className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Video Tutorials</h3>
                <p className="text-sm text-muted-foreground">
                  Step-by-step video guides and workshops
                </p>
              </div>
              
              <div className="border rounded-lg p-6 text-center">
                <Download className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="text-lg font-semibold mb-2">Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Ready-to-use security templates and checklists
                </p>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <h2>Getting Started with Web3 Security</h2>
              <p>
                Web3 security is fundamentally different from traditional web security. 
                Smart contracts are immutable once deployed, making security audits crucial 
                before mainnet deployment.
              </p>
              
              <h3>Essential Security Practices</h3>
              <ul>
                <li>Implement proper access controls</li>
                <li>Use established security patterns</li>
                <li>Conduct thorough testing</li>
                <li>Perform security audits</li>
                <li>Monitor deployed contracts</li>
              </ul>
              
              <h3>Common Vulnerabilities</h3>
              <p>
                Understanding common attack vectors is essential for building secure applications:
              </p>
              <ul>
                <li>Reentrancy attacks</li>
                <li>Integer overflow/underflow</li>
                <li>Access control vulnerabilities</li>
                <li>Oracle manipulation</li>
                <li>Flash loan attacks</li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
