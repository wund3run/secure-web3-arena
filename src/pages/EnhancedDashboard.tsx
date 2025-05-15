
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnhancedGuidedTour } from "@/components/onboarding/enhanced-guided-tour";
import { AccessibilitySelfAssessment } from "@/components/accessibility/AccessibilitySelfAssessment";
import { NonTechnicalAuditDemo } from "@/components/accessibility/NonTechnicalAuditDemo";
import { AuditProgressDashboard } from "@/components/audit-tracking/AuditProgressDashboard";
import { ConversationalForm, FormField } from "@/components/onboarding/conversational-form/ConversationalForm";
import { LanguageSwitcher } from "@/components/accessibility/LanguageSwitcher";
import { Shield, Search, Zap, Users, Info, ExternalLink, HelpCircle, ArrowRight } from "lucide-react";
import { EnhancedTooltip } from "@/components/ui/enhanced-tooltip";
import { toast } from "sonner";

// Sample conversational form fields for demo purposes
const demoFormFields: FormField[] = [
  {
    id: "project_name",
    type: "text",
    question: "What's the name of your blockchain project?",
    placeholder: "E.g., DeFi Lending Protocol",
    required: true
  },
  {
    id: "blockchain",
    type: "select",
    question: "Which blockchain are you building on?",
    options: [
      { label: "Ethereum", value: "ethereum" },
      { label: "Solana", value: "solana" },
      { label: "Polygon", value: "polygon" },
      { label: "BSC", value: "bsc" },
      { label: "Other", value: "other" }
    ],
    required: true
  },
  {
    id: "project_type",
    type: "select",
    question: "What type of project are you building?",
    options: [
      { label: "DeFi Protocol", value: "defi" },
      { label: "NFT Marketplace", value: "nft" },
      { label: "DAO", value: "dao" },
      { label: "GameFi", value: "gamefi" },
      { label: "Other", value: "other" }
    ],
    required: true
  },
  {
    id: "experience",
    type: "text",
    question: "Have you worked with security auditors before?",
    placeholder: "Tell us about your previous audit experience",
  },
  {
    id: "timeline",
    type: "select",
    question: "When do you need the audit completed?",
    options: [
      { label: "ASAP (1-2 weeks)", value: "asap" },
      { label: "Soon (3-4 weeks)", value: "soon" },
      { label: "Flexible (1-2 months)", value: "flexible" }
    ],
    required: true
  }
];

