
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Clock, Users, ArrowRight } from 'lucide-react';

interface LearningPathCardProps {
  path: {
    title: string;
    description: string;
    duration: string;
    courses: number;
    difficulty: string;
    students: string;
    completionRate: string;
    badge: string;
    href: string;
  };
}

export const LearningPathCard: React.FC<LearningPathCardProps> = ({ path }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="text-xl">{path.title}</CardTitle>
            <CardDescription className="text-base">{path.description}</CardDescription>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {path.duration}
              </span>
              <span>{path.courses} courses</span>
              <span className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                {path.students} students
              </span>
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">
            {path.badge}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Completion Rate</span>
            <span className="font-medium">{path.completionRate}</span>
          </div>
          <Progress value={parseInt(path.completionRate)} className="h-2" />
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="outline">{path.difficulty}</Badge>
          <Button asChild>
            <a href={path.href}>
              Start Learning Path <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
