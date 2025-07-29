import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Clock, DollarSign, Code, Star, MapPin, Calendar } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/auth";
import { Tables } from "@/integrations/supabase/types";
import { Link } from 'react-router-dom';

type AuditRequest = Tables<'audit_requests'>;
type AuditorProfile = Tables<'auditor_profiles'>;

const AuditorProjectBrowser: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBlockchain, setSelectedBlockchain] = useState('all');
  const [budgetFilter, setBudgetFilter] = useState('all');
  const [urgencyFilter, setUrgencyFilter] = useState('all');
  const [projects, setProjects] = useState<AuditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [auditorProfile, setAuditorProfile] = useState<AuditorProfile | null>(null);
  const [appliedProjects, setAppliedProjects] = useState<Set<string>>(new Set());
  
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchAuditorProfile();
      fetchAvailableProjects();
      fetchAppliedProjects();
    }
  }, [user]);

  const fetchAuditorProfile = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching auditor profile:', error);
        return;
      }

      setAuditorProfile(data);
    } catch (error) {
      console.error('Error in fetchAuditorProfile:', error);
    }
  };

  const fetchAvailableProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('audit_requests')
        .select(`
          *,
          profiles!audit_requests_client_id_fkey(
            full_name,
            avatar_url
          )
        `)
        .in('status', ['open', 'pending', 'accepting_proposals'])
        .is('assigned_auditor_id', null)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error",
          description: "Failed to load available projects",
          variant: "error",
        });
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error in fetchAvailableProjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppliedProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('audit_proposals')
        .select('audit_request_id')
        .eq('auditor_id', user.id);

      if (error) {
        console.error('Error fetching applied projects:', error);
        return;
      }

      const appliedIds = new Set(data?.map(proposal => proposal.audit_request_id) || []);
      setAppliedProjects(appliedIds);
    } catch (error) {
      console.error('Error in fetchAppliedProjects:', error);
    }
  };

  const handleApplyToProject = async (projectId: string) => {
    if (!user || !auditorProfile) {
      toast({
        title: "Error",
        description: "Please complete your auditor profile first",
        variant: "error",
      });
      return;
    }

    try {
      const project = projects.find(p => p.id === projectId);
      if (!project) return;

      // Create a proposal
      const { error } = await supabase
        .from('audit_proposals')
        .insert({
          audit_request_id: projectId,
          auditor_id: user.id,
          proposal_text: `I am interested in auditing your ${project.project_name} project. With ${auditorProfile.years_experience} years of experience in blockchain security and expertise in ${auditorProfile.blockchain_expertise?.join(', ')}, I can provide a thorough audit of your smart contracts.`,
          proposed_cost: project.budget || 5000,
          estimated_timeline_days: 14,
          status: 'submitted',
          submitted_at: new Date().toISOString()
        });

      if (error) {
        console.error('Error submitting proposal:', error);
        toast({
          title: "Error",
          description: "Failed to submit proposal",
          variant: "error",
        });
        return;
      }

      // Update local state
      setAppliedProjects(prev => new Set([...prev, projectId]));
      
      toast({
        title: "Success",
        description: "Your proposal has been submitted successfully",
      });
    } catch (error) {
      console.error('Error in handleApplyToProject:', error);
      toast({
        title: "Error",
        description: "Failed to submit proposal",
        variant: "error",
      });
    }
  };

  const calculateSkillMatch = (project: AuditRequest): number => {
    if (!auditorProfile) return 0;

    let matchScore = 0;
    const factors = [];

    // Blockchain expertise match
    if (auditorProfile.blockchain_expertise?.includes(project.blockchain)) {
      matchScore += 40;
      factors.push('Blockchain expertise');
    }

    // Experience level match
    if (auditorProfile.years_experience >= 3) {
      matchScore += 20;
      factors.push('Experience level');
    }

    // Availability match
    if (auditorProfile.availability_status === 'available') {
      matchScore += 20;
      factors.push('Availability');
    }

    // Budget compatibility
    if (project.budget && auditorProfile.hourly_rate_min && auditorProfile.hourly_rate_max) {
      const estimatedHours = 40; // Default estimate
      const minCost = auditorProfile.hourly_rate_min * estimatedHours;
      const maxCost = auditorProfile.hourly_rate_max * estimatedHours;
      
      if (project.budget >= minCost && project.budget <= maxCost * 1.2) {
        matchScore += 20;
        factors.push('Budget match');
      }
    }

    return Math.min(matchScore, 100);
  };

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.project_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.project_description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBlockchain = selectedBlockchain === 'all' || project.blockchain === selectedBlockchain;
    
    const matchesBudget = budgetFilter === 'all' || 
                         (budgetFilter === 'low' && project.budget && project.budget < 5000) ||
                         (budgetFilter === 'medium' && project.budget && project.budget >= 5000 && project.budget < 15000) ||
                         (budgetFilter === 'high' && project.budget && project.budget >= 15000);
    
    const matchesUrgency = urgencyFilter === 'all' || project.urgency_level === urgencyFilter;

    return matchesSearch && matchesBlockchain && matchesBudget && matchesUrgency;
  });

  const getUrgencyColor = (urgency: string | null) => {
    switch (urgency) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'outline';
    }
  };

  const getPriorityColor = (priority: number | null) => {
    if (!priority) return 'outline';
    if (priority >= 80) return 'destructive';
    if (priority >= 50) return 'default';
    return 'secondary';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search projects by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="blockchain">Blockchain</Label>
                <Select value={selectedBlockchain} onValueChange={setSelectedBlockchain}>
                  <SelectTrigger>
                    <SelectValue placeholder="All blockchains" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Blockchains</SelectItem>
                    <SelectItem value="ethereum">Ethereum</SelectItem>
                    <SelectItem value="polygon">Polygon</SelectItem>
                    <SelectItem value="binance">Binance Smart Chain</SelectItem>
                    <SelectItem value="avalanche">Avalanche</SelectItem>
                    <SelectItem value="solana">Solana</SelectItem>
                    <SelectItem value="cardano">Cardano</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="budget">Budget Range</Label>
                <Select value={budgetFilter} onValueChange={setBudgetFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All budgets" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Budgets</SelectItem>
                    <SelectItem value="low">Under $5,000</SelectItem>
                    <SelectItem value="medium">$5,000 - $15,000</SelectItem>
                    <SelectItem value="high">$15,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="urgency">Urgency</Label>
                <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All urgencies" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Urgencies</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Found {filteredProjects.length} available projects
        </p>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm text-gray-600">Sort by match score</span>
        </div>
      </div>

      {/* Project Cards */}
      <div className="space-y-4">
        {filteredProjects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-gray-500">No projects found matching your criteria.</p>
            </CardContent>
          </Card>
        ) : (
          filteredProjects
            .sort((a, b) => calculateSkillMatch(b) - calculateSkillMatch(a))
            .map((project) => {
              const skillMatch = calculateSkillMatch(project);
              const hasApplied = appliedProjects.has(project.id);
              
              return (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <CardTitle className="text-lg">{project.project_name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4" />
                          <span>Remote</span>
                          <Calendar className="h-4 w-4 ml-2" />
                          <span>Posted {new Date(project.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getUrgencyColor(project.urgency_level)}>
                          {project.urgency_level || 'Standard'} Priority
                        </Badge>
                        {skillMatch > 0 && (
                          <Badge variant="outline" className="border-green-500 text-green-700">
                            <Star className="h-3 w-3 mr-1" />
                            {skillMatch}% Match
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-gray-700 line-clamp-2">
                        {project.project_description || 'No description provided'}
                      </p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-blue-500" />
                          <span className="font-medium">{project.blockchain}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="font-medium">
                            ${project.budget?.toLocaleString() || 'Not specified'}
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-orange-500" />
                          <span className="font-medium">
                            {project.deadline ? 
                              `Due ${new Date(project.deadline).toLocaleDateString()}` : 
                              'Flexible timeline'
                            }
                          </span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-purple-500" />
                          <span className="font-medium">
                            {project.lines_of_code ? 
                              `${project.lines_of_code.toLocaleString()} LOC` : 
                              'Size TBD'
                            }
                          </span>
                        </div>
                      </div>
                      
                      {project.audit_scope && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Audit Scope:</p>
                          <p className="text-sm text-gray-600">{project.audit_scope}</p>
                        </div>
                      )}
                      
                      {project.specific_concerns && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Specific Concerns:</p>
                          <p className="text-sm text-gray-600">{project.specific_concerns}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-2">
                          {skillMatch > 70 && (
                            <Badge variant="outline" className="border-green-500 text-green-700">
                              Great Match!
                            </Badge>
                          )}
                          {skillMatch > 50 && skillMatch <= 70 && (
                            <Badge variant="outline" className="border-blue-500 text-blue-700">
                              Good Match
                            </Badge>
                          )}
                          {project.priority_score && (
                            <Badge variant={getPriorityColor(project.priority_score)}>
                              Priority: {project.priority_score}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link to={`/audit-details/${project.id}`}>
                              View Details
                            </Link>
                          </Button>
                          <Button 
                            size="sm" 
                            onClick={() => handleApplyToProject(project.id)}
                            disabled={hasApplied}
                          >
                            {hasApplied ? 'Applied' : 'Apply Now'}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
        )}
      </div>
    </div>
  );
};

export default AuditorProjectBrowser; 