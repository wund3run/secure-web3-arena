import React, { useState, useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { GlobalSearchCommand } from '@/components/search/GlobalSearchCommand';

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
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <GlobalSearchCommand open={isOpen} onOpenChange={setIsOpen} />
    </div>
  );
}
