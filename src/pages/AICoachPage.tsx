import { useState, useRef, useEffect } from 'react';
import { useTheme } from '../App';
import {
  Send,
  Bot,
  User,
  Leaf,
  Lightbulb,
  Target,
  TrendingDown,
  AlertCircle,
} from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  sections?: {
    title: string;
    content: string;
    icon: 'analysis' | 'suggestion' | 'goal' | 'impact';
  }[];
}

interface ResponseTemplate {
  keywords: string[];
  impactLevel: 'Very Low' | 'Low' | 'Medium' | 'High' | 'Very High';
  assessment: string;
  suggestions: string[];
  weeklyGoal: string;
  potentialSavings: string;
}

export default function AICoachPage() {
  const { darkMode } = useTheme();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI Sustainability Coach. Tell me about your daily lifestyle habits - such as transportation, energy use, diet, or water consumption - and I'll provide personalized recommendations to help you reduce your environmental impact.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Response templates based on lifestyle factors
  const responseTemplates: ResponseTemplate[] = [
    {
      keywords: ['car', 'drive', 'driving', 'vehicle', 'automobile', 'petrol', 'diesel', 'gas'],
      impactLevel: 'High',
      assessment: 'Personal vehicle usage is one of the largest contributors to individual carbon footprints. A typical car emits approximately 21 kg CO2 per 100km traveled.',
      suggestions: [
        'Consider carpooling or ridesharing to reduce per-person emissions',
        'If feasible, switch to an electric or hybrid vehicle',
        'Use public transportation for at least 2 trips per week',
        'Plan and combine multiple errands into single trips',
        'Maintain proper tire pressure and regular servicing for efficiency'
      ],
      weeklyGoal: 'Replace 2 car trips with public transport or cycling',
      potentialSavings: '15-25% reduction in transportation emissions'
    },
    {
      keywords: ['ac', 'air conditioner', 'air conditioning', 'cooling', 'heater', 'heating', 'hvac'],
      impactLevel: 'High',
      assessment: 'Heating and cooling systems typically account for 40-50% of household energy consumption. Running AC for extended hours significantly increases carbon footprint.',
      suggestions: [
        'Set AC temperature to 24-26°C instead of lower settings',
        'Use ceiling fans to circulate cool air more efficiently',
        'Install blackout curtains to reduce heat gain',
        'Consider a programmable thermostat to optimize usage',
        'Service AC units regularly for optimal efficiency'
      ],
      weeklyGoal: 'Reduce AC usage by 2 hours daily',
      potentialSavings: '10-15% reduction in energy emissions'
    },
    {
      keywords: ['electricity', 'electric', 'power', 'energy', 'lights', 'appliances'],
      impactLevel: 'Medium',
      assessment: 'Electricity consumption varies by region and energy source. In areas with fossil-fuel grids, each kWh generates approximately 0.4-0.8 kg CO2.',
      suggestions: [
        'Switch to LED bulbs throughout your home',
        'Unplug devices when not in use to avoid phantom loads',
        'Use natural daylight during daytime hours',
        'Run dishwashers and washing machines with full loads',
        'Consider renewable energy options from your utility provider'
      ],
      weeklyGoal: 'Reduce daily electricity usage by 10%',
      potentialSavings: '5-10% reduction in overall emissions'
    },
    {
      keywords: ['meat', 'beef', 'chicken', 'non-veg', 'nonvegetarian', 'meat eater'],
      impactLevel: 'High',
      assessment: 'Meat consumption, especially beef, has a significant environmental impact. Beef production generates approximately 27 kg CO2 per kg of meat, much higher than plant-based alternatives.',
      suggestions: [
        'Start with "Meatless Mondays" to gradually reduce meat consumption',
        'Try plant-based protein alternatives like lentils, beans, and tofu',
        'When eating meat, choose poultry over red meat when possible',
        'Reduce portion sizes of meat and increase vegetable portions',
        'Explore new vegetarian recipes to make the transition enjoyable'
      ],
      weeklyGoal: 'Replace 3 meat-based meals with plant-based alternatives',
      potentialSavings: '20-30% reduction in dietary emissions'
    },
    {
      keywords: ['vegetarian', 'vegan', 'plant-based', 'veggie', 'no meat'],
      impactLevel: 'Low',
      assessment: 'Great choice! A plant-based diet generates approximately 2.5 kg CO2 per day, significantly lower than meat-heavy diets. You\'re already making a positive impact.',
      suggestions: [
        'Focus on locally-sourced produce to reduce food miles',
        'Minimize food waste by meal planning and proper storage',
        'Consider growing some of your own herbs and vegetables',
        'Choose seasonal produce for lower carbon footprint',
        'Continue spreading awareness about plant-based benefits'
      ],
      weeklyGoal: 'Try one new plant-based recipe this week',
      potentialSavings: 'Additional 5-10% reduction through local sourcing'
    },
    {
      keywords: ['water', 'shower', 'bath', 'tap', 'faucet'],
      impactLevel: 'Medium',
      assessment: 'Water consumption impacts carbon footprint through the energy required for heating, pumping, and treatment. A typical 10-minute shower uses about 95 liters of water.',
      suggestions: [
        'Install low-flow showerheads to reduce water by up to 40%',
        'Take shorter showers - target 5 minutes maximum',
        'Fix dripping taps immediately (can waste 20+ liters daily)',
        'Collect rainwater for garden irrigation',
        'Use a bucket for car washing instead of a running hose'
      ],
      weeklyGoal: 'Limit all showers to 5 minutes',
      potentialSavings: '15-20% reduction in water-related emissions'
    },
    {
      keywords: ['bus', 'train', 'metro', 'public transport', 'transit', 'subway'],
      impactLevel: 'Low',
      assessment: 'Excellent! Public transportation is one of the most effective ways to reduce your carbon footprint. Buses emit approximately 89g CO2 per passenger-km, much lower than private cars.',
      suggestions: [
        'Maximize public transport usage for daily commutes',
        'Consider a monthly pass for better value and convenience',
        'Plan trips using transit apps for optimal routes',
        'Encourage colleagues to use public transport together',
        'Share your positive experience to inspire others'
      ],
      weeklyGoal: 'Use public transport for all weekday commutes',
      potentialSavings: 'You\'re already saving 50-70% compared to driving'
    },
    {
      keywords: ['bike', 'bicycle', 'cycle', 'cycling', 'walk', 'walking'],
      impactLevel: 'Very Low',
      assessment: 'Fantastic! Active transportation like cycling and walking produces zero direct emissions and offers significant health benefits. You\'re a sustainability champion!',
      suggestions: [
        'Plan safe cycling routes using bike maps and apps',
        'Ensure your bike is well-maintained for safe riding',
        'Consider electric bikes for longer distances or hilly terrain',
        'Join cycling communities for motivation and tips',
        'Advocate for better cycling infrastructure in your area'
      ],
      weeklyGoal: 'Maintain your active transportation streak',
      potentialSavings: 'You\'ve eliminated transportation emissions!'
    }
  ];

  // Generate intelligent response
  const generateResponse = (userInput: string): Message => {
    const input = userInput.toLowerCase();
    let matchedTemplate: ResponseTemplate | null = null;
    let allKeywords: string[] = [];

    // Find matching template
    for (const template of responseTemplates) {
      allKeywords = [...allKeywords, ...template.keywords];
      if (template.keywords.some(keyword => input.includes(keyword))) {
        matchedTemplate = template;
        break;
      }
    }

    // If no specific match, provide a general response
    if (!matchedTemplate) {
      return {
        id: Date.now(),
        type: 'ai',
        content: "Based on your input, here are some general sustainability recommendations:",
        sections: [
          {
            title: 'Getting Started',
            content: 'To receive personalized recommendations, try sharing details about your:\n• Daily transportation (car, bus, cycling, walking)\n• Energy usage (AC, electricity, heating)\n• Diet preferences (vegetarian, meat consumption)\n• Water usage habits',
            icon: 'analysis',
          },
          {
            title: 'Quick Wins',
            content: '1. Switch to LED bulbs throughout your home\n2. Take shorter showers (5 min max)\n3. Use reusable bags and bottles\n4. Plan errands to reduce car trips\n5. Eat one plant-based meal daily',
            icon: 'suggestion',
          },
          {
            title: 'Weekly Goal',
            content: 'Start with our "Meatless Monday" or "No Car Day" challenge. Small steps lead to big changes!',
            icon: 'goal',
          },
          {
            title: 'Expected Impact',
            content: 'Making even small changes consistently can reduce your carbon footprint by 15-20% over time.',
            icon: 'impact',
          },
        ],
      };
    }

    // Create personalized response from matched template
    const relevantKeywords = matchedTemplate.keywords.filter(k => input.includes(k));
    const keywordContext = relevantKeywords.length > 0 ? ` (related to: ${relevantKeywords.join(', ')})` : '';

    // Select 3-4 suggestions based on context
    const selectedSuggestions = matchedTemplate.suggestions.slice(0, 4);

    return {
      id: Date.now(),
      type: 'ai',
      content: `I've analyzed your lifestyle input${keywordContext}. Here's my personalized assessment:`,
      sections: [
        {
          title: `Impact Assessment: ${matchedTemplate.impactLevel}`,
          content: matchedTemplate.assessment,
          icon: 'analysis',
        },
        {
          title: 'Recommended Actions',
          content: selectedSuggestions.map((s, i) => `${i + 1}. ${s}`).join('\n'),
          icon: 'suggestion',
        },
        {
          title: 'Weekly Goal',
          content: matchedTemplate.weeklyGoal,
          icon: 'goal',
        },
        {
          title: 'Potential Impact',
          content: matchedTemplate.potentialSavings,
          icon: 'impact',
        },
      ],
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateResponse(input);
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // 1.5-2.5 seconds
  };

  const getIcon = (icon: string) => {
    switch (icon) {
      case 'analysis':
        return <AlertCircle className="h-5 w-5 text-blue-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-amber-500" />;
      case 'goal':
        return <Target className="h-5 w-5 text-green-500" />;
      case 'impact':
        return <TrendingDown className="h-5 w-5 text-purple-500" />;
      default:
        return <Leaf className="h-5 w-5 text-green-500" />;
    }
  };

  const quickPrompts = [
    "I drive 20km daily and use AC for 8 hours",
    "I eat meat with most meals",
    "I want to reduce my electricity bill",
    "I use public transport daily",
    "I'm vegetarian and want to do more",
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)]">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
              <Bot className="h-7 w-7 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-500 items-center justify-center flex">
              <Leaf className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              AI Sustainability Coach
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Get personalized recommendations for a greener lifestyle
            </p>
          </div>
        </div>

        {/* Chat Container */}
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl shadow-sm flex flex-col h-[calc(100%-6rem)]`}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex items-start space-x-3 max-w-[85%] ${
                    message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      message.type === 'user'
                        ? 'bg-green-500'
                        : darkMode
                        ? 'bg-gray-700'
                        : 'bg-gray-100'
                    }`}
                  >
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                    )}
                  </div>
                  <div>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-green-500 text-white'
                          : darkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* AI Response Sections */}
                    {message.sections && (
                      <div className="mt-4 space-y-3">
                        {message.sections.map((section, index) => (
                          <div
                            key={index}
                            className={`rounded-xl p-4 ${
                              darkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center space-x-2 mb-2">
                              {getIcon(section.icon)}
                              <span
                                className={`font-medium ${
                                  darkMode ? 'text-white' : 'text-gray-900'
                                }`}
                              >
                                {section.title}
                              </span>
                            </div>
                            <p
                              className={`text-sm whitespace-pre-line ${
                                darkMode ? 'text-gray-300' : 'text-gray-600'
                              }`}
                            >
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex items-start space-x-3">
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <Bot className={`h-4 w-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-100'
                    }`}
                  >
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-bounce" />
                      <div
                        className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                        style={{ animationDelay: '0.1s' }}
                      />
                      <div
                        className="w-2 h-2 rounded-full bg-green-500 animate-bounce"
                        style={{ animationDelay: '0.2s' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className={`px-6 py-3 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <p className={`text-xs mb-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
              Try asking about:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setInput(prompt)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className={`p-4 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
          >
            <div className="flex space-x-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Tell me about your daily habits..."
                className={`flex-1 px-4 py-3 rounded-xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-green-500'
                } focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
