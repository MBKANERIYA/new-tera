import React, { useState } from 'react';
import { ChevronDown, LocateFixed, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { generatePropertyUrl } from '../utils/slug';

export default function Hero() {
  const [activeTab, setActiveTab] = useState('Sell');
  const [isPropertyTypeOpen, setIsPropertyTypeOpen] = useState(false);
  const [selectedPropertyType, setSelectedPropertyType] = useState('Property Types');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [propertiesData, setPropertiesData] = useState([]);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => setPropertiesData(data.filter(p => p.status === 'approved')))
      .catch(err => console.error(err));
  }, []);

  const getSuggestions = () => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) return [];
    
    const mappedTab = activeTab === 'Sell' ? 'Sale' : activeTab;
    const isListingType = ['Sale', 'Lease', 'Sub-Lease'].includes(mappedTab);

    const activeTypes = [];
    if (!isListingType) {
      activeTypes.push(mappedTab);
    }
    if (selectedPropertyType && selectedPropertyType !== 'Property Types' && selectedPropertyType !== 'All Types') {
      activeTypes.push(selectedPropertyType);
    }

    let filtered = propertiesData.filter(p => {
       if (isListingType) {
         if (p.listingType !== mappedTab && p.listingType !== 'Both') return false;
       }
       if (activeTypes.length > 0) {
          if (!p.type) return false;
          return activeTypes.some(t => p.type.includes(t));
       }
       return true;
    });

    const terms = new Map();
    const q = searchQuery.toLowerCase();
    filtered.forEach(p => {
      if (p.locality && p.locality.toLowerCase().includes(q)) {
        terms.set(p.locality, { type: 'locality', text: p.locality });
      }
      if (p.title && p.title.toLowerCase().includes(q)) {
        terms.set(p.title, { type: 'property', text: p.title, id: p._id });
      }
      if (p.city && p.city.toLowerCase().includes(q)) {
        terms.set(p.city, { type: 'city', text: p.city });
      }
    });
    return Array.from(terms.values());
  };
  
  const suggestions = getSuggestions();

  const handleSearch = (overrideQuery = null) => {
    const params = new URLSearchParams();
    const mappedTab = activeTab === 'Sell' ? 'Sale' : activeTab;

    if (['Sale', 'Lease', 'Sub-Lease'].includes(mappedTab)) {
      params.append('listingType', mappedTab);
    } else {
      params.append('propertyType', mappedTab);
    }

    if (selectedPropertyType && selectedPropertyType !== 'Property Types' && selectedPropertyType !== 'All Types') {
      params.append('propertyType', selectedPropertyType);
    }

    const finalQuery = overrideQuery !== null ? overrideQuery : searchQuery;
    if (finalQuery.trim()) {
      params.append('search', finalQuery.trim());
    }

    navigate(`/properties?${params.toString()}`);
  };

  const tabs = ['Sell', 'Lease', 'Sub-Lease', 'Industrial', 'Warehouse', 'Commercial'];

  const propertyTypesMap = {
    'Industrial': ['Industrial Plot', 'Industrial Workspace'],
    'Warehouse': ['Warehouse Space', 'Godown'],
    'Commercial': ['Office Space', 'Retail Shop', 'Commercial Land', 'Agriculter Land'],
    'Sell': ['Industrial', 'Warehouse', 'Commercial'],
    'Lease': ['Industrial', 'Warehouse', 'Commercial'],
    'Sub-Lease': ['Industrial', 'Warehouse', 'Commercial']
  };

  const propertyTypesList = ['All Types', ...(propertyTypesMap[activeTab] || [])];

  return (
    <section
      className="relative z-20 w-full h-[550px] md:h-[680px] flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop")' }}
    >
      {/* Dark premium overlay to match black/silver theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black/90"></div>

      <div className="relative z-10 w-full max-w-5xl px-4 flex flex-col items-center mt-[-20px]">

        {/* Platform Badge */}
        <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold tracking-wide mb-5 backdrop-blur-sm">
          #1 Commercial Property Listing Platform
        </div>

        {/* Premium Heading */}
        <h1 className="text-[32px] md:text-[46px] text-white mb-4 font-bold text-center tracking-tight leading-tight">
          Buy, Sell & Lease Premium Spaces in <span className="text-[#B3BCC5]">Delhi NCR</span>
        </h1>
        <p className="text-gray-300 text-center mb-10 text-[15px] md:text-[16px] font-medium max-w-3xl leading-relaxed">
          Teralease is your trusted property listing platform dedicated to <strong>Industrial</strong>, <strong>Warehouse</strong>, and <strong>Commercial</strong> real estate. Easily list your properties to reach elite agents, or search our verified inventory to find the exact space your business needs to grow.
        </p>

        {/* Premium Search Box Container */}
        <div className="w-full bg-white/10 backdrop-blur-md p-4 md:p-5 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-white/20">

          {/* Tabs */}
          <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setSelectedPropertyType('Property Types');
                  setIsPropertyTypeOpen(false);
                }}
                className={`px-5 py-2.5 text-[15px] font-medium transition-all duration-300 rounded-full whitespace-nowrap
                  ${activeTab === tab
                    ? 'bg-white text-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)] scale-105'
                    : 'bg-transparent text-white/90 hover:bg-white/20 hover:text-white'}
                `}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Search Inputs Row */}
          <div className="flex flex-col md:flex-row bg-white w-full rounded-xl overflow-visible shadow-[0_8px_30px_rgb(0,0,0,0.12)]">

            {/* Property Types Dropdown */}
            <div className="relative md:w-56 border-b md:border-b-0 md:border-r border-gray-100 flex-shrink-0">
              <div
                className="flex items-center justify-between px-5 py-4 h-full cursor-pointer text-gray-700 hover:bg-gray-50/50 transition-colors rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
                onClick={() => setIsPropertyTypeOpen(!isPropertyTypeOpen)}
              >
                <span className="truncate text-[15px] font-semibold text-gray-800">{selectedPropertyType}</span>
                <ChevronDown size={18} className={`text-gray-400 flex-shrink-0 ml-2 transition-transform duration-300 ${isPropertyTypeOpen ? 'rotate-180' : ''}`} strokeWidth={2.5} />
              </div>

              {/* Dropdown Menu */}
              {isPropertyTypeOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsPropertyTypeOpen(false)}></div>
                  <div className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border border-gray-100 shadow-2xl z-50 rounded-b-xl max-h-60 overflow-y-auto no-scrollbar mt-2 p-2">
                    {propertyTypesList.map((type, index) => (
                      <div
                        key={index}
                        className="px-4 py-3 hover:bg-gray-100/80 hover:text-blue-700 cursor-pointer text-[14px] font-medium text-gray-600 rounded-lg transition-colors mb-1 last:mb-0"
                        onClick={() => {
                          setSelectedPropertyType(type === 'All Types' ? 'Property Types' : type);
                          setIsPropertyTypeOpen(false);
                        }}
                      >
                        {type}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Main Input */}
            <div className="flex-1 flex items-center relative group">
              <Search size={20} className="absolute left-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Search Locality, Project, or Landmark..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSuggestions(false);
                    handleSearch();
                  }
                }}
                className="w-full h-full py-4 pl-14 pr-14 focus:outline-none text-[16px] placeholder-gray-400 font-medium text-gray-800 bg-transparent"
              />
              <button className="absolute right-3 text-gray-400 hover:text-black p-2 rounded-full hover:bg-gray-100 transition-all">
                <LocateFixed size={20} strokeWidth={2.5} />
              </button>

              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 max-h-[260px] overflow-y-auto no-scrollbar">
                  {suggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        setSearchQuery(suggestion.text);
                        setShowSuggestions(false);
                        if (suggestion.type === 'property') {
                          navigate(generatePropertyUrl(suggestion.id, suggestion.text));
                        } else {
                          handleSearch(suggestion.text);
                        }
                      }}
                      className="px-5 py-3 hover:bg-gray-100 hover:text-blue-700 cursor-pointer text-[15px] text-gray-600 flex items-center gap-3 transition-colors"
                    >
                      <Search size={16} className="text-gray-400" />
                      {suggestion.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <div className="p-2 md:w-auto w-full">
              <button onClick={() => handleSearch()} className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-10 py-3.5 rounded-lg font-bold text-[16px] flex items-center justify-center hover:shadow-lg hover:from-blue-500 hover:to-blue-400 hover:-translate-y-0.5 transition-all w-full h-full">
                Search
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
