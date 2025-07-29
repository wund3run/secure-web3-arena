
import React from 'react';
import { User, TrendingUp, Shield, Zap } from 'lucide-react';
import { PersonalizedContent, UserBehavior, UserSegment } from '../types';

export const generatePersonalizedContent = (segment: UserSegment, behavior: UserBehavior): PersonalizedContent => {
  const contentMap = {
    new: {
      hero: {
        title: "Welcome to the Future of Web3 Security",
        subtitle: "Get started with our guided onboarding and find the perfect auditor for your project",
        cta: "Start Your Security Journey"
      },
      features: [
        {
          title: "Guided Onboarding",
          description: "Step-by-step process to get you started",
          icon: React.createElement(User, { className: "h-5 w-5" }),
          priority: 1
        },
        {
          title: "AI-Powered Matching",
          description: "Find the perfect auditor for your needs",
          icon: React.createElement(Zap, { className: "h-5 w-5" }),
          priority: 2
        }
      ],
      recommendations: [
        {
          type: "onboarding",
          content: "Complete your profile setup to get personalized audit recommendations",
          action: "Start Setup"
        },
        {
          type: "tutorial",
          content: "Take our 5-minute security assessment to understand your needs",
          action: "Take Assessment"
        }
      ]
    },
    returning: {
      hero: {
        title: "Welcome Back! Continue Your Security Journey",
        subtitle: "Pick up where you left off or explore new audit opportunities",
        cta: "Continue Your Journey"
      },
      features: [
        {
          title: "Your Dashboard",
          description: "Track your ongoing audits and projects",
          icon: React.createElement(TrendingUp, { className: "h-5 w-5" }),
          priority: 1
        },
        {
          title: "New Opportunities",
          description: "Fresh audit requests matching your expertise",
          icon: React.createElement(Shield, { className: "h-5 w-5" }),
          priority: 2
        }
      ],
      recommendations: [
        {
          type: "continue",
          content: "Resume your pending audit request from last week",
          action: "Continue Audit"
        },
        {
          type: "explore",
          content: "Check out new auditors that match your previous selections",
          action: "Browse Auditors"
        }
      ]
    },
    power: {
      hero: {
        title: "Advanced Security Solutions for Power Users",
        subtitle: "Access premium features and advanced audit tools",
        cta: "Explore Advanced Features"
      },
      features: [
        {
          title: "Advanced Analytics",
          description: "Deep insights into your security posture",
          icon: React.createElement(TrendingUp, { className: "h-5 w-5" }),
          priority: 1
        },
        {
          title: "Premium Support",
          description: "Priority access to our security experts",
          icon: React.createElement(Shield, { className: "h-5 w-5" }),
          priority: 2
        }
      ],
      recommendations: [
        {
          type: "premium",
          content: "Upgrade to Premium for bulk audit discounts and priority support",
          action: "Upgrade Now"
        },
        {
          type: "analytics",
          content: "View detailed analytics for your completed audits",
          action: "View Analytics"
        }
      ]
    },
    enterprise: {
      hero: {
        title: "Enterprise-Grade Security Solutions",
        subtitle: "Scale your security operations with our enterprise platform",
        cta: "Contact Enterprise Sales"
      },
      features: [
        {
          title: "Custom Integrations",
          description: "Integrate with your existing security stack",
          icon: React.createElement(Zap, { className: "h-5 w-5" }),
          priority: 1
        },
        {
          title: "Dedicated Support",
          description: "24/7 support from our security team",
          icon: React.createElement(Shield, { className: "h-5 w-5" }),
          priority: 2
        }
      ],
      recommendations: [
        {
          type: "enterprise",
          content: "Schedule a call with our enterprise team for custom solutions",
          action: "Schedule Call"
        },
        {
          type: "integration",
          content: "Explore API integrations for your development workflow",
          action: "View API Docs"
        }
      ]
    }
  };

  return contentMap[segment] || contentMap.new;
};
