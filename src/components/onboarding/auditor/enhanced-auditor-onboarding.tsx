
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HawklyLogo } from "@/components/layout/hawkly-logo";
import { AuditorParametersForm } from "@/components/auditor-parameters/AuditorParametersForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, User, Award, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface EnhancedAuditorOnboardingProps {
  currentStep?: number;
  onStepChange?: (step: number) => void;
  onComplete?: () => void;
}

export function EnhancedAuditorOnboarding({
  currentStep = 1,
  onStepChange = () => {},
  onComplete = () => {}
}: EnhancedAuditorOnboardingProps) {
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      onStepChange(currentStep + 1);
    } else {
      onComplete();
    }
  };
  
  const handleBack = () => {
    if (currentStep > 1) {
      onStepChange(currentStep - 1);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-primary/20">
        <CardHeader className="text-center border-b pb-6">
          <div className="flex justify-center mb-4">
            <HawklyLogo variant="large" size="lg" />
          </div>
          <CardTitle className="text-2xl">Become a Security Expert</CardTitle>
          <div className="flex justify-center mt-4">
            <Badge className="bg-primary/10 text-primary border-primary/30">
              Step {currentStep} of {totalSteps}
            </Badge>
          </div>
          <div className="mt-4">
            <Progress value={progress} className="h-2" />
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <Tabs value={`step-${currentStep}`}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="step-1" disabled={currentStep !== 1} className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Profile
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={currentStep !== 2} className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Skills
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={currentStep !== 3} className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Verification
              </TabsTrigger>
              <TabsTrigger value="step-4" disabled={currentStep !== 4} className="data-[state=active]:bg-primary data-[state=active]:text-white">
                Rewards
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="step-1">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Complete Your Profile</h2>
                <p className="text-muted-foreground">
                  Tell us about your security experience and expertise to help connect you with the right projects.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/60">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Profile Completion Boosts Visibility</h3>
                      <p className="text-sm text-muted-foreground">
                        Security experts with complete profiles are 3x more likely to be selected for high-value audits.
                      </p>
                    </div>
                  </div>
                </div>
                <AuditorParametersForm />
              </div>
            </TabsContent>
            
            <TabsContent value="step-2">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Showcase Your Skills</h2>
                <p className="text-muted-foreground">
                  Add your technical skills, certifications, and security expertise to stand out in the marketplace.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg hover:border-primary/40 transition-all">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4 text-primary" />
                      Web3 Security Skills
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      Select your Web3 security skills and specializations
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg hover:border-primary/40 transition-all">
                    <h3 className="font-medium mb-2 flex items-center gap-2">
                      <Award className="h-4 w-4 text-secondary" />
                      Certifications & Achievements
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      Add your security certifications and accomplishments
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="step-3">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Verify Your Expertise</h2>
                <p className="text-muted-foreground">
                  Complete our verification process to earn the trusted auditor badge and access premium opportunities.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/60 mb-4">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h3 className="font-medium">Verification Unlocks Premium Features</h3>
                      <p className="text-sm text-muted-foreground">
                        Verified experts earn 40% higher fees and get priority access to high-value security audits.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="step-4">
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Your Rewards Journey</h2>
                <p className="text-muted-foreground">
                  As you complete audits and find vulnerabilities, you'll earn points and unlock achievements.
                </p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="p-4 border rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold text-primary">500</div>
                    <div className="text-xs text-muted-foreground">Points for first audit</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold text-secondary">1000+</div>
                    <div className="text-xs text-muted-foreground">Points per critical bug</div>
                  </div>
                  <div className="p-4 border rounded-lg bg-muted/20 text-center">
                    <div className="text-2xl font-bold text-web3-orange">5</div>
                    <div className="text-xs text-muted-foreground">Ranks to Verified Expert</div>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-primary/5">
                  <div>
                    <h3 className="font-medium">Ready to start your journey?</h3>
                    <p className="text-sm text-muted-foreground">Complete onboarding to join our security expert network</p>
                  </div>
                  <Award className="h-10 w-10 text-primary" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="border-t pt-6 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          <Button onClick={handleNext}>
            {currentStep < totalSteps ? "Continue" : "Complete Onboarding"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
