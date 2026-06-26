import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function TopAgents() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/agents')
      .then(res => res.json())
      .then(data => {
        setAgents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching agents:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="w-full py-16 text-center text-gray-500">Loading agents...</div>;
  }

  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 relative">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#707B87] font-normal">Top Real Estate Agents</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Slider Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 text-purple-600 hover:scale-105 transition-transform border border-gray-100"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Grid Slider - 2 rows, horizontal scrolling */}
          <div 
            ref={scrollContainerRef}
            className="grid grid-rows-2 grid-flow-col gap-4 overflow-x-auto no-scrollbar snap-x scroll-smooth pb-4"
            style={{ autoColumns: 'minmax(320px, 320px)' }}
          >
            {agents.map((agent) => (
              <div 
                key={agent._id || agent.id} 
                className="w-[320px] bg-white rounded-lg shadow-sm border border-gray-100 p-5 flex flex-col justify-between snap-start hover:shadow-md transition-shadow"
              >
                
                {/* Agent Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img src={agent.logo} alt={agent.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-[#333] font-medium text-[15px] leading-tight mb-1 cursor-pointer hover:text-black">
                      {agent.name}
                    </h3>
                    <p className="text-gray-500 text-[12px]">
                      {agent.location}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex mb-4">
                  <div className={`flex-1 ${agent.rent > 0 ? 'border-r border-gray-100 pr-4' : ''}`}>
                    <span className="text-[#333] font-bold text-[14px]">{agent.sale}</span>{' '}
                    <span className="text-gray-500 text-[13px]">Sale<br/>Properties</span>
                  </div>
                  {agent.rent > 0 && (
                    <div className="flex-1 pl-4">
                      <span className="text-[#333] font-bold text-[14px]">{agent.rent}</span>{' '}
                      <span className="text-gray-500 text-[13px]">Rent<br/>Properties</span>
                    </div>
                  )}
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 flex-wrap mt-auto">
                  {agent.tags.map((tag, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1 border border-gray-200 rounded-full text-gray-500 text-[11px] whitespace-nowrap cursor-pointer hover:border-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {agent.moreTags > 0 && (
                    <span className="px-3 py-1 bg-gray-100 text-black font-medium rounded-full text-[11px] cursor-pointer hover:bg-blue-100">
                      +{agent.moreTags}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.1)] z-10 text-purple-600 hover:scale-105 transition-transform border border-gray-100"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

        {/* Bottom Link */}
        <div className="text-center mt-8">
          <a href="#" className="text-black font-medium text-[15px] hover:underline inline-flex items-center">
            See all Agents <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
