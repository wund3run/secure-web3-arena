import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  MapPin, 
  Clock, 
  Shield, 
  Zap, 
  Users,
  CheckCircle,
  Award,
  TrendingUp,
  MessageCircle,
  Calendar,
  ChevronDown
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';
import { HawklyCard, SecurityBadge, AuditorAvatar, LiveMetric } from '@/components/ui/hawkly-components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Enhanced auditor data with more detailed profiles
const auditorsData = [
  {
    id: 1,
    name: 'Alex Chen',
    title: 'Senior Smart Contract Auditor',
    avatar: '',
    rating: 4.9,
    reviewCount: 127,
    verified: true,
    online: true,
    location: 'San Francisco, CA',
    hourlyRate: 150,
    completedAudits: 89,
    responseTime: '< 2 hours',
    skills: ['Smart Contracts', 'DeFi', 'Layer 2', 'Solidity', 'Security Analysis'],
    specializations: ['DeFi Protocols', 'Flash Loan Attacks', 'MEV Protection'],
    languages: ['English', 'Mandarin'],
    certifications: ['Certified Ethereum Developer', 'ConsenSys Security Auditor'],
    bio: 'Expert smart contract auditor with 5+ years securing DeFi protocols. Specialized in complex DeFi mechanics and MEV protection strategies.',
    recentWork: [
      { project: 'UniswapV4 Integration', type: 'DeFi Protocol', completed: '2 days ago' },
      { project: 'Cross-chain Bridge', type: 'Bridge Protocol', completed: '1 week ago' }
    ],
    securityScore: 98
  },
  {
    id: 2,
    name: 'Maria Rodriguez',
    title: 'NFT & Gaming Security Expert',
    avatar: '',
    rating: 4.8,
    reviewCount: 93,
    verified: true,
    online: false,
    location: 'Barcelona, Spain',
    hourlyRate: 120,
    completedAudits: 67,
    responseTime: '< 4 hours',
    skills: ['NFT Security', 'Gaming', 'Cross-chain', 'Governance', 'Token Economics'],
    specializations: ['NFT Marketplaces', 'Gaming Economy', 'DAO Governance'],
    languages: ['Spanish', 'English', 'French'],
    certifications: ['OpenZeppelin Security Certified', 'Trail of Bits Auditor'],
    bio: 'Leading expert in NFT and gaming security with extensive experience in tokenomics and governance mechanisms.',
    recentWork: [
      { project: 'GameFi Platform', type: 'Gaming Protocol', completed: '3 days ago' },
      { project: 'NFT Marketplace', type: 'NFT Platform', completed: '5 days ago' }
    ],
    securityScore: 96
  },
  {
    id: 3,
    name: 'David Kim',
    title: 'Protocol Security Architect',
    avatar: '',
    rating: 4.9,
    reviewCount: 156,
    verified: true,
    online: true,
    location: 'Seoul, South Korea',
    hourlyRate: 180,
    completedAudits: 134,
    responseTime: '< 1 hour',
    skills: ['Protocol Security', 'MEV', 'Flash Loans', 'Cryptography', 'Zero Knowledge'],
    specializations: ['Layer 1 Protocols', 'Cryptographic Primitives', 'ZK-SNARKs'],
    languages: ['Korean', 'English', 'Japanese'],
    certifications: ['Formal Verification Expert', 'Cryptography Specialist'],
    bio: 'Protocol security architect specializing in layer 1 blockchain security and advanced cryptographic implementations.',
    recentWork: [
      { project: 'L1 Consensus Upgrade', type: 'Protocol', completed: '1 day ago' },
      { project: 'ZK-Rollup Implementation', type: 'Scaling Solution', completed: '4 days ago' }
    ],
    securityScore: 99
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    title: 'Enterprise Security Consultant',
    avatar: '',
    rating: 4.7,
    reviewCount: 84,
    verified: true,
    online: true,
    location: 'London, UK',
    hourlyRate: 200,
    completedAudits: 78,
    responseTime: '< 3 hours',
    skills: ['Enterprise Security', 'Compliance', 'Risk Assessment', 'Penetration Testing'],
    specializations: ['Enterprise Integration', 'Regulatory Compliance', 'Risk Management'],
    languages: ['English', 'German'],
    certifications: ['CISSP', 'CEH', 'ISO 27001 Lead Auditor'],
    bio: 'Enterprise security consultant helping traditional companies safely integrate blockchain technology.',
    recentWork: [
      { project: 'Banking Integration', type: 'Enterprise', completed: '2 days ago' },
      { project: 'Compliance Framework', type: 'Regulatory', completed: '1 week ago' }
    ],
    securityScore: 95
  }
];

const skillOptions = [
  'Smart Contracts', 'DeFi', 'NFT Security', 'Layer 2', 'Cross-chain', 'Governance',
  'MEV', 'Flash Loans', 'Protocol Security', 'Gaming', 'Enterprise Security',
  'Compliance', 'Cryptography', 'Zero Knowledge', 'Penetration Testing'
];

