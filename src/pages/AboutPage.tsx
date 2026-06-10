import { useTheme } from '../App';
import {
  Leaf,
  Target,
  Eye,
  Lightbulb,
  Shield,
  Globe,
  Award,
  Heart,
  Sparkles,
  TreePine,
  Recycle,
  Users,
} from 'lucide-react';

export default function AboutPage() {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: Lightbulb,
      title: 'Smart Carbon Calculator',
      description: 'Accurate, science-based calculations that consider all aspects of your daily life.',
    },
    {
      icon: Sparkles,
      title: 'AI-Powered Insights',
      description: 'Personalized recommendations that adapt to your lifestyle and help you make sustainable choices.',
    },
    {
      icon: Award,
      title: 'Gamified Experience',
      description: 'Earn points, complete challenges, and track your progress in an engaging way.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'Your data stays on your device. We never sell or share your personal information.',
    },
  ];

  const values = [
    {
      icon: Target,
      title: 'Precision',
      description: 'We use scientifically-backed emission factors for accurate calculations.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a global community of eco-conscious individuals.',
    },
    {
      icon: Globe,
      title: 'Impact',
      description: 'Every feature is designed to maximize positive environmental impact.',
    },
    {
      icon: Heart,
      title: 'Accessibility',
      description: 'Making sustainability tools available to everyone, everywhere.',
    },
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 mb-8">
            <Leaf className="h-10 w-10 text-white" />
          </div>
          <h1 className={`text-4xl sm:text-5xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            About EcoTrack AI
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Empowering individuals to understand and reduce their environmental impact through technology,
            awareness, and sustainable actions.
          </p>
        </div>

        {/* Mission Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 sm:p-12 shadow-sm mb-8`}>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center ${
                darkMode ? 'bg-green-500/20' : 'bg-green-50'
              }`}>
                <Target className="h-12 w-12 text-green-500" />
              </div>
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Mission
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We believe that individual actions, when multiplied across millions of people, can create
                meaningful environmental change. Our mission is to provide accessible, intelligent tools
                that help everyone understand their carbon footprint and take actionable steps toward a
                more sustainable future.
              </p>
            </div>
          </div>
        </div>

        {/* Vision Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 sm:p-12 shadow-sm mb-8`}>
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="flex-shrink-0">
              <div className={`w-24 h-24 rounded-2xl flex items-center justify-center ${
                darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
              }`}>
                <Eye className="h-12 w-12 text-blue-500" />
              </div>
            </div>
            <div>
              <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Our Vision
              </h2>
              <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                To create a future where every individual can make informed environmental decisions through
                accessible sustainability tools. We envision a world where tracking and reducing one's
                carbon footprint becomes as natural as checking the weather, and where collective action
                leads to measurable environmental improvement.
              </p>
            </div>
          </div>
        </div>

        {/* Why EcoTrack AI */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Why EcoTrack AI?
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We combine cutting-edge technology with environmental science to deliver a platform that makes
            sustainability accessible to everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${
                darkMode ? 'bg-green-500/20' : 'bg-green-50'
              }`}>
                <feature.icon className="h-6 w-6 text-green-500" />
              </div>
              <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {feature.title}
              </h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Features */}
        <div className={`${darkMode ? 'bg-gradient-to-r from-gray-800 to-gray-700' : 'bg-gradient-to-r from-green-500 to-emerald-500'} rounded-3xl p-8 sm:p-12 mb-8`}>
          <h2 className="text-2xl font-bold mb-8 text-center text-white">Key Features</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <TreePine className="h-10 w-10 mx-auto mb-4 text-white opacity-90" />
              <h3 className="font-semibold text-white mb-2">Carbon Tracking</h3>
              <p className="text-sm text-white/80">
                Comprehensive calculation across all emission sources
              </p>
            </div>
            <div className="text-center">
              <Sparkles className="h-10 w-10 mx-auto mb-4 text-white opacity-90" />
              <h3 className="font-semibold text-white mb-2">AI Coach</h3>
              <p className="text-sm text-white/80">
                Personalized recommendations for sustainable living
              </p>
            </div>
            <div className="text-center">
              <Award className="h-10 w-10 mx-auto mb-4 text-white opacity-90" />
              <h3 className="font-semibold text-white mb-2">Challenges</h3>
              <p className="text-sm text-white/80">
                Gamified eco challenges with rewards
              </p>
            </div>
            <div className="text-center">
              <Recycle className="h-10 w-10 mx-auto mb-4 text-white opacity-90" />
              <h3 className="font-semibold text-white mb-2">Learning Center</h3>
              <p className="text-sm text-white/80">
                Educational content on sustainability
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Commitment */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 sm:p-12 shadow-sm mb-8`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Our Sustainability Commitment
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            At EcoTrack AI, we practice what we preach. Our commitment to sustainability extends beyond our product:
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Privacy-Focused Design</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All data stored locally on your device
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Open Knowledge</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Educational resources freely available
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Science-Based</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Calculations backed by scientific research
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>No Account Required</p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Start tracking immediately without signup
              </p>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid md:grid-cols-4 gap-4 mb-12">
          {values.map((value, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 shadow-sm text-center`}
            >
              <value.icon className={`h-8 w-8 mx-auto mb-4 text-green-500`} />
              <h3 className={`font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {value.title}
              </h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Creator Section */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-3xl p-8 shadow-sm text-center`}>
          <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Created by Riya Antil
          </h2>
          <p className={`text-lg mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            EcoTrack AI was created with the vision of making sustainability tracking accessible to everyone.
            Built with passion for the environment and a commitment to helping individuals make a positive impact.
          </p>
          <div className="flex items-center justify-center space-x-1 text-sm">
            <Heart className="h-4 w-4 text-red-500" />
            <span className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              Made with love for our planet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
