import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  ArrowLeft, 
  Star, 
  Clock, 
  DollarSign, 
  Users, 
  FileText, 
  MessageCircle, 
  Heart, 
  ShieldCheck, 
  AlertTriangle, 
  Calendar, 
  CodeIcon, 
  ArrowUpRight, 
  CheckCircle2, 
  Shield 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { ApplicationForm } from '@/components/project/ApplicationForm';
import { ProjectDocuments } from '@/components/project/ProjectDocuments';
import { ProjectTimeline } from '@/components/project/ProjectTimeline';
import { HawklyCard, SecurityBadge, ProgressIndicator, LiveMetric } from '@/components/ui/hawkly-components';
import { ProductionLayout } from '@/components/layout/ProductionLayout';

export default function ProjectDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [securityScore, setSecurityScore] = useState<number>(0);
  
  useEffect(() => {
    if (id) {
      fetchProjectDetails(id);
    }
  }, [id]);

  const fetchProjectDetails = async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`*, profiles:client_id (full_name, avatar_url)`)
        .eq('id', projectId)
        .single();

      if (error) throw error;
      setProject(data);
      
      // Calculate security score based on project data
      const score = Math.floor(Math.random() * 30) + 60; // Random score between 60-90 for demo
      setSecurityScore(score);
    } catch (error) {
      console.error('Error fetching project details:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <ProductionLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <HawklyCard className="w-full max-w-md p-8 border-none bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-lg">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-slate-100">Loading Project Details</h2>
              <ProgressIndicator value={securityScore} max={100} glowEffect={true} />
              <p className="text-slate-400">Fetching project information...</p>
            </div>
          </HawklyCard>
        </div>
      </ProductionLayout>
    );
  }

  if (!project) {
    return (
      <ProductionLayout>
        <div className="flex items-center justify-center h-[70vh]">
          <HawklyCard className="w-full max-w-md p-8 border-none bg-gradient-to-b from-slate-900/80 to-slate-800/80 backdrop-blur-lg">
            <div className="text-center space-y-4">
              <AlertTriangle className="h-12 w-12 mx-auto text-amber-400" />
              <h2 className="text-2xl font-bold text-slate-100">Project Not Found</h2>
              <p className="text-slate-400 mb-6">The project you're looking for doesn't exist or has been removed.</p>
              <Button 
                onClick={() => navigate('/marketplace')}
                className="w-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
              >
                Return to Marketplace
              </Button>
            </div>
          </HawklyCard>
        </div>
      </ProductionLayout>
    );
  }

  const securityLevel = securityScore >= 80 ? 'High' : securityScore >= 60 ? 'Medium' : 'Low';
  const securityLevelColor = securityScore >= 80 ? 'emerald' : securityScore >= 60 ? 'amber' : 'red';

  return (
    <ProductionLayout>
      <Helmet>
        <title>{`${project.project_name} | Hawkly Audit`}</title>
        <meta name="description" content={project.project_description} />
      </Helmet>
      
      <main className="container max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/marketplace')} 
            className="flex items-center gap-2 hover:bg-slate-800/30 group text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4 group-hover:translate-x-[-2px] transition-transform" />
            Back to Marketplace
          </Button>
        </div>

        {/* Project header */}
        <HawklyCard variant="glass" elevation="subtle" className="mb-8 p-6 border-[rgba(168,121,239,0.08)]">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-100 to-blue-200">
                  {project.project_name}
                </h1>
                <div className="flex flex-wrap gap-2 mb-2">
                  <SecurityBadge level="enterprise" verified={true} size="md" />
                  <SecurityBadge level="advanced" verified={true} size="md" />
                  {project.urgency_level && (
                    <SecurityBadge level={project.urgency_level === 'High' ? 'enterprise' : 'advanced'} verified={true} size="md" />
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4 text-blue-500" />
                  <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-emerald-500" />
                  <span>{project.applicants_count || 8} applications</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4 text-indigo-500" />
                  <span>Security Score: {securityScore}%</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-800/50 p-3 rounded-lg backdrop-blur">
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="font-bold text-white">4.8</span>
                </div>
                <div className="text-xs text-slate-400">Client Rating</div>
              </div>
              
              <Avatar className="h-12 w-12 border-2 border-slate-700 ring-1 ring-blue-500/20">
                <AvatarImage src={project.profiles?.avatar_url} />
                <AvatarFallback className="bg-slate-700 text-slate-200">
                  {project.profiles?.full_name?.charAt(0) || 'CL'}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </HawklyCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content area - 2/3 width on large screens */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="mb-4 bg-slate-800/60 p-1 backdrop-blur">
                <TabsTrigger value="overview" className="data-[state=active]:bg-slate-700/50 text-gray-300 data-[state=active]:text-white">Overview</TabsTrigger>
                <TabsTrigger value="documents" className="data-[state=active]:bg-slate-700/50 text-gray-300 data-[state=active]:text-white">Documents</TabsTrigger>
                <TabsTrigger value="timeline" className="data-[state=active]:bg-slate-700/50 text-gray-300 data-[state=active]:text-white">Timeline</TabsTrigger>
                <TabsTrigger value="applications" className="data-[state=active]:bg-slate-700/50 text-gray-300 data-[state=active]:text-white">Applications</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview">
                <HawklyCard variant="glass" elevation="subtle" className="border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-100">Project Overview</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-slate-100">Description</h3>
                      <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{project.project_description}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-slate-100">Security Assessment</h3>
                      <div className="bg-slate-800/50 p-4 rounded-lg backdrop-blur">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-200">Security Score</span>
                          <span className={`font-medium text-${securityLevelColor}-400`}>{securityScore}%</span>
                        </div>
                        <Progress value={securityScore} className="h-2 bg-slate-700" 
                          indicatorClassName={`bg-gradient-to-r ${
                            securityLevel === 'High' ? 'from-emerald-500 to-emerald-400' : 
                            securityLevel === 'Medium' ? 'from-amber-500 to-amber-400' : 
                            'from-red-500 to-red-400'
                          }`} 
                        />
                        <div className="mt-2 flex justify-between">
                          <span className="text-xs text-slate-400">0%</span>
                          <span className="text-xs text-slate-400">100%</span>
                        </div>
                        
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <LiveMetric 
                            label="Security Level" 
                            value={securityLevel}
                          icon={ShieldCheck}
                            trend={securityScore > 70 ? 'up' : 'down'}
                          />
                          <LiveMetric 
                            label="Vulnerabilities" 
                            value={Math.floor(Math.random() * 5).toString()}
                          icon={AlertTriangle}
                          trend="stable"
                          />
                          <LiveMetric 
                            label="Last Audit" 
                            value={project.last_audit_date ? new Date(project.last_audit_date).toLocaleDateString() : 'Not audited'}
                          icon={CheckCircle2}
                          trend="stable"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-slate-100">Key Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-800/40 p-4 rounded-lg backdrop-blur">
                        <div>
                          <h4 className="font-medium text-slate-400">Blockchain</h4>
                          <p className="text-slate-200">{project.blockchain || 'Ethereum'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-400">Contract Type</h4>
                          <p className="text-slate-200">{project.contract_type || 'ERC-20 Token'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-400">Audit Type</h4>
                          <p className="text-slate-200">{project.audit_type || 'Standard Audit'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-400">Budget</h4>
                          <p className="text-slate-200">{project.budget ? `$${project.budget.toLocaleString()}` : 'Not specified'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-400">Timeline</h4>
                          <p className="text-slate-200">{project.timeline || '2-3 weeks'}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-slate-400">Lines of Code</h4>
                          <p className="text-slate-200">{project.lines_of_code || '~2,500'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-slate-100">Required Expertise</h3>
                      <div className="flex flex-wrap gap-2">
                        {project.required_expertise && project.required_expertise.length > 0 ? (
                          project.required_expertise.map((skill: string, index: number) => (
                            <TooltipProvider key={index}>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Badge 
                                    variant="outline"
                                    className="bg-slate-700/80 hover:bg-slate-700 text-blue-300 border-blue-500/20 backdrop-blur-sm px-3 py-1"
                                  >
                                    {skill}
                                  </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Required skill for this project</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ))
                        ) : (
                          <p className="text-slate-400">No specific skills required</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-slate-100">Repository</h3>
                      <div className="bg-slate-800/40 p-4 rounded-lg backdrop-blur flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CodeIcon className="h-5 w-5 text-blue-400" />
                          <span className="text-slate-200">{project.repository_url || 'Private GitHub Repository'}</span>
                        </div>
                        <Button variant="outline" size="sm" className="bg-slate-700/60 hover:bg-slate-700 border-slate-600">
                          <ArrowUpRight className="h-4 w-4 mr-1" />
                          View Code
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </HawklyCard>
              </TabsContent>
              
              <TabsContent value="documents">
                <HawklyCard variant="glass" elevation="subtle" className="border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-100">Project Documents</CardTitle>
                    <CardDescription className="text-slate-400">
                      Access project specifications, requirements, and technical documentation
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-800/40 p-4 rounded-lg backdrop-blur">
                      <ProjectDocuments projectId={project.id} />
                    </div>
                  </CardContent>
                </HawklyCard>
              </TabsContent>
              
              <TabsContent value="timeline">
                <HawklyCard variant="glass" elevation="subtle" className="border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-100">Project Timeline</CardTitle>
                    <CardDescription className="text-slate-400">
                      Track the progress of this project from start to completion
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-800/40 p-4 rounded-lg backdrop-blur">
                      <ProjectTimeline project={project} />
                    </div>
                  </CardContent>
                </HawklyCard>
              </TabsContent>
              
              <TabsContent value="applications">
                <HawklyCard variant="glass" elevation="subtle" className="border-none">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-slate-100">Applications</CardTitle>
                    <CardDescription className="text-slate-400">
                      View auditor applications and selection status
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-800/40 p-4 rounded-lg backdrop-blur space-y-4">
                      <p className="text-slate-300">This section shows auditor applications and selection process.</p>
                      <p className="text-slate-400">Currently {project.applicants_count || 8} auditors have applied to this project.</p>
                    </div>
                  </CardContent>
                </HawklyCard>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar - 1/3 width on large screens */}
          <div>
            <HawklyCard variant="highlighted" elevation="subtle" glow={true} className="border-[#a879ef]/20 sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-100">Apply for this Audit</CardTitle>
                <CardDescription className="text-slate-400">
                  Submit your application to work on this security audit
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-slate-800/60 p-4 rounded-lg backdrop-blur space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Application Window</span>
                    <span className="font-medium text-emerald-400 flex items-center gap-1">
                      <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></div>
                      Open
                    </span>
                  </div>
                  <Separator className="bg-slate-700/70" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Closing Date</span>
                    <span className="text-slate-200">{project.application_deadline ? 
                      new Date(project.application_deadline).toLocaleDateString() : 
                      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
                  </div>
                  <Separator className="bg-slate-700/70" />
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Estimated Duration</span>
                    <span className="text-slate-200">{project.timeline || '2-3 weeks'}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => setShowApplicationForm(!showApplicationForm)} 
                  className="w-full bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#9a6adf] hover:to-[#25c9ea] border-none"
                >
                  {showApplicationForm ? 'Hide Application Form' : 'Apply Now'}
                </Button>
                
                {showApplicationForm && (
                  <div className="bg-slate-800/80 p-4 rounded-lg backdrop-blur mt-4 border border-slate-700/80">
                    <ApplicationForm
                      projectId={project.id}
                      onClose={() => setShowApplicationForm(false)}
                    />
                  </div>
                )}
                
                <div className="bg-slate-800/60 p-4 rounded-lg backdrop-blur space-y-3">
                  <h4 className="font-semibold text-slate-200">Project Highlights</h4>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <MessageCircle className="h-4 w-4 text-blue-400" />
                    </div>
                    <span className="text-sm text-slate-300">Quick Response - Usually within 24 hours</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-emerald-900/50 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-300">Client prefers auditors with {project.preferred_experience || 'Solidity'} experience</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-indigo-900/50 flex items-center justify-center">
                      <DollarSign className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-sm text-slate-300">Competitive compensation for qualified auditors</span>
                  </div>
                </div>

                <HawklyCard variant="glass" elevation="subtle" className="border-none !mt-6">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-white">Match Analysis</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-400">92% Match</p>
                      <p className="text-xs text-slate-400 mt-1">Based on your skills and experience</p>
                    </div>
                    <ProgressIndicator 
                      value={92} 
                      max={100} 
                      glowEffect={true}
                      label="Your Match Score"
                    />
                  </CardContent>
                </HawklyCard>
              </CardContent>
            </HawklyCard>
          </div>
        </div>
      </main>
    </ProductionLayout>
  );
}
