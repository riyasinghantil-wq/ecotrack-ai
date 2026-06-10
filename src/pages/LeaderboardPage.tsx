import { useTheme, useData } from '../App';
import { Trophy, Medal, Star, Crown } from 'lucide-react';

export default function LeaderboardPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 mb-6">
            <Trophy className="h-8 w-8 text-white" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Progress
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Track your eco journey and see how your sustainable actions add up over time.
          </p>
        </div>

        {/* Your Stats Card */}
        <div
          className={`${
            darkMode
              ? 'bg-gradient-to-r from-green-600 to-emerald-600'
              : 'bg-gradient-to-r from-green-500 to-emerald-500'
          } rounded-2xl p-6 mb-8 text-white`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                You
              </div>
              <div>
                <p className="text-white/80 text-sm">Your Eco Points</p>
                <p className="text-4xl font-bold">{userData.ecoPoints.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">Challenges Completed</p>
              <p className="text-2xl font-bold">{userData.challenges.length}</p>
            </div>
          </div>
        </div>

        {/* Personal Achievements */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm mb-8`}>
          <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Achievements
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Trophy className="h-8 w-8 text-amber-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.ecoPoints}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Points
              </p>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Star className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.challenges.length}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Challenges Done
              </p>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Medal className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.streak}
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Day Streak
              </p>
            </div>
            <div className={`p-4 rounded-xl text-center ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
              <Crown className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {userData.totalSaved.toFixed(0)} kg
              </p>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                CO2 Saved
              </p>
            </div>
          </div>
        </div>

        {/* Sustainability Milestones */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm mb-8`}>
          <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Sustainability Milestones
          </h2>

          <div className="space-y-4">
            {[
              { points: 100, label: 'Beginner', icon: Leaf, color: 'text-green-500' },
              { points: 250, label: 'Enthusiast', icon: Leaf, color: 'text-green-400' },
              { points: 500, label: 'Eco Warrior', icon: Trophy, color: 'text-blue-500' },
              { points: 1000, label: 'Champion', icon: Crown, color: 'text-purple-500' },
              { points: 2000, label: 'Legend', icon: Star, color: 'text-amber-500' },
            ].map((milestone, index) => {
              const achieved = userData.ecoPoints >= milestone.points;
              const Leaf = milestone.icon;
              return (
                <div
                  key={index}
                  className={`flex items-center justify-between p-4 rounded-xl ${
                    achieved
                      ? darkMode
                        ? 'bg-green-500/20'
                        : 'bg-green-50'
                      : darkMode
                      ? 'bg-gray-700'
                      : 'bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achieved ? 'bg-green-500' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                      }`}
                    >
                      <Leaf
                        className={`h-5 w-5 ${
                          achieved ? 'text-white' : darkMode ? 'text-gray-400' : 'text-gray-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={`font-medium ${
                          achieved
                            ? darkMode
                              ? 'text-green-400'
                              : 'text-green-600'
                            : darkMode
                            ? 'text-gray-300'
                            : 'text-gray-700'
                        }`}
                      >
                        {milestone.label}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {milestone.points} points
                      </p>
                    </div>
                  </div>
                  {achieved && <Star className="h-6 w-6 text-amber-500" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Environmental Impact */}
        <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm`}>
          <h2 className={`text-xl font-semibold mb-6 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Your Environmental Impact
          </h2>

          <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-green-50'} text-center`}>
            <p className={`text-sm mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Based on your sustainability activities
            </p>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(userData.totalSaved * 0.04).toFixed(0)}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Trees Equivalent
                </p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(userData.totalSaved * 3.5).toFixed(0)}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  km Not Driven
                </p>
              </div>
              <div>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {(userData.totalSaved * 12).toFixed(0)}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  LED Hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Leaf({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 3 1.9 8 1.9 11a7 7 0 0 1-9 7Z" />
      <path d="M11 20a7 7 0 0 0 1.2-13.9C6.5 5 5 4.52 3 2c-1 3-1.9 8-1.9 11a7 7 0 0 0 9 7Z" />
    </svg>
  );
}
