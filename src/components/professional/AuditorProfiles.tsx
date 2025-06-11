
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, MapPin, Clock, CheckCircle, Award, Shield, Globe } from 'lucide-react';

interface AuditorProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  completedAudits: number;
  specializations: string[];
  certifications: string[];
  location: string;
  responseTime: string;
  hourlyRate: string;
  languages: string[];
  availability: 'available' | 'busy' | 'unavailable';
  description: string;
  recentWork: string[];
  verificationLevel: 'basic' | 'enhanced' | 'premium';
}

const featuredAuditors: AuditorProfile[] = [
  {
    id: '1',
    name: 'Dr. Alexandra Petrov',
    title: 'Senior Security Researcher',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332e234?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 87,
    completedAudits: 120,
    specializations: ['DeFi Protocols', 'Cross-chain Bridges', 'AMM Security'],
    certifications: ['CISSP', 'OSCP', 'Certified Ethereum Developer'],
    location: 'London, UK',
    responseTime: '2 hours',
    hourlyRate: '$200-350',
    languages: ['English', 'Russian', 'German'],
    availability: 'available',
    description: 'PhD in Computer Security with 8+ years in blockchain security. Specialized in complex DeFi protocols and has discovered critical vulnerabilities in major protocols.',
    recentWork: ['Uniswap V4 Review', 'Aave Protocol Enhancement', 'Cross-chain Bridge Audit'],
    verificationLevel: 'premium'
  },
  {
    id: '2',
    name: 'Marcus Chen',
    title: 'Blockchain Security Engineer',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 112,
    completedAudits: 95,
    specializations: ['Smart Contracts', 'Gas Optimization', 'MEV Protection'],
    certifications: ['Consensys Academy', 'ChainSecurity Certified', 'SANS SEC541'],
    location: 'Singapore',
    responseTime: '4 hours',
    hourlyRate: '$150-280',
    languages: ['English', 'Mandarin', 'Japanese'],
    availability: 'available',
    description: 'Former smart contract developer turned security expert. Exceptional at finding edge cases and gas optimization opportunities.',
    recentWork: ['OpenSea Contract Review', 'Polygon Bridge Audit', 'Layer 2 Security Analysis'],
    verificationLevel: 'enhanced'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    title: 'DeFi Security Specialist',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 76,
    completedAudits: 88,
    specializations: ['Yield Farming', 'Governance Tokens', 'Flash Loan Attacks'],
    certifications: ['Trail of Bits Certified', 'DeFi Security Course', 'Bug Bounty Expert'],
    location: 'Austin, TX',
    responseTime: '3 hours',
    hourlyRate: '$180-320',
    languages: ['English', 'Spanish'],
    availability: 'busy',
    description: 'DeFi-focused security researcher with extensive experience in yield protocols and governance mechanisms. Active bug bounty hunter.',
    recentWork: ['Compound III Audit', 'Curve Finance Review', 'Yearn Strategy Security'],
    verificationLevel: 'premium'
  },
  {
    id: '4',
    name: 'Raj Sharma',
    title: 'Full-Stack Web3 Auditor',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 4.7,
    reviewCount: 93,
    completedAudits: 110,
    specializations: ['dApp Security', 'Frontend Security', 'Wallet Integration'],
    certifications: ['OWASP Certified', 'React Security Expert', 'Web3 Security Specialist'],
    location: 'Mumbai, India',
    responseTime: '1 hour',
    hourlyRate: '$120-220',
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'available',
    description: 'Comprehensive Web3 security expert covering both smart contracts and frontend applications. Excellent at identifying UI/UX security issues.',
    recentWork: ['MetaMask Integration Audit', 'DEX Frontend Review', 'Mobile Wallet Security'],
    verificationLevel: 'enhanced'
  },
  {
    id: '5',
    name: 'Elena Volkov',
    title: 'Cryptography & Protocol Expert',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
    rating: 5.0,
    reviewCount: 45,
    completedAudits: 67,
    specializations: ['Zero-Knowledge Proofs', 'Consensus Mechanisms', 'Privacy Protocols'],
    certifications: ['PhD Cryptography', 'zk-SNARK Expert', 'Formal Verification Specialist'],
    location: 'Berlin, Germany',
    responseTime: '6 hours',
    hourlyRate: '$250-400',
    languages: ['English', 'Russian', 'German'],
    availability: 'available',
    description: 'PhD in Cryptography with deep expertise in zero-knowledge protocols and formal verification. Ideal for privacy-focused and complex cryptographic projects.',
    recentWork: ['Zcash Protocol Review', 'StarkWare Audit', 'Privacy Coin Analysis'],
    verificationLevel: 'premium'
  },
  {
    id: '6',
    name: 'James Mitchell',
    title: 'Game Security & NFT Expert',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 68,
    completedAudits: 85,
    specializations: ['GameFi Security', 'NFT Contracts', 'Tokenomics Analysis'],
    certifications: ['Game Security Expert', 'NFT Specialist', 'Economic Security Analyst'],
    location: 'Vancouver, Canada',
    responseTime: '4 hours',
    hourlyRate: '$160-290',
    languages: ['English', 'French'],
    availability: 'available',
    description: 'Specialized in GameFi and NFT ecosystem security. Expert in complex tokenomics and gaming economic models.',
    recentWork: ['Axie Infinity Review', 'CryptoPunks Analysis', 'Play-to-Earn Audit'],
    verificationLevel: 'enhanced'
  }
];

