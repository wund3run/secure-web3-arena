
export class Environment {
  static get isDevelopment(): boolean {
    return import.meta.env.MODE === 'development';
  }

  static get isProduction(): boolean {
    return import.meta.env.MODE === 'production';
  }

  static get isTest(): boolean {
    return import.meta.env.MODE === 'test';
  }

  static get supabaseUrl(): string {
    return import.meta.env.VITE_SUPABASE_URL || '';
  }

  static get supabaseAnonKey(): string {
    return import.meta.env.VITE_SUPABASE_ANON_KEY || '';
  }

  static get appUrl(): string {
    return import.meta.env.VITE_APP_URL || 'http://localhost:8080';
  }

  static get sentryDsn(): string {
    return import.meta.env.VITE_SENTRY_DSN || '';
  }

  static get errorReportingEnabled(): boolean {
    return this.isProduction && !!this.sentryDsn;
  }

  static get monitoringEnabled(): boolean {
    return this.isProduction;
  }

  static get logLevel(): 'debug' | 'info' | 'warn' | 'error' {
    if (this.isDevelopment) return 'debug';
    if (this.isTest) return 'warn';
    return 'error';
  }

  static validateRequiredEnvVars(): void {
    const required = [
      { key: 'VITE_SUPABASE_URL', value: this.supabaseUrl },
      { key: 'VITE_SUPABASE_ANON_KEY', value: this.supabaseAnonKey }
    ];

    const missing = required.filter(env => !env.value);
    
    if (missing.length > 0) {
      console.error('Missing required environment variables:', missing.map(env => env.key));
      throw new Error(`Missing required environment variables: ${missing.map(env => env.key).join(', ')}`);
    }
  }
}
