
import { AlertTriangle, CheckCircle, FileCheck, Check } from "lucide-react";

export const reviewGuidance = [
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
