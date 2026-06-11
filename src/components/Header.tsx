import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../App';
import {
  Leaf,
  Menu,
  X,
  Sun,
  Moon,
  Calculator,
  MessageCircle,
  BarChart3,
  Target,
  BookOpen,
  Settings,
  FileText,
} from 'lucide-react';

export default function Header() {
  const { darkMode, toggleDarkMode } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/calculator', label: 'Calculator' },
    { path: '/ai-coach', label: 'AI Coach' },
    { path: '/challenges', label: 'Challenges' },
    { path: '/learning', label: 'Learning' },
    { path: '/docs', label: 'Docs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-lg ${
        darkMode
          ? 'bg-gray-900/90 border-gray-800'
          : 'bg-white/90 border-gray-200'
      } border-b transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-2 focus:ring-green-500 rounded-lg p-1"
            aria-label="EcoTrack AI Home"
          >
            <div className="relative">
              <Leaf className="h-8 w-8 text-green-500 transition-transform group-hover:rotate-12" />
              <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
            </div>
            <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              EcoTrack <span className="text-green-500">AI</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  isActive(link.path)
                    ? 'bg-green-500 text-white shadow-lg shadow-green-500/25'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Settings Link */}
            <Link
              to="/settings"
              className={`hidden sm:flex p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
              }`}
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                darkMode
                  ? 'bg-gray-800 text-white hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            className={`lg:hidden py-4 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-green-500 text-white'
                      : darkMode
                      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {link.label === 'Home' && <Leaf className="h-4 w-4" />}
                  {link.label === 'Dashboard' && <BarChart3 className="h-4 w-4" />}
                  {link.label === 'Calculator' && <Calculator className="h-4 w-4" />}
                  {link.label === 'AI Coach' && <MessageCircle className="h-4 w-4" />}
                  {link.label === 'Challenges' && <Target className="h-4 w-4" />}
                  {link.label === 'Learning' && <BookOpen className="h-4 w-4" />}
                  {link.label === 'Docs' && <FileText className="h-4 w-4" />}
                  <span>{link.label}</span>
                </Link>
              ))}
              <Link
                to="/settings"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium ${
                  darkMode
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
