import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext, useContext, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load pages for code splitting and faster initial load
const LandingPage = lazy(() => import('./pages/LandingPage'));
const CalculatorPage = lazy(() => import('./pages/CalculatorPage'));
const AICoachPage = lazy(() => import('./pages/AICoachPage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const LeaderboardPage = lazy(() => import('./pages/LeaderboardPage'));
const CarbonTrackerPage = lazy(() => import('./pages/CarbonTrackerPage'));
const ElectricityAnalyzerPage = lazy(() => import('./pages/ElectricityAnalyzerPage'));
const LearningCenterPage = lazy(() => import('./pages/LearningCenterPage'));
const ImpactPage = lazy(() => import('./pages/ImpactPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const TestingPage = lazy(() => import('./pages/TestingPage'));
const DocumentationPage = lazy(() => import('./pages/DocumentationPage'));
const AuditPage = lazy(() => import('./pages/AuditPage'));
const EcoBotPage = lazy(() => import('./pages/EcoBotPage'));
const CarbonScannerPage = lazy(() => import('./pages/CarbonScannerPage'));
const CommunityImpactPage = lazy(() => import('./pages/CommunityImpactPage'));
const GoalsPage = lazy(() => import('./pages/GoalsPage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const MethodologyPage = lazy(() => import('./pages/MethodologyPage'));
const ResourceCenterPage = lazy(() => import('./pages/ResourceCenterPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage'));
const WeeklyReportPage = lazy(() => import('./pages/WeeklyReportPage'));
const AdminDashboardPage = lazy(() => import('./pages/AdminDashboardPage'));
const AccessibilityPage = lazy(() => import('./pages/AccessibilityPage'));
const SecurityPage = lazy(() => import('./pages/SecurityPage'));
const PerformancePage = lazy(() => import('./pages/PerformancePage'));
const QualityAssurancePage = lazy(() => import('./pages/QualityAssurancePage'));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" aria-hidden="true" />
        <p className="text-gray-500 dark:text-gray-400 text-sm">Loading...</p>
      </div>
    </div>
  );
}

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

interface ActiveChallenge {
  id: string;
  startedAt: number;
  endsAt: number;
  progress: number;
}

interface CompletedChallenge {
  id: string;
  completedAt: number;
  pointsEarned: number;
}

interface UserDataType {
  carbonScore: number;
  sustainabilityLevel: string;
  ecoPoints: number;
  challenges: string[];
  streak: number;
  totalSaved: number;
  history: { date: string; score: number }[];
  activeChallenges: ActiveChallenge[];
  completedChallenges: CompletedChallenge[];
  learningProgress?: number;
}

interface DataContextType {
  userData: UserDataType;
  setUserData: (data: UserDataType) => void;
  resetData: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const DataContext = createContext<DataContextType>({
  userData: {
    carbonScore: 0,
    sustainabilityLevel: 'Not Calculated',
    ecoPoints: 0,
    challenges: [],
    streak: 0,
    totalSaved: 0,
    history: [],
    activeChallenges: [],
    completedChallenges: [],
    learningProgress: 0,
  },
  setUserData: () => {},
  resetData: () => {},
});

const defaultUserData: UserDataType = {
  carbonScore: 0,
  sustainabilityLevel: 'Not Calculated',
  ecoPoints: 0,
  challenges: [],
  streak: 0,
  totalSaved: 0,
  history: [],
  activeChallenges: [],
  completedChallenges: [],
  learningProgress: 0,
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('ecotrack-darkmode');
    return saved ? JSON.parse(saved) : false;
  });

  const [userData, setUserDataState] = useState<UserDataType>(() => {
    const saved = localStorage.getItem('ecotrack-userdata');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new fields exist for backwards compatibility
      return {
        ...defaultUserData,
        ...parsed,
        activeChallenges: parsed.activeChallenges || [],
        completedChallenges: parsed.completedChallenges || [],
        learningProgress: parsed.learningProgress || 0,
      };
    }
    return defaultUserData;
  });

  useEffect(() => {
    localStorage.setItem('ecotrack-darkmode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('ecotrack-userdata', JSON.stringify(userData));
  }, [userData]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const setUserData = (data: UserDataType) => setUserDataState(data);

  const resetData = () => setUserDataState(defaultUserData);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <DataContext.Provider value={{ userData, setUserData, resetData }}>
        <Router>
          <ScrollToTop />
          <ErrorBoundary>
            <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
              <Header />
              <main id="main-content" className="flex-grow" tabIndex={-1}>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/calculator" element={<CalculatorPage />} />
                    <Route path="/ai-coach" element={<AICoachPage />} />
                    <Route path="/challenges" element={<ChallengesPage />} />
                    <Route path="/leaderboard" element={<LeaderboardPage />} />
                    <Route path="/carbon-tracker" element={<CarbonTrackerPage />} />
                    <Route path="/electricity" element={<ElectricityAnalyzerPage />} />
                    <Route path="/learning" element={<LearningCenterPage />} />
                    <Route path="/impact" element={<ImpactPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/testing" element={<TestingPage />} />
                    <Route path="/docs" element={<DocumentationPage />} />
                    <Route path="/audit-report" element={<AuditPage />} />
                    <Route path="/ecobot" element={<EcoBotPage />} />
                    <Route path="/carbon-scanner" element={<CarbonScannerPage />} />
                    <Route path="/community-impact" element={<CommunityImpactPage />} />
                    <Route path="/goals" element={<GoalsPage />} />
                    <Route path="/achievements" element={<AchievementsPage />} />
                    <Route path="/methodology" element={<MethodologyPage />} />
                    <Route path="/resources" element={<ResourceCenterPage />} />
                    <Route path="/roadmap" element={<RoadmapPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/weekly-report" element={<WeeklyReportPage />} />
                    <Route path="/admin" element={<AdminDashboardPage />} />
                    <Route path="/accessibility" element={<AccessibilityPage />} />
                    <Route path="/security" element={<SecurityPage />} />
                    <Route path="/performance" element={<PerformancePage />} />
                    <Route path="/quality" element={<QualityAssurancePage />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
            </div>
          </ErrorBoundary>
        </Router>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useData = () => useContext(DataContext);

export default App;
