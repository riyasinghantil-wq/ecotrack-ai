import { useState } from 'react';
import { Search, BookOpen, Zap, TreePine, Recycle, Droplets, Car, Home, ArrowRight, Star, Clock } from 'lucide-react';
import { useTheme } from '../App';

interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  featured: boolean;
}

const resources: Resource[] = [
  // Climate Change
  { id: '1', title: 'Understanding the Greenhouse Effect', description: 'Learn how greenhouse gases trap heat and warm the planet, and why this matters for climate change.', category: 'Climate Change', readTime: 8, difficulty: 'beginner', featured: true },
  { id: '2', title: 'Global Warming vs Climate Change', description: 'Clarifying the difference between these often-confused terms and their implications.', category: 'Climate Change', readTime: 5, difficulty: 'beginner', featured: false },
  { id: '3', title: 'Climate Tipping Points Explained', description: 'Critical thresholds that could trigger irreversible changes in Earth systems.', category: 'Climate Change', readTime: 12, difficulty: 'intermediate', featured: true },
  { id: '4', title: 'The Paris Agreement: Goals and Progress', description: 'International commitments to limit global warming and current status.', category: 'Climate Change', readTime: 10, difficulty: 'intermediate', featured: false },

  // Carbon Footprints
  { id: '5', title: 'What is a Carbon Footprint?', description: 'Comprehensive guide to understanding personal carbon emissions and their sources.', category: 'Carbon Footprints', readTime: 7, difficulty: 'beginner', featured: true },
  { id: '6', title: 'Scope 1, 2, and 3 Emissions', description: 'Understanding the different categories of emissions for organizations and individuals.', category: 'Carbon Footprints', readTime: 9, difficulty: 'intermediate', featured: false },
  { id: '7', title: 'Carbon Offsetting: Does It Work?', description: 'Examining the effectiveness and criticisms of carbon offset programs.', category: 'Carbon Footprints', readTime: 11, difficulty: 'intermediate', featured: true },

  // Renewable Energy
  { id: '8', title: 'Solar Power 101', description: 'How solar panels convert sunlight into electricity for homes and businesses.', category: 'Renewable Energy', readTime: 8, difficulty: 'beginner', featured: true },
  { id: '9', title: 'Wind Energy: How It Works', description: 'Understanding wind turbines and their role in clean electricity generation.', category: 'Renewable Energy', readTime: 7, difficulty: 'beginner', featured: false },
  { id: '10', title: 'Energy Storage Solutions', description: 'Battery technology and grid-scale storage for renewable energy systems.', category: 'Renewable Energy', readTime: 12, difficulty: 'intermediate', featured: false },

  // Recycling
  { id: '11', title: 'The Complete Guide to Recycling', description: 'What can and cannot be recycled, and how recycling systems work.', category: 'Recycling', readTime: 10, difficulty: 'beginner', featured: true },
  { id: '12', title: 'Composting at Home', description: 'Turn food waste into nutrient-rich soil for your garden.', category: 'Recycling', readTime: 6, difficulty: 'beginner', featured: false },
  { id: '13', title: 'E-Waste: Proper Disposal Matters', description: 'Why electronic waste needs special handling and how to dispose of it safely.', category: 'Recycling', readTime: 5, difficulty: 'beginner', featured: false },

  // Water Conservation
  { id: '14', title: 'Water Footprint: The Hidden Cost', description: 'Understanding virtual water in products and reducing consumption.', category: 'Water Conservation', readTime: 8, difficulty: 'beginner', featured: true },
  { id: '15', title: 'Rainwater Harvesting Systems', description: 'Collect and use rainwater for gardens, flushing, and more.', category: 'Water Conservation', readTime: 9, difficulty: 'intermediate', featured: false },
  { id: '16', title: 'Greywater Recycling at Home', description: 'Safely reusing water from sinks and showers for irrigation.', category: 'Water Conservation', readTime: 11, difficulty: 'intermediate', featured: false },

  // Sustainable Transportation
  { id: '17', title: 'Electric Vehicles: Complete Guide', description: 'Everything you need to know about EV ownership, charging, and environmental impact.', category: 'Sustainable Transportation', readTime: 15, difficulty: 'beginner', featured: true },
  { id: '18', title: 'Cycling Infrastructure Guide', description: 'How cities are redesigning for bikes and what it means for sustainability.', category: 'Sustainable Transportation', readTime: 8, difficulty: 'intermediate', featured: false },
  { id: '19', title: 'Public Transit Benefits', description: 'Why buses, trains, and trams are critical for sustainable cities.', category: 'Sustainable Transportation', readTime: 6, difficulty: 'beginner', featured: false },

  // Green Lifestyle
  { id: '20', title: 'Zero Waste Lifestyle Guide', description: 'Practical steps toward generating minimal waste in your daily life.', category: 'Green Lifestyle', readTime: 12, difficulty: 'intermediate', featured: true },
  { id: '21', title: 'Sustainable Shopping Tips', description: 'Making eco-conscious choices when buying clothes, food, and household items.', category: 'Green Lifestyle', readTime: 8, difficulty: 'beginner', featured: false },
  { id: '22', title: 'Eco-Friendly Home Improvements', description: 'Renovations and upgrades that reduce environmental impact and save money.', category: 'Green Lifestyle', readTime: 14, difficulty: 'intermediate', featured: false },
];

