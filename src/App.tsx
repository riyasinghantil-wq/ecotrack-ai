import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect, createContext, useContext } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LandingPage from './pages/LandingPage';
import CalculatorPage from './pages/CalculatorPage';
import AICoachPage from './pages/AICoachPage';
import DashboardPage from './pages/DashboardPage';
import ChallengesPage from './pages/ChallengesPage';
import LeaderboardPage from './pages/LeaderboardPage';
import CarbonTrackerPage from './pages/CarbonTrackerPage';
import ElectricityAnalyzerPage from './pages/ElectricityAnalyzerPage';
import LearningCenterPage from './pages/LearningCenterPage';
import ImpactPage from './pages/ImpactPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';

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
          <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
            <Header />
            <main className="flex-grow">
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
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataContext.Provider>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
export const useData = () => useContext(DataContext);

export default App;
