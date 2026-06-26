import React, { useRef } from 'react';
import { ExternalLink, Star, Tag, Key, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function FeaturedProperties() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();

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

  const featuredProps = [
    {
      id: 1,
      name: 'Premium Industrial Plot',
      projects: 'Sector 83, Gurgaon',
      rating: 'Sale',
      reviews: 'Verified',
      buyPrice: '₹ 5.5 Cr',
      buyText: 'View Property Details',
      rentPrice: '15000 sq.ft',
      rentText: 'Ready to Move'
    },
    {
      id: 2,
      name: 'A-Grade Warehouse Space',
      projects: 'Okhla Phase 1, Delhi',
      rating: 'Lease',
      reviews: 'Verified',
      buyPrice: '₹ 2.5 Lac/mo',
      buyText: 'View Property Details',
      rentPrice: '8500 sq.ft',
      rentText: 'Immediate Possession'
    },
    {
      id: 3,
      name: 'Commercial Office Space',
      projects: 'Noida Sector 62',
      rating: 'Sale',
      reviews: 'Verified',
      buyPrice: '₹ 3.2 Cr',
      buyText: 'View Property Details',
      rentPrice: '4200 sq.ft',
      rentText: 'Fully Furnished'
    },
    {
      id: 4,
      name: 'Logistics Hub Godown',
      projects: 'Manesar, Haryana',
      rating: 'Lease',
      reviews: 'Featured',
      buyPrice: '₹ 4.8 Lac/mo',
      buyText: 'View Property Details',
      rentPrice: '22000 sq.ft',
      rentText: 'High Ceilings'
    },
    {
      id: 5,
      name: 'Retail Shop in Mall',
      projects: 'Faridabad NIT',
      rating: 'Sale',
      reviews: 'Prime Location',
      buyPrice: '₹ 1.8 Cr',
      buyText: 'View Property Details',
      rentPrice: '1200 sq.ft',
      rentText: 'Under Construction'
    },
    {
      id: 6,
      name: 'IT Park Workspace',
      projects: 'Udyog Vihar, Gurgaon',
      rating: 'Lease',
      reviews: 'Verified',
      buyPrice: '₹ 1.5 Lac/mo',
      buyText: 'View Property Details',
      rentPrice: '5000 sq.ft',
      rentText: 'Plug & Play'
    }
  ];

  return (
    <section className="w-full bg-[#f0f2f5] py-16 px-4 relative">
      <div className="max-w-[1200px] mx-auto relative">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#707B87] font-normal">Explore Featured Properties</span>{' '}
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
            {featuredProps.map((prop) => (
              <div 
                key={prop.id} 
                onClick={() => navigate('/properties')}
                className="min-w-[340px] md:min-w-[380px] bg-white rounded-md shadow-sm border-t-[3px] border-t-black flex-shrink-0 snap-center hover:shadow-md transition-shadow cursor-pointer"
              >
                
                {/* Top Half */}
                <div className="p-5 flex justify-between items-start border-b border-gray-100">
                  <div>
                    <h3 className="text-[#333] font-medium text-[16px] flex items-center gap-1.5 mb-1 cursor-pointer hover:text-black">
                      {prop.name} <ExternalLink size={14} className="text-gray-400" />
                    </h3>
                    <span className="text-blue-500 text-[13px] hover:underline cursor-pointer">
                      {prop.projects}
                    </span>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 mb-1">
                      <span className={`font-semibold text-[13px] px-2 py-0.5 rounded ${prop.rating === 'Sale' ? 'bg-blue-50 text-blue-600' : 'bg-green-50 text-green-600'}`}>
                        For {prop.rating}
                      </span>
                    </div>
                    <span className="text-gray-500 font-medium text-[12px]">{prop.reviews}</span>
                  </div>
                </div>

                {/* Bottom Half */}
                <div className="flex">
                  {/* Buy Section */}
                  <div className="flex-1 p-5 border-r border-gray-100">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-1.5">
                      <Tag size={14} className="text-gray-400" /> Price
                    </div>
                    <div className="text-[#333] font-semibold text-[15px] mb-3">
                      {prop.buyPrice}
                    </div>
                    <span className="text-blue-500 text-[12px] group-hover:underline inline-flex items-center leading-tight pr-2">
                      {prop.buyText} <ArrowRight size={12} className="ml-1 flex-shrink-0" />
                    </span>
                  </div>

                  {/* Rent Section */}
                  <div className="flex-1 p-5">
                    <div className="flex items-center gap-1.5 text-gray-500 text-[13px] mb-1.5">
                      <Key size={14} className="text-gray-400" /> Area / Status
                    </div>
                    <div className="text-[#333] font-semibold text-[15px] mb-3">
                      {prop.rentPrice}
                    </div>
                    <span className="text-gray-500 text-[12px] inline-flex items-center leading-tight pr-2">
                      {prop.rentText}
                    </span>
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
          <a href="/properties" className="text-black font-medium text-[15px] hover:underline inline-flex items-center">
            View All Properties <ArrowRight size={16} className="ml-1" />
          </a>
        </div>

      </div>
    </section>
  );
}
