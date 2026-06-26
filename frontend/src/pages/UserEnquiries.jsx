import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LayoutGrid, Building, Mail, Users, FileText, ChevronDown, PlusCircle, LogOut } from 'lucide-react';
import { generatePropertyUrl } from '../utils/slug';

export default function UserEnquiries() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('property_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        
        fetch(`/api/inquiries/${parsedUser.mobile}`)
          .then(res => res.json())
          .then(data => {
            setInquiries(data);
            setLoading(false);
          })
          .catch(err => {
            console.error(err);
            setLoading(false);
          });
      } catch (e) {
        navigate('/post-property');
      }
    } else {
      navigate('/post-property');
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col bg-[#f4f5f7]">
      <Header />

      {/* Sub Navigation Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1300px] mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <button onClick={() => navigate('/user/dashboard')} className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 border-r border-gray-100 font-medium text-sm flex items-center gap-2 transition-colors">
              <LayoutGrid size={16} /> Dashboard
            </button>
            <div className="relative group">
              <button className="px-6 py-3.5 text-gray-600 hover:text-[#000000] hover:bg-gray-50 font-medium text-sm flex items-center gap-2 transition-colors">
                <Building size={16} /> Properties <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="absolute left-0 top-full w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-md flex flex-col">
                <button onClick={() => navigate('/user/manage-properties')} className="px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 hover:text-[#000000] transition-colors">Manage Properties</button>
                <button onClick={() => navigate('/user/post-property')} className="px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 hover:text-[#000000] transition-colors">Post Property</button>
              </div>
            </div>
            <button onClick={() => navigate('/user/enquiries')} className="px-6 py-3.5 bg-[#000000] text-white font-medium text-sm flex items-center gap-2 transition-colors">
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
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-normal text-gray-800">My Enquiries</h2>
            <div className="text-sm text-gray-500">
              My Account / Enquiries
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded">
            {/* Table Header Controls */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-bold">{inquiries.length} Enquiries</span>
              </div>
            </div>

            {/* Table Header Row */}
            <div className="grid grid-cols-[1fr_200px_200px] bg-[#515A63] text-white text-sm font-medium px-4 py-2.5">
              <div>Inquiry Details</div>
              <div>Contact Info</div>
              <div>Property Info</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="p-10 text-center text-gray-500">Loading enquiries...</div>
              ) : inquiries.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center">
                   <Mail size={48} className="text-gray-300 mb-3" />
                   <p className="text-gray-500 font-medium text-lg">No enquiries found.</p>
                   <p className="text-gray-400 text-sm mt-1">You haven't received any enquiries yet.</p>
                </div>
              ) : (
                inquiries.map(inq => (
                  <div key={inq._id} className="grid grid-cols-[1fr_200px_200px] p-4 group hover:bg-gray-50/50 transition-colors">
                    
                    <div className="flex flex-col gap-1 pr-4 border-r border-gray-100">
                      <span className="text-gray-500 text-xs">{new Date(inq.createdAt).toLocaleString()}</span>
                      <span className="font-bold text-[#333] text-[15px]">{inq.name} sent an inquiry for your property.</span>
                      <p className="text-sm text-gray-600 italic">"I am interested in this property and would like to know more details."</p>
                    </div>

                    <div className="flex flex-col justify-center px-4 border-r border-gray-100 text-[13px] space-y-1.5">
                      <div className="flex"><span className="w-16 text-gray-500">Name:</span> <span className="font-semibold text-gray-800">{inq.name}</span></div>
                      <div className="flex"><span className="w-16 text-gray-500">Phone:</span> <a href={`tel:${inq.number}`} className="font-semibold text-[#B3BCC5] hover:underline">{inq.number}</a></div>
                      <div className="flex"><span className="w-16 text-gray-500">City:</span> <span className="text-gray-700">{inq.city}</span></div>
                    </div>

                    <div className="pl-4 text-[13px] flex flex-col justify-center gap-1.5">
                      {inq.propertyId ? (
                        <>
                          <a href={generatePropertyUrl(inq.propertyId._id, inq.propertyId.title)} target="_blank" rel="noreferrer" className="font-bold text-[#B3BCC5] hover:underline truncate">
                            {inq.propertyId.title}
                          </a>
                          <div className="text-gray-600">{inq.propertyId.city}</div>
                          <div className="text-[#333] font-bold text-sm">{inq.propertyId.price}</div>
                        </>
                      ) : (
                        <span className="text-red-500 italic">Property removed</span>
                      )}
                    </div>

                  </div>
                ))
              )}
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
