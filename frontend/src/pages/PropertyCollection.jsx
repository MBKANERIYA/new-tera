import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronRight, Filter, MapPin, Building2, Search, Heart, Image as ImageIcon, Phone, Mail, ChevronDown, CheckCircle2, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PropertyCollection() {
  const navigate = useNavigate();

  const [propertiesData, setPropertiesData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch('/api/properties')
      .then(res => res.json())
      .then(data => {
        setPropertiesData(data.filter(p => p.status === 'approved'));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);


  const handleCardClick = (id, e) => {
    if (e.target.closest('button') || e.target.closest('a') || e.target.closest('.no-nav')) {
      return;
    }
    navigate(`/property/${id}`);
  };

  
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', number: '', city: '' });
  const [inquiryStatus, setInquiryStatus] = useState('');
  const [selectedPropertyId, setSelectedPropertyId] = useState(null);
  const [selectedOwner, setSelectedOwner] = useState('');

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryStatus('submitting');
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: selectedPropertyId,
          name: inquiryData.name,
          number: inquiryData.number,
          city: inquiryData.city
        })
      });
      if (res.ok) {
        setInquiryStatus('success');
        setTimeout(() => {
          setShowInquiryModal(false);
          setInquiryStatus('');
          setInquiryData({ name: '', number: '', city: '' });
          setSelectedPropertyId(null);
        }, 2000);
      } else {
        setInquiryStatus('error');
      }
    } catch (err) {
      console.error(err);
      setInquiryStatus('error');
    }
  };

  const [searchParams] = useSearchParams();
  const initialListingType = searchParams.get('listingType') || 'All';
  const initialPropertyType = searchParams.getAll('propertyType');
  const initialSearchQuery = searchParams.get('search') || '';

  const [activeListingType, setActiveListingType] = useState(initialListingType);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState(initialPropertyType.length > 0 ? initialPropertyType : []);
  const [budgetRange, setBudgetRange] = useState('Any Budget');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const itemsPerPage = 10;

  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const str = priceStr.replace(/[^0-9.]/g, ''); 
    const num = parseFloat(str);
    if (priceStr.includes('Cr')) return num * 10000000;
    if (priceStr.includes('Lac')) return num * 100000;
    return num;
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeListingType, selectedPropertyTypes, budgetRange, searchQuery]);

  const filteredProperties = propertiesData.filter(p => {
    // 1. Listing Type
    const matchListing = activeListingType === 'All' ? true : (p.listingType === activeListingType || p.listingType === 'Both');
    
    // 2. Property Type
    const matchType = selectedPropertyTypes.length === 0 ? true : selectedPropertyTypes.some(t => p.type.includes(t));
    
    // 3. Budget Range
    let matchBudget = true;
    if (budgetRange !== 'Any Budget') {
      const pVal = parsePrice(p.price);
      if (budgetRange === 'Under ₹ 50 Lacs') matchBudget = pVal < 5000000;
      else if (budgetRange === '₹ 50 Lacs - ₹ 1 Cr') matchBudget = pVal >= 5000000 && pVal <= 10000000;
      else if (budgetRange === '₹ 1 Cr - ₹ 5 Cr') matchBudget = pVal > 10000000 && pVal <= 50000000;
      else if (budgetRange === 'Above ₹ 5 Cr') matchBudget = pVal > 50000000;
    }

    let matchSearch = true;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      matchSearch = (p.title && p.title.toLowerCase().includes(q)) || 
                    (p.address && p.address.toLowerCase().includes(q)) || 
                    (p.locality && p.locality.toLowerCase().includes(q)) ||
                    (p.city && p.city.toLowerCase().includes(q));
    }

    return matchListing && matchType && matchBudget && matchSearch;
  });

  const handlePropertyTypeChange = (type) => {
    if (selectedPropertyTypes.includes(type)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter(t => t !== type));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, type]);
    }
  };

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProperties = filteredProperties.slice(indexOfFirstItem, indexOfLastItem);

  const getVisiblePages = () => {
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 2) {
      return [1, 2, 3];
    }
    if (currentPage >= totalPages - 1) {
      return [totalPages - 2, totalPages - 1, totalPages];
    }
    return [currentPage - 1, currentPage, currentPage + 1];
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center text-[13px] text-gray-500 overflow-x-auto no-scrollbar">
          <Link to="/" className="hover:text-blue-600 transition-colors whitespace-nowrap">Home</Link>
          <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
          <span className="text-gray-800 font-medium">Properties in Delhi NCR</span>
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8 w-full flex-1 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar (Filters) */}
        <div className="w-full lg:w-[280px] shrink-0 space-y-6 lg:sticky lg:top-6 lg:self-start">
          
          <div className="bg-white p-5 rounded shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-gray-100">
              <Filter className="w-4 h-4 text-blue-600" />
              <h2 className="text-[16px] font-bold text-[#333]">Filters</h2>
            </div>

            {/* Transaction Type Filter */}
            <div className="mb-6">
              <h3 className="text-[13px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Transaction Type</h3>
              <div className="flex bg-gray-100 p-1 rounded">
                {['All', 'Sale', 'Lease'].map(type => (
                  <button
                    key={type}
                    onClick={() => setActiveListingType(type)}
                    className={`flex-1 text-[13px] py-1.5 rounded font-medium transition-colors ${
                      activeListingType === type 
                        ? 'bg-white text-blue-600 shadow-sm' 
                        : 'text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Property Type Filter */}
            <div className="mb-6">
              <h3 className="text-[13px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Property Type</h3>
              <div className="space-y-2">
                {Array.from(new Set(propertiesData.map(p => p.type))).map(type => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox" 
                      checked={selectedPropertyTypes.includes(type)}
                      onChange={() => handlePropertyTypeChange(type)}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" 
                    />
                    <span className="text-[14px] text-gray-600 group-hover:text-blue-600 transition-colors">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Budget Range */}
            <div className="mb-6">
              <h3 className="text-[13px] font-bold text-gray-700 mb-3 uppercase tracking-wider">Budget Range</h3>
              <select 
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full border border-gray-200 rounded p-2 text-[14px] text-gray-700 focus:outline-none focus:border-blue-500"
              >
                <option>Any Budget</option>
                <option>Under ₹ 50 Lacs</option>
                <option>₹ 50 Lacs - ₹ 1 Cr</option>
                <option>₹ 1 Cr - ₹ 5 Cr</option>
                <option>Above ₹ 5 Cr</option>
              </select>
            </div>

            <button 
              onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded font-bold transition-colors flex items-center justify-center gap-2"
            >
              <Search className="w-4 h-4" /> Apply Filters
            </button>
          </div>

          {/* Ad Banner Placeholder */}
          <div className="bg-gray-200 rounded h-[250px] flex items-center justify-center text-gray-400 border border-gray-300">
            Advertisement
          </div>
        </div>

        {/* Right Main Content (Property Grid) */}
        <div className="flex-1">
          
          {/* Header & Sorting */}
          <div className="bg-white p-4 rounded shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-[20px] font-bold text-[#333]">
                Properties for {activeListingType === 'All' ? 'Sale & Lease' : activeListingType} in Delhi NCR
              </h1>
              <p className="text-[13px] text-gray-500">Showing {filteredProperties.length} results matching your criteria</p>
            </div>
            
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-[13px] text-gray-500 font-medium">Sort by:</span>
              <select className="border border-gray-200 rounded p-1.5 text-[13px] text-gray-700 focus:outline-none focus:border-blue-500 bg-gray-50">
                <option>Relevance</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Grid */}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="flex flex-col gap-6">

            {currentProperties.map((item) => (
              <div 
                key={item._id}
                onClick={(e) => handleCardClick(item._id, e)}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:shadow-lg transition-shadow group/card relative cursor-pointer"
              >
                <div className="flex flex-col sm:flex-row p-4 gap-5">
                  {/* Image Section */}
                  <div className="relative w-full sm:w-[280px] shrink-0 h-[220px] rounded overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-black/40 hover:bg-black/60 p-1.5 rounded-full cursor-pointer backdrop-blur-sm transition-colors z-10">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 text-white text-[12px] font-medium px-2 py-1 rounded flex items-center gap-1.5 backdrop-blur-sm z-10">
                      {item.totalImages} <ImageIcon className="w-3.5 h-3.5" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 text-white text-[12px] font-medium z-10">
                      Posted on : {new Date(item.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex flex-col flex-1">
                    <p className="text-[13px] text-gray-500 mb-1">{item.city}</p>
                    <Link to={`/property/${item._id}`} className="text-[17px] text-[#2d4b8e] hover:underline font-medium leading-snug mb-4">
                      {item.title}
                    </Link>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 border-b border-gray-100 pb-4">
                      <div>
                        <p className="text-[12px] text-gray-500 mb-0.5">Price</p>
                        <p className="text-[15px] font-bold text-gray-800">{item.price}</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-500 mb-0.5">Built Up Area</p>
                        <p className="text-[13px] font-bold text-gray-800">{item.totalArea}</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-500 mb-0.5">Ownership</p>
                        <p className="text-[13px] font-bold text-gray-800">{item.possessionStatus || "Freehold"}</p>
                      </div>
                      <div>
                        <p className="text-[12px] text-gray-500 mb-0.5">Location</p>
                        <p className="text-[13px] font-bold text-gray-800 truncate" title={item.address}>{item.address}</p>
                      </div>
                    </div>

                    <p className="text-[13px] text-gray-600 line-clamp-2 mb-4 leading-relaxed">
                      {item.description} <Link to={`/property/${item._id}`} className="text-blue-600 hover:underline ml-1">...more</Link>
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {(item.tags || []).map((tag, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-600 text-[11px] font-medium px-2.5 py-1 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Agent & Actions */}
                <div className="border-t border-gray-100 px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <img src={"https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop"} alt={"Industrial Realty Group"} className="w-10 h-10 rounded object-cover border border-gray-200" />
                    <div className="flex flex-col">
                      <span className="font-bold text-[14px] text-gray-800">{"Industrial Realty Group"}</span>
                      <div className="flex items-center text-[12px] text-gray-500 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-red-500 mr-1" /> Agent
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button onClick={(e) => { e.stopPropagation(); setSelectedPropertyId(item._id); setSelectedOwner("Industrial Realty Group"); setShowInquiryModal(true); }} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white border border-[#2d4b8e] text-[#2d4b8e] hover:bg-[#f5f8ff] py-2 px-5 rounded font-medium text-[13px] transition-colors">
                      <Mail className="w-4 h-4" /> Send Inquiry
                    </button>
                    <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2d4b8e] hover:bg-[#1e3466] text-white py-2 px-5 rounded font-medium text-[13px] transition-colors">
                      <Phone className="w-4 h-4" /> View Phone No.
                    </button>
                  </div>
                </div>

                {/* Similar Listings */}
                <div className="bg-[#fcfcff] border-t border-gray-100 px-5 py-3 flex items-center justify-between cursor-pointer hover:bg-[#f5f5fc] transition-colors group/similar">
                  <span className="text-[12px] text-gray-600 group-hover/similar:text-[#6b46c1] transition-colors">
                    <span className="font-bold text-[#6b46c1]">{item.similarListings}</span> Similar listings by <span className="font-bold text-gray-800">{"Industrial Realty Group"}</span> in this area
                  </span>
                  <div className="bg-[#f0edf7] rounded-full p-1 group-hover/similar:bg-[#e4def0] transition-colors">
                    <ChevronDown className="w-4 h-4 text-[#6b46c1]" />
                  </div>
                </div>

              </div>
            ))}
          </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-1 bg-white border border-gray-200 rounded shadow-sm p-1">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1.5 font-medium rounded ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 transition-colors'}`}
                >
                  Prev
                </button>
                
                {getVisiblePages().map((pageNum) => (
                  <button 
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1.5 font-medium rounded transition-colors ${currentPage === pageNum ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {pageNum}
                  </button>
                ))}

                <button 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1.5 font-medium rounded ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100 transition-colors'}`}
                >
                  Next
                </button>
              </div>
            </div>
          )}

        </div>

      
      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300" onClick={(e) => e.stopPropagation()}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowInquiryModal(false);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Owner</h2>
              <p className="text-sm text-gray-500 mb-6">Send an inquiry directly to {selectedOwner}.</p>
              
              {inquiryStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Inquiry Sent Successfully!</h3>
                  <p className="text-gray-500">The owner will get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.name}
                      onChange={e => setInquiryData({...inquiryData, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.number}
                      onChange={e => setInquiryData({...inquiryData, number: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.city}
                      onChange={e => setInquiryData({...inquiryData, city: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                      placeholder="e.g. Mumbai"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={inquiryStatus === 'submitting'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-colors mt-4 flex justify-center items-center gap-2 disabled:opacity-70"
                  >
                    {inquiryStatus === 'submitting' ? 'Sending...' : 'Send Inquiry'}
                  </button>
                  {inquiryStatus === 'error' && <p className="text-red-500 text-sm text-center mt-2">Failed to send inquiry. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      </main>

      <Footer />
    </div>
  );
}
