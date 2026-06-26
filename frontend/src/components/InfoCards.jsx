import React from 'react';
import { ArrowRight, Timer, Building2, ShieldCheck, Warehouse } from 'lucide-react';

export default function InfoCards() {
  const cards = [
    {
      id: 1,
      title: "List Your Property",
      description: "Lease or sell your commercial space with our premium broker network.",
      buttonText: "Start Listing",
      // Dark sleek gradient
      bgClass: "bg-gradient-to-br from-[#1a1c29] to-[#2d3748]", 
      shadowClass: "hover:shadow-[0_15px_35px_rgba(26,28,41,0.4)]",
      textColor: "text-white",
      icon: Timer
    },
    {
      id: 2,
      title: "Top Industrial Brokers",
      description: "Connect with elite, verified agents specializing in large-scale properties.",
      buttonText: "Find Agents",
      // Premium Gold gradient
      bgClass: "bg-gradient-to-br from-[#c49a2b] to-[#8f6d19]",
      shadowClass: "hover:shadow-[0_15px_35px_rgba(196,154,43,0.4)]",
      textColor: "text-white",
      icon: Building2
    },
    {
      id: 3,
      title: "Verified Commercial Sales",
      description: "Discover high-yield investment opportunities with RERA-certified trust.",
      buttonText: "Explore Sales",
      // Deep teal/emerald gradient
      bgClass: "bg-gradient-to-br from-[#0f4c5c] to-[#062c36]",
      shadowClass: "hover:shadow-[0_15px_35px_rgba(15,76,92,0.4)]",
      textColor: "text-white",
      icon: ShieldCheck
    },
    {
      id: 4,
      title: "Premium Warehouse Leases",
      description: "Browse state-of-the-art logistics hubs across prime Delhi NCR corridors.",
      buttonText: "View Leases",
      // Rich Burgundy gradient
      bgClass: "bg-gradient-to-br from-[#780000] to-[#400000]",
      shadowClass: "hover:shadow-[0_15px_35px_rgba(120,0,0,0.4)]",
      textColor: "text-white",
      icon: Warehouse
    }
  ];

  return (
    <section className="w-full bg-[#f4f6f8] py-12 px-4 relative z-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div 
              key={card.id} 
              className={`${card.bgClass} ${card.textColor} rounded-[16px] p-7 flex flex-col justify-between relative overflow-hidden group hover:-translate-y-2 ${card.shadowClass} transition-all duration-500 ease-out min-h-[220px] border border-white/10`}
            >
              {/* Glassmorphism shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-[19px] font-bold tracking-tight mb-3">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-relaxed mb-6 text-white/80 font-light">
                  {card.description}
                </p>
              </div>

              {/* Button */}
              <button className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold inline-flex items-center w-fit relative z-10 hover:bg-white hover:text-black hover:border-white transition-all duration-300">
                {card.buttonText}
                <ArrowRight size={15} className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>

              {/* Background Icon (Decorative) */}
              <div className="absolute -bottom-8 -right-8 opacity-[0.07] transform group-hover:scale-125 group-hover:-rotate-12 transition-all duration-700 text-white pointer-events-none">
                <card.icon size={150} strokeWidth={1.5} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
