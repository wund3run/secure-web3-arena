import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertCircle, Upload, Eye, Download, Share2, Star, Trophy, Shield, Code, ChevronLeft, ChevronRight, Plus, X, ExternalLink, Github, Globe, Linkedin } from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  projectType: 'smart-contract' | 'defi-protocol' | 'nft-platform' | 'bridge' | 'dao' | 'other';
  blockchain: string[];
  codeSize: number;
  vulnerabilitiesFound: number;
  severity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    informational: number;
  };
  timeline: {
    start: string;
    end: string;
  };
  tools: string[];
  clientTestimonial?: string;
  reportUrl?: string;
  githubUrl?: string;
  outcome: string;
  featured: boolean;
}

interface PortfolioData {
  // Basic Information
  professionalSummary: string;
  tagline: string;
  specializations: string[];
  
  // Professional Details
  totalAudits: number;
  totalVulnerabilities: number;
  clientSatisfactionRate: number;
  averageProjectDuration: number;
  
  // Skills & Expertise
  technicalSkills: string[];
  blockchainExpertise: string[];
  securityToolsProficiency: string[];
  certifications: string[];
  
  // Projects Portfolio
  projects: PortfolioProject[];
  
  // Professional Links
  githubUsername: string;
  linkedinUrl: string;
  personalWebsite: string;
  twitterHandle: string;
  
  // Portfolio Settings
  isPublic: boolean;
  allowClientContact: boolean;
  showRates: boolean;
  hourlyRateRange: {
    min: number;
    max: number;
  };
}

const BLOCKCHAIN_OPTIONS = [
  'Ethereum', 'Polygon', 'Binance Smart Chain', 'Avalanche', 'Arbitrum', 'Optimism',
  'Solana', 'Cardano', 'Polkadot', 'Cosmos', 'Near', 'Fantom', 'Harmony', 'Xdai'
];

const SECURITY_TOOLS = [
  'Slither', 'Mythril', 'Securify', 'Oyente', 'SmartCheck', 'Echidna', 'Manticore',
  'Foundry', 'Hardhat', 'Brownie', 'Truffle', 'Remix', 'Surya', 'Sol2uml'
];

const PROJECT_TYPES = [
  { value: 'smart-contract', label: 'Smart Contract', description: 'Individual smart contract audits' },
  { value: 'defi-protocol', label: 'DeFi Protocol', description: 'Decentralized finance protocols' },
  { value: 'nft-platform', label: 'NFT Platform', description: 'NFT marketplaces and minting platforms' },
  { value: 'bridge', label: 'Cross-chain Bridge', description: 'Interoperability and bridge protocols' },
  { value: 'dao', label: 'DAO Governance', description: 'Governance and voting mechanisms' },
  { value: 'other', label: 'Other', description: 'Other blockchain projects' }
];

const STEPS = [
  { id: 'basic', title: 'Basic Information', icon: Trophy },
  { id: 'expertise', title: 'Skills & Expertise', icon: Shield },
  { id: 'projects', title: 'Portfolio Projects', icon: Code },
  { id: 'links', title: 'Professional Links', icon: ExternalLink },
  { id: 'settings', title: 'Portfolio Settings', icon: Star }
];

