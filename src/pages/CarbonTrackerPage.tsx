import { useTheme, useData } from '../App';
import {
  TrendingDown,
  TreePine,
  Car,
  Zap,
  Leaf,
  Droplets,
  ArrowUpRight,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';

export default function CarbonTrackerPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();

  const monthlyData = [
    { month: 'Jan', saved: 45 },
    { month: 'Feb', saved: 52 },
    { month: 'Mar', saved: 48 },
    { month: 'Apr', saved: 65 },
    { month: 'May', saved: 78 },
    { month: 'Jun', saved: 92 },
  ];

  const weeklyData = [
    { day: 'Week 1', saved: 12 },
    { day: 'Week 2', saved: 18 },
    { day: 'Week 3', saved: 15 },
    { day: 'Week 4', saved: 22 },
  ];

  const stats = [
    {
      title: 'CO₂ Saved This Week',
      value: userData.totalSaved || 22.5,
      unit: 'kg',
      change: 15,
      icon: Leaf,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'CO₂ Saved This Month',
      value: (userData.totalSaved || 92.3) * 4,
      unit: 'kg',
      change: 28,
      icon: TrendingDown,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Equivalent Trees Planted',
      value: Math.floor((userData.totalSaved || 92) / 25),
      unit: 'trees',
      change: 2,
      icon: TreePine,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
    },
    {
      title: 'Fuel Saved',
      value: Math.floor((userData.totalSaved || 35) * 1.2),
      unit: 'liters',
      change: 12,
      icon: Car,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
    },
  ];

  const activities = [
    {
      action: 'Biked to work instead of driving',
      saved: 4.2,
      date: 'Today',
      icon: Car,
    },
    {
      action: 'Reduced AC usage by 2 hours',
      saved: 1.6,
      date: 'Today',
      icon: Zap,
    },
    {
      action: 'Used reusable water bottle',
      saved: 0.5,
      date: 'Yesterday',
      icon: Droplets,
    },
    {
      action: 'Meatless Monday completed',
      saved: 2.1,
      date: '2 days ago',
      icon: Leaf,
    },
  ];

  const equivalents = [
    {
      label: 'Car miles not driven',
      value: 89,
      icon: Car,
    },
    {
      label: 'Smartphones charged',
      value: 12500,
      icon: Zap,
    },
    {
      label: 'Showers (10 min each)',
      value: 45,
      icon: Droplets,
    },
    {
      label: 'Trees planted equivalent',
      value: 4,
      icon: TreePine,
    },
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <TrendingDown className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Carbon Savings Tracker
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Visualize your positive environmental impact and track the CO₂ you've prevented from entering the atmosphere.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <span className="flex items-center text-green-500 text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  {stat.change}%
                </span>
              </div>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{stat.unit}</p>
              <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                {stat.title}
              </p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Chart */}
          <div className="lg:col-span-2 space-y-6">
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Monthly Savings Trend
                </h2>
                <select
                  className={`px-3 py-2 rounded-lg text-sm ${
                    darkMode
                      ? 'bg-gray-700 text-white border-gray-600'
                      : 'bg-gray-100 text-gray-700 border-gray-200'
                  } border`}
                >
                  <option>Last 6 months</option>
                  <option>Last 12 months</option>
                  <option>This year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="month" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="saved"
                    stroke="#22c55e"
                    fillOpacity={1}
                    fill="url(#colorSaved)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Environmental Equivalents */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Your Impact in Perspective
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {equivalents.map((item) => (
                  <div
                    key={item.label}
                    className={`flex items-center space-x-4 p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <item.icon className="h-6 w-6 text-green-500" />
                    </div>
                    <div>
                      <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {item.value.toLocaleString()}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Weekly Summary */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                This Week
              </h2>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="day" stroke={darkMode ? '#9ca3af' : '#6b7280'} fontSize={12} />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="saved"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Recent Activity */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <h2 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Savings
              </h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <activity.icon className="h-4 w-4 text-green-500" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {activity.action}
                      </p>
                      <div className="flex items-center justify-between mt-1">
                        <span
                          className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
                        >
                          {activity.date}
                        </span>
                        <span className="text-sm font-medium text-green-500">
                          -{activity.saved} kg CO₂
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
