
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, PlayCircle } from 'lucide-react';
import { categories } from './tutorial-data';

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
        <PlayCircle className="h-4 w-4" />
        147 tutorials updated for March 2025 security standards
      </div>
      <h1 className="text-4xl md:text-5xl font-bold">
        Security <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Tutorials</span>
      </h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Master Web3 security with hands-on tutorials covering smart contract auditing, 
        AI-powered vulnerability detection, and the latest security frameworks for 2025.
      </p>
      
      <div className="max-w-md mx-auto relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tutorials, tools, topics..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <Badge key={category.name} variant="secondary" className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer">
            <span className="ml-1">{category.name} ({category.count})</span>
          </Badge>
        ))}
      </div>
    </div>
  );
};
