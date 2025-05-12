
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, AlertOctagon, AlertCircle, Info } from "lucide-react";

export function ClassificationContent() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Vulnerability Classification System</h2>
        <p className="text-muted-foreground mb-6">
          Hawkly uses a standardized vulnerability classification system to ensure consistency across audits and provide clear risk assessments for project owners. Our classification combines severity levels with vulnerability categories to communicate both impact and type.
        </p>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Severity Levels</h3>
        <p className="text-muted-foreground mb-6">
          Each identified vulnerability is assigned a severity level based on its potential impact, exploitability, and likelihood:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Critical */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-destructive/10 border-b border-border p-4 flex items-center gap-3">
              <AlertOctagon className="h-8 w-8 text-destructive" />
              <div>
                <h4 className="font-bold text-lg">Critical</h4>
                <p className="text-sm text-muted-foreground">Highest severity</p>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-2 text-sm">Vulnerabilities that:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Can result in direct loss of funds</li>
                <li>Allow unauthorized access to system control</li>
                <li>Enable complete system compromise</li>
                <li>Have trivial exploit paths with major consequences</li>
              </ul>
            </div>
          </div>
          
          {/* High */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-[#FF8A65]/10 border-b border-border p-4 flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-[#FF8A65]" />
              <div>
                <h4 className="font-bold text-lg">High</h4>
                <p className="text-sm text-muted-foreground">Serious risk</p>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-2 text-sm">Vulnerabilities that:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Can significantly impact system integrity</li>
                <li>May lead to fund loss under specific conditions</li>
                <li>Allow partial system compromise</li>
                <li>Have complex exploit paths with serious consequences</li>
              </ul>
            </div>
          </div>
          
          {/* Medium */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-[#FFB74D]/10 border-b border-border p-4 flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-[#FFB74D]" />
              <div>
                <h4 className="font-bold text-lg">Medium</h4>
                <p className="text-sm text-muted-foreground">Moderate risk</p>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-2 text-sm">Vulnerabilities that:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Have limited impact on system functionality</li>
                <li>May lead to unintended behaviors</li>
                <li>Can be exploited only under specific conditions</li>
                <li>Require multiple prerequisites to exploit</li>
              </ul>
            </div>
          </div>
          
          {/* Low */}
          <div className="border border-border rounded-lg overflow-hidden">
            <div className="bg-[#4FC3F7]/10 border-b border-border p-4 flex items-center gap-3">
              <Info className="h-8 w-8 text-[#4FC3F7]" />
              <div>
                <h4 className="font-bold text-lg">Low</h4>
                <p className="text-sm text-muted-foreground">Minor issues</p>
              </div>
            </div>
            <div className="p-4">
              <p className="mb-2 text-sm">Vulnerabilities that:</p>
              <ul className="list-disc list-inside text-sm space-y-1 text-muted-foreground">
                <li>Represent best practice violations</li>
                <li>Have minimal direct security impact</li>
                <li>May lead to minor inefficiencies</li>
                <li>Could potentially escalate if combined with other issues</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Vulnerability Categories</h3>
        <p className="text-muted-foreground mb-6">
          Vulnerabilities are categorized by type to help identify common patterns and facilitate remediation planning:
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">AC</Badge>
              Access Control
            </h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities related to improper implementation of access restrictions, permission checks, and authorization mechanisms.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">RE</Badge>
              Reentrancy
            </h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities that allow external calls to maliciously re-enter the contract before the original execution is complete.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">OV</Badge>
              Arithmetic Overflow/Underflow
            </h4>
            <p className="text-sm text-muted-foreground">
              Issues arising from improper handling of numeric calculations that exceed variable limits.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">FL</Badge>
              Front-running/MEV
            </h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities that allow malicious actors to observe and manipulate transaction ordering for profit.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">OR</Badge>
              Oracle Manipulation
            </h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities allowing manipulation of price feeds, oracle data, or other external inputs.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">TS</Badge>
              Time/Sequence Dependence
            </h4>
            <p className="text-sm text-muted-foreground">
              Issues related to improper handling of time-based logic or sequence-dependent operations.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">GC</Badge>
              Gas Consumption/Limits
            </h4>
            <p className="text-sm text-muted-foreground">
              Inefficiencies or vulnerabilities related to excessive gas consumption or gas limit issues.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">DO</Badge>
              Denial of Service
            </h4>
            <p className="text-sm text-muted-foreground">
              Vulnerabilities that can render a contract or function unusable through resource exhaustion.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">SC</Badge>
              Smart Contract Logic
            </h4>
            <p className="text-sm text-muted-foreground">
              Design flaws in contract logic that can lead to unintended behaviors or exploits.
            </p>
          </div>
          
          <div className="border border-border/60 rounded-lg p-4 hover:border-primary/40 transition-all duration-300">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <Badge variant="outline" className="bg-primary/10">BP</Badge>
              Best Practices
            </h4>
            <p className="text-sm text-muted-foreground">
              Code quality issues, optimization opportunities, and deviations from recommended patterns.
            </p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Combined Classification</h3>
        <p className="text-muted-foreground mb-6">
          Findings in audit reports combine the severity level with the vulnerability category to provide comprehensive classification. For example:
        </p>
        
        <div className="bg-muted rounded-lg p-6 mb-6">
          <h4 className="font-medium mb-3">Example Finding: [Critical-RE] Reentrancy in Withdrawal Function</h4>
          <p className="text-sm text-muted-foreground mb-4">
            This classification indicates a Critical severity issue related to Reentrancy, found in the withdrawal functionality of the contract.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge variant="destructive" className="text-xs">Critical</Badge>
            <Badge variant="outline" className="bg-primary/10 text-xs">RE</Badge>
          </div>
        </div>
        
        <p className="text-muted-foreground">
          This standardized classification system helps project owners understand the relative risk and priority of identified issues, while helping auditors maintain consistency across different audits and teams.
        </p>
      </div>
    </div>
  );
}