export default function EnhancedDashboard() {
  const [showGuidedTour, setShowGuidedTour] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // This would typically fetch actual user data
  const userData = {
    name: "Alex Johnson",
    isNewUser: true
  };
  
  useEffect(() => {
    // Show guided tour for new users automatically
    const hasSeenTour = localStorage.getItem("hawkly-guided-tour-seen");
    if (userData.isNewUser && !hasSeenTour) {
      setTimeout(() => {
        setShowGuidedTour(true);
      }, 1500);
    }
  }, [userData.isNewUser]);
  
  const handleTourFinish = () => {
    setShowGuidedTour(false);
    localStorage.setItem("hawkly-guided-tour-seen", "true");
    toast.success("Tour completed!", {
      description: "You can access it anytime from the Help menu"
    });
  };
  
  const handleDemoFormSubmit = async (data: Record<string, any>) => {
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    console.log("Form data submitted:", data);
    
    toast.success("Audit request submitted!", {
      description: "We'll match you with the perfect security providers"
    });
  };

  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly - Web3 Security Platform</title>
        <meta 
          name="description" 
          content="Monitor your Web3 security status, track audit progress, and manage your security strategy in one place."
        />
      </Helmet>
      
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow bg-gradient-to-br from-white via-primary/5 to-secondary/5 py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header with language switcher */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold tracking-tight">Welcome, {userData.name}</h1>
                  <LanguageSwitcher variant="minimal" />
                </div>
                <p className="text-muted-foreground">
                  Monitor your security status and manage your audits
                </p>
              </div>
              <Button onClick={() => setShowGuidedTour(true)} className="flex items-center gap-2">
                <Info className="h-4 w-4" />
                Take a Tour
              </Button>
            </div>
            
            {/* Main dashboard tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="overview" className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Overview
                </TabsTrigger>
                <TabsTrigger value="audits" className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  Audit Tracking
                </TabsTrigger>
                <TabsTrigger value="accessibility" className="flex items-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  Accessibility
                </TabsTrigger>
                <TabsTrigger value="request" className="flex items-center gap-2">
                  <Zap className="h-4 w-4" />
                  Request Audit
                </TabsTrigger>
              </TabsList>
              
              {/* Overview Tab Content */}
              <TabsContent value="overview" className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>Get started with common tasks</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full justify-start" variant="outline">
                        <Users className="h-4 w-4 mr-2" />
                        Browse Security Providers
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Shield className="h-4 w-4 mr-2" />
                        Request Security Audit
                      </Button>
                      <Button className="w-full justify-start" variant="outline">
                        <Search className="h-4 w-4 mr-2" />
                        View Security Reports
                      </Button>
                      <Button className="w-full justify-start bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        Take Security Assessment
                        <ArrowRight className="ml-auto h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Platform Overview</CardTitle>
                      <CardDescription>Your security at a glance</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-muted rounded-md p-4 flex items-center gap-3">
                            <div className="bg-primary/10 rounded-full p-3">
                              <Shield className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <div className="text-xl font-bold">2</div>
                              <div className="text-sm text-muted-foreground">Active Audits</div>
                            </div>
                          </div>
                          
                          <div className="bg-muted rounded-md p-4 flex items-center gap-3">
                            <div className="bg-green-100 rounded-full p-3">
                              <Search className="h-5 w-5 text-green-700" />
                            </div>
                            <div>
                              <div className="text-xl font-bold">5</div>
                              <div className="text-sm text-muted-foreground">Security Reports</div>
                            </div>
                          </div>
                        </div>
                        
                        <EnhancedTooltip 
                          content="Click to see detailed security status of your projects"
                          side="bottom"
                          showIcon={false}
                        >
                          <Button variant="default" className="w-full">
                            View Security Overview
                          </Button>
                        </EnhancedTooltip>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="md:col-span-3">
                    <CardHeader>
                      <CardTitle>Getting Started</CardTitle>
                      <CardDescription>Essential resources to help you navigate the platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border rounded-md p-4 space-y-3">
                          <div className="bg-blue-100 rounded-full p-2 w-fit">
                            <Shield className="h-5 w-5 text-blue-700" />
                          </div>
                          <h3 className="font-medium">Security Fundamentals</h3>
                          <p className="text-sm text-muted-foreground">
                            Learn the basics of Web3 security and why audits matter for your project.
                          </p>
                          <Button variant="link" className="text-blue-600 h-auto p-0 flex items-center">
                            Read guide
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                        
                        <div className="border rounded-md p-4 space-y-3">
                          <div className="bg-green-100 rounded-full p-2 w-fit">
                            <Users className="h-5 w-5 text-green-700" />
                          </div>
                          <h3 className="font-medium">Choosing Providers</h3>
                          <p className="text-sm text-muted-foreground">
                            How to select the right security experts for your specific project needs.
                          </p>
                          <Button variant="link" className="text-green-600 h-auto p-0 flex items-center">
                            Watch video
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                        
                        <div className="border rounded-md p-4 space-y-3">
                          <div className="bg-amber-100 rounded-full p-2 w-fit">
                            <Zap className="h-5 w-5 text-amber-700" />
                          </div>
                          <h3 className="font-medium">Audit Process</h3>
                          <p className="text-sm text-muted-foreground">
                            Step-by-step walkthrough of the security audit journey on our platform.
                          </p>
                          <Button variant="link" className="text-amber-600 h-auto p-0 flex items-center">
                            Take tutorial
                            <ExternalLink className="h-3.5 w-3.5 ml-1" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              {/* Audit Tracking Tab Content */}
              <TabsContent value="audits">
                <AuditProgressDashboard />
              </TabsContent>
              
              {/* Accessibility Tab Content */}
              <TabsContent value="accessibility" className="space-y-12">
                <Card>
                  <CardHeader>
                    <CardTitle>Security Experience Self-Assessment</CardTitle>
                    <CardDescription>
                      Help us tailor the platform to your technical background
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AccessibilitySelfAssessment />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Non-Technical Security Guide</CardTitle>
                    <CardDescription>
                      Understanding blockchain security without the technical jargon
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NonTechnicalAuditDemo />
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Request Audit Tab Content */}
              <TabsContent value="request">
                <div className="max-w-3xl mx-auto">
                  <Card>
                    <CardHeader>
                      <CardTitle>Request a Security Audit</CardTitle>
                      <CardDescription>
                        Tell us about your project to get matched with the perfect security providers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ConversationalForm 
                        fields={demoFormFields}
                        onSubmit={handleDemoFormSubmit}
                        submitButtonText="Find Security Providers"
                        showProgressBar={true}
                      />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
        
        <Footer />
      </div>
      
      {/* Guided Tour */}
      {showGuidedTour && (
        <EnhancedGuidedTour 
          onClose={() => setShowGuidedTour(false)}
          onFinish={handleTourFinish}
          autoStart={true}
        />
      )}
    </>
  );
}
