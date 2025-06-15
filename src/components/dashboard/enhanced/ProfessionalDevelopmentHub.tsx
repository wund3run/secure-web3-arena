
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Brain, BookOpen, Award, TrendingUp } from 'lucide-react';

export function ProfessionalDevelopmentHub() {
  const courses = [
    { title: 'Advanced DeFi Security', progress: 75, status: 'In Progress' },
    { title: 'Smart Contract Fuzzing', progress: 100, status: 'Completed' },
    { title: 'Zero-Knowledge Proofs', progress: 25, status: 'Started' },
  ];

  const certifications = [
    { name: 'Certified Smart Contract Auditor', earned: true, date: '2024-01-15' },
    { name: 'DeFi Security Specialist', earned: false, nextExam: '2024-02-20' },
    { name: 'Blockchain Forensics Expert', earned: false, nextExam: '2024-03-15' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Professional Development
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Learning Progress
          </h4>
          <div className="space-y-3">
            {courses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{course.title}</span>
                  <span className="text-xs text-muted-foreground">{course.status}</span>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <Award className="h-4 w-4" />
            Certifications
          </h4>
          <div className="space-y-2">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {cert.earned ? `Earned: ${cert.date}` : `Next exam: ${cert.nextExam}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {cert.earned ? (
                    <Award className="h-4 w-4 text-yellow-500" />
                  ) : (
                    <Button variant="outline" size="sm">Register</Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3 flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Skill Development
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              Browse Courses
            </Button>
            <Button variant="outline" size="sm">
              Schedule Exam
            </Button>
            <Button variant="outline" size="sm">
              View Transcript
            </Button>
            <Button variant="outline" size="sm">
              Career Path
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
