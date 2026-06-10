import { Link } from 'react-router-dom';
import { useTheme, useData } from '../App';
import {
  Leaf,
  Calculator,
  MessageCircle,
  BarChart3,
  Target,
  BookOpen,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Shield,
  Globe,
  Lightbulb,
  Zap,
  TreePine,
  Recycle,
  AlertCircle,
  Thermometer,
} from 'lucide-react';

export default function LandingPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();

  // Environmental facts instead of fake statistics
  const environmentalFacts = [
    {
      fact: '7.6%',
      description: 'of global greenhouse gas emissions come from transportation',
      icon: Globe,
    },
    {
      fact: '25%',
      description: 'of global emissions come from electricity and heat production',
      icon: Lightbulb,
    },
    {
      fact: '1.5°C',
      description: 'maximum warming target to avoid severe climate impacts',
      icon: Thermometer,
    },
    {
      fact: '2050',
      description: 'target year for global net-zero emissions',
      icon: TreePine,
    },
  ];

  const features = [
    {
      icon: Calculator,
      title: 'Smart Carbon Calculator',
      description:
        'Precise calculations based on your daily activities, from transportation to energy consumption and food habits.',
      path: '/calculator',
    },
    {
      icon: MessageCircle,
      title: 'AI Sustainability Coach',
      description:
        'Get personalized recommendations and actionable insights powered by intelligent analysis of your lifestyle.',
      path: '/ai-coach',
    },
    {
      icon: Target,
      title: 'Green Challenges',
      description:
        'Participate in eco-challenges, earn points, and compete on leaderboards while making a real difference.',
      path: '/challenges',
    },
    {
      icon: BarChart3,
      title: 'Personal Dashboard',
      description:
        'Track your progress with beautiful visualizations, sustainability scores, and detailed activity history.',
      path: '/dashboard',
    },
    {
      icon: BookOpen,
      title: 'Learning Center',
      description:
        'Expand your knowledge with comprehensive resources on climate change, renewable energy, and sustainability.',
      path: '/learning',
    },
    {
      icon: TrendingUp,
      title: 'Impact Analysis',
      description:
        'Visualize your environmental impact compared to averages and set personal reduction goals.',
      path: '/impact',
    },
  ];

  const trustPoints = [
    {
      icon: BarChart3,
      title: 'Data-Driven Insights',
      description: 'Scientifically-backed calculations using recognized emission factors and methodologies.',
    },
    {
      icon: Leaf,
      title: 'Sustainability-Focused Design',
      description: 'Every feature is designed with environmental impact reduction as the core objective.',
    },
    {
      icon: Lightbulb,
      title: 'Educational Awareness Tools',
      description: 'Comprehensive resources to help you understand and take action on environmental issues.',
    },
    {
      icon: Zap,
      title: 'Personalized Recommendations',
      description: 'AI-powered suggestions tailored to your unique lifestyle and habits.',
    },
    {
      icon: Shield,
      title: 'Privacy-First Approach',
      description: 'Your data stays on your device. We never sell or share your personal information.',
    },
    {
      icon: Globe,
      title: 'User-Friendly Experience',
      description: 'Intuitive interface designed to make sustainability tracking effortless and engaging.',
    },
  ];

  // Environmental benefits instead of testimonials
  const environmentalBenefits = [
    {
      title: 'Reduce Your Carbon Footprint',
      description: 'Understanding your emissions is the first step. The average person produces 4-16 tonnes of CO2 annually. Small changes can reduce this by 20-50%.',
      icon: TreePine,
    },
    {
      title: 'Save Money While Saving the Planet',
      description: 'Energy efficiency improvements can reduce utility bills by 10-30%. Sustainable transportation choices cut fuel costs significantly.',
      icon: Zap,
    },
    {
      title: 'Improve Your Health',
      description: 'Sustainable choices like cycling, walking, and eating plant-based meals improve cardiovascular health and reduce chronic disease risk.',
      icon: Leaf,
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Calculate Your Footprint',
      description: 'Enter your daily activities in our comprehensive calculator to understand your current impact.',
      icon: Calculator,
    },
    {
      number: '02',
      title: 'Get AI Recommendations',
      description: 'Receive personalized suggestions from our AI coach on how to reduce your emissions.',
      icon: MessageCircle,
    },
    {
      number: '03',
      title: 'Take Action',
      description: 'Complete challenges, track progress, and earn eco points while making a real difference.',
      icon: Target,
    },
    {
      number: '04',
      title: 'See Your Impact',
      description: 'Visualize your progress and celebrate the positive change you are making.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className={`transition-colors duration-300`}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className={`absolute inset-0 ${
              darkMode
                ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-green-900/20'
                : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
            }`}
          />
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-6">
                <Leaf className="h-4 w-4" />
                <span>Sustainability Platform</span>
              </div>

              <h1
                className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}
              >
                Understand Your Impact.
                <br />
                <span className="text-green-500">Build a Greener Future.</span>
              </h1>

              <p
                className={`text-lg sm:text-xl mb-8 max-w-xl ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}
              >
                Track your carbon footprint, receive AI-powered recommendations, and take meaningful
                actions to reduce environmental impact.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/calculator"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200 shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/30 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Footprint
                </Link>
                <Link
                  to="/dashboard"
                  className={`inline-flex items-center justify-center px-6 py-3 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                    darkMode
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  View Dashboard
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative hidden lg:block">
              <div className="relative z-10">
                {/* Main Card */}
                <div
                  className={`${
                    darkMode ? 'bg-gray-800/90' : 'bg-white/90'
                  } backdrop-blur-xl rounded-3xl p-8 shadow-2xl`}
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      Your Impact Score
                    </h3>
                    <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                      {userData.sustainabilityLevel || 'Get Started'}
                    </div>
                  </div>
                  <div className="relative w-48 h-48 mx-auto mb-6">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={darkMode ? '#374151' : '#e5e7eb'}
                        strokeWidth="10"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="#22c55e"
                        strokeWidth="10"
                        strokeDasharray="251.2"
                        strokeDashoffset={userData.carbonScore ? 251.2 - (251.2 * (100 - userData.carbonScore)) / 100 : 62.8}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {userData.carbonScore || 75}
                      </span>
                      <span className="text-green-500 text-sm font-medium">Eco Score</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-500">{userData.carbonScore || '--'}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        kg CO2/day
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-500">{userData.ecoPoints || 0}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Points</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-amber-500">{userData.streak || 0}</p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Day Streak
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div
                  className={`absolute -top-4 -right-4 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl p-4 shadow-xl`}
                >
                  <Recycle className="h-8 w-8 text-green-500" />
                </div>
                <div
                  className={`absolute -bottom-4 -left-4 ${
                    darkMode ? 'bg-gray-800' : 'bg-white'
                  } rounded-2xl p-4 shadow-xl`}
                >
                  <TreePine className="h-8 w-8 text-emerald-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Facts Section - Replaced fake statistics */}
      <section
        className={`py-16 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              Why Carbon Awareness Matters
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Understanding these facts is the first step toward making a meaningful environmental impact.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {environmentalFacts.map((fact) => (
              <div
                key={fact.fact}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg`}
              >
                <fact.icon className="h-8 w-8 text-green-500 mx-auto mb-4" />
                <p
                  className={`text-3xl lg:text-4xl font-bold mb-2 text-green-500`}
                >
                  {fact.fact}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {fact.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Everything You Need to Go Green
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Powerful tools designed to help you understand, track, and reduce your environmental
              impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                to={feature.path}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 ${
                  darkMode
                    ? 'bg-gray-800 hover:bg-gray-750'
                    : 'bg-white hover:shadow-xl hover:shadow-green-500/10'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-100'} `}
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-2xl transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />
                <div
                  className={`inline-flex p-3 rounded-xl mb-6 ${
                    darkMode ? 'bg-green-500/20' : 'bg-green-500/10'
                  } group-hover:bg-green-500 transition-colors duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-green-500 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3
                  className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {feature.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {feature.description}
                </p>
                <div className="flex items-center text-green-500 mt-4 font-medium text-sm group-hover:translate-x-2 transition-transform duration-200">
                  <span>Learn more</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
              <Shield className="h-4 w-4" />
              <span>Why EcoTrack AI</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Built for Real Impact
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Designed on scientific principles with your sustainability goals in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trustPoints.map((point) => (
              <div
                key={point.title}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl p-6 transition-all duration-300 hover:shadow-lg`}
              >
                <div
                  className={`inline-flex p-2 rounded-lg mb-4 ${
                    darkMode ? 'bg-green-500/20' : 'bg-green-500/10'
                  }`}
                >
                  <point.icon className="h-5 w-5 text-green-500" />
                </div>
                <h3
                  className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                >
                  {point.title}
                </h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              { label: 'Privacy First', icon: Shield },
              { label: 'Science-Based', icon: Lightbulb },
              { label: 'Open Source', icon: Globe },
              { label: 'No Account Required', icon: CheckCircle },
            ].map((badge) => (
              <div
                key={badge.label}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${
                  darkMode ? 'bg-gray-700' : 'bg-white'
                } shadow-sm`}
              >
                <badge.icon className="h-4 w-4 text-green-500" />
                <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {badge.label}
                </span>
                <CheckCircle className="h-4 w-4 text-green-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              How It Works
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Start your sustainability journey in just four simple steps.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {index < steps.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-16 left-full w-full h-0.5 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-200'
                    }`}
                    style={{ transform: 'translateY(-50%)' }}
                  />
                )}
                <div className="text-center">
                  <div
                    className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${
                      darkMode ? 'bg-green-500/20' : 'bg-green-500/10'
                    } mb-6`}
                  >
                    <step.icon className="h-7 w-7 text-green-500" />
                  </div>
                  <div
                    className={`text-sm font-bold text-green-500 mb-2 ${
                      darkMode ? 'text-green-400' : 'text-green-600'
                    }`}
                  >
                    Step {step.number}
                  </div>
                  <h3
                    className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}
                  >
                    {step.title}
                  </h3>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Benefits Section - Replaced testimonials */}
      <section
        className={`py-20 ${darkMode ? 'bg-gray-800/50' : 'bg-gray-50'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium mb-4">
              <AlertCircle className="h-4 w-4" />
              <span>Why It Matters</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Benefits of Tracking Your Footprint
            </h2>
            <p
              className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            >
              Understanding your environmental impact leads to meaningful positive change.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {environmentalBenefits.map((benefit, index) => (
              <div
                key={index}
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl mb-6 ${
                  darkMode ? 'bg-green-500/20' : 'bg-green-500/10'
                }`}>
                  <benefit.icon className="h-6 w-6 text-green-500" />
                </div>
                <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {benefit.title}
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-3xl ${
              darkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-green-500 to-emerald-600'
            } p-12 text-center`}
          >
            {darkMode && (
              <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-700 opacity-50" />
            )}
            <div className="relative z-10">
              <Leaf className="h-16 w-16 text-white mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Start tracking your carbon footprint today and take the first step toward a more
                sustainable lifestyle.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/calculator"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-green-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-500"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Start Calculating
                </Link>
                <Link
                  to="/learning"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-200 border border-white/30 focus:outline-none focus:ring-2 focus:ring-white"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Explore Learning Center
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
