
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectCard } from './ProjectCard';

interface Project {
  id: number;
  name: string;
  client: string;
  progress: number;
  deadline: string;
  priority: string;
  earnings: string;
  status: string;
}

interface ActiveProjectsProps {
  projects: Project[];
}

export function ActiveProjects({ projects }: ActiveProjectsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
