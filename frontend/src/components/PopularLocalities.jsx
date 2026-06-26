import React, { useRef } from 'react';
import { ExternalLink, Star, Tag, Key, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

export default function PopularLocalities() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  const localities = [
    {
      id: 1,
      name: 'Okhla Phase 1, Delhi NCR',
      projects: '51 Projects',
      rating: '5.0',
      reviews: '4 Reviews',
      buyPrice: 'â‚¹ 57499/ sq.ft',
      buyText: '1569 Property for Sale in Okhla...',
      rentPrice: 'â‚¹ 18649/ sq.ft',
      rentText: '71 Property for Rent in Okhla...'
    },
    {
      id: 2,
      name: 'Sector 83, Delhi NCR',
      projects: '8 Projects',
      rating: '5.0',
      reviews: '4 Reviews',
      buyPrice: 'â‚¹ 16400/ sq.ft',
      buyText: '858 Property for Sale in Sector 83...',
      rentPrice: 'â‚¹ 747/ sq.ft',
      rentText: '44 Property for Rent in Sector 83...'
    },
    {
      id: 3,
      name: 'Sector 82, Delhi NCR',
      projects: '11 Projects',
      rating: '5.0',
      reviews: '6 Reviews',
      buyPrice: 'â‚¹ 33369/ sq.ft',
      buyText: '852 Property for Sale in Sector 82...',
      rentPrice: 'â‚¹ 6681/ sq.ft',
      rentText: '106 Property for Rent in Sector 82...'
    },
    {
      id: 4,
      name: 'Udyog Vihar, Delhi NCR',
      projects: '24 Projects',
      rating: '4.8',
      reviews: '12 Reviews',
      buyPrice: 'â‚¹ 45000/ sq.ft',
      buyText: '320 Property for Sale in Udyog...',
      rentPrice: 'â‚¹ 12000/ sq.ft',
      rentText: '85 Property for Rent in Udyog...'
    },
    {
      id: 5,
      name: 'Noida Sector 62, Delhi NCR',
      projects: '42 Projects',
      rating: '4.9',
      reviews: '18 Reviews',
      buyPrice: 'â‚¹ 28500/ sq.ft',
      buyText: '620 Property for Sale in Sector 62...',
      rentPrice: 'â‚¹ 8500/ sq.ft',
      rentText: '150 Property for Rent in Sector 62...'
    },
    {
      id: 6,
      name: 'Manesar, Delhi NCR',
      projects: '15 Projects',
      rating: '4.7',
      reviews: '9 Reviews',
      buyPrice: 'â‚¹ 12000/ sq.ft',
      buyText: '412 Property for Sale in Manesar...',
      rentPrice: 'â‚¹ 450/ sq.ft',
      rentText: '68 Property for Rent in Manesar...'
    },
    {
      id: 7,
      name: 'Faridabad NIT, Delhi NCR',
      projects: '30 Projects',
      rating: '4.6',
      reviews: '22 Reviews',
      buyPrice: 'â‚¹ 22000/ sq.ft',
      buyText: '510 Property for Sale in Faridabad...',
      rentPrice: 'â‚¹ 6000/ sq.ft',
      rentText: '95 Property for Rent in Faridabad...'
    }
  ];

  return (
    <section className="w-full bg-[#f0f2f5] py-16 px-4 relative">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#707B87] font-normal">Explore Popular Localities</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Slider Container */}
        <div className="relative group">
          
          {/* Left Arrow */}
          <button 
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10 text-purple-600 hover:scale-105 transition-transform border border-gray-100"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </button>

          {/* Cards Wrapper */}
          <div 
            ref={scrollContainerRef}
            className="flex gap-5 overflow-x-auto no-scrollbar snap-x py-2 px-2 scroll-smooth"
          >
            {localities.map((loc) => (
              <div 
                key={loc.id} 
                className="min-w-[340px] md:min-w-[380px] bg-white rounded-md shadow-sm border-t-[3px] border-t-blue-300 flex-shrink-0 snap-center hover:shadow-md transition-shadow"
              >
                
                {/* Top Half */}
                <div className="p-5 flex justify-between items-start border-b border-gray-100">
                  <div>
                    <h3 className="text-[#333] font-medium text-[16px] flex items-center gap-1.5 mb-1 cursor-pointer hover:text-black">
                      {loc.name} <ExternalLink size={14} className="text-gray-400" />
                    </h3>
                    <span className="text-blue-500 text-[13px] hover:underline cursor-pointer">
                      {loc.projects}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      <span className="font-semibold text-[#333] text-[14px]">{loc.rating}</span>
                      <Star size={12} className="fill-[#f5a623] text-[#f5a623]" />
                    </div>
                    <span className="text-gray-400 text-[12px]">{loc.reviews}</span>
                  </div>
                </div>

                {/* Bottom Half */}
                <div className="flex">
                  {/* Buy Section */}
                  <div className="flex-1 p-5 border-r border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-1.5">
                      <Tag size={14} className="text-green-600" /> Buy
                    </div>
                    <div className="text-[#333] font-semibold text-[14px] mb-3">
                      {loc.buyPrice}
                    </div>
                    <a href="#" className="text-blue-500 text-[12px] hover:underline inline-flex items-center leading-tight pr-2">
                      {loc.buyText} <ArrowRight size={12} className="ml-1 flex-shrink-0" />
                    </a>
                  </div>

                  {/* Rent Section */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-1.5">
                      <Key size={14} className="text-green-600" /> Rent
                    </div>
                    <div className="text-[#333] font-semibold text-[14px] mb-3">
                      {loc.rentPrice}
                    </div>
                    <a href="#" className="text-blue-500 text-[12px] hover:underline inline-flex items-center leading-tight pr-2">
                      {loc.rentText} <ArrowRight size={12} className="ml-1 flex-shrink-0" />
                    </a>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-10 text-purple-600 hover:scale-105 transition-transform border border-gray-100"
          >
            <ChevronRight size={20} strokeWidth={2.5} />
          </button>

        </div>

        {/* Bottom Link */}
        <div className="text-center mt-10">
          <a href="#" className="text-black font-medium text-[15px] hover:underline inline-flex items-center">
            More Localities <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
