import { Eye, Keyboard, Type, Palette, AudioLines, MousePointer, ScreenShare, CheckCircle, AlertTriangle, ExternalLink } from 'lucide-react';
import { useTheme } from '../App';
import { Link } from 'react-router-dom';

export default function AccessibilityPage() {
  const { darkMode } = useTheme();

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const standards = [
    {
      principle: 'Perceivable',
      icon: Eye,
      description: 'Information and user interface components must be presentable to users in ways they can perceive.',
      practices: [
        { item: 'All images have meaningful alt text or are marked decorative', status: true },
        { item: 'Color is not the sole means of conveying information', status: true },
        { item: 'Text contrast meets WCAG 2.1 AA (4.5:1 minimum)', status: true },
        { item: 'Charts include text-based data alternatives', status: true },
        { item: 'Videos and animations have text alternatives', status: true },
      ],
    },
    {
      principle: 'Operable',
      icon: Keyboard,
      description: 'User interface components and navigation must be operable by all users.',
      practices: [
        { item: 'All interactive elements accessible via keyboard', status: true },
        { item: 'Focus indicators visible on all focusable elements', status: true },
        { item: 'No keyboard traps exist in modals or forms', status: true },
        { item: 'Touch targets minimum 44x44px on mobile', status: true },
        { item: 'Skip navigation link available', status: false },
      ],
    },
    {
      principle: 'Understandable',
      icon: Type,
      description: 'Information and operation of the user interface must be understandable.',
      practices: [
        { item: 'All form fields have explicit labels', status: true },
        { item: 'Error messages describe what went wrong', status: true },
        { item: 'Language attribute set on HTML element', status: true },
        { item: 'Consistent navigation across pages', status: true },
        { item: 'Instructions provided before complex interactions', status: true },
      ],
    },
    {
      principle: 'Robust',
      icon: ScreenShare,
      description: 'Content must be robust enough that it can be interpreted by a wide variety of user agents.',
      practices: [
        { item: 'Valid semantic HTML5 structure', status: true },
        { item: 'ARIA used only when native semantics insufficient', status: true },
        { item: 'Unique IDs for all landmark regions', status: true },
        { item: 'Error boundaries prevent broken DOM', status: true },
        { item: 'Screen reader tested with VoiceOver and NVDA', status: true },
      ],
    },
  ];

  const features = [
    {
      icon: Keyboard,
      title: 'Full Keyboard Navigation',
      description: 'Navigate every page using Tab, Enter, Escape, and arrow keys without requiring a mouse.',
    },
    {
      icon: Palette,
      title: 'High Contrast Mode',
      description: 'Dark mode provides enhanced contrast for users with low vision or light sensitivity.',
    },
    {
      icon: AudioLines,
      title: 'Screen Reader Compatible',
      description: 'Tested with VoiceOver, NVDA, and JAWS screen readers for complete functionality.',
    },
    {
      icon: MousePointer,
      title: 'Visible Focus States',
      description: 'All interactive elements display clear focus indicators for keyboard users.',
    },
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-500/20 mb-4">
            <Eye className="h-8 w-8 text-purple-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Accessibility Statement</h1>
          <p className={`text-lg ${muted}`}>Our commitment to inclusive design for all users</p>
        </div>

        {/* Commitment */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`font-semibold ${text} mb-3`}>Our Commitment</h2>
          <p className={`${muted} leading-relaxed`}>
            EcoTrack AI is committed to ensuring digital accessibility for people with disabilities.
            We are continually improving the user experience for everyone and applying the relevant
            accessibility standards. Our goal is to meet <strong className={text}>WCAG 2.1 Level AA</strong> compliance
            and provide an inclusive experience for all users regardless of ability.
          </p>
        </div>

        {/* Accessibility Features */}
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {features.map(feature => (
            <div key={feature.title} className={`${card} rounded-xl p-5 border`}>
              <feature.icon className={`h-6 w-6 text-purple-500 mb-3`} />
              <h3 className={`font-semibold ${text} mb-1`}>{feature.title}</h3>
              <p className={`text-sm ${muted}`}>{feature.description}</p>
            </div>
          ))}
        </div>

        {/* WCAG Standards */}
        <div className="space-y-6 mb-8">
          {standards.map(standard => (
            <div key={standard.principle} className={`${card} rounded-2xl border overflow-hidden`}>
              <div className={`p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  <standard.icon className={`h-5 w-5 text-purple-500`} />
                </div>
                <div>
                  <h2 className={`font-semibold ${text}`}>{standard.principle}</h2>
                  <p className={`text-xs ${muted}`}>{standard.description}</p>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-3">
                  {standard.practices.map(practice => (
                    <li key={practice.item} className={`flex items-start gap-3`}>
                      {practice.status ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${muted}`}>{practice.item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Technical Details */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`font-semibold ${text} mb-4`}>Accessibility Technical Details</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm font-medium ${text} mb-2`}>Semantic Structure</h3>
              <ul className={`text-sm ${muted} space-y-1`}>
                <li>Proper heading hierarchy (h1-h6)</li>
                <li>Landmark regions (main, nav, header, footer)</li>
                <li>List structures for navigation and content</li>
                <li>Form control association with labels</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-sm font-medium ${text} mb-2`}>Assistive Technology Support</h3>
              <ul className={`text-sm ${muted} space-y-1`}>
                <li>Apple VoiceOver (Safari, iOS, macOS)</li>
                <li>NVDA (Firefox, Chrome on Windows)</li>
                <li>JAWS (Chrome, Edge on Windows)</li>
                <li>TalkBack (Android Chrome)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Feedback */}
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-purple-500/10 border-purple-500/20' : 'bg-purple-50 border-purple-100'} border`}>
          <h2 className={`font-semibold ${text} mb-3`}>Help Us Improve</h2>
          <p className={`text-sm ${muted} mb-4`}>
            We welcome feedback on the accessibility of EcoTrack AI. If you encounter any barriers or
            have suggestions for improvement, please contact us.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 transition-colors"
          >
            Contact Us
            <ExternalLink className="h-3 w-3" />
          </Link>
        </div>

        {/* Last Updated */}
        <div className={`mt-6 text-center text-xs ${muted}`}>
          Last updated: June 2026. Next review: December 2026.
        </div>
      </div>
    </div>
  );
}
