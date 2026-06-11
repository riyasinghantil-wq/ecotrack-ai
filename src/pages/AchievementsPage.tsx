import { useState, useEffect } from 'react';
import { Award, Trophy, Star, Leaf, Target, BookOpen, Zap, CheckCircle, Lock, Sparkles } from 'lucide-react';
import { useTheme, useData } from '../App';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  requirement: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export default function AchievementsPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();
  const [badges, setBadges] = useState<Badge[]>(() => {
    const saved = localStorage.getItem('ecotrack-badges');
    if (saved) return JSON.parse(saved);

    return [
      {
        id: 'eco-beginner',
        name: 'Eco Beginner',
        description: 'Started your sustainability journey by calculating your carbon footprint',
        icon: Leaf,
        color: 'text-green-500',
        bgColor: 'bg-green-500/20',
        requirement: 'Complete your first carbon calculation',
        unlocked: (userData.carbonScore || 0) > 0,
        unlockedAt: (userData.carbonScore || 0) > 0 ? new Date().toISOString() : undefined,
      },
      {
        id: 'green-explorer',
        name: 'Green Explorer',
        description: 'Explored the Learning Center and gained environmental knowledge',
        icon: BookOpen,
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/20',
        requirement: 'Complete 2 learning lessons',
        unlocked: false,
      },
      {
        id: 'sustainability-advocate',
        name: 'Sustainability Advocate',
        description: 'Demonstrated commitment through multiple eco-friendly actions',
        icon: Target,
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/20',
        requirement: 'Complete 5 sustainability challenges',
        unlocked: (userData.completedChallenges?.length || 0) >= 5,
        unlockedAt: (userData.completedChallenges?.length || 0) >= 5 ? new Date().toISOString() : undefined,
      },
      {
        id: 'climate-champion',
        name: 'Climate Champion',
        description: 'Made significant progress toward carbon neutrality',
        icon: Zap,
        color: 'text-amber-500',
        bgColor: 'bg-amber-500/20',
        requirement: 'Save at least 100 kg CO2 through challenges',
        unlocked: (userData.totalSaved || 0) >= 100,
        unlockedAt: (userData.totalSaved || 0) >= 100 ? new Date().toISOString() : undefined,
      },
      {
        id: 'eco-leader',
        name: 'Eco Leader',
        description: 'Led by example with consistent sustainable behavior',
        icon: Trophy,
        color: 'text-orange-500',
        bgColor: 'bg-orange-500/20',
        requirement: 'Maintain a 14-day streak',
        unlocked: (userData.streak || 0) >= 14,
        unlockedAt: (userData.streak || 0) >= 14 ? new Date().toISOString() : undefined,
      },
      {
        id: 'carbon-master',
        name: 'Carbon Reduction Master',
        description: 'Achieved exceptional carbon footprint reduction through dedicated action',
        icon: Award,
        color: 'text-red-500',
        bgColor: 'bg-red-500/20',
        requirement: 'Reduce carbon score by 50%',
        unlocked: false,
      },
    ];
  });

  useEffect(() => {
    // Check and unlock badges based on current progress
    const updatedBadges = badges.map(badge => {
      if (badge.unlocked) return badge;

      let shouldUnlock = false;
      switch (badge.id) {
        case 'eco-beginner':
          shouldUnlock = (userData.carbonScore || 0) > 0;
          break;
        case 'sustainability-advocate':
          shouldUnlock = (userData.completedChallenges?.length || 0) >= 5;
          break;
        case 'climate-champion':
          shouldUnlock = (userData.totalSaved || 0) >= 100;
          break;
        case 'eco-leader':
          shouldUnlock = (userData.streak || 0) >= 14;
          break;
        case 'green-explorer':
          shouldUnlock = (userData.learningProgress || 0) >= 2;
          break;
      }

      if (shouldUnlock) {
        return { ...badge, unlocked: true, unlockedAt: new Date().toISOString() };
      }
      return badge;
    });

    setBadges(updatedBadges);
    localStorage.setItem('ecotrack-badges', JSON.stringify(updatedBadges));
  }, [userData]);

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const unlockedCount = badges.filter(b => b.unlocked).length;
  const totalPoints = unlockedCount * 100;

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/20 mb-4">
            <Trophy className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Achievements & Badges</h1>
          <p className={`text-lg ${muted}`}>Unlock badges by reaching sustainability milestones</p>
        </div>

        {/* Progress Summary */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className={`${card} rounded-2xl p-5 border text-center`}>
            <Star className="h-6 w-6 text-amber-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-amber-500">{unlockedCount} / {badges.length}</div>
            <div className={`text-sm ${muted}`}>Badges Unlocked</div>
          </div>
          <div className={`${card} rounded-2xl p-5 border text-center`}>
            <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-purple-500">{totalPoints}</div>
            <div className={`text-sm ${muted}`}>Achievement Points</div>
          </div>
          <div className={`${card} rounded-2xl p-5 border text-center`}>
            <Leaf className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-green-500">{Math.round((unlockedCount / badges.length) * 100)}%</div>
            <div className={`text-sm ${muted}`}>Completion Rate</div>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map(badge => (
            <div
              key={badge.id}
              className={`${card} rounded-2xl p-6 border ${badge.unlocked ? 'border-amber-500' : ''} relative overflow-hidden transition-all duration-300`}
            >
              {badge.unlocked && (
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-500/20 to-transparent -mr-8 -mt-8 rounded-full" />
              )}

              <div className="flex items-start justify-between mb-4">
                <div className={`w-16 h-16 rounded-2xl ${badge.unlocked ? badge.bgColor : darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
                  {badge.unlocked ? (
                    <badge.icon className={`h-8 w-8 ${badge.color}`} />
                  ) : (
                    <Lock className={`h-6 w-6 ${muted}`} />
                  )}
                </div>
                {badge.unlocked && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>

              <h3 className={`font-semibold ${text} mb-1 flex items-center gap-2`}>
                {badge.name}
                {badge.unlocked && <span className="text-xs text-amber-500">UNLOCKED</span>}
              </h3>

              <p className={`text-sm ${muted} mb-3`}>{badge.description}</p>

              <div className={`text-xs px-3 py-1.5 rounded-full ${badge.unlocked ? 'bg-green-500/10 text-green-500' : darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'} inline-block`}>
                {badge.unlocked ? 'Completed' : badge.requirement}
              </div>

              {badge.unlocked && badge.unlockedAt && (
                <p className={`text-xs ${muted} mt-3`}>
                  Unlocked: {new Date(badge.unlockedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Motivation */}
        <div className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-green-500/10 to-blue-500/10' : 'bg-gradient-to-r from-green-50 to-blue-50'} border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center gap-4">
            <Trophy className="h-10 w-10 text-amber-500 flex-shrink-0" />
            <div>
              <h3 className={`font-semibold ${text} mb-1`}>Keep Pushing Forward!</h3>
              <p className={`text-sm ${muted}`}>
                {unlockedCount === 0
                  ? "Start your journey by calculating your carbon footprint to unlock your first badge!"
                  : unlockedCount < badges.length
                  ? `You've unlocked ${unlockedCount} of ${badges.length} badges. Complete more challenges and track your progress to earn more!`
                  : "Congratulations! You've unlocked all available badges. You're a true sustainability champion!"
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