const categoryIcons: Record<string, React.ElementType> = {
  'Climate Change': TreePine,
  'Carbon Footprints': Zap,
  'Renewable Energy': Zap,
  'Recycling': Recycle,
  'Water Conservation': Droplets,
  'Sustainable Transportation': Car,
  'Green Lifestyle': Home,
};

const difficultyColors = {
  beginner: 'text-green-500',
  intermediate: 'text-amber-500',
  advanced: 'text-red-500',
};

export default function ResourceCenterPage() {
  const { darkMode } = useTheme();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const text = darkMode ? 'text-white' : 'text-gray-900';
  const muted = darkMode ? 'text-gray-400' : 'text-gray-500';
  const bg = darkMode ? 'bg-gray-900' : 'bg-gray-50';
  const card = darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200';

  const categories = [...new Set(resources.map(r => r.category))];

  const filteredResources = resources.filter(r => {
    const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = !selectedCategory || r.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredResources = resources.filter(r => r.featured);

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${bg}`} role="main">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-teal-500/20 mb-4">
            <BookOpen className="h-8 w-8 text-teal-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold ${text} mb-2`}>Sustainability Resource Center</h1>
          <p className={`text-lg ${muted}`}>Searchable educational hub for environmental knowledge</p>
        </div>

        {/* Search and Filters */}
        <div className={`${card} rounded-2xl p-4 mb-8 border`}>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 ${muted}`} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search resources..."
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'} ${text}`}
                aria-label="Search resources"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${!selectedCategory ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
              >
                All
              </button>
              {categories.map(cat => {
                const Icon = categoryIcons[cat] || BookOpen;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${selectedCategory === cat ? 'bg-green-500 text-white' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Featured Resources */}
        {!search && !selectedCategory && (
          <div className="mb-8">
            <h2 className={`text-lg font-semibold ${text} mb-4 flex items-center gap-2`}>
              <Star className="h-5 w-5 text-amber-500" />
              Featured Resources
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredResources.slice(0, 6).map(resource => (
                <ResourceCard key={resource.id} resource={resource} darkMode={darkMode} text={text} muted={muted} />
              ))}
            </div>
          </div>
        )}

        {/* All Resources */}
        <div>
          <h2 className={`text-lg font-semibold ${text} mb-4`}>
            {selectedCategory ? selectedCategory : search ? `Results for "${search}"` : 'All Resources'}
            <span className={`text-sm font-normal ${muted} ml-2`}>({filteredResources.length})</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map(resource => (
              <ResourceCard key={resource.id} resource={resource} darkMode={darkMode} text={text} muted={muted} />
            ))}
          </div>

          {filteredResources.length === 0 && (
            <div className={`${card} rounded-2xl p-8 text-center`}>
              <BookOpen className={`h-12 w-12 ${muted} mx-auto mb-4`} />
              <p className={muted}>No resources found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ResourceCard({ resource, darkMode, text, muted }: { resource: Resource; darkMode: boolean; text: string; muted: string }) {
  const categoryIcons: Record<string, React.ElementType> = {
    'Climate Change': TreePine,
    'Carbon Footprints': Zap,
    'Renewable Energy': Zap,
    'Recycling': Recycle,
    'Water Conservation': Droplets,
    'Sustainable Transportation': Car,
    'Green Lifestyle': Home,
  };

  const Icon = categoryIcons[resource.category] || BookOpen;
  const difficultyColors: Record<string, string> = {
    beginner: 'text-green-500 bg-green-500/10',
    intermediate: 'text-amber-500 bg-amber-500/10',
    advanced: 'text-red-500 bg-red-500/10',
  };

  return (
    <div className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} rounded-xl p-4 border hover:border-green-500 transition-colors group cursor-pointer`}>
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} flex items-center justify-center`}>
          <Icon className="h-5 w-5 text-green-500" />
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColors[resource.difficulty]} font-medium capitalize`}>
          {resource.difficulty}
        </span>
      </div>
      <h3 className={`font-semibold ${text} mb-1 group-hover:text-green-500 transition-colors`}>{resource.title}</h3>
      <p className={`text-sm ${muted} mb-3 line-clamp-2`}>{resource.description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <Clock className="h-3 w-3" />
          {resource.readTime} min read
        </div>
        <ArrowRight className={`h-4 w-4 ${muted} group-hover:text-green-500 group-hover:translate-x-1 transition-all`} />
      </div>
    </div>
  );
}
