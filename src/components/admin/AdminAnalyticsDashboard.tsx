import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { 
  ArrowUp, 
  ArrowDown, 
  Users, 
  Shield, 
  FileText, 
  Clock, 
  ChevronDown, 
  ChevronRight,
  Activity,
  RefreshCw
} from 'lucide-react';

/**
 * Admin Analytics Dashboard Component
 * Displays consolidated analytics from connected platform pages
 * Shows user engagement with newly connected features
 */
export function AdminAnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState('7d');
  const [featuresExpanded, setFeaturesExpanded] = useState(true);
  const [pagesExpanded, setPagesExpanded] = useState(true);
  const [usersExpanded, setUsersExpanded] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock data for page visits (would come from real analytics in production)
  const pageVisitData = [
    { name: '/admin/*', visits: 342, change: 28 },
    { name: '/security/*', visits: 287, change: 62 },
    { name: '/ai/*', visits: 254, change: 84 },
    { name: '/profile/*', visits: 198, change: 45 },
    { name: '/analytics/*', visits: 176, change: 92 },
    { name: '/community/*', visits: 124, change: 74 },
    { name: '/tools/*', visits: 98, change: 32 },
    { name: '/enterprise/*', visits: 76, change: 18 },
  ];

  // Mock data for feature engagement
  const featureEngagementData = [
    { name: 'Security Scanner', value: 345, fill: '#8884d8' },
    { name: 'AI Matching', value: 290, fill: '#82ca9d' },
    { name: 'Analytics Dashboards', value: 256, fill: '#ffc658' },
    { name: 'User Profiles', value: 187, fill: '#ff8042' },
    { name: 'Community Features', value: 143, fill: '#0088fe' }
  ];
  
  // Mock data for user activity over time
  const userActivityData = [
    { name: '1 Jul', Admin: 12, Regular: 24, Guest: 42 },
    { name: '5 Jul', Admin: 19, Regular: 36, Guest: 56 },
    { name: '10 Jul', Admin: 15, Regular: 48, Guest: 72 },
    { name: '15 Jul', Admin: 21, Regular: 52, Guest: 84 },
    { name: '20 Jul', Admin: 28, Regular: 64, Guest: 96 },
    { name: '24 Jul', Admin: 32, Regular: 78, Guest: 124 },
  ];

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="p-6 bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800/60">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Platform Analytics</h2>
        <div className="flex items-center gap-4">
          <div className="flex rounded-md overflow-hidden">
            {['1d', '7d', '30d', '90d'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1.5 text-sm font-medium ${
                  timeRange === range
                    ? 'bg-purple-700 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-gray-800 text-gray-300 hover:bg-gray-700"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Users</p>
              <h3 className="text-2xl font-bold text-white">12,487</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">18%</span>
            <span className="text-gray-400 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Audits Completed</p>
              <h3 className="text-2xl font-bold text-white">847</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-purple-900/30 flex items-center justify-center">
              <Shield className="h-5 w-5 text-purple-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">12%</span>
            <span className="text-gray-400 ml-1">vs last period</span>
          </div>
        </div>

        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
          <div className="flex justify-between">
            <div>
              <p className="text-gray-400 text-sm">Feature Engagement</p>
              <h3 className="text-2xl font-bold text-white">68%</h3>
            </div>
            <div className="h-10 w-10 rounded-full bg-cyan-900/30 flex items-center justify-center">
              <Activity className="h-5 w-5 text-cyan-400" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
            <span className="text-green-400 font-medium">24%</span>
            <span className="text-gray-400 ml-1">vs last period</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Feature Engagement Section */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">Feature Engagement</h3>
            <button 
              onClick={() => setFeaturesExpanded(!featuresExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {featuresExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          {featuresExpanded && (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={featureEngagementData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                  <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                  <YAxis tick={{ fill: '#ccc' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      borderColor: '#4b5563',
                      color: '#fff'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="value" name="Engagement Count">
                    {featureEngagementData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* New Page Visits */}
        <div className="bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-white">New Routes Traffic</h3>
            <button 
              onClick={() => setPagesExpanded(!pagesExpanded)}
              className="text-gray-400 hover:text-white"
            >
              {pagesExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </button>
          </div>

          {pagesExpanded && (
            <div className="space-y-3">
              {pageVisitData.map((page) => (
                <div key={page.name} className="flex items-center justify-between p-2 rounded-md bg-gray-700/30">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white">{page.name}</p>
                    <p className="text-xs text-gray-400">{page.visits} visits</p>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-sm font-medium ${page.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {page.change > 0 ? '+' : ''}{page.change}%
                    </span>
                    {page.change > 0 ? (
                      <ArrowUp className="ml-1 h-3 w-3 text-green-400" />
                    ) : (
                      <ArrowDown className="ml-1 h-3 w-3 text-red-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* User Activity Over Time */}
      <div className="mt-6 bg-gray-800/60 rounded-lg p-4 border border-gray-700/50">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-white">User Activity by Role</h3>
          <button 
            onClick={() => setUsersExpanded(!usersExpanded)}
            className="text-gray-400 hover:text-white"
          >
            {usersExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
        </div>

        {usersExpanded && (
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userActivityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
                <YAxis tick={{ fill: '#ccc' }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    borderColor: '#4b5563',
                    color: '#fff'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="Admin" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Regular" stroke="#82ca9d" activeDot={{ r: 8 }} strokeWidth={2} />
                <Line type="monotone" dataKey="Guest" stroke="#ffc658" activeDot={{ r: 8 }} strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
