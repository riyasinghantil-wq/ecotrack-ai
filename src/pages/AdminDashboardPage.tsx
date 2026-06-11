import { useState, useEffect } from 'react';
import { Users, Leaf, Trophy, BookOpen, Target, BarChart2, TrendingUp, AlertTriangle, Activity, Globe, Zap, Clock } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts';
import { useTheme } from '../App';

export default function AdminDashboardPage() {
  const { darkMode } = useTheme();

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  // Demo statistics - clearly labeled
  const stats = {
    totalUsers: 12847,
    activeToday: 3421,
    totalCarbonSaved: 125847,
    totalChallenges: 156240,
    avgSessionTime: '12.4 min',
    retentionRate: 68,
  };

  const dailyActivity = [
    { day: 'Mon', users: 2800, actions: 4500 },
    { day: 'Tue', users: 3100, actions: 5200 },
    { day: 'Wed', users: 3400, actions: 5800 },
    { day: 'Thu', users: 3600, actions: 6100 },
    { day: 'Fri', users: 3200, actions: 5400 },
    { day: 'Sat', users: 3800, actions: 6500 },
    { day: 'Sun', users: 3500, actions: 5900 },
  ];

  const categoryStats = [
    { category: 'Transport', users: 8420, reduction: 45000, color: '#3b82f6' },
    { category: 'Energy', users: 7210, reduction: 38000, color: '#f59e0b' },
    { category: 'Food', users: 5840, reduction: 28000, color: '#22c55e' },
    { category: 'Waste', users: 4120, reduction: 15000, color: '#8b5cf6' },
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <h1 className={`text-3xl sm:text-4xl font-bold ${text}`}>Admin Dashboard</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-amber-500/20 text-amber-400' : 'bg-amber-100 text-amber-700'}`}>
              Demonstration Metrics
            </span>
          </div>
          <p className={`text-lg ${muted}`}>Platform-wide sustainability engagement metrics</p>
        </div>

        {/* Main Stats */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Users', value: stats.totalUsers.toLocaleString(), icon: Users, color: 'text-blue-500', trend: '+12%' },
            { label: 'Active Today', value: stats.activeToday.toLocaleString(), icon: Activity, color: 'text-green-500', trend: '+8%' },
            { label: 'Total CO2 Saved', value: `${(stats.totalCarbonSaved / 1000).toFixed(0)} tons`, icon: Leaf, color: 'text-emerald-500', trend: '+23%' },
            { label: 'Challenges Completed', value: stats.totalChallenges.toLocaleString(), icon: Trophy, color: 'text-amber-500', trend: '+18%' },
            { label: 'Avg Session Time', value: stats.avgSessionTime, icon: Clock, color: 'text-purple-500', trend: '+5%' },
            { label: '30-Day Retention', value: `${stats.retentionRate}%`, icon: TrendingUp, color: 'text-teal-500', trend: '+3%' },
          ].map(stat => (
            <div key={stat.label} className={`${card} rounded-2xl p-5 border`}>
              <div className="flex items-center justify-between mb-3">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <span className="text-xs text-green-500 font-medium">{stat.trend}</span>
              </div>
              <div className={`text-2xl font-bold ${text}`}>{stat.value}</div>
              <div className={`text-sm ${muted}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Activity Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Daily Active Users</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyActivity}>
                  <XAxis dataKey="day" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Daily User Actions</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyActivity}>
                  <XAxis dataKey="day" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="actions" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Category Performance */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`text-lg font-semibold ${text} mb-4`}>Category Performance</h2>
          <div className="space-y-4">
            {categoryStats.map(cat => (
              <div key={cat.category}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                    <span className={`text-sm font-medium ${text}`}>{cat.category}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className={muted}>{cat.users.toLocaleString()} users</span>
                    <span className="text-green-500 font-medium">{(cat.reduction / 1000).toFixed(0)}k kg saved</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(cat.users / stats.totalUsers) * 100}%`, backgroundColor: cat.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning & Challenges */}
        <div className="grid sm:grid-cols-2 gap-6 mb-8">
          <div className={`${card} rounded-2xl p-6 border`}>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-purple-500" />
              <h2 className={`text-lg font-semibold ${text}`}>Learning Completion</h2>
            </div>
            <div className="space-y-3">
              {[
                { module: 'Climate Basics', percent: 78 },
                { module: 'Renewable Energy', percent: 62 },
                { module: 'Sustainable Food', percent: 45 },
                { module: 'Green Transport', percent: 38 },
                { module: 'Circular Economy', percent: 25 },
              ].map(item => (
                <div key={item.module} className="flex items-center justify-between">
                  <span className={`text-sm ${muted}`}>{item.module}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${item.percent}%` }} />
                    </div>
                    <span className={`text-xs ${text} w-8`}>{item.percent}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${card} rounded-2xl p-6 border`}>
            <div className="flex items-center gap-2 mb-4">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h2 className={`text-lg font-semibold ${text}`}>Top Challenges</h2>
            </div>
            <div className="space-y-3">
              {[
                { name: 'No-Car Day', completions: 4521 },
                { name: 'Meatless Monday', completions: 3892 },
                { name: 'Energy Audit', completions: 3156 },
                { name: 'Water Saver', completions: 2847 },
                { name: 'Recycling Hero', completions: 2210 },
              ].map((item, i) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? 'bg-amber-500 text-white' : darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>{i + 1}</span>
                    <span className={`text-sm ${muted}`}>{item.name}</span>
                  </div>
                  <span className={`text-sm font-medium ${text}`}>{item.completions.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border`}>
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className={`text-sm font-medium ${text}`}>Demonstration Data Notice</p>
              <p className={`text-xs ${muted} mt-1`}>
                All metrics shown are simulated demonstration data for showcasing the admin dashboard capabilities.
                In a production environment, these would reflect real user statistics from the database.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
