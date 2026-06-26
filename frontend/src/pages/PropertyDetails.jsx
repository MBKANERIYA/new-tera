import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, Expand, Calendar, CheckCircle2, ChevronRight, ChevronLeft, X } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PropertyDetails() {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [fullScreenIndex, setFullScreenIndex] = useState(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [inquiryData, setInquiryData] = useState({ name: '', number: '', city: '' });
  const [inquiryStatus, setInquiryStatus] = useState('');

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    setInquiryStatus('submitting');
    try {
      const res = await fetch('/_/backend/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId: property._id,
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
        }, 2000);
      } else {
        setInquiryStatus('error');
      }
    } catch (err) {
      console.error(err);
      setInquiryStatus('error');
    }
  };

  React.useEffect(() => {
    fetch(`/_/backend/api/properties/${id}`)
      .then(res => res.json())
      .then(data => {
        setProperty(data);
        setActiveImage(data.images?.main || data.image);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
      <Footer />
    </div>
  );

  if (!property) return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-500">Property Not Found</h2>
      </div>
      <Footer />
    </div>
  );

  const breadcrumbs = property.breadcrumbs || ['Home', 'Properties', property.city];

  const allThumbs = [];
  if (property.images?.main) allThumbs.push(property.images.main);
  if (property.images?.gallery) allThumbs.push(...property.images.gallery);
  const uniqueThumbs = [...new Set(allThumbs)];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa]">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200 py-3 px-4">
        <div className="max-w-[1200px] mx-auto flex items-center text-[13px] text-gray-500 overflow-x-auto no-scrollbar">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Link to="#" className="hover:text-blue-600 transition-colors whitespace-nowrap">{crumb}</Link>
              {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3 h-3 mx-2 shrink-0" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="max-w-[1200px] mx-auto px-4 py-8 w-full flex-1">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-6 bg-white p-6 rounded shadow-sm border border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-[#2d2d2d] text-white text-[11px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">{property.listingType}</span>
              <span className="bg-blue-100 text-blue-800 text-[11px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm">{property.category}</span>
            </div>
            <h1 className="text-2xl md:text-[28px] font-bold text-[#333] mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-500 text-[14px]">
              <MapPin className="w-4 h-4 mr-1 text-[#d9534f]" />
              {property.location}, {property.city}
            </div>
          </div>
          <div className="text-left md:text-right border-t md:border-t-0 border-gray-100 pt-4 md:pt-0 w-full md:w-auto">
            <div className="text-[28px] font-bold text-[#333] text-blue-600 mb-1">{property.price}</div>
            <div className="text-gray-500 text-[13px]">@ {property.pricePerSqFt}</div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 h-[300px] md:h-[450px]">
          {/* Main Image */}
          <div className="w-full md:w-2/3 h-full relative rounded overflow-hidden shadow-sm">
            <img src={activeImage} alt={property.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[12px] flex items-center gap-2">
              <Expand className="w-3 h-3" />
              Click to view full image
            </div>
          </div>
          {/* Thumbnails */}
          <div className="w-full md:w-1/3 h-full flex flex-row md:flex-col gap-4 overflow-hidden">
            {(() => {
              const displayThumbs = uniqueThumbs.slice(0, 3);
              const remainingCount = uniqueThumbs.length - 3;

              return displayThumbs.map((img, idx) => {
                const isLast = idx === 2;
                const showOverlay = isLast && remainingCount > 0;

                return (
                  <div 
                    key={idx} 
                    className={`relative w-[120px] md:w-full h-[90px] md:h-[139px] shrink-0 rounded cursor-pointer border-2 transition-all overflow-hidden ${activeImage === img && !showOverlay ? 'border-blue-500' : 'border-transparent hover:opacity-90'}`}
                    onClick={() => {
                      if (showOverlay) {
                        setShowGalleryModal(true);
                      } else {
                        setActiveImage(img);
                      }
                    }}
                  >
                    <img 
                      src={img} 
                      alt={`Thumbnail ${idx}`} 
                      className="w-full h-full object-cover"
                    />
                    {showOverlay && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white font-bold text-lg backdrop-blur-sm hover:bg-black/70 transition-colors">
                        +{remainingCount} Photos
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column (Main Info) */}
          <div className="flex-1 space-y-8">
            
            {/* Quick Overview */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-2">Property Overview</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[12px] mb-1 uppercase font-semibold">Total Area</span>
                  <span className="text-[#333] font-bold flex items-center gap-2"><Expand className="w-4 h-4 text-blue-500"/> {property.totalArea}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[12px] mb-1 uppercase font-semibold">Status</span>
                  <span className="text-[#333] font-bold flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500"/> {property.possessionStatus}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[12px] mb-1 uppercase font-semibold">Age of Property</span>
                  <span className="text-[#333] font-bold flex items-center gap-2"><Calendar className="w-4 h-4 text-orange-500"/> {property.categoryData?.buildingAge || "N/A"}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500 text-[12px] mb-1 uppercase font-semibold">Building Type</span>
                  <span className="text-[#333] font-bold flex items-center gap-2"><Building2 className="w-4 h-4 text-purple-500"/> {property.type}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-2">Description</h2>
              <p className="text-gray-600 text-[15px] leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Detailed Category Data (Iterating over the object keys intelligently) */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-2">Detailed Specifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                {Object.entries(property.categoryData || {}).map(([key, value]) => {
                  // Format camel case to readable text (e.g. floorLoading -> Floor Loading)
                  const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
                  
                  // Don't show owner details here
                  if (key.includes('owner')) return null;

                  return (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-50 border-dashed">
                      <span className="text-gray-500 text-[14px]">{formattedKey}</span>
                      <span className="text-[#333] text-[14px] font-medium text-right max-w-[60%]">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Facilities & Specs */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <h2 className="text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-2">Facilities & Specs</h2>
              <div className="flex flex-wrap gap-2">
                {(property.facilities || []).map((fac, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-[13px] border border-gray-200">
                    {fac}
                  </span>
                ))}
                {(property.specs || []).map((spec, idx) => (
                  <span key={idx} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-[13px] border border-blue-100">
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Video Tour */}
            {property.images?.video && (
              <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
                <h2 className="text-lg font-bold text-[#333] mb-4 border-b border-gray-100 pb-2">Video Tour</h2>
                <div 
                  className="w-full aspect-video rounded overflow-hidden [&>iframe]:w-full [&>iframe]:h-full bg-gray-50 flex items-center justify-center"
                  dangerouslySetInnerHTML={{ __html: property.images.video }}
                />
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[350px] shrink-0 space-y-6">
            
            {/* Contact Card */}
            <div className="bg-white p-6 rounded shadow-md border-t-4 border-t-blue-600 border-x border-b border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-[#333] mb-4">Contact Owner</h3>
              
              <div className="flex items-center gap-3 mb-6 bg-gray-50 p-3 rounded border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xl">
                  {(property.categoryData?.ownerName || "Industrial Realty Group").charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-[#333]">{(property.categoryData?.ownerName || "Industrial Realty Group")}</p>
                  <p className="text-[12px] text-gray-500">Property Owner</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <button className="w-full bg-[#d9534f] hover:bg-[#c9302c] text-white py-3 rounded font-bold transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-5 h-5" /> View Phone Number
                </button>
                <button onClick={() => setShowInquiryModal(true)} className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded font-bold transition-colors flex items-center justify-center gap-2">
                  <Mail className="w-5 h-5" /> Send Inquiry
                </button>
              </div>

              <div className="text-[11px] text-gray-400 text-center px-4">
                By contacting, you agree to our Terms of Use and Privacy Policy.
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white p-1 rounded shadow-sm border border-gray-100 overflow-hidden h-[300px]">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1m3!1d14006.113203995874!2d77.1408801!3d28.643908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02df5d5c0e2f%3A0xe5eb6c4296eb4c58!2sRama%20Rd%2C%20Industrial%20Area%2C%20Kirti%20Nagar%2C%20New%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Map"
              ></iframe>
            </div>

          </div>
        </div>

      </main>

      <Footer />

      {/* Full Screen Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-md animate-in fade-in duration-300">
          <div className="p-4 flex justify-between items-center text-white border-b border-white/10 bg-black/50">
            <h3 className="font-medium text-lg">Property Gallery</h3>
            <button 
              onClick={() => setShowGalleryModal(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-wrap justify-center items-start content-start gap-4 no-scrollbar">
             {uniqueThumbs.map((img, i) => (
                  <div 
                    key={i} 
                    className="w-full md:w-[48%] lg:w-[32%] h-[300px] md:h-[400px] shrink-0 rounded overflow-hidden border border-white/10 shadow-2xl cursor-pointer group"
                    onClick={() => setFullScreenIndex(i)}
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={`Gallery item ${i}`} />
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Individual Full Screen Image Modal */}
      {fullScreenIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-black/95 flex flex-col justify-center items-center backdrop-blur-md animate-in zoom-in duration-300"
          onClick={() => setFullScreenIndex(null)}
        >
          <button 
            onClick={() => setFullScreenIndex(null)}
            className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 z-[120]"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Previous Button */}
          {fullScreenIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFullScreenIndex(fullScreenIndex - 1); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 z-[120]"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <img 
            src={uniqueThumbs[fullScreenIndex]} 
            className="max-w-[95%] max-h-[95vh] object-contain shadow-2xl rounded-sm" 
            alt="Full screen view" 
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {fullScreenIndex < uniqueThumbs.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFullScreenIndex(fullScreenIndex + 1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 z-[120]"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 bg-black/50 px-4 py-1.5 rounded-full text-sm tracking-widest backdrop-blur-md z-[120]">
            {fullScreenIndex + 1} / {uniqueThumbs.length}
          </div>
        </div>
      )}

      {/* Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden relative">
            <button 
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-1">Contact Owner</h2>
              <p className="text-sm text-gray-500 mb-6">Send an inquiry directly to {property.categoryData?.ownerName || "Industrial Realty Group"}.</p>
              
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
    </div>
  );
}
