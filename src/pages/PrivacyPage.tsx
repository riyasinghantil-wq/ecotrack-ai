import { useTheme } from '../App';
import { Shield, Database, Lock, UserCheck, Trash2, Eye, FileText } from 'lucide-react';

export default function PrivacyPage() {
  const { darkMode } = useTheme();

  const sections = [
    {
      icon: Database,
      title: 'Data Storage',
      content: 'All user data is stored locally in your browser\'s storage. We do not collect, transmit, or store your personal information on external servers. Your carbon footprint data, settings, and progress remain entirely on your device.',
    },
    {
      icon: Lock,
      title: 'Information We Do Not Collect',
      content: 'EcoTrack AI does not collect sensitive personal information such as your name, email address, phone number, or financial details. We do not track your location or access your contacts.',
    },
    {
      icon: Eye,
      title: 'How We Use Your Data',
      content: 'Carbon footprint calculations are performed locally and used only to provide you with personalized insights and recommendations. This data is never shared with third parties or used for advertising purposes.',
    },
    {
      icon: UserCheck,
      title: 'Your Control',
      content: 'You have complete control over your data. You can view, export, or delete your data at any time through the Settings page. There are no accounts to delete or subscriptions to cancel.',
    },
    {
      icon: Trash2,
      title: 'Data Deletion',
      content: 'You can reset and delete all your data at any time by using the "Reset All Data" option in Settings. This will permanently remove all stored information from your device.',
    },
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 mb-6">
            <Shield className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Privacy Policy
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Your privacy is our priority. Learn how EcoTrack AI protects and handles your data.
          </p>
        </div>

        {/* Last Updated */}
        <div className={`text-center mb-8 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
          Last updated: June 2026
        </div>

        {/* Introduction */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 sm:p-8 shadow-sm mb-8`}>
          <div className="flex items-start space-x-4">
            <FileText className={`h-6 w-6 mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div>
              <h2 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Introduction
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                EcoTrack AI is designed with privacy as a core principle. We believe that sustainability
                tools should respect your privacy while helping you make a positive impact on the environment.
                This policy explains how we handle your data transparently and responsibly.
              </p>
            </div>
          </div>
        </div>

        {/* Privacy Sections */}
        <div className="space-y-4">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}
            >
              <div className="flex items-start space-x-4">
                <div className={`flex-shrink-0 p-2 rounded-lg ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <section.icon className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h3>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    {section.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 sm:p-8 shadow-sm mt-8`}>
          <h2 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Technical Details
          </h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Local Storage
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                All data is stored in your browser's localStorage API.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No Cookies
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We only use essential storage for user preferences (dark mode, data).
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No Analytics
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                We do not use third-party analytics or tracking scripts.
              </p>
            </div>
            <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                No Account Required
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Start using EcoTrack AI immediately without creating an account.
              </p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className={`${darkMode ? 'bg-green-500/10' : 'bg-green-50'} rounded-2xl p-6 mt-8`}>
          <p className={`text-center ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Questions about our privacy practices?{' '}
            <a
              href="/contact"
              className="text-green-500 font-medium hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
