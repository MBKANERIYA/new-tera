import React from 'react';
import { Handshake, HardHat, PenTool, PaintRoller, Compass, Hammer, Search, Users } from 'lucide-react';

export default function RealEstateServices() {
  const services = [
    {
      title: 'Agents / Brokers',
      description: 'Here Are Hassle-Free Solutions! Buy - Sell - Rent Your Property',
      icon: Handshake
    },
    {
      title: 'Builders / Developers',
      description: 'List of the most trusted and reliable builders to fulfill your Dream HOME.',
      icon: HardHat
    },
    {
      title: 'Architects / Architecture',
      description: 'Professional Architecture will meet your needs and expectations.',
      icon: PenTool
    },
    {
      title: 'Interior Decorators',
      description: 'A One-Stop Solution for all your decor Needs to Match Your Lifestyle.',
      icon: PaintRoller
    },
    {
      title: 'Vaastu Consultant',
      description: 'Connect to top most Vastu consultants for right direction.',
      icon: Compass
    },
    {
      title: 'Building Contractors',
      description: 'General contractor for a home repair, remodel, or construction.',
      icon: Hammer
    },
    {
      title: 'Home Inspection',
      description: 'A complete range of building and home inspection services.',
      icon: Search
    },
    {
      title: 'Property Consultants',
      description: 'List of Leading Real Estate Consultant for Professional Assistance Services.',
      icon: Users
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#c82021] font-normal">Real Estate Service</span>{' '}
          <span className="text-[#333] font-medium">in Delhi NCR</span>
        </h2>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 relative overflow-hidden flex flex-col p-6 min-h-[220px] group cursor-pointer"
            >
              {/* Content */}
              <h3 className="text-[#333] font-medium text-[16px] mb-3 relative z-10 group-hover:text-blue-600 transition-colors">
                {service.title}
              </h3>
              
              <p className="text-[#777] text-[13px] leading-relaxed mb-6 relative z-10 flex-1">
                {service.description}
              </p>

              {/* Button */}
              <button className="text-[#599bd7] border border-[#d6e8f6] rounded px-4 py-1.5 text-[13px] font-medium w-max group-hover:bg-[#f2f7fc] transition-colors relative z-10">
                Read More
              </button>

              {/* Decorative Corner Shape & Icon */}
              <div className="absolute bottom-0 right-0 w-[110px] h-[110px] bg-[#f5f7f9] rounded-tl-full flex items-end justify-end p-6 transition-transform duration-500 group-hover:scale-110">
                <service.icon 
                  size={36} 
                  strokeWidth={1.5} 
                  className="text-gray-500 group-hover:text-blue-500 transition-colors duration-300" 
                />
              </div>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
