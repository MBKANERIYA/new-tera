import React from 'react';
import { 
  Building2, Store, Monitor, MapPin, Users, FileCheck, Key, 
  Factory, Settings, Map, Warehouse, Snowflake, Truck, Box 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function MostViewedProperties() {
  const propertyTypes = [
    // Industrial
    { id: 1, title: 'Industrial Plots', icon: Map },
    { id: 2, title: 'Factory Sheds', icon: Factory },
    { id: 3, title: 'Manufacturing Units', icon: Settings },
    // Warehouse
    { id: 4, title: 'Warehouse Spaces', icon: Warehouse },
    { id: 5, title: 'Cold Storage', icon: Snowflake },
    { id: 6, title: 'Logistics Hubs', icon: Truck },
    { id: 7, title: 'Godowns', icon: Box },
    // Commercial
    { id: 8, title: 'Commercial Offices', icon: Building2 },
    { id: 9, title: 'Retail Shops', icon: Store },
    { id: 10, title: 'IT Park Spaces', icon: Monitor },
    { id: 11, title: 'Commercial Land', icon: MapPin },
    { id: 12, title: 'Co-working Spaces', icon: Users },
    { id: 13, title: 'RERA Registered', icon: FileCheck },
    { id: 14, title: 'Freehold Commercial', icon: Key }
  ];

  return (
    <section className="w-full bg-[#fcfcfc] py-16 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#c82021] font-normal">Most Viewed Properties</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Grid Container */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-5">
          {propertyTypes.map((type) => (
            <Link 
              to="/properties"
              key={type.id} 
              className="w-[140px] h-[140px] md:w-[155px] md:h-[155px] bg-white border border-gray-200 rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center p-3 cursor-pointer hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group block"
            >
              
              {/* Icon in thin blue circle */}
              <div className="w-16 h-16 rounded-full border-[1.5px] border-[#d6e8f6] bg-transparent flex items-center justify-center mb-3 group-hover:bg-[#f4f8fc] transition-colors">
                <type.icon 
                  size={32} 
                  strokeWidth={1.2} 
                  className="text-[#2c5282] group-hover:scale-110 transition-transform duration-300" 
                />
              </div>

              {/* Title */}
              <span className="text-center text-[12px] md:text-[13px] text-[#444] font-medium leading-tight group-hover:text-[#2c5282] transition-colors">
                {type.title}
              </span>
              
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
