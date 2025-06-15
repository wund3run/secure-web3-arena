
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Calendar, DollarSign, Clock } from 'lucide-react';

export function ProjectMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'DeFi Yield Farming Protocol',
      description: 'Security audit for a new yield farming protocol with innovative tokenomics',
      category: 'DeFi',
      budget: '$20,000 - $30,000',
      timeline: '4-6 weeks',
      priority: 'High',
      skills: ['Solidity', 'DeFi', 'Yield Farming', 'Security'],
      postedDate: '2 days ago',
      proposals: 8
    },
    {
      id: 2,
      title: 'NFT Marketplace Smart Contracts',
      description: 'Comprehensive audit of NFT marketplace including royalty mechanisms',
      category: 'NFT',
      budget: '$15,000 - $20,000',
      timeline: '3-4 weeks',
      priority: 'Medium',
      skills: ['ERC-721', 'ERC-1155', 'Marketplace', 'Royalties'],
      postedDate: '1 week ago',
      proposals: 12
    },
    {
      id: 3,
      title: 'Cross-Chain Bridge Security Review',
      description: 'Security assessment of multi-chain bridge protocol',
      category: 'Infrastructure',
      budget: '$40,000 - $50,000',
      timeline: '6-8 weeks',
      priority: 'Critical',
      skills: ['Cross-chain', 'Bridge', 'Multi-sig', 'Consensus'],
      postedDate: '3 days ago',
      proposals: 5
    },
    {
      id: 4,
      title: 'GameFi Token Economics Audit',
      description: 'Token economics and gameplay mechanics security review',
      category: 'GameFi',
      budget: '$10,000 - $15,000',
      timeline: '2-3 weeks',
      priority: 'Medium',
      skills: ['GameFi', 'Tokenomics', 'Play-to-Earn', 'Economics'],
      postedDate: '5 days ago',
      proposals: 15
    }
  ];

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'High':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">High</Badge>;
      case 'Medium':
        return <Badge variant="secondary">Medium</Badge>;
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || project.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Project Marketplace</h2>
        <Button>
          <Filter className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="DeFi">DeFi</SelectItem>
            <SelectItem value="NFT">NFT</SelectItem>
            <SelectItem value="Infrastructure">Infrastructure</SelectItem>
            <SelectItem value="GameFi">GameFi</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{project.title}</CardTitle>
                {getPriorityBadge(project.priority)}
              </div>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>{project.budget}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{project.timeline}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Posted {project.postedDate}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span>{project.proposals} proposals</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1">
                  Submit Proposal
                </Button>
                <Button variant="outline">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
          <Button variant="outline" className="mt-4" onClick={() => {
            setSearchTerm('');
            setFilterCategory('all');
          }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}
