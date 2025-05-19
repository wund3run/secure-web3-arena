
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface FunnelStage {
  name: string;
  value: number;
  dropoff: number;
  action: string;
  color: string;
}

interface FunnelData {
  auditor: FunnelStage[];
  projectOwner: FunnelStage[];
  general: FunnelStage[];
}

export function ConversionFunnelAnalysis() {
  // Staged conversion funnel data for each user type
  const funnelData: FunnelData = {
    auditor: [
      { name: "Discovery", value: 100, dropoff: 25, action: "Platform awareness", color: "#4ade80" },
      { name: "Registration", value: 75, dropoff: 5, action: "Account creation", color: "#60a5fa" },
      { name: "Verification", value: 70, dropoff: 10, action: "Identity verification", color: "#818cf8" },
      { name: "Service Creation", value: 60, dropoff: 5, action: "Profile setup", color: "#a78bfa" },
      { name: "First Audit", value: 55, dropoff: 15, action: "Initial engagement", color: "#c084fc" },
      { name: "Recurring Activity", value: 40, dropoff: 0, action: "Ongoing platform use", color: "#e879f9" }
    ],
    projectOwner: [
      { name: "Problem Awareness", value: 100, dropoff: 20, action: "Security need recognition", color: "#4ade80" },
      { name: "Research", value: 80, dropoff: 15, action: "Comparing options", color: "#60a5fa" },
      { name: "Registration", value: 65, dropoff: 5, action: "Account creation", color: "#818cf8" },
      { name: "Audit Request", value: 60, dropoff: 10, action: "Project submission", color: "#a78bfa" },
      { name: "Escrow Setup", value: 50, dropoff: 5, action: "Payment preparation", color: "#c084fc" },
      { name: "Audit Completion", value: 45, dropoff: 5, action: "Implementation of fixes", color: "#e879f9" },
      { name: "Recurring Projects", value: 40, dropoff: 0, action: "Ongoing security checks", color: "#f472b6" }
    ],
    general: [
      { name: "Initial Visit", value: 100, dropoff: 60, action: "Content exploration", color: "#4ade80" },
      { name: "Resource View", value: 40, dropoff: 15, action: "Educational content consumption", color: "#60a5fa" },
      { name: "Community Engagement", value: 25, dropoff: 10, action: "Forum activity", color: "#818cf8" },
      { name: "Self-Service Tools", value: 15, dropoff: 5, action: "Template usage", color: "#a78bfa" },
      { name: "Conversion", value: 10, dropoff: 0, action: "Becoming provider/client", color: "#c084fc" }
    ]
  };

  const renderTooltip = (props: any) => {
    const { active, payload } = props;
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-md shadow-md border border-border text-sm">
          <p className="font-medium">{data.name}</p>
          <p className="text-muted-foreground">Retention: {data.value}%</p>
          <p className="text-muted-foreground">Dropoff: {data.dropoff}%</p>
          <p className="text-primary font-medium mt-1">{data.action}</p>
        </div>
      );
    }
    return null;
  };

  const OptimizationStrategies = ({ userType }: { userType: keyof FunnelData }) => {
    // Identify the highest dropoff stage
    const highestDropoffStage = [...funnelData[userType]].sort((a, b) => b.dropoff - a.dropoff)[0];
    
    const strategies = {
      auditor: {
        discovery: "Targeted ads on security forums, GitHub sponsorships",
        verification: "Streamlined verification with AI assistance, better progress indicators",
        firstAudit: "Guided first audit process, mentor matching program"
      },
      projectOwner: {
        problemAwareness: "Educational content on Web3 vulnerabilities, case studies of hacks",
        research: "Transparent comparison tools, auditor verification badges",
        auditRequest: "AI-assisted project submission, simplified requirement forms"
      },
      general: {
        initialVisit: "Engaging homepage with clear value proposition, interactive demos",
        resourceView: "Gamified learning paths, exclusive content access",
        communityEngagement: "Recognition system, expert AMAs, community challenges"
      }
    };
    
    const getHighestDropoffStrategy = () => {
      const stageName = highestDropoffStage.name.toLowerCase().replace(/\s/g, '');
      let strategy = "";
      
      if (userType === "auditor" && strategies.auditor[stageName as keyof typeof strategies.auditor]) {
        strategy = strategies.auditor[stageName as keyof typeof strategies.auditor];
      } else if (userType === "projectOwner" && strategies.projectOwner[stageName as keyof typeof strategies.projectOwner]) {
        strategy = strategies.projectOwner[stageName as keyof typeof strategies.projectOwner];
      } else if (userType === "general" && strategies.general[stageName as keyof typeof strategies.general]) {
        strategy = strategies.general[stageName as keyof typeof strategies.general];
      }
      
      return strategy || "Custom optimization strategy based on user behavior analysis";
    };

    return (
      <div className="bg-muted/50 p-4 rounded-lg mt-4">
        <h4 className="font-medium mb-2">Optimization Insights:</h4>
        <div className="space-y-2">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3">
            <p className="text-sm font-medium">Highest Dropoff: {highestDropoffStage.name} ({highestDropoffStage.dropoff}%)</p>
            <p className="text-sm text-muted-foreground">{getHighestDropoffStrategy()}</p>
          </div>
          <div className="text-sm space-y-1">
            <p className="font-medium">Additional Recommendations:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personalized onboarding experiences based on user persona</li>
              <li>Targeted engagement campaigns at conversion bottlenecks</li>
              <li>Streamlined UX at high friction points in the journey</li>
              <li>A/B testing different paths to optimize conversion</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Conversion Funnel Analysis</CardTitle>
        <CardDescription>
          Visualize user journey conversion rates and identify optimization opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="auditor">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="auditor">Auditors</TabsTrigger>
            <TabsTrigger value="projectOwner">Project Owners</TabsTrigger>
            <TabsTrigger value="general">General Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="auditor" className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData.auditor}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={renderTooltip} />
                  <Bar dataKey="value" minPointSize={2} barSize={20}>
                    {funnelData.auditor.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OptimizationStrategies userType="auditor" />
          </TabsContent>
          
          <TabsContent value="projectOwner" className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData.projectOwner}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={renderTooltip} />
                  <Bar dataKey="value" minPointSize={2} barSize={20}>
                    {funnelData.projectOwner.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OptimizationStrategies userType="projectOwner" />
          </TabsContent>
          
          <TabsContent value="general" className="pt-4">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={funnelData.general}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" width={100} />
                  <Tooltip content={renderTooltip} />
                  <Bar dataKey="value" minPointSize={2} barSize={20}>
                    {funnelData.general.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <OptimizationStrategies userType="general" />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
