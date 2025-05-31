
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  Shield, 
  Target, 
  ArrowRight,
  CheckCircle,
  Star
} from 'lucide-react';

export const WelcomeMessage = () => {
  const { user, userProfile, getUserType } = useAuth();
  const userType = getUserType();
  const isAuditor = userType === 'auditor';
  const firstName = userProfile?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there';

  // Don't show welcome message for existing users with activity
  if (userProfile?.projects_completed && userProfile.projects_completed > 0) {
    return null;
  }

  const getWelcomeContent = () => {
    if (isAuditor) {
      return {
        title: `Welcome to Hawkly, ${firstName}! 🛡️`,
        subtitle: "You're now part of the elite Web3 security auditing community",
        description: "As a security auditor, you'll help protect the Web3 ecosystem by identifying vulnerabilities and ensuring project safety.",
        nextSteps: [
          { text: "Complete your auditor profile", href: "/auditor-onboarding", icon: <Target className="h-4 w-4" /> },
          { text: "Browse available audits", href: "/audits", icon: <Shield className="h-4 w-4" /> },
          { text: "Set up your verification", href: "/profile", icon: <CheckCircle className="h-4 w-4" /> }
        ],
        badgeText: "Security Expert",
        badgeColor: "bg-blue-500"
      };
    } else {
      return {
        title: `Welcome to Hawkly, ${firstName}! 🚀`,
        subtitle: "Your Web3 project security journey starts here",
        description: "Connect with top-tier security auditors to protect your Web3 project and build user trust.",
        nextSteps: [
          { text: "Request your first audit", href: "/request-audit", icon: <Shield className="h-4 w-4" /> },
          { text: "Browse auditor profiles", href: "/marketplace", icon: <Star className="h-4 w-4" /> },
          { text: "Complete your project profile", href: "/profile", icon: <Target className="h-4 w-4" /> }
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
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              <CardTitle className="text-2xl font-bold">{content.title}</CardTitle>
            </div>
            <p className="text-lg text-muted-foreground font-medium">{content.subtitle}</p>
            <Badge className={`${content.badgeColor} text-white w-fit`}>
              {content.badgeText}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-6">
        <p className="text-muted-foreground leading-relaxed">
          {content.description}
        </p>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">
            Get Started:
          </h4>
          <div className="grid gap-2">
            {content.nextSteps.map((step, index) => (
              <Button
                key={index}
                variant="ghost"
                asChild
                className="justify-start h-auto p-3 hover:bg-primary/5"
              >
                <Link to={step.href} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {step.icon}
                  </div>
                  <span className="flex-1 text-left">{step.text}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/50">
          <p className="text-xs text-muted-foreground">
            💡 <strong>Pro tip:</strong> Complete your profile to unlock all features and get better matches.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
