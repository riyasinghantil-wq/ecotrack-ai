import { useTheme, useData } from '../App';
import {
  TrendingUp,
  Target,
  Globe,
  Leaf,
  TreePine,
  Car,
  Users,
  Award,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';

export default function ImpactPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();

  const comparisonData = [
    { name: 'You', value: userData.carbonScore || 12.5 },
    { name: 'National Avg', value: 15.2 },
    { name: 'Sustainable Target', value: 8.0 },
  ];

  const radarData = [
    { category: 'Transport', value: 70, fullMark: 100 },
    { category: 'Energy', value: 65, fullMark: 100 },
    { category: 'Food', value: 85, fullMark: 100 },
    { category: 'Waste', value: 75, fullMark: 100 },
    { category: 'Water', value: 80, fullMark: 100 },
  ];

  const yearlyProjection = [
    { month: 'Jan', projected: 14 },
    { month: 'Feb', projected: 13.5 },
    { month: 'Mar', projected: 12.8 },
    { month: 'Apr', projected: 12 },
    { month: 'May', projected: 11.2 },
    { month: 'Jun', projected: 10.5 },
    { month: 'Jul', projected: 9.8 },
    { month: 'Aug', projected: 9.2 },
    { month: 'Sep', projected: 8.8 },
    { month: 'Oct', projected: 8.5 },
    { month: 'Nov', projected: 8.2 },
    { month: 'Dec', projected: 8.0 },
  ];

  const impactCards = [
    {
      title: 'Your vs National Average',
      value: `${((userData.carbonScore || 12.5) < 15.2 ? '+' : '')}${((15.2 - (userData.carbonScore || 12.5)) / 15.2 * 100).toFixed(0)}%`,
      subtitle: 'Below average',
      icon: Target,
      positive: true,
    },
    {
      title: 'Trees Equivalent',
      value: '4',
      subtitle: 'Would absorb your yearly emissions',
      icon: TreePine,
      positive: true,
    },
    {
      title: 'Cars Off Road',
      value: '0.6',
      subtitle: 'Equivalent annual emissions',
      icon: Car,
      positive: false,
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
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-500/10 mb-6">
            <TrendingUp className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Impact Visualization
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Visualize and understand your environmental impact compared to averages and sustainable targets.
          </p>
        </div>

        {/* Impact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {impactCards.map((card) => (
            <div
              key={card.title}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-xl p-6 shadow-sm`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${card.positive ? 'bg-green-500/10' : 'bg-amber-500/10'}`}>
                  <card.icon className={`h-5 w-5 ${card.positive ? 'text-green-500' : 'text-amber-500'}`} />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  card.positive ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {card.positive ? 'Positive' : 'Needs Work'}
                </span>
              </div>
              <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {card.value}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{card.subtitle}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Comparison Chart */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Daily Emissions Comparison (kg CO₂)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="name" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: darkMode ? '#1f2937' : '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Radar Chart */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Category Performance
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={radarData}>
                <PolarGrid stroke={darkMode ? '#374151' : '#e5e7eb'} />
                <PolarAngleAxis dataKey="category" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <PolarRadiusAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
                <Radar
                  name="Score"
                  dataKey="value"
                  stroke="#22c55e"
                  fill="#22c55e"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Yearly Projection */}
          <div className={`lg:col-span-2 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm`}>
            <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Projected Monthly Emissions (kg CO₂/day)
            </h2>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={yearlyProjection}>
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
                <Bar dataKey="projected" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Summary */}
        <div className={`mt-8 ${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-green-50 to-emerald-50'} rounded-2xl p-8`}>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>45</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Countries Active</p>
            </div>
            <div>
              <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>50K+</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Users Worldwide</p>
            </div>
            <div>
              <Leaf className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>2.5M kg</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>CO₂ Tracked</p>
            </div>
            <div>
              <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>125K</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Challenges Done</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
