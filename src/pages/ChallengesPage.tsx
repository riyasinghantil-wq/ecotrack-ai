import { useState, useEffect } from 'react';
import { useTheme, useData } from '../App';
import {
  Target,
  CheckCircle,
  Leaf,
  Car,
  Bike,
  TreePine,
  Recycle,
  Droplets,
  ShoppingBag,
  Award,
  Zap,
  Star,
  Clock,
  Play,
  Trophy,
  X,
} from 'lucide-react';

interface ActiveChallenge {
  id: string;
  startedAt: number; // timestamp
  endsAt: number; // timestamp
  progress: number; // 0-100
}

interface CompletedChallenge {
  id: string;
  completedAt: number;
  pointsEarned: number;
}

interface ChallengeDefinition {
  id: string;
  title: string;
  description: string;
  icon: typeof Leaf;
  points: number;
  durationDays: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  tips: string[];
}

export default function ChallengesPage() {
  const { darkMode } = useTheme();
  const { userData, setUserData } = useData();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'completed'>('active');
  const [showStartModal, setShowStartModal] = useState<string | null>(null);
  const [showCompleteModal, setShowCompleteModal] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(Date.now());

  // Update current time every minute for progress updates
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  const challenges: ChallengeDefinition[] = [
    {
      id: 'no-car',
      title: 'No Car Day',
      description: 'Leave your car at home and use eco-friendly transportation for 24 hours.',
      icon: Car,
      points: 50,
      durationDays: 1,
      difficulty: 'medium',
      category: 'transportation',
      tips: ['Use public transport', 'Walk or cycle for short trips', 'Plan your routes in advance'],
    },
    {
      id: 'plant-tree',
      title: 'Plant a Tree',
      description: 'Plant a tree or support a verified tree-planting organization.',
      icon: TreePine,
      points: 100,
      durationDays: 7,
      difficulty: 'hard',
      category: 'nature',
      tips: ['Research native species', 'Choose an appropriate location', 'Water regularly after planting'],
    },
    {
      id: 'public-transport',
      title: 'Public Transport Week',
      description: 'Use public transport for all your commutes for an entire week.',
      icon: Car,
      points: 75,
      durationDays: 7,
      difficulty: 'medium',
      category: 'transportation',
      tips: ['Get a weekly pass', 'Check schedules ahead of time', 'Have backup routes ready'],
    },
    {
      id: 'reduce-electricity',
      title: 'Reduce Electricity by 20%',
      description: 'Cut your electricity usage by 20% compared to your average consumption.',
      icon: Zap,
      points: 60,
      durationDays: 7,
      difficulty: 'medium',
      category: 'energy',
      tips: ['Turn off unused lights', 'Use natural light when possible', 'Unplug devices when not in use'],
    },
    {
      id: 'reusable-bottle',
      title: 'Reusable Bottle Challenge',
      description: 'Use only a reusable water bottle - no single-use plastic bottles.',
      icon: Recycle,
      points: 40,
      durationDays: 1,
      difficulty: 'easy',
      category: 'waste',
      tips: ['Carry your bottle everywhere', 'Refill at public fountains', 'Track how many bottles you save'],
    },
    {
      id: 'avoid-plastic',
      title: 'Plastic-Free Week',
      description: 'Say no to single-use plastic bags, straws, and cutlery for a week.',
      icon: ShoppingBag,
      points: 55,
      durationDays: 7,
      difficulty: 'medium',
      category: 'waste',
      tips: ['Bring reusable bags', 'Refuse straws at restaurants', 'Use reusable containers'],
    },
    {
      id: 'shorter-showers',
      title: '5-Minute Showers',
      description: 'Limit all showers to 5 minutes maximum for an entire day.',
      icon: Droplets,
      points: 30,
      durationDays: 1,
      difficulty: 'easy',
      category: 'water',
      tips: ['Use a timer', 'Turn off water while soaping', 'Consider cold showers'],
    },
    {
      id: 'meatless-monday',
      title: 'Meatless Day',
      description: 'Go completely vegetarian for one full day.',
      icon: Leaf,
      points: 35,
      durationDays: 1,
      difficulty: 'easy',
      category: 'food',
      tips: ['Plan meals in advance', 'Try new vegetarian recipes', 'Ensure balanced nutrition'],
    },
    {
      id: 'bike-commute',
      title: 'Bike to Work',
      description: 'Cycle to work or school for at least 3 days.',
      icon: Bike,
      points: 70,
      durationDays: 7,
      difficulty: 'medium',
      category: 'transportation',
      tips: ['Check your bike condition', 'Plan safe routes', 'Have rain gear ready'],
    },
    {
      id: 'recycling-master',
      title: 'Recycling Master',
      description: 'Properly sort and recycle all household waste for a week.',
      icon: Recycle,
      points: 65,
      durationDays: 7,
      difficulty: 'medium',
      category: 'waste',
      tips: ['Learn local recycling rules', 'Rinse containers before recycling', 'Compost organic waste'],
    },
  ];

  const categories = [
    { id: 'all', label: 'All', icon: Target },
    { id: 'transportation', label: 'Transport', icon: Car },
    { id: 'energy', label: 'Energy', icon: Zap },
    { id: 'waste', label: 'Waste', icon: Recycle },
    { id: 'water', label: 'Water', icon: Droplets },
    { id: 'food', label: 'Food', icon: Leaf },
    { id: 'nature', label: 'Nature', icon: TreePine },
  ];

  // Get active and completed challenges from userData
  const activeChallenges: ActiveChallenge[] = (userData as unknown as { activeChallenges?: ActiveChallenge[] }).activeChallenges || [];
  const completedChallenges: CompletedChallenge[] = (userData as unknown as { completedChallenges?: CompletedChallenge[] }).completedChallenges || [];

  // Calculate progress for an active challenge
  const calculateProgress = (challenge: ActiveChallenge): number => {
    const total = challenge.endsAt - challenge.startedAt;
    const elapsed = currentTime - challenge.startedAt;
    return Math.min(100, Math.max(0, (elapsed / total) * 100));
  };

  // Format time remaining
  const formatTimeRemaining = (endsAt: number): string => {
    const remaining = endsAt - currentTime;
    if (remaining <= 0) return 'Ready to complete';

    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} remaining`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m remaining`;
    }
    return `${minutes} minutes remaining`;
  };

  // Start a challenge
  const startChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const now = Date.now();
    const newActive: ActiveChallenge = {
      id: challengeId,
      startedAt: now,
      endsAt: now + (challenge.durationDays * 24 * 60 * 60 * 1000),
      progress: 0,
    };

    const updatedActive = [...activeChallenges, newActive];

    setUserData({
      ...userData,
      activeChallenges: updatedActive,
    } as unknown as typeof userData);

    setShowStartModal(null);
  };

  // Complete a challenge
  const completeChallenge = (challengeId: string) => {
    const challenge = challenges.find(c => c.id === challengeId);
    const activeChallenge = activeChallenges.find(c => c.id === challengeId);
    if (!challenge || !activeChallenge) return;

    // Check if enough time has passed
    if (currentTime < activeChallenge.endsAt) {
      alert('This challenge is not ready to complete yet. Please wait for the duration to pass.');
      return;
    }

    const newCompleted: CompletedChallenge = {
      id: challengeId,
      completedAt: currentTime,
      pointsEarned: challenge.points,
    };

    const updatedActive = activeChallenges.filter(c => c.id !== challengeId);
    const updatedCompleted = [...completedChallenges, newCompleted];

    setUserData({
      ...userData,
      ecoPoints: userData.ecoPoints + challenge.points,
      streak: userData.streak + 1,
      activeChallenges: updatedActive,
      completedChallenges: updatedCompleted,
    } as unknown as typeof userData);

    setShowCompleteModal(null);
  };

  // Cancel a challenge
  const cancelChallenge = (challengeId: string) => {
    if (!confirm('Are you sure you want to cancel this challenge? Your progress will be lost.')) return;

    const updatedActive = activeChallenges.filter(c => c.id !== challengeId);
    setUserData({
      ...userData,
      activeChallenges: updatedActive,
    } as unknown as typeof userData);
  };

  // Filter challenges based on category and tab
  const getFilteredChallenges = (): ChallengeDefinition[] => {
    let filtered = challenges;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(c => c.category === selectedCategory);
    }

    if (activeTab === 'active') {
      return filtered.filter(c => activeChallenges.some(a => a.id === c.id));
    } else if (activeTab === 'completed') {
      // Allow repeating challenges, so don't filter
      return filtered.filter(c => completedChallenges.some(comp => comp.id === c.id));
    } else {
      // Available - not currently active
      return filtered.filter(c => !activeChallenges.some(a => a.id === c.id));
    }
  };

  const getChallengeStatus = (challengeId: string): 'available' | 'active' | 'completed' | 'ready' => {
    const isActive = activeChallenges.some(c => c.id === challengeId);
    if (isActive) {
      const active = activeChallenges.find(c => c.id === challengeId);
      if (active && currentTime >= active.endsAt) return 'ready';
      return 'active';
    }
    if (completedChallenges.some(c => c.id === challengeId)) return 'completed';
    return 'available';
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Green Challenges
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Take on eco-challenges to build sustainable habits and make a real environmental difference.
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-sm`}>
            <Award className="h-8 w-8 text-amber-500 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {userData.ecoPoints}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Eco Points</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-sm`}>
            <Play className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {activeChallenges.length}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-sm`}>
            <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {completedChallenges.length}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-6 text-center shadow-sm`}>
            <Zap className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {userData.streak}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Day Streak</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-6">
          {[
            { id: 'active', label: 'Active', icon: Play },
            { id: 'available', label: 'Available', icon: Target },
            { id: 'completed', label: 'Completed', icon: Trophy },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : darkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
              {tab.id === 'active' && activeChallenges.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-white/20 text-xs">
                  {activeChallenges.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-green-500/20 text-green-500 border border-green-500/30'
                  : darkMode
                  ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <cat.icon className="h-4 w-4" />
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredChallenges().map((challenge) => {
            const status = getChallengeStatus(challenge.id);
            const activeChallenge = activeChallenges.find(c => c.id === challenge.id);
            const progress = activeChallenge ? calculateProgress(activeChallenge) : 0;
            const timeRemaining = activeChallenge ? formatTimeRemaining(activeChallenge.endsAt) : '';
            const completions = completedChallenges.filter(c => c.id === challenge.id).length;

            return (
              <div
                key={challenge.id}
                className={`relative overflow-hidden rounded-2xl ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-sm transition-all duration-300`}
              >
                {/* Status indicator */}
                {status === 'active' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500" />
                )}
                {status === 'ready' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                )}

                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className={`p-3 rounded-xl ${
                        status === 'active' || status === 'ready'
                          ? 'bg-green-500/20'
                          : darkMode
                          ? 'bg-gray-700'
                          : 'bg-gray-100'
                      }`}
                    >
                      <challenge.icon className={`h-6 w-6 ${
                        status === 'active' || status === 'ready' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        challenge.difficulty === 'easy'
                          ? 'bg-green-500/20 text-green-500'
                          : challenge.difficulty === 'medium'
                          ? 'bg-amber-500/20 text-amber-500'
                          : 'bg-red-500/20 text-red-500'
                      }`}>
                        {challenge.difficulty}
                      </span>
                      {completions > 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-500">
                          x{completions}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title and description */}
                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {challenge.title}
                  </h3>
                  <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {challenge.description}
                  </p>

                  {/* Progress bar for active challenges */}
                  {(status === 'active' || status === 'ready') && activeChallenge && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>{timeRemaining}</span>
                        <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                          {Math.round(progress)}%
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            status === 'ready' ? 'bg-amber-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Meta info */}
                  <div className="flex items-center justify-between text-sm mb-4">
                    <div className="flex items-center space-x-1 text-amber-500">
                      <Star className="h-4 w-4" />
                      <span className="font-medium">+{challenge.points} pts</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {challenge.durationDays === 1 ? '1 day' : `${challenge.durationDays} days`}
                      </span>
                    </div>
                  </div>

                  {/* Action button */}
                  {status === 'available' && (
                    <button
                      onClick={() => setShowStartModal(challenge.id)}
                      className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Start Challenge
                    </button>
                  )}
                  {status === 'active' && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => cancelChallenge(challenge.id)}
                        className={`flex-1 py-2 rounded-lg font-medium ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        disabled
                        className="flex-1 py-2 bg-gray-400 text-white rounded-lg font-medium cursor-not-allowed"
                      >
                        In Progress
                      </button>
                    </div>
                  )}
                  {status === 'ready' && (
                    <button
                      onClick={() => setShowCompleteModal(challenge.id)}
                      className="w-full py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors"
                    >
                      Complete Challenge
                    </button>
                  )}
                  {status === 'completed' && activeTab === 'completed' && (
                    <button
                      onClick={() => setShowStartModal(challenge.id)}
                      className="w-full py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors"
                    >
                      Start Again
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {getFilteredChallenges().length === 0 && (
          <div className="text-center py-12">
            <Target className={`h-12 w-12 mx-auto mb-4 ${darkMode ? 'text-gray-600' : 'text-gray-300'}`} />
            <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
              {activeTab === 'active'
                ? "You don't have any active challenges. Start one!"
                : activeTab === 'completed'
                ? "You haven't completed any challenges yet."
                : 'No challenges found in this category.'}
            </p>
          </div>
        )}

        {/* Start Challenge Modal */}
        {showStartModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full`}>
              {(() => {
                const challenge = challenges.find(c => c.id === showStartModal);
                if (!challenge) return null;
                return (
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Start Challenge
                      </h3>
                      <button
                        onClick={() => setShowStartModal(null)}
                        className={`p-1 rounded-lg ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-3 mb-4">
                      <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                        <challenge.icon className="h-8 w-8 text-green-500" />
                      </div>
                      <div>
                        <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {challenge.title}
                        </h4>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          Duration: {challenge.durationDays === 1 ? '24 hours' : `${challenge.durationDays} days`}
                        </p>
                      </div>
                    </div>

                    <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`text-sm mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        <strong>Tips for success:</strong>
                      </p>
                      <ul className="text-sm space-y-1">
                        {challenge.tips.map((tip, i) => (
                          <li key={i} className={`flex items-start space-x-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            <span className="text-green-500 mt-0.5">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between mb-4 p-3 rounded-lg bg-amber-500/10">
                      <span className="text-sm text-amber-600 font-medium">Reward on completion:</span>
                      <span className="text-amber-600 font-bold">+{challenge.points} eco points</span>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowStartModal(null)}
                        className={`flex-1 py-2 rounded-lg font-medium ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => startChallenge(showStartModal)}
                        className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                      >
                        Start Challenge
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}

        {/* Complete Challenge Modal */}
        {showCompleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 max-w-md w-full`}>
              {(() => {
                const challenge = challenges.find(c => c.id === showCompleteModal);
                if (!challenge) return null;
                return (
                  <>
                    <div className="text-center mb-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
                        <Award className="h-8 w-8 text-amber-500" />
                      </div>
                      <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        Complete Challenge?
                      </h3>
                    </div>

                    <div className={`p-4 rounded-xl mb-4 ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                      <p className={`font-medium mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {challenge.title}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Did you successfully complete this challenge? Confirm to earn your reward.
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-2 p-3 rounded-lg bg-green-500/10 mb-4">
                      <Star className="h-5 w-5 text-amber-500" />
                      <span className="text-green-600 font-bold text-lg">+{challenge.points} eco points</span>
                    </div>

                    <div className="flex space-x-3">
                      <button
                        onClick={() => setShowCompleteModal(null)}
                        className={`flex-1 py-2 rounded-lg font-medium ${
                          darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Not Yet
                      </button>
                      <button
                        onClick={() => completeChallenge(showCompleteModal)}
                        className="flex-1 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                      >
                        Confirm Completion
                      </button>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
