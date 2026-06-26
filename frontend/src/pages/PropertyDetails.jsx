import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Building2, Expand, Calendar, CheckCircle2, ChevronRight, ChevronLeft, X, LayoutGrid, Zap, Shield, HelpCircle, User2, MessageSquare } from 'lucide-react';
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
      const res = await fetch('/api/inquiries', {
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
    fetch(`/api/properties/${id}`)
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
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c82021]"></div>
      </div>
      <Footer />
    </div>
  );

  if (!property) return (
    <div className="flex flex-col min-h-screen bg-[#f4f7f9]">
      <Header />
      <div className="flex-1 flex justify-center items-center">
        <h2 className="text-2xl font-bold text-gray-400">Property Not Found</h2>
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
    <div className="flex flex-col min-h-screen bg-[#f7f9fc]">
      <Header />

      {/* Breadcrumbs */}
      <div className="bg-white/80 backdrop-blur-md border-b border-gray-100 py-3 px-4 sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto flex items-center text-[13px] text-gray-500 overflow-x-auto no-scrollbar font-medium">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              <Link to="#" className="hover:text-[#c82021] transition-colors whitespace-nowrap">{crumb}</Link>
              {idx < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5 mx-2 shrink-0 text-gray-400" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="max-w-[1280px] mx-auto px-4 py-8 md:py-10 w-full flex-1">
        
        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#c82021] text-white text-[12px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">{property.listingType}</span>
              <span className="bg-[#1a365d]/10 text-[#1a365d] text-[12px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">{property.category || property.type}</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight leading-tight">{property.title}</h1>
            <div className="flex items-center text-gray-500 text-[15px] font-medium">
              <MapPin className="w-4 h-4 mr-1.5 text-[#c82021]" />
              {property.location}, {property.city}
            </div>
          </div>
          <div className="text-left md:text-right w-full md:w-auto bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 shrink-0">
            <div className="text-3xl md:text-4xl font-extrabold text-[#1a365d] mb-1 tracking-tight">{property.price}</div>
            <div className="text-gray-500 text-[14px] font-medium tracking-wide text-right">@ {property.pricePerSqFt || 'Market Price'}</div>
          </div>
        </div>

        {/* Premium Gallery Section */}
        <div className="flex flex-col md:flex-row gap-3 mb-10 h-[350px] md:h-[500px]">
          {/* Main Image */}
          <div className="w-full md:w-[70%] h-full relative rounded-2xl md:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] group cursor-pointer" onClick={() => setShowGalleryModal(true)}>
            <img src={activeImage} alt={property.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="absolute bottom-6 left-6 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2.5 rounded-full text-[13px] font-semibold flex items-center gap-2 shadow-lg hover:bg-white/30 transition-colors">
              <LayoutGrid className="w-4 h-4" />
              View Gallery
            </div>
          </div>
          {/* Thumbnails */}
          <div className="w-full md:w-[30%] h-full flex flex-row md:flex-col gap-3 overflow-hidden">
            {(() => {
              const displayThumbs = uniqueThumbs.slice(0, 3);
              const remainingCount = uniqueThumbs.length - 3;

              return displayThumbs.map((img, idx) => {
                const isLast = idx === 2;
                const showOverlay = isLast && remainingCount > 0;

                return (
                  <div 
                    key={idx} 
                    className={`relative w-[120px] md:w-full h-[90px] md:flex-1 shrink-0 rounded-xl md:rounded-2xl cursor-pointer transition-all overflow-hidden shadow-sm hover:shadow-md group ${activeImage === img && !showOverlay ? 'ring-2 ring-offset-2 ring-[#1a365d]' : ''}`}
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
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {showOverlay && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white font-bold text-xl backdrop-blur-sm group-hover:bg-black/60 transition-colors">
                        +{remainingCount}
                      </div>
                    )}
                  </div>
                );
              });
            })()}
          </div>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
          
          {/* Left Column (Main Info) */}
          <div className="flex-1 space-y-8">
            
            {/* Quick Overview Grid */}
            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#c82021] rounded-full"></div>
                Property Overview
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-blue-100 transition-colors">
                  <span className="text-gray-500 text-[12px] mb-2 uppercase font-bold tracking-wider">Total Area</span>
                  <span className="text-gray-900 font-bold flex items-center gap-2 text-lg"><Expand className="w-5 h-5 text-blue-500"/> {property.totalArea}</span>
                </div>
                <div className="flex flex-col bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-green-100 transition-colors">
                  <span className="text-gray-500 text-[12px] mb-2 uppercase font-bold tracking-wider">Status</span>
                  <span className="text-gray-900 font-bold flex items-center gap-2 text-lg"><CheckCircle2 className="w-5 h-5 text-green-500"/> {property.possessionStatus}</span>
                </div>
                <div className="flex flex-col bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-orange-100 transition-colors">
                  <span className="text-gray-500 text-[12px] mb-2 uppercase font-bold tracking-wider">Age</span>
                  <span className="text-gray-900 font-bold flex items-center gap-2 text-lg"><Calendar className="w-5 h-5 text-orange-500"/> {property.categoryData?.buildingAge || "N/A"}</span>
                </div>
                <div className="flex flex-col bg-gray-50/50 p-4 rounded-2xl border border-gray-100 hover:border-purple-100 transition-colors">
                  <span className="text-gray-500 text-[12px] mb-2 uppercase font-bold tracking-wider">Type</span>
                  <span className="text-gray-900 font-bold flex items-center gap-2 text-lg"><Building2 className="w-5 h-5 text-purple-500"/> {property.type}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-[#1a365d] rounded-full"></div>
                Description
              </h2>
              <p className="text-gray-600 text-[16px] leading-loose font-medium">
                {property.description}
              </p>
            </div>

            {/* Detailed Category Data */}
            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full"></div>
                Detailed Specifications
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-5">
                {Object.entries(property.categoryData || {}).map(([key, value]) => {
                  const formattedKey = key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());
                  if (key.includes('owner')) return null;

                  return (
                    <div key={key} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-500 text-[15px] font-medium">{formattedKey}</span>
                      <span className="text-gray-900 text-[15px] font-bold text-right">
                        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Facilities & Specs */}
            <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
                Facilities & Specs
              </h2>
              <div className="flex flex-wrap gap-3">
                {(property.facilities || []).map((fac, idx) => (
                  <span key={idx} className="bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-[14px] font-semibold border border-gray-200 flex items-center gap-2 hover:bg-gray-100 transition-colors">
                    <Shield className="w-4 h-4 text-gray-400" />
                    {fac}
                  </span>
                ))}
                {(property.specs || []).map((spec, idx) => (
                  <span key={idx} className="bg-blue-50/50 text-[#1a365d] px-4 py-2 rounded-xl text-[14px] font-semibold border border-blue-100 flex items-center gap-2 hover:bg-blue-50 transition-colors">
                    <Zap className="w-4 h-4 text-blue-400" />
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Video Tour */}
            {property.images?.video && (
              <div className="bg-white p-7 md:p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100/50">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-red-500 rounded-full"></div>
                  Video Tour
                </h2>
                <div 
                  className="w-full aspect-video rounded-2xl overflow-hidden [&>iframe]:w-full [&>iframe]:h-full bg-gray-900 flex items-center justify-center shadow-inner"
                  dangerouslySetInnerHTML={{ __html: property.images.video }}
                />
              </div>
            )}

          </div>

          {/* Right Column (Sidebar) */}
          <div className="w-full lg:w-[380px] shrink-0 space-y-6">
            
            {/* Premium Contact Card */}
            <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden sticky top-24">
              
              <div className="bg-gradient-to-r from-[#1a365d] to-[#2c5282] p-6 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                <h3 className="text-xl font-bold mb-1 relative z-10">Contact Owner</h3>
                <p className="text-blue-100 text-sm relative z-10">Get more details instantly</p>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 rounded-full flex items-center justify-center font-bold text-2xl shadow-inner border border-white">
                    {(property.categoryData?.ownerName || "Industrial Realty Group").charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-lg">{(property.categoryData?.ownerName || "Industrial Realty Group")}</p>
                    <p className="text-[13px] text-gray-500 font-medium flex items-center gap-1">
                      <User2 className="w-3.5 h-3.5" /> Verified Owner
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <button className="w-full bg-[#c82021] hover:bg-[#a71a1b] text-white py-3.5 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(200,32,33,0.25)] hover:shadow-[0_8px_25px_rgba(200,32,33,0.35)] hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Phone className="w-5 h-5" /> View Phone Number
                  </button>
                  <button onClick={() => setShowInquiryModal(true)} className="w-full bg-white border-2 border-[#1a365d] text-[#1a365d] hover:bg-gray-50 py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:-translate-y-0.5">
                    <MessageSquare className="w-5 h-5" /> Send Message
                  </button>
                </div>

                <div className="text-[12px] text-gray-400 text-center px-2 font-medium flex items-center justify-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5" />
                  We never share your details without consent.
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white p-2 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden h-[320px]">
              <iframe 
                src={`https://maps.google.com/maps?q=${encodeURIComponent(property.location + ', ' + property.city)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '1rem' }} 
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
        <div className="fixed inset-0 z-[100] bg-black/95 flex flex-col backdrop-blur-xl animate-in fade-in duration-300">
          <div className="p-4 md:p-6 flex justify-between items-center text-white bg-gradient-to-b from-black/80 to-transparent">
            <h3 className="font-bold text-xl flex items-center gap-2"><LayoutGrid className="w-5 h-5"/> Property Gallery</h3>
            <button 
              onClick={() => setShowGalleryModal(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 backdrop-blur-md"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-wrap justify-center items-start content-start gap-4 md:gap-6 no-scrollbar">
             {uniqueThumbs.map((img, i) => (
                  <div 
                    key={i} 
                    className="w-full md:w-[48%] lg:w-[31%] h-[250px] md:h-[350px] shrink-0 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] cursor-pointer group relative"
                    onClick={() => setFullScreenIndex(i)}
                  >
                    <img src={img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={`Gallery item ${i}`} />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Expand className="text-white w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
                    </div>
                  </div>
                ))}
          </div>
        </div>
      )}

      {/* Individual Full Screen Image Modal */}
      {fullScreenIndex !== null && (
        <div 
          className="fixed inset-0 z-[110] bg-black flex flex-col justify-center items-center animate-in zoom-in duration-300"
          onClick={() => setFullScreenIndex(null)}
        >
          <button 
            onClick={() => setFullScreenIndex(null)}
            className="absolute top-6 right-6 p-3 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/10 z-[120] backdrop-blur-md"
          >
            <X className="w-6 h-6" />
          </button>
          
          {/* Previous Button */}
          {fullScreenIndex > 0 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFullScreenIndex(fullScreenIndex - 1); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 z-[120] backdrop-blur-md hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          )}

          <img 
            src={uniqueThumbs[fullScreenIndex]} 
            className="max-w-[95%] max-h-[95vh] object-contain shadow-[0_0_100px_rgba(255,255,255,0.05)] rounded-lg" 
            alt="Full screen view" 
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next Button */}
          {fullScreenIndex < uniqueThumbs.length - 1 && (
            <button 
              onClick={(e) => { e.stopPropagation(); setFullScreenIndex(fullScreenIndex + 1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 p-4 text-white hover:bg-white/10 rounded-full transition-colors flex items-center justify-center bg-white/5 z-[120] backdrop-blur-md hover:scale-110"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white font-bold bg-black/50 border border-white/10 px-5 py-2 rounded-full text-sm tracking-widest backdrop-blur-xl z-[120] shadow-2xl">
            {fullScreenIndex + 1} / {uniqueThumbs.length}
          </div>
        </div>
      )}

      {/* Premium Inquiry Modal */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative border border-white/20">
            <button 
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-900 transition-colors bg-gray-50 hover:bg-gray-100 p-2 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send an Inquiry</h2>
              <p className="text-[14px] text-gray-500 font-medium mb-8">Reach out to <span className="text-[#1a365d] font-bold">{property.categoryData?.ownerName || "Industrial Realty Group"}</span> directly.</p>
              
              {inquiryStatus === 'success' ? (
                <div className="text-center py-8 animate-in zoom-in duration-300">
                  <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5 ring-8 ring-green-50/50">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-500 font-medium">The owner will contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleInquirySubmit} className="space-y-5">
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.name}
                      onChange={e => setInquiryData({...inquiryData, name: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] outline-none transition-all text-gray-900 font-medium"
                      placeholder="e.g. Rahul Sharma"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">Phone Number</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.number}
                      onChange={e => setInquiryData({...inquiryData, number: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] outline-none transition-all text-gray-900 font-medium"
                      placeholder="+91 9876543210"
                    />
                  </div>
                  <div>
                    <label className="block text-[13px] font-bold text-gray-700 mb-2 uppercase tracking-wider">City</label>
                    <input 
                      type="text" 
                      required
                      value={inquiryData.city}
                      onChange={e => setInquiryData({...inquiryData, city: e.target.value})}
                      className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d] outline-none transition-all text-gray-900 font-medium"
                      placeholder="e.g. Mumbai"
                    />
                  </div>
                  <button 
                    type="submit" 
                    disabled={inquiryStatus === 'submitting'}
                    className="w-full bg-[#1a365d] hover:bg-[#122643] text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 mt-6 flex justify-center items-center gap-2 disabled:opacity-70 disabled:hover:translate-y-0"
                  >
                    {inquiryStatus === 'submitting' ? 'Sending Message...' : 'Send Inquiry Now'}
                  </button>
                  {inquiryStatus === 'error' && <p className="text-red-500 text-[14px] font-medium text-center mt-3 bg-red-50 py-2 rounded-lg">Failed to send. Please try again.</p>}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
