
import React from "react";

export function ToolsContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Security Assessment Tools</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly auditors utilize a comprehensive suite of industry-standard and proprietary tools to ensure thorough security assessment.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Static Analysis Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Automated code scanning tools that identify vulnerabilities without executing the code.
            </p>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="font-medium">MythX</span>
                <span className="text-sm text-muted-foreground">Comprehensive security analysis platform for Ethereum smart contracts</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Slither</span>
                <span className="text-sm text-muted-foreground">Static analysis framework with customizable vulnerability detectors</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Securify</span>
                <span className="text-sm text-muted-foreground">Security scanner for Ethereum smart contracts</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Hawkly Analyzer</span>
                <span className="text-sm text-muted-foreground">Proprietary static analysis tool with Web3-specific checks</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Dynamic Analysis Tools</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Tools that execute code to identify vulnerabilities in runtime environments.
            </p>
            <ul className="space-y-3">
              <li className="flex flex-col">
                <span className="font-medium">Echidna</span>
                <span className="text-sm text-muted-foreground">Ethereum smart contract fuzzer for property-based testing</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Manticore</span>
                <span className="text-sm text-muted-foreground">Symbolic execution tool for smart contract analysis</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Foundry</span>
                <span className="text-sm text-muted-foreground">Fast, portable and modular toolkit for Ethereum application development</span>
              </li>
              <li className="flex flex-col">
                <span className="font-medium">Hawkly Simulator</span>
                <span className="text-sm text-muted-foreground">Proprietary blockchain simulation environment for testing edge cases</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Audit Methodology</h2>
        <p className="text-muted-foreground mb-6">
          Our structured approach combines automated tools with manual expertise for comprehensive security assessment.
        </p>
        
        <div className="bg-card/50 border border-border/60 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="p-5">
              <h3 className="font-semibold mb-3">Manual Code Review</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Line-by-line source code analysis</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Business logic assessment</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Cryptographic implementation review</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Access control verification</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold mb-3">Automated Analysis</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Vulnerability scanning</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Formal verification</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Fuzz testing</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Symbolic execution</span>
                </li>
              </ul>
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold mb-3">Economic Analysis</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Game theory assessment</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Incentive mechanism review</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">Attack vector simulation</span>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <span className="text-sm">MEV vulnerability assessment</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Tool Standards & Updates</h2>
        <p className="text-muted-foreground mb-6">
          We maintain rigorous standards for security tools and stay current with emerging technologies.
        </p>
        
        <div className="space-y-6">
          <div className="bg-card/50 border border-border/60 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3">Tool Selection Criteria</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <span className="font-medium">Effectiveness</span>
                  <p className="text-sm text-muted-foreground">Tools must demonstrate proven capability in identifying relevant vulnerabilities</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <span className="font-medium">Reliability</span>
                  <p className="text-sm text-muted-foreground">Low false positive rate and consistent performance</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <span className="font-medium">Currency</span>
                  <p className="text-sm text-muted-foreground">Regular updates to address emerging vulnerabilities</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div>
                  <span className="font-medium">Specialized Coverage</span>
                  <p className="text-sm text-muted-foreground">Tools must address blockchain-specific vulnerabilities</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-card/50 border border-border/60 rounded-lg p-5">
            <h3 className="text-lg font-semibold mb-3">Continuous Improvement</h3>
            <p className="text-muted-foreground mb-4">
              Our security toolkit evolves to adapt to emerging threats and technological changes.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Monthly tool assessment and updates</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Development of custom tools for emerging threats</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Integration of academic research findings into methodologies</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Feedback loop from audit results to tool enhancement</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
