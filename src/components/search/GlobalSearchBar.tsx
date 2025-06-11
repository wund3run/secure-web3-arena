
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Search, Filter, User, FileText, Star, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchResult {
  id: string;
  type: 'auditor' | 'project' | 'resource' | 'audit';
  title: string;
  description: string;
  metadata?: any;
  relevanceScore?: number;
}

interface GlobalSearchBarProps {
  className?: string;
  placeholder?: string;
  showFilters?: boolean;
}

export function GlobalSearchBar({ 
  className, 
  placeholder = "Search auditors, projects, resources...",
  showFilters = true 
}: GlobalSearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  // Mock search function - replace with actual API call
  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock results with proper typing
    const mockResults: SearchResult[] = [
      {
        id: '1',
        type: 'auditor' as const,
        title: 'Alex Smith',
        description: 'Senior Smart Contract Auditor - Ethereum, Solana specialist',
        metadata: { rating: 4.9, completedAudits: 47 },
        relevanceScore: 0.95
      },
      {
        id: '2',
        type: 'project' as const,
        title: 'DeFi Protocol Audit',
        description: 'Security audit for decentralized lending protocol',
        metadata: { status: 'In Progress', blockchain: 'Ethereum' },
        relevanceScore: 0.87
      },
      {
        id: '3',
        type: 'resource' as const,
        title: 'Smart Contract Security Best Practices',
        description: 'Comprehensive guide for secure smart contract development',
        metadata: { type: 'Guide', category: 'Security' },
        relevanceScore: 0.76
      }
    ].filter(result => 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(mockResults);
    setIsSearching(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      performSearch(query);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'auditor':
        return <User className="h-4 w-4" />;
      case 'project':
      case 'audit':
        return <FileText className="h-4 w-4" />;
      case 'resource':
        return <Star className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  const getTypeBadge = (type: string) => {
    const variants = {
      auditor: 'default',
      project: 'secondary',
      audit: 'secondary',
      resource: 'outline'
    } as const;
    
    return (
      <Badge variant={variants[type as keyof typeof variants] || 'outline'}>
        {type}
      </Badge>
    );
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowResults(true);
          }}
          onFocus={() => setShowResults(true)}
          className="pl-10 pr-12"
        />
        {showFilters && (
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
              >
                <Filter className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Search Filters</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Content Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {['auditor', 'project', 'resource', 'audit'].map(type => (
                      <Badge
                        key={type}
                        variant={selectedFilters.includes(type) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedFilters(prev => 
                            prev.includes(type) 
                              ? prev.filter(f => f !== type)
                              : [...prev, type]
                          );
                        }}
                      >
                        {getTypeIcon(type)}
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && (query || results.length > 0) && (
        <Card className="absolute top-full left-0 right-0 mt-2 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isSearching ? (
              <div className="p-4 text-center text-muted-foreground">
                Searching...
              </div>
            ) : results.length > 0 ? (
              <div className="divide-y">
                {results.map((result) => (
                  <div
                    key={result.id}
                    className="p-4 hover:bg-muted/50 cursor-pointer transition-colors group"
                    onClick={() => {
                      // Handle result selection
                      setShowResults(false);
                      setQuery('');
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="text-muted-foreground mt-1">
                          {getTypeIcon(result.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium truncate">{result.title}</h4>
                            {getTypeBadge(result.type)}
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                          {result.metadata && (
                            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                              {result.type === 'auditor' && (
                                <>
                                  <span>★ {result.metadata.rating}</span>
                                  <span>•</span>
                                  <span>{result.metadata.completedAudits} audits</span>
                                </>
                              )}
                              {result.type === 'project' && (
                                <>
                                  <span>{result.metadata.status}</span>
                                  <span>•</span>
                                  <span>{result.metadata.blockchain}</span>
                                </>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  </div>
                ))}
              </div>
            ) : query && !isSearching ? (
              <div className="p-4 text-center text-muted-foreground">
                No results found for "{query}"
              </div>
            ) : null}
          </CardContent>
        </Card>
      )}

      {/* Click outside to close */}
      {showResults && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowResults(false)}
        />
      )}
    </div>
  );
}
