
import React, { useState, useEffect } from 'react';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, MessageCircle, Search } from 'lucide-react';
import { useAdvancedSearch } from '@/hooks/useAdvancedSearch';
import { useNavigate } from 'react-router-dom';
import { useDebounce } from '@/hooks/useDebounce';

interface GlobalSearchCommandProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GlobalSearchCommand: React.FC<GlobalSearchCommandProps> = ({
  open,
  onOpenChange
}) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const { results, loading, search } = useAdvancedSearch();
  const debouncedSearch = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedSearch.trim()) {
      search(debouncedSearch, {}, 1);
    }
  }, [debouncedSearch, search]);

  const handleSelect = (result: any) => {
    const basePath = {
      'article': '/knowledge-base',
      'tutorial': '/tutorials',
      'topic': '/forum'
    }[result.type] || '/';
    
    navigate(`${basePath}/${result.slug}`);
    onOpenChange(false);
  };

  const handleAdvancedSearch = () => {
    navigate(`/search?q=${encodeURIComponent(searchValue)}`);
    onOpenChange(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'tutorial':
        return <Video className="h-4 w-4" />;
      case 'topic':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Search articles, tutorials, forum topics..." 
        value={searchValue}
        onValueChange={setSearchValue}
      />
      <CommandList>
        <CommandEmpty>
          {loading ? (
            "Searching..."
          ) : searchValue ? (
            <div className="py-2">
              <p className="text-sm text-muted-foreground mb-2">No results found</p>
              <button
                onClick={handleAdvancedSearch}
                className="flex items-center text-sm text-primary hover:underline"
              >
                <Search className="h-3 w-3 mr-1" />
                Try advanced search
              </button>
            </div>
          ) : (
            "Type to search..."
          )}
        </CommandEmpty>
        
        {results.length > 0 && (
          <>
            <CommandGroup heading="Search Results">
              {results.slice(0, 6).map((result) => (
                <CommandItem
                  key={`${result.type}-${result.id}`}
                  onSelect={() => handleSelect(result)}
                  className="flex items-start gap-3 p-3"
                >
                  <div className="mt-0.5">
                    {getIcon(result.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm line-clamp-1">
                        {result.title}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {result.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {result.excerpt}
                    </p>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
            
            {searchValue && (
              <CommandGroup>
                <CommandItem onSelect={handleAdvancedSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  <span>See all results for "{searchValue}"</span>
                </CommandItem>
              </CommandGroup>
            )}
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
};
