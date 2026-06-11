import { useState, useEffect } from 'react';
import { MapPin, Target, Calendar, Leaf, TrendingUp, CheckCircle, ChevronRight, Zap, Car, Utensils, Lightbulb, Recycle } from 'lucide-react';
import { useTheme, useData } from '../App';
import { Link } from 'react-router-dom';

interface RoadmapAction {
  id: string;
  title: string;
  description: string;
  carbonImpact: number;
  week: number;
  completed: boolean;
  category: 'transport' | 'energy' | 'food' | 'waste';
}

interface RoadmapPlan {
  currentScore: number;
  targetScore: number;
  impactLevel: string;
  totalReduction: number;
  phases: {
    name: string;
    period: string;
    actions: RoadmapAction[];
    target: number;
  }[];
}

const categoryIcons = {
  transport: Car,
  energy: Lightbulb,
  food: Utensils,
  waste: Recycle,
};

export default function RoadmapPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();
  const [roadmap, setRoadmap] = useState<RoadmapPlan | null>(null);

  useEffect(() => {
    generateRoadmap();
  }, [userData.carbonScore]);

  const generateRoadmap = () => {
    const currentScore = userData.carbonScore || 5000;
    const impactLevel = currentScore > 12000 ? 'Critical' : currentScore > 8000 ? 'High' : currentScore > 5000 ? 'Moderate' : 'Low';
    const targetReduction = Math.round(currentScore * 0.3); // 30% reduction target
    const targetScore = currentScore - targetReduction;

    const actions: RoadmapAction[] = [
      // Week 1-2: Transport
      { id: '1', title: 'Use public transport twice this week', description: 'Replace 2 car trips with bus or train', carbonImpact: 8, week: 1, completed: false, category: 'transport' },
      { id: '2', title: 'Carpool for your daily commute', description: 'Share rides 3 times this week', carbonImpact: 12, week: 2, completed: false, category: 'transport' },
      { id: '3', title: 'Walk or bike for trips under 2km', description: 'Replace short car trips with active transport', carbonImpact: 15, week: 3, completed: false, category: 'transport' },
      { id: '4', title: 'Maintain proper tire pressure', description: 'Improve fuel efficiency by 3%', carbonImpact: 5, week: 4, completed: false, category: 'transport' },
      // Week 5-8: Energy
      { id: '5', title: 'Switch 5 bulbs to LED', description: 'Replace inefficient lighting', carbonImpact: 10, week: 5, completed: false, category: 'energy' },
      { id: '6', title: 'Reduce AC usage by 1 hour daily', description: 'Set thermostat 1 degree higher', carbonImpact: 18, week: 6, completed: false, category: 'energy' },
      { id: '7', title: 'Unplug devices when not in use', description: 'Eliminate phantom power draw', carbonImpact: 8, week: 7, completed: false, category: 'energy' },
      { id: '8', title: 'Air dry clothes instead of dryer', description: 'Use clothesline or rack', carbonImpact: 12, week: 8, completed: false, category: 'energy' },
      // Week 9-10: Food
      { id: '9', title: 'Try Meatless Monday', description: 'One plant-based day per week', carbonImpact: 6, week: 9, completed: false, category: 'food' },
      { id: '10', title: 'Reduce food waste by 25%', description: 'Plan meals, use leftovers', carbonImpact: 10, week: 10, completed: false, category: 'food' },
      { id: '11', title: 'Buy local produce 3 times', description: 'Reduce food miles', carbonImpact: 5, week: 11, completed: false, category: 'food' },
      // Week 12: Waste
      { id: '12', title: 'Set up a composting system', description: 'Compost food scraps and yard waste', carbonImpact: 15, week: 12, completed: false, category: 'waste' },
      { id: '13', title: 'Reduce single-use plastics', description: 'Use reusable bags and containers', carbonImpact: 8, week: 12, completed: false, category: 'waste' },
    ];

    const roadmapPlan: RoadmapPlan = {
      currentScore,
      targetScore,
      impactLevel,
      totalReduction: targetReduction,
      phases: [
        {
          name: '30-Day Quick Wins',
          period: 'Weeks 1-4',
          actions: actions.filter(a => a.week <= 4),
          target: Math.round(targetReduction * 0.25),
        },
        {
          name: '60-Day Energy & Food',
          period: 'Weeks 5-8',
          actions: actions.filter(a => a.week > 4 && a.week <= 8),
          target: Math.round(targetReduction * 0.25),
        },
        {
          name: '90-Day Lifestyle Shift',
          period: 'Weeks 9-12',
          actions: actions.filter(a => a.week > 8),
          target: Math.round(targetReduction * 0.5),
        },
      ],
    };

    // Load saved progress
    const saved = localStorage.getItem('ecotrack-roadmap');
    if (saved) {
      const savedRoadmap = JSON.parse(saved);
      roadmapPlan.phases.forEach(phase => {
        phase.actions.forEach(action => {
          const savedAction = savedRoadmap.actions?.find((a: RoadmapAction) => a.id === action.id);
          if (savedAction) action.completed = savedAction.completed;
        });
      });
    }

    setRoadmap(roadmapPlan);
  };

  const toggleAction = (actionId: string) => {
    if (!roadmap) return;
    const updated = { ...roadmap };
    updated.phases.forEach(phase => {
      phase.actions.forEach(action => {
        if (action.id === actionId) {
          action.completed = !action.completed;
        }
      });
    });
    setRoadmap(updated);
    localStorage.setItem('ecotrack-roadmap', JSON.stringify({
      actions: updated.phases.flatMap(p => p.actions),
    }));
  };

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  if (!roadmap) return null;

  const completedActions = roadmap.phases.flatMap(p => p.actions).filter(a => a.completed).length;
  const totalActions = roadmap.phases.flatMap(p => p.actions).length;
  const progressPercent = Math.round((completedActions / totalActions) * 100);

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4">
            <MapPin className="h-8 w-8 text-teal-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Your Sustainability Roadmap</h1>
          <p className={`text-lg ${muted}`}>Personalized action plan to reduce your carbon footprint</p>
        </div>

        {/* Current Status */}
        <div className="grid sm:grid-cols-4 gap-4 mb-8">
          <div className={`${card} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span className={`text-sm ${muted}`}>Current Score</span>
            </div>
            <div className="text-2xl font-bold text-blue-500">{roadmap.currentScore.toLocaleString()} kg</div>
          </div>
          <div className={`${card} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className={`text-sm ${muted}`}>Target Score</span>
            </div>
            <div className="text-2xl font-bold text-green-500">{roadmap.targetScore.toLocaleString()} kg</div>
          </div>
          <div className={`${card} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
              <Leaf className="h-5 w-5 text-emerald-500" />
              <span className={`text-sm ${muted}`}>Reduction Target</span>
            </div>
            <div className="text-2xl font-bold text-emerald-500">{roadmap.totalReduction.toLocaleString()} kg</div>
          </div>
          <div className={`${card} rounded-2xl p-5 border`}>
            <div className="flex items-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-amber-500" />
              <span className={`text-sm ${muted}`}>Impact Level</span>
            </div>
            <div className={`text-2xl font-bold ${roadmap.impactLevel === 'Critical' ? 'text-red-500' : roadmap.impactLevel === 'High' ? 'text-orange-500' : roadmap.impactLevel === 'Moderate' ? 'text-amber-500' : 'text-green-500'}`}>{roadmap.impactLevel}</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className={`${card} rounded-2xl p-5 border mb-8`}>
          <div className="flex items-center justify-between mb-3">
            <span className={`font-semibold ${text}`}>Roadmap Progress</span>
            <span className={`text-sm ${muted}`}>{completedActions} / {totalActions} actions completed</span>
          </div>
          <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-teal-500 rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className={muted}>Started</span>
            <span className="text-green-500 font-medium">{progressPercent}% Complete</span>
            <span className={muted}>Goal Reached</span>
          </div>
        </div>

        {/* Timeline Phases */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" aria-hidden="true" />

          <div className="space-y-8">
            {roadmap.phases.map((phase, phaseIndex) => {
              const phaseCompleted = phase.actions.filter(a => a.completed).length;
              const phaseTotal = phase.actions.length;
              const phaseProgress = Math.round((phaseCompleted / phaseTotal) * 100);

              return (
                <div key={phase.name} className="relative pl-16">
                  {/* Timeline dot */}
                  <div className={`absolute left-4 w-5 h-5 rounded-full border-4 ${phaseIndex === 0 ? 'bg-green-500 border-green-300' : phaseProgress === 100 ? 'bg-green-500 border-green-300' : 'bg-gray-300 border-gray-200 dark:bg-gray-600 dark:border-gray-700'}`} aria-hidden="true" />

                  <div className={`${card} rounded-2xl border overflow-hidden`}>
                    <div className={`p-5 border-b ${darkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className={`font-semibold ${text}`}>{phase.name}</h2>
                          <p className={`text-sm ${muted}`}>{phase.period}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-green-500">{phaseProgress}%</div>
                          <div className={`text-xs ${muted}`}>{phaseCompleted}/{phaseTotal} actions</div>
                        </div>
                      </div>
                      <div className="mt-3 h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className="h-full bg-green-500 rounded-full transition-all duration-500"
                          style={{ width: `${phaseProgress}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      {phase.actions.map(action => {
                        const Icon = categoryIcons[action.category];
                        return (
                          <button
                            key={action.id}
                            onClick={() => toggleAction(action.id)}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all ${
                              action.completed
                                ? darkMode ? 'bg-green-500/10' : 'bg-green-50'
                                : darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                            } text-left`}
                          >
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              action.completed ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-600' : 'bg-gray-200'
                            }`}>
                              {action.completed ? (
                                <CheckCircle className="h-4 w-4" />
                              ) : (
                                <Icon className="h-4 w-4 text-gray-400" />
                              )}
                            </div>
                            <div className="flex-1">
                              <p className={`font-medium text-sm ${action.completed ? 'text-green-500' : text}`}>
                                {action.title}
                              </p>
                              <p className={`text-xs ${muted}`}>{action.description}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-green-500 font-medium">-{action.carbonImpact} kg</span>
                              <ChevronRight className={`h-4 w-4 ${muted}`} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Annual Prediction */}
        <div className={`mt-8 p-6 rounded-2xl ${darkMode ? 'bg-gradient-to-r from-green-500/20 to-teal-500/20 border-green-500/20' : 'bg-gradient-to-r from-green-50 to-teal-50 border-green-100'} border`}>
          <h3 className={`font-semibold ${text} mb-3`}>Estimated Annual Impact</h3>
          <p className={`text-sm ${muted} mb-4`}>
            If you complete all actions in this roadmap, you could reduce your annual carbon footprint by:
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-green-500">{roadmap.totalReduction.toLocaleString()}</span>
            <span className={muted}>kg CO2e per year</span>
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <span className="text-lg">🌳</span>
              <span className={`text-sm ${text}`}>{Math.round(roadmap.totalReduction / 25)} trees planted equivalent</span>
            </div>
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <span className="text-lg">🚗</span>
              <span className={`text-sm ${text}`}>{Math.round(roadmap.totalReduction / 0.12).toLocaleString()} km not driven</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link
            to="/calculator"
            className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
          >
            Recalculate Carbon Score
          </Link>
          <Link
            to="/challenges"
            className={`px-6 py-2.5 rounded-xl font-medium ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}
          >
            Start a Challenge
          </Link>
        </div>
      </div>
    </div>
  );
}
