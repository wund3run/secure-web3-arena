
import React, { useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Shield, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star,
  X,
  Lightbulb,
  BookOpen
} from 'lucide-react';

export const EnhancedWelcomeMessage = () => {
  const { user, userProfile, getUserType } = useAuth();
  const [isDismissed, setIsDismissed] = useState(false);
  const userType = getUserType();
  const isAuditor = userType === 'auditor';
  const firstName = userProfile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  // Calculate onboarding progress
  const getOnboardingProgress = () => {
    let completedSteps = 0;
    const totalSteps = 4;

    if (userProfile?.full_name) completedSteps++;
    if (userProfile?.bio) completedSteps++;
    if (userProfile?.skills?.length) completedSteps++;
    if (userProfile?.verification_status === 'verified') completedSteps++;

    return (completedSteps / totalSteps) * 100;
  };

  const progress = getOnboardingProgress();
  const isNewUser = progress < 50;

  if (isDismissed || (!isNewUser && userProfile?.projects_completed && userProfile.projects_completed > 2)) {
    return null;
  }

  const getWelcomeContent = () => {
    if (isAuditor) {
      return {
        title: `Welcome to Hawkly, ${firstName}! 🛡️`,
        subtitle: "Ready to secure the future of Web3?",
        description: "As a security auditor, you're joining an elite community dedicated to protecting the Web3 ecosystem. Your expertise will help identify vulnerabilities and ensure project safety.",
        quickTips: [
          "Complete your auditor profile to get better project matches",
          "Showcase your certifications and past audit experience",
          "Respond quickly to opportunities to build your reputation",
          "Use our guidelines to maintain audit quality standards"
        ],
        nextSteps: [
          { text: "Complete your auditor profile", href: "/profile", icon: <Target className="h-4 w-4" />, priority: "high" },
          { text: "Browse available audits", href: "/marketplace", icon: <Shield className="h-4 w-4" />, priority: "medium" },
          { text: "View auditor guidelines", href: "/guidelines", icon: <BookOpen className="h-4 w-4" />, priority: "low" }
        ],
        badgeText: "Security Expert",
        badgeColor: "bg-blue-500"
      };
    } else {
      return {
        title: `Hello ${firstName}, welcome to Hawkly! 🚀`,
        subtitle: "Your Web3 security journey starts here",
        description: "Connect with top-tier security auditors to protect your Web3 project and build user trust. We're here to guide you every step of the way.",
        quickTips: [
          "Start with a security assessment to understand your needs",
          "Choose auditors based on your project's blockchain and complexity",
          "Monitor your project's security score over time"
        ],
        nextSteps: [
          { text: "Request your first audit", href: "/request-audit", icon: <Shield className="h-4 w-4" />, priority: "high" },
          { text: "Explore auditor marketplace", href: "/marketplace", icon: <Star className="h-4 w-4" />, priority: "medium" },
          { text: "Learn about Web3 security", href: "/resources", icon: <BookOpen className="h-4 w-4" />, priority: "low" }
        ],
        badgeText: "Project Owner",
        badgeColor: "bg-green-500"
      };
    }
  };

  const content = getWelcomeContent();

  return (
    <Card className="mb-6 border-primary/20 bg-gradient-to-r from-primary/10 via-secondary/5 to-primary/5 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12" />
      
      <CardHeader className="relative">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <CardTitle className="text-2xl font-bold">{content.title}</CardTitle>
            </div>
            <p className="text-lg text-muted-foreground font-medium">{content.subtitle}</p>
            <div className="flex items-center gap-3">
              <Badge className={`${content.badgeColor} text-white`}>
                {content.badgeText}
              </Badge>
              {isNewUser && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Profile: {Math.round(progress)}% complete</span>
                  <Progress value={progress} className="w-20 h-2" />
                </div>
              )}
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsDismissed(true)}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {content.description}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4" />
              Quick Actions
            </h4>
            <div className="space-y-2">
              {content.nextSteps.map((step, index) => (
                <Button
                  key={index}
                  variant={step.priority === 'high' ? 'default' : 'ghost'}
                  asChild
                  className="justify-start h-auto p-3 w-full"
                  size="sm"
                >
                  <Link to={step.href} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.priority === 'high' ? 'bg-primary/20' : 'bg-primary/10'
                    }`}>
                      {step.icon}
                    </div>
                    <span className="flex-1 text-left">{step.text}</span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4" />
              Pro Tips
            </h4>
            <div className="space-y-2">
              {content.quickTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-background/50">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {isNewUser && (
          <div className="pt-4 border-t border-border/50">
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted-foreground">
                💡 <strong>Complete your profile</strong> to unlock all features and get better matches.
              </p>
              <Button variant="outline" size="sm" asChild>
                <Link to="/profile">
                  Complete Profile
                </Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
