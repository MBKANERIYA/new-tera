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

  const [industrialCities, setIndustrialCities] = useState([]);
  const [warehouseCities, setWarehouseCities] = useState([]);
  const [commercialCities, setCommercialCities] = useState([]);

  useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        const approved = data.filter(p => p.status === 'approved' && p.city);
        
        const getCategory = (p) => {
          if (p.category) return p.category;
          if (p.type && p.type.includes('Industrial')) return 'Industrial';
          if (p.type && (p.type.includes('Warehouse') || p.type.includes('Godown'))) return 'Warehouse';
          return 'Commercial';
        };
        
        const getUniqueCities = (category) => {
          return Array.from(new Set(
            approved
              .filter(p => getCategory(p) === category)
              .map(p => p.city.trim())
          )).sort();
        };

        setIndustrialCities(getUniqueCities('Industrial'));
        setWarehouseCities(getUniqueCities('Warehouse'));
        setCommercialCities(getUniqueCities('Commercial'));
      })
      .catch(err => console.error(err));
  }, []);

  const industrialUrl = (city) => `/properties?search=${city}&propertyType=Industrial+Plot&propertyType=Industrial+Workspace`;
  const warehouseUrl = (city) => `/properties?search=${city}&propertyType=Warehouse+Space&propertyType=Godown`;
  const commercialUrl = (city) => `/properties?search=${city}&propertyType=Office+Space&propertyType=Retail+Shop&propertyType=Commercial+Land&propertyType=Agriculter+Land`;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-[1400px] mx-auto px-4 h-16 flex justify-between items-center text-[15px]">

        {/* Left Side: Logo and Location */}
        <div className="flex items-center gap-8">

          {/* Logo Approximation */}
          <Link to="/" className="flex items-center cursor-pointer hover:opacity-90 transition-opacity">
            <img src="/logo.webp" alt="Teralease Logo" className="h-[35px] object-contain" />
          </Link>

          {/* Location Dropdown */}

        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-[#555] font-medium">

          {/* Industrial Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#000000] py-4">Industrial <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" /></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[320px] p-4 z-50 flex gap-6">
              <div className="flex-1 border-r border-gray-100 pr-6">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By City</h4>
                <div className="space-y-1">
                  {industrialCities.length > 0 ? industrialCities.map(city => (
                    <Link key={city} to={industrialUrl(city)} className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">{city}</Link>
                  )) : (
                    <div className="text-[12px] text-gray-400 px-2">No cities found</div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By Type</h4>
                <div className="space-y-1">
                  <Link to="/properties?propertyType=Industrial+Plot" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Industrial Plot</Link>
                  <Link to="/properties?propertyType=Industrial+Workspace" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Industrial Workspace</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Warehouse Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#000000] py-4">Warehouse <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" /></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[320px] p-4 z-50 flex gap-6">
              <div className="flex-1 border-r border-gray-100 pr-6">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By City</h4>
                <div className="space-y-1">
                  {warehouseCities.length > 0 ? warehouseCities.map(city => (
                    <Link key={city} to={warehouseUrl(city)} className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">{city}</Link>
                  )) : (
                    <div className="text-[12px] text-gray-400 px-2">No cities found</div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By Type</h4>
                <div className="space-y-1">
                  <Link to="/properties?propertyType=Warehouse+Space" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Warehouse Space</Link>
                  <Link to="/properties?propertyType=Godown" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Godown</Link>
                </div>
              </div>
            </div>
          </div>

          {/* Commercial Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 cursor-pointer hover:text-[#000000] py-4">Commercial <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-200" /></div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 min-w-[320px] p-4 z-50 flex gap-6">
              <div className="flex-1 border-r border-gray-100 pr-6">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By City</h4>
                <div className="space-y-1">
                  {commercialCities.length > 0 ? commercialCities.map(city => (
                    <Link key={city} to={commercialUrl(city)} className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">{city}</Link>
                  )) : (
                    <div className="text-[12px] text-gray-400 px-2">No cities found</div>
                  )}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">By Type</h4>
                <div className="space-y-1">
                  <Link to="/properties?propertyType=Office+Space" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Office Space</Link>
                  <Link to="/properties?propertyType=Retail+Shop" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Retail Shop</Link>
                  <Link to="/properties?propertyType=Commercial+Land" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Commercial Land</Link>
                  <Link to="/properties?propertyType=Agriculter+Land" className="block px-2 py-1.5 text-[14px] text-gray-600 hover:text-black hover:bg-gray-50 rounded">Agriculter Land</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1 cursor-pointer hover:text-[#000000]">Agents <ChevronDown size={14} /></div>
          <div className="flex items-center gap-1 cursor-pointer hover:text-[#000000]">Services <ChevronDown size={14} /></div>
        </nav>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-5">

          {/* Post Property Button with FREE Badge */}
          <div className="relative hidden md:block">
            <Link to="/post-property">
              <button className="bg-[#3876c4] text-white px-5 py-[6px] rounded-full font-medium hover:bg-[#000000] transition-colors shadow-sm">
                Post Property
              </button>
            </Link>
            <span className="absolute -top-2 -right-1 bg-[#ffcc00] text-[#333] text-[10px] font-bold px-2 py-[1px] rounded-full shadow-sm leading-none flex items-center justify-center pointer-events-none">
              FREE
            </span>
          </div>

          {/* Help Icon */}
          <button className="text-gray-400 hover:text-[#000000] transition-colors">
            <CircleHelp size={22} strokeWidth={1.5} />
          </button>

          {/* Divider */}
          <div className="h-8 w-px bg-gray-200"></div>

          {/* User Profile Area */}
          {user ? (
            <Link to="/user/dashboard" className="flex items-center gap-2 cursor-pointer group relative">
              <div className="w-8 h-8 rounded-full bg-[#000000] flex items-center justify-center text-white shadow-sm">
                <User size={18} strokeWidth={2} />
              </div>
              <div className="text-[13px] text-[#3876c4] flex flex-col leading-tight group-hover:text-[#000000]">
                <span>Welcome</span>
                <span className="font-medium truncate max-w-[100px]" title={user.name}>{user.name.split(' ')[0]}</span>
              </div>
            </Link>
          ) : (
            <Link to="/post-property" className="flex items-center gap-2 cursor-pointer group">
              <div className="w-8 h-8 rounded-full border-[1.5px] border-gray-400 flex items-center justify-center text-gray-400 group-hover:border-[#000000] group-hover:text-[#000000] transition-colors">
                <User size={18} strokeWidth={1.5} />
              </div>
              <div className="text-[13px] text-gray-500 flex flex-col leading-tight group-hover:text-[#000000]">
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
