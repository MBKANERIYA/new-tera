import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import TestimonialsSection from '../components/TestimonialsSection';

export default function Testimonials() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#e0e0e0] py-3 px-4 text-sm text-[#333]">
        <div className="max-w-[1200px] mx-auto flex items-center">
          <Link to="/" className="text-black hover:underline font-medium">Home</Link>
          <span className="mx-2 text-[#999]">&gt;</span>
          <span className="text-[#666]">Testimonials</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="w-full bg-[#111111] py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent"></div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm">
            Client Success Stories
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Trusted by the Best in <span className="text-[#B3BCC5]">Delhi NCR</span>
          </h1>
          <p className="text-gray-400 text-[15px] md:text-[17px] max-w-2xl leading-relaxed">
            Discover how Teralease is transforming the commercial real estate journey for businesses, investors, and property owners across the region.
          </p>
        </div>
      </div>

      {/* Reusable Testimonials Grid (without duplicate title) */}
      <TestimonialsSection hideTitle={true} />
      
      {/* CTA Banner */}
      <div className="max-w-[1200px] mx-auto px-4 pb-16 w-full">
        <div className="mt-8 bg-gradient-to-r from-[#2D3748] to-[#1A202C] rounded-2xl p-10 text-center shadow-lg border border-gray-700 relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&w=2000&q=80')] opacity-5 bg-cover bg-center"></div>
           <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to find your perfect commercial space?</h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of successful businesses who have found their ideal industrial and commercial properties with Teralease.</p>
              <div className="flex justify-center gap-4">
                <Link to="/properties" className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors">
                  Explore Properties
                </Link>
                <Link to="/post-property" className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-semibold hover:bg-white/10 transition-colors">
                  List Your Property
                </Link>
              </div>
           </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
