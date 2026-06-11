import { useState } from 'react';
import { Calendar, Download, Leaf, Target, Trophy, BookOpen, TrendingUp, TrendingDown, ChevronRight, RefreshCw, FileText } from 'lucide-react';
import { useTheme, useData } from '../App';

export default function WeeklyReportPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();
  const [generating, setGenerating] = useState(false);
  const [report, setReport] = useState<null | {
    weekStart: string;
    weekEnd: string;
    summary: {
      carbonChange: number;
      goalsCompleted: number;
      challengesCompleted: number;
      learningProgress: number;
      ecoPointsEarned: number;
    };
    highlights: string[];
    recommendations: string[];
    nextWeekGoals: string[];
  }>(null);

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const generateReport = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weekEnd = new Date();

    setReport({
      weekStart: weekStart.toLocaleDateString(),
      weekEnd: weekEnd.toLocaleDateString(),
      summary: {
        carbonChange: -5.2,
        goalsCompleted: 3,
        challengesCompleted: 4,
        learningProgress: 12,
        ecoPointsEarned: 185,
      },
      highlights: [
        'Completed 4 sustainability challenges - your best week yet!',
        'Reduced daily electricity usage by tracking consumption',
        'Started the Renewable Energy learning module',
        'Maintained a 7-day streak for the first time',
      ],
      recommendations: [
        'Consider trying a public transport challenge to diversify your impact',
        'Your food choices show room for improvement - try Meatless Monday',
        'Complete the current learning module to unlock advanced content',
        'Set a weekly goal for water conservation',
      ],
      nextWeekGoals: [
        'Reduce carbon footprint by an additional 3%',
        'Complete 5 challenges across different categories',
        'Finish the Renewable Energy learning module',
        'Maintain your streak and earn EcoLeader badge',
      ],
    });

    setGenerating(false);
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-500/20 mb-4">
            <Calendar className="h-8 w-8 text-indigo-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Weekly Sustainability Report</h1>
          <p className={`text-lg ${muted}`}>Track your progress and plan for the week ahead</p>
        </div>

        {!report ? (
          <div className={`${card} rounded-2xl p-8 border text-center`}>
            <FileText className={`h-16 w-16 ${muted} mx-auto mb-4`} />
            <h2 className={`text-xl font-semibold ${text} mb-2`}>Generate Your Weekly Report</h2>
            <p className={`text-sm ${muted} mb-6 max-w-md mx-auto`}>
              We'll analyze your activity from the past 7 days and create a personalized sustainability report with recommendations.
            </p>
            <button
              onClick={generateReport}
              disabled={generating}
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" />
                  Generating Report...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Generate Weekly Report
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Report Header */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className={`font-semibold ${text}`}>Sustainability Report</h2>
                  <p className={`text-sm ${muted}`}>{report.weekStart} - {report.weekEnd}</p>
                </div>
                <button
                  onClick={generateReport}
                  className={`flex items-center gap-1.5 text-sm text-green-500 hover:text-green-400`}
                >
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </button>
              </div>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { label: 'Carbon Change', value: `${report.summary.carbonChange}%`, icon: Leaf, color: report.summary.carbonChange < 0 ? 'text-green-500' : 'text-red-500', trend: report.summary.carbonChange < 0 },
                { label: 'Goals Done', value: report.summary.goalsCompleted, icon: Target, color: 'text-blue-500' },
                { label: 'Challenges', value: report.summary.challengesCompleted, icon: Trophy, color: 'text-amber-500' },
                { label: 'Learning', value: `${report.summary.learningProgress}%`, icon: BookOpen, color: 'text-purple-500' },
                { label: 'EcoPoints', value: `+${report.summary.ecoPointsEarned}`, icon: TrendingUp, color: 'text-green-500' },
              ].map(stat => (
                <div key={stat.label} className={`${card} rounded-xl p-4 text-center`}>
                  <stat.icon className={`h-5 w-5 ${stat.color} mx-auto mb-2`} />
                  <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className={`text-xs ${muted}`}>{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Highlights */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <h3 className={`font-semibold ${text} mb-4`}>Weekly Highlights</h3>
              <ul className="space-y-3">
                {report.highlights.map((highlight, i) => (
                  <li key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-green-500 font-bold">{i + 1}</span>
                    </div>
                    <span className={`text-sm ${muted}`}>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <h3 className={`font-semibold ${text} mb-4`}>Personalized Recommendations</h3>
              <div className="space-y-3">
                {report.recommendations.map((rec, i) => (
                  <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                    <ChevronRight className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className={`text-sm ${muted}`}>{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Next Week Goals */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <h3 className={`font-semibold ${text} mb-4`}>Goals for Next Week</h3>
              <ul className="space-y-3">
                {report.nextWeekGoals.map((goal, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <Target className="h-4 w-4 text-blue-500 flex-shrink-0" />
                    <span className={`text-sm ${muted}`}>{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download CTA */}
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-green-500/10 border-green-500/20' : 'bg-green-50 border-green-100'} border text-center`}>
              <FileText className="h-10 w-10 text-green-500 mx-auto mb-3" />
              <p className={`font-semibold ${text} mb-2`}>Download Full Report</p>
              <p className={`text-sm ${muted} mb-4`}>Save a detailed PDF for your records or sharing</p>
              <button
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors"
              >
                <Download className="h-4 w-4" />
                Download PDF Report
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
