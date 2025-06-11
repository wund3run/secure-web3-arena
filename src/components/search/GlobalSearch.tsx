
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Users, Shield, Code } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'service' | 'auditor' | 'guide' | 'tool';
  url: string;
  category?: string;
}

export const GlobalSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery.length > 2) {
      performSearch(debouncedQuery);
    } else {
      setResults([]);
      setShowResults(false);
    }
  }, [debouncedQuery]);

  const performSearch = async (searchQuery: string) => {
    setIsLoading(true);
    
    // Mock search results - in a real implementation, this would call an API
    const mockResults: SearchResult[] = [
      {
        id: '1',
        title: 'Smart Contract Security Audits',
        description: 'Comprehensive security audits for smart contracts',
        type: 'service',
        url: '/security-audits',
        category: 'Security'
      },
      {
        id: '2',
        title: 'AI Code Analysis',
        description: 'AI-powered code analysis and vulnerability detection',
        type: 'tool',
        url: '/ai-tools',
        category: 'AI Tools'
      },
      {
        id: '3',
        title: 'Security Fundamentals Guide',
        description: 'Essential security principles for Web3 developers',
        type: 'guide',
        url: '/security-guides/fundamentals',
        category: 'Education'
      },
      {
        id: '4',
        title: 'Expert Security Auditors',
        description: 'Find certified Web3 security professionals',
        type: 'auditor',
        url: '/marketplace',
        category: 'Marketplace'
      }
    ];

    // Filter results based on search query
    const filteredResults = mockResults.filter(result =>
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setResults(filteredResults);
    setShowResults(true);
    setIsLoading(false);
  };

  const getResultIcon = (type: string) => {
    switch (type) {
      case 'service':
        return <Shield className="h-4 w-4" />;
      case 'tool':
        return <Code className="h-4 w-4" />;
      case 'guide':
        return <FileText className="h-4 w-4" />;
      case 'auditor':
        return <Users className="h-4 w-4" />;
      default:
        return <Search className="h-4 w-4" />;
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search services, guides, tools..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length > 2 && setShowResults(true)}
          className="pl-10"
        />
      </div>

      {showResults && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-96 overflow-y-auto">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mx-auto"></div>
              </div>
            ) : results.length > 0 ? (
              <div className="space-y-1">
                {results.map((result) => (
                  <Link
                    key={result.id}
                    to={result.url}
                    className="block p-3 hover:bg-muted/50 transition-colors"
                    onClick={() => setShowResults(false)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-primary mt-1">
                        {getResultIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{result.title}</h4>
                          <Badge variant="outline" className="text-xs">{result.category}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-sm text-muted-foreground">
                No results found for "{query}"
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
