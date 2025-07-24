
import { toast } from "sonner";

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  category: 'ui' | 'performance' | 'security' | 'data' | 'integration' | 'accessibility';
  component: string;
  stackTrace?: string;
  userAgent: string;
  url: string;
  timestamp: Date;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  reproductionSteps: string[];
  expectedBehavior: string;
  actualBehavior: string;
  assignee?: string;
  resolution?: string;
  resolvedAt?: Date;
}

export interface TestResult {
  testId: string;
  testName: string;
  component: string;
  status: 'passed' | 'failed' | 'skipped';
  duration: number;
  error?: Error;
  timestamp: Date;
}

export class ErrorMonitoringService {
  private static instance: ErrorMonitoringService;
  private bugReports: BugReport[] = [];
  private testResults: TestResult[] = [];
  private isMonitoring = false;

  private constructor() {
    this.initializeErrorHandling();
  }

  static getInstance(): ErrorMonitoringService {
    if (!ErrorMonitoringService.instance) {
      ErrorMonitoringService.instance = new ErrorMonitoringService();
    }
    return ErrorMonitoringService.instance;
  }

  private initializeErrorHandling() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError({
        title: 'Runtime Error',
        description: event.message,
        stackTrace: event.error?.stack,
        component: this.extractComponentFromStack(event.error?.stack),
        category: 'ui',
        severity: 'high'
      });
    });

    // Unhandled promise rejection handler
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError({
        title: 'Unhandled Promise Rejection',
        description: event.reason?.message || 'Promise rejected',
        stackTrace: event.reason?.stack,
        component: this.extractComponentFromStack(event.reason?.stack),
        category: 'data',
        severity: 'medium'
      });
    });

    // React error boundary integration
    this.monitorReactErrors();
  }

  private extractComponentFromStack(stack?: string): string {
    if (!stack) return 'Unknown';
    
    // Extract component name from React stack trace
    const componentMatch = stack.match(/at (\w+)/);
    return componentMatch ? componentMatch[1] : 'Unknown';
  }

  private monitorReactErrors() {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      const message = args.join(' ');
      if (message.includes('React') || message.includes('Warning')) {
        this.captureError({
          title: 'React Warning/Error',
          description: message,
          component: 'React',
          category: 'ui',
          severity: message.includes('Warning') ? 'low' : 'medium'
        });
      }
      originalConsoleError.apply(console, args);
    };
  }

  captureError(errorData: Partial<BugReport>) {
    const bugReport: BugReport = {
      id: this.generateId(),
      title: errorData.title || 'Unknown Error',
      description: errorData.description || 'No description provided',
      severity: errorData.severity || 'medium',
      category: errorData.category || 'ui',
      component: errorData.component || 'Unknown',
      stackTrace: errorData.stackTrace,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date(),
      status: 'open',
      reproductionSteps: errorData.reproductionSteps || [],
      expectedBehavior: errorData.expectedBehavior || 'Normal operation',
      actualBehavior: errorData.actualBehavior || 'Error occurred',
      assignee: errorData.assignee,
      resolution: errorData.resolution
    };

    this.bugReports.push(bugReport);
    this.notifyDevelopers(bugReport);
    this.persistBugReport(bugReport);

    console.error('Bug captured:', bugReport);
  }

  private notifyDevelopers(bugReport: BugReport) {
    if (bugReport.severity === 'critical' || bugReport.severity === 'high') {
      toast.error(`${bugReport.severity.toUpperCase()} Bug Detected`, {
        description: `${bugReport.title} in ${bugReport.component}`,
        action: {
          label: "View Details",
          onClick: () => console.log('Bug Report:', bugReport)
        }
      });
    }
  }

  private persistBugReport(bugReport: BugReport) {
    const existingReports = JSON.parse(localStorage.getItem('hawkly_bug_reports') || '[]');
    existingReports.push(bugReport);
    localStorage.setItem('hawkly_bug_reports', JSON.stringify(existingReports));
  }

  recordTestResult(testResult: TestResult) {
    this.testResults.push(testResult);
    
    if (testResult.status === 'failed' && testResult.error) {
      this.captureError({
        title: `Test Failure: ${testResult.testName}`,
        description: testResult.error.message,
        component: testResult.component,
        category: 'ui',
        severity: 'medium',
        stackTrace: testResult.error.stack
      });
    }
  }

  getBugReports(filters?: {
    severity?: string[];
    category?: string[];
    status?: string[];
    component?: string;
  }): BugReport[] {
    let reports = [...this.bugReports];

    if (filters) {
      if (filters.severity?.length) {
        reports = reports.filter(report => filters.severity!.includes(report.severity));
      }
      if (filters.category?.length) {
        reports = reports.filter(report => filters.category!.includes(report.category));
      }
      if (filters.status?.length) {
        reports = reports.filter(report => filters.status!.includes(report.status));
      }
      if (filters.component) {
        reports = reports.filter(report => 
          report.component.toLowerCase().includes(filters.component!.toLowerCase())
        );
      }
    }

    return reports.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  getTestResults(): TestResult[] {
    return [...this.testResults].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  updateBugStatus(bugId: string, status: BugReport['status'], resolution?: string) {
    const bug = this.bugReports.find(b => b.id === bugId);
    if (bug) {
      bug.status = status;
      if (resolution) {
        bug.resolution = resolution;
      }
      if (status === 'resolved' || status === 'closed') {
        bug.resolvedAt = new Date();
      }
      this.persistBugReport(bug);
    }
  }

  generateReport(): {
    summary: {
      totalBugs: number;
      criticalBugs: number;
      openBugs: number;
      resolvedBugs: number;
      testsPassed: number;
      testsFailed: number;
    };
    bugsByCategory: Record<string, number>;
    bugsBySeverity: Record<string, number>;
    recentBugs: BugReport[];
  } {
    const bugs = this.getBugReports();
    const tests = this.getTestResults();

    return {
      summary: {
        totalBugs: bugs.length,
        criticalBugs: bugs.filter(b => b.severity === 'critical').length,
        openBugs: bugs.filter(b => b.status === 'open').length,
        resolvedBugs: bugs.filter(b => b.status === 'resolved').length,
        testsPassed: tests.filter(t => t.status === 'passed').length,
        testsFailed: tests.filter(t => t.status === 'failed').length
      },
      bugsByCategory: this.groupBy(bugs, 'category'),
      bugsBySeverity: this.groupBy(bugs, 'severity'),
      recentBugs: bugs.slice(0, 10)
    };
  }

  private groupBy(array: unknown[], key: string): Record<string, number> {
    return array.reduce((acc, item) => {
      const value = item[key];
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  }

  private generateId(): string {
    return `bug_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  startMonitoring() {
    this.isMonitoring = true;
    console.log('Error monitoring started');
  }

  stopMonitoring() {
    this.isMonitoring = false;
    console.log('Error monitoring stopped');
  }

  clearAllReports() {
    this.bugReports = [];
    this.testResults = [];
    localStorage.removeItem('hawkly_bug_reports');
  }
}

export const errorMonitoring = ErrorMonitoringService.getInstance();
