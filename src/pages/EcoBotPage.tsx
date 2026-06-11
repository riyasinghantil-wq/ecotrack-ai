import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, Target, Lightbulb, Trophy, Sparkles, RefreshCw } from 'lucide-react';
import { useTheme, useData } from '../App';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  assessment?: {
    impactLevel: string;
    assessment: string;
    actions: string[];
    weeklyChallenge: string;
    carbonReduction: string;
  };
}

const suggestedPrompts = [
  "How can I reduce my transportation emissions?",
  "What are the best sustainable food choices?",
  "How do I lower my electricity bill sustainably?",
  "Give me a weekly eco challenge",
  "Explain carbon offsetting",
  "Tips for reducing water waste at home",
];

const ecoResponses: Record<string, (input: string, score: number) => Message['assessment']> = {
  transport: (input, score) => ({
    impactLevel: score > 5000 ? 'High Impact' : score > 2500 ? 'Moderate Impact' : 'Low Impact',
    assessment: `Your transportation habits contribute significantly to your carbon footprint. Based on your current score of ${score} kg CO₂/year, optimizing transport could reduce your emissions by 15-25%.`,
    actions: [
      'Switch to public transit 2-3 times per week',
      'Consider carpooling for daily commutes',
      'If possible, bike or walk for trips under 5km',
      'Maintain proper tire pressure for better fuel efficiency',
    ],
    weeklyChallenge: 'No-Car Thursday: Use alternative transportation for one day this week',
    carbonReduction: '~400 kg CO₂/year',
  }),
  food: (input, score) => ({
    impactLevel: score > 6000 ? 'High Impact' : score > 3000 ? 'Moderate Impact' : 'Low Impact',
    assessment: `Dietary choices have a substantial environmental impact. Your current patterns suggest room for improvement in reducing meat consumption and food waste.`,
    actions: [
      'Try Meatless Mondays to start',
      'Shop locally to reduce food miles',
      'Plan meals to reduce food waste',
      'Choose seasonal produce when possible',
    ],
    weeklyChallenge: 'Plant-Based Week: Try 3 fully plant-based meals this week',
    carbonReduction: '~300 kg CO₂/year',
  }),
  energy: (input, score) => ({
    impactLevel: score > 4000 ? 'High Impact' : score > 2000 ? 'Moderate Impact' : 'Low Impact',
    assessment: `Your household energy consumption patterns show opportunities for efficiency improvements. Small changes can lead to significant savings.`,
    actions: [
      'Switch to LED bulbs throughout your home',
      'Use a programmable thermostat',
      'Unplug devices when not in use',
      'Air dry clothes instead of using dryer',
    ],
    weeklyChallenge: 'Power-Down Hour: Turn off all non-essential electronics for 1 hour daily',
    carbonReduction: '~350 kg CO₂/year',
  }),
  water: (input, score) => ({
    impactLevel: 'Moderate Impact',
    assessment: 'Water conservation directly impacts energy use for heating and treatment. Simple habit changes can make a big difference.',
    actions: [
      'Take shorter showers (aim for 5 minutes)',
      'Fix leaky faucets promptly',
      'Use low-flow showerheads',
      'Collect rainwater for plants',
    ],
    weeklyChallenge: '5-Minute Shower Challenge: Time your showers all week',
    carbonReduction: '~150 kg CO₂/year',
  }),
  general: (input, score) => ({
    impactLevel: score > 5000 ? 'Significant Opportunity' : score > 2000 ? 'Moderate Opportunity' : 'Good Progress',
    assessment: `Based on your sustainability goals, I can provide personalized recommendations. Your current carbon score is ${score} kg CO₂/year.`,
    actions: [
      'Complete one eco challenge per week',
      'Track your daily activities in the carbon tracker',
      'Engage with learning modules for deeper knowledge',
      'Set specific, measurable sustainability goals',
    ],
    weeklyChallenge: 'Sustainability Audit: Review your habits and identify 3 areas for improvement',
    carbonReduction: '~200 kg CO₂/year',
  }),
};

function getResponseCategory(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes('transport') || lower.includes('car') || lower.includes('drive') || lower.includes('commute') || lower.includes('flight') || lower.includes('travel')) return 'transport';
  if (lower.includes('food') || lower.includes('diet') || lower.includes('meat') || lower.includes('vegetable') || lower.includes('eat') || lower.includes('meal')) return 'food';
  if (lower.includes('energy') || lower.includes('electric') || lower.includes('power') || lower.includes('solar') || lower.includes('appliance') || lower.includes('heat')) return 'energy';
  if (lower.includes('water') || lower.includes('shower') || lower.includes('tap') || lower.includes('bath')) return 'water';
  return 'general';
}

