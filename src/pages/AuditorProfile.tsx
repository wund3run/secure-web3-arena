import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ProductionLayout } from '@/components/layout/ProductionLayout';
import { HawklyCard, SecurityBadge, ProgressIndicator } from '@/components/ui/hawkly-components';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Avatar, 
  AvatarFallback, 
  AvatarImage 
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';

import {
  Shield,
  Award,
  Star,
  Clock,
  Calendar,
  CheckCircle,
  ExternalLink,
  MapPin,
  Globe,
  Briefcase,
  BookOpen,
  MessageCircle,
  FileText,
  TrendingUp,
  Code,
  AlertTriangle,
  Wallet,
  Users
} from 'lucide-react';

// Mock data for the auditor profile
const mockAuditorData = {
  id: '1',
  fullName: 'Alex Thompson',
  displayName: 'ethsecguru',
  avatar: 'https://avatars.githubusercontent.com/u/12345678',
  bio: 'Senior security researcher with 6+ years experience in smart contract auditing. Specialized in DeFi protocols and NFT marketplaces. Previously security lead at EthSecurity and contributor to OpenZeppelin.',
  location: 'Berlin, Germany',
  website: 'https://alexthompson.dev',
  github: 'ethsecguru',
  twitter: '@ethsecguru',
  joinedDate: '2022-03-15',
  verificationStatus: 'Verified',
  availableForWork: true,
  responseTime: '2 hours',
  completionRate: 98,
  auditCount: 87,
  criticalVulnsFound: 134,
  highVulnsFound: 256,
  averageRating: 4.92,
  reviewCount: 76,
  ratingDistribution: {
    5: 62,
    4: 10,
    3: 3,
    2: 1,
    1: 0
  },
  expertise: [
    { name: 'Solidity', proficiency: 98 },
    { name: 'ERC Standards', proficiency: 95 },
    { name: 'DeFi Protocols', proficiency: 94 },
    { name: 'NFTs & Marketplaces', proficiency: 90 },
    { name: 'DAO Governance', proficiency: 88 },
    { name: 'Bridges & Cross-Chain', proficiency: 85 },
    { name: 'Vyper', proficiency: 80 },
    { name: 'ZK Proofs', proficiency: 75 }
  ],
  certifications: [
    { name: 'Certified Blockchain Security Professional', issuer: 'Blockchain Council', year: 2023 },
    { name: 'Ethereum Smart Contract Security Certification', issuer: 'ConsenSys', year: 2022 },
    { name: 'Advanced Solidity Security', issuer: 'OpenZeppelin', year: 2021 }
  ],
  recentAudits: [
    { 
      id: 'a1', 
      projectName: 'DeFiLend Protocol', 
      projectType: 'DeFi Lending',
      date: '2023-06-15',
      vulnsFound: 12,
      criticalIssues: 2,
      highIssues: 4,
      logo: '/project-logos/defi-lend.png'
    },
    { 
      id: 'a2', 
      projectName: 'MetaWorld NFT', 
      projectType: 'NFT Marketplace',
      date: '2023-05-22',
      vulnsFound: 8,
      criticalIssues: 1,
      highIssues: 3,
      logo: '/project-logos/metaworld.png'
    },
    { 
      id: 'a3', 
      projectName: 'ChainBridge', 
      projectType: 'Cross-chain Bridge',
      date: '2023-04-10',
      vulnsFound: 15,
      criticalIssues: 3,
      highIssues: 5,
      logo: '/project-logos/chainbridge.png'
    }
  ],
  publications: [
    { 
      title: 'Common DeFi Vulnerabilities and How to Prevent Them', 
      publisher: 'Ethereum Research',
      date: '2023-03-15',
      link: 'https://example.com/defi-vulnerabilities'
    },
    { 
      title: 'Audit Methodology for Complex Protocol Systems', 
      publisher: 'Security Blog',
      date: '2022-11-04',
      link: 'https://example.com/audit-methodology'
    }
  ],
  reviews: [
    {
      id: 'r1',
      clientName: 'DeFi Protocol Inc.',
      clientAvatar: '/client-logos/defi-protocol.png',
      rating: 5,
      date: '2023-06-18',
      text: 'Alex provided an extremely thorough audit of our lending protocol. Identified several critical vulnerabilities that could have resulted in significant fund loss. Communication was excellent throughout the process.'
    },
    {
      id: 'r2',
      clientName: 'NFT Marketplace',
      clientAvatar: '/client-logos/nft-market.png',
      rating: 5,
      date: '2023-05-30',
      text: 'Great attention to detail. Found issues that other auditors missed. Provided clear explanations and recommendations for fixing each issue.'
    },
    {
      id: 'r3',
      clientName: 'TokenSwap',
      clientAvatar: '/client-logos/tokenswap.png',
      rating: 4,
      date: '2023-04-15',
      text: 'Thorough analysis of our exchange contracts. Good recommendations for gas optimization in addition to security findings.'
    }
  ]
};