const specializationOptions = [
  'DeFi Protocols', 'NFT Marketplaces', 'Gaming Economy', 'DAO Governance',
  'Layer 1 Protocols', 'Bridge Protocols', 'Enterprise Integration'
];

export default function EnhancedAuditorMarketplace() {
  const [auditors, setAuditors] = useState(auditorsData);
  const [filteredAuditors, setFilteredAuditors] = useState(auditorsData);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedSpecializations, setSelectedSpecializations] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(false);

  // Filter and sort auditors
  useEffect(() => {
    let filtered = auditors.filter(auditor => {
      const matchesSearch = auditor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          auditor.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          auditor.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSkills = selectedSkills.length === 0 || 
                           selectedSkills.some(skill => auditor.skills.includes(skill));
      
      const matchesSpecializations = selectedSpecializations.length === 0 ||
                                   selectedSpecializations.some(spec => auditor.specializations.includes(spec));
      
      const matchesPrice = auditor.hourlyRate >= priceRange[0] && auditor.hourlyRate <= priceRange[1];

      return matchesSearch && matchesSkills && matchesSpecializations && matchesPrice;
    });

    // Sort auditors
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price_low':
          return a.hourlyRate - b.hourlyRate;
        case 'price_high':
          return b.hourlyRate - a.hourlyRate;
        case 'experience':
          return b.completedAudits - a.completedAudits;
        case 'response_time':
          return a.responseTime.localeCompare(b.responseTime);
        default:
          return 0;
      }
    });

    setFilteredAuditors(filtered);
  }, [auditors, searchQuery, selectedSkills, selectedSpecializations, priceRange, sortBy]);

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSpecializationToggle = (specialization: string) => {
    setSelectedSpecializations(prev => 
      prev.includes(specialization) 
        ? prev.filter(s => s !== specialization)
        : [...prev, specialization]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedSkills([]);
    setSelectedSpecializations([]);
    setPriceRange([0, 300]);
    setSortBy('rating');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] via-[#181f2f] to-[#212842]">
      <AppContainer className="py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-[#f8f9fb] mb-2">Expert Auditor Marketplace</h1>
              <p className="text-[#b2bfd4]">Find and connect with top Web3 security experts</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant={aiSuggestions ? "default" : "outline"}
                onClick={() => setAiSuggestions(!aiSuggestions)}
                className={aiSuggestions ? "bg-gradient-to-r from-[#a879ef] to-[#32d9fa]" : "border-[#a879ef] text-[#a879ef]"}
              >
                <Zap className="w-4 h-4 mr-2" />
                AI Matching
              </Button>
              <SecurityBadge level="enterprise" verified={true} size="lg" />
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#8391ad]" />
              <Input
                type="text"
                placeholder="Search auditors by name, skills, or expertise..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#181e2c] border-[#23283e] text-[#f8f9fb] focus:border-[#a879ef]"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="border-[#23283e] text-[#b2bfd4] hover:border-[#a879ef] hover:text-[#a879ef]"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
              <ChevronDown className="w-4 h-4 ml-2" />
            </Button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#f8f9fb] focus:border-[#a879ef] focus:outline-none"
            >
              <option value="rating">Highest Rated</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="experience">Most Experience</option>
              <option value="response_time">Fastest Response</option>
            </select>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <HawklyCard variant="glass" className="mt-4 p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Skills Filter */}
                <div>
                  <h4 className="font-medium text-[#f8f9fb] mb-3">Skills</h4>
                  <div className="flex flex-wrap gap-2">
                    {skillOptions.map(skill => (
                      <button
                        key={skill}
                        onClick={() => handleSkillToggle(skill)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          selectedSkills.includes(skill)
                            ? 'bg-[#a879ef] text-white'
                            : 'bg-[#23283e] text-[#b2bfd4] hover:bg-[#a879ef]/20'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specializations Filter */}
                <div>
                  <h4 className="font-medium text-[#f8f9fb] mb-3">Specializations</h4>
                  <div className="flex flex-wrap gap-2">
                    {specializationOptions.map(spec => (
                      <button
                        key={spec}
                        onClick={() => handleSpecializationToggle(spec)}
                        className={`px-3 py-1 rounded-full text-sm transition-all duration-300 ${
                          selectedSpecializations.includes(spec)
                            ? 'bg-[#32d9fa] text-white'
                            : 'bg-[#23283e] text-[#b2bfd4] hover:bg-[#32d9fa]/20'
                        }`}
                      >
                        {spec}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h4 className="font-medium text-[#f8f9fb] mb-3">Hourly Rate ($)</h4>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="flex-1"
                      />
                      <span className="text-[#b2bfd4] w-12">${priceRange[0]}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="flex-1"
                      />
                      <span className="text-[#b2bfd4] w-12">${priceRange[1]}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full mt-4 border-[#23283e] text-[#8391ad] hover:border-[#a879ef] hover:text-[#a879ef]"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </HawklyCard>
          )}

          {/* Results Summary */}
          <div className="flex items-center justify-between mt-6">
            <span className="text-[#b2bfd4]">
              Showing {filteredAuditors.length} of {auditors.length} auditors
            </span>
            {(selectedSkills.length > 0 || selectedSpecializations.length > 0) && (
              <span className="text-[#a879ef] text-sm">Filters applied</span>
            )}
          </div>
        </div>

        {/* AI Suggestions */}
        {aiSuggestions && (
          <HawklyCard variant="highlighted" elevation="strong" glow={true} className="mb-8 p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#a879ef] to-[#32d9fa] rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#f8f9fb] mb-2">AI-Powered Recommendations</h3>
                <p className="text-[#b2bfd4] mb-4">
                  Based on your project requirements and previous audits, here are our top recommendations:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  {filteredAuditors.slice(0, 3).map(auditor => (
                    <div key={auditor.id} className="p-4 bg-[rgba(24,31,47,0.6)] rounded-lg border border-[#a879ef]/20">
                      <AuditorAvatar
                        name={auditor.name}
                        verified={auditor.verified}
                        size="sm"
                        showDetails={false}
                      />
                      <div className="mt-2">
                        <div className="text-sm font-medium text-[#f8f9fb]">{auditor.name}</div>
                        <div className="text-xs text-[#a879ef]">95% compatibility match</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </HawklyCard>
        )}

        {/* Auditor Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {filteredAuditors.map(auditor => (
            <HawklyCard 
              key={auditor.id} 
              variant="interactive" 
              elevation="strong" 
              className="p-6 hover:scale-[1.02] transition-all duration-300"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <AuditorAvatar
                      name={auditor.name}
                      verified={auditor.verified}
                      size="lg"
                    />
                    {auditor.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#2de08e] rounded-full border-2 border-[#131822]" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#f8f9fb]">{auditor.name}</h3>
                    <p className="text-[#b2bfd4]">{auditor.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-[#ffd553] fill-current" />
                        <span className="text-[#f8f9fb] font-medium">{auditor.rating}</span>
                        <span className="text-[#8391ad] text-sm">({auditor.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#8391ad] text-sm">
                        <MapPin className="w-3 h-3" />
                        {auditor.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[#a879ef]">${auditor.hourlyRate}</div>
                  <div className="text-[#8391ad] text-sm">per hour</div>
                  <SecurityBadge level="enterprise" verified={auditor.verified} size="sm" className="mt-2" />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <LiveMetric
                  label="Audits"
                  value={auditor.completedAudits}
                  icon={Shield}
                />
                <LiveMetric
                  label="Security Score"
                  value={auditor.securityScore}
                  format="percentage"
                  icon={Award}
                />
                <LiveMetric
                  label="Response"
                  value={auditor.responseTime}
                  icon={Clock}
                />
              </div>

              {/* Bio */}
              <p className="text-[#b2bfd4] text-sm mb-4 line-clamp-2">{auditor.bio}</p>

              {/* Skills */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#f8f9fb] mb-2">Skills</h4>
                <div className="flex flex-wrap gap-1">
                  {auditor.skills.slice(0, 4).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs bg-[#212842] text-[#a879ef] rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {auditor.skills.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-[#23283e] text-[#8391ad] rounded-full">
                      +{auditor.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>

              {/* Recent Work */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#f8f9fb] mb-2">Recent Work</h4>
                <div className="space-y-2">
                  {auditor.recentWork.slice(0, 2).map((work, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-[#b2bfd4]">{work.project}</span>
                      <span className="text-[#8391ad]">{work.completed}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  className="flex-1 bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7]"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact
                </Button>
                <Button 
                  variant="outline" 
                  className="border-[#32d9fa] text-[#32d9fa] hover:bg-[#32d9fa]/10"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule
                </Button>
              </div>
            </HawklyCard>
          ))}
        </div>

        {/* Load More */}
        {filteredAuditors.length === 0 ? (
          <HawklyCard variant="glass" className="text-center py-12">
            <div className="space-y-4">
              <Users className="w-16 h-16 text-[#8391ad] mx-auto" />
              <h3 className="text-xl font-bold text-[#f8f9fb]">No auditors found</h3>
              <p className="text-[#b2bfd4]">Try adjusting your filters or search criteria</p>
              <Button onClick={clearFilters} variant="outline" className="border-[#a879ef] text-[#a879ef]">
                Clear All Filters
              </Button>
            </div>
          </HawklyCard>
        ) : (
          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="border-[#23283e] text-[#b2bfd4] hover:border-[#a879ef] hover:text-[#a879ef]"
            >
              Load More Auditors
            </Button>
          </div>
        )}
      </AppContainer>
    </div>
  );
}