export function AuditorProfiles() {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'text-green-600 bg-green-50';
      case 'busy': return 'text-orange-600 bg-orange-50';
      case 'unavailable': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getVerificationIcon = (level: string) => {
    switch (level) {
      case 'premium': return <Award className="h-4 w-4 text-purple-500" />;
      case 'enhanced': return <Shield className="h-4 w-4 text-blue-500" />;
      default: return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Expert Security Auditors</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Connect with certified blockchain security professionals. All auditors are thoroughly vetted, 
          with verified credentials and proven track records in Web3 security.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAuditors.map((auditor) => (
          <Card key={auditor.id} className="relative overflow-hidden hover:shadow-lg transition-all">
            <div className="absolute top-4 right-4 flex gap-2">
              {getVerificationIcon(auditor.verificationLevel)}
              <Badge 
                variant="outline" 
                className={`text-xs ${getAvailabilityColor(auditor.availability)}`}
              >
                {auditor.availability}
              </Badge>
            </div>

            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={auditor.avatar} alt={auditor.name} />
                  <AvatarFallback>{auditor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-lg leading-tight">{auditor.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{auditor.title}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {renderStars(auditor.rating)}
                    <span className="text-sm text-muted-foreground ml-1">
                      {auditor.rating} ({auditor.reviewCount})
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {auditor.description}
              </p>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                  <span>{auditor.completedAudits} audits</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3 text-blue-500" />
                  <span>{auditor.responseTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-500" />
                  <span>{auditor.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-3 w-3 text-purple-500" />
                  <span>{auditor.languages.length} languages</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Specializations</h4>
                <div className="flex flex-wrap gap-1">
                  {auditor.specializations.slice(0, 3).map((spec, index) => (
                    <Badge key={index} variant="secondary" className="text-xs px-2 py-0">
                      {spec}
                    </Badge>
                  ))}
                  {auditor.specializations.length > 3 && (
                    <Badge variant="outline" className="text-xs px-2 py-0">
                      +{auditor.specializations.length - 3}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-2">Recent Work</h4>
                <div className="space-y-1">
                  {auditor.recentWork.slice(0, 2).map((work, index) => (
                    <div key={index} className="text-xs text-muted-foreground flex items-center gap-1">
                      <div className="h-1 w-1 bg-primary rounded-full"></div>
                      {work}
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Rate</span>
                  <span className="font-semibold text-primary">{auditor.hourlyRate}/hr</span>
                </div>
                
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    View Profile
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    Contact
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline" size="lg">
          View All Auditors
        </Button>
      </div>
    </div>
  );
}
