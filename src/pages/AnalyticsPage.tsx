import { useState } from 'react';
import { BarChart2, TrendingUp, TrendingDown, Calendar, Trophy, BookOpen, Target, Leaf, Filter } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useTheme, useData } from '../App';

export default function AnalyticsPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  // Generate realistic demo data based on user data
  const weeklyData = [
    { day: 'Mon', score: 18, challenges: 2, points: 50 },
    { day: 'Tue', score: 22, challenges: 1, points: 30 },
    { day: 'Wed', score: 15, challenges: 3, points: 80 },
    { day: 'Thu', score: 28, challenges: 2, points: 55 },
    { day: 'Fri', score: 20, challenges: 1, points: 25 },
    { day: 'Sat', score: 35, challenges: 4, points: 110 },
    { day: 'Sun', score: 25, challenges: 2, points: 60 },
  ];

  const monthlyData = [
    { month: 'Jan', carbon: (userData.carbonScore || 5000) + 200, reduction: 0 },
    { month: 'Feb', carbon: (userData.carbonScore || 5000) + 100, reduction: 100 },
    { month: 'Mar', carbon: (userData.carbonScore || 5000), reduction: 200 },
    { month: 'Apr', carbon: (userData.carbonScore || 5000) - 150, reduction: 350 },
    { month: 'May', carbon: (userData.carbonScore || 5000) - 200, reduction: 400 },
    { month: 'Jun', carbon: (userData.carbonScore || 5000) - 300, reduction: 500 },
  ];

  const categoryData = [
    { name: 'Transport', value: 35, color: '#3b82f6' },
    { name: 'Home Energy', value: 28, color: '#f59e0b' },
    { name: 'Food', value: 22, color: '#22c55e' },
    { name: 'Shopping', value: 10, color: '#8b5cf6' },
    { name: 'Waste', value: 5, color: '#ec4899' },
  ];

  const challengeData = [
    { category: 'Energy', completed: 8, total: 12 },
    { category: 'Transport', completed: 6, total: 10 },
    { category: 'Food', completed: 5, total: 8 },
    { category: 'Water', completed: 4, total: 6 },
    { category: 'Waste', completed: 3, total: 5 },
  ];

  const tooltipStyle = {
    backgroundColor: darkMode ? '#1f2937' : '#fff',
    border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
    color: darkMode ? '#fff' : '#111827',
    borderRadius: '12px',
    fontSize: '12px',
  };

  const kpis = [
    { label: 'Carbon Score', value: (userData.carbonScore || 2500).toLocaleString(), unit: 'kg CO2', change: -12, icon: Leaf, color: 'text-green-500' },
    { label: 'EcoPoints', value: (userData.ecoPoints || 450).toLocaleString(), unit: 'pts', change: 18, icon: Trophy, color: 'text-amber-500' },
    { label: 'Challenges Done', value: (userData.completedChallenges?.length || 12).toString(), unit: '', change: 8, icon: Target, color: 'text-blue-500' },
    { label: 'Learning Progress', value: (userData.learningProgress || 68).toString(), unit: '%', change: 5, icon: BookOpen, color: 'text-purple-500' },
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Analytics Dashboard</h1>
            <p className={`text-lg ${muted}`}>Comprehensive insights into your sustainability journey</p>
          </div>
          <div className="flex gap-2">
            {(['week', 'month', 'year'] as const).map(range => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                  timeRange === range
                    ? 'bg-green-500 text-white'
                    : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpis.map(kpi => (
            <div key={kpi.label} className={`${card} rounded-2xl p-5 border`}>
              <div className="flex items-center justify-between mb-3">
                <kpi.icon className={`h-5 w-5 ${kpi.color}`} />
                <div className={`flex items-center gap-1 text-xs font-medium ${kpi.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {kpi.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {Math.abs(kpi.change)}%
                </div>
              </div>
              <div className="text-2xl font-bold text-green-500">
                {kpi.value}{kpi.unit && <span className="text-sm text-gray-400 ml-1">{kpi.unit}</span>}
              </div>
              <div className={`text-xs ${muted}`}>{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Main Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Carbon Score Trend */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Carbon Score Trend</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <XAxis dataKey="month" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v.toLocaleString()} kg CO2`, 'Carbon Score']} />
                  <Area type="monotone" dataKey="carbon" stroke="#22c55e" fill="#22c55e" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Emissions by Category */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Emissions by Category</h2>
            <div className="h-64 flex items-center">
              <ResponsiveContainer width="60%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={2} dataKey="value">
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {categoryData.map(item => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className={`text-sm ${text}`}>{item.name}</span>
                    </div>
                    <span className={`text-sm font-medium ${muted}`}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Activity */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`text-lg font-semibold ${text} mb-4`}>Weekly Activity</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                <Tooltip contentStyle={tooltipStyle} />
                <Bar dataKey="points" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Challenge & Learning Analytics */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Challenge Completion */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Challenge Completion by Category</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={challengeData} layout="vertical">
                  <XAxis type="number" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <YAxis type="category" dataKey="category" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} width={70} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="completed" fill="#22c55e" radius={[0, 6, 6, 0]} />
                  <Bar dataKey="total" fill={darkMode ? '#374151' : '#e5e7eb'} radius={[0, 6, 6, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className={`text-xs ${muted}`}>Completed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gray-400" />
                <span className={`text-xs ${muted}`}>Available</span>
              </div>
            </div>
          </div>

          {/* Carbon Reduction */}
          <div className={`${card} rounded-2xl p-6 border`}>
            <h2 className={`text-lg font-semibold ${text} mb-4`}>Carbon Reduction Progress</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="month" tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <YAxis tick={{ fill: darkMode ? '#9ca3af' : '#6b7280', fontSize: 11 }} />
                  <Tooltip contentStyle={tooltipStyle} formatter={(v: number) => [`${v} kg CO2`, 'Reduced']} />
                  <Line type="monotone" dataKey="reduction" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10' : 'bg-gradient-to-r from-green-50 to-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <h3 className={`font-semibold ${text} mb-4`}>Performance Summary</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Total Carbon Saved', value: '1,250 kg CO2', trend: '+23% vs last month' },
              { label: 'Avg Daily Score', value: '23 points', trend: '+8% improvement' },
              { label: 'Top Category', value: 'Energy', trend: 'Best performance' },
              { label: 'Next Milestone', value: 'Climate Champion', trend: '2 challenges away' },
            ].map(stat => (
              <div key={stat.label}>
                <p className={`text-sm ${muted}`}>{stat.label}</p>
                <p className={`text-lg font-semibold ${text}`}>{stat.value}</p>
                <p className="text-xs text-green-500">{stat.trend}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
