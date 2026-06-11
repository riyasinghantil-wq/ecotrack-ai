import { useState } from 'react';
import { Users, Leaf, Trophy, BookOpen, Target, TreePine, Car, Zap, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { useTheme } from '../App';

export default function CommunityImpactPage() {
  const { darkMode } = useTheme();

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  // Demo community metrics
  const communityMetrics = {
    totalCO2Reduced: 125847, // kg
    totalChallenges: 15420,
    totalModulesCompleted: 33150,
    communityScore: 847,
    treesEquivalent: 5034,
    activeUsers: 12458,
  };

  const monthlyData = [
    { month: 'Jan', co2: 8500, challenges: 980, users: 10200 },
    { month: 'Feb', co2: 9200, challenges: 1100, users: 10500 },
    { month: 'Mar', co2: 10400, challenges: 1250, users: 11000 },
    { month: 'Apr', co2: 11800, challenges: 1320, users: 11500 },
    { month: 'May', co2: 14200, challenges: 1540, users: 12000 },
    { month: 'Jun', co2: 15800, challenges: 1850, users: 12458 },
  ];

  const categoryBreakdown = [
    { category: 'Transport', reduction: 45000, color: '#3b82f6' },
    { category: 'Energy', reduction: 38000, color: '#f59e0b' },
    { category: 'Food', reduction: 28000, color: '#22c55e' },
    { category: 'Waste', reduction: 14847, color: '#8b5cf6' },
  ];

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#fff',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    color: darkMode ? '#fff' : '#111827',
    borderRadius: '12px',
    fontSize: '12px',
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
            <Users className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Community Impact Dashboard</h1>
          <p className={`text-lg ${muted}`}>Collective environmental impact of the EcoTrack community</p>
          <div className={`inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'} text-sm font-medium`}>
            <span>Community Demonstration Metrics</span>
          </div>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total CO2 Reduced', value: `${(communityMetrics.totalCO2Reduced / 1000).toFixed(0)} tons`, icon: Leaf, color: 'text-green-500', bg: darkMode ? 'bg-green-500/10' : 'bg-green-50' },
            { label: 'Challenges Completed', value: communityMetrics.totalChallenges.toLocaleString(), icon: Trophy, color: 'text-amber-500', bg: darkMode ? 'bg-amber-500/10' : 'bg-amber-50' },
            { label: 'Learning Modules Done', value: communityMetrics.totalModulesCompleted.toLocaleString(), icon: BookOpen, color: 'text-blue-500', bg: darkMode ? 'bg-blue-500/10' : 'bg-blue-50' },
            { label: 'Community Score', value: communityMetrics.communityScore.toLocaleString(), icon: Target, color: 'text-purple-500', bg: darkMode ? 'bg-purple-500/10' : 'bg-purple-50' },
            { label: 'Trees Equivalent', value: communityMetrics.treesEquivalent.toLocaleString(), icon: TreePine, color: 'text-emerald-500', bg: darkMode ? 'bg-emerald-500/10' : 'bg-emerald-50' },
            { label: 'Active Users', value: communityMetrics.activeUsers.toLocaleString(), icon: Users, color: 'text-cyan-500', bg: darkMode ? 'bg-cyan-500/10' : 'bg-cyan-50' },
          ].map(metric => (
            <div key={metric.label} className={`${card} rounded-2xl p-5 border`}>
              <div className={`w-12 h-12 rounded-xl ${metric.bg} flex items-center justify-center mb-3`}>
                <metric.icon className={`h-6 w-6 ${metric.color}`} />
              </div>
              <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
              <div className={`text-sm ${muted}`}>{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Trend */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Monthly CO2 Reduction Trend</h2>
            <div className="h-64" role="img" aria-label="Monthly CO2 reduction trend chart">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toLocaleString()} kg CO2`, 'Reduced']} />
                  <Area type="monotone" dataKey="co2" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Reduction by Category</h2>
            <div className="h-64" role="img" aria-label="CO2 reduction by category chart">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryBreakdown} layout="vertical">
                  <XAxis type="number" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} />
                  <YAxis type="category" dataKey="category" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 12 }} width={80} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${(v / 1000).toFixed(0)}k kg`, 'CO2']} />
                  <Bar dataKey="reduction" radius={[0, 8, 8, 0]}>
                    {categoryBreakdown.map((entry, index) => (
                      <cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Impact Visualizations */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`text-lg font-semibold ${text} mb-6`}>Real-World Impact Equivalents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: '🌳', value: '5,034', label: 'Trees Planted Equivalent', desc: 'Based on average tree absorption' },
              { icon: '🚗', value: '629,235', label: 'km Not Driven', desc: 'Average car emissions avoided' },
              { icon: '💡', value: '251,694', label: 'Hours of LED Lighting', desc: 'Energy saved equivalent' },
              { icon: '🏠', value: '42', label: 'Homes Powered for a Year', desc: 'Clean electricity equivalent' },
            ].map(item => (
              <div key={item.label} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                <div className="text-4xl mb-2">{item.icon}</div>
                <div className={`text-xl font-bold text-green-500`}>{item.value}</div>
                <div className={`text-sm font-medium ${text}`}>{item.label}</div>
                <div className={`text-xs ${muted} mt-1`}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Stats */}
        <div className={`${card} rounded-2xl p-6 border`}>
          <h2 className={`text-lg font-semibold ${text} mb-6`}>Community Engagement</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-4xl font-bold text-green-500`}>72%</div>
              <div className={`text-sm ${text}`}>Complete at least 1 challenge</div>
              <div className={`text-xs ${muted}`}>of new users within first week</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold text-blue-500`}>4.2</div>
              <div className={`text-sm ${text}`}>Average modules completed</div>
              <div className={`text-xs ${muted}`}>per active user</div>
            </div>
            <div className="text-center">
              <div className={`text-4xl font-bold text-purple-500`}>68%</div>
              <div className={`text-sm ${text}`}>Return within 30 days</div>
              <div className={`text-xs ${muted}`}>strong retention rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
