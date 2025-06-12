
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, FileText, Video, MessageCircle } from 'lucide-react';
import { SearchResult } from '@/hooks/useAdvancedSearch';
import { formatDistanceToNow } from 'date-fns';

interface SearchResultCardProps {
  result: SearchResult;
  onClick: () => void;
}

export const SearchResultCard: React.FC<SearchResultCardProps> = ({ result, onClick }) => {
  const getTypeIcon = () => {
    switch (result.type) {
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

  const getTypeLabel = () => {
    switch (result.type) {
      case 'article':
        return 'Article';
      case 'tutorial':
        return 'Tutorial';
      case 'topic':
        return 'Forum Topic';
      default:
        return 'Content';
    }
  };

  return (
    <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onClick}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2 mb-2">
            {getTypeIcon()}
            <Badge variant="outline" className="text-xs">
              {getTypeLabel()}
            </Badge>
            {result.rating_average && (
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="text-xs font-medium">{result.rating_average.toFixed(1)}</span>
              </div>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(result.created_at), { addSuffix: true })}
          </div>
        </div>
        <h3 className="font-semibold text-lg line-clamp-2">{result.title}</h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
          {result.excerpt}
        </p>
        
        {result.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {result.tags.slice(0, 4).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {result.tags.length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{result.tags.length - 4} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarImage src={result.author_avatar_url} />
            <AvatarFallback className="text-xs">
              {result.author_name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">{result.author_name}</span>
        </div>
      </CardContent>
    </Card>
  );
};
