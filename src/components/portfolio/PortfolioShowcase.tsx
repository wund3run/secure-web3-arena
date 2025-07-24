import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Star, 
  Trophy, 
  Shield, 
  Code, 
  ExternalLink, 
  Github, 
  Globe, 
  Linkedin,
  MessageSquare,
  Calendar,
  DollarSign,
  TrendingUp,
  Award,
  AlertCircle,
  Eye,
  Download,
  Share2
} from 'lucide-react';

interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  projectType: string;
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
  outcome: string;
  clientTestimonial?: string;
  reportUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

interface PortfolioData {
  professionalSummary: string;
  tagline: string;
  specializations: string[];
  totalAudits: number;
  totalVulnerabilities: number;
  clientSatisfactionRate: number;
  averageProjectDuration: number;
  technicalSkills: string[];
  blockchainExpertise: string[];
  securityToolsProficiency: string[];
  certifications: string[];
  projects: PortfolioProject[];
  githubUsername: string;
  linkedinUrl: string;
  personalWebsite: string;
  twitterHandle: string;
  isPublic: boolean;
  allowClientContact: boolean;
  showRates: boolean;
  hourlyRateRange: {
    min: number;
    max: number;
  };
}

export default function PortfolioShowcase() {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOwnPortfolio, setIsOwnPortfolio] = useState(false);

  useEffect(() => {
    loadPortfolio();
  }, [slug]);

  const loadPortfolio = async () => {
    if (!slug) return;
    
    setIsLoading(true);
    try {
      // For the demo, we'll load mock data
      // In a real implementation, this would fetch from the database
      const mockPortfolioData: PortfolioData = {
        professionalSummary: "Experienced Web3 security auditor with 3+ years specializing in DeFi protocols and smart contract security. I have successfully audited over 50 projects, identifying critical vulnerabilities and helping secure over $500M in TVL.",
        tagline: "Senior Smart Contract Auditor | DeFi Security Expert",
        specializations: ["Smart Contract Security", "DeFi Protocols", "Flash Loan Attacks", "MEV Protection"],
        totalAudits: 52,
        totalVulnerabilities: 284,
        clientSatisfactionRate: 98,
        averageProjectDuration: 12,
        technicalSkills: ["Solidity", "Rust", "Foundry", "Hardhat", "Cryptography", "Game Theory"],
        blockchainExpertise: ["Ethereum", "Polygon", "Arbitrum", "Optimism", "Avalanche"],
        securityToolsProficiency: ["Slither", "Mythril", "Echidna", "Manticore", "Foundry"],
        certifications: ["Certified Ethereum Developer", "ConsenSys Blockchain Security", "Smart Contract Auditor Certificate"],
        projects: [
          {
            id: "1",
            title: "DeFi Lending Protocol Audit",
            description: "Comprehensive security audit of a major DeFi lending protocol handling $100M+ TVL",
            projectType: "defi-protocol",
            blockchain: ["Ethereum", "Polygon"],
            codeSize: 15000,
            vulnerabilitiesFound: 12,
            severity: { critical: 2, high: 3, medium: 4, low: 2, informational: 1 },
            outcome: "All critical and high severity issues resolved before mainnet deployment",
            clientTestimonial: "Outstanding work! The auditor identified critical vulnerabilities that could have resulted in significant losses. Professional, thorough, and delivered on time.",
            reportUrl: "https://example.com/audit-report-1",
            githubUrl: "https://github.com/example/protocol",
            featured: true
          },
          {
            id: "2",
            title: "Cross-Chain Bridge Security Review",
            description: "Security assessment of a multi-chain bridge protocol with focus on consensus mechanisms",
            projectType: "bridge",
            blockchain: ["Ethereum", "Arbitrum", "Polygon"],
            codeSize: 8500,
            vulnerabilitiesFound: 8,
            severity: { critical: 1, high: 2, medium: 3, low: 2, informational: 0 },
            outcome: "Protocol launched successfully with zero security incidents",
            featured: true
          }
        ],
        githubUsername: "auditor-pro",
        linkedinUrl: "https://linkedin.com/in/auditor-pro",
        personalWebsite: "https://auditor-pro.com",
        twitterHandle: "@auditor_pro",
        isPublic: true,
        allowClientContact: true,
        showRates: true,
        hourlyRateRange: { min: 150, max: 300 }
      };

      setPortfolioData(mockPortfolioData);
      setIsOwnPortfolio(user?.email?.split('@')[0] === slug?.replace('-auditor-portfolio', ''));
    } catch (error) {
      console.error('Error loading portfolio:', error);
      toast({
        title: "Error loading portfolio",
        description: "Could not load the requested portfolio",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactAuditor = () => {
    toast({
      title: "Contact feature coming soon",
      description: "Direct messaging will be available in the next update",
    });
  };

  const handleSharePortfolio = () => {
    if (navigator.share) {
      navigator.share({
        title: `${portfolioData?.tagline} - Portfolio`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "Portfolio link copied to clipboard",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
          <p>Loading portfolio...</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Portfolio Not Found</h2>
        <p className="text-muted-foreground mb-6">The requested portfolio could not be found.</p>
        <Button onClick={() => navigate('/auditor/opportunities')}>
          Browse Auditor Opportunities
        </Button>
      </div>
    );
  }

  const totalVulnerabilitiesByProject = portfolioData.projects.reduce((acc, project) => {
    acc.critical += project.severity.critical;
    acc.high += project.severity.high;
    acc.medium += project.severity.medium;
    acc.low += project.severity.low;
    acc.informational += project.severity.informational;
    return acc;
  }, { critical: 0, high: 0, medium: 0, low: 0, informational: 0 });

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-4">
          <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/60 rounded-full flex items-center justify-center">
            <Shield className="h-10 w-10 text-white" />
          </div>
          <div className="text-left">
            <h1 className="text-3xl font-bold">{portfolioData.tagline}</h1>
            <p className="text-muted-foreground">Professional Security Auditor</p>
          </div>
        </div>
        
        <div className="flex justify-center gap-2">
          {portfolioData.allowClientContact && (
            <Button onClick={handleContactAuditor}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Contact Auditor
            </Button>
          )}
          <Button variant="outline" onClick={handleSharePortfolio}>
            <Share2 className="h-4 w-4 mr-2" />
            Share Portfolio
          </Button>
          {isOwnPortfolio && (
            <Button variant="outline" onClick={() => navigate('/portfolio/create')}>
              Edit Portfolio
            </Button>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{portfolioData.totalAudits}</div>
            <div className="text-sm text-muted-foreground">Audits Completed</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{portfolioData.totalVulnerabilities}</div>
            <div className="text-sm text-muted-foreground">Vulnerabilities Found</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{portfolioData.clientSatisfactionRate}%</div>
            <div className="text-sm text-muted-foreground">Client Satisfaction</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">{portfolioData.averageProjectDuration}</div>
            <div className="text-sm text-muted-foreground">Avg. Days per Audit</div>
          </CardContent>
        </Card>
      </div>

      {/* Rate Information */}
      {portfolioData.showRates && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="h-5 w-5 text-green-600" />
              <span className="font-semibold">Hourly Rate Range</span>
            </div>
            <div className="text-2xl font-bold text-green-600">
              ${portfolioData.hourlyRateRange.min} - ${portfolioData.hourlyRateRange.max} USD
            </div>
            <p className="text-sm text-muted-foreground">Rate varies based on project complexity and timeline</p>
          </CardContent>
        </Card>
      )}

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{portfolioData.professionalSummary}</p>
        </CardContent>
      </Card>

      {/* Specializations & Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Specializations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {portfolioData.specializations.map((spec, index) => (
                <Badge key={index} variant="secondary">{spec}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Blockchain Expertise</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {portfolioData.blockchainExpertise.map((blockchain, index) => (
                <Badge key={index} variant="outline">{blockchain}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Featured Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Featured Portfolio Projects</CardTitle>
          <CardDescription>Showcase of recent security audits and achievements</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {portfolioData.projects.filter(p => p.featured).map((project) => (
            <div key={project.id} className="border rounded-lg p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                </div>
                <Badge variant="secondary">{project.projectType}</Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <div className="text-sm text-muted-foreground">Code Size</div>
                  <div className="font-semibold">{project.codeSize.toLocaleString()} lines</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Issues Found</div>
                  <div className="font-semibold">{project.vulnerabilitiesFound}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Blockchains</div>
                  <div className="flex flex-wrap gap-1">
                    {project.blockchain.slice(0, 2).map((chain, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">{chain}</Badge>
                    ))}
                    {project.blockchain.length > 2 && (
                      <span className="text-xs text-muted-foreground">+{project.blockchain.length - 2}</span>
                    )}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Outcome</div>
                  <div className="font-semibold text-sm">{project.outcome}</div>
                </div>
              </div>

              {/* Severity Breakdown */}
              <div className="flex gap-4 mb-4">
                <div className="text-center">
                  <div className="text-red-600 font-bold">{project.severity.critical}</div>
                  <div className="text-xs text-muted-foreground">Critical</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-600 font-bold">{project.severity.high}</div>
                  <div className="text-xs text-muted-foreground">High</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-600 font-bold">{project.severity.medium}</div>
                  <div className="text-xs text-muted-foreground">Medium</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-600 font-bold">{project.severity.low}</div>
                  <div className="text-xs text-muted-foreground">Low</div>
                </div>
              </div>

              {project.clientTestimonial && (
                <div className="bg-muted p-4 rounded-lg mb-4">
                  <p className="italic">"{project.clientTestimonial}"</p>
                </div>
              )}

              <div className="flex gap-2">
                {project.reportUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.reportUrl} target="_blank" rel="noopener noreferrer">
                      <Eye className="h-3 w-3 mr-1" />
                      View Report
                    </a>
                  </Button>
                )}
                {project.githubUrl && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-3 w-3 mr-1" />
                      View Code
                    </a>
                  </Button>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Technical Skills & Certifications */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Security Tools</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {portfolioData.securityToolsProficiency.map((tool, index) => (
                <Badge key={index} variant="outline">{tool}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {portfolioData.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm">{cert}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Professional Links */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Links</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {portfolioData.githubUsername && (
              <Button variant="outline" size="sm" asChild>
                <a href={`https://github.com/${portfolioData.githubUsername}`} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              </Button>
            )}
            {portfolioData.linkedinUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={portfolioData.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              </Button>
            )}
            {portfolioData.personalWebsite && (
              <Button variant="outline" size="sm" asChild>
                <a href={portfolioData.personalWebsite} target="_blank" rel="noopener noreferrer">
                  <Globe className="h-4 w-4 mr-2" />
                  Website
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 