import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button-variants";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Shield, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface AuditorProfile {
  id: string;
  full_name: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  skills?: string[] | null;
  projects_completed: number | null;
  specializations?: string[] | null;
  years_of_experience?: number | null;
}

export function LeaderboardList() {
  const [auditors, setAuditors] = useState<AuditorProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAuditors() {
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('extended_profiles')
          .select('*')
          .eq('user_type', 'auditor')
          .eq('verification_status', 'verified')
          .order('projects_completed', { ascending: false })
          .limit(10);
        
        if (error) {
          throw error;
        }
        
        setAuditors(data || []);
      } catch (error: unknown) {
        console.error("Error fetching auditors:", error instanceof Error ? error.message : String(error));
        setError("Failed to load leaderboard data");
      } finally {
        setLoading(false);
      }
    }

    fetchAuditors();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-40" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                  <div className="ml-auto">
                    <Skeleton className="h-8 w-16" />
                  </div>
                </div>
                <div className="mt-4">
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8 border rounded-lg bg-red-50 text-red-700">
        <Shield className="h-5 w-5 mr-2" />
        {error}
      </div>
    );
  }
  
  // If we have no data yet, show placeholder content
  if (auditors.length === 0) {
    const placeholderAuditors = [
      { 
        id: "1", 
        full_name: "Alex Johnson", 
        skills: ["Solidity", "Smart Contracts"], 
        projects_completed: 47,
        specializations: ["DeFi", "NFT"],
        years_of_experience: 5
      },
      { 
        id: "2", 
        full_name: "Samantha Chen", 
        skills: ["Rust", "Zero Knowledge Proofs"], 
        projects_completed: 39,
        specializations: ["Layer 2", "Privacy"],
        years_of_experience: 4
      },
      { 
        id: "3", 
        full_name: "Michael Obaseki", 
        skills: ["Solidity", "EVM"], 
        projects_completed: 36,
        specializations: ["DAOs", "Governance"],
        years_of_experience: 3
      },
      { 
        id: "4", 
        full_name: "Elena Rodriguez", 
        skills: ["Formal Verification", "Security"], 
        projects_completed: 31,
        specializations: ["Critical Infrastructure", "Bridges"],
        years_of_experience: 6
      },
      { 
        id: "5", 
        full_name: "David Kim", 
        skills: ["Solidity", "Vyper"], 
        projects_completed: 28,
        specializations: ["Staking", "DeFi"],
        years_of_experience: 4
      },
    ];
    
    return renderAuditorsList(placeholderAuditors);
  }

  return renderAuditorsList(auditors);
  
  function renderAuditorsList(auditorsList: AuditorProfile[]) {
    return (
      <div className="grid gap-4">
        {auditorsList.map((auditor, index) => (
          <Card key={auditor.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-6">
                <div className="flex items-start sm:items-center gap-4 flex-col sm:flex-row">
                  <div className="relative">
                    <Avatar className="h-12 w-12 border-2 border-background">
                      <AvatarImage src={auditor.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${auditor.full_name}`} />
                      <AvatarFallback>
                        {auditor.full_name?.split(' ').map(name => name[0]).join('') || ''}
                      </AvatarFallback>
                    </Avatar>
                    {index < 3 && (
                      <div className="absolute -top-1 -right-1 bg-web3-orange text-white rounded-full flex items-center justify-center w-5 h-5 text-xs font-bold">
                        {index + 1}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <h3 className="font-medium text-base">
                        {auditor.display_name || auditor.full_name}
                      </h3>
                      {index === 0 && (
                        <Badge variant="outline" className="bg-web3-orange/10 text-web3-orange border-web3-orange/30">
                          <Award className="h-3 w-3 mr-1" /> Top Auditor
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {auditor.skills?.slice(0, 3).map((skill, i) => (
                        <Badge key={i} variant="secondary" className="text-xs font-normal">
                          {skill}
                        </Badge>
                      ))}
                      {(auditor.skills?.length || 0) > 3 && (
                        <span className="text-xs text-muted-foreground">+{(auditor.skills?.length || 0) - 3} more</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="ml-auto mt-2 sm:mt-0">
                    <Link
                      to={`#`}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "gap-1"
                      )}
                    >
                      View Profile
                      <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Projects: </span>
                    <span className="font-medium">{auditor.projects_completed}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Experience: </span>
                    <span className="font-medium">{auditor.years_of_experience} years</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Focus: </span>
                    <span className="font-medium">{auditor.specializations?.slice(0, 2).join(", ") || "Security Audits"}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
}
