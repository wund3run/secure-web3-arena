
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, Star, Play, BookOpen, Code } from "lucide-react";

export interface Tutorial {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  category: string;
  rating: number;
  students: number;
  isNew?: boolean;
  isPremium?: boolean;
  instructor: {
    name: string;
    avatar: string;
  };
  href: string;
}

interface TutorialCardProps {
  tutorial: Tutorial;
}

export function TutorialCard({ tutorial }: TutorialCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700';
      case 'Advanced':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Card className="h-full hover:shadow-lg transition-all cursor-pointer group">
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className={getDifficultyColor(tutorial.difficulty)}>
              {tutorial.difficulty}
            </Badge>
            {tutorial.isNew && (
              <Badge className="bg-green-100 text-green-700 text-xs">NEW</Badge>
            )}
            {tutorial.isPremium && (
              <Badge className="bg-purple-100 text-purple-700 text-xs">PRO</Badge>
            )}
          </div>
          <Badge variant="outline">{tutorial.category}</Badge>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
          <Link to={tutorial.href}>{tutorial.title}</Link>
        </CardTitle>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {tutorial.description}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {tutorial.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {tutorial.students}
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
            {tutorial.rating}
          </div>
        </div>
        
        <div className="flex items-center gap-2 mb-3">
          <img 
            src={tutorial.instructor.avatar} 
            alt={tutorial.instructor.name}
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm text-muted-foreground">
            {tutorial.instructor.name}
          </span>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1" asChild>
          <Link to={tutorial.href}>
            <BookOpen className="mr-1 h-3 w-3" />
            Learn
          </Link>
        </Button>
        <Button size="sm" className="flex-1" asChild>
          <Link to={tutorial.href}>
            <Play className="mr-1 h-3 w-3" />
            Start
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