const AuditorProfile = () => {
  const { auditorId } = useParams<{ auditorId: string }>();
  const [auditor, setAuditor] = useState(mockAuditorData);
  const [activeTab, setActiveTab] = useState('overview');

  // In a real implementation, we would fetch the auditor data based on the ID
  useEffect(() => {
    // Fetch auditor data here
    // For now, we use mock data
  }, [auditorId]);

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateTotalReviews = () => {
    return Object.values(auditor.ratingDistribution).reduce((a, b) => a + b, 0);
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-400'
            }`}
          />
        ))}
        <span className="ml-2 text-sm font-medium text-slate-200">
          {rating.toFixed(1)}
        </span>
      </div>
    );
  };

  return (
    <ProductionLayout
      title={`${auditor.fullName} | Auditor Profile | Hawkly`}
      description={`View ${auditor.fullName}'s security auditor profile, expertise, and portfolio on Hawkly.`}
    >
      <div className="container max-w-7xl mx-auto px-4 py-8">
        {/* Header section */}
        <HawklyCard variant="glass" elevation="subtle" className="mb-8 p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center md:items-start gap-2">
              <Avatar className="h-24 w-24 md:h-32 md:w-32 border-2 border-purple-500/50">
                <AvatarImage src={auditor.avatar} alt={auditor.fullName} />
                <AvatarFallback className="text-2xl">{getInitials(auditor.fullName)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-center md:items-start mt-2">
                <SecurityBadge level="enterprise" verified={true} size="lg" />
                <Badge variant="outline" className="mt-2 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Responds in {auditor.responseTime}
                </Badge>
              </div>
            </div>
            
            <div className="flex-1 space-y-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-3xl font-bold text-slate-50">{auditor.fullName}</h1>
                  <Badge variant="secondary" className="text-sm">@{auditor.displayName}</Badge>
                  {auditor.availableForWork && (
                    <Badge variant="default" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
                      Available for Work
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1 text-slate-300">
                  <div className="flex items-center">
                    <Shield className="h-4 w-4 mr-1" />
                    <span>{auditor.auditCount} Audits</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>{auditor.criticalVulnsFound + auditor.highVulnsFound} Vulnerabilities Found</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                    <span>{auditor.averageRating} ({auditor.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
              
              <p className="text-slate-300">{auditor.bio}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300">
                {auditor.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1 text-slate-400" />
                    <span>{auditor.location}</span>
                  </div>
                )}
                {auditor.website && (
                  <div className="flex items-center">
                    <Globe className="h-4 w-4 mr-1 text-slate-400" />
                    <a href={auditor.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      {auditor.website.replace('https://', '')}
                    </a>
                  </div>
                )}
                {auditor.github && (
                  <div className="flex items-center">
                    <Code className="h-4 w-4 mr-1 text-slate-400" />
                    <a href={`https://github.com/${auditor.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
                      {auditor.github}
                    </a>
                  </div>
                )}
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-slate-400" />
                  <span>Member since {formatDate(auditor.joinedDate)}</span>
                </div>
              </div>
              
              <div className="pt-2 flex flex-wrap gap-2">
                <Button variant="outline" className="gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact
                </Button>
                <Button className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Briefcase className="h-4 w-4" />
                  Request Audit
                </Button>
              </div>
            </div>
          </div>
        </HawklyCard>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main column */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="w-full mb-6 bg-slate-800/60">
                <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
                <TabsTrigger value="expertise" className="flex-1">Expertise</TabsTrigger>
                <TabsTrigger value="portfolio" className="flex-1">Portfolio</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {/* Key Stats */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Key Statistics
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-400">{auditor.auditCount}</div>
                      <div className="text-xs text-slate-400">Audits Completed</div>
                    </div>
                    <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-red-400">{auditor.criticalVulnsFound}</div>
                      <div className="text-xs text-slate-400">Critical Findings</div>
                    </div>
                    <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-amber-400">{auditor.highVulnsFound}</div>
                      <div className="text-xs text-slate-400">High Severity Findings</div>
                    </div>
                    <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-emerald-400">{auditor.completionRate}%</div>
                      <div className="text-xs text-slate-400">Completion Rate</div>
                    </div>
                  </div>
                </HawklyCard>
                
                {/* Recent Audits */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Recent Audits
                  </h2>
                  <div className="space-y-4">
                    {auditor.recentAudits.map((audit) => (
                      <div key={audit.id} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                              {audit.logo ? (
                                <img src={audit.logo} alt={audit.projectName} className="h-8 w-8 rounded-full" />
                              ) : (
                                <Code className="h-5 w-5 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium text-slate-200">{audit.projectName}</h3>
                              <p className="text-sm text-slate-400">{audit.projectType} • {formatDate(audit.date)}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-slate-300">{audit.vulnsFound} Issues Found</div>
                            <div className="flex items-center justify-end gap-2 text-xs">
                              <span className="text-red-400">{audit.criticalIssues} Critical</span>
                              <span className="text-amber-400">{audit.highIssues} High</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="pt-2">
                      <Button variant="outline" className="w-full">
                        View All Audits
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </HawklyCard>
                
                {/* Publications & Resources */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Publications & Resources
                  </h2>
                  <div className="space-y-4">
                    {auditor.publications.map((pub, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium text-slate-200">{pub.title}</h3>
                            <p className="text-sm text-slate-400">{pub.publisher} • {formatDate(pub.date)}</p>
                          </div>
                          <a 
                            href={pub.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-400 hover:text-blue-300 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        </div>
                      </div>
                    ))}
                    {auditor.publications.length === 0 && (
                      <div className="text-center py-6 text-slate-400">
                        No publications available
                      </div>
                    )}
                  </div>
                </HawklyCard>
              </TabsContent>
              
              {/* Expertise Tab */}
              <TabsContent value="expertise" className="space-y-6">
                {/* Skills & Proficiency */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Skills & Proficiency
                  </h2>
                  <div className="space-y-6">
                    {auditor.expertise.map((skill) => (
                      <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium text-slate-200">{skill.name}</span>
                          <span className="text-sm text-slate-400">{skill.proficiency}%</span>
                        </div>
                        <Progress value={skill.proficiency} className="h-2" 
                          indicatorClassName={`bg-gradient-to-r from-blue-500 to-purple-500`} 
                        />
                      </div>
                    ))}
                  </div>
                </HawklyCard>
                
                {/* Certifications */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Certifications
                  </h2>
                  <div className="space-y-4">
                    {auditor.certifications.map((cert, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center">
                            <Award className="h-5 w-5 text-amber-400" />
                          </div>
                          <div>
                            <h3 className="font-medium text-slate-200">{cert.name}</h3>
                            <p className="text-sm text-slate-400">{cert.issuer} • {cert.year}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    {auditor.certifications.length === 0 && (
                      <div className="text-center py-6 text-slate-400">
                        No certifications available
                      </div>
                    )}
                  </div>
                </HawklyCard>
              </TabsContent>
              
              {/* Portfolio Tab */}
              <TabsContent value="portfolio" className="space-y-6">
                {/* Project Types */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Audit Portfolio
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-slate-200 mb-3">Project Types</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-400">42</div>
                          <div className="text-xs text-slate-400">DeFi Protocols</div>
                        </div>
                        <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-400">23</div>
                          <div className="text-xs text-slate-400">NFT Projects</div>
                        </div>
                        <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-emerald-400">12</div>
                          <div className="text-xs text-slate-400">DAOs</div>
                        </div>
                        <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-amber-400">8</div>
                          <div className="text-xs text-slate-400">Bridges</div>
                        </div>
                        <div className="bg-slate-800/70 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-red-400">2</div>
                          <div className="text-xs text-slate-400">L1/L2 Infrastructure</div>
                        </div>
                      </div>
                    </div>
                    
                    <Separator className="bg-slate-700/50" />
                    
                    <div>
                      <h3 className="font-medium text-slate-200 mb-3">Featured Projects</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4].map((i) => (
                          <HawklyCard key={i} variant="interactive" elevation="subtle" className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="h-12 w-12 rounded-lg bg-slate-700 flex items-center justify-center">
                                <Code className="h-6 w-6 text-slate-400" />
                              </div>
                              <div>
                                <h4 className="font-medium text-slate-200">Example Project {i}</h4>
                                <p className="text-xs text-slate-400">High-risk DeFi protocol audit with $2M TVL</p>
                              </div>
                            </div>
                          </HawklyCard>
                        ))}
                      </div>
                      <div className="pt-4">
                        <Button variant="outline" className="w-full">
                          View Full Portfolio
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </HawklyCard>
                
                {/* Vulnerability Findings */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Vulnerability Findings
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h3 className="font-medium text-slate-200 mb-3">Findings by Severity</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-red-500">{auditor.criticalVulnsFound}</div>
                          <div className="text-xs text-slate-400">Critical</div>
                        </div>
                        <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-amber-500">{auditor.highVulnsFound}</div>
                          <div className="text-xs text-slate-400">High</div>
                        </div>
                        <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-yellow-500">219</div>
                          <div className="text-xs text-slate-400">Medium</div>
                        </div>
                        <div className="bg-slate-800/70 p-3 rounded-lg text-center">
                          <div className="text-xl font-bold text-blue-500">347</div>
                          <div className="text-xs text-slate-400">Low/Info</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h3 className="font-medium text-slate-200 mb-3">Common Finding Types</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-300">Reentrancy</span>
                          <span className="text-xs text-slate-400">42 findings</span>
                        </div>
                        <Progress value={42} max={100} className="h-2" 
                          indicatorClassName="bg-gradient-to-r from-red-500 to-red-400" 
                        />
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-slate-300">Access Control</span>
                          <span className="text-xs text-slate-400">38 findings</span>
                        </div>
                        <Progress value={38} max={100} className="h-2" 
                          indicatorClassName="bg-gradient-to-r from-amber-500 to-amber-400" 
                        />
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-slate-300">Arithmetic Issues</span>
                          <span className="text-xs text-slate-400">31 findings</span>
                        </div>
                        <Progress value={31} max={100} className="h-2" 
                          indicatorClassName="bg-gradient-to-r from-yellow-500 to-yellow-400" 
                        />
                        
                        <div className="flex justify-between items-center mt-3">
                          <span className="text-sm text-slate-300">Logic Flaws</span>
                          <span className="text-xs text-slate-400">27 findings</span>
                        </div>
                        <Progress value={27} max={100} className="h-2" 
                          indicatorClassName="bg-gradient-to-r from-blue-500 to-blue-400" 
                        />
                      </div>
                    </div>
                  </div>
                </HawklyCard>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="space-y-6">
                {/* Review Summary */}
                <HawklyCard variant="glass" elevation="subtle" className="p-6">
                  <h2 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                    Client Reviews
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                    <div className="md:col-span-4">
                      <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                        <div className="text-5xl font-bold text-yellow-400">{auditor.averageRating.toFixed(1)}</div>
                        <div className="flex justify-center my-2">
                          {renderStarRating(auditor.averageRating)}
                        </div>
                        <div className="text-sm text-slate-400">{calculateTotalReviews()} total reviews</div>
                      </div>
                    </div>
                    
                    <div className="md:col-span-8 space-y-2">
                      {Object.entries(auditor.ratingDistribution)
                        .sort(([a], [b]) => Number(b) - Number(a))
                        .map(([rating, count]) => {
                          const percentage = (count / calculateTotalReviews()) * 100;
                          return (
                            <div key={rating} className="flex items-center gap-2">
                              <div className="text-sm text-slate-300 w-12">{rating} stars</div>
                              <div className="flex-1">
                                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-400" 
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                              <div className="text-sm text-slate-400 w-12 text-right">{count}</div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </HawklyCard>
                
                {/* Review List */}
                <div className="space-y-4">
                  {auditor.reviews.map((review) => (
                    <HawklyCard key={review.id} variant="glass" elevation="subtle" className="p-6">
                      <div className="flex justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.clientAvatar} alt={review.clientName} />
                            <AvatarFallback>{getInitials(review.clientName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-slate-200">{review.clientName}</h3>
                            <p className="text-sm text-slate-400">{formatDate(review.date)}</p>
                          </div>
                        </div>
                        {renderStarRating(review.rating)}
                      </div>
                      <p className="text-slate-300">{review.text}</p>
                    </HawklyCard>
                  ))}
                  
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      View All Reviews
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              {/* Availability Card */}
              <HawklyCard variant="glass" elevation="subtle" glow={true} className="p-6">
                <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                  Hire This Auditor
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200">Availability</span>
                    <Badge variant={auditor.availableForWork ? "default" : "secondary"}>
                      {auditor.availableForWork ? 'Available Now' : 'Unavailable'}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200">Response Time</span>
                    <span className="text-slate-300">{auditor.responseTime}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-slate-200">Completion Rate</span>
                    <span className="text-slate-300">{auditor.completionRate}%</span>
                  </div>
                  
                  <Separator className="bg-slate-700/50" />
                  
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Request Audit
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Auditor
                  </Button>
                </div>
              </HawklyCard>
              
              {/* Areas of Expertise */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Areas of Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-slate-800/50">Solidity</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">DeFi</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">Lending Protocols</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">NFT</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">DAO</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">Cross-chain</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">ERC Standards</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">Zero Knowledge</Badge>
                  <Badge variant="outline" className="bg-slate-800/50">Vyper</Badge>
                </div>
              </HawklyCard>
              
              {/* Languages & Technologies */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Languages & Technologies</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Programming Languages</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Solidity</Badge>
                      <Badge>Vyper</Badge>
                      <Badge>Rust</Badge>
                      <Badge>JavaScript</Badge>
                      <Badge>Python</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Blockchains</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Ethereum</Badge>
                      <Badge variant="outline">Polygon</Badge>
                      <Badge variant="outline">Arbitrum</Badge>
                      <Badge variant="outline">Optimism</Badge>
                      <Badge variant="outline">BSC</Badge>
                      <Badge variant="outline">Avalanche</Badge>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-300 mb-2">Tools</h4>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">Foundry</Badge>
                      <Badge variant="secondary">Hardhat</Badge>
                      <Badge variant="secondary">Slither</Badge>
                      <Badge variant="secondary">Echidna</Badge>
                      <Badge variant="secondary">MythX</Badge>
                    </div>
                  </div>
                </div>
              </HawklyCard>
              
              {/* Similar Auditors */}
              <HawklyCard variant="glass" elevation="subtle" className="p-6">
                <h3 className="text-lg font-bold mb-4 text-slate-100">Similar Auditors</h3>
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>AU</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-slate-200">Security Expert {i}</div>
                        <div className="flex items-center text-xs">
                          <Star className="h-3 w-3 text-yellow-400 fill-yellow-400 mr-1" />
                          <span>4.{8+i}</span>
                          <span className="mx-1">•</span>
                          <span>{20+i*5} audits</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </HawklyCard>
            </div>
          </div>
        </div>
      </div>
    </ProductionLayout>
  );
};

export default AuditorProfile;
