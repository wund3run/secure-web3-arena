
import { Separator } from "@/components/ui/separator";
import { AlertOctagon, UserCheck, BookOpen, FileCheck, Eye } from "lucide-react";

export function ProtocolContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Auditor Protocol & Professional Conduct</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly auditors adhere to a strict professional code of conduct that ensures ethical engagement, confidentiality, and the highest standards of professional practice when working with client projects.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-primary" />
          Ethical Obligations
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Confidentiality</h4>
            <p className="text-sm text-muted-foreground">
              Auditors must maintain strict confidentiality regarding all non-public information accessed during audits. This includes code, documentation, project plans, and business strategy. Confidential information may not be shared or discussed outside the audit team without explicit client permission.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Conflict of Interest</h4>
            <p className="text-sm text-muted-foreground">
              Auditors must disclose any potential conflicts of interest before accepting an engagement. This includes financial interests in competing projects, prior involvement with the project being audited, or personal relationships with project team members. Auditors may not audit projects where their objectivity could reasonably be questioned.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Non-Exploitation</h4>
            <p className="text-sm text-muted-foreground">
              Auditors are prohibited from exploiting vulnerabilities discovered during audits, even after public disclosure. Knowledge of vulnerabilities must never be used for personal gain or to manipulate markets. This includes trading based on non-public information about security issues.
            </p>
          </div>
          
          <div className="border border-border p-4 rounded-lg">
            <h4 className="font-medium mb-2">Responsible Disclosure</h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities must be reported through proper channels and never disclosed publicly without following the agreed-upon disclosure timeline. Client permission is required before discussing specific vulnerabilities in any public forum, including research papers and conference presentations.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <UserCheck className="h-5 w-5 text-primary" />
          Professional Standards
        </h3>
        
        <div className="space-y-4 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
              <h4 className="font-medium mb-2">Qualification Maintenance</h4>
              <p className="text-sm text-muted-foreground">
                Auditors must maintain and regularly update their technical knowledge and skills. This includes staying current with emerging vulnerability types, attack vectors, and security best practices in the rapidly evolving blockchain space.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
              <h4 className="font-medium mb-2">Due Diligence</h4>
              <p className="text-sm text-muted-foreground">
                Auditors must perform thorough and complete assessments using all appropriate methods and tools. Cutting corners or performing superficial reviews is strictly prohibited, even under time constraints.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
              <h4 className="font-medium mb-2">Objective Communication</h4>
              <p className="text-sm text-muted-foreground">
                Findings must be communicated clearly, accurately, and objectively, without exaggeration or minimization. Technical limitations and confidence levels should be transparently disclosed when reporting potential vulnerabilities.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg hover:border-primary/40 transition-all duration-300">
              <h4 className="font-medium mb-2">Scope Adherence</h4>
              <p className="text-sm text-muted-foreground">
                Auditors must respect audit scope boundaries while still highlighting related risks. Any necessary scope expansion must be discussed with clients before proceeding.
              </p>
            </div>
          </div>
          
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2">Quality Assurance Process</h4>
            <p className="text-sm text-muted-foreground">
              All audits undergo internal quality assurance review by senior auditors to ensure consistency, thoroughness, and adherence to Hawkly standards. Every finding must be verified by at least one auditor who was not involved in the initial discovery.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Client Communication Guidelines
        </h3>
        
        <div className="space-y-4 mb-8">
          <p className="text-muted-foreground">
            Clear, prompt, and professional communication is essential to successful security audits. Hawkly auditors follow these guidelines when interacting with clients:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Responsiveness</h4>
              <p className="text-sm text-muted-foreground">
                Client inquiries must receive acknowledgment within 24 hours (business days). Substantive responses should be provided within agreed-upon timeframes based on urgency and complexity.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Clarity</h4>
              <p className="text-sm text-muted-foreground">
                Technical concepts must be explained at a level appropriate for the client's technical background. Avoid jargon when communicating with non-technical stakeholders and provide glossaries when necessary.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Transparency</h4>
              <p className="text-sm text-muted-foreground">
                Limitations, challenges, and uncertainties encountered during the audit must be proactively disclosed to clients, including tool limitations and areas where manual review may be insufficient.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Constructive Feedback</h4>
              <p className="text-sm text-muted-foreground">
                Issues should be presented with a focus on improvement rather than criticism. Positive aspects of the codebase should be acknowledged alongside identified vulnerabilities.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-primary" />
          Audit Documentation Requirements
        </h3>
        
        <div className="space-y-4 mb-8">
          <p className="text-muted-foreground">
            Proper documentation of the audit process is essential for quality assurance, knowledge transfer, and potential regulatory compliance. Auditors must maintain the following records:
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Audit Plan & Scope Document</h4>
              <p className="text-sm text-muted-foreground">
                Detailed description of the agreed-upon scope, methodology, timeline, and resource allocation. Any subsequent scope changes must be documented with client approval.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Analysis Workpapers</h4>
              <p className="text-sm text-muted-foreground">
                Detailed notes, tool outputs, testing scripts, and evidence collected during the audit process. This documentation must be sufficient for another qualified auditor to understand the work performed and verify conclusions.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Client Communications</h4>
              <p className="text-sm text-muted-foreground">
                Records of substantive communications with clients regarding audit findings, scope, and recommendations. These records help prevent misunderstandings and provide context for audit decisions.
              </p>
            </div>
            
            <div className="border border-border p-4 rounded-lg">
              <h4 className="font-medium mb-2">Audit Report & Deliverables</h4>
              <p className="text-sm text-muted-foreground">
                Final versions of all materials provided to clients, including the main report, executive summary, supporting files, and any presentation materials used in delivery meetings.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Eye className="h-5 w-5 text-primary" />
          Auditor Oversight & Accountability
        </h3>
        
        <div className="bg-muted p-6 rounded-lg mb-4">
          <p className="text-sm text-muted-foreground mb-4">
            Hawkly maintains a robust system of oversight to ensure auditor adherence to these protocols and professional standards:
          </p>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Peer Review System</h4>
              <p className="text-xs text-muted-foreground">
                Every audit undergoes peer review by senior auditors who evaluate adherence to protocols, methodology, and reporting standards.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Client Feedback Mechanism</h4>
              <p className="text-xs text-muted-foreground">
                Structured client feedback is collected after each audit and incorporated into auditor performance evaluations.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Ethics Committee</h4>
              <p className="text-xs text-muted-foreground">
                An independent committee reviews potential ethics violations and makes determinations on appropriate remediation or disciplinary actions.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">Continuing Education Requirements</h4>
              <p className="text-xs text-muted-foreground">
                Auditors must complete a minimum of 40 hours of approved professional development annually to maintain their status on the Hawkly platform.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border border-border p-4 rounded-lg">
          <h4 className="font-medium mb-2">Protocol Violations & Consequences</h4>
          <p className="text-sm text-muted-foreground">
            Violations of these protocols are taken seriously and may result in remedial training, temporary suspension, permanent removal from the Hawkly platform, or legal action in cases of serious ethical breaches. The specific consequence depends on the severity, intent, and pattern of violations.
          </p>
        </div>
      </div>
    </div>
  );
}
