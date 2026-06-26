import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DiscoverProperties() {
  const [activeFilter, setActiveFilter] = useState('Industrial');
  const [activeSidebar, setActiveSidebar] = useState('Properties for Sale');
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  
  const filters = ['Industrial', 'Warehouse', 'Commercial'];

  const sidebarOptions = [
    {
      title: 'Properties for Sale',
      description: 'Explore genuine properties for sale in Delhi NCR, including premium industrial plots, warehouses, and commercial spaces. Refine your search to find options that match your business, location needs, and investment goals.'
    },
    {
      title: 'Properties for Lease',
      description: 'Find exclusive leasing opportunities in Delhi NCR for commercial and industrial spaces. Flexible terms and prime locations to help you establish or scale your business operations.'
    },
    {
      title: 'Properties for Sublease',
      description: 'Discover cost-effective sublease deals in Delhi NCR. Perfect for businesses looking for shorter commitments or ready-to-move-in commercial and industrial spaces.'
    }
  ];

  const propertyCards = [
    { id: 1, title: "Industrial Plot", category: "Industrial", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600" },
    { id: 2, title: "Industrial Workspace", category: "Industrial", image: "https://images.unsplash.com/photo-1565651583091-a67b458db49b?auto=format&fit=crop&q=80&w=600" },
    { id: 3, title: "Warehouse Space", category: "Warehouse", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=600" },
    { id: 4, title: "Godown", category: "Warehouse", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?auto=format&fit=crop&q=80&w=600" },
    { id: 5, title: "Office Space", category: "Commercial", image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600" },
    { id: 6, title: "Retail Shop", category: "Commercial", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=600" },
    { id: 7, title: "Commercial Land", category: "Commercial", image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600" },
    { id: 8, title: "Agriculter Land", category: "Commercial", image: "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&q=80&w=600" }
  ];

  const getListingType = (sidebarTitle) => {
    if (sidebarTitle.includes('Sale')) return 'Sale';
    if (sidebarTitle.includes('Sublease')) return 'Sub-Lease';
    return 'Lease';
  };

  const handleViewAll = () => {
    navigate(`/properties?listingType=${getListingType(activeSidebar)}`);
  };

  const handleCardClick = (cardTitle) => {
    navigate(`/properties?propertyType=${encodeURIComponent(cardTitle)}&listingType=${getListingType(activeSidebar)}`);
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -336, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 336, behavior: 'smooth' });
    }
  };

  const filteredCards = propertyCards.filter(card => card.category === activeFilter);

  return (
    <section className="w-full bg-[#f8f9fa] py-12 px-4 border-t border-gray-200">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-10">
          <span className="text-[#707B87] font-normal">Discover More Properties</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Content Layout */}
        <div className="flex flex-col md:flex-row gap-6 relative">
          
          {/* Left Column (Accordion Sidebar) */}
          <div className="w-full md:w-[320px] flex-shrink-0 flex flex-col">
            
            {/* Invisible Spacer to offset the height of the filter pills on the right */}
            <div className="h-[48px] hidden md:block"></div>
            
            {/* Active/Inactive Accordion Box - Fixed height matching slide */}
            <div className="w-full h-[320px] bg-white border border-gray-200 rounded-[2px] shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex flex-col overflow-y-auto no-scrollbar">
              {sidebarOptions.map((option, index) => {
                const isActive = activeSidebar === option.title;
                return (
                  <div 
                    key={option.title}
                    className={`p-4 ${index !== sidebarOptions.length - 1 ? 'border-b border-gray-100' : ''} ${!isActive ? 'hover:bg-gray-50 cursor-pointer transition-colors' : ''}`}
                    onClick={() => !isActive && setActiveSidebar(option.title)}
                  >
                    <div className={`flex justify-between items-center ${isActive ? 'mb-3 cursor-default' : 'cursor-pointer'}`}>
                      <span className={`text-[14px] ${isActive ? 'font-bold text-[#333]' : 'font-medium text-[#444]'}`}>
                        {option.title}
                      </span>
                      {isActive ? (
                        <ChevronRight size={16} className="text-gray-400" strokeWidth={2.5} />
                      ) : (
                        <ChevronDown size={16} className="text-gray-400" strokeWidth={2.5} />
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-[13px] text-[#666] leading-relaxed mb-4">
                          {option.description}
                        </p>
                        <button onClick={handleViewAll} className="border border-gray-300 px-4 py-1.5 rounded-[2px] text-[12px] text-[#333] font-medium hover:bg-gray-50 transition-colors">
                          View All
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column (Filter Pills + Image Slider) */}
          <div className="flex-1 flex flex-col min-w-0">
            
            {/* Filter Pills - starts exactly above the first slide */}
            <div className="flex justify-start gap-3 h-[48px] overflow-x-auto no-scrollbar items-start">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2 border rounded-[3px] text-[13px] whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? 'bg-black text-white border-black font-medium'
                      : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            {/* Image Slider */}
            <div className="relative group overflow-hidden w-full">
              
              {/* Left Scroll Arrow */}
              <button 
                onClick={scrollLeft}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 bg-white rounded-full p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 border border-gray-100 hidden md:flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={22} strokeWidth={2.5} className="rotate-180" />
              </button>

              <div ref={sliderRef} className="flex gap-4 overflow-x-auto no-scrollbar h-[320px] snap-x transition-all duration-300 scroll-smooth">
                {filteredCards.map((card) => (
                  <div 
                    key={card.id} 
                    onClick={() => handleCardClick(card.title)}
                    className="w-full md:w-[320px] h-full relative rounded-[2px] overflow-hidden group/card cursor-pointer snap-start flex-shrink-0 animate-in fade-in duration-500"
                  >
                    <img 
                      src={card.image} 
                      alt={card.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <span className="absolute bottom-5 left-5 text-white font-medium text-[15px] tracking-wide">
                      {card.title}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Scroll Arrow */}
              <button 
                onClick={scrollRight}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 bg-white rounded-full p-2.5 shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 border border-gray-100 hidden md:flex items-center justify-center text-gray-600 hover:text-black hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
