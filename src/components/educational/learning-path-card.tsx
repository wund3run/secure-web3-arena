
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Clock, BookOpen, Trophy, ArrowRight } from "lucide-react";

export interface LearningPath {
  id: number;
  title: string;
  description: string;
  totalCourses: number;
  totalDuration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  progress?: number;
  completedCourses?: number;
  category: string;
  skills: string[];
  href: string;
}

interface LearningPathCardProps {
  path: LearningPath;
}

export function LearningPathCard({ path }: LearningPathCardProps) {
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
          <Badge variant="secondary" className={getDifficultyColor(path.difficulty)}>
            {path.difficulty}
          </Badge>
          <Badge variant="outline">{path.category}</Badge>
        </div>
        
        <CardTitle className="text-lg group-hover:text-primary transition-colors">
          <Link to={path.href}>{path.title}</Link>
        </CardTitle>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {path.description}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" />
            {path.totalCourses} courses
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {path.totalDuration}
          </div>
        </div>
        
        {path.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{path.completedCourses}/{path.totalCourses} courses</span>
            </div>
            <Progress value={path.progress} className="h-2" />
          </div>
        )}
        
        <div className="space-y-2">
          <p className="text-sm font-medium">Skills you'll learn:</p>
          <div className="flex flex-wrap gap-1">
            {path.skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {skill}
              </Badge>
            ))}
            {path.skills.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{path.skills.length - 3} more
              </Badge>
            )}
          </div>
        </div>
        
        <Button className="w-full" asChild>
          <Link to={path.href}>
            {path.progress ? 'Continue Learning' : 'Start Path'}
            <ArrowRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
