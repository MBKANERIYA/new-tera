import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Building2, PhoneCall, Mail } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactUs() {
  const [activeTab, setActiveTab] = useState('Ground Floor(1)');
  
  const tabs = [
    'Ground Floor(1)', 'Ground Floor(2)', '1st Floor(1)', '1st Floor(2)', 
    '2nd Floor(1)', '2nd Floor(2)', 'Game Zone'
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-[#f2f2f2] border-b border-[#e0e0e0] py-2 px-4 text-sm text-[#333]">
        <div className="max-w-[1200px] mx-auto">
          <Link to="/" className="text-[#0052cc] hover:underline">Home</Link>
          <span className="mx-2 text-[#999]">&gt;</span>
          <span className="text-[#666]">Contact us</span>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-8 flex-1 w-full">
        
        {/* Top Section: Info & Map */}
        <div className="flex flex-col lg:flex-row gap-8 mb-12">
          
          {/* Left Column: Get in Touch */}
          <div className="flex-1">
            <h1 className="text-[28px] font-bold text-[#333] mb-4">Get in Touch</h1>
            
            <p className="text-[#555] text-[14px] leading-[1.6] mb-8">
              Having Questions? Tell us about your Business, Our experts will check all the aspects and call you back to explain how Teralease would help you to get quotes for your Business.
            </p>

            <div className="mb-6">
              <h2 className="text-[#0052cc] font-bold text-[16px] mb-1">Teralease Pvt. Ltd.</h2>
              {/* <p className="text-[#555] text-[13px] mb-3">C/o Teralease Pvt. Ltd.</p> */}
              
              <div className="flex items-start gap-3 mt-4">
                <Building2 className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
                <p className="text-[#555] text-[13px] leading-[1.6]">
                  33 & 33A, Rama Road, Industrial Area, Near Kirti Nagar Metro Station, New Delhi, Delhi, India, Pin - 110015
                </p>
              </div>
            </div>

            <div className="border-t border-[#e0e0e0] my-6"></div>

            <div className="mb-4">
              <p className="text-[#333] text-[13px] mb-1">For any assistance call us at</p>
              <p className="text-[#777] text-[12px] mb-4">( 9:30 AM to 6:00 PM IST, Mon to Sat )</p>
              
              <div className="flex items-center gap-3 mb-4">
                <PhoneCall className="w-5 h-5 text-[#d9534f]" />
                <p className="text-[14px]">
                  <strong className="text-[#333]">India</strong> <span className="text-[#555]">+91-8929175327</span>
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#d9534f]" />
                <a href="#" className="text-[#0052cc] text-[14px] hover:underline">Click here to share your queries / feedback</a>
              </div>
            </div>
            
          </div>

          {/* Right Column: Map */}
          <div className="lg:w-[500px] xl:w-[600px] h-[350px] border border-[#ddd] bg-gray-100 relative">
             <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d14006.113203995874!2d77.1408801!3d28.643908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02df5d5c0e2f%3A0xe5eb6c4296eb4c58!2sRama%20Rd%2C%20Industrial%20Area%2C%20Kirti%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps Location"
            ></iframe>
          </div>
        </div>

        {/* Middle Section: 360 View */}
        <div className="mt-12 mb-8">
          <h2 className="text-center text-[22px] font-bold text-[#333] mb-6">Our Company Interior (360 View)</h2>
          
          <div className="border border-[#ccc] bg-[#f9f9f9]">
            {/* Tabs */}
            <div className="flex flex-wrap border-b border-[#ccc]">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 text-[13px] font-bold transition-colors border-r border-[#ccc] ${
                    activeTab === tab 
                      ? 'bg-[#0052cc] text-white' 
                      : 'bg-[#999] text-white hover:bg-[#777]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            {/* 360 Image Container */}
            <div className="w-full h-[500px] relative bg-black overflow-hidden group cursor-pointer">
              {/* Fake 360 View Controls overlay */}
              <div className="absolute top-4 left-4 bg-black/60 text-white p-2 rounded text-[11px] z-10">
                <p className="font-bold mb-1">Teralease Pvt. Ltd.</p>
                <p>33 & 33A, Rama Road Industrial Area</p>
              </div>

              {/* Fake Compass / Zoom controls (bottom right) */}
              <div className="absolute bottom-8 right-4 flex flex-col gap-2 z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 bg-black/60 text-white flex items-center justify-center rounded-full cursor-pointer hover:bg-black/80">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                </div>
                <div className="flex flex-col bg-black/60 rounded overflow-hidden mt-4">
                  <button className="w-8 h-8 text-white hover:bg-black/80 flex items-center justify-center text-xl font-light border-b border-white/20">+</button>
                  <button className="w-8 h-8 text-white hover:bg-black/80 flex items-center justify-center text-xl font-light">-</button>
                </div>
              </div>

              {/* Placeholder image for 360 view */}
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Office Interior" 
                className="w-full h-full object-cover opacity-90 transition-transform duration-10000 group-hover:scale-110 ease-linear"
              />

              {/* Fake 360 navigation arrows */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 {/* Floor Navigation Arrows placeholder */}
                 <div className="flex gap-4 transform rotate-12 mt-32">
                    <div className="w-16 h-4 bg-white/80 skew-x-[45deg] shadow-lg border border-white"></div>
                    <div className="w-16 h-4 bg-white/80 skew-x-[45deg] shadow-lg border border-white"></div>
                 </div>
              </div>

              <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-between px-2 py-1 text-[10px] text-white/80">
                <span>Google</span>
                <div className="flex gap-3">
                  <span>Keyboard shortcuts</span>
                  <span>Map data Â©2026</span>
                  <span>Terms</span>
                  <span>Report a problem</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <Footer />
    </div>
  );
}
