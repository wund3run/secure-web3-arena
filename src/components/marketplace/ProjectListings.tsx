import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, DollarSign, Users, ExternalLink, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface ProjectListing {
  id: string;
  project_name: string;
  project_description: string;
  blockchain: string;
  budget?: number;
  deadline?: string;
  status: string;
  urgency_level?: string;
  client_id: string;
  created_at: string;
  profiles?: {
    full_name: string;
    avatar_url?: string;
  } | null;
}

export function ProjectListings() {
  const [projects, setProjects] = useState<ProjectListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // First, get the audit requests
      const { data: auditData, error: auditError } = await supabase
        .from('audit_requests')
        .select(`
          id,
          project_name,
          project_description,
          blockchain,
          budget,
          deadline,
          status,
          urgency_level,
          client_id,
          created_at
        `)
        .eq('status', 'pending')
        .order('created_at', { ascending: false });

      if (auditError) throw auditError;

      if (auditData && auditData.length > 0) {
        // Get unique client IDs
        const clientIds = [...new Set(auditData.map(project => project.client_id))];
        
        // Fetch profiles for all client IDs
        const { data: profilesData, error: profilesError } = await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', clientIds);

        // Create a map of profiles by ID for quick lookup
        const profilesMap = new Map();
        if (profilesData) {
          profilesData.forEach(profile => {
            profilesMap.set(profile.id, profile);
          });
        }

        // Combine audit data with profile data
        const projectsWithProfiles = auditData.map(project => ({
          ...project,
          profiles: profilesMap.get(project.client_id) || null
        }));

        setProjects(projectsWithProfiles);
      } else {
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const toggleFavorite = (projectId: string) => {
    setFavoriteProjects(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const getUrgencyColor = (urgency?: string) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const formatDeadline = (deadline?: string) => {
    if (!deadline) return 'Flexible timeline';
    return new Date(deadline).toLocaleDateString();
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-full mb-4"></div>
              <div className="flex space-x-2 mb-4">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-20"></div>
              </div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold mb-2">No Projects Found</h3>
          <p className="text-muted-foreground">
            No active projects match your current filters. Try adjusting your search criteria.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Projects</h2>
        <Badge variant="outline">{projects.length} projects</Badge>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <CardTitle className="text-lg">{project.project_name}</CardTitle>
                    {project.urgency_level && (
                      <Badge variant={getUrgencyColor(project.urgency_level)}>
                        {project.urgency_level} priority
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground line-clamp-2">
                    {project.project_description}
                  </p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(project.id);
                  }}
                >
                  <Heart 
                    className={`h-4 w-4 ${
                      favoriteProjects.includes(project.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-muted-foreground'
                    }`} 
                  />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Project Owner */}
                <div className="flex items-center space-x-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={project.profiles?.avatar_url} />
                    <AvatarFallback>
                      {project.profiles?.full_name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">
                    {project.profiles?.full_name || 'Anonymous'}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">4.8</span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{project.budget ? `$${project.budget.toLocaleString()}` : 'Budget TBD'}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{formatDeadline(project.deadline)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>3 applications</span>
                  </div>
                  <Badge variant="outline" className="w-fit">
                    {project.blockchain}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    Apply Now
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
