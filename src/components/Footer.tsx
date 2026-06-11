import { Link } from 'react-router-dom';
import { useTheme } from '../App';
import { Leaf, Mail } from 'lucide-react';

export default function Footer() {
  const { darkMode } = useTheme();

  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Calculator', path: '/calculator' },
        { label: 'EcoBot AI', path: '/ecobot' },
        { label: 'Challenges', path: '/challenges' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Learning Center', path: '/learning' },
        { label: 'Carbon Scanner', path: '/carbon-scanner' },
        { label: 'Resource Hub', path: '/resources' },
        { label: 'Methodology', path: '/methodology' },
      ],
    },
    {
      title: 'Progress',
      links: [
        { label: 'Goals', path: '/goals' },
        { label: 'Achievements', path: '/achievements' },
        { label: 'Roadmap', path: '/roadmap' },
        { label: 'Analytics', path: '/analytics' },
      ],
    },
    {
      title: 'Reports',
      links: [
        { label: 'Weekly Report', path: '/weekly-report' },
        { label: 'Community Impact', path: '/community-impact' },
        { label: 'Carbon Tracker', path: '/carbon-tracker' },
        { label: 'Admin Dashboard', path: '/admin' },
      ],
    },
    {
      title: 'Quality',
      links: [
        { label: 'Testing Suite', path: '/testing' },
        { label: 'Documentation', path: '/docs' },
        { label: 'Audit Report', path: '/audit-report' },
        { label: 'Accessibility', path: '/accessibility' },
      ],
    },
    {
      title: 'Standards',
      links: [
        { label: 'Security', path: '/security' },
        { label: 'Performance', path: '/performance' },
        { label: 'Methodology', path: '/methodology' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' },
        { label: 'FAQ', path: '/faq' },
        { label: 'Privacy Policy', path: '/privacy' },
      ],
    },
  ];

  return (
    <footer
      className={`${
        darkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'
      } border-t transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-green-500" />
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                EcoTrack <span className="text-green-500">AI</span>
              </span>
            </Link>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Empowering individuals to understand and reduce their environmental impact through technology and sustainable actions.
            </p>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`text-sm transition-colors duration-200 ${
                        darkMode
                          ? 'text-gray-400 hover:text-green-400'
                          : 'text-gray-600 hover:text-green-600'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Info */}
        <div
          className={`py-6 border-t ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className={`flex items-center space-x-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <Mail className="h-4 w-4 text-green-500" />
              <a
                href="mailto:riyasinghantil@gmail.com"
                className="text-sm hover:text-green-500 transition-colors"
              >
                riyasinghantil@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div
          className={`py-6 border-t text-center ${
            darkMode ? 'border-gray-800' : 'border-gray-200'
          }`}
        >
          <p className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
            EcoTrack AI © 2026. Building a greener future through technology.
          </p>
          <p className={`text-xs mt-2 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}>
            Created by Riya Antil
          </p>
        </div>
      </div>
    </footer>
  );
}
