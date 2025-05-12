
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Clock, FileSearch, FileCode, MessageCircle, CheckCheck, GitPullRequest, Bug } from "lucide-react";

export function ProcessContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Audit Process & Methodology</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly's comprehensive security audit process follows a standardized methodology designed to identify vulnerabilities across all aspects of Web3 projects. Our process ensures thorough examination while maintaining transparency with stakeholders.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {/* Step 1 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Clock className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Initial Assessment</h3>
              <p className="text-muted-foreground mb-4">
                Conduct a preliminary review to understand the project's scope, architecture, and security requirements. This phase involves analyzing documentation and understanding the intended behavior of the system.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Deliverables:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Scope definition document</li>
                  <li>Architecture review notes</li>
                  <li>Preliminary risk assessment</li>
                  <li>Audit timeline and resource allocation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 2 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileCode className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">2. Manual Code Review</h3>
              <p className="text-muted-foreground mb-4">
                Expert auditors meticulously review the codebase line by line to identify security vulnerabilities, logic errors, and deviations from best practices. This review focuses on critical areas like fund transfers, access controls, and external calls.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Focus Areas:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Access control mechanisms</li>
                  <li>Input validation and sanitization</li>
                  <li>Business logic vulnerabilities</li>
                  <li>Compliance with standards and best practices</li>
                  <li>Contract interactions and external calls</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 3 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <FileSearch className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">3. Automated Testing & Analysis</h3>
              <p className="text-muted-foreground mb-4">
                Deploy multiple specialized tools to perform static analysis, fuzzing, symbolic execution, and formal verification. Automated testing helps uncover edge cases and vulnerabilities that might be missed during manual review.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Tools Utilized:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>MythX for vulnerability detection</li>
                  <li>Slither for static analysis</li>
                  <li>Echidna for fuzz testing</li>
                  <li>Customized scripts for specific project requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 4 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Bug className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">4. Vulnerability Verification</h3>
              <p className="text-muted-foreground mb-4">
                Each identified vulnerability undergoes rigorous verification to confirm its existence, assess exploitability, and determine potential impact. This phase eliminates false positives and ensures accurate severity classifications.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Verification Process:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Proof-of-concept exploit development</li>
                  <li>Impact assessment under various conditions</li>
                  <li>Root cause analysis</li>
                  <li>Severity classification according to standardized criteria</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 5 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <MessageCircle className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">5. Reporting & Communication</h3>
              <p className="text-muted-foreground mb-4">
                Prepare a comprehensive audit report detailing all findings, including their severity, potential impact, and recommended remediation steps. Findings are communicated clearly to stakeholders with technical context.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Report Components:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Executive summary for non-technical stakeholders</li>
                  <li>Detailed technical findings with code references</li>
                  <li>Severity classifications and risk assessment</li>
                  <li>Specific, actionable remediation recommendations</li>
                  <li>Additional recommendations for security improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 6 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <GitPullRequest className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">6. Remediation Support</h3>
              <p className="text-muted-foreground mb-4">
                Provide guidance and support to the development team as they implement fixes for identified vulnerabilities. This collaborative phase ensures that solutions effectively address the root causes without introducing new issues.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Support Services:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Code fix reviews and feedback</li>
                  <li>Implementation guidance for complex issues</li>
                  <li>Alternative solution recommendations where appropriate</li>
                  <li>Security best practice consultations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Step 7 */}
        <div className="border border-border/60 rounded-lg p-6 hover:border-primary/40 transition-all duration-300 bg-card/50">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <CheckCheck className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">7. Verification & Final Report</h3>
              <p className="text-muted-foreground mb-4">
                Conduct follow-up testing to verify that all identified vulnerabilities have been properly fixed. Issue a final report documenting the remediation status of each finding and the overall security posture.
              </p>
              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Final Deliverables:</h4>
                <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                  <li>Remediation verification results</li>
                  <li>Updated security assessment</li>
                  <li>Final comprehensive audit report</li>
                  <li>Security certification (if applicable)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Continuous Improvement</h3>
        <p className="text-muted-foreground mb-4">
          Hawkly's audit methodology is continuously refined based on emerging threats, industry developments, and feedback from both auditors and clients. Our commitment to excellence ensures that our standards evolve to address the dynamic security landscape of Web3.
        </p>
        
        <div className="flex items-start space-x-2 text-sm text-muted-foreground">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <p>
            All Hawkly auditors adhere to this standardized process while leveraging their specialized expertise in specific blockchain ecosystems, contract types, and vulnerability classes.
          </p>
        </div>
      </div>
    </div>
  );
}
