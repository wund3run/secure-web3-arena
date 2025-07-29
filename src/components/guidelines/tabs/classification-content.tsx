
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, AlertTriangle, AlertCircle, Info } from "lucide-react";

export function ClassificationContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Vulnerability Classification System</h2>
        <p className="text-muted-foreground mb-6">
          Our standardized classification system ensures consistent evaluation and reporting of security issues across all audits on the Hawkly platform.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1 p-1.5 bg-red-500/10 rounded-full">
                <Shield className="h-5 w-5 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-red-500">Critical</h3>
                <p className="text-sm text-muted-foreground">
                  Issues that can result in immediate loss of funds or system compromise
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Direct theft of funds</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Permanent freezing of funds</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Protocol insolvency</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1 p-1.5 bg-amber-500/10 rounded-full">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-amber-500">High</h3>
                <p className="text-sm text-muted-foreground">
                  Issues affecting data integrity that are not immediately exploitable
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Loss of user funds under specific conditions</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Severe logic flaws</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mr-2"></div>
                <span className="text-sm">Privilege escalation</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1 p-1.5 bg-orange-500/10 rounded-full">
                <AlertCircle className="h-5 w-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-500">Medium</h3>
                <p className="text-sm text-muted-foreground">
                  Risks that arise under specific conditions
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Denial of service attacks</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Function failures</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-orange-500 mr-2"></div>
                <span className="text-sm">Economic vulnerabilities requiring specific conditions</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex items-start mb-4">
              <div className="mr-3 mt-1 p-1.5 bg-blue-500/10 rounded-full">
                <Info className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-500">Low</h3>
                <p className="text-sm text-muted-foreground">
                  Minor issues or best practice recommendations
                </p>
              </div>
            </div>
            <ul className="space-y-3">
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Gas optimizations</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Code quality issues</span>
              </li>
              <li className="flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Deviations from best practices</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Common Vulnerability Types</h2>
        <p className="text-muted-foreground mb-6">
          We use standardized vulnerability classifications to ensure consistent reporting across all audits.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Smart Contract Vulnerabilities</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Reentrancy</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Integer Overflow/Underflow</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Access Control Failures</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Front-Running</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Oracle Manipulation</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-2">Protocol-Level Vulnerabilities</h3>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Economic Attack Vectors</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Governance Vulnerabilities</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>MEV Vulnerabilities</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Cross-Chain Vulnerabilities</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Token Economic Issues</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Industry Standards Integration</h2>
        <p className="text-muted-foreground mb-6">
          Our classification system aligns with industry standards to provide comprehensive coverage.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            <div>
              <h4 className="font-medium">Smart Contract Weakness Classification (SWC)</h4>
              <p className="text-sm text-muted-foreground">Mapping to standardized smart contract vulnerabilities</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            <div>
              <h4 className="font-medium">Common Weakness Enumeration (CWE)</h4>
              <p className="text-sm text-muted-foreground">References to widely recognized software weakness categories</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <div className="flex h-5 w-5 items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary"></div>
            </div>
            <div>
              <h4 className="font-medium">OWASP Top 10 for Smart Contracts</h4>
              <p className="text-sm text-muted-foreground">Alignment with OWASP's top security risks for smart contracts</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
