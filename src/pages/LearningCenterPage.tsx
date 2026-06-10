import { useState } from 'react';
import { useTheme } from '../App';
import {
  BookOpen,
  TreePine,
  Zap,
  Car,
  Droplets,
  Recycle,
  Leaf,
  Clock,
  CheckCircle,
  ChevronLeft,
  Award,
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  duration: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  icon: typeof Leaf;
  lessons: Lesson[];
  duration: string;
  color: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export default function LearningCenterPage() {
  const { darkMode } = useTheme();
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [currentLesson, setCurrentLesson] = useState<number>(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    const saved = localStorage.getItem('ecotrack-learning');
    return saved ? JSON.parse(saved) : [];
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectModule = (module: Module | null) => {
    setSelectedModule(module);
    setCurrentLesson(0);
    scrollToTop();
  };

  const handleSetCurrentLesson = (lessonIndex: number) => {
    setCurrentLesson(lessonIndex);
    scrollToTop();
  };

  const markLessonComplete = (lessonId: string) => {
    const updated = [...completedLessons, lessonId];
    setCompletedLessons(updated);
    localStorage.setItem('ecotrack-learning', JSON.stringify(updated));
  };

  const modules: Module[] = [
    {
      id: 'climate-change',
      title: 'Climate Change Fundamentals',
      description: 'Understand the science behind global warming and its impact on our planet.',
      icon: TreePine,
      duration: '45 min',
      color: 'text-blue-500',
      level: 'Beginner',
      lessons: [
        {
          id: 'climate-1',
          title: 'What is Climate Change?',
          content: `Climate change refers to long-term shifts in global temperatures and weather patterns. While climate change is a natural phenomenon, human activities have been the main driver since the 1800s.

**Key Facts:**
• The Earth's average temperature has risen by about 1.1°C since the pre-industrial era
• The last decade (2011-2020) was the warmest on record
• CO2 levels are now higher than at any point in the last 800,000 years

**What causes climate change?**
The primary cause is the greenhouse effect - certain gases in the atmosphere trap heat from the sun, warming the Earth's surface. The main greenhouse gases are:
• Carbon dioxide (CO2) - from burning fossil fuels
• Methane - from agriculture and waste
• Nitrous oxide - from fertilizers and industrial processes

These gases accumulate in the atmosphere, creating a "blanket" that traps more and more heat.`,
          duration: '10 min',
        },
        {
          id: 'climate-2',
          title: 'Causes of Climate Change',
          content: `The primary drivers of current climate change are human activities that increase greenhouse gas emissions.

**Major Sources of Emissions:**

1. **Fossil Fuel Burning (75% of emissions)**
   • Electricity generation from coal and gas
   • Transportation (cars, planes, ships)
   • Industrial processes and manufacturing

2. **Deforestation (10-15%)**
   • Trees absorb CO2, so cutting them releases stored carbon
   • Reduces the planet's ability to absorb future emissions

3. **Agriculture (10-12%)**
   • Livestock produce methane
   • Rice paddies release methane
   • Fertilizer use releases nitrous oxide

4. **Industrial Processes (5-8%)**
   • Cement production
   • Chemical manufacturing
   • Waste management

The concentration of CO2 in the atmosphere has increased from 280 ppm in 1800 to over 420 ppm today - a 50% increase.`,
          duration: '10 min',
        },
        {
          id: 'climate-3',
          title: 'Environmental Effects',
          content: `Climate change is already having significant impacts on our planet's ecosystems and weather patterns.

**Observed Effects:**

1. **Rising Sea Levels**
   • Global sea levels have risen 20cm since 1900
   • Rate of rise has doubled in last two decades
   • Threatens coastal communities worldwide

2. **Extreme Weather Events**
   • More frequent and intense heatwaves
   • Stronger hurricanes and cyclones
   • Increased flooding and droughts

3. **Ecosystem Disruption**
   • Coral reefs dying due to ocean warming and acidification
   • Species extinction - 1 million species at risk
   • Migration patterns disrupted

4. **Ice and Snow Decline**
   • Arctic sea ice declining 13% per decade
   • Glaciers retreating worldwide
   • Permafrost melting, releasing more methane

**Tipping Points:**
Scientists warn of potential tipping points where changes become irreversible, such as the collapse of major ice sheets or Amazon rainforest dieback.`,
          duration: '15 min',
        },
        {
          id: 'climate-4',
          title: 'Global Solutions',
          content: `Addressing climate change requires action at every level - individual, community, national, and global.

**International Agreements:**
• The Paris Agreement (2015) - 195 countries committed to limit warming to 1.5-2°C
• Net-zero targets - Many countries aim for carbon neutrality by 2050

**Key Solution Areas:**

1. **Renewable Energy Transition**
   • Solar and wind are now cheaper than fossil fuels
   • Grid modernization for renewable integration
   • Energy storage solutions

2. **Sustainable Transportation**
   • Electric vehicles
   • Public transport expansion
   • Active mobility (walking, cycling)

3. **Energy Efficiency**
   • Building retrofits and green buildings
   • Industrial efficiency improvements
   • Smart grids and demand management

4. **Nature-Based Solutions**
   • Forest restoration
   • Wetland conservation
   • Sustainable agriculture

5. **Carbon Removal**
   • Direct air capture technology
   • Enhanced weathering
   • Biochar and soil carbon

**Individual Action:** While systemic change is crucial, individual choices matter. They influence markets, inspire others, and create demand for sustainable solutions.`,
          duration: '10 min',
        },
        {
          id: 'climate-5',
          title: 'Personal Actions You Can Take',
          content: `Every individual can contribute to fighting climate change through daily choices and actions.

**High-Impact Actions:**

1. **Transportation**
   • Reduce car usage - carpool, use public transport
   • Choose electric or hybrid vehicles
   • Walk or cycle for short trips

2. **Home Energy**
   • Switch to renewable energy provider
   • Improve home insulation
   • Use energy-efficient appliances

3. **Diet**
   • Reduce meat consumption, especially beef
   • Eat locally produced food
   • Minimize food waste

4. **Consumption**
   • Buy less, choose quality items
   • Repair instead of replacing
   • Choose second-hand when possible

5. **Political Action**
   • Vote for climate-conscious leaders
   • Contact representatives about climate policy
   • Support environmental organizations

**Carbon Footprint Comparison:**
• Going car-free: -2.4 tonnes CO2/year
• Plant-based diet: -0.8 tonnes CO2/year
• Eliminating one flight: -1.6 tonnes CO2
• Switching to green energy: -1.5 tonnes CO2/year

Start with one action and build from there. Small steps create momentum for larger changes!`,
          duration: '10 min',
        },
      ],
    },
    {
      id: 'carbon-footprint',
      title: 'Understanding Carbon Footprint',
      description: 'Learn what carbon footprint means and how individual actions contribute to emissions.',
      icon: Leaf,
      duration: '30 min',
      color: 'text-green-500',
      level: 'Beginner',
      lessons: [
        {
          id: 'carbon-1',
          title: 'What is a Carbon Footprint?',
          content: `A carbon footprint is the total amount of greenhouse gases (primarily carbon dioxide and methane) that are generated by our actions.

**Definition:**
The sum of all emissions of CO2 (carbon dioxide) and other greenhouse gases, expressed in carbon dioxide equivalent (CO2e), which are associated with an individual, organization, event, or product.

**Why Does It Matter?**
Everything we do has an environmental impact:
• The food we eat requires energy to grow, process, and transport
• Our homes use electricity and heating fuel
• Transportation burns fossil fuels
• Products we buy require resources and energy to manufacture

**Average Carbon Footprints:**
• Global average: ~4.5 tonnes CO2 per person per year
• USA: ~16 tonnes per person per year
• UK: ~6 tonnes per person per year
• India: ~2 tonnes per person per year

**Targets for Sustainability:**
To limit global warming to 1.5°C, we need to reach approximately 2.3 tonnes per person by 2030.`,
          duration: '10 min',
        },
        {
          id: 'carbon-2',
          title: 'Sources of Personal Emissions',
          content: `Understanding where your emissions come from is the first step to reducing them.

**Main Categories of Personal Emissions:**

1. **Transportation (~28%)**
   • Private vehicle use
   • Air travel
   • Public transport (lower emissions)
   • Walking/cycling (zero emissions)

2. **Home Energy (~25%)**
   • Electricity consumption
   • Heating and cooling
   • Hot water
   • Appliances

3. **Food (~15-25%)**
   • Meat and dairy production
   • Food transportation
   • Food waste
   • Agricultural practices

4. **Consumption (~20%)**
   • Clothing and textiles
   • Electronics
   • Furniture
   • Packaging

5. **Services (~10%)**
   • Healthcare
   • Education
   • Entertainment
   • Financial services

**Key Insight:**
The biggest impact often comes from:
1. How much we fly
2. How we commute
3. Our diet choices
4. Home energy use
5. What we consume`,
          duration: '10 min',
        },
        {
          id: 'carbon-3',
          title: 'Measuring Your Impact',
          content: `Accurately measuring your carbon footprint helps identify the best opportunities for reduction.

**Calculation Methods:**

1. **Input-Based Calculation**
   Track your activities and multiply by emission factors:
   • Kilometers driven × emission factor for your vehicle
   • kWh of electricity × grid emission factor
   • Food consumed × food emission factor

2. **Common Emission Factors:**
   • Car (petrol): 0.21 kg CO2/km
   • Bus: 0.089 kg CO2/km
   • Train/Metro: 0.041 kg CO2/km
   • Electricity: 0.4-0.8 kg CO2/kWh (varies by region)
   • Beef: 27 kg CO2/kg
   • Chicken: 6.9 kg CO2/kg
   • Vegetables: 0.4 kg CO2/kg

**Using Our Calculator:**
The EcoTrack AI calculator helps you estimate your footprint by:
1. Entering your transportation habits
2. Recording energy usage
3. Assessing diet and consumption
4. Calculating the total

**Accuracy Note:**
Calculations are estimates. Actual emissions vary based on:
• Local electricity grid mix
• Vehicle efficiency and driving conditions
• Food production methods
• Supply chain differences`,
          duration: '10 min',
        },
      ],
    },
    {
      id: 'renewable-energy',
      title: 'Renewable Energy Sources',
      description: 'Explore solar, wind, hydro, and other clean energy technologies transforming our world.',
      icon: Zap,
      duration: '60 min',
      color: 'text-amber-500',
      level: 'Intermediate',
      lessons: [
        {
          id: 'energy-1',
          title: 'Introduction to Renewable Energy',
          content: `Renewable energy comes from natural sources that are continuously replenished - sunlight, wind, water, and geothermal heat.

**Why Renewable Energy Matters:**
• Fossil fuels produce 75% of global emissions
• Renewables produce little to no greenhouse gases
• Energy costs are decreasing rapidly
• Creates jobs and economic growth

**Types of Renewable Energy:**

1. **Solar**
   • Photovoltaic (PV) panels
   • Solar thermal systems
   • Concentrated solar power (CSP)

2. **Wind**
   • Onshore wind farms
   • Offshore wind farms
   • Small-scale turbines

3. **Hydroelectric**
   • Large-scale dams
   • Run-of-river systems
   • Pumped storage

4. **Geothermal**
   • Ground source heat pumps
   • Deep geothermal power plants

5. **Biomass**
   • Wood and agricultural waste
   • Biogas from organic matter
   • Sustainable biofuels

**Current Status:**
Renewables now provide 29% of global electricity and are growing rapidly.`,
          duration: '15 min',
        },
        {
          id: 'energy-2',
          title: 'Solar Energy Deep Dive',
          content: `Solar energy is the most abundant energy source available, with enough sunlight reaching Earth every hour to power humanity for a year.

**How Solar Panels Work:**
1. Sunlight hits photovoltaic cells
2. Cells convert light to electricity (DC)
3. Inverter converts DC to AC for home use
4. Excess energy can be stored or sent to grid

**Types of Solar Systems:**

1. **Rooftop Solar**
   • Residential homes
   • Commercial buildings
   • Payback period: 5-10 years

2. **Utility-Scale Solar**
   • Large solar farms
   • Hundreds of megawatts
   • Most cost-effective option now

3. **Solar Thermal**
   • Heats water directly
   • Common for hot water systems
   • Very efficient for heating

**Advantages:**
• No moving parts, low maintenance
• 25+ year lifespan
• Works in most climates
• Prices dropped 89% since 2010

**Considerations:**
• Intermittent - needs storage or grid connection
• Space requirements
• Initial installation cost
• Roof orientation matters`,
          duration: '15 min',
        },
        {
          id: 'energy-3',
          title: 'Wind and Hydroelectric Power',
          content: `Wind and hydro are crucial components of the renewable energy transition.

**Wind Power:**

How it works:
1. Wind turns turbine blades
2. Generator converts rotation to electricity
3. Transformer increases voltage for transmission

Types:
• Onshore - Lower cost, widespread
• Offshore - Stronger, more consistent wind
• Small-scale - For farms and homes

Growth:
• Wind provides 7% of global electricity
• Largest turbines now 15MW capacity
• Offshore wind growing 25% annually

Advantages:
• Lowest cost electricity in many regions
• Minimal land impact (agriculture continues below)
• Fast deployment
• Proven technology

**Hydroelectric Power:**

How it works:
• Water stored behind dam
• Released through turbines
• Generates electricity

Types:
• Large dams (Three Gorges, Hoover Dam)
• Run-of-river (minimal storage)
• Pumped storage (stores energy by pumping water uphill)

Advantages:
• Can provide baseload power
• Long lifespan (50-100 years)
• Storage capability
• Flood control, irrigation benefits

Considerations:
• Environmental impact on rivers
• Displacement of communities
• Methane from reservoirs
• Climate-dependent (droughts)`,
          duration: '15 min',
        },
        {
          id: 'energy-4',
          title: 'Energy Storage and the Grid',
          content: `As renewable energy grows, storing and distributing power becomes increasingly important.

**Why Energy Storage Matters:**
• Solar only produces during day
• Wind varies with weather
• Storage bridges supply and demand
• Enables higher renewable penetration

**Battery Storage:**

Types:
• Lithium-ion - Most common, improving rapidly
• Flow batteries - Long duration storage
• Sodium-ion - Lower cost alternative
• Solid-state - Next generation technology

Applications:
• Home batteries (Tesla Powerwall)
• Grid-scale storage facilities
• Electric vehicle integration

**Grid Modernization:**

Smart Grid Features:
• Real-time demand monitoring
• Dynamic pricing
• Automated load balancing
• Distributed generation integration

Virtual Power Plants:
• Aggregate home solar + batteries
• Provide grid services
• Pay participants for flexibility

**Other Storage Technologies:**
• Pumped hydro storage
• Compressed air
• Hydrogen production
• Thermal storage

The combination of renewables + storage is now cost-competitive with fossil fuels in most markets.`,
          duration: '15 min',
        },
      ],
    },
    {
      id: 'sustainable-transport',
      title: 'Sustainable Transportation',
      description: 'Discover eco-friendly transportation options and their environmental benefits.',
      icon: Car,
      duration: '25 min',
      color: 'text-purple-500',
      level: 'Beginner',
      lessons: [
        {
          id: 'transport-1',
          title: 'The Transportation Problem',
          content: `Transportation accounts for approximately 24% of direct CO2 emissions from fuel combustion globally.

**Current Situation:**
• 1.4 billion cars on the road worldwide
• Aviation growing 4-5% annually
• Shipping moves 90% of global trade
• Roads dominate urban planning

**Emissions by Mode:**

Per passenger-kilometer (average):
• Walking/Cycling: 0 g CO2
• Electric train: 41 g CO2
• Bus: 89 g CO2
• Car (average, single occupant): 210 g CO2
• Car (4 passengers): 53 g CO2
• Domestic flight: 255 g CO2

**Key Issues:**
1. Dependency on oil
2. Infrastructure lock-in
3. Urban sprawl
4. Convenience expectations

**The Opportunity:**
Transportation is one of the easiest areas to reduce emissions through:
• Mode shifting (car to transit)
• Fuel switching (ICE to EV)
• Trip reduction (remote work, planning)
• Vehicle efficiency improvements`,
          duration: '10 min',
        },
        {
          id: 'transport-2',
          title: 'Electric Vehicles and Alternatives',
          content: `Electric vehicles (EVs) are transforming personal transportation.

**How EVs Help:**
• Zero tailpipe emissions
• 60-80% lower lifetime emissions (depending on grid)
• Energy efficient (3-4x more than gasoline)
• Lower operating costs
• Growing charging infrastructure

**EV Types:**
1. Battery Electric Vehicles (BEV)
   • Fully electric
   • Range: 250-500 km typical
   • Examples: Tesla, Nissan Leaf

2. Plug-in Hybrid (PHEV)
   • Electric + gasoline backup
   • Good for longer trips
   • Transition option

**Other Sustainable Options:**

E-Bikes:
• 10-50 km range
• Very low emissions
• Great for urban commute
• Growing rapidly in Europe and Asia

Public Transit:
• Most efficient for high ridership
• Bus rapid transit
• Light rail and metro
• Integration with active mobility

Active Transport:
• Walking and cycling
• Zero emissions
• Health benefits
• Infrastructure expanding

**Making the Switch:**
1. Assess your typical trips
2. Consider an e-bike first
3. Evaluate EV options
4. Plan for charging
5. Utilize public transit when possible`,
          duration: '15 min',
        },
      ],
    },
    {
      id: 'water-conservation',
      title: 'Water Conservation',
      description: 'Learn practical techniques to save water and protect this precious resource.',
      icon: Droplets,
      duration: '35 min',
      color: 'text-cyan-500',
      level: 'Beginner',
      lessons: [
        {
          id: 'water-1',
          title: 'Understanding Water Scarcity',
          content: `Water is essential for life, yet billions of people face water scarcity every year.

**Global Water Facts:**
• Only 3% of Earth's water is freshwater
• 1.1 billion people lack access to water
• By 2025, two-thirds of population may face shortages
• Agriculture uses 70% of freshwater

**Water-Energy Nexus:**
Treating and moving water requires huge amounts of energy:
• Pumping: 7% of global energy use
• Heating water: 18% of home energy
• Water treatment: Energy-intensive processes

**Water Footprint:**
A water footprint measures total water consumption, including:
• Direct use (taps, showers)
• Embedded water (food, products)
• Virtual water (trade)

Average daily water footprints:
• Direct use: 100-300 liters per day
• Total footprint: 1,000-5,000 liters per day (mostly food)

**Climate Impact:**
Warming temperatures affect water through:
• Changed precipitation patterns
• Glacial melt affecting river flows
• Increased evaporation
• Greater irrigation needs`,
          duration: '15 min',
        },
        {
          id: 'water-2',
          title: 'Practical Conservation Tips',
          content: `Small changes in daily habits can save thousands of liters per year.

**In the Bathroom:**

1. **Showers**
   • Limit to 5 minutes (save 40L per shower)
   • Install low-flow showerhead (save 40%)
   • Turn off water while soaping

2. **Toilets**
   • Install dual-flush systems
   • Check for leaks regularly
   • Don't use toilet as trash can

3. **Sinks**
   • Turn off while brushing teeth (save 8L)
   • Fix dripping taps immediately
   • Don't let water run while shaving

**In the Kitchen:**

• Run dishwasher only when full
• Scrape plates instead of rinsing
• Keep cold water pitcher in fridge
• Thaw food in refrigerator, not water

**In the Garden:**

• Water early morning or evening
• Use drip irrigation systems
• Choose drought-resistant plants
• Collect rainwater for irrigation
• Mulch to retain moisture

**Other Tips:**
• Monitor your water bill for unusual usage
• Install water-efficient appliances
• Reuse greywater for gardens
• Report leaks in public areas

Every drop counts - small actions add up to big savings!`,
          duration: '20 min',
        },
      ],
    },
    {
      id: 'waste-management',
      title: 'Waste Management & Recycling',
      description: 'Master the art of reducing, reusing, and recycling for a zero-waste lifestyle.',
      icon: Recycle,
      duration: '50 min',
      color: 'text-orange-500',
      level: 'Intermediate',
      lessons: [
        {
          id: 'waste-1',
          title: 'The Waste Hierarchy',
          content: `Understanding the waste hierarchy helps prioritize actions with the greatest environmental benefit.

**The 5 R's (in order of priority):**

1. **REFUSE**
   Don't accept what you don't need
   • Decline single-use plastics
   • Say no to freebies and promotional items
   • Avoid unnecessary packaging

2. **REDUCE**
   Minimize what you do accept
   • Buy only what you need
   • Choose products with less packaging
   • Opt for durable over disposable

3. **REUSE**
   Use items multiple times
   • Repair broken items
   • Shop second-hand
   • Use reusable containers and bags

4. **REPURPOSE**
   Find new uses for old items
   • Upcycle clothing
   • Transform packaging materials
   • Donate to organizations

5. **RECYCLE**
   Process materials for new products
   • Sort correctly
   • Clean recyclables
   • Know local guidelines

**Key Insight:**
Recycling is important, but it's the LEAST effective of the 5 R's. Prevention (refuse, reduce) has far greater impact than cure (recycle).`,
          duration: '15 min',
        },
        {
          id: 'waste-2',
          title: 'Recycling Done Right',
          content: `Effective recycling requires understanding what can and cannot be recycled, and proper preparation.

**Commonly Recyclable Items:**
• Paper and cardboard (clean, dry)
• Glass bottles and jars
• Aluminum cans and foil
• Steel/tin cans
• PET and HDPE plastics (#1, #2)

**Usually NOT Recyclable:**
• Plastic bags and film
• Styrofoam
• Contaminated items (greasy pizza boxes)
• Ceramics and mirrors
• Mixed material packaging

**Recycling Best Practices:**

1. **Clean Before Recycling**
   • Rinse food containers
   • Remove residue and liquid
   • Dry items if possible

2. **Flatten and Sort**
   • Flatten boxes
   • Remove caps (recycle separately)
   • Don't bag recyclables

3. **Know Your Local System**
   • Check municipality guidelines
   • Some accept more types than others
   • Look for recycling symbols

**Common Mistakes:**
• "Wish-cycling" (tossing questionable items)
• Including plastic bags
• Not cleaning containers
• Mixing non-recyclables

When in doubt, throw it out - contamination can ruin entire batches of recyclables.`,
          duration: '15 min',
        },
        {
          id: 'waste-3',
          title: 'Composting and Organic Waste',
          content: `Organic waste in landfills produces methane, a potent greenhouse gas. Composting turns this problem into a solution.

**Why Composting Matters:**
• Food waste is 25-30% of household waste
• Landfill decomposition creates methane (25x more potent than CO2)
• Composting returns nutrients to soil
• Reduces need for synthetic fertilizers

**What Can Be Composted:**

YES:
• Fruit and vegetable scraps
• Coffee grounds and filters
• Tea bags (remove staples)
• Eggshells
• Yard waste (leaves, grass)
• Paper napkins and towels
• Nutshells

NO:
• Meat and fish
• Dairy products
• Oils and fats
• Pet waste
• Chemically treated wood
• Diseased plants

**Composting Methods:**

1. **Backyard Composting**
   • Simple pile or bin
   • Turn regularly
   • Balance "greens" and "browns"

2. **Vermicomposting (Worms)**
   • Great for apartments
   • Fast processing
   • Produces rich castings

3. **Municipal Programs**
   • Drop-off locations
   • Curbside pickup (growing)
   • Community gardens

**Tips for Success:**
• Balance wet and dry materials
• Turn or aerate regularly
• Keep moist but not soggy
• Chop materials small for faster breakdown`,
          duration: '20 min',
        },
      ],
    },
  ];

  const getModuleProgress = (moduleId: string): number => {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = module.lessons.filter(l => completedLessons.includes(l.id)).length;
    return Math.round((completed / module.lessons.length) * 100);
  };

  // Module view
  if (selectedModule) {
    const lesson = selectedModule.lessons[currentLesson];
    const isCompleted = completedLessons.includes(lesson.id);
    const progress = getModuleProgress(selectedModule.id);

    return (
      <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <button
            onClick={() => handleSelectModule(null)}
            className={`flex items-center space-x-2 mb-6 ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to modules</span>
          </button>

          {/* Module header */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-6 shadow-sm mb-6`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-50'}`}>
                  <selectedModule.icon className={`h-8 w-8 ${selectedModule.color}`} />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {selectedModule.title}
                  </h1>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {selectedModule.level} • {selectedModule.duration}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{progress}% complete</span>
                <div className={`w-32 h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                  <div
                    className="h-2 rounded-full bg-green-500 transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Lesson navigation */}
            <div className="flex flex-wrap gap-2">
              {selectedModule.lessons.map((l, i) => {
                const done = completedLessons.includes(l.id);
                const current = l.id === lesson.id;
                return (
                  <button
                    key={l.id}
                    onClick={() => handleSetCurrentLesson(i)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      current
                        ? 'bg-green-500 text-white'
                        : done
                        ? 'bg-green-500/20 text-green-500'
                        : darkMode
                        ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {done ? <CheckCircle className="h-4 w-4 inline mr-1" /> : null}
                    Lesson {i + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Lesson content */}
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-sm`}>
            <div className="flex items-center justify-between mb-6">
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                {lesson.title}
              </h2>
              <div className="flex items-center space-x-2">
                <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {lesson.duration}
                </span>
              </div>
            </div>

            <div className={`prose max-w-none ${darkMode ? 'prose-invert' : ''}`}>
              {lesson.content.split('\n\n').map((paragraph, i) => {
                if (paragraph.startsWith('**') && paragraph.endsWith(':**')) {
                  // It's a heading
                  return (
                    <h3 key={i} className={`font-semibold mt-6 mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {paragraph.replace(/\*\*/g, '')}
                    </h3>
                  );
                }
                if (paragraph.includes('• ')) {
                  // It's a bullet list
                  const items = paragraph.split('\n').filter(l => l.trim());
                  return (
                    <ul key={i} className={`list-disc list-inside mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/• /, '').replace(/\*\*/g, '')}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.match(/^\d+\./m)) {
                  // It's a numbered list
                  const items = paragraph.split('\n').filter(l => l.trim());
                  return (
                    <ol key={i} className={`list-decimal list-inside mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {items.map((item, j) => (
                        <li key={j}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}</li>
                      ))}
                    </ol>
                  );
                }
                return (
                  <p key={i} className={`mb-4 whitespace-pre-line ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, idx) => {
                      const [text, rest] = part.split('</strong>');
                      if (idx === 0) return text;
                      return (
                        <span key={idx}>
                          <strong className={darkMode ? 'text-white' : 'text-gray-900'}>{text}</strong>
                          {rest}
                        </span>
                      );
                    })}
                  </p>
                );
              })}
            </div>

            {/* Lesson actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => handleSetCurrentLesson(Math.max(0, currentLesson - 1))}
                disabled={currentLesson === 0}
                className={`px-4 py-2 rounded-lg font-medium ${
                  currentLesson === 0
                    ? 'opacity-50 cursor-not-allowed'
                    : darkMode
                    ? 'bg-gray-700 text-white hover:bg-gray-600'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Previous Lesson
              </button>
              <div className="flex space-x-3">
                {!isCompleted ? (
                  <button
                    onClick={() => markLessonComplete(lesson.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                  >
                    <CheckCircle className="h-4 w-4 inline mr-2" />
                    Mark Complete
                  </button>
                ) : (
                  <span className="flex items-center text-green-500 font-medium">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Completed
                  </span>
                )}
                {currentLesson < selectedModule.lessons.length - 1 && (
                  <button
                    onClick={() => handleSetCurrentLesson(currentLesson + 1)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600"
                  >
                    Next Lesson
                  </button>
                )}
                {progress === 100 && (
                  <div className="flex items-center space-x-2 px-4 py-2 bg-amber-500/20 text-amber-500 rounded-lg">
                    <Award className="h-5 w-5" />
                    <span className="font-medium">Module Complete!</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Module list view
  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
        darkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-green-500/10 mb-6">
            <BookOpen className="h-8 w-8 text-green-500" />
          </div>
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            Learning Center
          </h1>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Expand your knowledge about sustainability and environmental conservation.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {modules.reduce((sum, m) => sum + m.lessons.length, 0)}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Lessons</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {completedLessons.length}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
          </div>
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {modules.filter(m => getModuleProgress(m.id) === 100).length}
            </p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Modules Done</p>
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => {
            const progress = getModuleProgress(module.id);
            return (
              <button
                key={module.id}
                onClick={() => handleSelectModule(module)}
                className={`group text-left ${
                  darkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'
                } rounded-2xl overflow-hidden transition-all duration-300`}
              >
                {/* Module Header */}
                <div className={`h-24 flex items-center justify-center ${
                  darkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-green-50 to-emerald-50'
                }`}>
                  <module.icon className={`h-12 w-12 ${module.color} opacity-80 group-hover:scale-110 transition-transform duration-300`} />
                </div>

                {/* Module Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      module.level === 'Beginner'
                        ? 'bg-green-500/20 text-green-500'
                        : module.level === 'Intermediate'
                        ? 'bg-amber-500/20 text-amber-500'
                        : 'bg-red-500/20 text-red-500'
                    }`}>
                      {module.level}
                    </span>
                    {progress === 100 && (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    )}
                  </div>

                  <h3 className={`text-lg font-semibold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {module.title}
                  </h3>
                  <p className={`text-sm mb-4 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {module.description}
                  </p>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {module.lessons.length} lessons
                      </span>
                      <span className={darkMode ? 'text-gray-400' : 'text-gray-500'}>
                        {progress}%
                      </span>
                    </div>
                    <div className={`h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                      <div
                        className="h-2 rounded-full bg-green-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Clock className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {module.duration}
                      </span>
                    </div>
                    <span className="text-green-500 text-sm font-medium group-hover:translate-x-1 transition-transform">
                      {progress > 0 ? 'Continue' : 'Start'} →
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
