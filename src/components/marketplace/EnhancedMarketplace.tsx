
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Filter, Star, Clock, DollarSign } from 'lucide-react';
import { MatchingService, AuditorMatch } from '@/services/matchingService';
import { ProjectStatusFlow } from '@/components/projects/ProjectStatusFlow';
import { ProposalCard } from '@/components/proposals/ProposalCard';
import { useAuth } from '@/contexts/auth';
import { toast } from 'sonner';

export function EnhancedMarketplace() {
  const { user, getUserType } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState<AuditorMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeProjects, setActiveProjects] = useState([]);
  const [proposals, setProposals] = useState([]);
  const userType = getUserType();

  useEffect(() => {
    if (userType === 'project_owner') {
      loadProjectOwnerData();
    } else if (userType === 'auditor') {
      loadAuditorData();
    }
  }, [userType]);

  const loadProjectOwnerData = async () => {
    setLoading(true);
    try {
      // Mock project data - in real app, fetch from database
      const mockProjects = [
        {
          id: '1',
          name: 'DeFi Protocol Audit',
          status: 'proposal_review' as const,
          progress: 25,
          currentPhase: 'Reviewing Proposals',
          nextAction: 'Select Auditor',
          proposalCount: 3,
          estimatedCompletion: '2 weeks'
        },
        {
          id: '2',
          name: 'NFT Marketplace Security',
          status: 'in_progress' as const,
          progress: 60,
          currentPhase: 'Code Review',
          nextAction: 'Awaiting Report',
          auditorAssigned: 'SecureLabs',
          estimatedCompletion: '1 week'
        }
      ];

      setActiveProjects(mockProjects);

      // Mock proposals
      const mockProposals = [
        {
          id: '1',
          auditorName: 'CryptoShield Security',
          auditorAvatar: undefined,
          rating: 4.9,
          completedAudits: 124,
          message: 'I have extensive experience with DeFi protocols and have identified similar vulnerabilities in past audits. I can complete this audit within 2 weeks with comprehensive testing.',
          estimatedHours: 80,
          hourlyRate: 150,
          totalCost: 12000,
          timeline: '2 weeks',
          deliverables: [
            'Complete security audit report',
            'Vulnerability assessment with severity ratings',
            'Remediation recommendations',
            'Follow-up review after fixes'
          ],
          status: 'pending' as const
        }
      ];

      setProposals(mockProposals);
    } catch (error) {
      console.error('Error loading project owner data:', error);
      toast.error('Failed to load project data');
    } finally {
      setLoading(false);
    }
  };

  const loadAuditorData = async () => {
    setLoading(true);
    try {
      // Mock available projects for auditors
      const mockCriteria = {
        blockchain: 'ethereum',
        projectType: 'defi',
        budgetRange: [5000, 15000] as [number, number],
        timeline: '2-4 weeks',
        complexity: 'medium' as const,
        requiredSkills: ['solidity', 'defi', 'smart contracts']
      };

      const auditorMatches = await MatchingService.findMatchingAuditors('mock-project', mockCriteria);
      setMatches(auditorMatches);
    } catch (error) {
      console.error('Error loading auditor data:', error);
      toast.error('Failed to load available projects');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectAction = (action: string, projectId: string) => {
    switch (action) {
      case 'review_proposals':
        toast.info('Opening proposal review...');
        break;
      case 'open_chat':
        toast.info('Opening project chat...');
        break;
      case 'submit_proposal':
        toast.info('Opening proposal form...');
        break;
      default:
        toast.info(`Action: ${action} for project ${projectId}`);
    }
  };

  const handleProposalAction = (action: string, proposalId: string) => {
    if (action === 'accept') {
      toast.success('Proposal accepted! Setting up escrow...');
    } else if (action === 'reject') {
      toast.info('Proposal declined');
    }
  };

  if (userType === 'project_owner') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Your Projects</h1>
            <p className="text-muted-foreground">Manage your security audits</p>
          </div>
          <Button onClick={() => window.location.href = '/submit-project'}>
            Submit New Project
          </Button>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="proposals">Proposals ({proposals.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {activeProjects.map((project: any) => (
              <ProjectStatusFlow
                key={project.id}
                project={project}
                userRole="client"
                onTakeAction={handleProjectAction}
              />
            ))}
          </TabsContent>

          <TabsContent value="proposals" className="space-y-4">
            {proposals.map((proposal: any) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onAccept={(id) => handleProposalAction('accept', id)}
                onReject={(id) => handleProposalAction('reject', id)}
                onViewProfile={(id) => toast.info(`Viewing profile for ${id}`)}
              />
            ))}
          </TabsContent>

          <TabsContent value="completed">
            <div className="text-center py-8">
              <p className="text-muted-foreground">No completed projects yet</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Available Projects</h1>
          <p className="text-muted-foreground">Find your next audit opportunity</p>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {matches.map((match) => (
          <Card key={match.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{match.name}</CardTitle>
                <Badge variant="outline">{match.matchScore}% match</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {match.expertise.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>${match.hourlyRate}/hr</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{match.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span>{match.rating}</span>
                </div>
                <div className="text-muted-foreground">
                  {match.completedAudits} audits
                </div>
              </div>

              <p className="text-sm text-muted-foreground">{match.reasonForMatch}</p>

              <div className="flex gap-2">
                <Button className="flex-1">Submit Proposal</Button>
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
