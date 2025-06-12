
import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

interface SearchResult {
  title: string;
  href: string;
  description?: string;
  category: string;
}

const searchData: SearchResult[] = [
  { title: "Security Audits", href: "/security-audits", description: "Comprehensive smart contract audits", category: "Services" },
  { title: "Code Reviews", href: "/code-reviews", description: "Expert code analysis", category: "Services" },
  { title: "Penetration Testing", href: "/penetration-testing", description: "Advanced security testing", category: "Services" },
  { title: "Security Consulting", href: "/consulting", description: "Strategic security guidance", category: "Services" },
  { title: "Request Audit", href: "/request-audit", description: "Submit your project for review", category: "Actions" },
  { title: "Dashboard", href: "/dashboard", description: "Your main dashboard", category: "Navigation" },
  { title: "My Audits", href: "/audits", description: "View your audit reports", category: "Navigation" },
  { title: "Marketplace", href: "/marketplace", description: "Browse security services", category: "Navigation" },
  { title: "Community", href: "/community", description: "Connect with experts", category: "Navigation" },
  { title: "Security Guides", href: "/resources", description: "Best practices and tutorials", category: "Resources" },
  { title: "Documentation", href: "/docs", description: "Platform guides and API docs", category: "Resources" },
  { title: "Support", href: "/support", description: "Get help from our team", category: "Resources" }
];

export function HeaderSearch() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.trim()) {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description?.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered.slice(0, 6)); // Limit to 6 results
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setQuery("");
      }
      if (event.key === '/' && event.ctrlKey) {
        event.preventDefault();
        setIsOpen(true);
        inputRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleResultClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery("");
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
      >
        <Search className="h-4 w-4" />
        <span className="hidden md:inline text-sm">Search...</span>
        <kbd className="hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
          <span className="text-xs">⌘</span>/
        </kbd>
      </Button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-96 bg-background border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                placeholder="Search services, pages, or actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10 pr-8"
                autoFocus
              />
              {query && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearSearch}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>

          {results.length > 0 && (
            <div className="max-h-64 overflow-y-auto">
              {results.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.href)}
                  className="w-full text-left p-3 hover:bg-muted/50 border-b last:border-b-0 focus:outline-none focus:bg-muted/50"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-medium text-sm">{result.title}</div>
                      {result.description && (
                        <div className="text-xs text-muted-foreground mt-1">
                          {result.description}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded ml-2">
                      {result.category}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {query && results.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No results found for "{query}"</p>
            </div>
          )}

          {!query && (
            <div className="p-4 text-center text-muted-foreground">
              <p className="text-sm">Start typing to search...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
