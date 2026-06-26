import React, { useState, useEffect } from 'react';
import { ChevronDown, CircleHelp, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('property_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage');
      }
    }
  }, []);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex justify-between items-center text-[15px]">

        {/* Left Side: Logo and Location */}
        <div className="flex items-center gap-8">

          {/* Logo Approximation */}
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <div className="flex flex-col items-center mr-1">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#da251d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              <div className="text-[#2a5b9e] text-[9px] font-bold mt-[-8px] bg-white px-0.5">REI</div>
            </div>
            <div className="text-xl tracking-tight flex items-center">
              <span className="text-[#2a5b9e] font-medium">RealEstate</span>
              <span className="text-[#da251d] font-medium">India</span>
            </div>
          </Link>

          {/* Location Dropdown */}
          <div className="flex items-center gap-1 text-[#2a5b9e] cursor-pointer hover:opacity-80 transition-opacity font-medium">
            Gurgaon <ChevronDown size={14} strokeWidth={2.5} />
          </div>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#555] font-medium">

          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2a5b9e]">Industrial <ChevronDown size={14} /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2a5b9e]">Warehouse <ChevronDown size={14} /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2a5b9e]">Commercial <ChevronDown size={14} /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2a5b9e]">Agents <ChevronDown size={14} /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#2a5b9e]">Services <ChevronDown size={14} /></div>
        </nav>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-5">

          {/* Post Property Button with FREE Badge */}
          <div className="relative hidden md:block">
            <Link to="/post-property">
              <button className="bg-[#3876c4] text-white px-5 py-[6px] rounded-full font-medium hover:bg-[#2a5b9e] transition-colors shadow-sm">
                Post Property
              </button>
            </Link>
            <span className="absolute -top-2 -right-1 bg-[#ffcc00] text-[#333] text-[10px] font-bold px-2 py-[1px] rounded-full shadow-sm leading-none flex items-center justify-center pointer-events-none">
              FREE
            </span>
          </div>

          {/* Help Icon */}
          <button className="text-gray-400 hover:text-[#2a5b9e] transition-colors">
            <CircleHelp size={22} strokeWidth={1.5} />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Profile Area */}
          {user ? (
            <Link to="/user/dashboard" className="flex items-center gap-2 cursor-pointer group relative">
              <div className="w-8 h-8 rounded-full bg-[#2a5b9e] flex items-center justify-center text-white shadow-sm">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="text-[13px] text-[#3876c4] flex flex-col leading-tight group-hover:text-[#2a5b9e]">
                <span>Welcome</span>
                <span className="font-medium truncate max-w-[100px]" title={user.name}>{user.name.split(' ')[0]}</span>
              </div>
            </Link>
          ) : (
            <Link to="/post-property" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full border-[1.5px] border-gray-400 flex items-center justify-center text-gray-400 group-hover:border-[#2a5b9e] group-hover:text-[#2a5b9e] transition-colors">
                <User size={18} strokeWidth={1.5} />
              </div>
              <div className="text-[13px] text-gray-500 flex flex-col leading-tight group-hover:text-[#2a5b9e]">
                <span>Hello,</span>
                <span className="font-medium">Sign In</span>
              </div>
            </Link>
          )}

        </div>
      </div>
    </header>
  );
}
