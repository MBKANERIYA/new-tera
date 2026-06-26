import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const links = [
    { label: 'Home', path: '/' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Feedback', path: '#' },
    { label: 'Complaints', path: '#' },
    { label: 'Terms & Conditions', path: '#' },
    { label: 'Testimonials', path: '#' },
    { label: 'Sitemap', path: '#' },
    { label: 'Property Leads', path: '#' },
    { label: 'FAQ', path: '#' },
    { label: 'Advertise With Us', path: '#' }
  ];

  return (
    <footer className="w-full bg-[#f8f9fa] border-t border-gray-200 text-[#555] font-sans">
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        
        {/* Top Nav Row */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-3 mb-8 text-[13px]">
          {links.map((link, index) => (
            <React.Fragment key={index}>
              {link.path.startsWith('/') ? (
                <Link to={link.path} className="hover:text-blue-600 transition-colors">{link.label}</Link>
              ) : (
                <a href={link.path} className="hover:text-blue-600 transition-colors">{link.label}</a>
              )}
              {index < links.length - 1 && <span className="text-gray-300">|</span>}
            </React.Fragment>
          ))}
          <span className="text-gray-300 hidden md:inline">|</span>
          <a href="#" className="flex items-center text-[11px] font-bold tracking-wider shadow-sm hover:opacity-90 transition-opacity">
            <span className="bg-[#d9534f] text-white px-2 py-1">LIVE</span>
            <span className="bg-[#333] text-white px-2 py-1">COVERAGE</span>
          </a>
        </div>

        {/* Middle Row (Apps & Socials) */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 mb-6 gap-6">
          
          {/* App Store Buttons */}
          <div className="flex items-center gap-3">
            {/* Google Play */}
            <a href="#" className="bg-black text-white h-[42px] px-3 rounded-[4px] flex items-center gap-2.5 hover:bg-gray-800 transition-colors shadow-sm">
              <svg viewBox="0 0 512 512" className="w-[22px] h-[22px] fill-current text-[#00e676]">
                <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z"/>
              </svg>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[9px] leading-none uppercase mb-[2px]">Get it on</span>
                <span className="text-[15px] leading-none font-semibold">Google Play</span>
              </div>
            </a>
            
            {/* App Store */}
            <a href="#" className="bg-black text-white h-[42px] px-3 rounded-[4px] flex items-center gap-2.5 hover:bg-gray-800 transition-colors shadow-sm">
              <svg viewBox="0 0 384 512" className="w-[22px] h-[22px] fill-current">
                <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
              </svg>
              <div className="flex flex-col items-start justify-center">
                <span className="text-[9px] leading-none uppercase mb-[2px]">Download on the</span>
                <span className="text-[15px] leading-none font-semibold">App Store</span>
              </div>
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-1.5">
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-[#1877f2] text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              <svg viewBox="0 0 320 512" className="w-[18px] h-[18px] fill-current"><path d="M279.1 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.4 0 225.4 0c-73.22 0-121.1 44.38-121.1 124.7v70.62H22.89V288h81.39v224h100.2V288z"/></svg>
            </a>
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-[#f37021] text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              <svg viewBox="0 0 448 512" className="w-[16px] h-[16px] fill-current"><path d="M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"/></svg>
            </a>
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-[#bd081c] text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              {/* Pinterest 'P' Approximation */}
              <span className="font-bold font-serif text-[20px]">P</span>
            </a>
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-black text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              {/* X icon approximation */}
              <span className="font-bold text-[18px]">X</span>
            </a>
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-[#cd201f] text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              <svg viewBox="0 0 576 512" className="w-[18px] h-[18px] fill-current"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>
            </a>
            <a href="#" className="w-[34px] h-[34px] flex items-center justify-center bg-gradient-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888] text-white rounded-[4px] hover:opacity-90 shadow-sm transition-opacity">
              <svg viewBox="0 0 448 512" className="w-[18px] h-[18px] fill-current"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>
            </a>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-200 pt-6">
          <p className="text-[11.5px] leading-[1.6] text-gray-500 text-justify m-0">
            Note : Being an Intermediary, the role of Teralease is limited to provide an online platform that is acting in the capacity of a search engine or advertising agency only, for the Users to showcase their property related information and interact for sale and buying purposes. The Users displaying their properties / projects for sale are solely responsible for the posted contents including the RERA compliance. The Users would be responsible for all necessary verifications prior to any transaction(s). We do not guarantee, control, be party in manner to any of the Users and shall neither be responsible nor liable for any disputes / damages / disagreements arising from any transactions
          </p>
        </div>

      </div>

      {/* Bottom Dark Bar */}
      <div className="bg-[#333] text-gray-400 py-3.5 text-center text-[12px]">
        Copyright Â© 2007-2026 <a href="#" className="text-white hover:underline font-medium">Teralease Pvt. Ltd.</a> All rights reserved. <span className="mx-1 text-gray-500">-</span> <a href="#" className="hover:underline hover:text-white transition-colors">Terms & Conditions</a>
      </div>

    </footer>
  );
}
