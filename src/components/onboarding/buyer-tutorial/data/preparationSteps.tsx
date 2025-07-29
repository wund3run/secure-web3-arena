
import { Book, CheckCircle, FileCheck } from "lucide-react";

export const preparationSteps = [
  {
    title: "Document Your Project",
    description: "Create comprehensive documentation including the purpose of your smart contracts, expected user interactions, and potential risk areas.",
    icon: <Book className="h-5 w-5" />,
    details: (
      <div className="mt-4 p-4 rounded-lg bg-muted/50">
        <h4 className="font-semibold mb-2">Essential documentation includes:</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>Project Overview</strong>
              <p className="text-xs text-muted-foreground mt-0.5">A high-level description of what your project does</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>User Flow Diagrams</strong>
              <p className="text-xs text-muted-foreground mt-0.5">Visual representation of how users interact with your contracts</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>Contract Architecture</strong>
              <p className="text-xs text-muted-foreground mt-0.5">How your contracts interact with each other and external systems</p>
            </div>
          </li>
          <li className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
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
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>Remove debugging code</strong>
              <p className="text-xs text-muted-foreground">Delete console.log statements and debugging variables</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>Clean up comments</strong>
              <p className="text-xs text-muted-foreground">Remove outdated TODOs and keep only helpful NatSpec comments</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
            <div>
              <strong>Organize imports</strong>
              <p className="text-xs text-muted-foreground">Group and order imports logically</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
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
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Unit tests for all public functions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Integration tests for contract interactions</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Edge case scenarios (e.g., zero values, max limits)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
              <span>Failure case tests (expect to revert)</span>
            </li>
            <li className="flex items-start">
              <CheckCircle className="h-4 w-4 text-primary mr-2 mt-0.5" />
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
