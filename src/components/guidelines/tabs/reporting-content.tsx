
import React from "react";

export function ReportingContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Audit Report Standards</h2>
        <p className="text-muted-foreground mb-6">
          Our standardized reporting format ensures clear communication of security findings and actionable remediation guidance.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Report Structure</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">1</span>
                </div>
                <div>
                  <span className="font-medium">Executive Summary</span>
                  <p className="text-sm text-muted-foreground">High-level overview with key findings and metrics</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">2</span>
                </div>
                <div>
                  <span className="font-medium">Scope & Methodology</span>
                  <p className="text-sm text-muted-foreground">Detailed description of what was audited and how</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">3</span>
                </div>
                <div>
                  <span className="font-medium">Findings & Vulnerabilities</span>
                  <p className="text-sm text-muted-foreground">Detailed technical analysis of each issue</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">4</span>
                </div>
                <div>
                  <span className="font-medium">Remediation Guidance</span>
                  <p className="text-sm text-muted-foreground">Actionable recommendations for fixing issues</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary bg-primary/10">
                  <span className="text-xs font-bold">5</span>
                </div>
                <div>
                  <span className="font-medium">Appendices</span>
                  <p className="text-sm text-muted-foreground">Supplementary technical details and resources</p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Finding Documentation Standards</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Each security finding must include the following components:
            </p>
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Unique Identifier</h4>
                  <p className="text-sm text-muted-foreground">Traceable reference code for each finding</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Severity Rating</h4>
                  <p className="text-sm text-muted-foreground">Critical, High, Medium, or Low classification</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Technical Description</h4>
                  <p className="text-sm text-muted-foreground">Detailed explanation with affected components</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Proof of Concept</h4>
                  <p className="text-sm text-muted-foreground">Code or scenario demonstrating the vulnerability</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Impact Assessment</h4>
                  <p className="text-sm text-muted-foreground">Potential consequences if exploited</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-1 bg-primary rounded"></div>
                <div>
                  <h4 className="font-medium">Remediation Steps</h4>
                  <p className="text-sm text-muted-foreground">Clear guidance for addressing the vulnerability</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Visual Documentation</h2>
        <p className="text-muted-foreground mb-6">
          Visual elements provide clarity and enhance understanding of complex security concepts.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Code Snippets</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Properly formatted code examples with annotations highlighting vulnerable sections.
            </p>
            <div className="bg-black/90 rounded p-3 font-mono text-xs text-gray-300 overflow-x-auto">
              <pre><code>{`function transfer(address to, uint256 amount) public {
  // VULNERABILITY: Missing balance check
  balances[msg.sender] -= amount;
  balances[to] += amount;
  emit Transfer(msg.sender, to, amount);
}`}</code></pre>
            </div>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Vulnerability Flow Diagrams</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Visual representation of attack vectors and exploitation paths.
            </p>
            <div className="bg-muted rounded p-4 h-36 flex items-center justify-center">
              <div className="text-center text-sm text-muted-foreground">
                [Diagram Placeholder]
                <p className="mt-2">Attack Vector Visualization</p>
              </div>
            </div>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Severity Metrics</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Graphical representation of security findings and their impact.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs">Critical</div>
                <div className="h-4 bg-red-500 rounded" style={{ width: '30%' }}></div>
                <div className="text-xs">3</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs">High</div>
                <div className="h-4 bg-amber-500 rounded" style={{ width: '50%' }}></div>
                <div className="text-xs">5</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs">Medium</div>
                <div className="h-4 bg-orange-500 rounded" style={{ width: '70%' }}></div>
                <div className="text-xs">7</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-24 text-xs">Low</div>
                <div className="h-4 bg-blue-500 rounded" style={{ width: '90%' }}></div>
                <div className="text-xs">9</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Verification & Follow-Up</h2>
        <p className="text-muted-foreground mb-6">
          Our audit process includes verification of remediation measures and ongoing support.
        </p>
        
        <div className="border border-border/60 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
            <div className="p-5">
              <h3 className="font-semibold mb-3">Remediation Verification</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Implementation Review</span>
                    <p className="text-xs text-muted-foreground">Review of applied fixes for correctness</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Regression Testing</span>
                    <p className="text-xs text-muted-foreground">Verification that fixes don't introduce new issues</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Final Security Assessment</span>
                    <p className="text-xs text-muted-foreground">Updated security posture evaluation</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="p-5">
              <h3 className="font-semibold mb-3">Continuous Support</h3>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Technical Consultation</span>
                    <p className="text-xs text-muted-foreground">Ongoing guidance for security concerns</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Security Monitoring</span>
                    <p className="text-xs text-muted-foreground">Optional continuous security assessment</p>
                  </div>
                </li>
                <li className="flex gap-2">
                  <div className="flex-none mt-1">
                    <div className="h-2 w-2 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <span>Vulnerability Disclosure</span>
                    <p className="text-xs text-muted-foreground">Coordination for responsible disclosure if needed</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
