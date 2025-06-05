
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface SecurityAlert {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  type: 'vulnerability' | 'suspicious_activity' | 'compliance' | 'contract_risk';
  title: string;
  description: string;
  contractAddress?: string;
  network: string;
  timestamp: string;
  metadata: Record<string, any>;
}

export interface MonitoringConfig {
  fortaApiKey?: string;
  sentryDsn?: string;
  defenderApiKey?: string;
  mythrilApiKey?: string;
}

export class SecurityMonitoringService {
  private static config: MonitoringConfig;

  static init(config: MonitoringConfig): void {
    this.config = config;
    console.log('Security Monitoring Service initialized');
  }

  // Forta Network Integration for Continuous Monitoring
  static async setupFortaMonitoring(contractAddress: string, network: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('setup-forta-monitoring', {
        body: {
          contract_address: contractAddress,
          network,
          api_key: this.config.fortaApiKey
        }
      });

      if (error) throw error;
      
      toast.success('Forta monitoring enabled for contract');
      return true;
    } catch (error) {
      console.error('Error setting up Forta monitoring:', error);
      toast.error('Failed to enable Forta monitoring');
      return false;
    }
  }

  static async getFortaAlerts(contractAddress: string): Promise<SecurityAlert[]> {
    try {
      const { data, error } = await supabase.functions.invoke('get-forta-alerts', {
        body: { contract_address: contractAddress }
      });

      if (error) throw error;
      return data.alerts || [];
    } catch (error) {
      console.error('Error fetching Forta alerts:', error);
      return [];
    }
  }

  // OpenZeppelin Defender Integration
  static async setupDefenderAutotasks(contractAddress: string, network: string): Promise<boolean> {
    try {
      const { data, error } = await supabase.functions.invoke('setup-defender-autotasks', {
        body: {
          contract_address: contractAddress,
          network,
          api_key: this.config.defenderApiKey
        }
      });

      if (error) throw error;
      
      toast.success('OpenZeppelin Defender configured');
      return true;
    } catch (error) {
      console.error('Error setting up Defender:', error);
      toast.error('Failed to configure Defender');
      return false;
    }
  }

  // Automated Security Scanning with Mythril/Slither
  static async runSecurityScan(contractCode: string, scanType: 'mythril' | 'slither' = 'mythril'): Promise<any> {
    try {
      const { data, error } = await supabase.functions.invoke('run-security-scan', {
        body: {
          contract_code: contractCode,
          scan_type: scanType,
          api_key: this.config.mythrilApiKey
        }
      });

      if (error) throw error;
      
      toast.success(`${scanType} security scan completed`);
      return data.results;
    } catch (error) {
      console.error('Error running security scan:', error);
      toast.error('Security scan failed');
      return null;
    }
  }

  // Store security events in database
  static async logSecurityEvent(event: Omit<SecurityAlert, 'id' | 'timestamp'>): Promise<void> {
    try {
      const { error } = await supabase.from('security_events').insert({
        severity: event.severity,
        type: event.type,
        title: event.title,
        description: event.description,
        contract_address: event.contractAddress,
        network: event.network,
        metadata: event.metadata
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error logging security event:', error);
    }
  }

  // Get security dashboard data
  static async getSecurityDashboardData(): Promise<{
    totalAlerts: number;
    criticalAlerts: number;
    recentAlerts: SecurityAlert[];
    monitoredContracts: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;

      const totalAlerts = data?.length || 0;
      const criticalAlerts = data?.filter(alert => alert.severity === 'critical').length || 0;

      return {
        totalAlerts,
        criticalAlerts,
        recentAlerts: data || [],
        monitoredContracts: 0 // Would be calculated from monitoring_services table
      };
    } catch (error) {
      console.error('Error fetching security dashboard data:', error);
      return {
        totalAlerts: 0,
        criticalAlerts: 0,
        recentAlerts: [],
        monitoredContracts: 0
      };
    }
  }
}
