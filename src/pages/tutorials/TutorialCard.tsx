
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PlayCircle, Users, Star, ArrowRight, CheckCircle
} from 'lucide-react';

interface TutorialCardProps {
  tutorial: {
    title: string;
    description: string;
    duration: string;
    difficulty: string;
    students: string;
    rating: number;
    category: string;
    type: string;
    modules: number;
    href: string;
    thumbnail: string;
    instructor: string;
  };
  index: number;
  completedTutorials: number[];
  onMarkComplete: (index: number) => void;
}

export const TutorialCard: React.FC<TutorialCardProps> = ({
  tutorial,
  index,
  completedTutorials,
  onMarkComplete
}) => {
  return (
    <Card className="hover:shadow-lg transition-all cursor-pointer group">
      <div className="relative">
        <img 
          src={tutorial.thumbnail} 
          alt={tutorial.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors rounded-t-lg" />
        <div className="absolute top-4 left-4">
          <Badge className="bg-black/50 text-white border-0">
            {tutorial.type}
          </Badge>
        </div>
        <div className="absolute bottom-4 right-4">
          <div className="bg-black/70 text-white px-2 py-1 rounded text-sm">
            {tutorial.duration}
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="lg" className="bg-white/20 backdrop-blur border-white/20 text-white hover:bg-white/30">
            <PlayCircle className="mr-2 h-5 w-5" />
            Start Tutorial
          </Button>
        </div>
      </div>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline">{tutorial.category}</Badge>
          <Badge variant={tutorial.difficulty === 'Beginner' ? 'default' : tutorial.difficulty === 'Intermediate' ? 'secondary' : 'destructive'}>
            {tutorial.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          <a href={tutorial.href}>{tutorial.title}</a>
        </CardTitle>
        <CardDescription>{tutorial.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              {tutorial.students} students
            </span>
            <span className="flex items-center gap-1">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {tutorial.rating}
            </span>
            <span>{tutorial.modules} modules</span>
          </div>
          <p className="text-sm text-muted-foreground">By {tutorial.instructor}</p>
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <a href={tutorial.href}>
                View Details <ArrowRight className="ml-1 h-3 w-3" />
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onMarkComplete(index)}
              disabled={completedTutorials.includes(index)}
            >
              {completedTutorials.includes(index) ? (
                <>
                  <CheckCircle className="mr-1 h-3 w-3" />
                  Completed
                </>
              ) : (
                'Start Learning'
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
