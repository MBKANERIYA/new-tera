import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { LayoutGrid, Building, Mail, Users, FileText, ChevronDown, PlusCircle, LogOut, Edit, Trash2, RefreshCw, Users2, ImageIcon, Info } from 'lucide-react';
import { generatePropertyUrl } from '../utils/slug';

export default function UserManageProperties() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filter States
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [statusFilter, setStatusFilter] = useState('All');

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
          
      } catch (e) {
        navigate('/post-property');
      }
    } else {
      navigate('/post-property');
    }
  }, [navigate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this property? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/properties/${id}`, {
          method: 'DELETE'
        });
        if (res.ok) {
          setProperties(prev => prev.filter(p => p._id !== id));
        }
      } catch (err) {
        console.error('Failed to delete property', err);
      }
    }
  };

  if (!user) return null;

  // Filter & Sort Logic
  let processedProperties = [...properties];

  // Apply Status Filter
  if (statusFilter !== 'All') {
    processedProperties = processedProperties.filter(p => {
      if (statusFilter === 'Active') return p.status === 'approved';
      if (statusFilter === 'Pending') return p.status === 'pending';
      return true;
    });
  }

  // Apply Sort
  processedProperties.sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return sortOrder === 'Newest First' ? dateB - dateA : dateA - dateB;
  });

  // Apply Pagination (Items per page)
  const displayedProperties = processedProperties.slice(0, itemsPerPage);

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
              <button className="px-6 py-3.5 bg-[#000000] text-white font-medium text-sm flex items-center gap-2 transition-colors">
                <Building size={16} /> Properties <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="absolute left-0 top-full w-48 bg-white border border-gray-200 shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 rounded-b-md flex flex-col">
                <button onClick={() => navigate('/user/manage-properties')} className="px-4 py-3 text-sm text-left text-[#000000] bg-gray-100/50 border-b border-gray-100 transition-colors font-medium">Manage Properties</button>
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
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-normal text-gray-800">Manage Properties</h2>
            <div className="text-sm text-gray-500">
              My Account / Properties / Manage Property
            </div>
          </div>

          <div className="bg-white border border-gray-200 shadow-sm rounded">
            {/* Table Header Controls */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="font-bold">{processedProperties.length} Properties</span>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-[#000000] focus:ring-[#000000]" />
                  Select All
                </label>
                <button className="px-3 py-1 bg-white border border-gray-300 text-gray-500 rounded hover:bg-gray-100 transition-colors disabled:opacity-50" disabled>Delete</button>
              </div>
              
              <div className="flex items-center gap-3">
                <select 
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="border border-gray-300 text-sm rounded px-2 py-1.5 focus:ring-[#000000] focus:border-[#000000] outline-none cursor-pointer"
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <select 
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="border border-gray-300 text-sm rounded px-2 py-1.5 focus:ring-[#000000] focus:border-[#000000] outline-none cursor-pointer"
                >
                  <option value="Newest First">Newest First</option>
                  <option value="Oldest First">Oldest First</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="border border-gray-300 text-sm rounded px-2 py-1.5 focus:ring-[#000000] focus:border-[#000000] outline-none cursor-pointer"
                >
                  <option value="All">All ({properties.length})</option>
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>

            {/* Table Header Row */}
            <div className="grid grid-cols-[1fr_200px_180px] bg-[#515A63] text-white text-sm font-medium px-4 py-2.5">
              <div>Property Details</div>
              <div>Date & Views</div>
              <div>Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {loading ? (
                <div className="p-10 text-center text-gray-500">Loading properties...</div>
              ) : properties.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center">
                   <Building size={48} className="text-gray-300 mb-3" />
                   <p className="text-gray-500 font-medium text-lg">No properties found.</p>
                   <p className="text-gray-400 text-sm mt-1">You haven't posted any properties yet.</p>
                   <button onClick={() => navigate('/user/post-property')} className="mt-4 px-6 py-2 bg-[#000000] text-white rounded font-medium hover:bg-[#515A63] transition-colors">Post Property</button>
                </div>
              ) : displayedProperties.length === 0 ? (
                <div className="p-10 text-center flex flex-col items-center">
                   <p className="text-gray-500 font-medium text-lg">No properties match your filters.</p>
                   <button onClick={() => setStatusFilter('All')} className="mt-4 text-blue-600 hover:underline">Clear Filters</button>
                </div>
              ) : (
                displayedProperties.map(prop => (
                  <div key={prop._id} className="grid grid-cols-[1fr_200px_180px] p-4 group hover:bg-gray-50/50 transition-colors">
                    
                    {/* Property Details */}
                    <div className="flex gap-4">
                      <div className="pt-1">
                        <input type="checkbox" className="rounded border-gray-300 text-[#000000] focus:ring-[#000000]" />
                      </div>
                      <div className="flex-1">
                        <a href={generatePropertyUrl(prop._id, prop.title)} target="_blank" rel="noreferrer" className="text-[#000000] font-medium text-[15px] hover:underline leading-snug block mb-3">
                          {prop.title} ({prop._id.slice(-6).toUpperCase()})
                        </a>
                        <div className="flex gap-5">
                          <div className="w-28 h-24 bg-gray-100 rounded border border-gray-200 flex flex-col items-center justify-center text-gray-400 overflow-hidden relative">
                            {prop.images?.main || (prop.images?.gallery && prop.images.gallery[0]) ? (
                              <img src={prop.images.main || prop.images.gallery[0]} alt="Property" className="w-full h-full object-cover" />
                            ) : (
                              <>
                                <ImageIcon size={24} className="mb-1 opacity-50" />
                                <span className="text-[10px] text-center px-2 leading-tight opacity-70">No Property<br/>Image Available</span>
                                <button className="absolute bottom-2 bg-[#515A63] text-white text-[10px] px-3 py-1 rounded-full font-medium hover:bg-[#000000] transition-colors">Add Photos</button>
                              </>
                            )}
                          </div>
                          <div className="flex-1 pt-1 space-y-1 text-[13px]">
                            <div className="flex">
                              <span className="w-16 text-gray-500">Price :</span>
                              <span className="font-bold text-gray-900">₹ {prop.price}</span>
                            </div>
                            <div className="flex mt-1">
                              <span className="w-16 text-gray-500">Area :</span>
                              <span className="font-medium text-gray-800">{prop.totalArea || prop.carpetArea || 'N/A'} Sq.ft.</span>
                            </div>
                            
                            <div className="mt-4 flex items-center gap-2 pt-2">
                              <span className="text-gray-500 text-[11px]">Completion :</span>
                              <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full bg-[#B3BCC5]" style={{ width: '62%' }}></div>
                              </div>
                              <span className="text-gray-600 text-[11px] font-bold">62%</span>
                              <Info size={12} className="text-[#B3BCC5] cursor-help" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date & Views */}
                    <div className="text-[12px] space-y-1.5 pl-6 border-l border-gray-100">
                      <div className="flex"><span className="w-20 text-gray-500">Updated On</span> <span className="text-gray-400 mx-1">:</span> <span className="text-gray-700">{new Date(prop.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></div>
                      <div className="flex"><span className="w-20 text-gray-500">Response</span> <span className="text-gray-400 mx-1">:</span> <span className="text-gray-700">0</span></div>
                      <div className="flex"><span className="w-20 text-gray-500">Visitors</span> <span className="text-gray-400 mx-1">:</span> <span className="text-gray-700">0</span></div>
                      <div className="flex">
                        <span className="w-20 text-gray-500">Status</span> <span className="text-gray-400 mx-1">:</span> 
                        <span className={`font-bold ${prop.status === 'approved' ? 'text-[#B3BCC5]' : prop.status === 'rejected' ? 'text-red-500' : 'text-orange-500'}`}>
                          {prop.status.charAt(0).toUpperCase() + prop.status.slice(1)}
                        </span>
                      </div>
                      <div className="pt-2">
                        <button className="bg-[#ff4d4d] text-white text-[11px] font-bold px-3 py-1.5 rounded hover:bg-red-600 transition-colors shadow-sm">Mark As Premium</button>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="text-[13px] pl-6 border-l border-gray-100 flex flex-col gap-3">
                      <button onClick={() => navigate(`/user/edit-property/${prop._id}`)} className="flex items-center gap-2 text-[#B3BCC5] hover:underline w-fit">
                        <Edit size={14} /> Edit
                      </button>
                      <button className="flex items-center gap-2 text-[#B3BCC5] hover:underline w-fit">
                        <RefreshCw size={14} /> Property Refresh
                      </button>
                      <button className="flex items-center gap-2 text-[#B3BCC5] hover:underline w-fit">
                        <Users2 size={14} /> Matching Buyer
                      </button>
                      <button onClick={() => handleDelete(prop._id)} className="flex items-center gap-2 text-[#B3BCC5] hover:text-red-500 hover:underline w-fit transition-colors">
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
            
            {/* Table Footer Pagination */}
            {properties.length > 0 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-sm text-gray-500 flex justify-between items-center">
              <div>
                Showing 1 to {displayedProperties.length} of {processedProperties.length} entries
              </div>
              <div className="flex gap-1">
                <button className="px-3 py-1 bg-[#000000] text-white rounded text-xs font-bold">1</button>
              </div>
            </div>
            )}
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
