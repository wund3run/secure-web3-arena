
import { errorMonitoring, TestResult } from './ErrorMonitoringService';

export interface TestCase {
  id: string;
  name: string;
  component: string;
  testFunction: () => Promise<void> | void;
  timeout?: number;
  retries?: number;
}

export interface TestSuite {
  name: string;
  description: string;
  tests: TestCase[];
  beforeAll?: () => Promise<void> | void;
  afterAll?: () => Promise<void> | void;
  beforeEach?: () => Promise<void> | void;
  afterEach?: () => Promise<void> | void;
}

export class AutomatedTestRunner {
  private testSuites: TestSuite[] = [];
  private isRunning = false;

  addTestSuite(testSuite: TestSuite) {
    this.testSuites.push(testSuite);
  }

  async runAllTests(): Promise<TestResult[]> {
    if (this.isRunning) {
      throw new Error('Tests are already running');
    }

    this.isRunning = true;
    const allResults: TestResult[] = [];

    try {
      for (const suite of this.testSuites) {
        console.log(`Running test suite: ${suite.name}`);
        const suiteResults = await this.runTestSuite(suite);
        allResults.push(...suiteResults);
      }
    } finally {
      this.isRunning = false;
    }

    return allResults;
  }

  async runTestSuite(suite: TestSuite): Promise<TestResult[]> {
    const results: TestResult[] = [];

    try {
      // Run beforeAll hook
      if (suite.beforeAll) {
        await suite.beforeAll();
      }

      for (const test of suite.tests) {
        try {
          // Run beforeEach hook
          if (suite.beforeEach) {
            await suite.beforeEach();
          }

          const result = await this.runSingleTest(test);
          results.push(result);
          errorMonitoring.recordTestResult(result);

          // Run afterEach hook
          if (suite.afterEach) {
            await suite.afterEach();
          }
        } catch (error) {
          const failedResult: TestResult = {
            testId: test.id,
            testName: test.name,
            component: test.component,
            status: 'failed',
            duration: 0,
            error: error as Error,
            timestamp: new Date()
          };
          results.push(failedResult);
          errorMonitoring.recordTestResult(failedResult);
        }
      }

      // Run afterAll hook
      if (suite.afterAll) {
        await suite.afterAll();
      }
    } catch (error) {
      console.error(`Test suite ${suite.name} failed:`, error);
    }

    return results;
  }

  private async runSingleTest(test: TestCase): Promise<TestResult> {
    const startTime = Date.now();
    const timeout = test.timeout || 5000;
    const retries = test.retries || 0;

    let lastError: Error | undefined;
    
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        await Promise.race([
          Promise.resolve(test.testFunction()),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error(`Test timeout after ${timeout}ms`)), timeout)
          )
        ]);

        const duration = Date.now() - startTime;
        return {
          testId: test.id,
          testName: test.name,
          component: test.component,
          status: 'passed',
          duration,
          timestamp: new Date()
        };
      } catch (error) {
        lastError = error as Error;
        if (attempt < retries) {
          console.log(`Test ${test.name} failed, retrying... (attempt ${attempt + 1}/${retries})`);
          await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1s before retry
        }
      }
    }

    const duration = Date.now() - startTime;
    return {
      testId: test.id,
      testName: test.name,
      component: test.component,
      status: 'failed',
      duration,
      error: lastError,
      timestamp: new Date()
    };
  }

  getTestSuites(): TestSuite[] {
    return [...this.testSuites];
  }

  clearTestSuites() {
    this.testSuites = [];
  }

  isTestRunning(): boolean {
    return this.isRunning;
  }
}

export const testRunner = new AutomatedTestRunner();
