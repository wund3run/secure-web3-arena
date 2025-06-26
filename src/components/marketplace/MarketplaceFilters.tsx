
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, X, RefreshCw } from 'lucide-react';

export function MarketplaceFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [budgetRange, setBudgetRange] = useState([1000, 50000]);
  const [selectedBlockchains, setSelectedBlockchains] = useState<string[]>([]);
  const [selectedAuditTypes, setSelectedAuditTypes] = useState<string[]>([]);
  const [timelineFilter, setTimelineFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const blockchains = [
    'Ethereum', 'Polygon', 'Solana', 'Binance Smart Chain', 
    'Avalanche', 'Arbitrum', 'Optimism', 'Cosmos'
  ];

  const auditTypes = [
    'Smart Contract Audit', 'DeFi Protocol Review', 'NFT Security',
    'Cross-chain Bridge', 'Tokenomics Review', 'Gas Optimization'
  ];

  const handleBlockchainToggle = (blockchain: string) => {
    setSelectedBlockchains(prev => 
      prev.includes(blockchain) 
        ? prev.filter(b => b !== blockchain)
        : [...prev, blockchain]
    );
  };

  const handleAuditTypeToggle = (auditType: string) => {
    setSelectedAuditTypes(prev => 
      prev.includes(auditType) 
        ? prev.filter(t => t !== auditType)
        : [...prev, auditType]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setBudgetRange([1000, 50000]);
    setSelectedBlockchains([]);
    setSelectedAuditTypes([]);
    setTimelineFilter('');
    setStatusFilter('');
  };

  const activeFiltersCount = [
    searchQuery.length > 0,
    selectedBlockchains.length > 0,
    selectedAuditTypes.length > 0,
    timelineFilter.length > 0,
    statusFilter.length > 0
  ].filter(Boolean).length;

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-2">
                {activeFiltersCount}
              </Badge>
            )}
          </CardTitle>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search */}
        <div className="space-y-2">
          <Label>Search Projects</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Budget Range */}
        <div className="space-y-2">
          <Label>Budget Range</Label>
          <div className="px-2">
            <Slider
              value={budgetRange}
              onValueChange={setBudgetRange}
              max={100000}
              min={500}
              step={500}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>${budgetRange[0].toLocaleString()}</span>
              <span>${budgetRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-2">
          <Label>Timeline</Label>
          <Select value={timelineFilter} onValueChange={setTimelineFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Any timeline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any timeline</SelectItem>
              <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
              <SelectItem value="standard">Standard (2-6 weeks)</SelectItem>
              <SelectItem value="flexible">Flexible (6+ weeks)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Project Status */}
        <div className="space-y-2">
          <Label>Status</Label>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Any status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Any status</SelectItem>
              <SelectItem value="open">Open for Applications</SelectItem>
              <SelectItem value="in_review">In Review</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Blockchains */}
        <div className="space-y-2">
          <Label>Blockchain Protocols</Label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {blockchains.map((blockchain) => (
              <div key={blockchain} className="flex items-center space-x-2">
                <Checkbox
                  id={blockchain}
                  checked={selectedBlockchains.includes(blockchain)}
                  onCheckedChange={() => handleBlockchainToggle(blockchain)}
                />
                <Label htmlFor={blockchain} className="text-sm font-normal">
                  {blockchain}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Types */}
        <div className="space-y-2">
          <Label>Audit Types</Label>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {auditTypes.map((auditType) => (
              <div key={auditType} className="flex items-center space-x-2">
                <Checkbox
                  id={auditType}
                  checked={selectedAuditTypes.includes(auditType)}
                  onCheckedChange={() => handleAuditTypeToggle(auditType)}
                />
                <Label htmlFor={auditType} className="text-sm font-normal">
                  {auditType}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters Button */}
        <Button className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
