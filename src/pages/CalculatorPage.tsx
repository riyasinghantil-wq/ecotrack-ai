import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme, useData } from '../App';
import {
  Calculator,
  Car,
  Bike,
  Bus,
  Train,
  Footprints,
  Zap,
  Thermometer,
  Utensils,
  Trash2,
  Droplets,
  ArrowRight,
  Leaf,
  AlertCircle,
  CheckCircle,
  Target,
  Award,
} from 'lucide-react';

interface FormData {
  transport: {
    car: number;
    bike: number;
    bus: number;
    metro: number;
    walking: number;
    cycling: number;
  };
  energy: {
    electricity: number;
    acHours: number;
    appliances: number;
  };
  food: string;
  waste: string;
  water: number;
}

export default function CalculatorPage() {
  const { darkMode } = useTheme();
  const { userData, setUserData } = useData();
  const [formData, setFormData] = useState<FormData>({
    transport: { car: 0, bike: 0, bus: 0, metro: 0, walking: 0, cycling: 0 },
    energy: { electricity: 0, acHours: 0, appliances: 0 },
    food: 'mixed',
    waste: 'medium',
    water: 100,
  });
  const [result, setResult] = useState<{
    daily: number;
    monthly: number;
    annual: number;
    rating: string;
    score: number;
    categoryScores: { name: string; value: number; color: string }[];
  } | null>(null);
  const [activeStep, setActiveStep] = useState(1);

  const handleChange = (category: keyof FormData, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [category]: typeof prev[category] === 'object' ? { ...prev[category], [field]: value } : value,
    }));
  };

  const calculateFootprint = () => {
    // Transportation emissions (kg CO2 per km)
    const transportEmissions =
      formData.transport.car * 0.21 +
      formData.transport.bike * 0.11 +
      formData.transport.bus * 0.089 +
      formData.transport.metro * 0.041 +
      formData.transport.walking * 0 +
      formData.transport.cycling * 0;

    // Energy emissions (kg CO2 per day)
    const energyEmissions =
      formData.energy.electricity * 0.0005 * 30 + // kWh to CO2
      formData.energy.acHours * 0.8 + // AC usage
      formData.energy.appliances * 0.3; // Other appliances

    // Food emissions (kg CO2 per day)
    const foodFactors: { [key: string]: number } = {
      vegetarian: 2.5,
      eggetarian: 3.2,
      mixed: 5.0,
      'non-vegetarian': 7.2,
    };
    const foodEmissions = foodFactors[formData.food] || 5.0;

    // Waste emissions (kg CO2 per day)
    const wasteFactors: { [key: string]: number } = {
      low: 0.3,
      medium: 0.6,
      high: 1.0,
    };
    const wasteEmissions = wasteFactors[formData.waste] || 0.6;

    // Water emissions (kg CO2 per day per 100L)
    const waterEmissions = formData.water * 0.003;

    const totalDaily = transportEmissions + energyEmissions + foodEmissions + wasteEmissions + waterEmissions;
    const totalMonthly = totalDaily * 30;
    const totalAnnual = totalDaily * 365;

    // Calculate sustainability score (0-100, higher is better)
    const avgDailyEmission = 15; // Global average
    const score = Math.max(0, Math.min(100, 100 - ((totalDaily - avgDailyEmission) / avgDailyEmission) * 50));

    let rating = 'Average';
    if (score >= 80) rating = 'Excellent';
    else if (score >= 60) rating = 'Good';
    else if (score >= 40) rating = 'Average';
    else if (score >= 20) rating = 'Needs Improvement';
    else rating = 'Critical';

    const categoryScores = [
      { name: 'Transport', value: Math.min(100, transportEmissions * 5), color: '#ef4444' },
      { name: 'Energy', value: Math.min(100, energyEmissions * 5), color: '#f59e0b' },
      { name: 'Food', value: foodEmissions * 10, color: '#22c55e' },
      { name: 'Waste', value: wasteEmissions * 30, color: '#3b82f6' },
      { name: 'Water', value: waterEmissions * 100, color: '#06b6d4' },
    ];

    setResult({
      daily: totalDaily,
      monthly: totalMonthly,
      annual: totalAnnual,
      rating,
      score: Math.round(score),
      categoryScores,
    });

    // Update global user data
    setUserData({
      ...userData,
      carbonScore: Math.round(totalDaily),
      sustainabilityLevel: rating,
      totalSaved: userData.totalSaved + Math.max(0, (avgDailyEmission - totalDaily) * 30),
      history: [
        ...userData.history,
        { date: new Date().toISOString().split('T')[0], score: Math.round(totalDaily) },
      ].slice(-30),
    });
  };

  const steps = [
    { id: 1, title: 'Transportation', icon: Car },
    { id: 2, title: 'Energy', icon: Zap },
    { id: 3, title: 'Food & Waste', icon: Utensils },
    { id: 4, title: 'Results', icon: Calculator },
  ];

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <Calculator className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Carbon Footprint Calculator
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Calculate your environmental impact based on your daily activities and lifestyle choices.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-10">
          <div className="flex items-center space-x-2 sm:space-x-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => step.id < 4 && setActiveStep(step.id)}
                  className={`flex flex-col items-center ${
                    activeStep >= step.id ? 'cursor-pointer' : 'cursor-default'
                  }`}
                  disabled={step.id === 4}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      activeStep === step.id
                        ? 'bg-green-500 text-white'
                        : activeStep > step.id
                        ? 'bg-green-500/20 text-green-500'
                        : darkMode
                        ? 'bg-gray-800 text-gray-500'
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span
                    className={`text-xs mt-2 hidden sm:block ${
                      activeStep === step.id
                        ? 'text-green-500 font-medium'
                        : darkMode
                        ? 'text-gray-500'
                        : 'text-gray-400'
                    }`}
                  >
                    {step.title}
                  </span>
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      activeStep > step.id
                        ? 'bg-green-500'
                        : darkMode
                        ? 'bg-gray-800'
                        : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Cards */}
        <div
          className={`rounded-2xl p-6 sm:p-8 shadow-sm ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } transition-colors duration-300`}
        >
          {/* Step 1: Transportation */}
          {activeStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <Car className="h-6 w-6 text-green-500" />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Daily Transportation (km per day)
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { field: 'car', label: 'Car', icon: Car, color: 'text-red-500' },
                  { field: 'bike', label: 'Motorbike', icon: Bike, color: 'text-orange-500' },
                  { field: 'bus', label: 'Bus', icon: Bus, color: 'text-blue-500' },
                  { field: 'metro', label: 'Metro/Train', icon: Train, color: 'text-purple-500' },
                  { field: 'walking', label: 'Walking', icon: Footprints, color: 'text-green-500' },
                  { field: 'cycling', label: 'Cycling', icon: Bike, color: 'text-emerald-500' },
                ].map((item) => (
                  <div key={item.field}>
                    <label
                      className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                        darkMode ? 'text-gray-300' : 'text-gray-700'
                      }`}
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                      <span>{item.label}</span>
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        value={formData.transport[item.field as keyof typeof formData.transport]}
                        onChange={(e) =>
                          handleChange('transport', item.field, parseFloat(e.target.value) || 0)
                        }
                        className={`w-full px-4 py-3 rounded-xl border ${
                          darkMode
                            ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                            : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                        } focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                        placeholder="0"
                      />
                      <span
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-sm ${
                          darkMode ? 'text-gray-500' : 'text-gray-400'
                        }`}
                      >
                        km/day
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setActiveStep(2)}
                className="w-full sm:w-auto flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                <span>Next: Energy Consumption</span>
                <ArrowRight className="h-5 w-5 ml-2" />
              </button>
            </div>
          )}

          {/* Step 2: Energy */}
          {activeStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="h-6 w-6 text-green-500" />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Energy Consumption
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Zap className="h-4 w-4 text-yellow-500" />
                    <span>Monthly Electricity Usage (kWh)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.energy.electricity}
                    onChange={(e) =>
                      handleChange('energy', 'electricity', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                    } focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                    placeholder="200"
                  />
                </div>

                <div>
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span>Daily AC Usage (hours)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="24"
                    value={formData.energy.acHours}
                    onChange={(e) =>
                      handleChange('energy', 'acHours', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                    } focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                    placeholder="0"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-2 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Zap className="h-4 w-4 text-blue-500" />
                    <span>Other Appliances Daily Usage (hours)</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.energy.appliances}
                    onChange={(e) =>
                      handleChange('energy', 'appliances', parseFloat(e.target.value) || 0)
                    }
                    className={`w-full px-4 py-3 rounded-xl border ${
                      darkMode
                        ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                        : 'bg-gray-50 border-gray-200 text-gray-900 focus:border-green-500'
                    } focus:ring-2 focus:ring-green-500/20 transition-all duration-200`}
                    placeholder="4"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveStep(1)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => setActiveStep(3)}
                  className="flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200"
                >
                  <span>Next: Food & Waste</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Food & Waste */}
          {activeStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <Utensils className="h-6 w-6 text-green-500" />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Food & Lifestyle
                </h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {/* Food Habits */}
                <div>
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Utensils className="h-4 w-4 text-orange-500" />
                    <span>Diet Type</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { value: 'vegetarian', label: 'Vegetarian' },
                      { value: 'eggetarian', label: 'Eggetarian' },
                      { value: 'mixed', label: 'Mixed' },
                      { value: 'non-vegetarian', label: 'Non-Vegetarian' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange('food', '', option.value)}
                        className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                          formData.food === option.value
                            ? 'bg-green-500 text-white'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Waste Generation */}
                <div>
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                    <span>Waste Generation</span>
                  </label>
                  <div className="space-y-2">
                    {[
                      { value: 'low', label: 'Low', desc: 'Minimal packaging, composting' },
                      { value: 'medium', label: 'Medium', desc: 'Average household waste' },
                      { value: 'high', label: 'High', desc: 'Excessive packaging, no recycling' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleChange('waste', '', option.value)}
                        className={`w-full px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          formData.waste === option.value
                            ? 'bg-green-500 text-white'
                            : darkMode
                            ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div
                          className={`text-xs ${
                            formData.waste === option.value
                              ? 'text-green-100'
                              : darkMode
                              ? 'text-gray-400'
                              : 'text-gray-500'
                          }`}
                        >
                          {option.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Water Usage */}
                <div className="sm:col-span-2">
                  <label
                    className={`flex items-center space-x-2 text-sm font-medium mb-3 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>Daily Water Consumption (liters)</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="500"
                    value={formData.water}
                    onChange={(e) => handleChange('water', '', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between mt-2">
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      50L
                    </span>
                    <span className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {formData.water}L
                    </span>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      500L
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveStep(2)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    calculateFootprint();
                    setActiveStep(4);
                  }}
                  className="flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200"
                >
                  <Calculator className="h-5 w-5 mr-2" />
                  Calculate Footprint
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Results */}
          {activeStep === 4 && result && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Carbon Footprint Results
                </h2>
              </div>

              {/* Main Score Card */}
              <div
                className={`${
                  darkMode ? 'bg-gradient-to-br from-gray-700 to-gray-800' : 'bg-gradient-to-br from-green-50 to-emerald-50'
                } rounded-2xl p-8 text-center`}
              >
                <div className="flex justify-center mb-6">
                  <div className="relative w-40 h-40">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={darkMode ? '#374151' : '#e5e7eb'}
                        strokeWidth="8"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke={result.score >= 60 ? '#22c55e' : result.score >= 40 ? '#f59e0b' : '#ef4444'}
                        strokeWidth="8"
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * result.score) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {result.score}
                      </span>
                      <span className="text-green-500 text-sm font-medium">Eco Score</span>
                    </div>
                  </div>
                </div>

                <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  result.score >= 60 ? 'bg-green-500/20 text-green-500' : result.score >= 40 ? 'bg-amber-500/20 text-amber-500' : 'bg-red-500/20 text-red-500'
                }`}>
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">{result.rating}</span>
                </div>
              </div>

              {/* Emissions Cards */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div
                  className={`${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-xl p-6 text-center`}
                >
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Daily Emissions
                  </p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {result.daily.toFixed(1)}
                  </p>
                  <p className="text-green-500 text-sm">kg CO2</p>
                </div>
                <div
                  className={`${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-xl p-6 text-center`}
                >
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Monthly Emissions
                  </p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {result.monthly.toFixed(0)}
                  </p>
                  <p className="text-green-500 text-sm">kg CO2</p>
                </div>
                <div
                  className={`${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  } rounded-xl p-6 text-center`}
                >
                  <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Annual Emissions
                  </p>
                  <p className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {(result.annual / 1000).toFixed(1)}
                  </p>
                  <p className="text-green-500 text-sm">tonnes CO2</p>
                </div>
              </div>

              {/* Category Breakdown */}
              <div
                className={`${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } rounded-xl p-6`}
              >
                <h3 className={`font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Category Breakdown
                </h3>
                <div className="space-y-3">
                  {result.categoryScores.map((cat) => (
                    <div key={cat.name}>
                      <div className="flex justify-between mb-1">
                        <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {cat.name}
                        </span>
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {cat.value.toFixed(1)} kg CO2
                        </span>
                      </div>
                      <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-600' : 'bg-gray-200'}`}>
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, cat.value * 10)}%`,
                            backgroundColor: cat.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Items */}
              <div
                className={`${
                  darkMode ? 'bg-gray-700' : 'bg-gray-50'
                } rounded-xl p-6`}
              >
                <h3 className={`font-semibold mb-4 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  <Target className="h-5 w-5 text-green-500 mr-2" />
                  Suggested Actions
                </h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {[
                    'Switch to public transport 2 days/week',
                    'Reduce AC usage by 1 hour daily',
                    'Consider a plant-based meal once a day',
                    'Start composting organic waste',
                    'Install LED bulbs',
                    'Take shorter showers',
                  ].map((action, i) => (
                    <div
                      key={i}
                      className={`flex items-center space-x-2 p-3 rounded-lg ${
                        darkMode ? 'bg-gray-600' : 'bg-white'
                      }`}
                    >
                      <Leaf className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setActiveStep(3)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                    darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Recalculate
                </button>
                <Link
                  to="/dashboard"
                  className="flex-1 flex items-center justify-center px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-all duration-200"
                >
                  <span>View Your Dashboard</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div
          className={`mt-8 flex items-start space-x-3 p-4 rounded-xl ${
            darkMode ? 'bg-gray-800' : 'bg-blue-50'
          }`}
        >
          <AlertCircle className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'} flex-shrink-0 mt-0.5`} />
          <div>
            <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <strong className={darkMode ? 'text-white' : 'text-gray-900'}>How we calculate:</strong>{' '}
              Our calculations are based on recognized emission factors from the EPA, IPCC, and other
              scientific sources. Actual emissions may vary based on local energy grids and vehicle
              efficiency.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
