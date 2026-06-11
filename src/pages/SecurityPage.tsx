import { Shield, Lock, Eye, Database, AlertTriangle, CheckCircle, Code, Server, Key, FileCode } from 'lucide-react';
import { useTheme } from '../App';

export default function SecurityPage() {
  const { darkMode } = useTheme();

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const securityMeasures = [
    {
      category: 'Input Validation',
      icon: FileCode,
      description: 'All user inputs are validated before processing to prevent injection and malformed data.',
      measures: [
        'Numeric fields accept only valid numbers within defined ranges',
        'String inputs sanitized to prevent XSS attacks',
        'Empty and whitespace submissions rejected with clear errors',
        'Negative values and overflow inputs caught with range validation',
        'Form state reset on successful submission',
      ],
    },
    {
      category: 'Data Handling',
      icon: Database,
      description: 'User data is handled with care and follows best practices for client-side storage.',
      measures: [
        'localStorage reads wrapped in try/catch with safe fallbacks',
        'No PII collected, transmitted, or stored on external servers',
        'Environment variables never exposed in client bundle',
        'Data serialization validated before parsing',
        'Backwards-compatible data migrations for schema changes',
      ],
    },
    {
      category: 'Client-Side Protection',
      icon: Lock,
      description: 'Application is hardened against common web vulnerabilities.',
      measures: [
        'React Error Boundaries prevent full app crashes',
        'TypeScript strict mode eliminates type confusion bugs',
        'All form state reset on unmount or navigation',
        'No eval() or dangerouslySetInnerHTML usage',
        'Content Security Policy ready for deployment',
      ],
    },
    {
      category: 'Dependency Security',
      icon: Code,
      description: 'Third-party dependencies are carefully managed and audited.',
      measures: [
        'All dependencies pinned to known-safe minor versions',
        'No unmaintained packages in dependency tree',
        'Regular npm audit for vulnerability scanning',
        'Lucide-react and Recharts have zero known vulnerabilities',
        'Minimal dependency footprint reduces attack surface',
      ],
    },
  ];

  const practices = [
    { title: 'No Hardcoded Secrets', description: 'API keys, passwords, and tokens are never in source code' },
    { title: 'HTTPS Only', description: 'All production traffic encrypted via HTTPS' },
    { title: 'Secure Authentication', description: 'Auth handled by Supabase with industry-standard protocols' },
    { title: 'Regular Audits', description: 'Dependencies scanned for vulnerabilities on every build' },
    { title: 'Error Boundaries', description: 'Graceful degradation prevents information disclosure' },
    { title: 'Minimal Data Collection', description: 'Only necessary data stored, all client-side by default' },
  ];

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-500/20 mb-4">
            <Shield className="h-8 w-8 text-red-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Security Practices</h1>
          <p className={`text-lg ${muted}`}>How we protect your data and ensure application integrity</p>
        </div>

        {/* Overview */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-1" />
            <div>
              <h2 className={`font-semibold ${text} mb-2`}>Security-First Design</h2>
              <p className={`${muted} leading-relaxed`}>
                EcoTrack AI is built with security as a foundational principle, not an afterthought.
                All user data remains on the client device by default, and the application follows
                OWASP guidelines for client-side security. No data is transmitted to external servers
                without explicit user action.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Practices */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {practices.map(practice => (
            <div key={practice.title} className={`${card} rounded-xl p-4 border`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className={`font-medium text-sm ${text}`}>{practice.title}</span>
              </div>
              <p className={`text-xs ${muted}`}>{practice.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Measures */}
        <div className="space-y-6 mb-8">
          {securityMeasures.map(measure => (
            <div key={measure.category} className={`${card} rounded-2xl border overflow-hidden`}>
              <div className={`p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'} flex items-center gap-3`}>
                <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  <measure.icon className={`h-5 w-5 text-red-500`} />
                </div>
                <div>
                  <h2 className={`font-semibold ${text}`}>{measure.category}</h2>
                  <p className={`text-xs ${muted}`}>{measure.description}</p>
                </div>
              </div>
              <div className="p-5">
                <ul className="space-y-2">
                  {measure.measures.map(item => (
                    <li key={item} className={`flex gap-2 text-sm ${muted}`}>
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture */}
        <div className={`${card} rounded-2xl p-6 border mb-8`}>
          <h2 className={`font-semibold ${text} mb-4`}>Architecture Security</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className={`text-sm font-medium ${text} mb-2 flex items-center gap-2`}>
                <Server className="h-4 w-4 text-blue-500" />
                Client-Side First
              </h3>
              <p className={`text-xs ${muted}`}>
                All calculations and data storage happen client-side by default. No data is sent to
                servers unless the user explicitly enables cloud sync features.
              </p>
            </div>
            <div>
              <h3 className={`text-sm font-medium ${text} mb-2 flex items-center gap-2`}>
                <Key className="h-4 w-4 text-green-500" />
                Authentication Ready
              </h3>
              <p className={`text-xs ${muted}`}>
                When cloud features are enabled, authentication is handled by Supabase Auth with
                industry-standard OAuth 2.0 and JWT tokens.
              </p>
            </div>
          </div>
        </div>

        {/* Reporting */}
        <div className={`p-6 rounded-2xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border`}>
          <h2 className={`font-semibold ${text} mb-3`}>Report Security Issues</h2>
          <p className={`text-sm ${muted} mb-4`}>
            If you discover a security vulnerability in EcoTrack AI, please report it responsibly.
            We appreciate the security research community and will respond promptly.
          </p>
          <div className={`text-sm ${muted}`}>
            <strong className={text}>Contact:</strong> riyasinghantil@gmail.com
          </div>
        </div>
      </div>
    </div>
  );
}
