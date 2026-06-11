import { useState, useEffect } from 'react';
import { Target, Plus, CheckCircle, Trash2, Calendar, TrendingUp, Award, Flame } from 'lucide-react';
import { useTheme } from '../App';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'energy' | 'transport' | 'food' | 'waste' | 'general';
  createdAt: string;
}

const defaultGoals: Goal[] = [
  {
    id: '1',
    title: 'Reduce Electricity by 15%',
    description: 'Lower electricity consumption through efficiency measures',
    target: 15,
    current: 7,
    unit: '%',
    deadline: '2026-07-01',
    category: 'energy',
    createdAt: '2026-06-01',
  },
  {
    id: '2',
    title: 'Walk Instead of Drive 3x/Week',
    description: 'Replace short car trips with walking',
    target: 3,
    current: 2,
    unit: 'times/week',
    deadline: '2026-12-31',
    category: 'transport',
    createdAt: '2026-06-01',
  },
  {
    id: '3',
    title: 'Complete 10 Eco Challenges',
    description: 'Finish sustainability challenges for EcoPoints',
    target: 10,
    current: 4,
    unit: 'challenges',
    deadline: '2026-08-31',
    category: 'general',
    createdAt: '2026-06-01',
  },
];

const categoryColors = {
  energy: 'bg-amber-500',
  transport: 'bg-blue-500',
  food: 'bg-green-500',
  waste: 'bg-purple-500',
  general: 'bg-teal-500',
};

export default function GoalsPage() {
  const { darkMode } = useTheme();
  const [goals, setGoals] = useState<Goal[]>(() => {
    const saved = localStorage.getItem('ecotrack-goals');
    return saved ? JSON.parse(saved) : defaultGoals;
  });
  const [showForm, setShowForm] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    target: '',
    unit: '',
    deadline: '',
    category: 'general' as Goal['category'],
  });

  useEffect(() => {
    localStorage.setItem('ecotrack-goals', JSON.stringify(goals));
  }, [goals]);

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const addGoal = () => {
    if (!newGoal.title || !newGoal.target) return;

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      target: parseFloat(newGoal.target),
      current: 0,
      unit: newGoal.unit || 'units',
      deadline: newGoal.deadline || '2026-12-31',
      category: newGoal.category,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setGoals([...goals, goal]);
    setNewGoal({ title: '', description: '', target: '', unit: '', deadline: '', category: 'general' });
    setShowForm(false);
  };

  const updateProgress = (id: string, delta: number) => {
    setGoals(goals.map(g => {
      if (g.id === id) {
        const newCurrent = Math.max(0, Math.min(g.target, g.current + delta));
        return { ...g, current: newCurrent };
      }
      return g;
    }));
  };

  const deleteGoal = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const completedGoals = goals.filter(g => g.current >= g.target).length;
  const totalProgress = goals.length > 0
    ? Math.round(goals.reduce((sum, g) => sum + (g.current / g.target) * 100, 0) / goals.length)
    : 0;

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Sustainability Goals</h1>
          <p className={`text-lg ${muted}`}>Set, track, and achieve your environmental objectives</p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Goals', value: goals.length, icon: Target, color: 'text-blue-500' },
            { label: 'Completed', value: completedGoals, icon: CheckCircle, color: 'text-green-500' },
            { label: 'Avg Progress', value: `${totalProgress}%`, icon: TrendingUp, color: 'text-amber-500' },
            { label: 'Streak', value: '12 days', icon: Flame, color: 'text-orange-500' },
          ].map(stat => (
            <div key={stat.label} className={`${card} rounded-xl p-4 text-center`}>
              <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
              <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className={`text-xs ${muted}`}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Add Goal Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-lg font-semibold ${text}`}>Your Goals</h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Goal
          </button>
        </div>

        {/* Add Goal Form */}
        {showForm && (
          <div className={`${card} rounded-2xl p-6 border mb-6`}>
            <h3 className={`font-semibold ${text} mb-4`}>Create New Goal</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Goal Title</label>
                <input
                  type="text"
                  value={newGoal.title}
                  onChange={e => setNewGoal({ ...newGoal, title: e.target.value })}
                  placeholder="e.g., Reduce electricity by 20%"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Category</label>
                <select
                  value={newGoal.category}
                  onChange={e => setNewGoal({ ...newGoal, category: e.target.value as Goal['category'] })}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                >
                  <option value="energy">Energy</option>
                  <option value="transport">Transport</option>
                  <option value="food">Food</option>
                  <option value="waste">Waste</option>
                  <option value="general">General</option>
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Target Value</label>
                <input
                  type="number"
                  value={newGoal.target}
                  onChange={e => setNewGoal({ ...newGoal, target: e.target.value })}
                  placeholder="e.g., 20"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                />
              </div>
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Unit</label>
                <input
                  type="text"
                  value={newGoal.unit}
                  onChange={e => setNewGoal({ ...newGoal, unit: e.target.value })}
                  placeholder="e.g., %, times, kg"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={`text-sm font-medium ${text} mb-1 block`}>Deadline</label>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={e => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={addGoal}
                disabled={!newGoal.title || !newGoal.target}
                className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                Create Goal
              </button>
              <button
                onClick={() => setShowForm(false)}
                className={`px-4 py-2 rounded-lg font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className={`${card} rounded-2xl p-8 text-center`}>
              <Target className={`h-12 w-12 ${muted} mx-auto mb-4`} />
              <p className={muted}>No goals yet. Create your first sustainability goal!</p>
            </div>
          ) : (
            goals.map(goal => {
              const progress = Math.min(100, (goal.current / goal.target) * 100);
              const isComplete = goal.current >= goal.target;
              const daysLeft = Math.ceil((new Date(goal.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));

              return (
                <div key={goal.id} className={`${card} rounded-2xl p-5 border ${isComplete ? 'border-green-500' : ''}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${categoryColors[goal.category]}`} />
                      <div>
                        <h3 className={`font-semibold ${text} flex items-center gap-2`}>
                          {goal.title}
                          {isComplete && <CheckCircle className="h-4 w-4 text-green-500" />}
                        </h3>
                        <p className={`text-sm ${muted}`}>{goal.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-lg"
                      aria-label="Delete goal"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className={muted}>Progress</span>
                      <span className={text}>{goal.current} / {goal.target} {goal.unit}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${isComplete ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className={`h-4 w-4 ${muted}`} />
                      <span className={muted}>
                        {daysLeft > 0 ? `${daysLeft} days left` : 'Deadline passed'}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateProgress(goal.id, -1)}
                        disabled={goal.current <= 0}
                        className={`px-3 py-1 rounded-lg text-sm font-medium ${darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'} disabled:opacity-50`}
                      >
                        -1
                      </button>
                      <button
                        onClick={() => updateProgress(goal.id, 1)}
                        disabled={goal.current >= goal.target}
                        className="px-3 py-1 rounded-lg text-sm font-medium bg-green-500 text-white disabled:opacity-50"
                      >
                        +1
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Achievement Hint */}
        {completedGoals > 0 && (
          <div className={`mt-8 p-4 rounded-xl ${darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100'} border`}>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-green-500" />
              <div>
                <p className={`font-semibold ${text}`}>Keep up the momentum!</p>
                <p className={`text-sm ${muted}`}>You've completed {completedGoals} goal{completedGoals > 1 ? 's' : ''}. Every small action adds up to big change.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
