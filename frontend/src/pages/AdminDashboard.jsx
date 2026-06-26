import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building, LayoutGrid, Clock, MessageSquare, Plus, ExternalLink, 
  LogOut, Shield, Search, Eye, Edit, Trash2, CheckCircle, XCircle 
} from 'lucide-react';
import { generatePropertyUrl } from '../utils/slug';
import AdminBlogs from '../components/AdminBlogs';
import AdminTestimonials from '../components/AdminTestimonials';
import AdminAgents from '../components/AdminAgents';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory', 'submissions', 'blogs', 'testimonials'
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (!isAdmin) {
      navigate('/admin');
    } else {
      fetchProperties();
    }
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const response = await fetch('/api/properties');
      if (response.ok) {
        const data = await response.json();
        setProperties(data);
      }
    } catch (error) {
      console.error('Failed to fetch properties', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin');
  };

  const handleApprove = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'approved' })
      });
      if (res.ok) fetchProperties();
    } catch (error) {
      console.error('Error approving', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' })
      });
      if (res.ok) fetchProperties();
    } catch (error) {
      console.error('Error rejecting', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this property?')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) fetchProperties();
    } catch (error) {
      console.error('Error deleting', error);
    }
  };

  const activeProperties = properties.filter(p => p.status !== 'pending' && p.status !== 'rejected');
  const pendingProperties = properties.filter(p => p.status === 'pending');
  
  const displayedProperties = (activeTab === 'inventory' ? activeProperties : pendingProperties)
    .filter(p => 
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location?.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex font-sans">
      
      {/* Sidebar */}
      <aside className="w-[280px] bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-gray-100 flex items-center justify-center">
          <img src="/logo.webp" alt="Teralease Logo" className="h-[45px] object-contain" />
        </div>

        <div className="flex-1 py-6 px-4 flex flex-col gap-8 overflow-y-auto">
          
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Overview</p>
            <div className="space-y-1">
              <button 
                onClick={() => setActiveTab('inventory')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${activeTab === 'inventory' ? 'bg-purple-50 text-purple-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <LayoutGrid size={18} />
                  <span className="text-[14px]">Property Inventory</span>
                </div>
                {activeTab === 'inventory' && <span className="bg-purple-100 text-purple-700 text-xs px-2 py-0.5 rounded-full">{activeProperties.length}</span>}
              </button>
              
              <button 
                onClick={() => setActiveTab('submissions')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'submissions' ? 'bg-orange-50 text-orange-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-3">
                  <Clock size={18} />
                  <span className="text-[14px]">Submissions</span>
                </div>
                <span className={`${activeTab === 'submissions' ? 'bg-orange-100 text-orange-600' : 'bg-orange-50 text-orange-500'} text-xs font-bold px-2 py-0.5 rounded-full`}>
                  {pendingProperties.length}
                </span>
              </button>

              <button 
                onClick={() => setActiveTab('blogs')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'blogs' ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <LayoutGrid size={18} />
                <span className="text-[14px]">Manage Blogs</span>
              </button>

              <button 
                onClick={() => setActiveTab('testimonials')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'testimonials' ? 'bg-green-50 text-green-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <MessageSquare size={18} />
                <span className="text-[14px]">Testimonials</span>
              </button>

              <button 
                onClick={() => setActiveTab('agents')}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'agents' ? 'bg-indigo-50 text-indigo-700 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                <Building size={18} />
                <span className="text-[14px]">Manage Agents</span>
              </button>
            </div>
          </div>

          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 ml-2">Quick Actions</p>
            <div className="space-y-1">
              <button onClick={() => navigate('/admin/create')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
                <Plus size={18} />
                <span className="text-[14px]">Add New Property</span>
              </button>
              <Link to="/" target="_blank" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-all">
                <ExternalLink size={18} />
                <span className="text-[14px]">View Live Website</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100">
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-lg">
                A
              </div>
              <div>
                <p className="font-bold text-gray-900 text-sm">admin</p>
                <p className="text-xs text-gray-500">admin@test.com</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors">
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header */}
        <header className="bg-white h-[80px] border-b border-gray-200 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Dashboard</span>
            <span>›</span>
            <span className="font-bold text-gray-900">{activeTab === 'inventory' ? 'Inventory Overview' : 'Pending Submissions'}</span>
          </div>
          <button onClick={() => navigate('/admin/create')} className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg text-sm font-bold shadow-md shadow-purple-500/20 flex items-center gap-2 transition-all">
            <Plus size={16} /> Create Property
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {activeTab === 'blogs' && <AdminBlogs />}
          {activeTab === 'testimonials' && <AdminTestimonials />}
          {activeTab === 'agents' && <AdminAgents />}

          {(activeTab === 'inventory' || activeTab === 'submissions') && (
            <>
              {/* Metrics */}
              <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Building size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Total Properties</p>
                <p className="text-2xl font-black text-gray-900 leading-none">{properties.length}</p>
              </div>
            </div>
            
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                <Eye size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Active Listings</p>
                <p className="text-2xl font-black text-gray-900 leading-none">{activeProperties.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pending</p>
                <p className="text-2xl font-black text-gray-900 leading-none">{pendingProperties.length}</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-gray-100 text-blue-500 flex items-center justify-center shrink-0">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1">Unread Msg</p>
                <p className="text-2xl font-black text-gray-900 leading-none">0</p>
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            
            {/* Table Header Area */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {activeTab === 'inventory' ? 'Property Records' : 'Review Submissions'}
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">
                  {activeTab === 'inventory' ? 'Manage and organize all platform listings' : 'Approve or reject community properties'}
                </p>
              </div>
              <div className="relative w-72">
                <input 
                  type="text" 
                  placeholder="Search by name, location, city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                />
                <Search size={16} className="absolute left-3.5 top-3 text-gray-400" />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Property Details</th>
                    <th className="px-6 py-4 text-center">Type</th>
                    <th className="px-6 py-4 text-center">Category</th>
                    <th className="px-6 py-4">Price</th>
                    <th className="px-6 py-4">{activeTab === 'inventory' ? 'Origin' : 'Submitter Details'}</th>
                    <th className="px-6 py-4 text-center">{activeTab === 'inventory' ? 'Status' : 'Review Action'}</th>
                    {activeTab === 'inventory' && <th className="px-6 py-4 text-right">Actions</th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500">Loading properties...</td></tr>
                  ) : displayedProperties.length === 0 ? (
                    <tr><td colSpan="7" className="p-8 text-center text-gray-500">No properties found.</td></tr>
                  ) : (
                    displayedProperties.map((prop) => (
                      <tr key={prop._id} className="hover:bg-gray-50/50 transition-colors group">
                        
                        {/* Detail Column */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                              {prop.images?.main ? (
                                <img src={prop.images.main} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Building size={20} className="w-full h-full p-4 text-gray-300" />
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-[14px] truncate max-w-[250px]">{prop.title}</p>
                              <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[250px]">{prop.address || `${prop.location}, ${prop.city}`}</p>
                            </div>
                          </div>
                        </td>

                        {/* Type */}
                        <td className="px-6 py-4 text-center">
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                            {prop.listingType || 'N/A'}
                          </span>
                        </td>

                        {/* Category */}
                        <td className="px-6 py-4 text-center text-gray-600 font-medium">
                          {prop.category || 'N/A'}
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4 font-bold text-gray-900">
                          {prop.price || 'Price on Request'}
                        </td>

                        {/* Origin / Submitter */}
                        <td className="px-6 py-4">
                          {activeTab === 'inventory' ? (
                            <span className="text-[11px] font-bold text-gray-500 tracking-wider uppercase">
                              {prop.submittedBy === '1' ? 'ADMIN' : 'USER'}
                            </span>
                          ) : (
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 text-xs">{prop.ownerName || 'N/A'}</span>
                              <span className="text-gray-500 text-[11px] mt-0.5">{prop.ownerContact || 'N/A'}</span>
                              <span className="text-gray-400 text-[10px] mt-1">{new Date(prop.createdAt).toLocaleDateString()}</span>
                            </div>
                          )}
                        </td>

                        {/* Status / Review Action */}
                        <td className="px-6 py-4 text-center">
                          {activeTab === 'inventory' ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                              <CheckCircle size={12} /> ACTIVE
                            </span>
                          ) : (
                            <div className="flex items-center justify-center gap-2">
                              <button onClick={() => navigate(generatePropertyUrl(prop._id, prop.title))} className="p-2 text-gray-400 hover:text-purple-600 transition-colors" title="View Property">
                                <Eye size={18} />
                              </button>
                              <button onClick={() => handleApprove(prop._id)} className="bg-green-50 text-green-600 hover:bg-green-500 hover:text-white border border-green-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider">
                                Approve
                              </button>
                              <button onClick={() => handleReject(prop._id)} className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white border border-red-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider">
                                Reject
                              </button>
                            </div>
                          )}
                        </td>

                        {/* Actions (Only in Inventory) */}
                        {activeTab === 'inventory' && (
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-3">
                              <button onClick={() => navigate(generatePropertyUrl(prop._id, prop.title))} className="text-gray-400 hover:text-purple-600" title="View">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => navigate(`/admin/edit/${prop._id}`)} className="text-gray-400 hover:text-black" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button onClick={() => handleDelete(prop._id)} className="text-gray-400 hover:text-red-600" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        )}

                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

          </div>
            </>
          )}

        </div>
      </main>

    </div>
  );
}
