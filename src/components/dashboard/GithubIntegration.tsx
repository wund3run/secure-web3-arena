
import React, { useState } from 'react';
import { Github, Check, ChevronRight, Code, FileText, GitBranch, GitFork, GitPullRequest, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

interface GithubIntegrationProps {
  expanded?: boolean;
}

export function GithubIntegration({ expanded = false }: GithubIntegrationProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [syncProgress, setSyncProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [username, setUsername] = useState('');
  
  const mockRepos = [
    { name: 'smart-contract-audits', stars: 124, forks: 42, language: 'Solidity' },
    { name: 'defi-security-toolkit', stars: 89, forks: 31, language: 'TypeScript' },
    { name: 'security-scanner', stars: 56, forks: 12, language: 'Python' }
  ];
  
  const handleConnect = () => {
    if (!username.trim()) {
      toast.error("Please enter your GitHub username");
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
      toast.success("GitHub account connected", {
        description: `Connected to ${username}`
      });
    }, 1500);
  };
  
  const handleSync = () => {
    setIsSyncing(true);
    setSyncProgress(0);
    
    // Simulate progress
    const interval = setInterval(() => {
      setSyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsSyncing(false);
          toast.success("Repository data synced", {
            description: "Your GitHub repositories have been imported successfully"
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const handleDisconnect = () => {
    setIsConnected(false);
    toast.info("GitHub account disconnected");
  };

  // For non-expanded view (widget on dashboard)
  if (!expanded) {
    return (
      <div className="p-4 h-full">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Github className="h-4 w-4 text-primary" />
                <span className="font-medium">GitHub</span>
              </div>
              {isConnected && <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Connected</span>}
            </div>
            
            {isConnected ? (
              <>
                <p className="text-sm text-muted-foreground mb-2">
                  Connected as <span className="font-medium">{username}</span>
                </p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span>Repos imported:</span>
                    <span className="font-medium">{mockRepos.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span>Last synced:</span>
                    <span className="font-medium">Just now</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mb-4">
                Connect your GitHub to import repositories & security history
              </p>
            )}
          </div>
          
          {isConnected ? (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-2"
              onClick={handleSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <>
                  <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Sync Repos
                </>
              )}
            </Button>
          ) : (
            <Button
              size="sm"
              className="w-full mt-2"
              onClick={() => {
                if (!username) setUsername('demo-user');
                handleConnect();
              }}
              disabled={isConnecting}
            >
              {isConnecting ? "Connecting..." : "Connect"}
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          )}
        </div>
        
        {isSyncing && (
          <Progress value={syncProgress} className="h-1 mt-2" />
        )}
      </div>
    );
  }

  // For expanded view (dedicated page)
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Github className="h-5 w-5" />
          <h3 className="text-lg font-medium">GitHub Repository Integration</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Connect your GitHub account to share repository details for security audits and import your security history.
        </p>
      </div>
      
      {!isConnected ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="github-username">GitHub Username</Label>
            <div className="flex gap-2">
              <Input 
                id="github-username" 
                placeholder="Enter your GitHub username" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Button onClick={handleConnect} disabled={isConnecting}>
                {isConnecting ? "Connecting..." : "Connect"}
              </Button>
            </div>
          </div>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h4 className="text-sm font-medium">Benefits of connecting GitHub</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Import repository structure automatically</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Share code securely with auditors</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Review and implement fixes with PRs</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Track security history over time</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <Github className="h-5 w-5" />
              </div>
              <div>
                <h4 className="font-medium">{username}</h4>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={handleSync} disabled={isSyncing}>
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Syncing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sync
                  </>
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleDisconnect}>
                Disconnect
              </Button>
            </div>
          </div>
          
          {isSyncing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Syncing repository data...</span>
                <span>{syncProgress}%</span>
              </div>
              <Progress value={syncProgress} className="h-2" />
            </div>
          )}
          
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Imported Repositories</h4>
            
            <div className="space-y-3">
              {mockRepos.map(repo => (
                <Card key={repo.name}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2">
                          <Code className="h-4 w-4 text-primary" />
                          <h5 className="font-medium">{repo.name}</h5>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <span className="h-2 w-2 rounded-full bg-yellow-500"></span>
                            <span>{repo.language}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <GitFork className="h-3 w-3" />
                            <span>{repo.forks}</span>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <GitPullRequest className="h-3 w-3 mr-1" />
                        Request Audit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
