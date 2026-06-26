import React, { useRef, useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { generatePropertyUrl } from '../utils/slug';

export default function SimilarProperties({ currentProperty }) {
  const scrollRef = useRef(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!currentProperty) return;

    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        // Filter approved properties, exclude current, and match category or listingType
        const similar = data.filter(p => 
          p.status === 'approved' && 
          p._id !== currentProperty._id && 
          (p.category === currentProperty.category || p.listingType === currentProperty.listingType)
        ).slice(0, 8); // get top 8
        setProperties(similar);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [currentProperty]);

  if (loading || properties.length === 0) {
    return null; // Don't render if no similar properties
  }

  return (
    <div className="bg-white py-12 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Similar Properties</h2>
        
        <div className="relative group">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 text-gray-600 hover:text-black hover:scale-105 transition-all opacity-0 group-hover:opacity-100 border border-gray-100 hidden md:flex"
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </button>

          {/* Scrollable Track */}
          <div 
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar snap-x py-1 px-1 scroll-smooth pb-4"
          >
            {properties.map((item) => (
              <div 
                key={item._id}
                className="min-w-[260px] md:min-w-[280px] bg-white border border-gray-200 rounded-[2px] overflow-hidden flex-shrink-0 snap-center hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow group/card"
              >
                {/* Image & Price Tag */}
                <div className="h-[180px] relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                  />
                  
                  {/* Ribbon Price Tag */}
                  <div 
                    className="absolute bottom-3 left-0 bg-[#2d2d2d] text-white px-3 py-1 text-[13px] font-bold pr-5 shadow-sm"
                    style={{ clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)' }}
                  >
                    {item.price}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4">
                  <p className="text-[#d97706] text-[12px] mb-1 font-medium">{item.category}</p>
                  <h4 className="text-[#333] font-bold text-[14px] mb-1 truncate" title={item.title}>{item.title}</h4>
                  <p className="text-gray-500 text-[12px] mb-4 truncate" title={item.location + ', ' + item.city}>{item.location}, {item.city}</p>
                  
                  <Link 
                    to={generatePropertyUrl(item._id, item.title)} 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-[#000000] border border-[#e5e5e5] rounded-[3px] px-4 py-1.5 text-[12px] font-medium hover:bg-[#f5f5f5] transition-colors w-max block"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] z-10 text-gray-600 hover:text-black hover:scale-105 transition-all border border-gray-100 hidden md:flex"
          >
            <ChevronRight size={22} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
}
