
import React from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Terminal, Book, Zap, CheckCircle, ArrowRight, Download, Github } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForDevelopers() {
  return (
    <>
      <Helmet>
        <title>For Developers | Hawkly - Developer Tools & Integration</title>
        <meta name="description" content="Integrate Hawkly's security tools into your development workflow. APIs, SDKs, and developer resources for Web3 security automation." />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Developer Tools
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              Build Security into Your Development Workflow
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Integrate Hawkly's security tools directly into your development process with our comprehensive APIs, SDKs, and automation tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/docs">
                  <Book className="mr-2 h-5 w-5" />
                  View API Docs
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="https://github.com/hawkly" target="_blank">
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Repository
                </Link>
              </Button>
            </div>
          </section>

          {/* Developer Tools */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Powerful Developer Tools</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Terminal className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>CLI Tool</CardTitle>
                  <CardDescription>Command-line interface for seamless integration</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">One-command audit submission</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Real-time status updates</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Automated report download</span>
                    </li>
                  </ul>
                  <div className="bg-muted p-3 rounded-lg">
                    <code className="text-sm">npm install -g @hawkly/cli</code>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Code className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>REST API</CardTitle>
                  <CardDescription>Comprehensive API for custom integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Full platform functionality</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Webhook notifications</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Rate limiting & authentication</span>
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/api">
                      <Book className="mr-2 h-4 w-4" />
                      API Reference
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Zap className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>CI/CD Integrations</CardTitle>
                  <CardDescription>Automated security checks in your pipeline</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">GitHub Actions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">GitLab CI/CD</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">Jenkins plugins</span>
                    </li>
                  </ul>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/integrations">
                      <Download className="mr-2 h-4 w-4" />
                      Get Plugins
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Code Examples */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Quick Start Examples</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Audit via API</CardTitle>
                  <CardDescription>Create and submit an audit request programmatically</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`curl -X POST https://api.hawkly.com/audits \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "project_name": "MyDeFiProtocol",
    "repository_url": "github.com/user/repo",
    "audit_type": "smart_contract",
    "priority": "high"
  }'`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>GitHub Action Workflow</CardTitle>
                  <CardDescription>Automated security checks on every commit</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted p-4 rounded-lg overflow-x-auto">
                    <pre className="text-sm">
{`name: Security Audit
on: [push, pull_request]
jobs:
  audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: hawkly/audit-action@v1
        with:
          api-key: \${{ secrets.HAWKLY_API_KEY }}
          project-path: ./contracts`}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* SDKs */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Official SDKs</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">JavaScript/TypeScript</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">Full-featured SDK for Node.js and browsers</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/sdk/javascript">
                      <Download className="mr-2 h-4 w-4" />
                      Get SDK
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Python</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">Python SDK for backend integrations</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/sdk/python">
                      <Download className="mr-2 h-4 w-4" />
                      Get SDK
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Go</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">High-performance Go SDK</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/sdk/go">
                      <Download className="mr-2 h-4 w-4" />
                      Get SDK
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mb-2">Rust</CardTitle>
                  <p className="text-sm text-muted-foreground mb-4">Fast and safe Rust SDK</p>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/docs/sdk/rust">
                      <Download className="mr-2 h-4 w-4" />
                      Get SDK
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Resources */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12">Developer Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <Book className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Documentation</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link to="/docs/getting-started" className="text-primary hover:underline">Getting Started Guide</Link></li>
                    <li><Link to="/docs/api" className="text-primary hover:underline">API Reference</Link></li>
                    <li><Link to="/docs/webhooks" className="text-primary hover:underline">Webhook Documentation</Link></li>
                    <li><Link to="/docs/examples" className="text-primary hover:underline">Code Examples</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Terminal className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Tools & Utilities</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link to="/tools/postman" className="text-primary hover:underline">Postman Collection</Link></li>
                    <li><Link to="/tools/openapi" className="text-primary hover:underline">OpenAPI Spec</Link></li>
                    <li><Link to="/tools/sandbox" className="text-primary hover:underline">API Sandbox</Link></li>
                    <li><Link to="/tools/status" className="text-primary hover:underline">Status Page</Link></li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <Users className="h-10 w-10 text-primary mb-4" />
                  <CardTitle>Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li><Link to="/community/discord" className="text-primary hover:underline">Developer Discord</Link></li>
                    <li><Link to="/community/forum" className="text-primary hover:underline">Developer Forum</Link></li>
                    <li><Link to="/community/blog" className="text-primary hover:underline">Technical Blog</Link></li>
                    <li><Link to="/community/changelog" className="text-primary hover:underline">API Changelog</Link></li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl p-12">
            <h2 className="text-3xl font-bold mb-4">Start Building with Hawkly</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your API key and start integrating security into your development workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/docs/getting-started">
                  Get API Key
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/docs">
                  View Documentation
                </Link>
              </Button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
