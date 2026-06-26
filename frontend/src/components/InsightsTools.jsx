import React from 'react';
import { MapPin, ShieldCheck, Newspaper, TrendingUp, ArrowRight } from 'lucide-react';

export default function InsightsTools() {
  const tools = [
    {
      id: 1,
      title: 'Delhi NCR Top Commercial Localities',
      description: 'Planning to buy property in a prime locality in Delhi NCR? Here are some of the top locations with verified commercial and industrial properties.',
      icon: MapPin,
      gradient: 'from-blue-100 to-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      id: 2,
      title: 'Top Agents\nand Brokers',
      description: 'Find details of verified real estate agents in Delhi NCR to get an entire range of property listings by top Agents & consultants across the city.',
      icon: ShieldCheck,
      gradient: 'from-green-100 to-green-50',
      iconColor: 'text-green-600'
    },
    {
      id: 3,
      title: 'Latest Real Estate News,\nViews & Updates',
      description: 'Stay updated with the latest news on the real estate market, updates on industrial & commercial properties around your city.',
      icon: Newspaper,
      gradient: 'from-purple-100 to-purple-50',
      iconColor: 'text-purple-600'
    },
    {
      id: 4,
      title: 'Generating\nReal Estate Leads',
      description: 'Acquire 100% authentic real estate leads and effortlessly connect with a large number of customers within a short period.',
      icon: TrendingUp,
      gradient: 'from-orange-100 to-orange-50',
      iconColor: 'text-orange-600'
    }
  ];

  return (
    <section className="w-full bg-white py-16 px-4 border-t border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        
        {/* Header */}
        <h2 className="text-center text-[28px] md:text-[32px] mb-12">
          <span className="text-[#c82021] font-normal">Insights &</span>{' '}
          <span className="text-[#333] font-medium">Tools</span>
        </h2>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool) => (
            <div 
              key={tool.id} 
              className="bg-[#f7fafe] border border-[#e4eef8] rounded-[4px] p-8 flex flex-col items-center text-center hover:shadow-[0_8px_30px_rgba(44,82,130,0.08)] transition-all duration-300 group cursor-pointer"
            >
              
              {/* Premium Icon Container */}
              <div className={`w-20 h-20 rounded-full bg-gradient-to-b ${tool.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm border border-white/50`}>
                <tool.icon size={36} strokeWidth={1.5} className={tool.iconColor} />
              </div>

              {/* Text Content */}
              <h3 className="text-[#2c5282] font-semibold text-[17px] leading-snug mb-4 whitespace-pre-line group-hover:text-blue-700 transition-colors">
                {tool.title}
              </h3>
              
              <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-1">
                {tool.description}
              </p>

              {/* Action Button */}
              <button className="border border-gray-300 bg-white text-[#4a5568] px-5 py-2 rounded-[4px] text-[13px] font-medium inline-flex items-center group-hover:border-[#2c5282] group-hover:text-[#2c5282] transition-colors">
                Explore Now <ArrowRight size={14} className="ml-1.5 opacity-70 group-hover:translate-x-1 transition-transform" />
              </button>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
