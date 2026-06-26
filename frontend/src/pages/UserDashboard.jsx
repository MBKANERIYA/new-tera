import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { PlusCircle, LayoutGrid, Building, Mail, Users, FileText, ChevronRight, Info, LogOut, ChevronDown } from 'lucide-react';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('property_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        // Fetch properties for this user
        fetch('/api/properties')
          .then(res => res.json())
          .then(data => {
            const userProps = data.filter(p => p.submittedBy === parsedUser.mobile);
            setProperties(userProps);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
          
        // Fetch enquiries
        fetch(`/api/inquiries/${parsedUser.mobile}`)
          .then(res => res.json())
          .then(data => setInquiries(data))
          .catch(err => console.error(err));
          
      } catch (e) {
        navigate('/post-property');
      }
    } else {
      navigate('/post-property');
    }
  }, [navigate]);

  if (!user) return null;

  // Calculate Stats
  const propForSale = properties.filter(p => p.listingType === 'Sale').length;
  const propForRent = properties.filter(p => p.listingType === 'Lease').length;
  
  const activeSale = properties.filter(p => p.listingType === 'Sale' && p.status === 'approved').length;
  const activeRent = properties.filter(p => p.listingType === 'Lease' && p.status === 'approved').length;
  const pendingProps = properties.filter(p => p.status === 'pending').length;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7]">
      <Header />

      {/* Sub Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button className="px-6 py-3.5 bg-[#000000] text-white font-medium text-sm flex items-center gap-2 transition-colors">
              <LayoutGrid size={16} /> Dashboard
            </button>
            <div className="relative group">
              <button className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 border-r border-gray-100 font-medium text-sm flex items-center gap-2 transition-colors">
                <Building size={16} /> Properties <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="absolute left-0 top-full w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-md flex flex-col">
                <button onClick={() => navigate('/user/manage-properties')} className="px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 hover:text-[#000000] border-b border-gray-100 transition-colors">Manage Properties</button>
                <button onClick={() => navigate('/user/post-property')} className="px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 hover:text-[#000000] transition-colors">Post Property</button>
              </div>
            </div>
            <button onClick={() => navigate('/user/enquiries')} className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 border-r border-gray-100 font-medium text-sm flex items-center gap-2 transition-colors">
              <Mail size={16} /> Enquiries
            </button>
            <button className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 border-r border-gray-100 font-medium text-sm flex items-center gap-2 transition-colors">
              <Users size={16} /> Property Leads
            </button>
            <button className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 font-medium text-sm flex items-center gap-2 transition-colors">
              <FileText size={16} /> More
            </button>
          </div>
          <div className="pr-4 py-2 flex items-center gap-3">
            <button 
              onClick={() => navigate('/user/post-property')}
              className="bg-[#000000] hover:bg-[#515A63] text-white px-5 py-2 rounded text-sm font-medium flex items-center gap-2 shadow-sm transition-all"
            >
              <PlusCircle size={16} /> Post Property
            </button>
            <button 
              onClick={() => {
                if(window.confirm('Are you sure you want to logout?')) {
                  localStorage.removeItem('property_user');
                  navigate('/');
                }
              }}
              className="text-gray-500 hover:text-red-500 hover:bg-red-50 p-2 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 py-8 px-4">
        <div className="max-w-[1300px] mx-auto">
          
          <h2 className="text-xl font-normal text-[#000000] mb-4">Your Business Insights</h2>
          
          {/* 4 Colored Metric Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            
            {/* Red Card */}
            <div 
              onClick={() => navigate('/user/enquiries')}
              className="bg-[#707B87] text-white rounded shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <div className="p-4 flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium">Enquiries Received</span>
                <span className="text-[11px] opacity-90 hover:underline">More Info</span>
              </div>
              <div className="px-4 pb-4 flex justify-between items-end relative z-10">
                <Mail size={48} strokeWidth={1} className="opacity-40" />
                <span className="text-4xl font-light">{inquiries.length.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Amber Card */}
            <div 
              onClick={() => navigate('/user/dashboard')}
              className="bg-[#f59e0b] text-white rounded shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <div className="p-4 flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium">Buy Leads</span>
                <span className="text-[11px] opacity-90 hover:underline">More Info</span>
              </div>
              <div className="px-4 pb-4 flex justify-between items-end relative z-10">
                <Building size={48} strokeWidth={1} className="opacity-40" />
                <span className="text-4xl font-light">00</span>
              </div>
            </div>

            {/* Blue Card (Actually Black based on color) */}
            <div 
              onClick={() => navigate('/user/manage-properties')}
              className="bg-[#000000] text-white rounded shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <div className="p-4 flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium">Property for Sale</span>
                <span className="text-[11px] opacity-90 hover:underline">More Info</span>
              </div>
              <div className="px-4 pb-4 flex justify-between items-end relative z-10">
                <Building size={48} strokeWidth={1} className="opacity-40" />
                <span className="text-4xl font-light">{propForSale.toString().padStart(2, '0')}</span>
              </div>
            </div>

            {/* Green Card */}
            <div 
              onClick={() => navigate('/user/manage-properties')}
              className="bg-[#10b981] text-white rounded shadow-sm relative overflow-hidden transition-transform hover:-translate-y-1 duration-300 cursor-pointer"
            >
              <div className="p-4 flex justify-between items-start mb-4 relative z-10">
                <span className="text-sm font-medium">Property for Rent</span>
                <span className="text-[11px] opacity-90 hover:underline">More Info</span>
              </div>
              <div className="px-4 pb-4 flex justify-between items-end relative z-10">
                <PlusCircle size={48} strokeWidth={1} className="opacity-40" />
                <span className="text-4xl font-light">{propForRent.toString().padStart(2, '0')}</span>
              </div>
            </div>

          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button onClick={() => navigate('/user/post-property')} className="border border-gray-300 bg-white px-4 py-2 rounded text-sm font-medium text-gray-700 flex items-center gap-1 hover:border-[#000000] hover:text-[#000000] shadow-sm transition-colors">
              Post Property <ChevronRight size={14} className="ml-1" />
            </button>
            <button onClick={() => navigate('/user/dashboard')} className="border border-gray-300 bg-white px-4 py-2 rounded text-sm font-medium text-gray-700 flex items-center gap-1 hover:border-[#000000] hover:text-[#000000] shadow-sm transition-colors">
              My Profile <ChevronRight size={14} className="ml-1" />
            </button>
            <button onClick={() => navigate('/user/manage-properties')} className="border border-gray-300 bg-white px-4 py-2 rounded text-sm font-medium text-gray-700 flex items-center gap-1 hover:border-[#000000] hover:text-[#000000] shadow-sm transition-colors">
              My Advertisements <ChevronRight size={14} className="ml-1" />
            </button>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Latest Enquiries */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="bg-[#f9f9f9] border-b border-gray-200 px-4 py-3">
                <h3 className="text-sm font-bold text-gray-700">Latest Enquiries</h3>
              </div>
              <div className="p-4">
                {inquiries.length === 0 ? (
                  <div className="text-center py-10 text-gray-400 flex flex-col items-center">
                    <Mail size={32} className="mb-2 opacity-50" />
                    <p className="text-sm">No new enquiries</p>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {inquiries.slice(0, 3).map((inq, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <div>
                          <p className="text-sm font-bold text-gray-800">{inq.name}</p>
                          <p className="text-xs text-gray-500 truncate w-[150px]">{inq.propertyId?.title || "Property"}</p>
                        </div>
                        <a href={`tel:${inq.number}`} className="text-xs bg-gray-100 text-black px-2 py-1 rounded font-medium hover:bg-blue-100 transition-colors">Contact</a>
                      </div>
                    ))}
                    <button onClick={() => navigate('/user/enquiries')} className="text-xs text-[#000000] font-bold mt-2 hover:underline self-start">View All Enquiries</button>
                  </div>
                )}
              </div>
            </div>

            {/* Property Buyers */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="bg-[#f9f9f9] border-b border-gray-200 px-4 py-3">
                <h3 className="text-sm font-bold text-gray-700">Property Buyers</h3>
              </div>
              <div className="p-4 flex flex-col items-center justify-center h-[200px]">
                <div className="w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center mb-3">
                  <Info size={16} />
                </div>
                <p className="text-gray-500 font-medium">No Property Leads Found</p>
              </div>
            </div>

            {/* My Property Stats */}
            <div className="bg-white border border-gray-200 shadow-sm">
              <div className="bg-[#f9f9f9] border-b border-gray-200 px-4 py-3">
                <h3 className="text-sm font-bold text-gray-700">My Property Stats</h3>
              </div>
              <div className="divide-y divide-gray-100">
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Total Property listing Limit</span>
                  <span className="bg-gray-600 text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">10</span>
                </div>
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Active Property Sale</span>
                  <span className="bg-[#10b981] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{activeSale.toString().padStart(2, '0')}</span>
                </div>
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Active Property Rent+PG</span>
                  <span className="bg-[#10b981] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{activeRent.toString().padStart(2, '0')}</span>
                </div>
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Waiting for Approval Property</span>
                  <span className="bg-[#707B87] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">{pendingProps.toString().padStart(2, '0')}</span>
                </div>
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Deleted Property</span>
                  <span className="bg-[#f59e0b] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">00</span>
                </div>
                
                <div className="px-4 py-3 flex justify-between items-center hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">Incomplete Property</span>
                  <span className="bg-[#000000] text-white text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full">00</span>
                </div>

              </div>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