export default function PortfolioCreationWizard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [data, setData] = useState<PortfolioData>({
    professionalSummary: '',
    tagline: '',
    specializations: [],
    totalAudits: 0,
    totalVulnerabilities: 0,
    clientSatisfactionRate: 100,
    averageProjectDuration: 14,
    technicalSkills: [],
    blockchainExpertise: [],
    securityToolsProficiency: [],
    certifications: [],
    projects: [],
    githubUsername: '',
    linkedinUrl: '',
    personalWebsite: '',
    twitterHandle: '',
    isPublic: true,
    allowClientContact: true,
    showRates: false,
    hourlyRateRange: { min: 50, max: 200 }
  });

  const [currentProject, setCurrentProject] = useState<Partial<PortfolioProject>>({
    severity: { critical: 0, high: 0, medium: 0, low: 0, informational: 0 },
    blockchain: [],
    tools: []
  });

  const [isAddingProject, setIsAddingProject] = useState(false);

  useEffect(() => {
    if (user) {
      loadExistingPortfolio();
    }
  }, [user]);

  const loadExistingPortfolio = async () => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      // For now, we'll use analytics_events table to store portfolio data
      const { data: portfolioData, error } = await supabase
        .from('analytics_events')
        .select('properties')
        .eq('user_id', user.id)
        .eq('event_name', 'portfolio_data')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (portfolioData?.properties) {
        setData(prev => ({
          ...prev,
          ...(portfolioData.properties as any)
        }));
      }
    } catch (error) {
      console.error('Error loading portfolio:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const savePortfolio = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save your portfolio",
        variant: "error",
      });
      return;
    }

    setIsSaving(true);
    try {
      // Save portfolio data in analytics_events table
      const portfolioData = {
        user_id: user.id,
        event_name: 'portfolio_data',
        properties: JSON.stringify(data),
        timestamp: new Date().toISOString(),
        created_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('analytics_events')
        .upsert(portfolioData);

      if (error) throw error;

      toast({
        title: "Portfolio saved successfully!",
        description: "Your portfolio is now ready to attract premium opportunities",
      });

      navigate('/dashboard/auditor');
      
    } catch (error) {
      console.error('Error saving portfolio:', error);
      toast({
        title: "Error saving portfolio",
        description: "Please try again or contact support",
        variant: "error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const addProject = () => {
    if (!currentProject.title || !currentProject.description) {
      toast({
        title: "Missing information",
        description: "Please fill in project title and description",
        variant: "error",
      });
      return;
    }

    const newProject: PortfolioProject = {
      id: Date.now().toString(),
      title: currentProject.title || '',
      description: currentProject.description || '',
      projectType: currentProject.projectType || 'smart-contract',
      blockchain: currentProject.blockchain || [],
      codeSize: currentProject.codeSize || 0,
      vulnerabilitiesFound: currentProject.vulnerabilitiesFound || 0,
      severity: currentProject.severity || { critical: 0, high: 0, medium: 0, low: 0, informational: 0 },
      timeline: currentProject.timeline || { start: '', end: '' },
      tools: currentProject.tools || [],
      clientTestimonial: currentProject.clientTestimonial,
      reportUrl: currentProject.reportUrl,
      githubUrl: currentProject.githubUrl,
      outcome: currentProject.outcome || '',
      featured: currentProject.featured || false
    };

    setData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }));

    setCurrentProject({
      severity: { critical: 0, high: 0, medium: 0, low: 0, informational: 0 },
      blockchain: [],
      tools: []
    });
    setIsAddingProject(false);

    toast({
      title: "Project added",
      description: "Portfolio project has been added successfully",
    });
  };

  const removeProject = (projectId: string) => {
    setData(prev => ({
      ...prev,
      projects: prev.projects.filter(p => p.id !== projectId)
    }));
  };

  const toggleSpecialization = (spec: string) => {
    setData(prev => ({
      ...prev,
      specializations: prev.specializations.includes(spec)
        ? prev.specializations.filter(s => s !== spec)
        : [...prev.specializations, spec]
    }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const progress = ((currentStep + 1) / STEPS.length) * 100;

  const renderBasicInformation = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="tagline">Professional Tagline</Label>
        <Input
          id="tagline"
          value={data.tagline}
          onChange={(e) => setData(prev => ({ ...prev, tagline: e.target.value }))}
          placeholder="e.g., Senior Smart Contract Auditor | DeFi Security Expert"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="summary">Professional Summary</Label>
        <Textarea
          id="summary"
          value={data.professionalSummary}
          onChange={(e) => setData(prev => ({ ...prev, professionalSummary: e.target.value }))}
          placeholder="Write a compelling summary of your experience, expertise, and unique value proposition..."
          className="mt-1 min-h-[120px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="totalAudits">Total Audits Completed</Label>
          <Input
            id="totalAudits"
            type="number"
            value={data.totalAudits}
            onChange={(e) => setData(prev => ({ ...prev, totalAudits: parseInt(e.target.value) || 0 }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="totalVulnerabilities">Total Vulnerabilities Found</Label>
          <Input
            id="totalVulnerabilities"
            type="number"
            value={data.totalVulnerabilities}
            onChange={(e) => setData(prev => ({ ...prev, totalVulnerabilities: parseInt(e.target.value) || 0 }))}
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="satisfaction">Client Satisfaction Rate (%)</Label>
          <Input
            id="satisfaction"
            type="number"
            min="0"
            max="100"
            value={data.clientSatisfactionRate}
            onChange={(e) => setData(prev => ({ ...prev, clientSatisfactionRate: parseInt(e.target.value) || 100 }))}
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="duration">Average Project Duration (days)</Label>
          <Input
            id="duration"
            type="number"
            value={data.averageProjectDuration}
            onChange={(e) => setData(prev => ({ ...prev, averageProjectDuration: parseInt(e.target.value) || 14 }))}
            className="mt-1"
          />
        </div>
      </div>

      <div>
        <Label>Specializations</Label>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {['Smart Contract Security', 'DeFi Protocols', 'NFT Platforms', 'Cross-chain Bridges', 'DAO Governance', 'Layer 2 Solutions', 'MEV Protection', 'Flash Loan Attacks'].map((spec) => (
            <div key={spec} className="flex items-center space-x-2">
              <Checkbox
                id={spec}
                checked={data.specializations.includes(spec)}
                onCheckedChange={() => toggleSpecialization(spec)}
              />
              <Label htmlFor={spec} className="text-sm">{spec}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderSkillsExpertise = () => (
    <div className="space-y-6">
      <div>
        <Label>Blockchain Expertise</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {BLOCKCHAIN_OPTIONS.map((blockchain) => (
            <div key={blockchain} className="flex items-center space-x-2">
              <Checkbox
                id={blockchain}
                checked={data.blockchainExpertise.includes(blockchain)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setData(prev => ({ ...prev, blockchainExpertise: [...prev.blockchainExpertise, blockchain] }));
                  } else {
                    setData(prev => ({ ...prev, blockchainExpertise: prev.blockchainExpertise.filter(b => b !== blockchain) }));
                  }
                }}
              />
              <Label htmlFor={blockchain} className="text-sm">{blockchain}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label>Security Tools Proficiency</Label>
        <div className="grid grid-cols-3 gap-2 mt-2">
          {SECURITY_TOOLS.map((tool) => (
            <div key={tool} className="flex items-center space-x-2">
              <Checkbox
                id={tool}
                checked={data.securityToolsProficiency.includes(tool)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setData(prev => ({ ...prev, securityToolsProficiency: [...prev.securityToolsProficiency, tool] }));
                  } else {
                    setData(prev => ({ ...prev, securityToolsProficiency: prev.securityToolsProficiency.filter(t => t !== tool) }));
                  }
                }}
              />
              <Label htmlFor={tool} className="text-sm">{tool}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="certifications">Certifications (one per line)</Label>
        <Textarea
          id="certifications"
          value={data.certifications.join('\n')}
          onChange={(e) => setData(prev => ({ ...prev, certifications: e.target.value.split('\n').filter(c => c.trim()) }))}
          placeholder="e.g., Certified Ethereum Developer&#10;ConsenSys Blockchain Security&#10;Smart Contract Auditor Certificate"
          className="mt-1"
        />
      </div>

      <div>
        <Label htmlFor="technicalSkills">Additional Technical Skills (one per line)</Label>
        <Textarea
          id="technicalSkills"
          value={data.technicalSkills.join('\n')}
          onChange={(e) => setData(prev => ({ ...prev, technicalSkills: e.target.value.split('\n').filter(s => s.trim()) }))}
          placeholder="e.g., Solidity&#10;Rust&#10;Go&#10;Cryptography&#10;Game Theory"
          className="mt-1"
        />
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Portfolio Projects</h3>
          <p className="text-sm text-muted-foreground">Showcase your best audit work</p>
        </div>
        <Button onClick={() => setIsAddingProject(true)} disabled={isAddingProject}>
          <Plus className="h-4 w-4 mr-2" />
          Add Project
        </Button>
      </div>

      {isAddingProject && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle>Add New Project</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="projectTitle">Project Title</Label>
                <Input
                  id="projectTitle"
                  value={currentProject.title || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="e.g., DeFi Lending Protocol Audit"
                />
              </div>
              <div>
                <Label htmlFor="projectType">Project Type</Label>
                <Select
                  value={currentProject.projectType}
                  onValueChange={(value) => setCurrentProject(prev => ({ ...prev, projectType: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    {PROJECT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="projectDescription">Description</Label>
              <Textarea
                id="projectDescription"
                value={currentProject.description || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the project, scope, and your role..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="codeSize">Code Size (lines)</Label>
                <Input
                  id="codeSize"
                  type="number"
                  value={currentProject.codeSize || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, codeSize: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="vulnerabilities">Vulnerabilities Found</Label>
                <Input
                  id="vulnerabilities"
                  type="number"
                  value={currentProject.vulnerabilitiesFound || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, vulnerabilitiesFound: parseInt(e.target.value) || 0 }))}
                />
              </div>
              <div>
                <Label htmlFor="outcome">Outcome</Label>
                <Input
                  id="outcome"
                  value={currentProject.outcome || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, outcome: e.target.value }))}
                  placeholder="e.g., Successfully audited, 5 critical issues fixed"
                />
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2">
              <div>
                <Label>Critical</Label>
                <Input
                  type="number"
                  value={currentProject.severity?.critical || 0}
                  onChange={(e) => setCurrentProject(prev => ({
                    ...prev,
                    severity: { ...prev.severity!, critical: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div>
                <Label>High</Label>
                <Input
                  type="number"
                  value={currentProject.severity?.high || 0}
                  onChange={(e) => setCurrentProject(prev => ({
                    ...prev,
                    severity: { ...prev.severity!, high: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div>
                <Label>Medium</Label>
                <Input
                  type="number"
                  value={currentProject.severity?.medium || 0}
                  onChange={(e) => setCurrentProject(prev => ({
                    ...prev,
                    severity: { ...prev.severity!, medium: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div>
                <Label>Low</Label>
                <Input
                  type="number"
                  value={currentProject.severity?.low || 0}
                  onChange={(e) => setCurrentProject(prev => ({
                    ...prev,
                    severity: { ...prev.severity!, low: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
              <div>
                <Label>Info</Label>
                <Input
                  type="number"
                  value={currentProject.severity?.informational || 0}
                  onChange={(e) => setCurrentProject(prev => ({
                    ...prev,
                    severity: { ...prev.severity!, informational: parseInt(e.target.value) || 0 }
                  }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="reportUrl">Report URL (optional)</Label>
                <Input
                  id="reportUrl"
                  type="url"
                  value={currentProject.reportUrl || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, reportUrl: e.target.value }))}
                  placeholder="https://example.com/audit-report"
                />
              </div>
              <div>
                <Label htmlFor="githubUrl">GitHub URL (optional)</Label>
                <Input
                  id="githubUrl"
                  type="url"
                  value={currentProject.githubUrl || ''}
                  onChange={(e) => setCurrentProject(prev => ({ ...prev, githubUrl: e.target.value }))}
                  placeholder="https://github.com/project/repo"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="testimonial">Client Testimonial (optional)</Label>
              <Textarea
                id="testimonial"
                value={currentProject.clientTestimonial || ''}
                onChange={(e) => setCurrentProject(prev => ({ ...prev, clientTestimonial: e.target.value }))}
                placeholder="What did the client say about your work?"
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={addProject}>Add Project</Button>
              <Button variant="outline" onClick={() => setIsAddingProject(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {data.projects.map((project) => (
          <Card key={project.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {project.title}
                    <Badge variant="secondary">{PROJECT_TYPES.find(t => t.value === project.projectType)?.label}</Badge>
                  </CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeProject(project.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Vulnerabilities Found:</strong> {project.vulnerabilitiesFound}
                </div>
                <div>
                  <strong>Code Size:</strong> {project.codeSize.toLocaleString()} lines
                </div>
                <div>
                  <strong>Outcome:</strong> {project.outcome}
                </div>
                <div className="flex gap-1">
                  {project.reportUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-3 w-3 mr-1" />
                        Report
                      </a>
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 mr-1" />
                        Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              {project.clientTestimonial && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <p className="text-sm italic">"{project.clientTestimonial}"</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderProfessionalLinks = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="github" className="flex items-center gap-2">
            <Github className="h-4 w-4" />
            GitHub Username
          </Label>
          <Input
            id="github"
            value={data.githubUsername}
            onChange={(e) => setData(prev => ({ ...prev, githubUsername: e.target.value }))}
            placeholder="yourusername"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn Profile URL
          </Label>
          <Input
            id="linkedin"
            type="url"
            value={data.linkedinUrl}
            onChange={(e) => setData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
            placeholder="https://linkedin.com/in/yourprofile"
            className="mt-1"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Personal Website
          </Label>
          <Input
            id="website"
            type="url"
            value={data.personalWebsite}
            onChange={(e) => setData(prev => ({ ...prev, personalWebsite: e.target.value }))}
            placeholder="https://yourwebsite.com"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="twitter">Twitter Handle</Label>
          <Input
            id="twitter"
            value={data.twitterHandle}
            onChange={(e) => setData(prev => ({ ...prev, twitterHandle: e.target.value }))}
            placeholder="@yourusername"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderPortfolioSettings = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="isPublic"
            checked={data.isPublic}
            onCheckedChange={(checked) => setData(prev => ({ ...prev, isPublic: !!checked }))}
          />
          <Label htmlFor="isPublic">Make portfolio publicly visible</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="allowContact"
            checked={data.allowClientContact}
            onCheckedChange={(checked) => setData(prev => ({ ...prev, allowClientContact: !!checked }))}
          />
          <Label htmlFor="allowContact">Allow clients to contact me directly</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showRates"
            checked={data.showRates}
            onCheckedChange={(checked) => setData(prev => ({ ...prev, showRates: !!checked }))}
          />
          <Label htmlFor="showRates">Display hourly rate range</Label>
        </div>
      </div>

      {data.showRates && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="minRate">Minimum Hourly Rate ($)</Label>
            <Input
              id="minRate"
              type="number"
              value={data.hourlyRateRange.min}
              onChange={(e) => setData(prev => ({
                ...prev,
                hourlyRateRange: { ...prev.hourlyRateRange, min: parseInt(e.target.value) || 0 }
              }))}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="maxRate">Maximum Hourly Rate ($)</Label>
            <Input
              id="maxRate"
              type="number"
              value={data.hourlyRateRange.max}
              onChange={(e) => setData(prev => ({
                ...prev,
                hourlyRateRange: { ...prev.hourlyRateRange, max: parseInt(e.target.value) || 0 }
              }))}
              className="mt-1"
            />
          </div>
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          Portfolio Benefits
        </h4>
        <ul className="text-sm space-y-1 text-blue-800">
          <li>• Attract 3x more high-value project invitations</li>
          <li>• Showcase your expertise to potential clients</li>
          <li>• Build trust with verified audit history</li>
          <li>• Increase your visibility in the auditor marketplace</li>
          <li>• Command premium rates with proven track record</li>
        </ul>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0: return renderBasicInformation();
      case 1: return renderSkillsExpertise();
      case 2: return renderProjects();
      case 3: return renderProfessionalLinks();
      case 4: return renderPortfolioSettings();
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading your portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Portfolio Creation Wizard</h1>
        <p className="text-muted-foreground">
          Create a compelling portfolio to attract premium audit opportunities
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Step {currentStep + 1} of {STEPS.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Steps Navigation */}
      <div className="flex justify-between items-center">
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          return (
            <div
              key={step.id}
              className={`flex items-center space-x-2 ${
                index === currentStep ? 'text-primary' : 
                index < currentStep ? 'text-green-600' : 'text-muted-foreground'
              }`}
            >
              <div className={`p-2 rounded-full ${
                index === currentStep ? 'bg-primary text-white' :
                index < currentStep ? 'bg-green-600 text-white' : 'bg-muted'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium hidden md:block">{step.title}</span>
            </div>
          );
        })}
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle>{STEPS[currentStep].title}</CardTitle>
          <CardDescription>
            {currentStep === 0 && "Tell us about yourself and your audit experience"}
            {currentStep === 1 && "Highlight your technical skills and expertise areas"}
            {currentStep === 2 && "Showcase your best audit projects and achievements"}
            {currentStep === 3 && "Add your professional social media and website links"}
            {currentStep === 4 && "Configure your portfolio visibility and contact settings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderCurrentStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={savePortfolio}
            disabled={isSaving}
            className="bg-gradient-to-r from-primary to-primary/80"
          >
            {isSaving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Saving Portfolio...
              </>
            ) : (
              <>
                <Trophy className="h-4 w-4 mr-2" />
                Create Portfolio
              </>
            )}
          </Button>
        ) : (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
} 