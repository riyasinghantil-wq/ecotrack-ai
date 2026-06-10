import { useState } from 'react';
import { useTheme } from '../App';
import {
  HelpCircle,
  ChevronDown,
  Leaf,
  Calculator,
  Shield,
  Lightbulb,
  Target,
  Award,
  TrendingUp,
  BarChart3,
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  icon: typeof Leaf;
}

export default function FAQPage() {
  const { darkMode } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'What is a carbon footprint?',
      answer: 'A carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide) released into the atmosphere as a result of your daily activities. This includes emissions from transportation, energy consumption, food choices, and waste generation. Understanding your carbon footprint is the first step toward reducing your environmental impact.',
      icon: Leaf,
    },
    {
      question: 'How are emissions calculated?',
      answer: 'Our calculations are based on scientifically-recognized emission factors from sources like the EPA, IPCC, and environmental research institutions. We consider factors such as fuel type, vehicle efficiency, energy grid carbon intensity, and food production methods. The calculations are approximations and may vary based on your specific circumstances.',
      icon: Calculator,
    },
    {
      question: 'Is my data secure?',
      answer: 'Absolutely. All your data is stored locally in your browser storage. We never transmit your personal information to external servers. You have complete control over your data and can delete it at any time through the Settings page. We do not use cookies for tracking or sell any user data.',
      icon: Shield,
    },
    {
      question: 'Are the calculations accurate?',
      answer: 'Our calculations are based on average emission factors and provide a good estimate of your carbon footprint. However, actual emissions can vary based on factors like vehicle condition, local energy sources, and specific food production methods. For precise measurements, consider specialized audits and direct measurements.',
      icon: BarChart3,
    },
    {
      question: 'How can I reduce my carbon footprint?',
      answer: 'Start with small changes: use public transport, reduce energy consumption, eat more plant-based meals, and minimize waste. Our AI Coach provides personalized recommendations based on your lifestyle. Complete eco challenges to gradually build sustainable habits and track your progress over time.',
      icon: Lightbulb,
    },
    {
      question: 'What are eco challenges?',
      answer: 'Eco challenges are gamified sustainability tasks that help you develop greener habits. Each challenge has a specific environmental goal (like using public transport or reducing electricity usage). Complete challenges to earn eco points, unlock achievements, and climb the leaderboard while making a real environmental difference.',
      icon: Target,
    },
    {
      question: 'How does the sustainability score work?',
      answer: 'Your sustainability score (0-100) reflects your daily carbon emissions compared to sustainable targets. A higher score means lower emissions. The rating system considers factors like transportation, energy use, diet, and waste. Track your progress and watch your score improve as you adopt sustainable practices.',
      icon: Award,
    },
    {
      question: 'Can I track my progress over time?',
      answer: 'Yes! The Dashboard displays your progress with charts and visualizations. Track daily, weekly, and monthly emissions, see your trend lines, and celebrate achievements. Use the Carbon Savings Tracker to see how much CO₂ you\'ve prevented from entering the atmosphere.',
      icon: TrendingUp,
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <HelpCircle className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Frequently Asked Questions
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Find answers to common questions about EcoTrack AI and sustainability.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl shadow-sm overflow-hidden transition-all duration-300 ${
                openIndex === index ? 'ring-2 ring-green-500/20' : ''
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-inset"
                aria-expanded={openIndex === index}
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                    <faq.icon className="h-5 w-5 text-green-500" />
                  </div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`h-5 w-5 ${
                    darkMode ? 'text-gray-400' : 'text-gray-500'
                  } transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className={`px-6 pb-5 ${openIndex === index ? 'block' : 'hidden'}`}>
                  <div className={`pl-14 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className={`mt-12 text-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-sm`}>
          <h2 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Still have questions?
          </h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            We're here to help you on your sustainability journey.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
