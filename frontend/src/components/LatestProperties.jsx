import React, { useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LatestProperties() {
  const saleScrollRef = useRef(null);
  const leaseScrollRef = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

    const [saleProperties, setSaleProperties] = React.useState([]);
  const [leaseProperties, setLeaseProperties] = React.useState([]);

  React.useEffect(() => {
    fetch('http://localhost:5001/api/properties')
      .then(res => res.json())
      .then(data => {
        const approvedData = data.filter(p => p.status === 'approved');
        setSaleProperties(approvedData.filter(p => p.listingType === 'Sale').slice(0, 10));
        setLeaseProperties(approvedData.filter(p => p.listingType === 'Lease').slice(0, 10));
      })
      .catch(err => console.error(err));
  }, []);
const renderSlider = (title, data, ref) => (
    <div className="mb-12 last:mb-0 relative">
      {/* Row Title */}
      <h3 className="text-gray-500 text-[15px] mb-4 font-medium px-1">{title}</h3>
      
      {/* Slider Container */}
      <div className="relative group">
        
        {/* Left Arrow (Visible on hover) */}
        <button 
          onClick={() => scroll(ref, 'left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.15)] z-10 text-gray-600 hover:text-black hover:scale-105 transition-all opacity-0 group-hover:opacity-100 border border-gray-100"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>

        {/* Scrollable Track */}
        <div 
          ref={ref}
          className="flex gap-4 overflow-x-auto no-scrollbar snap-x py-1 px-1 scroll-smooth"
        >
          {data.map((item) => (
            <div 
              key={item._id}
              className="min-w-[240px] md:min-w-[260px] bg-white border border-gray-200 rounded-[2px] overflow-hidden flex-shrink-0 snap-center hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-shadow group/card"
            >
              {/* Image & Price Tag */}
              <div className="h-[150px] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.type} 
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                />
                
                {/* Ribbon Price Tag (Arrow shape pointing right) */}
                <div 
                  className="absolute bottom-3 left-0 bg-[#2d2d2d] text-white px-3 py-1 text-[13px] font-bold pr-5 shadow-sm"
                  style={{ clipPath: 'polygon(0 0, 85% 0, 100% 50%, 85% 100%, 0 100%)' }}
                >
                  {item.price}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-4">
                <p className="text-[#d97706] text-[12px] mb-1 font-medium">{item.type}</p>
                <h4 className="text-[#333] font-bold text-[14px] mb-1 truncate">{item.totalArea}</h4>
                <p className="text-gray-500 text-[12px] mb-4 truncate">{item.address}</p>
                
                <Link 
                  to={`/property/${item._id}`} 
                  className="text-[#3182ce] border border-[#bee3f8] rounded-[3px] px-4 py-1.5 text-[12px] font-medium hover:bg-[#ebf8ff] transition-colors w-max block"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Right Arrow (Always visible like screenshot, but styled nicely) */}
        <button 
          onClick={() => scroll(ref, 'right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-[0_2px_10px_rgba(0,0,0,0.15)] z-10 text-gray-600 hover:text-black hover:scale-105 transition-all border border-gray-100"
        >
          <ChevronRight size={22} strokeWidth={2} />
        </button>

      </div>
    </div>
  );

  return (
    <section className="w-full bg-[#f4f6f8] py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#c82021] font-normal">Latest Properties for Sale / Lease</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Sliders */}
        {renderSlider('Property for Sale', saleProperties, saleScrollRef)}
        {renderSlider('Property for Lease', leaseProperties, leaseScrollRef)}

      </div>
    </section>
  );
}
