
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Github, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink, 
  Star, 
  GitBranch,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

interface GitHubVerificationProps {
  userId: string;
  onVerificationComplete: (data: any) => void;
}

export function GitHubVerification({ userId, onVerificationComplete }: GitHubVerificationProps) {
  const [githubUsername, setGithubUsername] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'error'>('pending');
  const [githubData, setGithubData] = useState<any>(null);
  const [securityRepos, setSecurityRepos] = useState<GitHubRepo[]>([]);

  const securityKeywords = [
    'security', 'audit', 'vulnerability', 'smart-contract', 'defi',
    'solidity', 'ethereum', 'blockchain', 'web3', 'penetration-testing',
    'bug-bounty', 'cryptography', 'cybersecurity'
  ];

  const verifyGitHubProfile = async () => {
    if (!githubUsername.trim()) {
      toast.error('Please enter a GitHub username');
      return;
    }

    setIsVerifying(true);
    try {
      // Simulate GitHub API call (in real implementation, this would be done server-side)
      const mockGitHubData = {
        login: githubUsername,
        name: 'Security Expert',
        bio: 'Smart contract security researcher and auditor',
        public_repos: 15,
        followers: 250,
        following: 100,
        created_at: '2020-01-15T00:00:00Z',
        avatar_url: `https://github.com/${githubUsername}.png`,
        html_url: `https://github.com/${githubUsername}`
      };

      // Mock security-related repositories
      const mockSecurityRepos: GitHubRepo[] = [
        {
          id: 1,
          name: 'smart-contract-audits',
          full_name: `${githubUsername}/smart-contract-audits`,
          description: 'Collection of smart contract security audits and findings',
          html_url: `https://github.com/${githubUsername}/smart-contract-audits`,
          stargazers_count: 45,
          language: 'Solidity',
          updated_at: '2024-01-15T00:00:00Z',
          topics: ['security', 'smart-contracts', 'audit', 'defi']
        },
        {
          id: 2,
          name: 'vulnerability-scanner',
          full_name: `${githubUsername}/vulnerability-scanner`,
          description: 'Automated vulnerability scanner for Ethereum smart contracts',
          html_url: `https://github.com/${githubUsername}/vulnerability-scanner`,
          stargazers_count: 128,
          language: 'Python',
          updated_at: '2024-02-10T00:00:00Z',
          topics: ['security', 'ethereum', 'vulnerability', 'scanner']
        },
        {
          id: 3,
          name: 'defi-security-toolkit',
          full_name: `${githubUsername}/defi-security-toolkit`,
          description: 'Security analysis tools for DeFi protocols',
          html_url: `https://github.com/${githubUsername}/defi-security-toolkit`,
          stargazers_count: 89,
          language: 'JavaScript',
          updated_at: '2024-01-28T00:00:00Z',
          topics: ['defi', 'security', 'analysis', 'tools']
        }
      ];

      setGithubData(mockGitHubData);
      setSecurityRepos(mockSecurityRepos);
      setVerificationStatus('success');

      // Calculate verification score
      const verificationScore = calculateVerificationScore(mockGitHubData, mockSecurityRepos);
      
      const verificationData = {
        platform: 'github',
        username: githubUsername,
        profile_data: mockGitHubData,
        security_repos: mockSecurityRepos,
        verification_score: verificationScore,
        verified_at: new Date().toISOString()
      };

      // Save verification data
      const existingVerifications = JSON.parse(localStorage.getItem('verifications') || '[]');
      existingVerifications.push({
        id: Date.now().toString(),
        user_id: userId,
        ...verificationData
      });
      localStorage.setItem('verifications', JSON.stringify(existingVerifications));

      onVerificationComplete(verificationData);
      toast.success('GitHub profile verified successfully!');

    } catch (error) {
      console.error('GitHub verification failed:', error);
      setVerificationStatus('error');
      toast.error('Failed to verify GitHub profile');
    } finally {
      setIsVerifying(false);
    }
  };

  const calculateVerificationScore = (profile: any, repos: GitHubRepo[]): number => {
    let score = 0;

    // Base score for having a profile
    score += 20;

    // Account age (older accounts are more trustworthy)
    const accountAge = (Date.now() - new Date(profile.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
    score += Math.min(accountAge * 10, 30);

    // Repository count
    score += Math.min(profile.public_repos * 2, 20);

    // Security-related repositories
    score += repos.length * 10;

    // Stars on security repos
    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    score += Math.min(totalStars / 10, 20);

    // Recent activity
    const recentRepos = repos.filter(repo => 
      new Date(repo.updated_at) > new Date(Date.now() - 90 * 24 * 60 * 60 * 1000)
    );
    score += recentRepos.length * 5;

    return Math.min(Math.round(score), 100);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="h-5 w-5" />
          GitHub Profile Verification
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {verificationStatus === 'pending' && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="github-username">GitHub Username</Label>
              <Input
                id="github-username"
                value={githubUsername}
                onChange={(e) => setGithubUsername(e.target.value)}
                placeholder="Enter your GitHub username"
                disabled={isVerifying}
              />
            </div>
            <Button 
              onClick={verifyGitHubProfile}
              disabled={isVerifying || !githubUsername.trim()}
              className="w-full"
            >
              {isVerifying ? 'Verifying...' : 'Verify GitHub Profile'}
            </Button>
          </div>
        )}

        {verificationStatus === 'success' && githubData && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">GitHub Profile Verified</span>
            </div>

            {/* Profile Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium">{githubData.name || githubData.login}</div>
                <div className="text-sm text-muted-foreground">{githubData.bio}</div>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span>{githubData.public_repos} repos</span>
                  <span>{githubData.followers} followers</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground">Member since</div>
                <div className="font-medium">{formatDate(githubData.created_at)}</div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2"
                  onClick={() => window.open(githubData.html_url, '_blank')}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View Profile
                </Button>
              </div>
            </div>

            {/* Security Repositories */}
            {securityRepos.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Security-Related Repositories</h4>
                <div className="space-y-3">
                  {securityRepos.map((repo) => (
                    <div key={repo.id} className="border rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{repo.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {repo.language}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {repo.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3" />
                              {repo.stargazers_count}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Updated {formatDate(repo.updated_at)}
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {repo.topics.map((topic) => (
                              <Badge key={topic} variant="secondary" className="text-xs">
                                {topic}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(repo.html_url, '_blank')}
                        >
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {verificationStatus === 'error' && (
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle className="h-5 w-5" />
            <span>Failed to verify GitHub profile. Please try again.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
