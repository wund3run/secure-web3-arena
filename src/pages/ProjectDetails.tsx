
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Star, Clock, DollarSign, Users, FileText, MessageCircle, Heart } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationForm } from '@/components/project/ApplicationForm';
import { ProjectDocuments } from '@/components/project/ProjectDocuments';
import { ProjectTimeline } from '@/components/project/ProjectTimeline';

export default function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProjectDetails(id);
    }
  }, [id]);

  const fetchProjectDetails = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          profiles:client_id (
            full_name,
            avatar_url
          )
        `)
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setProject(data);
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="container mx-auto px-4">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-muted rounded w-1/3"></div>
              <div className="h-32 bg-muted rounded"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.project_name} | Hawkly</title>
        <meta name="description" content={project.project_description} />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-8">
          <div className="container mx-auto px-4">
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={() => navigate('/marketplace')}
              className="mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Marketplace
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                {/* Project Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <CardTitle className="text-2xl">{project.project_name}</CardTitle>
                          {project.urgency_level && (
                            <Badge variant="destructive">
                              {project.urgency_level} Priority
                            </Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground">{project.project_description}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Project Owner */}
                    <div className="flex items-center space-x-3 mb-6">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={project.profiles?.avatar_url} />
                        <AvatarFallback>
                          {project.profiles?.full_name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{project.profiles?.full_name || 'Anonymous'}</p>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-muted-foreground">4.8 (23 reviews)</span>
                        </div>
                      </div>
                    </div>

                    {/* Key Details */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <DollarSign className="h-5 w-5 mx-auto mb-1 text-green-600" />
                        <p className="text-sm font-semibold">{project.budget ? `$${project.budget.toLocaleString()}` : 'TBD'}</p>
                        <p className="text-xs text-muted-foreground">Budget</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <Clock className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <p className="text-sm font-semibold">{project.timeline}</p>
                        <p className="text-xs text-muted-foreground">Timeline</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <Users className="h-5 w-5 mx-auto mb-1 text-purple-600" />
                        <p className="text-sm font-semibold">8</p>
                        <p className="text-xs text-muted-foreground">Applications</p>
                      </div>
                      <div className="text-center p-3 bg-muted/50 rounded">
                        <Badge variant="outline" className="w-full">
                          {project.blockchain}
                        </Badge>
                      </div>
                    </div>

                    {/* Required Expertise */}
                    {project.required_expertise && project.required_expertise.length > 0 && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-2">Required Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.required_expertise.map((skill: string) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tabs */}
                <Tabs defaultValue="overview" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="documents">Documents</TabsTrigger>
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="applications">Applications</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Project Scope</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p>{project.audit_scope || 'Full security audit of smart contracts and protocol architecture.'}</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Additional Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Communication Preference</h4>
                          <p className="text-muted-foreground">{project.communication_preference || 'Regular updates via Slack/Discord'}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Special Requirements</h4>
                          <p className="text-muted-foreground">{project.special_requirements || 'None specified'}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="documents">
                    <ProjectDocuments projectId={project.id} />
                  </TabsContent>

                  <TabsContent value="timeline">
                    <ProjectTimeline project={project} />
                  </TabsContent>

                  <TabsContent value="applications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Applications (8)</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Applications are only visible to the project owner.</p>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Apply Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Apply for This Project</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">92% Match</p>
                      <p className="text-sm text-muted-foreground">Based on your profile</p>
                    </div>
                    
                    <Button 
                      className="w-full" 
                      size="lg"
                      onClick={() => setShowApplicationForm(true)}
                    >
                      Submit Application
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Message Owner
                    </Button>
                  </CardContent>
                </Card>

                {/* Competition Stats */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Competition Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Applications</span>
                      <span className="font-semibold">8</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Avg. Rate</span>
                      <span className="font-semibold">$145/hr</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Your Rate</span>
                      <span className="font-semibold text-green-600">$150/hr</span>
                    </div>
                    <div className="pt-2 border-t">
                      <p className="text-xs text-muted-foreground">
                        You're competitive for this project
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>

      {/* Application Form Modal */}
      {showApplicationForm && (
        <ApplicationForm
          projectId={project.id}
          onClose={() => setShowApplicationForm(false)}
        />
      )}
    </>
  );
}
