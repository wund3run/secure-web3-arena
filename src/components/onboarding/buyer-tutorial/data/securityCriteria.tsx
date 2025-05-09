
import { React } from "react";
import { AlertTriangle, Award, BadgeCheck, Check, CircleHelp, Clock, FileCheck, Search, Settings, Shield, Star, Users, Wallet } from "lucide-react";

export const securityCriteria = [
  {
    title: "Verification Status",
    description: (
      <div>
        <p>Look for auditors with verified badges that indicate they've undergone Hawkly's verification process.</p>
        <div className="flex items-center gap-2 mt-2">
          <Shield className="h-4 w-4 text-primary" /> 
          <span className="text-xs font-medium">Verified</span>
          <BadgeCheck className="h-4 w-4 text-secondary ml-4" /> 
          <span className="text-xs font-medium">Expert</span>
        </div>
      </div>
    ),
    icon: <Shield className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">What verification means:</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Identity verified through wallet signing</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Professional credentials reviewed by platform</span>
          </li>
          <li className="flex items-start">
            <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Past work experience validated</span>
          </li>
        </ul>
        <div className="mt-4">
          <span className="text-sm font-medium">Expert status requires:</span>
          <div className="mt-2 flex items-center gap-2">
            <Award className="h-4 w-4 text-secondary" />
            <span className="text-xs">10+ successful audits</span>
            <Star className="h-4 w-4 text-secondary ml-2" />
            <span className="text-xs">4.8+ rating</span>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Past Experience",
    description: (
      <div>
        <p>Review the auditor's history with similar projects and technologies. Look for experience with your specific blockchain platform and smart contract language.</p>
        <div className="flex items-center gap-2 mt-2 text-xs">
          <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full">Solidity</span>
          <span className="bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">DeFi</span>
          <span className="bg-accent/20 text-accent px-2 py-0.5 rounded-full">NFT Projects</span>
        </div>
      </div>
    ),
    icon: <FileCheck className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">Why experience matters:</h4>
        <p className="text-sm mb-4">Auditors with experience in your specific domain are more likely to identify vulnerabilities relevant to your project.</p>
        <div className="space-y-3">
          <div>
            <div className="text-sm font-medium">Ask these questions:</div>
            <ul className="mt-1 space-y-1 text-sm">
              <li className="flex items-start">
                <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>"Have you audited similar projects to mine?"</span>
              </li>
              <li className="flex items-start">
                <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>"What vulnerabilities have you found in similar projects?"</span>
              </li>
              <li className="flex items-start">
                <CircleHelp className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>"Can you share redacted reports from previous audits?"</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Reviews & Ratings",
    description: "Check testimonials from previous clients and the auditor's overall rating. Pay attention to detailed reviews that explain the audit process and outcomes.",
    icon: <Users className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">How to evaluate reviews:</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Look for reviews that mention specific vulnerabilities found</span>
          </li>
          <li className="flex items-start">
            <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Prioritize reviews from projects in your domain</span>
          </li>
          <li className="flex items-start">
            <Search className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <span>Note comments about communication and responsiveness</span>
          </li>
        </ul>
        <div className="mt-4 p-3 border border-primary/20 rounded-md bg-primary/5">
          <div className="flex items-center mb-1">
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
            <span className="text-xs ml-2 font-medium">Example quality review:</span>
          </div>
          <p className="text-xs italic">"The auditor found a critical reentrancy vulnerability that other auditors missed. They provided clear explanations and helped us implement the fix correctly."</p>
        </div>
      </div>
    )
  },
  {
    title: "Response Time",
    description: "Consider how quickly the auditor responds to inquiries. Fast communication is crucial, especially when dealing with critical security vulnerabilities.",
    icon: <Clock className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">Communication expectations:</h4>
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Initial response within 24 hours</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Regular progress updates during audit</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Immediate notification for critical findings</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
            <span className="text-sm">Post-audit support for implementing fixes</span>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          Tip: Send a test message before hiring to gauge response time
        </div>
      </div>
    )
  },
  {
    title: "Transparent Pricing",
    description: "Look for clear pricing structures. Be wary of quotes that seem too low, as quality security audits require time and expertise.",
    icon: <Wallet className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">Pricing considerations:</h4>
        <div className="space-y-3 text-sm">
          <p>Typical pricing factors include:</p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Code complexity and size (SLOC)</span>
            </li>
            <li className="flex items-start">
              <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Audit timeline (standard vs. expedited)</span>
            </li>
            <li className="flex items-start">
              <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Depth of audit (basic review vs. formal verification)</span>
            </li>
            <li className="flex items-start">
              <Settings className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Additional services like fix verification</span>
            </li>
          </ul>
          <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            <span>Warning: Quality audits typically cost 0.5-2 ETH per 1,000 lines of code</span>
          </div>
        </div>
      </div>
    )
  }
];
