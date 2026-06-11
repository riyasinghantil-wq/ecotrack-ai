import { useState } from 'react';
import { Upload, FileText, Zap, Car, Leaf, AlertTriangle, CheckCircle, Camera, Calculator, Lightbulb } from 'lucide-react';
import { useTheme, useData } from '../App';

interface ScannedResult {
  type: 'electricity' | 'fuel' | 'gas';
  estimatedValue: number;
  estimatedEmissions: number;
  recommendations: string[];
  savingsOpportunity: number;
}

export default function CarbonScannerPage() {
  const { darkMode } = useTheme();
  const { userData, setUserData } = useData();
  const [activeTab, setActiveTab] = useState<'upload' | 'manual'>('upload');
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScannedResult | null>(null);
  const [manualForm, setManualForm] = useState({
    type: 'electricity' as const,
    units: '',
    cost: '',
  });

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const handleScan = async (type: 'electricity' | 'fuel' | 'gas') => {
    setScanning(true);
    await new Promise(r => setTimeout(r, 2000));

    const results: Record<string, ScannedResult> = {
      electricity: {
        type: 'electricity',
        estimatedValue: Math.floor(Math.random() * 300 + 200),
        estimatedEmissions: Math.floor(Math.random() * 500 + 200),
        recommendations: [
          'Switch to LED lighting throughout your home',
          'Use smart power strips for electronics',
          'Consider a time-of-use electricity plan',
          'Unplug devices when not in use',
        ],
        savingsOpportunity: Math.floor(Math.random() * 30 + 15),
      },
      fuel: {
        type: 'fuel',
        estimatedValue: Math.floor(Math.random() * 100 + 50),
        estimatedEmissions: Math.floor(Math.random() * 400 + 200),
        recommendations: [
          'Maintain proper tire pressure for better fuel efficiency',
          'Combine errands into single trips',
          'Consider carpooling or public transit options',
          'Drive at steady speeds to conserve fuel',
        ],
        savingsOpportunity: Math.floor(Math.random() * 25 + 10),
      },
      gas: {
        type: 'gas',
        estimatedValue: Math.floor(Math.random() * 50 + 30),
        estimatedEmissions: Math.floor(Math.random() * 300 + 100),
        recommendations: [
          'Lower your thermostat by 1-2 degrees',
          'Insulate your water heater and pipes',
          'Seal air leaks around windows and doors',
          'Use a programmable thermostat',
        ],
        savingsOpportunity: Math.floor(Math.random() * 20 + 10),
      },
    };

    setResult(results[type]);
    setScanning(false);
  };

  const handleManualSubmit = () => {
    const units = parseFloat(manualForm.units) || 0;
    if (units <= 0) return;

    const emissionFactors = {
      electricity: 0.42, // kg CO2 per kWh
      fuel: 2.31, // kg CO2 per liter
      gas: 2.0, // kg CO2 per therm
    };

    const estimatedEmissions = Math.round(units * emissionFactors[manualForm.type]);

    const recommendationsMap = {
      electricity: ['Switch to LED bulbs', 'Use smart power strips', 'Consider solar panels'],
      fuel: ['Carpool twice per week', 'Maintain tire pressure', 'Consider an electric vehicle'],
      gas: ['Lower thermostat by 2 degrees', 'Insulate water heater', 'Seal air leaks'],
    };

    setResult({
      type: manualForm.type,
      estimatedValue: units,
      estimatedEmissions,
      recommendations: recommendationsMap[manualForm.type],
      savingsOpportunity: Math.round(estimatedEmissions * 0.2),
    });
  };

  const getTypeIcon = (type: string) => {
    if (type === 'electricity') return <Zap className="h-5 w-5 text-amber-500" />;
    if (type === 'fuel') return <Car className="h-5 w-5 text-blue-500" />;
    return <FileText className="h-5 w-5 text-orange-500" />;
  };

  const getTypeName = (type: string) => {
    if (type === 'electricity') return 'Electricity Bill';
    if (type === 'fuel') return 'Fuel Receipt';
    return 'Gas/Utility Bill';
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 mb-4">
            <Camera className="h-8 w-8 text-blue-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Carbon Footprint Scanner</h1>
          <p className={`text-lg ${muted}`}>Upload bills or receipts to estimate your carbon emissions</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 justify-center">
          {[
            { id: 'upload', label: 'Upload Document', icon: Upload },
            { id: 'manual', label: 'Manual Entry', icon: Calculator },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : darkMode ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === 'upload' && !result && (
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { type: 'electricity' as const, label: 'Electricity Bill', desc: 'Upload your electricity bill', icon: Zap, color: 'text-amber-500 bg-amber-500/20' },
              { type: 'fuel' as const, label: 'Fuel Receipt', desc: 'Upload gas station receipts', icon: Car, color: 'text-blue-500 bg-blue-500/20' },
              { type: 'gas' as const, label: 'Gas/Utility Bill', desc: 'Upload natural gas bills', icon: FileText, color: 'text-orange-500 bg-orange-500/20' },
            ].map(item => (
              <button
                key={item.type}
                onClick={() => handleScan(item.type)}
                disabled={scanning}
                className={`${card} rounded-2xl p-6 border text-center hover:border-green-500 transition-all group disabled:opacity-50`}
              >
                <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center mx-auto mb-4`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className={`font-semibold ${text} mb-1`}>{item.label}</h3>
                <p className={`text-sm ${muted}`}>{item.desc}</p>
                {scanning ? (
                  <div className="mt-4 flex items-center justify-center gap-2 text-blue-500">
                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <span className="text-sm">Scanning...</span>
                  </div>
                ) : (
                  <div className="mt-4 text-green-500 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Click to simulate scan
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {activeTab === 'manual' && !result && (
          <div className={`${card} rounded-2xl p-6 border max-w-md mx-auto`}>
            <h3 className={`font-semibold ${text} mb-4`}>Enter Your Data</h3>
            <div className="space-y-4">
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Bill Type</label>
                <select
                  value={manualForm.type}
                  onChange={e => setManualForm({ ...manualForm, type: e.target.value as typeof manualForm.type })}
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                >
                  <option value="electricity">Electricity (kWh)</option>
                  <option value="fuel">Fuel (liters)</option>
                  <option value="gas">Natural Gas (therms)</option>
                </select>
              </div>
              <div>
                <label className={`text-sm font-medium ${text} mb-1 block`}>Units Used</label>
                <input
                  type="number"
                  value={manualForm.units}
                  onChange={e => setManualForm({ ...manualForm, units: e.target.value })}
                  placeholder="Enter units"
                  className={`w-full px-3 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                />
              </div>
              <button
                onClick={handleManualSubmit}
                disabled={!manualForm.units || parseFloat(manualForm.units) <= 0}
                className="w-full py-2.5 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 disabled:opacity-50 transition-colors"
              >
                Calculate Emissions
              </button>
            </div>
          </div>
        )}

        {result && (
          <div className="space-y-6">
            {/* Result Summary */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <div className="flex items-center gap-3 mb-6">
                {getTypeIcon(result.type)}
                <div>
                  <h3 className={`font-semibold ${text}`}>{getTypeName(result.type)} Analysis</h3>
                  <p className={`text-sm ${muted}`}>Carbon footprint scan results</p>
                </div>
                <button
                  onClick={() => setResult(null)}
                  className="ml-auto text-sm text-green-500 hover:text-green-400"
                >
                  Scan Another
                </button>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-xs ${muted} mb-1`}>Value Detected</div>
                  <div className="text-2xl font-bold text-blue-500">{result.estimatedValue} {result.type === 'electricity' ? 'kWh' : result.type === 'fuel' ? 'L' : 'therms'}</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-xs ${muted} mb-1`}>Estimated CO2 Emissions</div>
                  <div className="text-2xl font-bold text-red-500">{result.estimatedEmissions} kg</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                  <div className={`text-xs ${muted} mb-1`}>Savings Opportunity</div>
                  <div className="text-2xl font-bold text-green-500">{result.savingsOpportunity} kg/mo</div>
                </div>
              </div>

              <div className={`p-4 rounded-xl ${darkMode ? 'bg-green-500/10' : 'bg-green-50'} border ${darkMode ? 'border-green-500/20' : 'border-green-100'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-5 w-5 text-green-500" />
                  <span className={`font-semibold ${text}`}>Recommendations</span>
                </div>
                <ul className="space-y-2">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className={`flex gap-2 text-sm ${muted}`}>
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Environmental Impact Visual */}
            <div className={`${card} rounded-2xl p-6 border`}>
              <h3 className={`font-semibold ${text} mb-4`}>Environmental Impact Visualization</h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center min-w-[120px]`}>
                  <div className="text-3xl mb-1">🌳</div>
                  <div className={`text-xl font-bold text-green-500`}>{Math.round(result.estimatedEmissions / 25)}</div>
                  <div className={`text-xs ${muted}`}>Trees Needed</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center min-w-[120px]`}>
                  <div className="text-3xl mb-1">🚗</div>
                  <div className={`text-xl font-bold text-blue-500`}>{Math.round(result.estimatedEmissions / 0.12)} km</div>
                  <div className={`text-xs ${muted}`}>Driving Distance</div>
                </div>
                <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} text-center min-w-[120px]`}>
                  <div className="text-3xl mb-1">💡</div>
                  <div className={`text-xl font-bold text-amber-500`}>{Math.round(result.estimatedEmissions / 0.5)} hrs</div>
                  <div className={`text-xs ${muted}`}>Light Bulb Hours</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Info Note */}
        <div className={`mt-8 p-4 rounded-xl ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'} border`}>
          <div className="flex gap-3">
            <AlertTriangle className="h-5 w-5 text-blue-500 flex-shrink-0" />
            <div>
              <p className={`text-sm font-medium ${text}`}>Simulation Mode</p>
              <p className={`text-xs ${muted} mt-1`}>
                This scanner uses intelligent estimation algorithms powered by typical emission factors. For production use, OCR integration would extract actual values from uploaded documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
