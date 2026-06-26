import React, { useRef } from 'react';
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

  const agents = [
    {
      id: 1,
      name: "JBN RealTech",
      location: "Okhla Phase 1, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      sale: 6,
      rent: 0,
      tags: ["Sector 2", "Okhla"],
      moreTags: 0
    },
    {
      id: 2,
      name: "Gravitas Real Estate",
      location: "Sector 48, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop",
      sale: 18,
      rent: 0,
      tags: ["Badli", "Dwarka Expressway"],
      moreTags: 38
    },
    {
      id: 3,
      name: "Saral Realtors",
      location: "Sector 47, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop",
      sale: 92,
      rent: 6,
      tags: ["DLF Phase I", "DLF Phase II"],
      moreTags: 40
    },
    {
      id: 4,
      name: "Gurugram Luxury Floors",
      location: "Sector 38, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
      sale: 23,
      rent: 2,
      tags: ["Delhi", "Gurgaon"],
      moreTags: 0
    },
    {
      id: 5,
      name: "Welcome Homes",
      location: "Sector 70, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop",
      sale: 81,
      rent: 4,
      tags: ["Ansal Palam Vihar"],
      moreTags: 37
    },
    {
      id: 6,
      name: "RBR Realty",
      location: "DLF Phase IV, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
      sale: 118,
      rent: 70,
      tags: ["Block A", "Block C"],
      moreTags: 11
    },
    {
      id: 7,
      name: "Garv Design & Planning",
      location: "Sector 46, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop",
      sale: 28,
      rent: 0,
      tags: ["Delhi", "Gurgaon", "Jhajjar"],
      moreTags: 0
    },
    {
      id: 8,
      name: "Realty Choice",
      location: "Sector 47, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=100&h=100&fit=crop",
      sale: 932,
      rent: 144,
      tags: ["Block A Sector 63", "Block C"],
      moreTags: 97
    },
    {
      id: 9,
      name: "Prime Industrial Spaces",
      location: "Manesar, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?w=100&h=100&fit=crop",
      sale: 45,
      rent: 12,
      tags: ["IMT Manesar", "Sector 8"],
      moreTags: 5
    },
    {
      id: 10,
      name: "Capital Commercials",
      location: "Connaught Place, Delhi NCR",
      logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      sale: 156,
      rent: 89,
      tags: ["CP", "Barakhamba"],
      moreTags: 22
    }
  ];

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
                key={agent.id} 
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
