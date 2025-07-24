import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Zap,
  Activity,
  BarChart3,
  Eye,
  FileText,
  Calendar
} from 'lucide-react';
import { AppContainer } from '@/components/layout/AppContainer';
import { HawklyCard, SecurityBadge, ProgressIndicator, AuditorAvatar, LiveMetric } from '@/components/ui/hawkly-components';
import { Button } from '@/components/ui/button';

// Mock real-time data
const useRealtimeData = () => {
  const [metrics, setMetrics] = useState({
    activeAudits: 12,
    completedAudits: 156,
    securityScore: 94.5,
    criticalIssues: 3,
    resolvedIssues: 89,
    auditorsOnline: 24
  });

  const [recentActivity, setRecentActivity] = useState([
    { 
      id: 1, 
      type: 'audit_started', 
      message: 'Smart contract audit initiated for DeFi Protocol X',
      time: '2 minutes ago',
      severity: 'info'
    },
    { 
      id: 2, 
      type: 'vulnerability_found', 
      message: 'High severity vulnerability detected in token contract',
      time: '15 minutes ago',
      severity: 'warning'
    },
    { 
      id: 3, 
      type: 'audit_completed', 
      message: 'Security audit completed for NFT Marketplace',
      time: '1 hour ago',
      severity: 'success'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time updates
      setMetrics(prev => ({
        ...prev,
        activeAudits: prev.activeAudits + Math.floor(Math.random() * 3) - 1,
        auditorsOnline: prev.auditorsOnline + Math.floor(Math.random() * 3) - 1,
        securityScore: Math.min(100, prev.securityScore + (Math.random() - 0.5) * 2)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return { metrics, recentActivity };
};

export default function RealTimeDashboard() {
  const { metrics, recentActivity } = useRealtimeData();
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock chart data
  const chartData = {
    securityTrends: [
      { date: 'Mon', score: 89 },
      { date: 'Tue', score: 92 },
      { date: 'Wed', score: 88 },
      { date: 'Thu', score: 95 },
      { date: 'Fri', score: 94 },
      { date: 'Sat', score: 97 },
      { date: 'Sun', score: 94 }
    ],
    auditProgress: [
      { name: 'Completed', value: 156, color: '#2de08e' },
      { name: 'In Progress', value: 12, color: '#a879ef' },
      { name: 'Pending Review', value: 8, color: '#32d9fa' },
      { name: 'On Hold', value: 3, color: '#ffd553' }
    ]
  };

  const quickActions = [
    { icon: Shield, label: 'Request New Audit', href: '/request-audit', color: 'from-[#a879ef] to-[#32d9fa]' },
    { icon: Users, label: 'Find Auditors', href: '/marketplace', color: 'from-[#32d9fa] to-[#2de08e]' },
    { icon: FileText, label: 'View Reports', href: '/reports', color: 'from-[#2de08e] to-[#ffd553]' },
    { icon: Zap, label: 'AI Analysis', href: '/tools/ai', color: 'from-[#ffd553] to-[#a879ef]' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#131822] via-[#181f2f] to-[#212842]">
      <AppContainer className="py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-[#f8f9fb] mb-2">Security Dashboard</h1>
            <p className="text-[#b2bfd4]">Monitor your Web3 security posture in real-time</p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 bg-[#181e2c] border border-[#23283e] rounded-lg text-[#f8f9fb] focus:border-[#a879ef] focus:outline-none"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
            <Button className="bg-gradient-to-r from-[#a879ef] to-[#32d9fa] hover:from-[#7d49ca] hover:to-[#24bad7]">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Audit
            </Button>
          </div>
        </div>

        {/* Key Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Active Audits"
              value={metrics.activeAudits}
              trend="up"
              animated={true}
              icon={Activity}
            />
          </HawklyCard>
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Security Score"
              value={metrics.securityScore}
              format="percentage"
              trend="stable"
              animated={true}
              icon={Shield}
            />
          </HawklyCard>
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Completed"
              value={metrics.completedAudits}
              trend="up"
              animated={true}
              icon={CheckCircle}
            />
          </HawklyCard>
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Critical Issues"
              value={metrics.criticalIssues}
              trend="down"
              animated={true}
              icon={AlertTriangle}
            />
          </HawklyCard>
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Issues Resolved"
              value={metrics.resolvedIssues}
              trend="up"
              animated={true}
              icon={TrendingUp}
            />
          </HawklyCard>
          <HawklyCard variant="glass" className="p-4">
            <LiveMetric
              label="Auditors Online"
              value={metrics.auditorsOnline}
              trend="stable"
              animated={true}
              icon={Users}
            />
          </HawklyCard>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Security Score Trend */}
            <HawklyCard variant="default" elevation="strong" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#f8f9fb]">Security Score Trend</h3>
                <SecurityBadge level="enterprise" verified={true} />
              </div>
              
              {/* Simple chart visualization */}
              <div className="h-64 flex items-end justify-between gap-2">
                {chartData.securityTrends.map((item, index) => (
                  <div key={item.date} className="flex-1 flex flex-col items-center gap-2">
                    <div 
                      className="w-full bg-gradient-to-t from-[#a879ef] to-[#32d9fa] rounded-t-lg transition-all duration-1000 ease-out hover:from-[#7d49ca] hover:to-[#24bad7]"
                      style={{ height: `${(item.score / 100) * 100}%` }}
                    />
                    <span className="text-xs text-[#b2bfd4] font-medium">{item.date}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-[#b2bfd4]">Average Score: 92.3%</span>
                <span className="text-[#2de08e] flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  +5.2% vs last week
                </span>
              </div>
            </HawklyCard>

            {/* Recent Activity Feed */}
            <HawklyCard variant="default" elevation="strong" className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-[#f8f9fb]">Recent Activity</h3>
                <Button variant="outline" size="sm" className="border-[#a879ef] text-[#a879ef]">
                  <Eye className="w-4 h-4 mr-2" />
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 bg-[#181e2c] rounded-lg border border-[#23283e]">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      activity.severity === 'success' ? 'bg-[#2de08e]' :
                      activity.severity === 'warning' ? 'bg-[#ffd553]' :
                      'bg-[#32d9fa]'
                    }`} />
                    <div className="flex-1">
                      <p className="text-[#f8f9fb] mb-1">{activity.message}</p>
                      <p className="text-[#8391ad] text-sm flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </HawklyCard>
          </div>

          {/* Right Column - Quick Actions and Info */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <HawklyCard variant="highlighted" elevation="strong" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="w-full justify-start h-12 border-[#23283e] hover:border-[#a879ef] group"
                  >
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-300`}>
                      <action.icon className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-[#f8f9fb] group-hover:text-[#a879ef] transition-colors duration-300">
                      {action.label}
                    </span>
                  </Button>
                ))}
              </div>
            </HawklyCard>

            {/* Top Auditors */}
            <HawklyCard variant="default" elevation="strong" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">Top Auditors</h3>
              <div className="space-y-4">
                {[
                  { name: 'Alex Chen', skills: ['DeFi', 'Smart Contracts'], rating: 4.9, verified: true },
                  { name: 'Maria Rodriguez', skills: ['NFT', 'Cross-chain'], rating: 4.8, verified: true },
                  { name: 'David Kim', skills: ['Protocol', 'MEV'], rating: 4.9, verified: true }
                ].map((auditor, index) => (
                  <AuditorAvatar
                    key={index}
                    {...auditor}
                    size="md"
                    showDetails={true}
                    className="p-3 bg-[#181e2c] rounded-lg border border-[#23283e] hover:border-[#a879ef] transition-colors duration-300"
                  />
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-[#a879ef] text-[#a879ef]">
                View All Auditors
              </Button>
            </HawklyCard>

            {/* Security Insights */}
            <HawklyCard variant="glass" className="p-6">
              <h3 className="text-xl font-bold text-[#f8f9fb] mb-6">AI Security Insights</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-[#a879ef]/10 to-[#32d9fa]/10 rounded-lg border border-[#a879ef]/20">
                  <div className="flex items-start gap-3">
                    <Zap className="w-5 h-5 text-[#a879ef] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#f8f9fb] mb-1">Smart Contract Vulnerability</h4>
                      <p className="text-sm text-[#b2bfd4]">
                        AI detected potential reentrancy vulnerability in your latest contract deployment.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-gradient-to-r from-[#2de08e]/10 to-[#32d9fa]/10 rounded-lg border border-[#2de08e]/20">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[#2de08e] mt-0.5" />
                    <div>
                      <h4 className="font-medium text-[#f8f9fb] mb-1">Security Improvement</h4>
                      <p className="text-sm text-[#b2bfd4]">
                        Your security score improved by 12% after implementing our recommendations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </HawklyCard>
          </div>
        </div>
      </AppContainer>
    </div>
  );
}
