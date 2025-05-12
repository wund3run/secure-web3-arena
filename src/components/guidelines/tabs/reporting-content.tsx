
import { Separator } from "@/components/ui/separator";
import { FileText, CheckSquare, AlertTriangle, MessageSquare } from "lucide-react";

export function ReportingContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Audit Reporting Standards</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly maintains rigorous standards for audit reporting to ensure clarity, consistency, and usefulness across all security assessments. Our reports are designed to provide actionable insights for technical teams while remaining accessible to project stakeholders.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-primary" />
          Report Structure
        </h3>
        
        <div className="space-y-5 mb-8">
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Executive Summary</h4>
            <p className="text-sm text-muted-foreground">
              A concise overview of the audit results, highlighting key findings, risk assessment, and overall security posture. This section should be accessible to non-technical stakeholders while providing a comprehensive snapshot of the project's security status.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements:</strong> Audit scope summary, key metrics (total issues by severity), risk summary statement, and recommendation overview.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Scope & Methodology</h4>
            <p className="text-sm text-muted-foreground">
              Detailed description of what was included in the audit scope, including specific contract files, versions, lines of code, and the methodologies and tools used during the assessment.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements:</strong> Precise scope definition (including file hashes), excluded components, tool versions used, and methodology description.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Findings Summary</h4>
            <p className="text-sm text-muted-foreground">
              A tabular overview of all identified issues, organized by severity and category, with unique finding identifiers to facilitate tracking and remediation efforts.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements:</strong> Issue IDs, severity classifications, vulnerability categories, affected components, and remediation status.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Detailed Findings</h4>
            <p className="text-sm text-muted-foreground">
              Comprehensive analysis of each identified vulnerability, including technical details, impact assessment, and specific remediation guidance.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements for each finding:</strong> Description, technical impact, affected code (with line references), proof of concept (where applicable), remediation recommendations, and risk assessment.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Code Quality Assessment</h4>
            <p className="text-sm text-muted-foreground">
              Evaluation of general code quality, documentation, testing coverage, and adherence to best practices, including recommendations for improvements beyond security concerns.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements:</strong> Code quality metrics, documentation assessment, test coverage analysis, and best practice adherence evaluation.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Remediation Plan</h4>
            <p className="text-sm text-muted-foreground">
              Prioritized recommendations for addressing identified vulnerabilities, including suggested approaches and potential trade-offs.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Required elements:</strong> Prioritized action items, remediation complexity assessment, and suggested timelines based on risk levels.
            </div>
          </div>
          
          <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
            <h4 className="font-medium mb-2">Appendices</h4>
            <p className="text-sm text-muted-foreground">
              Supporting information including tool configurations, detailed test results, background information on vulnerability types, and glossary of technical terms.
            </p>
            <div className="mt-3 text-xs bg-muted p-2 rounded-md">
              <strong>Optional but recommended elements:</strong> Tool configurations, technical references, test scripts, and vulnerability background information.
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <CheckSquare className="h-5 w-5 text-primary" />
          Reporting Quality Standards
        </h3>
        
        <div className="bg-muted p-6 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Clarity & Accessibility</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>Technical findings must include explanations accessible to semi-technical stakeholders</li>
                <li>Executive summary must be understandable by non-technical decision-makers</li>
                <li>Visual aids (diagrams, flowcharts) are required for complex vulnerabilities</li>
                <li>Technical jargon must be explained or included in a glossary</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Accuracy & Precision</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>All findings must include specific code references (file, line number)</li>
                <li>Impact assessments must be evidence-based and realistic</li>
                <li>Findings must be reproducible based on the information provided</li>
                <li>False positives must be eliminated through verification</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Actionability & Guidance</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>Every finding must include specific remediation guidance</li>
                <li>Complex fixes must include code examples where appropriate</li>
                <li>Remediation guidance must consider implementation complexity</li>
                <li>Alternative approaches should be provided where relevant</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Consistency & Standardization</h4>
              <ul className="list-disc list-inside text-sm space-y-2 text-muted-foreground">
                <li>All reports must follow the Hawkly standardized template</li>
                <li>Finding classifications must adhere to standard severity criteria</li>
                <li>Writing style must be consistent throughout the report</li>
                <li>All measurements and metrics must use consistent units</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-primary" />
          Risk Communication Guidelines
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Effective communication of security risks is critical to ensure project teams understand the implications of identified vulnerabilities and can make informed decisions about remediation priorities.
        </p>
        
        <div className="space-y-4 mb-8">
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Contextual Risk Assessment</h4>
            <p className="text-sm text-muted-foreground">
              Risks must be presented within the context of the project's specific use case, user base, and deployed value. Risk assessments should consider both technical severity and business impact.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Realistic Exploit Scenarios</h4>
            <p className="text-sm text-muted-foreground">
              For each significant vulnerability, the report must include realistic attack scenarios that illustrate how the vulnerability could be exploited and the potential consequences for users and the project.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Quantified Impact Assessment</h4>
            <p className="text-sm text-muted-foreground">
              Where possible, impact should be quantified in terms relevant to the project (e.g., potential financial loss, number of affected users, data exposure scope). This helps project teams prioritize remediation efforts.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Risk Evolution Factors</h4>
            <p className="text-sm text-muted-foreground">
              Reports should identify factors that could change the risk profile over time, such as increased adoption, value growth, or changes in the threat landscape, helping projects plan long-term security strategies.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-primary" />
          Collaborative Reporting Process
        </h3>
        
        <div className="space-y-6 mb-8">
          <p className="text-muted-foreground">
            Hawkly employs a collaborative reporting process that engages project teams throughout the audit to ensure maximum value and understanding.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-border p-4 rounded-lg text-center">
              <h4 className="font-medium mb-2">Pre-Report Discussion</h4>
              <p className="text-xs text-muted-foreground">
                Critical findings are communicated immediately upon discovery, allowing teams to begin remediation before the final report is complete.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg text-center">
              <h4 className="font-medium mb-2">Report Review Period</h4>
              <p className="text-xs text-muted-foreground">
                Project teams receive a draft report for review, allowing them to ask questions, request clarification, and provide context before finalization.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg text-center">
              <h4 className="font-medium mb-2">Post-Report Support</h4>
              <p className="text-xs text-muted-foreground">
                Auditors remain available for a designated period to discuss findings, assist with remediation approaches, and verify fixes.
              </p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-2">Report Confidentiality</p>
            <p>
              All audit reports are treated as confidential by default. Project teams decide whether to publish full reports, summaries, or keep findings private. Hawkly encourages transparency but respects client confidentiality requirements.
            </p>
            <p className="mt-2">
              For public audits, Hawkly provides standardized disclosure timelines to balance security needs with transparency goals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
