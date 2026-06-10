import { useState } from 'react';
import { useTheme } from '../App';
import {
  Zap,
  DollarSign,
  TrendingDown,
  Lightbulb,
  AlertCircle,
  Calculator,
  BarChart3,
  Leaf,
  CheckCircle,
} from 'lucide-react';

export default function ElectricityAnalyzerPage() {
  const { darkMode } = useTheme();
  const [billAmount, setBillAmount] = useState('');
  const [unitsConsumed, setUnitsConsumed] = useState('');
  const [result, setResult] = useState<{
    carbonEmissions: number;
    efficiency: string;
    suggestions: string[];
    costSavings: number;
  } | null>(null);

  const calculateAnalysis = () => {
    const bill = parseFloat(billAmount) || 0;
    const units = parseFloat(unitsConsumed) || 0;

    // Carbon emissions calculation (kg CO2)
    // Average emission factor: 0.5 kg CO2 per kWh
    const carbonEmissions = units * 0.5;

    // Efficiency calculation
    const costPerUnit = bill / units;
    let efficiency = 'Average';
    if (costPerUnit < 0.1) efficiency = 'Excellent';
    else if (costPerUnit < 0.15) efficiency = 'Good';
    else if (costPerUnit > 0.2) efficiency = 'Poor';

    // Generate suggestions based on consumption
    const suggestions: string[] = [];
    if (units > 300) {
      suggestions.push('Consider switching to LED bulbs throughout your home');
      suggestions.push('Your consumption is above average - conduct an energy audit');
      suggestions.push('Install smart power strips to reduce phantom loads');
    }
    if (units > 500) {
      suggestions.push('Consider installing solar panels for renewable energy');
      suggestions.push('Evaluate your air conditioning usage patterns');
      suggestions.push('Upgrade to energy-efficient appliances (5-star rated)');
    }
    if (units <= 200) {
      suggestions.push('Great job! Your consumption is below average');
      suggestions.push('Consider renewable energy certifications');
    }
    suggestions.push('Use natural light during daytime hours');
    suggestions.push('Set AC temperature to 24-26°C for optimal efficiency');

    // Potential savings calculation
    const averageCost = 0.12;
    const potentialSavings = Math.max(0, (costPerUnit - averageCost) * units);

    setResult({
      carbonEmissions,
      efficiency,
      suggestions,
      costSavings: potentialSavings,
    });
  };

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 mb-6">
            <Zap className="h-8 w-8 text-amber-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Electricity Bill Analyzer
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Analyze your electricity consumption and discover ways to save energy and reduce costs.
          </p>
        </div>

        {/* Input Form */}
        <div
          className={`${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } rounded-2xl p-8 shadow-sm mb-8`}
        >
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <DollarSign className="h-4 w-4 text-green-500" />
                <span>Monthly Bill Amount ($)</span>
              </label>
              <input
                type="number"
                value={billAmount}
                onChange={(e) => setBillAmount(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-amber-500'
                } focus:ring-2 focus:ring-amber-500/20 transition-all duration-200`}
                placeholder="150"
              />
            </div>
            <div>
              <label
                className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                <BarChart3 className="h-4 w-4 text-blue-500" />
                <span>Units Consumed (kWh)</span>
              </label>
              <input
                type="number"
                value={unitsConsumed}
                onChange={(e) => setUnitsConsumed(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border ${
                  darkMode
                    ? 'bg-gray-700 border-gray-600 text-white focus:border-amber-500'
                    : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-amber-500'
                } focus:ring-2 focus:ring-amber-500/20 transition-all duration-200`}
                placeholder="250"
              />
            </div>
          </div>

          <button
            onClick={calculateAnalysis}
            className="w-full mt-6 flex items-center justify-center px-6 py-3 bg-amber-500 text-white font-semibold rounded-xl hover:bg-amber-600 transition-all duration-200"
          >
            <Calculator className="h-5 w-5 mr-2" />
            Analyze Consumption
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid md:grid-cols-3 gap-4">
              <div
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-6 shadow-sm text-center`}
              >
                <div className="inline-flex p-3 rounded-xl bg-amber-500/10 mb-4">
                  <Zap className="h-6 w-6 text-amber-500" />
                </div>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {result.carbonEmissions.toFixed(1)}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  kg CO₂ Emissions
                </p>
              </div>

              <div
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-6 shadow-sm text-center`}
              >
                <div className="inline-flex p-3 rounded-xl bg-green-500/10 mb-4">
                  <Leaf className="h-6 w-6 text-green-500" />
                </div>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {result.efficiency}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Energy Efficiency
                </p>
              </div>

              <div
                className={`${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } rounded-xl p-6 shadow-sm text-center`}
              >
                <div className="inline-flex p-3 rounded-xl bg-blue-500/10 mb-4">
                  <TrendingDown className="h-6 w-6 text-blue-500" />
                </div>
                <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  ${result.costSavings.toFixed(0)}
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Potential Monthly Savings
                </p>
              </div>
            </div>

            {/* Suggestions */}
            <div
              className={`${
                darkMode ? 'bg-gray-800' : 'bg-white'
              } rounded-2xl p-6 shadow-sm`}
            >
              <div className="flex items-center space-x-2 mb-6">
                <Lightbulb className="h-6 w-6 text-amber-500" />
                <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Energy-Saving Suggestions
                </h2>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {result.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-3 p-4 rounded-xl ${
                      darkMode ? 'bg-gray-700' : 'bg-gray-50'
                    }`}
                  >
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Environmental Impact */}
            <div
              className={`flex items-center space-x-4 p-4 rounded-xl ${
                darkMode ? 'bg-green-500/10' : 'bg-green-50'
              }`}
            >
              <AlertCircle className="h-6 w-6 text-green-500" />
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Environmental Impact
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Reducing your electricity by 10% would save approximately{' '}
                  <strong className="text-green-500">{(result.carbonEmissions * 0.1).toFixed(1)} kg CO₂</strong> per
                  month.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
