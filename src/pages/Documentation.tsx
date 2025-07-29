

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { FileText, Code, Link2, BookOpen, Search } from 'lucide-react';

const apiDocs = [
  {
    title: 'Authentication API',
    description: 'Endpoints for user login, registration, and token management.',
    endpoint: '/api/auth',
    method: 'POST, GET',
  },
  {
    title: 'Audit Request API',
    description: 'Submit and track audit requests for your projects.',
    endpoint: '/api/audit-request',
    method: 'POST, GET',
  },
  {
    title: 'Project Data API',
    description: 'Access project details, status, and findings.',
    endpoint: '/api/projects/:id',
    method: 'GET',
  },
];

const integrationGuides = [
  {
    title: 'Integrate with Hawkly Web3 SDK',
    description: 'Step-by-step guide to connect your dApp to Hawkly audit services.',
    link: '#',
  },
  {
    title: 'Webhook Setup',
    description: 'Receive real-time updates on audit status and findings.',
    link: '#',
  },
  {
    title: 'API Key Management',
    description: 'How to generate and secure your API keys for platform access.',
    link: '#',
  },
];

const platformGuides = [
  {
    title: 'Getting Started',
    description: 'Overview of Hawkly platform features and onboarding steps.',
    link: '#',
  },
  {
    title: 'Audit Workflow',
    description: 'Understand the end-to-end audit process on Hawkly.',
    link: '#',
  },
  {
    title: 'Security Best Practices',
    description: 'Recommended practices for securing your Web3 projects.',
    link: '#',
  },
];

export default function Documentation() {
  const [search, setSearch] = useState('');

  const filterDocs = (docs) =>
    docs.filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <FileText className="h-16 w-16 text-primary mx-auto mb-6" />
            <h1 className="text-4xl font-bold mb-4">Developer Documentation</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Technical documentation, API references, and integration guides for developers.
            </p>
          </div>

          <div className="max-w-xl mx-auto mb-8 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search docs..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>

          <Tabs defaultValue="api" className="w-full">
            <TabsList className="grid grid-cols-3 max-w-2xl mx-auto mb-8">
              <TabsTrigger value="api">
                <Code className="h-4 w-4 mr-2" />API Reference
              </TabsTrigger>
              <TabsTrigger value="integration">
                <Link2 className="h-4 w-4 mr-2" />Integration Guides
              </TabsTrigger>
              <TabsTrigger value="guides">
                <BookOpen className="h-4 w-4 mr-2" />Platform Guides
              </TabsTrigger>
            </TabsList>

            <TabsContent value="api">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filterDocs(apiDocs).map((doc, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{doc.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="font-mono bg-muted px-2 py-1 rounded">{doc.endpoint}</span>
                        <span className="bg-primary/10 px-2 py-1 rounded text-primary">{doc.method}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="integration">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filterDocs(integrationGuides).map((guide, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{guide.description}</p>
                      <a href={guide.link} className="text-primary hover:underline text-sm">Read Guide</a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filterDocs(platformGuides).map((guide, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle className="text-lg">{guide.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-2">{guide.description}</p>
                      <a href={guide.link} className="text-primary hover:underline text-sm">Read Guide</a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