export default function EcoBotPage() {
  const { darkMode } = useTheme();
  const { userData } = useData();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m EcoBot, your AI sustainability mentor. I can help you understand your carbon footprint, provide personalized recommendations, suggest weekly challenges, and guide you toward a more sustainable lifestyle. What would you like to explore today?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    await new Promise(r => setTimeout(r, 1500 + Math.random() * 1000));

    const category = getResponseCategory(input);
    const assessment = ecoResponses[category](input, userData.carbonScore || 2500);

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: `I've analyzed your query about ${category === 'general' ? 'sustainability' : category}. Here's my assessment:`,
      assessment,
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsTyping(false);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500/20 mb-4">
            <Bot className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>EcoBot AI Climate Mentor</h1>
          <p className={`text-lg ${muted}`}>Your personal sustainability advisor for reducing carbon footprint</p>
        </div>

        {/* Chat Container */}
        <div className={`${card} rounded-2xl border shadow-lg overflow-hidden`}>
          {/* Messages */}
          <div className="h-[400px] sm:h-[500px] overflow-y-auto p-4 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-green-500" />
                  </div>
                )}
                <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === 'user'
                        ? 'bg-green-500 text-white'
                        : darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <p className={`text-sm ${message.role === 'user' ? 'text-white' : text}`}>{message.content}</p>
                  </div>

                  {message.assessment && (
                    <div className={`mt-3 rounded-xl p-4 ${darkMode ? 'bg-gray-700/50' : 'bg-green-50'} border ${darkMode ? 'border-gray-600' : 'border-green-100'}`}>
                      <div className="grid gap-3">
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4 text-green-500" />
                          <span className={`text-xs font-semibold ${muted}`}>Impact Level:</span>
                          <span className={`text-xs font-bold text-green-500`}>{message.assessment.impactLevel}</span>
                        </div>
                        <p className={`text-sm ${muted}`}>{message.assessment.assessment}</p>

                        <div className="flex items-start gap-2 mt-2">
                          <Lightbulb className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className={`text-xs font-semibold ${text} mb-1`}>Recommended Actions:</p>
                            <ul className="space-y-1">
                              {message.assessment.actions.map((action, i) => (
                                <li key={i} className={`text-xs ${muted} flex gap-1.5`}>
                                  <span className="text-green-500">-</span>{action}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                          <Trophy className="h-4 w-4 text-purple-500" />
                          <span className={`text-xs ${text}`}>Weekly Challenge: </span>
                          <span className={`text-xs text-purple-500 font-medium`}>{message.assessment.weeklyChallenge}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-1">
                          <Leaf className="h-4 w-4 text-green-500" />
                          <span className={`text-xs ${text}`}>Estimated Reduction: </span>
                          <span className={`text-xs text-green-500 font-bold`}>{message.assessment.carbonReduction}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {message.role === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-blue-500" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-green-500" />
                </div>
                <div className={`rounded-2xl px-4 py-3 ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Prompts */}
          <div className={`px-4 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-xs ${muted} mb-2`}>Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedPrompts.slice(0, 3).map(prompt => (
                <button
                  key={prompt}
                  onClick={() => handlePromptClick(prompt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <form
              onSubmit={e => { e.preventDefault(); handleSend(); }}
              className="flex gap-3"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Ask EcoBot about sustainability..."
                className={`flex-1 px-4 py-2.5 rounded-xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500'
                } focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent`}
                aria-label="Message input"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {[
            { label: 'Your Carbon Score', value: userData.carbonScore || 0, unit: 'kg CO₂', icon: Leaf },
            { label: 'Eco Points', value: userData.ecoPoints || 0, unit: 'pts', icon: Trophy },
            { label: 'Challenges Done', value: (userData.completedChallenges?.length || 0), unit: '', icon: Target },
            { label: 'Current Streak', value: userData.streak || 0, unit: 'days', icon: Sparkles },
          ].map(stat => (
            <div key={stat.label} className={`${card} rounded-xl p-4 text-center`}>
              <stat.icon className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-500">{stat.value}{stat.unit && <span className="text-sm"> {stat.unit}</span>}</div>
              <div className={`text-xs ${muted}`}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
