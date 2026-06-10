import { useTheme, useData } from '../App';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  Leaf,
  Target,
  Award,
  Calendar,
  Zap,
  TreePine,
  Recycle,
  Flame,
  ArrowRight,
  Trophy,
  Star,
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from 'recharts';

export default function DashboardPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();

  // Generate sample data for charts
  const weeklyData = [
    { day: 'Mon', emissions: 12.5, saved: 2.1 },
    { day: 'Tue', emissions: 11.8, saved: 2.8 },
    { day: 'Wed', emissions: 13.2, saved: 1.5 },
    { day: 'Thu', emissions: 10.5, saved: 4.2 },
    { day: 'Fri', emissions: 9.8, saved: 4.9 },
    { day: 'Sat', emissions: 8.5, saved: 6.2 },
    { day: 'Sun', emissions: 7.9, saved: 6.8 },
  ];

  const categoryData = [
    { name: 'Transport', value: 35, color: '#ef4444' },
    { name: 'Energy', value: 25, color: '#f59e0b' },
    { name: 'Food', value: 25, color: '#22c55e' },
    { name: 'Waste', value: 10, color: '#3b82f6' },
    { name: 'Water', value: 5, color: '#06b6d4' },
  ];

  const achievements = [
    { icon: TreePine, title: 'First Tree Planted', desc: 'Offset your first 100kg CO2', unlocked: true },
    { icon: Recycle, title: 'Recycling Champion', desc: 'Complete 10 recycling challenges', unlocked: true },
    { icon: Flame, title: '7-Day Streak', desc: 'Log activities for 7 consecutive days', unlocked: userData.streak >= 7 },
    { icon: Target, title: 'Goal Setter', desc: 'Complete first weekly goal', unlocked: true },
    { icon: Star, title: 'Eco Warrior', desc: 'Reach 1000 eco points', unlocked: userData.ecoPoints >= 1000 },
    { icon: Trophy, title: 'Top 10', desc: 'Reach top 10 on leaderboard', unlocked: false },
  ];

  const kpiCards = [
    {
      title: 'Carbon Score',
      value: userData.carbonScore || 12.5,
      unit: 'kg CO2/day',
      change: -12,
      icon: Leaf,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Eco Points',
      value: userData.ecoPoints || 850,
      unit: 'points',
      change: 25,
      icon: Zap,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
    {
      title: 'Current Streak',
      value: userData.streak || 15,
      unit: 'days',
      change: 5,
      icon: Flame,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Total Saved',
      value: userData.totalSaved || 45.2,
      unit: 'kg CO2',
      change: 18,
      icon: TrendingUp,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Your Dashboard
            </h1>
            <p className={`mt-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Track your sustainability journey and environmental impact
            </p>
          </div>
          <div className="mt-4 sm:mt-0">
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl ${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-sm`}
            >
              <Calendar className="h-4 w-4 text-green-500" />
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {kpiCards.map((card) => (
            <div
              key={card.title}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    card.change > 0 ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}
                >
                  {card.change > 0 ? '+' : ''}
                  {card.change}%
                </span>
              </div>
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {typeof card.value === 'number' ? card.value.toFixed(1) : card.value}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {card.title}
              </p>
              <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                {card.unit}
              </p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Weekly Progress Chart */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Weekly Emissions Trend
                </h2>
                <div className="flex space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Emissions</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>Saved</span>
                  </div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorEmissions" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="emissions"
                    stroke="#ef4444"
                    fillOpacity={1}
                    fill="url(#colorEmissions)"
                  />
                  <Area
                    type="monotone"
                    dataKey="saved"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorSaved)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Breakdown */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Emissions by Category
              </h2>
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="min-h-[200px]">
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                      <XAxis type="number" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <YAxis dataKey="name" type="category" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                          border: 'none',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                        {categoryData.map((entry, index) => (
                          <rect key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                  {categoryData.map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                          {item.name}
                        </span>
                      </div>
                      <span
                        className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}
                      >
                        {item.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Progress and Achievements */}
          <div className="space-y-6">
            {/* Sustainability Level */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Sustainability Level
              </h2>
              <div className="flex justify-center mb-4">
                <div className="relative w-32 h-32">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke={darkMode ? '#374151' : '#e5e7eb'}
                      strokeWidth="8"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="8"
                      strokeDasharray="251.2"
                      strokeDashoffset="62.8"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userData.carbonScore || 75}%
                    </span>
                    <span className="text-green-500 text-sm font-medium">
                      {userData.sustainabilityLevel || 'Good'}
                    </span>
                  </div>
                </div>
              </div>
              <Link
                to="/calculator"
                className="flex items-center justify-center w-full px-4 py-2 rounded-lg bg-green-500/10 text-green-500 font-medium hover:bg-green-500/20 transition-colors"
              >
                <span>Recalculate Score</span>
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>

            {/* Achievements */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Achievements
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className={`flex flex-col items-center p-3 rounded-lg ${
                      achievement.unlocked
                        ? darkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-50'
                        : 'opacity-50'
                    }`}
                    title={achievement.title}
                  >
                    <achievement.icon
                      className={`h-6 w-6 ${
                        achievement.unlocked ? 'text-amber-500' : darkMode ? 'text-gray-600' : 'text-gray-300'
                      }`}
                    />
                    {achievement.unlocked && (
                      <div className="mt-1 w-4 h-4 rounded-full bg-green-500 items-center justify-center flex">
                        <Award className="h-2 w-2 text-white" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <p className={`text-xs text-center mt-4 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {achievements.filter((a) => a.unlocked).length} of {achievements.length} unlocked
              </p>
            </div>

            {/* Quick Actions */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Quick Actions
              </h2>
              <div className="space-y-2">
                <Link
                  to="/challenges"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-green-500/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Target className="h-5 w-5 text-green-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Start a Challenge
                    </span>
                  </div>
                  <ArrowRight className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </Link>
                <Link
                  to="/ai-coach"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-green-500/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <BarChart3 className="h-5 w-5 text-blue-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      Ask AI Coach
                    </span>
                  </div>
                  <ArrowRight className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </Link>
                <Link
                  to="/impact"
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-green-500/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-5 w-5 text-purple-500" />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'}>
                      View Impact
                    </span>
                  </div>
                  <ArrowRight className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
