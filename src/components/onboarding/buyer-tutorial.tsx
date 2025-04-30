
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Book, 
  ArrowRight, 
  CheckCircle, 
  Shield, 
  FileCheck, 
  Users, 
  Clock, 
  Wallet, 
  AlertTriangle, 
  BadgeCheck,
  Star,
  Award,
  Search,
  Check,
  CircleHelp,
  Settings
} from "lucide-react";

interface TutorialStepProps {
  title: string;
  description: React.ReactNode;
  icon: React.ReactNode;
  completed?: boolean;
  onClick?: () => void;
}

const TutorialStep = ({ title, description, icon, completed = false, onClick }: TutorialStepProps) => {
  return (
    <div 
      className={`p-4 border rounded-lg mb-4 ${completed ? 'border-primary/30 bg-primary/5' : 'border-border'} 
                 ${onClick ? 'cursor-pointer hover:border-primary/50 transition-colors' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-start">
        <div className={`mr-4 rounded-full p-2 ${completed ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-medium mb-1 flex items-center">
            {title}
            {completed && <CheckCircle className="ml-2 h-4 w-4 text-primary" />}
          </h3>
          <div className="text-sm text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
};

interface BuyerTutorialProps {
  onComplete: () => void;
  onClose: () => void;
}

export function BuyerTutorial({ onComplete, onClose }: BuyerTutorialProps) {
  const [activeTab, setActiveTab] = useState("choose-auditor");
  const [progress, setProgress] = useState({
    "choose-auditor": 0,
    "prepare-audit": 0,
    "review-report": 0
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [showingDetails, setShowingDetails] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  const incrementProgress = (tab: string) => {
    if (progress[tab as keyof typeof progress] < 100) {
      setProgress(prev => ({
        ...prev,
        [tab]: Math.min(prev[tab as keyof typeof progress] + 25, 100)
      }));
    }
  };
  
  const allCompleted = Object.values(progress).every(p => p === 100);

  // Auto-increment progress every time user changes tabs
  useEffect(() => {
    if (activeTab && currentStep === 0) {
      incrementProgress(activeTab);
      setCurrentStep(1); // Move to first step
    }
  }, [activeTab]);
  
  // Security criteria for selecting an auditor
  const securityCriteria = [
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
  
  // Steps to prepare for an audit
  const preparationSteps = [
    {
      title: "Document Your Project",
      description: "Create comprehensive documentation including the purpose of your smart contracts, expected user interactions, and potential risk areas.",
      icon: <Book className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Essential documentation includes:</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Project Overview</strong>
                <p className="text-xs text-muted-foreground mt-0.5">A high-level description of what your project does</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>User Flow Diagrams</strong>
                <p className="text-xs text-muted-foreground mt-0.5">Visual representation of how users interact with your contracts</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Contract Architecture</strong>
                <p className="text-xs text-muted-foreground mt-0.5">How your contracts interact with each other and external systems</p>
              </div>
            </li>
            <li className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Risk Assessment</strong>
                <p className="text-xs text-muted-foreground mt-0.5">Areas you're concerned about or known potential vulnerabilities</p>
              </div>
            </li>
          </ul>
          <div className="mt-4 text-xs bg-primary/5 p-2 rounded">
            <span className="font-medium">Pro tip:</span> Creating thorough documentation helps you understand your own project better and identifies potential issues before the audit even begins.
          </div>
        </div>
      )
    },
    {
      title: "Define Scope",
      description: "Clearly outline which contracts, functions, and systems should be included in the audit. Be specific about areas of concern.",
      icon: <FileCheck className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Creating a proper scope document:</h4>
          <div className="space-y-3 text-sm">
            <p>Your scope document should include:</p>
            <div className="space-y-2">
              <div className="p-2 border border-border rounded">
                <div className="font-medium">Contract List</div>
                <p className="text-xs text-muted-foreground">List all smart contracts to be audited with file paths and LOC</p>
                <div className="mt-1 text-xs bg-muted p-1 rounded font-mono">
                  contracts/Token.sol (156 LOC)<br />
                  contracts/Vesting.sol (243 LOC)
                </div>
              </div>

              <div className="p-2 border border-border rounded">
                <div className="font-medium">Dependencies</div>
                <p className="text-xs text-muted-foreground">External libraries and contracts your code depends on</p>
                <div className="mt-1 text-xs bg-muted p-1 rounded font-mono">
                  @openzeppelin/contracts v4.8.2
                </div>
              </div>

              <div className="p-2 border border-border rounded">
                <div className="font-medium">Focus Areas</div>
                <p className="text-xs text-muted-foreground">Specific functions or aspects requiring extra attention</p>
                <div className="mt-1 text-xs bg-muted p-1 rounded">
                  - Token transfer mechanism<br />
                  - Admin access controls<br />
                  - Vesting schedule calculation
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Clean Your Code",
      description: "Remove unnecessary comments, unused functions, and ensure your code follows best practices before submission.",
      icon: <CheckCircle className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Code cleanup checklist:</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Remove debugging code</strong>
                <p className="text-xs text-muted-foreground">Delete console.log statements and debugging variables</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Clean up comments</strong>
                <p className="text-xs text-muted-foreground">Remove outdated TODOs and keep only helpful NatSpec comments</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Organize imports</strong>
                <p className="text-xs text-muted-foreground">Group and order imports logically</p>
              </div>
            </div>
            <div className="flex items-start">
              <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <div>
                <strong>Apply consistent formatting</strong>
                <p className="text-xs text-muted-foreground">Use tools like Prettier or Solhint</p>
              </div>
            </div>
            <div className="mt-4 p-2 border border-blue-200 rounded bg-blue-50 text-blue-800 text-xs">
              <span className="font-medium">Tool recommendation:</span> Use automated linters like Slither and MythX to identify common issues before the audit begins.
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Provide Test Suite",
      description: "Include comprehensive tests that cover various scenarios and edge cases to help auditors understand expected behavior.",
      icon: <FileCheck className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Test suite requirements:</h4>
          <div className="space-y-3 text-sm">
            <p>A good test suite should include:</p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Unit tests for all public functions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Integration tests for contract interactions</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Edge case scenarios (e.g., zero values, max limits)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Failure case tests (expect to revert)</span>
              </li>
              <li className="flex items-start">
                <Check className="h-4 w-4 text-primary mr-2 mt-0.5" />
                <span>Access control tests</span>
              </li>
            </ul>
            <div className="mt-2">
              <div className="text-xs font-medium">Target coverage metrics:</div>
              <div className="mt-1 flex items-center gap-2">
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: "85%" }}></div>
                </div>
                <span className="text-xs font-medium">85%+</span>
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];
  
  // Guidance on reviewing audit reports
  const reviewGuidance = [
    {
      title: "Understand Severity Levels",
      description: (
        <div>
          <p>Learn how vulnerabilities are categorized by severity:</p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <span className="text-xs font-medium">Critical</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-orange-400"></div>
              <span className="text-xs font-medium">High</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <span className="text-xs font-medium">Medium</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-3 w-3 rounded-full bg-blue-400"></div>
              <span className="text-xs font-medium">Low</span>
            </div>
          </div>
        </div>
      ),
      icon: <AlertTriangle className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-3">Severity level breakdown:</h4>
          <div className="space-y-3">
            <div className="p-2 border border-red-200 bg-red-50 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                <span className="font-medium text-red-700">Critical</span>
              </div>
              <p className="text-xs text-red-700 mt-1">Direct loss of funds, permanent freezing of assets, or complete control takeover</p>
              <div className="mt-1 text-xs bg-white/50 p-1 rounded">
                <span className="font-mono">Example: Reentrancy vulnerability allowing theft of all contract funds</span>
              </div>
            </div>
            
            <div className="p-2 border border-orange-200 bg-orange-50 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-orange-400 mr-2"></div>
                <span className="font-medium text-orange-700">High</span>
              </div>
              <p className="text-xs text-orange-700 mt-1">Significant risk of fund loss or major functionality breakage</p>
              <div className="mt-1 text-xs bg-white/50 p-1 rounded">
                <span className="font-mono">Example: Overflow in balance calculation allowing more tokens than owned</span>
              </div>
            </div>
            
            <div className="p-2 border border-yellow-200 bg-yellow-50 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2"></div>
                <span className="font-medium text-yellow-700">Medium</span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">Limited impact on funds or functionality under specific conditions</p>
              <div className="mt-1 text-xs bg-white/50 p-1 rounded">
                <span className="font-mono">Example: Front-running vulnerability allowing miners to manipulate specific transactions</span>
              </div>
            </div>
            
            <div className="p-2 border border-blue-200 bg-blue-50 rounded-md">
              <div className="flex items-center">
                <div className="h-3 w-3 rounded-full bg-blue-400 mr-2"></div>
                <span className="font-medium text-blue-700">Low</span>
              </div>
              <p className="text-xs text-blue-700 mt-1">Best practice violations or theoretical issues with minimal practical impact</p>
              <div className="mt-1 text-xs bg-white/50 p-1 rounded">
                <span className="font-mono">Example: Gas optimization issues or unused variables</span>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Prioritize Issues",
      description: "Focus on critical and high severity issues first. These pose the greatest risk to your project and users.",
      icon: <AlertTriangle className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Issue prioritization strategy:</h4>
          <div className="space-y-3 text-sm">
            <div className="p-2 border border-border rounded">
              <div className="font-medium">1. Triage Issues</div>
              <p className="text-xs text-muted-foreground">Group findings by severity and categorize them by affected component</p>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-1">Severity</th>
                      <th className="text-left p-1">Count</th>
                      <th className="text-left p-1">Timeline</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-1">Critical</td>
                      <td className="p-1">Fix immediately</td>
                      <td className="p-1">24-48 hours</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">High</td>
                      <td className="p-1">Fix before launch</td>
                      <td className="p-1">1 week</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-1">Medium</td>
                      <td className="p-1">Fix soon</td>
                      <td className="p-1">2 weeks</td>
                    </tr>
                    <tr>
                      <td className="p-1">Low</td>
                      <td className="p-1">Schedule for later</td>
                      <td className="p-1">Next release</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="p-2 border border-border rounded">
              <div className="font-medium">2. Assess Impact</div>
              <p className="text-xs text-muted-foreground">For each issue, evaluate:</p>
              <ul className="mt-1 text-xs space-y-1">
                <li>• Risk to user funds</li>
                <li>• Impact on core functionality</li>
                <li>• Likelihood of exploitation</li>
                <li>• Complexity to fix</li>
              </ul>
            </div>
            
            <div className="p-2 border border-border rounded">
              <div className="font-medium">3. Create Action Plan</div>
              <p className="text-xs text-muted-foreground">Document each issue with assigned developer and target fix date</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Understand Root Causes",
      description: "Don't just fix the symptoms. Make sure you understand the underlying issues to prevent similar problems in the future.",
      icon: <FileCheck className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Investigating root causes:</h4>
          <div className="space-y-3 text-sm">
            <p>For each vulnerability:</p>
            <div className="space-y-2">
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">1.</div>
                <div>
                  <strong>Ask "why" multiple times</strong>
                  <p className="text-xs text-muted-foreground">Trace back from the symptom to fundamental causes</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">2.</div>
                <div>
                  <strong>Look for patterns</strong>
                  <p className="text-xs text-muted-foreground">Are similar issues appearing across different contracts?</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">3.</div>
                <div>
                  <strong>Examine design decisions</strong>
                  <p className="text-xs text-muted-foreground">Was the vulnerability caused by an architectural flaw?</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="mr-2 mt-0.5">4.</div>
                <div>
                  <strong>Review development processes</strong>
                  <p className="text-xs text-muted-foreground">Could better practices have prevented this issue?</p>
                </div>
              </div>
            </div>
            <div className="mt-3 p-2 border border-green-200 bg-green-50 rounded text-green-800 text-xs">
              <Check className="h-4 w-4 inline mr-1 text-green-600" />
              <span>Document learnings from each vulnerability to improve future coding practices</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Verify Fixes",
      description: "After implementing fixes, request a verification review to ensure that all issues have been properly resolved.",
      icon: <CheckCircle className="h-5 w-5" />,
      details: (
        <div className="mt-4 p-4 rounded-lg bg-muted/50">
          <h4 className="font-semibold mb-2">Fix verification process:</h4>
          <div className="space-y-3 text-sm">
            <ol className="list-decimal pl-4 space-y-2">
              <li>
                <strong>Document each fix</strong>
                <p className="text-xs text-muted-foreground">Explain how your changes address the identified vulnerability</p>
              </li>
              <li>
                <strong>Write tests for each fix</strong>
                <p className="text-xs text-muted-foreground">Create specific test cases that would fail before your fix and pass after</p>
              </li>
              <li>
                <strong>Request verification from auditor</strong>
                <p className="text-xs text-muted-foreground">Most auditors offer fix verification services, often at additional cost</p>
              </li>
              <li>
                <strong>Consider a follow-up audit</strong>
                <p className="text-xs text-muted-foreground">For significant changes, a focused re-audit may be necessary</p>
              </li>
            </ol>
            <div className="mt-3 p-2 border border-primary/20 bg-primary/5 rounded text-xs">
              <span className="font-medium">Pro tip:</span> Bundle multiple fixes together for verification to save costs, but don't wait too long between finding issues and fixing them.
            </div>
          </div>
        </div>
      )
    }
  ];

  const toggleDetails = (id: string) => {
    setShowingDetails(showingDetails === id ? null : id);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-xl">
          <Book className="h-5 w-5 mr-2 text-primary" />
          Smart Contract Audit Guide
        </CardTitle>
      </CardHeader>
      
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          setActiveTab(value);
          // Increment progress when user changes tabs
          incrementProgress(value);
          setShowingDetails(null); // Reset details view when changing tabs
        }}
      >
        <div className="px-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="choose-auditor" className="text-xs sm:text-sm">
              <Shield className="h-4 w-4 mr-1 hidden sm:inline" />
              Choosing an Auditor
            </TabsTrigger>
            <TabsTrigger value="prepare-audit" className="text-xs sm:text-sm">
              <FileCheck className="h-4 w-4 mr-1 hidden sm:inline" />
              Preparing for Audit
            </TabsTrigger>
            <TabsTrigger value="review-report" className="text-xs sm:text-sm">
              <Book className="h-4 w-4 mr-1 hidden sm:inline" />
              Reviewing Reports
            </TabsTrigger>
          </TabsList>
        </div>
        
        <CardContent className="pt-6">
          <TabsContent value="choose-auditor" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">How to Choose the Right Security Auditor</h3>
                <p className="text-sm text-muted-foreground">
                  Selecting the right security auditor is crucial for the safety of your blockchain project. Here's what to look for:
                </p>
              </div>
              
              <div className="space-y-4">
                {securityCriteria.map((criteria, index) => (
                  <div key={index}>
                    <TutorialStep
                      title={criteria.title}
                      description={criteria.description}
                      icon={criteria.icon}
                      completed={progress["choose-auditor"] >= (index + 1) * 25}
                      onClick={() => toggleDetails(`choose-auditor-${index}`)}
                    />
                    {showingDetails === `choose-auditor-${index}` && criteria.details}
                  </div>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["choose-auditor"]}% complete</span>
                </div>
                <Progress value={progress["choose-auditor"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="prepare-audit" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">Preparing Your Project for Audit</h3>
                <p className="text-sm text-muted-foreground">
                  Proper preparation ensures a more effective and efficient audit process. Follow these steps:
                </p>
              </div>
              
              <div className="space-y-4">
                {preparationSteps.map((step, index) => (
                  <div key={index}>
                    <TutorialStep
                      title={step.title}
                      description={step.description}
                      icon={step.icon}
                      completed={progress["prepare-audit"] >= (index + 1) * 25}
                      onClick={() => toggleDetails(`prepare-audit-${index}`)}
                    />
                    {showingDetails === `prepare-audit-${index}` && step.details}
                  </div>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["prepare-audit"]}% complete</span>
                </div>
                <Progress value={progress["prepare-audit"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="review-report" className="m-0">
            <div className="space-y-5">
              <div>
                <h3 className="text-lg font-medium mb-1">Understanding Audit Reports</h3>
                <p className="text-sm text-muted-foreground">
                  Knowing how to interpret and act on audit findings is essential for improving your project's security:
                </p>
              </div>
              
              <div className="space-y-4">
                {reviewGuidance.map((guidance, index) => (
                  <div key={index}>
                    <TutorialStep
                      title={guidance.title}
                      description={guidance.description}
                      icon={guidance.icon}
                      completed={progress["review-report"] >= (index + 1) * 25}
                      onClick={() => toggleDetails(`review-report-${index}`)}
                    />
                    {showingDetails === `review-report-${index}` && guidance.details}
                  </div>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">Progress</span>
                  <span className="text-sm text-muted-foreground">{progress["review-report"]}% complete</span>
                </div>
                <Progress value={progress["review-report"]} className="h-2" />
              </div>
            </div>
          </TabsContent>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <div>
            <Button 
              onClick={() => {
                incrementProgress(activeTab);
                if (allCompleted) {
                  onComplete();
                }
              }}
            >
              {!allCompleted ? "Mark Section Complete" : "Finish Tutorial"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
