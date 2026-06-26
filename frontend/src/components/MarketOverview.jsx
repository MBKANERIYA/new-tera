import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function MarketOverview() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full bg-[#f8f9fa] py-16 px-4 border-t border-gray-100">
      <div className="max-w-[1100px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-8">
          <span className="text-[#c82021] font-normal">An Overview of the Delhi NCR Real Estate</span>{' '}
          <span className="text-[#333] font-medium">Market</span>
        </h2>

        {/* Text Content */}
        <div className="text-[#555] text-[14px] md:text-[15px] leading-relaxed mb-12">
          <p className="mb-4">
            Once a quiet region on the outskirts, Delhi NCR has grown into a thriving commercial hub. It is a major player in industrial and commercial real estate. Modern IT parks, expansive warehouses, and tall commercial office buildings sparkle in the metropolitan skyline.
          </p>
          <p>
            Despite the increasing costs, many multinational companies prefer Delhi NCR. This is because of the easy availability of skilled labor and strategic connectivity. The flocking of commercial establishments has made the region a premium logistics hub. There are many impressive industrial and commercial properties
            {!isExpanded && (
              <>
                ... 
                <button 
                  onClick={() => setIsExpanded(true)}
                  className="text-blue-600 inline-flex items-center hover:underline ml-1"
                >
                  more <ChevronDown size={14} className="ml-0.5 mt-[2px]" />
                </button>
              </>
            )}
            {isExpanded && (
              <span>
                {' '}available that cater to diverse business needs, ranging from start-up co-working spaces to massive manufacturing units. The future of real estate here continues to look incredibly promising as new corridors are developed.
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="text-blue-600 inline-flex items-center hover:underline ml-1"
                >
                  less <ChevronUp size={14} className="ml-0.5 mt-[2px]" />
                </button>
              </span>
            )}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-6">
          <div>
            <div className="text-[22px] font-semibold text-[#333] mb-1.5">5869+</div>
            <div className="text-gray-500 text-[14px] leading-snug">
              Industrial Properties<br />in Delhi NCR
            </div>
          </div>
          <div>
            <div className="text-[22px] font-semibold text-[#333] mb-1.5">260+</div>
            <div className="text-gray-500 text-[14px] leading-snug">
              Warehouse Spaces<br />in Delhi NCR
            </div>
          </div>
          <div>
            <div className="text-[22px] font-semibold text-[#333] mb-1.5">9644+</div>
            <div className="text-gray-500 text-[14px] leading-snug">
              Property for Lease<br />in Delhi NCR
            </div>
          </div>
          <div>
            <div className="text-[22px] font-semibold text-[#333] mb-1.5">1328+</div>
            <div className="text-gray-500 text-[14px] leading-snug">
              Commercial Projects<br />in Delhi NCR
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
