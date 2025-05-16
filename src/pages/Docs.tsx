
import React, { useState } from "react";
import { ContentPage } from "@/components/content/content-page";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Book, Code, ExternalLink, ChevronRight, Search } from "lucide-react";

export default function Docs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("getting-started");

  return (
    <ContentPage
      title="Documentation"
      description="Comprehensive guides, tutorials, and reference materials for the Hawkly Web3 Security Marketplace."
    >
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Comprehensive guides, tutorials, and reference materials for the Hawkly Web3 Security Marketplace.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search docs..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search documentation"
              />
            </div>
          </div>

          <nav className="space-y-1" aria-label="Documentation sections">
            <Button
              variant={activeTab === "getting-started" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("getting-started")}
              aria-pressed={activeTab === "getting-started"}
            >
              <Book className="mr-2 h-4 w-4" aria-hidden="true" />
              Getting Started
            </Button>
            <Button
              variant={activeTab === "audit-guidelines" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("audit-guidelines")}
              aria-pressed={activeTab === "audit-guidelines"}
            >
              <FileText className="mr-2 h-4 w-4" aria-hidden="true" />
              Audit Guidelines
            </Button>
            <Button
              variant={activeTab === "api-reference" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("api-reference")}
              aria-pressed={activeTab === "api-reference"}
            >
              <Code className="mr-2 h-4 w-4" aria-hidden="true" />
              API Reference
            </Button>
            <Button
              variant={activeTab === "integrations" ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("integrations")}
              aria-pressed={activeTab === "integrations"}
            >
              <ExternalLink className="mr-2 h-4 w-4" aria-hidden="true" />
              Integrations
            </Button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-card rounded-lg border border-border/40 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="sr-only">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="audit-guidelines">Audit Guidelines</TabsTrigger>
              <TabsTrigger value="api-reference">API Reference</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="getting-started" className="mt-0">
              <h2 className="text-2xl font-bold mb-4">Getting Started with Hawkly</h2>
              <p className="mb-4">
                Welcome to the Hawkly Web3 Security Marketplace documentation. This guide will help you understand how to use our platform effectively.
              </p>

              <div className="bg-background p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium mb-2">Quick Start</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Create an account using email, wallet or social login</li>
                  <li>Complete your profile with relevant information</li>
                  <li>Browse available security services or list your own</li>
                  <li>Connect with auditors or project owners</li>
                </ol>
              </div>

              <h3 className="text-lg font-medium mb-2">For Project Owners</h3>
              <p className="mb-4">
                Learn how to request security audits, evaluate auditors, and maximize the value of your security assessment.
              </p>
              <Button variant="outline" className="mb-6">
                Read Project Owner Guide <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>

              <h3 className="text-lg font-medium mb-2">For Security Professionals</h3>
              <p className="mb-4">
                Learn how to list your services, build your reputation, and effectively deliver security audits on our platform.
              </p>
              <Button variant="outline">
                Read Auditor Guide <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </TabsContent>

            <TabsContent value="audit-guidelines" className="mt-0">
              <h2 className="text-2xl font-bold mb-4">Audit Guidelines</h2>
              <p className="mb-6">
                Comprehensive guidelines for conducting and receiving high-quality security audits on the Hawkly platform.
              </p>

              <div className="space-y-6">
                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-medium">Audit Preparation Checklist</h3>
                  </div>
                  <div className="p-4">
                    <p className="mb-2">Essential steps to prepare your project for a security audit:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Comprehensive documentation</li>
                      <li>Clean, commented code</li>
                      <li>Test suite implementation</li>
                      <li>Defined scope and objectives</li>
                    </ul>
                  </div>
                </div>

                <div className="border border-border rounded-lg overflow-hidden">
                  <div className="bg-muted p-4">
                    <h3 className="font-medium">Vulnerability Classification</h3>
                  </div>
                  <div className="p-4">
                    <p className="mb-2">How we classify security vulnerabilities:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li><strong>Critical:</strong> Direct fund loss or complete system compromise</li>
                      <li><strong>High:</strong> Significant vulnerability with complex exploitation</li>
                      <li><strong>Medium:</strong> Issues that may pose risks under certain conditions</li>
                      <li><strong>Low:</strong> Minor issues and best practice recommendations</li>
                    </ul>
                  </div>
                </div>
              </div>

              <Button className="mt-6">
                View Complete Guidelines <ChevronRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </TabsContent>

            <TabsContent value="api-reference" className="mt-0">
              <h2 className="text-2xl font-bold mb-4">API Reference</h2>
              <p className="mb-6">
                Technical documentation for integrating with the Hawkly API.
              </p>

              <div className="bg-background p-4 rounded-lg mb-6 overflow-x-auto">
                <pre className="text-sm">
                  <code>
                    GET /api/v1/services<br />
                    Authorization: Bearer {"{token}"}<br />
                    Accept: application/json
                  </code>
                </pre>
              </div>

              <p className="mb-2">Available API endpoints:</p>
              <ul className="list-disc pl-5 mb-6 space-y-2">
                <li><code>/api/v1/services</code> - List available security services</li>
                <li><code>/api/v1/audits</code> - Query audit reports</li>
                <li><code>/api/v1/providers</code> - Security service provider information</li>
                <li><code>/api/v1/stats</code> - Platform statistics and metrics</li>
              </ul>

              <p className="text-sm text-muted-foreground mb-4">
                Note: Our API is currently in beta and subject to change.
              </p>

              <Button variant="outline">
                Request API Access <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </TabsContent>

            <TabsContent value="integrations" className="mt-0">
              <h2 className="text-2xl font-bold mb-4">Integrations</h2>
              <p className="mb-6">
                Connect Hawkly with your existing development and security workflows.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">GitHub Integration</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Automatically trigger security reviews when code is pushed to your repository.
                  </p>
                  <Button variant="outline" size="sm">Connect GitHub</Button>
                </div>
                
                <div className="border border-border rounded-lg p-4">
                  <h3 className="font-medium mb-2">CI/CD Pipeline</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Integrate security checks into your continuous integration workflow.
                  </p>
                  <Button variant="outline" size="sm">View Documentation</Button>
                </div>
              </div>

              <p className="mb-2">Coming soon:</p>
              <ul className="list-disc pl-5 mb-6 space-y-1">
                <li>Slack notifications</li>
                <li>Discord integration</li>
                <li>Jira workflow automation</li>
                <li>VS Code extension</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ContentPage>
  );
}
