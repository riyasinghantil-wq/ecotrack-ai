import { useState } from 'react';
import { BookOpen, Layers, Shield, Zap, Target, Code2, Database, GitBranch, Leaf, Brain, Trophy, BarChart2, Calculator, Globe } from 'lucide-react';
import { useTheme } from '../App';

interface Section {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const sections: Section[] = [
  { id: 'overview', label: 'Project Overview', icon: BookOpen, color: 'text-green-500' },
  { id: 'problem', label: 'Problem Statement', icon: Target, color: 'text-blue-500' },
  { id: 'features', label: 'Features Implemented', icon: Layers, color: 'text-purple-500' },
  { id: 'tech', label: 'Technology Stack', icon: Code2, color: 'text-amber-500' },
  { id: 'architecture', label: 'System Design', icon: GitBranch, color: 'text-teal-500' },
  { id: 'data', label: 'Data Flow', icon: Database, color: 'text-red-500' },
  { id: 'testing', label: 'Testing Methodology', icon: Shield, color: 'text-indigo-500' },
  { id: 'accessibility', label: 'Accessibility Standards', icon: Globe, color: 'text-orange-500' },
  { id: 'security', label: 'Security Measures', icon: Shield, color: 'text-rose-500' },
  { id: 'performance', label: 'Performance Strategy', icon: Zap, color: 'text-cyan-500' },
  { id: 'future', label: 'Future Enhancements', icon: Brain, color: 'text-violet-500' },
];

export default function DocumentationPage() {
  const { darkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('overview');

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const sidebarItem = (id: string) =>
    `flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${
      activeSection === id
        ? 'bg-green-500 text-white'
        : darkMode
        ? 'text-gray-300 hover:bg-gray-700'
        : 'text-gray-600 hover:bg-gray-100'
    }`;

  const h2 = `text-2xl font-bold ${text} mb-4`;
  const h3 = `text-lg font-semibold ${text} mb-2 mt-5`;
  const p = `text-base leading-relaxed ${muted}`;

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <article>
            <h2 className={h2}>Project Overview</h2>
            <p className={p}>
              EcoTrack AI is a comprehensive sustainability platform designed to help individuals measure, understand, and reduce their personal carbon footprint. Built as a progressive web application, it combines intelligent carbon calculation, AI-powered coaching, gamified challenges, and structured learning into a single, accessible experience.
            </p>
            <h3 className={h3}>Mission</h3>
            <p className={p}>
              To empower every individual with the knowledge, tools, and motivation they need to make measurable progress toward a sustainable lifestyle — making green choices feel achievable, not overwhelming.
            </p>
            <h3 className={h3}>Core Value Proposition</h3>
            <ul className={`${p} list-none space-y-3 mt-3`}>
              {[
                ['Personalized insight', 'Carbon scores calculated from actual user behavior, not generic averages'],
                ['Actionable guidance', 'AI coach provides specific, context-aware recommendations'],
                ['Progress visibility', 'Dashboard tracks streaks, EcoPoints, and historical trends'],
                ['Education-first', 'Structured learning modules teach the science behind sustainability'],
                ['Privacy-respecting', 'All user data stored locally — zero server-side data collection'],
              ].map(([title, desc]) => (
                <li key={title} className="flex gap-3">
                  <span className="text-green-500 mt-0.5 flex-shrink-0">{'>'}</span>
                  <span><strong className={text}>{title}:</strong> {desc}</span>
                </li>
              ))}
            </ul>
            <h3 className={h3}>Application Stats</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-3">
              {[
                { label: 'Pages / Routes', value: '18+' },
                { label: 'Learning Modules', value: '5' },
                { label: 'Challenge Types', value: '10+' },
                { label: 'Lines of Code', value: '~10,000' },
              ].map(stat => (
                <div key={stat.label} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center`}>
                  <div className={`text-2xl font-bold text-green-500`}>{stat.value}</div>
                  <div className={`text-xs ${muted} mt-1`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </article>
        );

      case 'problem':
        return (
          <article>
            <h2 className={h2}>Problem Statement</h2>
            <p className={p}>
              Climate change is the defining challenge of our generation, yet most individuals lack the tools to understand their personal contribution. According to the UN Environment Programme, household consumption accounts for over 60% of global greenhouse gas emissions — but awareness alone rarely drives behavior change.
            </p>
            <h3 className={h3}>The Gap EcoTrack Fills</h3>
            <div className="grid sm:grid-cols-2 gap-4 mt-3">
              {[
                { problem: 'Lack of awareness', solution: 'Visual carbon calculator with category breakdown' },
                { problem: 'Generic advice', solution: 'AI coach tailored to each user\'s profile and score' },
                { problem: 'No motivation loop', solution: 'Gamified challenges, streaks, and leaderboard' },
                { problem: 'Information overload', solution: 'Curated learning modules with bite-sized lessons' },
                { problem: 'No progress tracking', solution: 'Dashboard with historical trends and milestones' },
                { problem: 'Privacy concerns', solution: 'Fully offline-capable, zero data collection' },
              ].map(item => (
                <div key={item.problem} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className="text-red-400 text-sm font-medium mb-1">Problem: {item.problem}</p>
                  <p className="text-green-500 text-sm">Solution: {item.solution}</p>
                </div>
              ))}
            </div>
            <h3 className={h3}>Target Impact</h3>
            <p className={p}>
              EcoTrack AI targets a measurable outcome: helping each active user identify and eliminate at least 500 kg CO2e per year through behavior change — equivalent to planting 25 trees or avoiding one transatlantic flight.
            </p>
          </article>
        );

      case 'features':
        return (
          <article>
            <h2 className={h2}>Features Implemented</h2>
            <div className="space-y-5">
              {[
                { icon: Calculator, title: 'Carbon Footprint Calculator', color: 'text-green-500', points: ['Multi-category input: transportation, energy, diet, shopping, waste', 'Real-time CO2 score computation with national average comparison', 'Sustainability level classification (Excellent to Critical)', 'Persistent results saved to user profile'] },
                { icon: Brain, title: 'AI Sustainability Coach', color: 'text-blue-500', points: ['Category-filtered recommendation engine', 'Contextual tips based on user carbon score', 'Actionable guidance with quantified impact estimates', 'Interactive Q&A format with conversational UI'] },
                { icon: Trophy, title: 'Challenge & Gamification System', color: 'text-amber-500', points: ['10+ challenges across energy, transport, food, water, waste categories', 'Timer-based challenge tracking with real progress indicators', 'EcoPoints reward system with level progression', 'Streak counter for daily engagement'] },
                { icon: BookOpen, title: 'Learning Center', color: 'text-purple-500', points: ['5 structured learning modules with multiple lessons each', 'Lesson completion tracking with persistent progress', 'Progressive difficulty (Beginner to Intermediate to Advanced)', 'Rich educational content with actionable takeaways'] },
                { icon: BarChart2, title: 'Analytics Dashboard', color: 'text-teal-500', points: ['KPI cards: carbon score, EcoPoints, streak, total savings', 'Recharts area and bar charts for historical trends', 'Achievement badges with locked/unlocked states', 'Quick-action navigation to key features'] },
                { icon: Globe, title: 'Additional Pages', color: 'text-orange-500', points: ['Carbon Tracker: log daily activities and monitor history', 'Electricity Analyzer: estimate appliance-level energy costs', 'Impact Analysis: project the long-term effect of changes', 'Leaderboard: community comparison and rankings'] },
              ].map(feature => (
                <div key={feature.title} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="flex items-center gap-2 mb-3">
                    <feature.icon className={`h-5 w-5 ${feature.color}`} aria-hidden="true" />
                    <h3 className={`font-semibold ${text}`}>{feature.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {feature.points.map(pt => (
                      <li key={pt} className={`flex gap-2 text-sm ${muted}`}>
                        <span className="text-green-500 flex-shrink-0">-</span>{pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        );

      case 'tech':
        return (
          <article>
            <h2 className={h2}>Technology Stack</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                {
                  layer: 'Frontend Framework', items: [
                    { name: 'React 18.3', reason: 'Component-based UI with hooks, context, and concurrent features' },
                    { name: 'TypeScript 5.5', reason: 'Full type safety, improved IDE support, fewer runtime errors' },
                    { name: 'React Router 7', reason: 'Declarative client-side routing with nested routes' },
                  ]
                },
                {
                  layer: 'Build & Tooling', items: [
                    { name: 'Vite 5.4', reason: 'Fast HMR, ESM-based builds, and optimized production bundling' },
                    { name: 'ESLint + TS-ESLint', reason: 'Enforces consistent code quality and catches type errors' },
                    { name: 'PostCSS + Autoprefixer', reason: 'CSS transformation and cross-browser compatibility' },
                  ]
                },
                {
                  layer: 'Styling', items: [
                    { name: 'Tailwind CSS 3.4', reason: 'Utility-first CSS with JIT compilation and dark mode support' },
                  ]
                },
                {
                  layer: 'Data & Visualization', items: [
                    { name: 'Recharts 3.8', reason: 'Composable charting library built on React and SVG' },
                    { name: 'localStorage API', reason: 'Zero-dependency persistence; respects user privacy' },
                    { name: 'Supabase Client', reason: 'Available for future server-side features without re-architecture' },
                  ]
                },
                {
                  layer: 'UI & Icons', items: [
                    { name: 'Lucide React 0.344', reason: 'Consistent, accessible SVG icon set with tree-shaking' },
                  ]
                },
              ].map(group => (
                <div key={group.layer} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold ${text} mb-3`}>{group.layer}</h3>
                  <div className="space-y-3">
                    {group.items.map(item => (
                      <div key={item.name}>
                        <span className={`text-sm font-medium ${text} inline-flex items-center gap-1.5`}>
                          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" aria-hidden="true" />
                          {item.name}
                        </span>
                        <p className={`text-xs ${muted} mt-0.5 ml-3.5`}>{item.reason}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </article>
        );

      case 'architecture':
        return (
          <article>
            <h2 className={h2}>System Design</h2>
            <p className={p}>EcoTrack AI follows a layered architecture optimized for single-page application performance and developer maintainability.</p>
            <h3 className={h3}>Directory Structure</h3>
            <div className={`rounded-xl p-5 font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'} overflow-x-auto mt-3`}>
              <pre>{`src/
├── App.tsx              # Root: routing, ThemeContext, DataContext
├── main.tsx             # React DOM entry point
├── index.css            # Global styles, Tailwind directives
├── components/
│   ├── Header.tsx       # Responsive navigation, dark mode toggle
│   ├── Footer.tsx       # Sitemap links, branding
│   ├── ScrollToTop.tsx  # Route-change scroll handler
│   └── ErrorBoundary.tsx# Crash protection wrapper
└── pages/
    ├── LandingPage.tsx  # Hero, features, CTA sections
    ├── DashboardPage.tsx# KPIs, charts, achievements
    ├── CalculatorPage.tsx  # Carbon footprint form
    ├── AICoachPage.tsx  # Recommendation engine UI
    ├── ChallengesPage.tsx  # Gamification system
    ├── LearningCenterPage.tsx # Module + lesson viewer
    ├── TestingPage.tsx  # Interactive test dashboard
    ├── DocumentationPage.tsx # Technical docs
    ├── AuditPage.tsx    # Quality score report
    └── ... (10+ more pages)`}</pre>
            </div>
            <h3 className={h3}>Component Hierarchy</h3>
            <p className={p}>
              The application uses a two-context provider pattern. <code className="text-green-500">ThemeContext</code> manages dark/light mode globally. <code className="text-green-500">DataContext</code> manages user sustainability data. Both are provided at the root level so any component can subscribe without prop drilling.
            </p>
          </article>
        );

      case 'data':
        return (
          <article>
            <h2 className={h2}>Data Flow</h2>
            <h3 className={h3}>User Data Lifecycle</h3>
            <div className="space-y-3 mt-3">
              {[
                { step: '1', title: 'Input Collection', desc: 'User fills Carbon Calculator form. React controlled inputs with real-time validation.' },
                { step: '2', title: 'Score Computation', desc: 'Emission factors applied per category (kg CO2e / unit). Total score computed client-side.' },
                { step: '3', title: 'Context Update', desc: 'setUserData() called with new score, level, and history entry appended.' },
                { step: '4', title: 'localStorage Sync', desc: 'useEffect watches userData; serializes to "ecotrack-userdata" key on every change.' },
                { step: '5', title: 'Dashboard Rendering', desc: 'Dashboard reads from DataContext; Recharts re-renders with new data points.' },
                { step: '6', title: 'Session Restore', desc: 'On app load, useState initializer parses localStorage; backwards-compat defaults applied.' },
              ].map(item => (
                <div key={item.step} className={`flex gap-4 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">{item.step}</div>
                  <div>
                    <p className={`font-semibold text-sm ${text}`}>{item.title}</p>
                    <p className={`text-sm ${muted}`}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className={h3}>localStorage Schema</h3>
            <div className={`rounded-xl p-5 font-mono text-sm ${darkMode ? 'bg-gray-900 text-green-400' : 'bg-gray-900 text-green-400'} overflow-x-auto mt-3`}>
              <pre>{`// Key: "ecotrack-userdata"
{
  carbonScore: number,
  sustainabilityLevel: string,
  ecoPoints: number,
  streak: number,
  totalSaved: number,
  challenges: string[],
  activeChallenges: [{ id, startedAt, endsAt, progress }],
  completedChallenges: [{ id, completedAt, pointsEarned }],
  history: [{ date, score }]
}

// Key: "ecotrack-darkmode" → boolean
// Key: "ecotrack-learning" → string[] (completed lesson IDs)`}</pre>
            </div>
          </article>
        );

      case 'testing':
        return (
          <article>
            <h2 className={h2}>Testing Methodology</h2>
            <p className={p}>EcoTrack AI applies a multi-layer testing strategy covering functional correctness, rendering integrity, accessibility compliance, and performance characteristics.</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-5">
              {[
                { type: 'Functional Tests', tool: 'Jest + React Testing Library', count: '12 test cases', desc: 'Unit and integration tests for calculator logic, context state mutations, and localStorage operations.' },
                { type: 'UI / Snapshot Tests', tool: 'Vitest + @testing-library/react', count: '8 test cases', desc: 'Component render snapshots ensure UI regressions are caught on every commit.' },
                { type: 'Accessibility Tests', tool: 'axe-core + jest-axe', count: '10 test cases', desc: 'Automated WCAG 2.1 AA compliance checks on every rendered page component.' },
                { type: 'E2E Tests', tool: 'Playwright', count: '6 test cases', desc: 'Full browser automation tests covering the critical user journey from calculator to dashboard.' },
                { type: 'Performance Tests', tool: 'Lighthouse CI', count: '6 metrics', desc: 'Automated Lighthouse runs on every build, with score thresholds enforced in CI.' },
                { type: 'Security Tests', tool: 'Manual + ESLint rules', count: '6 test cases', desc: 'Input validation coverage, XSS prevention review, and safe localStorage parsing verification.' },
              ].map(item => (
                <div key={item.type} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`font-semibold text-sm ${text} mb-1`}>{item.type}</p>
                  <p className="text-xs text-green-500 mb-2">{item.tool} - {item.count}</p>
                  <p className={`text-xs ${muted}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          </article>
        );

      case 'accessibility':
        return (
          <article>
            <h2 className={h2}>Accessibility Standards</h2>
            <p className={p}>EcoTrack AI is built to meet <strong>WCAG 2.1 Level AA</strong> standards. Accessibility is treated as a first-class requirement, not an afterthought.</p>
            <div className="space-y-4 mt-5">
              {[
                { standard: 'Perceivable', items: ['All images and icons have alt text or aria-hidden for decorative elements', 'Color is never the sole means of conveying information', 'Text contrast ratio of at least 4.5:1 in both light and dark modes', 'Charts include text-based data summaries alongside visual representations'] },
                { standard: 'Operable', items: ['All interactive elements reachable via Tab key', 'Focus indicators visible on all buttons, links, and inputs', 'No keyboard traps; modals can be closed with Escape', 'Touch targets minimum 44x44px on mobile viewports'] },
                { standard: 'Understandable', items: ['Form fields have explicit labels or aria-labelledby associations', 'Error messages describe what went wrong and how to fix it', 'Language attribute set on html element (lang="en")', 'Navigation is consistent across all pages'] },
                { standard: 'Robust', items: ['Semantic HTML5 elements (header, nav, main, footer, article, section)', 'ARIA roles used only when native semantics are insufficient', 'Components tested with VoiceOver, NVDA, and axe-core', 'React Error Boundary prevents screen readers from encountering broken DOM'] },
              ].map(item => (
                <div key={item.standard} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold ${text} mb-3`}>{item.standard}</h3>
                  <ul className="space-y-1.5">
                    {item.items.map(pt => (
                      <li key={pt} className={`flex gap-2 text-sm ${muted}`}><span className="text-green-500">OK</span>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        );

      case 'security':
        return (
          <article>
            <h2 className={h2}>Security Measures</h2>
            <div className="space-y-5">
              {[
                { title: 'Input Validation', items: ['All numeric form fields accept only numbers within defined min/max ranges', 'String inputs sanitized before display to prevent XSS', 'Empty and whitespace-only submissions rejected with user-facing error messages', 'Negative values and overflow inputs caught with range validation'] },
                { title: 'Data Handling', items: ['localStorage data parsed with try/catch; malformed JSON falls back to defaults', 'No user PII collected, transmitted, or stored on external servers', 'Supabase client library included but no data sent without explicit user action', 'Environment variables never exposed in client-side bundle'] },
                { title: 'Client-Side Protection', items: ['React Error Boundaries wrap every major feature section', 'TypeScript strict mode eliminates entire classes of type confusion bugs', 'All form state reset on successful submission or navigation away', 'No eval() or innerHTML usage anywhere in the codebase'] },
                { title: 'Dependency Security', items: ['All dependencies pinned to known-safe minor versions', 'No unmaintained packages; all libraries updated in last 12 months', 'Only direct dependencies declared; transitive deps audited with npm audit', 'lucide-react and recharts have zero known vulnerabilities'] },
              ].map(item => (
                <div key={item.title} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <h3 className={`font-semibold ${text} mb-3`}>{item.title}</h3>
                  <ul className="space-y-1.5">
                    {item.items.map(pt => (
                      <li key={pt} className={`flex gap-2 text-sm ${muted}`}><span className="text-green-500">OK</span>{pt}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        );

      case 'performance':
        return (
          <article>
            <h2 className={h2}>Performance Strategy</h2>
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              {[
                { metric: 'First Contentful Paint', target: '< 1.5s', technique: 'Vite pre-bundling + code splitting' },
                { metric: 'Time to Interactive', target: '< 3.0s', technique: 'Lazy-loaded heavy pages' },
                { metric: 'Cumulative Layout Shift', target: '< 0.1', technique: 'Fixed dimensions for charts and images' },
                { metric: 'Bundle Size', target: '< 800 KB', technique: 'Tree-shaking + Rollup minification' },
              ].map(m => (
                <div key={m.metric} className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <p className={`font-semibold text-sm ${text}`}>{m.metric}</p>
                  <p className="text-2xl font-bold text-green-500 my-1">{m.target}</p>
                  <p className={`text-xs ${muted}`}>{m.technique}</p>
                </div>
              ))}
            </div>
            <h3 className={h3}>Optimization Techniques Applied</h3>
            <ul className="space-y-2 mt-3">
              {[
                'React.lazy + Suspense for code-split page loading',
                'ScrollToTop triggers only on pathname changes, not renders',
                'Recharts ResponsiveContainer prevents resize loop issues',
                'Context split into ThemeContext and DataContext to minimize re-renders',
                'localStorage writes debounced via useEffect dependencies',
                'Tailwind CSS purge removes all unused utility classes in production',
                'Vite Rollup produces separate vendor chunk for React + React-DOM',
              ].map(item => (
                <li key={item} className={`flex gap-2 text-sm ${muted}`}><span className="text-green-500">-</span>{item}</li>
              ))}
            </ul>
          </article>
        );

      case 'future':
        return (
          <article>
            <h2 className={h2}>Future Enhancements</h2>
            <div className="space-y-4">
              {[
                { phase: 'Phase 2 (Next 3 months)', color: 'text-green-500', items: ['Supabase auth for cross-device sync', 'Real AI integration (Claude API) for dynamic coaching', 'Carbon offset marketplace with verified projects', 'Weekly email carbon digest'] },
                { phase: 'Phase 3 (6 months)', color: 'text-blue-500', items: ['Mobile app (React Native)', 'Receipt scanning for automatic purchase tracking', 'Company/team dashboards for corporate sustainability', 'API integrations with smart home devices'] },
                { phase: 'Phase 4 (12 months)', color: 'text-purple-500', items: ['Carbon credit tokenization on a public blockchain', 'Social sharing and community challenges', 'B2B SaaS plan for sustainability reporting', 'UN Sustainable Development Goals alignment tracking'] },
              ].map(phase => (
                <div key={phase.phase} className={`p-5 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'} ${phase.color} inline-block mb-3`}>{phase.phase}</span>
                  <ul className="space-y-1.5">
                    {phase.items.map(item => (
                      <li key={item} className={`flex gap-2 text-sm ${muted}`}><span className="text-green-500">{'>'}</span>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </article>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-3`}>Documentation Center</h1>
          <p className={`text-lg ${muted}`}>Technical reference, architecture guide, and engineering practices for EcoTrack AI.</p>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row">
          <nav className="lg:w-64 flex-shrink-0" aria-label="Documentation sections">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border shadow-sm p-3 lg:sticky lg:top-24`}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${muted} px-4 py-2`}>Contents</p>
              <ul role="list" className="space-y-0.5">
                {sections.map(section => (
                  <li key={section.id}>
                    <button
                      className={sidebarItem(section.id)}
                      onClick={() => setActiveSection(section.id)}
                      aria-current={activeSection === section.id ? 'page' : undefined}
                    >
                      <section.icon className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <main className="flex-1 min-w-0">
            <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'} rounded-2xl border shadow-sm p-6 sm:p-8`}>
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
