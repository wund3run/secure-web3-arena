
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Wrench, Search, Shield, Bug, FileCode, Code } from "lucide-react";

export function ToolsContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Audit Tools & Methodology</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly auditors utilize a comprehensive suite of industry-leading tools and methodologies to perform rigorous security assessments. Our multi-layered approach combines automated analysis with manual expert review to ensure thorough examination of smart contracts and blockchain applications.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Wrench className="h-5 w-5 text-primary" />
          Approved Security Tools
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* MythX */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">MythX</h4>
                <Badge variant="outline" className="bg-primary/10">Primary Tool</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Comprehensive smart contract security analysis platform</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Detecting common vulnerability patterns</li>
                <li>Symbolic execution for complex execution paths</li>
                <li>Formal verification of security properties</li>
                <li>Coverage-guided fuzzing</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Auditors must use the latest version with custom rule sets configured for each project type
              </div>
            </div>
          </div>
          
          {/* Slither */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Slither</h4>
                <Badge variant="outline" className="bg-primary/10">Static Analysis</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Static analysis framework for Solidity</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Contract inheritance analysis</li>
                <li>Control flow visualization</li>
                <li>Variable use and dependency tracking</li>
                <li>Custom detector development</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Minimum version requirement: 0.8.0 or newer with Hawkly custom detectors
              </div>
            </div>
          </div>
          
          {/* Echidna */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Echidna</h4>
                <Badge variant="outline" className="bg-primary/10">Fuzz Testing</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Property-based fuzzing tool for Ethereum smart contracts</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Property-based testing</li>
                <li>Invariant testing for complex protocols</li>
                <li>Coverage-guided fuzzing</li>
                <li>Sequence-based testing for state transitions</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Required for DeFi protocols and any system with complex state transitions
              </div>
            </div>
          </div>
          
          {/* Manticore */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Manticore</h4>
                <Badge variant="outline" className="bg-primary/10">Symbolic Execution</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Symbolic execution tool for smart contract analysis</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Path exploration and constraint solving</li>
                <li>Detecting complex logic vulnerabilities</li>
                <li>Generating comprehensive test cases</li>
                <li>Input generation for edge case discovery</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Used selectively for critical functions with complex conditional paths
              </div>
            </div>
          </div>
          
          {/* Surya */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Surya</h4>
                <Badge variant="outline" className="bg-primary/10">Visualization</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Contract visualization and analysis utility</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Function call graphs and inheritance trees</li>
                <li>Contract structure visualization</li>
                <li>Complexity analysis</li>
                <li>Modifier usage mapping</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Required for initial analysis phase to understand contract architecture
              </div>
            </div>
          </div>
          
          {/* Custom Tools */}
          <div className="border border-border rounded-lg overflow-hidden hover:border-primary/40 transition-all duration-300">
            <div className="bg-primary/5 border-b border-border p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold">Hawkly Custom Tools</h4>
                <Badge variant="outline" className="bg-primary/10">Proprietary</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Specialized tools developed by Hawkly security researchers</p>
            </div>
            <div className="p-4">
              <p className="text-sm mb-3">Primary uses:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Protocol-specific vulnerability detection</li>
                <li>Transaction simulation and validation</li>
                <li>Economic attack vector analysis</li>
                <li>Cross-contract vulnerability detection</li>
              </ul>
              <div className="text-xs mt-4 text-muted-foreground bg-muted p-2 rounded">
                Proprietary tools available exclusively to verified Hawkly auditors
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Search className="h-5 w-5 text-primary" />
          Manual Review Methodologies
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Line-by-Line Code Review
            </h4>
            <p className="text-sm text-muted-foreground">
              Experienced auditors systematically review each line of code, focusing on security implications, logic flaws, and adherence to best practices. All code must be reviewed by at least two certified auditors using complementary review patterns.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Bug className="h-4 w-4 text-primary" />
              Attack Vector Mapping
            </h4>
            <p className="text-sm text-muted-foreground">
              Auditors create comprehensive maps of potential attack vectors based on contract functionality, value flows, and external dependencies. Each identified vector is systematically tested through manual exploration and specialized tools.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <FileCode className="h-4 w-4 text-primary" />
              Business Logic Analysis
            </h4>
            <p className="text-sm text-muted-foreground">
              Evaluate the contract's business logic against its intended functionality to identify logical inconsistencies, edge cases, and economic vulnerabilities that automated tools might miss. This includes mathematical model verification for financial protocols.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Code className="h-4 w-4 text-primary" />
              Test Case Development
            </h4>
            <p className="text-sm text-muted-foreground">
              Create comprehensive test scenarios that validate security properties and explore edge cases. All critical functions must have defined test cases that verify correct behavior under normal conditions and resilience against attack scenarios.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="bg-muted p-6 rounded-lg">
        <h3 className="text-xl font-semibold mb-4">Tool Usage Standards</h3>
        
        <div className="space-y-4 text-sm text-muted-foreground">
          <p>
            <span className="font-medium text-foreground">Tool Selection:</span> Auditors must select the appropriate combination of tools based on the project's specific requirements, complexity, and risk profile. The audit plan must document tool selection rationale.
          </p>
          
          <p>
            <span className="font-medium text-foreground">Version Control:</span> All tools must be maintained at their latest stable versions unless specific project requirements dictate otherwise. Version information must be documented in audit reports.
          </p>
          
          <p>
            <span className="font-medium text-foreground">Custom Configuration:</span> Standard tool configurations must be adapted to project-specific requirements to maximize effectiveness. Configuration parameters must be documented.
          </p>
          
          <p>
            <span className="font-medium text-foreground">Result Verification:</span> All tool-generated findings must be manually verified by qualified auditors to eliminate false positives and assess true impact.
          </p>
          
          <p>
            <span className="font-medium text-foreground">Continuous Improvement:</span> Hawkly regularly evaluates new tools and methodologies for inclusion in our standard toolkit. Auditors are encouraged to recommend tools that enhance our security assessment capabilities.
          </p>
        </div>
      </div>
    </div>
  );
}
