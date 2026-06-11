import { Calculator, Brain, Trophy, BookOpen, BarChart2, RefreshCcw, Zap, Leaf } from 'lucide-react';
import { useTheme } from '../App';

export default function MethodologyPage() {
  const { darkMode } = useTheme();

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const methodologies = [
    {
      title: 'Carbon Calculation Methodology',
      icon: Calculator,
      color: 'text-green-500',
      sections: [
        {
          heading: 'Emission Factors',
          content: 'We use CO2 emission factors from internationally recognized sources including the IPCC, EPA, and DEFRA. Each category uses specific factors:',
          details: [
            'Transport: 0.21 kg CO2 per km (average car), 0.133 kg CO2 per km (bus), 0.041 kg CO2 per km (train)',
            'Electricity: 0.42 kg CO2 per kWh (grid average in USA)',
            'Natural Gas: 2.0 kg CO2 per therm',
            'Food: 6.3 kg CO2 per kg of beef, 4.7 kg CO2 per kg of lamb, 1.9 kg CO2 per kg of chicken, 0.4 kg CO2 per kg of vegetables',
            'Waste: 0.52 kg CO2 per kg of landfill waste, 0.04 kg CO2 per kg of recycled material',
          ],
        },
        {
          heading: 'Calculation Process',
          content: 'The carbon calculator follows a structured process:',
          details: [
            '1. User inputs consumption data across categories',
            '2. Each input is multiplied by the corresponding emission factor',
            '3. Category totals are summed for annual footprint',
            '4. Score is compared against national averages for context',
            '5. Sustainability level is assigned based on percentile ranking',
          ],
        },
        {
          heading: 'Scoring Tiers',
          content: 'Carbon scores are classified into tiers reflecting environmental impact:',
          details: [
            'Excellent (< 4,000 kg CO2/year): Top 10% of low-impact lifestyles',
            'Good (4,000 - 8,000 kg CO2/year): Below average footprint',
            'Average (8,000 - 12,000 kg CO2/year): Typical household emissions',
            'High (12,000 - 16,000 kg CO2/year): Above average, improvement needed',
            'Critical (> 16,000 kg CO2/year): Significant reduction opportunity',
          ],
        },
      ],
    },
    {
      title: 'AI Recommendation Engine',
      icon: Brain,
      color: 'text-blue-500',
      sections: [
        {
          heading: 'Personalization Algorithm',
          content: 'The AI Coach generates recommendations through a multi-step process:',
          details: [
            '1. Analyze user carbon score by category breakdown',
            '2. Identify highest-impact emission sources',
            '3. Match user profile with proven reduction strategies',
            '4. Rank recommendations by feasibility and impact',
            '5. Present actionable steps with quantified benefits',
          ],
        },
        {
          heading: 'Impact Estimation',
          content: 'Each recommendation includes an estimated carbon reduction based on:',
          details: [
            'Historical data from behavioral studies',
            'Average implementation rates for each action',
            'Regional emission factor adjustments',
            'Cumulative effect modeling over time',
          ],
        },
      ],
    },
    {
      title: 'Challenge Scoring System',
      icon: Trophy,
      color: 'text-amber-500',
      sections: [
        {
          heading: 'EcoPoints Calculation',
          content: 'Challenges award EcoPoints based on:',
          details: [
            'Difficulty level: Easy (10 pts), Medium (25 pts), Hard (50 pts)',
            'Completion time bonuses for faster finishes',
            'Streak multipliers for consecutive completions',
            'Category diversity bonuses for balanced participation',
          ],
        },
        {
          heading: 'Carbon Saving Attribution',
          content: 'Challenge completions translate to real carbon savings:',
          details: [
            'Each challenge has an associated CO2 reduction estimate',
            'Savings accumulate in user total savings metric',
            'Savings contribute to community impact tracking',
          ],
        },
      ],
    },
    {
      title: 'Learning Methodology',
      icon: BookOpen,
      color: 'text-purple-500',
      sections: [
        {
          heading: 'Module Design',
          content: 'Learning content follows pedagogical best practices:',
          details: [
            'Progressive complexity: Beginner → Intermediate → Advanced',
            'Bite-sized lessons: 5-10 minute reading time each',
            'Action-oriented: Every lesson ends with a clear action item',
            'Reinforcement: Key concepts revisited across modules',
          ],
        },
      ],
    },
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4">
            <RefreshCcw className="h-8 w-8 text-teal-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>How EcoTrack AI Works</h1>
          <p className={`text-lg ${muted}`}>Transparent methodology for all calculations and recommendations</p>
        </div>

        {/* Quick Overview */}
        <div className={`mb-8 p-6 rounded-2xl ${card} border`}>
          <h2 className={`font-semibold ${text} mb-4`}>Transparency Promise</h2>
          <p className={muted}>
            EcoTrack AI is built on peer-reviewed science and internationally recognized emission factor databases.
            We believe users deserve to understand exactly how their scores are calculated and why specific
            recommendations are made. This page explains every methodology in detail.
          </p>
        </div>

        {/* Methodology Sections */}
        {methodologies.map(methodology => (
          <div key={methodology.title} className={`mb-8 ${card} rounded-2xl border overflow-hidden`}>
            <div className={`p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex items-center gap-3`}>
              <div className={`w-10 h-10 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                <methodology.icon className={`h-5 w-5 ${methodology.color}`} />
              </div>
              <h2 className={`text-lg font-semibold ${text}`}>{methodology.title}</h2>
            </div>
            <div className="p-6 space-y-6">
              {methodology.sections.map(section => (
                <div key={section.heading}>
                  <h3 className={`font-medium ${text} mb-2`}>{section.heading}</h3>
                  <p className={`text-sm ${muted} mb-3`}>{section.content}</p>
                  <ul className="space-y-2">
                    {section.details.map(detail => (
                      <li key={detail} className={`flex gap-2 text-sm ${muted}`}>
                        <Leaf className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Data Sources */}
        <div className={`mb-8 p-6 rounded-2xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border`}>
          <h2 className={`font-semibold ${text} mb-4 flex items-center gap-2`}>
            <Zap className="h-5 w-5 text-blue-500" />
            Data Sources
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: 'IPCC Guidelines', desc: 'Intergovernmental Panel on Climate Change emission factor methodology' },
              { name: 'EPA Emission Factors', desc: 'US Environmental Protection Agency dataset' },
              { name: 'DEFRA Conversion Factors', desc: 'UK Department for Environment, Food and Rural Affairs' },
              { name: 'Our World in Data', desc: 'Global emissions data and benchmarks' },
            ].map(source => (
              <div key={source.name} className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className={`font-medium text-sm ${text}`}>{source.name}</p>
                <p className={`text-xs ${muted}`}>{source.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} text-center`}>
          <p className={`text-xs ${muted}`}>
            Calculations are estimates based on average emission factors. Actual carbon footprint may vary based on
            local grid mix, vehicle efficiency, and other factors. For precise measurements, consider professional
            carbon auditing services.
          </p>
        </div>
      </div>
    </div>
  );
}
