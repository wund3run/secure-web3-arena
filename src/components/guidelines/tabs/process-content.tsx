
import React from "react";

export function ProcessContent() {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Comprehensive Audit Process</h2>
        <p className="text-muted-foreground mb-6">
          Our standardized audit methodology ensures thorough security assessment through a structured, multi-phase approach.
        </p>
        
        <div className="space-y-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                1
              </div>
              <h3 className="text-lg font-semibold">Initial Assessment & Planning</h3>
            </div>
            <p className="text-muted-foreground mb-4 md:ml-12">
              The first phase establishes project scope, security requirements, and audit boundaries.
            </p>
            <ul className="space-y-2 md:ml-12">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Project documentation and architecture review</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Risk assessment and vulnerability prioritization</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Audit planning and resource allocation</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Threat modeling and attack surface analysis</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                2
              </div>
              <h3 className="text-lg font-semibold">Code Review & Static Analysis</h3>
            </div>
            <p className="text-muted-foreground mb-4 md:ml-12">
              Comprehensive code examination combining manual review with automated tools.
            </p>
            <ul className="space-y-2 md:ml-12">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Manual code review by security experts</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Automated vulnerability scanning</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Business logic review</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Cryptographic implementation analysis</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                3
              </div>
              <h3 className="text-lg font-semibold">Dynamic Testing & Simulation</h3>
            </div>
            <p className="text-muted-foreground mb-4 md:ml-12">
              Comprehensive testing to identify vulnerabilities in real-world scenarios.
            </p>
            <ul className="space-y-2 md:ml-12">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Unit and integration testing</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Fuzz testing for edge cases</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Simulation of attack scenarios</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Economic attack vector analysis</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                4
              </div>
              <h3 className="text-lg font-semibold">Reporting & Remediation</h3>
            </div>
            <p className="text-muted-foreground mb-4 md:ml-12">
              Detailed documentation of findings and guidance for vulnerability remediation.
            </p>
            <ul className="space-y-2 md:ml-12">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Comprehensive vulnerability reporting</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Risk assessment and prioritization</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Remediation recommendations</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Fix verification and follow-up</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-4">Audit Deliverables</h2>
        <p className="text-muted-foreground mb-6">
          Each Hawkly audit produces comprehensive documentation and actionable insights.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Executive Summary</h3>
            <p className="text-sm text-muted-foreground mb-4">
              High-level overview of findings and security posture, accessible to non-technical stakeholders.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Security rating and overall assessment</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Key vulnerability summary</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Risk exposure assessment</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Technical Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Detailed technical analysis with comprehensive vulnerability documentation.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Detailed vulnerability descriptions</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Code snippets and evidence</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Exploitation scenarios</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Remediation Plan</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Actionable guidance for addressing identified vulnerabilities.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Prioritized fix recommendations</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Code examples for fixes</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Mitigation strategies</span>
              </li>
            </ul>
          </div>
          
          <div className="border border-border/60 rounded-lg p-5 bg-card/50">
            <h3 className="text-lg font-semibold mb-3">Verification Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Follow-up documentation confirming remediation of identified issues.
            </p>
            <ul className="space-y-2">
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Fix verification results</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Regression testing confirmation</span>
              </li>
              <li className="flex gap-2">
                <div className="flex-none mt-1">
                  <div className="h-2 w-2 rounded-full bg-primary"></div>
                </div>
                <span>Updated security posture assessment</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
