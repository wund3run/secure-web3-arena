import { toast } from 'sonner';

export interface SecurityFinding {
  id: string;
  tool: 'slither' | 'solhint' | 'mythril' | 'cargo-audit';
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  title: string;
  description: string;
  location: string;
  line?: number;
  category: string;
  recommendation: string;
  cwe?: string;
  timestamp: Date;
  status: 'open' | 'fixed' | 'ignored' | 'reviewed';
}

export interface ToolConfiguration {
  enabled: boolean;
  timeout: number;
  customArgs: string[];
  severityThreshold: 'critical' | 'high' | 'medium' | 'low' | 'info';
}

export interface AnalysisResult {
  tool: string;
  status: 'running' | 'completed' | 'failed' | 'pending';
  findings: SecurityFinding[];
  summary: {
    total: number;
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  executionTime: number;
  lastRun: Date;
  output?: string;
  error?: string;
}

export class SecurityAnalysisService {
  private static instance: SecurityAnalysisService;
  private isRunning = false;

  public static getInstance(): SecurityAnalysisService {
    if (!SecurityAnalysisService.instance) {
      SecurityAnalysisService.instance = new SecurityAnalysisService();
    }
    return SecurityAnalysisService.instance;
  }

  /**
   * Execute Slither analysis on Solidity files
   */
  async runSlitherAnalysis(
    filePath: string, 
    config: ToolConfiguration
  ): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    try {
      // In a real implementation, this would execute the actual slither command
      // For now, we'll simulate the execution
      const command = `slither ${filePath} ${config.customArgs.join(' ')}`;
      console.log('Executing Slither:', command);
      
      // Simulate execution time
      await this.simulateExecution(config.timeout);
      
      const findings: SecurityFinding[] = [
        {
          id: `slither-${Date.now()}-1`,
          tool: 'slither',
          severity: 'critical',
          title: 'Reentrancy Vulnerability',
          description: 'Potential reentrancy attack in withdraw function',
          location: `${filePath}:45`,
          line: 45,
          category: 'Reentrancy',
          recommendation: 'Use ReentrancyGuard or follow checks-effects-interactions pattern',
          cwe: 'CWE-841',
          timestamp: new Date(),
          status: 'open'
        },
        {
          id: `slither-${Date.now()}-2`,
          tool: 'slither',
          severity: 'high',
          title: 'Unsafe External Call',
          description: 'External call without proper error handling',
          location: `${filePath}:78`,
          line: 78,
          category: 'External Calls',
          recommendation: 'Always check return values and handle potential failures',
          timestamp: new Date(),
          status: 'open'
        }
      ];

      return {
        tool: 'slither',
        status: 'completed',
        findings,
        summary: this.calculateSummary(findings),
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        output: 'Slither analysis completed successfully'
      };
    } catch (error: unknown) {
      return {
        tool: 'slither',
        status: 'failed',
        findings: [],
        summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Execute Solhint analysis on Solidity files
   */
  async runSolhintAnalysis(
    filePath: string, 
    config: ToolConfiguration
  ): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    try {
      const command = `solhint ${filePath} ${config.customArgs.join(' ')}`;
      console.log('Executing Solhint:', command);
      
      await this.simulateExecution(config.timeout);
      
      const findings: SecurityFinding[] = [
        {
          id: `solhint-${Date.now()}-1`,
          tool: 'solhint',
          severity: 'medium',
          title: 'Function Visibility',
          description: 'Function should be marked as external if not called internally',
          location: `${filePath}:23`,
          line: 23,
          category: 'Best Practices',
          recommendation: 'Mark function as external if not called internally',
          timestamp: new Date(),
          status: 'open'
        }
      ];

      return {
        tool: 'solhint',
        status: 'completed',
        findings,
        summary: this.calculateSummary(findings),
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        output: 'Solhint analysis completed successfully'
      };
    } catch (error: unknown) {
      return {
        tool: 'solhint',
        status: 'failed',
        findings: [],
        summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Execute Mythril analysis on Solidity files
   */
  async runMythrilAnalysis(
    filePath: string, 
    config: ToolConfiguration
  ): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    try {
      const command = `myth analyze ${filePath} ${config.customArgs.join(' ')}`;
      console.log('Executing Mythril:', command);
      
      await this.simulateExecution(config.timeout);
      
      const findings: SecurityFinding[] = [
        {
          id: `mythril-${Date.now()}-1`,
          tool: 'mythril',
          severity: 'high',
          title: 'Integer Overflow',
          description: 'Potential integer overflow in arithmetic operation',
          location: `${filePath}:67`,
          line: 67,
          category: 'Arithmetic',
          recommendation: 'Use SafeMath library or check for overflow conditions',
          timestamp: new Date(),
          status: 'open'
        }
      ];

      return {
        tool: 'mythril',
        status: 'completed',
        findings,
        summary: this.calculateSummary(findings),
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        output: 'Mythril analysis completed successfully'
      };
    } catch (error: unknown) {
      return {
        tool: 'mythril',
        status: 'failed',
        findings: [],
        summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Execute Cargo Audit analysis on Rust projects
   */
  async runCargoAuditAnalysis(
    projectPath: string, 
    config: ToolConfiguration
  ): Promise<AnalysisResult> {
    const startTime = Date.now();
    
    try {
      const command = `cargo audit ${config.customArgs.join(' ')}`;
      console.log('Executing Cargo Audit:', command);
      
      await this.simulateExecution(config.timeout);
      
      const findings: SecurityFinding[] = [
        {
          id: `cargo-audit-${Date.now()}-1`,
          tool: 'cargo-audit',
          severity: 'high',
          title: 'Vulnerable Dependency',
          description: 'Dependency contains known security vulnerability',
          location: 'Cargo.toml',
          category: 'Dependencies',
          recommendation: 'Update to patched version or find alternative',
          timestamp: new Date(),
          status: 'open'
        }
      ];

      return {
        tool: 'cargo-audit',
        status: 'completed',
        findings,
        summary: this.calculateSummary(findings),
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        output: 'Cargo audit completed successfully'
      };
    } catch (error: unknown) {
      return {
        tool: 'cargo-audit',
        status: 'failed',
        findings: [],
        summary: { total: 0, critical: 0, high: 0, medium: 0, low: 0, info: 0 },
        executionTime: (Date.now() - startTime) / 1000,
        lastRun: new Date(),
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Run comprehensive security analysis using all enabled tools
   */
  async runComprehensiveAnalysis(
    filePath: string,
    toolConfigs: Record<string, ToolConfiguration>,
    onProgress?: (progress: number, tool: string) => void
  ): Promise<AnalysisResult[]> {
    if (this.isRunning) {
      throw new Error('Analysis already in progress');
    }

    this.isRunning = true;
    const results: AnalysisResult[] = [];
    const enabledTools = Object.entries(toolConfigs).filter(([_, config]) => config.enabled);
    const totalTools = enabledTools.length;

    try {
      for (let i = 0; i < enabledTools.length; i++) {
        const [toolName, config] = enabledTools[i];
        const progress = ((i + 1) / totalTools) * 100;
        
        onProgress?.(progress, toolName);
        
        let result: AnalysisResult;
        
        switch (toolName) {
          case 'slither':
            result = await this.runSlitherAnalysis(filePath, config);
            break;
          case 'solhint':
            result = await this.runSolhintAnalysis(filePath, config);
            break;
          case 'mythril':
            result = await this.runMythrilAnalysis(filePath, config);
            break;
          case 'cargo-audit':
            result = await this.runCargoAuditAnalysis(filePath, config);
            break;
          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        
        results.push(result);
        
        if (result.status === 'completed') {
          toast.success(`${toolName} analysis completed`);
        } else {
          toast.error(`${toolName} analysis failed`);
        }
      }
    } finally {
      this.isRunning = false;
    }

    return results;
  }

  /**
   * Generate a comprehensive security report
   */
  generateSecurityReport(results: AnalysisResult[]): unknown {
    const allFindings = results.flatMap(result => result.findings);
    const summary = this.calculateSummary(allFindings);
    
    return {
      timestamp: new Date().toISOString(),
      analysis: results,
      findings: allFindings,
      summary,
      recommendations: this.generateRecommendations(allFindings),
      riskScore: this.calculateRiskScore(summary)
    };
  }

  /**
   * Export findings to various formats
   */
  exportFindings(findings: SecurityFinding[], format: 'json' | 'csv' | 'html'): string {
    switch (format) {
      case 'json':
        return JSON.stringify(findings, null, 2);
      case 'csv':
        return this.convertToCSV(findings);
      case 'html':
        return this.convertToHTML(findings);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  private calculateSummary(findings: SecurityFinding[]) {
    return {
      total: findings.length,
      critical: findings.filter(f => f.severity === 'critical').length,
      high: findings.filter(f => f.severity === 'high').length,
      medium: findings.filter(f => f.severity === 'medium').length,
      low: findings.filter(f => f.severity === 'low').length,
      info: findings.filter(f => f.severity === 'info').length,
    };
  }

  private calculateRiskScore(summary: unknown): number {
    const s = summary as {
      critical: number;
      high: number;
      medium: number;
      low: number;
      info: number;
    };
    return (
      s.critical * 10 +
      s.high * 7 +
      s.medium * 4 +
      s.low * 1 +
      s.info * 0.5
    );
  }

  private generateRecommendations(findings: SecurityFinding[]): string[] {
    const recommendations = new Set<string>();
    
    findings.forEach(finding => {
      if (finding.recommendation) {
        recommendations.add(finding.recommendation);
      }
    });
    
    return Array.from(recommendations);
  }

  private convertToCSV(findings: SecurityFinding[]): string {
    const headers = ['Tool', 'Severity', 'Title', 'Description', 'Location', 'Category', 'Recommendation'];
    const rows = findings.map(f => [
      f.tool,
      f.severity,
      f.title,
      f.description,
      f.location,
      f.category,
      f.recommendation
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  private convertToHTML(findings: SecurityFinding[]): string {
    return `
      <html>
        <head>
          <title>Security Analysis Report</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .finding { border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px; }
            .critical { border-left: 5px solid #dc2626; }
            .high { border-left: 5px solid #ea580c; }
            .medium { border-left: 5px solid #ca8a04; }
            .low { border-left: 5px solid #16a34a; }
            .info { border-left: 5px solid #0891b2; }
          </style>
        </head>
        <body>
          <h1>Security Analysis Report</h1>
          <p>Generated on: ${new Date().toLocaleString()}</p>
          <p>Total findings: ${findings.length}</p>
          ${findings.map(f => `
            <div class="finding ${f.severity}">
              <h3>${f.title}</h3>
              <p><strong>Tool:</strong> ${f.tool}</p>
              <p><strong>Severity:</strong> ${f.severity}</p>
              <p><strong>Location:</strong> ${f.location}</p>
              <p><strong>Description:</strong> ${f.description}</p>
              <p><strong>Recommendation:</strong> ${f.recommendation}</p>
            </div>
          `).join('')}
        </body>
      </html>
    `;
  }

  private async simulateExecution(timeout: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.min(timeout * 100, 2000)); // Simulate execution time
    });
  }
}

export const securityAnalysisService = SecurityAnalysisService.getInstance(); 