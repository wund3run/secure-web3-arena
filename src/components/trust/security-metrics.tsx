
import { Shield, Award, StarIcon, CheckCircle, Clock, Users, Lock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface SecurityScoreProps {
  score: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export function SecurityScore({ score, size = "md", showLabel = true }: SecurityScoreProps) {
  const getScoreColor = () => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-amber-500";
    if (score >= 50) return "text-orange-500";
    return "text-red-500";
  };
  
  const iconSize = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };
  
  const textSize = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };
  
  const containerSize = {
    sm: "h-8 w-8",
    md: "h-12 w-12",
    lg: "h-16 w-16"
  };
  
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className={`${containerSize[size]} rounded-full flex items-center justify-center relative`}>
              <div className="absolute inset-0">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className="text-muted/20" 
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="transparent" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    className={getScoreColor()} 
                    strokeDasharray={`${score * 2.51} 251`}
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <span className={`${textSize[size]} font-bold ${getScoreColor()}`}>{score}</span>
            </div>
            {showLabel && (
              <div className="flex flex-col">
                <span className={`${textSize[size]} font-medium`}>Security Score</span>
                <span className={`${textSize[size]} text-muted-foreground`}>
                  {score >= 90 ? "Excellent" : 
                   score >= 70 ? "Good" : 
                   score >= 50 ? "Fair" : "Poor"}
                </span>
              </div>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Security Score based on past audits, client satisfaction, and vulnerability findings</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface TrustMetricProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tooltip: string;
}

export function TrustMetric({ icon, label, value, tooltip }: TrustMetricProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <div className="text-xs text-muted-foreground">{label}</div>
              <div className="font-medium">{value}</div>
            </div>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface SecurityMetricsCardProps {
  securityScore: number;
  completedAudits: number;
  responseRate: number;
  criticalFindings: number;
  successRate: number;
}

export function SecurityMetricsCard({
  securityScore,
  completedAudits,
  responseRate,
  criticalFindings,
  successRate
}: SecurityMetricsCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Security Performance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between items-center">
          <SecurityScore score={securityScore} size="lg" />
          <div className="space-y-1 text-right">
            <div className="text-sm text-muted-foreground">Success Rate</div>
            <div className="text-2xl font-bold">{successRate}%</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-4">
          <TrustMetric 
            icon={<Shield className="h-5 w-5 text-primary" />}
            label="Completed Audits"
            value={completedAudits}
            tooltip="Total number of security audits successfully completed"
          />
          <TrustMetric 
            icon={<Clock className="h-5 w-5 text-secondary" />}
            label="Response Rate"
            value={`${responseRate}%`}
            tooltip="Percentage of client inquiries responded to within 24 hours"
          />
          <TrustMetric 
            icon={<Lock className="h-5 w-5 text-accent" />}
            label="Critical Findings"
            value={criticalFindings}
            tooltip="Number of critical vulnerabilities identified and remediated"
          />
          <TrustMetric 
            icon={<Users className="h-5 w-5 text-web3-teal" />}
            label="Client Retention"
            value={`${Math.round(successRate * 0.9)}%`}
            tooltip="Percentage of clients who return for additional security services"
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface ComparisonMetricProps {
  label: string;
  industry: number;
  provider: number;
  unit?: string;
  higherIsBetter?: boolean;
}

export function ComparisonMetric({ 
  label, 
  industry, 
  provider, 
  unit = "%", 
  higherIsBetter = true 
}: ComparisonMetricProps) {
  const isPerforming = higherIsBetter ? provider >= industry : provider <= industry;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm">{label}</span>
        <Badge variant={isPerforming ? "outline" : "secondary"} className="text-xs">
          {isPerforming ? "Outperforming" : "Industry Average"}
        </Badge>
      </div>
      <div className="relative pt-1">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Industry: {industry}{unit}</span>
          <span>Provider: {provider}{unit}</span>
        </div>
        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-muted">
          <Progress value={industry} max={100} className="h-2 bg-muted-foreground/50" />
        </div>
        <div className="overflow-hidden h-2 mb-1 text-xs flex rounded bg-muted">
          <Progress 
            value={provider} 
            max={100} 
            className={`h-2 ${isPerforming ? "bg-primary" : "bg-secondary"}`} 
          />
        </div>
      </div>
    </div>
  );
}

export function TrustMetricsComparison() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Security Performance vs Industry</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ComparisonMetric
          label="Critical Vulnerability Detection"
          industry={82}
          provider={94}
          unit="%"
          higherIsBetter={true}
        />
        <ComparisonMetric
          label="False Positive Rate"
          industry={15}
          provider={7}
          unit="%"
          higherIsBetter={false}
        />
        <ComparisonMetric
          label="Remediation Success Rate"
          industry={75}
          provider={92}
          unit="%"
          higherIsBetter={true}
        />
        <ComparisonMetric
          label="On-Time Delivery"
          industry={68}
          provider={97}
          unit="%"
          higherIsBetter={true}
        />
      </CardContent>
    </Card>
  );
}
