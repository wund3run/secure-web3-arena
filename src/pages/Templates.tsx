
import React, { useState } from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Search,
  Code,
  Shield,
  CheckCircle,
  Star,
  Eye,
  Copy,
  ExternalLink
} from 'lucide-react';

const Templates = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const templates = [
    {
      id: 1,
      title: 'Smart Contract Security Checklist',
      description: 'Comprehensive checklist for auditing smart contracts with 50+ security checks',
      type: 'checklist',
      category: 'smart-contracts',
      downloads: 2400,
      rating: 4.9,
      language: 'General',
      lastUpdated: '2024-01-15',
      author: 'Security Team',
      tags: ['Audit', 'Smart Contract', 'Checklist'],
      preview: true
    },
    {
      id: 2,
      title: 'Solidity Security Patterns',
      description: 'Collection of secure coding patterns and anti-patterns for Solidity development',
      type: 'code',
      category: 'smart-contracts',
      downloads: 1800,
      rating: 4.8,
      language: 'Solidity',
      lastUpdated: '2024-01-10',
      author: 'Marcus Chen',
      tags: ['Solidity', 'Patterns', 'Best Practices'],
      preview: true
    },
    {
      id: 3,
      title: 'DeFi Protocol Security Assessment',
      description: 'Template for comprehensive DeFi protocol security evaluation and risk assessment',
      type: 'document',
      category: 'defi',
      downloads: 1500,
      rating: 4.7,
      language: 'General',
      lastUpdated: '2024-01-08',
      author: 'Sarah Rodriguez',
      tags: ['DeFi', 'Assessment', 'Risk Analysis'],
      preview: true
    },
    {
      id: 4,
      title: 'Penetration Testing Report Template',
      description: 'Professional penetration testing report template with executive summary',
      type: 'document',
      category: 'pentesting',
      downloads: 2100,
      rating: 4.9,
      language: 'General',
      lastUpdated: '2024-01-12',
      author: 'Alex Thompson',
      tags: ['Penetration Testing', 'Report', 'Documentation'],
      preview: true
    },
    {
      id: 5,
      title: 'Gas Optimization Techniques',
      description: 'Code snippets and examples for optimizing gas usage in smart contracts',
      type: 'code',
      category: 'optimization',
      downloads: 1200,
      rating: 4.6,
      language: 'Solidity',
      lastUpdated: '2024-01-05',
      author: 'Dev Team',
      tags: ['Gas Optimization', 'Performance', 'Cost Reduction'],
      preview: true
    },
    {
      id: 6,
      title: 'NFT Security Best Practices Guide',
      description: 'Comprehensive guide and checklist for NFT project security',
      type: 'guide',
      category: 'nft',
      downloads: 950,
      rating: 4.8,
      language: 'General',
      lastUpdated: '2024-01-03',
      author: 'Security Team',
      tags: ['NFT', 'Security', 'Best Practices'],
      preview: true
    },
    {
      id: 7,
      title: 'Multi-Signature Wallet Implementation',
      description: 'Secure multi-signature wallet smart contract template with tests',
      type: 'code',
      category: 'wallets',
      downloads: 800,
      rating: 4.7,
      language: 'Solidity',
      lastUpdated: '2023-12-28',
      author: 'Marcus Chen',
      tags: ['Multi-Sig', 'Wallet', 'Security'],
      preview: false
    },
    {
      id: 8,
      title: 'Incident Response Playbook',
      description: 'Step-by-step playbook for responding to security incidents in Web3 projects',
      type: 'playbook',
      category: 'incident-response',
      downloads: 1100,
      rating: 4.8,
      language: 'General',
      lastUpdated: '2024-01-01',
      author: 'Sarah Rodriguez',
      tags: ['Incident Response', 'Emergency', 'Procedures'],
      preview: true
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'smart-contracts', name: 'Smart Contracts' },
    { id: 'defi', name: 'DeFi Security' },
    { id: 'pentesting', name: 'Penetration Testing' },
    { id: 'nft', name: 'NFT Security' },
    { id: 'optimization', name: 'Optimization' },
    { id: 'wallets', name: 'Wallets' },
    { id: 'incident-response', name: 'Incident Response' }
  ];

  const templateTypes = [
    { id: 'checklist', name: 'Checklists', icon: <CheckCircle className="h-4 w-4" /> },
    { id: 'code', name: 'Code Templates', icon: <Code className="h-4 w-4" /> },
    { id: 'document', name: 'Documents', icon: <FileText className="h-4 w-4" /> },
    { id: 'guide', name: 'Guides', icon: <Shield className="h-4 w-4" /> },
    { id: 'playbook', name: 'Playbooks', icon: <FileText className="h-4 w-4" /> }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    const typeData = templateTypes.find(t => t.id === type);
    return typeData ? typeData.icon : <FileText className="h-4 w-4" />;
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'checklist': return 'bg-green-100 text-green-800';
      case 'code': return 'bg-blue-100 text-blue-800';
      case 'document': return 'bg-purple-100 text-purple-800';
      case 'guide': return 'bg-orange-100 text-orange-800';
      case 'playbook': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <StandardLayout
      title="Security Templates | Hawkly"
      description="Ready-to-use security templates, checklists, and code snippets"
    >
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <Badge variant="outline" className="px-4 py-2 mb-4">
            <FileText className="h-4 w-4 mr-2" />
            Ready-to-Use Templates
          </Badge>
          <h1 className="text-4xl font-bold text-hawkly-gradient mb-4">
            Security Templates
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Accelerate your security workflow with our collection of professional templates, 
            checklists, code snippets, and documentation. All templates are created by industry experts.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search templates, technologies, or topics..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 max-w-4xl mx-auto">
            <TabsTrigger value="all">All Types</TabsTrigger>
            {templateTypes.map(type => (
              <TabsTrigger key={type.id} value={type.id}>
                {type.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {['all', ...templateTypes.map(t => t.id)].map(tabValue => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates
                  .filter(template => tabValue === 'all' || template.type === tabValue)
                  .map((template) => (
                    <Card key={template.id} className="hover:shadow-lg transition-all">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(template.type)}
                            <CardTitle className="text-lg line-clamp-2">{template.title}</CardTitle>
                          </div>
                          <Badge className={`text-xs ${getTypeColor(template.type)}`}>
                            {templateTypes.find(t => t.id === template.type)?.name || template.type}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {template.description}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <Download className="h-3 w-3" />
                              {template.downloads}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="h-3 w-3 text-yellow-500 fill-current" />
                              {template.rating}
                            </span>
                          </div>
                          <span className="text-xs">{template.language}</span>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="text-xs text-muted-foreground">
                          By {template.author} • Updated {template.lastUpdated}
                        </div>
                        
                        <div className="flex gap-2">
                          {template.preview && (
                            <Button variant="outline" size="sm" className="flex-1">
                              <Eye className="h-3 w-3 mr-1" />
                              Preview
                            </Button>
                          )}
                          <Button size="sm" className="flex-1">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Featured Collections */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Audit Essentials
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Complete collection of checklists, templates, and guides for security auditing.
                </p>
                <div className="text-sm text-muted-foreground">
                  12 templates • 5,200+ downloads
                </div>
                <Button className="w-full">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View Collection
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  Smart Contract Starter Kit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Ready-to-use secure smart contract templates and deployment scripts.
                </p>
                <div className="text-sm text-muted-foreground">
                  8 templates • 3,800+ downloads
                </div>
                <Button className="w-full">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View Collection
                </Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-all">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  Incident Response Kit
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">
                  Emergency response playbooks and communication templates for security incidents.
                </p>
                <div className="text-sm text-muted-foreground">
                  6 templates • 2,100+ downloads
                </div>
                <Button className="w-full">
                  <ExternalLink className="h-3 w-3 mr-2" />
                  View Collection
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
};

export default Templates;
