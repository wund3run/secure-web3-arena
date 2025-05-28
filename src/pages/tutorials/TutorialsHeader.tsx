
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, PlayCircle, Sparkles } from 'lucide-react';
import { categories2025 } from './tutorial-data-2025';

interface TutorialsHeaderProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const TutorialsHeader: React.FC<TutorialsHeaderProps> = ({
  searchQuery,
  onSearchChange
}) => {
  return (
    <div className="text-center space-y-6">
      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-blue-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
        <Sparkles className="h-4 w-4" />
        189 tutorials updated for 2025 security standards & AI integration
      </div>
      <h1 className="text-4xl md:text-5xl font-bold">
        Security <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Tutorials</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Master Web3 security with hands-on tutorials covering the latest smart contract auditing techniques, 
        AI-powered vulnerability detection, and cutting-edge security frameworks for 2025.
      </p>
      
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tutorials, AI tools, security topics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories2025.map((category) => (
          <Badge key={category.name} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            <span className="ml-1">
              {category.name} ({category.count})
              {category.growth && (
                <span className="text-green-600 ml-1 text-xs">{category.growth}</span>
              )}
            </span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
