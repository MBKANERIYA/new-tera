import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { LogOut, Upload, CheckCircle2, X, Info, Home, MapPin, Image as ImageIcon, User, Building, Zap, Briefcase, Navigation, Shield, Factory, Trees } from 'lucide-react';

export default function UserPostProperty() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', priceUnit: 'Lacs', pricePerSqFt: '', emiStart: '',
    listingType: 'Lease', category: 'Warehouse', isFeatured: false, isRera: false,
    reraNumber: '', builder: '', type: 'Warehouse', subType: 'warehouse',
    location: '', city: '', pincode: '', address: '', latitude: '', longitude: '',
    googleMapLink: '', constructionStatus: 'Ready to Move', possessionDate: 'Immediate',
    whatsNew: '', floorNo: 'Ground', carpetArea: '', builtUpArea: '', totalArea: '', areaUnit: 'Sq Ft',
    totalFloors: '1', noOfRooms: '', structureType: '', listingAge: '', noOfFloors: '1',
    facing: '', overlooking: '', ownership: 'Freehold', transactionType: 'New Property',
    flooring: '', propertyAge: '', availability: '', furnishingState: 'Unfurnished',
    centralHeat: false, furnishing: '', facilities: '', specs: '', breadcrumbs: '',
    status: 'pending', submittedBy: 'user', tags: '',
    
    // Category Data
    ownerName: '', ownerContact: '', cd_totalArea: '', cd_possessionStatus: '',
    buildingAge: '1', length: '', width: '', height: '', floors: '1', flooringType: '',
    floorLoading: '', floorSlope: 'No', ceilingType: '', trussCapacity: '',
    parkingSize: '', dockLevellers: false, boundaryWall: '', overheadCrane: false,
    powerConnection: false, powerLoad: '', smokeDetector: false, sprinkler: false,
    fans: false, hvac: false, toilets: '', drainageSewage: false, internet: false,
    officeCabin: false, waterConnection: false, hiBayLights: false, dgAvailability: false,
    accessRoad: '', truckSpace: '', nearestHighway: '', cctv: false, gateLocking: false,
    guard: false, wireFencing: false, licenseNoc: false, propertyTaxNdc: false,
    buildingCompletion: false, litigationFree: false, occupancyCert: false,
    nocEnvironment: false, zonningApproval: false
  });
  
  const [mediaFiles, setMediaFiles] = useState({
    mainImage: null,
    gallery: [],
    video: null
  });

  const [previews, setPreviews] = useState({
    mainImage: null,
    gallery: [],
    video: null
  });

  useEffect(() => {
    return () => {
      if (previews.mainImage) URL.revokeObjectURL(previews.mainImage);
      if (previews.video) URL.revokeObjectURL(previews.video);
      previews.gallery.forEach(p => URL.revokeObjectURL(p));
    };
  }, [previews]);

  useEffect(() => {
    const storedUser = localStorage.getItem('property_user');
    if (!storedUser) {
      navigate('/post-property');
    } else {
      const user = JSON.parse(storedUser);
      setFormData(prev => ({ ...prev, submittedBy: user.mobile }));
    }
  }, [navigate]);

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        try {
          const res = await fetch(`/api/properties/${id}`);
          if (res.ok) {
            const data = await res.json();
            
            // Reconstruct extraFields
            let parsedExtraFields = { Utilities: [], Legal: [], Access: [], Security: [] };
            if (data.extraFields) {
              try { parsedExtraFields = JSON.parse(data.extraFields); } catch(e) {}
            }

            setExtraFields(parsedExtraFields);

            // Populate formData
            const newData = { ...formData };
            Object.keys(newData).forEach(key => {
              if (data[key] !== undefined && key !== 'price') {
                newData[key] = data[key];
              }
            });

            // Parse price and priceUnit from existing DB value
            if (data.price) {
               const cleanPrice = data.price.replace('₹', '').trim();
               const spaceIdx = cleanPrice.indexOf(' ');
               if(spaceIdx !== -1) {
                  newData.price = cleanPrice.substring(0, spaceIdx);
                  newData.priceUnit = cleanPrice.substring(spaceIdx + 1);
               } else {
                  newData.price = cleanPrice;
                  newData.priceUnit = 'Lacs';
               }
            }

            // Parse totalArea and areaUnit
            if (data.totalArea) {
               const cleanArea = data.totalArea.trim();
               const spaceIdx = cleanArea.indexOf(' ');
               if (spaceIdx !== -1) {
                  newData.totalArea = cleanArea.substring(0, spaceIdx);
                  newData.areaUnit = cleanArea.substring(spaceIdx + 1);
               } else {
                  newData.totalArea = cleanArea;
                  newData.areaUnit = 'Sq Ft';
               }
            }

            // Populate categoryData
            if (data.categoryData) {
              const cd = typeof data.categoryData === 'string' ? JSON.parse(data.categoryData) : data.categoryData;
              Object.keys(cd).forEach(k => {
                let mappedKey = k === 'totalArea' ? 'cd_totalArea' : (k === 'possessionStatus' ? 'cd_possessionStatus' : k);
                newData[mappedKey] = cd[k];
              });
            }

            // Convert array fields back to comma strings for inputs (if necessary)
            ['tags', 'furnishing', 'facilities', 'specs', 'breadcrumbs'].forEach(k => {
              if (Array.isArray(newData[k])) {
                newData[k] = newData[k].join(', ');
              }
            });

            setFormData(newData);

            // Populate media previews
            const newPreviews = { mainImage: null, gallery: [], video: null };
            if (data.images) {
              if (data.images.main) newPreviews.mainImage = data.images.main;
              if (data.images.video) newPreviews.video = data.images.video;
              if (data.images.gallery) newPreviews.gallery = data.images.gallery;
            }
            setPreviews(newPreviews);
            
            // We set an 'existing' flag to track media correctly on submit
            setMediaFiles(prev => ({
              ...prev,
              existingGallery: data.images?.gallery || [],
              removeMain: false,
              removeVideo: false
            }));

          }
        } catch (error) {
          console.error("Error fetching property:", error);
        }
      };
      fetchProperty();
    }
  }, [id]);

  // Auto-calculate Price / Sq Ft
  useEffect(() => {
    if (formData.price && formData.totalArea) {
      const priceVal = parseFloat(formData.price);
      const areaVal = parseFloat(formData.totalArea);
      
      if (!isNaN(priceVal) && !isNaN(areaVal) && areaVal > 0) {
        let priceMultiplier = 1;
        if (formData.priceUnit.includes('K')) priceMultiplier = 1000;
        else if (formData.priceUnit.includes('Lacs')) priceMultiplier = 100000;
        else if (formData.priceUnit.includes('Cr')) priceMultiplier = 10000000;
        
        let areaMultiplier = 1;
        if (formData.areaUnit === 'Sq Mtr') areaMultiplier = 10.7639;
        else if (formData.areaUnit === 'Acre') areaMultiplier = 43560;
        else if (formData.areaUnit === 'Hectare') areaMultiplier = 107639;
        else if (formData.areaUnit === 'Sq Yd') areaMultiplier = 9;
        
        const totalValue = priceVal * priceMultiplier;
        const totalSqFt = areaVal * areaMultiplier;
        
        const calcPricePerSqFt = Math.round(totalValue / totalSqFt);
        
        setFormData(prev => {
           const newVal = `₹ ${calcPricePerSqFt}`;
           if (prev.pricePerSqFt !== newVal) {
              return { ...prev, pricePerSqFt: newVal };
           }
           return prev;
        });
      }
    }
  }, [formData.price, formData.priceUnit, formData.totalArea, formData.areaUnit]);

  const handleLogout = () => {
    navigate('/user/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFiles(prev => ({ ...prev, mainImage: file }));
      setPreviews(prev => ({ ...prev, mainImage: URL.createObjectURL(file) }));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      if (!mediaFiles.mainImage) {
        setMediaFiles(prev => ({ ...prev, mainImage: files[0], gallery: [...prev.gallery, ...files.slice(1)] }));
        const mainPrev = URL.createObjectURL(files[0]);
        const galPrev = files.slice(1).map(f => URL.createObjectURL(f));
        setPreviews(prev => ({ ...prev, mainImage: mainPrev, gallery: [...prev.gallery, ...galPrev] }));
      } else {
        setMediaFiles(prev => ({ ...prev, gallery: [...prev.gallery, ...files] }));
        const newPreviews = files.map(f => URL.createObjectURL(f));
        setPreviews(prev => ({ ...prev, gallery: [...prev.gallery, ...newPreviews] }));
      }
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFiles(prev => ({ ...prev, video: file }));
      setPreviews(prev => ({ ...prev, video: URL.createObjectURL(file) }));
    }
  };

  const removeMainImage = () => {
    if (previews.mainImage && previews.mainImage.startsWith('blob:')) URL.revokeObjectURL(previews.mainImage);
    setMediaFiles(prev => ({ ...prev, mainImage: null, removeMain: true }));
    setPreviews(prev => ({ ...prev, mainImage: null }));
    const input = document.getElementById('mainImageInput');
    if (input) input.value = '';
  };

  const removeGalleryImage = (index) => {
    if (previews.gallery[index] && previews.gallery[index].startsWith('blob:')) {
       URL.revokeObjectURL(previews.gallery[index]);
    }
    setPreviews(prev => {
      const newPreviews = [...prev.gallery];
      newPreviews.splice(index, 1);
      return { ...prev, gallery: newPreviews };
    });
    setMediaFiles(prev => {
       // If it's an existing image (starts with http), remove from existingGallery
       const previewUrl = previews.gallery[index];
       if (previewUrl && previewUrl.startsWith('http')) {
          const newExisting = prev.existingGallery.filter(url => url !== previewUrl);
          return { ...prev, existingGallery: newExisting };
       } else {
          // It's a newly uploaded file, we need to map back to the actual file index
          // We count how many existing images there are to offset the index
          const offset = prev.existingGallery ? prev.existingGallery.length : 0;
          const newGallery = [...prev.gallery];
          newGallery.splice(index - offset, 1);
          return { ...prev, gallery: newGallery };
       }
    });
    
    const input = document.getElementById('galleryInput');
    if (input && mediaFiles.gallery.length <= 1) input.value = ''; 
  };

  const removeVideo = () => {
    if (previews.video && previews.video.startsWith('blob:')) URL.revokeObjectURL(previews.video);
    setMediaFiles(prev => ({ ...prev, video: null, removeVideo: true }));
    setPreviews(prev => ({ ...prev, video: null }));
    const input = document.getElementById('videoInput');
    if (input) input.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    const data = new FormData();
    const payload = { ...formData };
    
    const categoryDataKeys = ['ownerName', 'ownerContact', 'cd_totalArea', 'cd_possessionStatus', 'buildingAge', 'length', 'width', 'height', 'floors', 'flooringType', 'floorLoading', 'floorSlope', 'ceilingType', 'trussCapacity', 'parkingSize', 'dockLevellers', 'boundaryWall', 'overheadCrane', 'powerConnection', 'powerLoad', 'smokeDetector', 'sprinkler', 'fans', 'hvac', 'toilets', 'drainageSewage', 'internet', 'officeCabin', 'waterConnection', 'hiBayLights', 'dgAvailability', 'accessRoad', 'truckSpace', 'nearestHighway', 'cctv', 'gateLocking', 'guard', 'wireFencing', 'licenseNoc', 'propertyTaxNdc', 'buildingCompletion', 'litigationFree', 'occupancyCert', 'nocEnvironment', 'zonningApproval'];

    const categoryData = {};
    categoryDataKeys.forEach(k => {
      let keyName = k === 'cd_totalArea' ? 'totalArea' : (k === 'cd_possessionStatus' ? 'possessionStatus' : k);
      categoryData[keyName] = payload[k];
      delete payload[k];
    });
    
    payload.price = `₹ ${payload.price} ${payload.priceUnit}`;
    delete payload.priceUnit;

    if (payload.totalArea) {
      payload.totalArea = `${payload.totalArea} ${payload.areaUnit}`;
    }
    delete payload.areaUnit;
    
    payload.categoryData = JSON.stringify(categoryData);
    payload.extraFields = JSON.stringify(extraFields);

    for (const key in payload) {
      data.append(key, payload[key]);
    }
    
    if (mediaFiles.mainImage) {
      data.append('mainImage', mediaFiles.mainImage);
    }
    mediaFiles.gallery.forEach(file => {
      data.append('gallery', file);
    });
    if (mediaFiles.video) {
      data.append('video', mediaFiles.video);
    }

    if (mediaFiles.existingGallery) {
      data.append('existingGallery', JSON.stringify(mediaFiles.existingGallery));
    }
    if (mediaFiles.removeMain) data.append('removeMain', 'true');
    if (mediaFiles.removeVideo) data.append('removeVideo', 'true');

    try {
      const url = id ? `/api/properties/${id}` : '/api/properties';
      const method = id ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: data,
      });

      if (response.ok) {
        setSuccess(true);
        setMediaFiles({ mainImage: null, gallery: [], video: null });
        setPreviews({ mainImage: null, gallery: [], video: null });
        e.target.reset();
        window.scrollTo(0,0);
        setTimeout(() => {
          navigate('/user/dashboard');
        }, 1500);
      } else {
        alert('Failed to add property');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error adding property');
    } finally {
      setLoading(false);
    }
  };


  const [extraFields, setExtraFields] = useState({
    Utilities: [],
    Legal: [],
    Access: [],
    Security: []
  });

  const handleAddExtraField = (section) => {
    setExtraFields(prev => ({
      ...prev,
      [section]: [...prev[section], { key: '', value: '' }]
    }));
  };

  const handleExtraFieldChange = (section, index, field, value) => {
    setExtraFields(prev => {
      const newSection = [...prev[section]];
      newSection[index][field] = value;
      return { ...prev, [section]: newSection };
    });
  };

  const removeExtraField = (section, index) => {
    setExtraFields(prev => {
      const newSection = [...prev[section]];
      newSection.splice(index, 1);
      return { ...prev, [section]: newSection };
    });
  };

  const allImagePreviews = [];
  if (previews.mainImage) allImagePreviews.push({ type: 'main', src: previews.mainImage, index: 0 });
  previews.gallery.forEach((src, i) => allImagePreviews.push({ type: 'gallery', src, index: i }));

  const removeMediaImage = (item) => {
    if (item.type === 'main') {
      removeMainImage();
    } else {
      removeGalleryImage(item.index);
    }
  };

  const handleAutoDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          if (data && data.address) {
            setFormData(prev => ({
              ...prev,
              city: data.address.city || data.address.town || data.address.village || prev.city,
              location: data.address.state || prev.location,
              pincode: data.address.postcode || prev.pincode,
              address: data.display_name || prev.address,
              googleMapLink: `https://www.google.com/maps?q=${latitude},${longitude}`
            }));
          } else {
             setFormData(prev => ({ ...prev, googleMapLink: `https://www.google.com/maps?q=${latitude},${longitude}` }));
          }
        } catch (error) {
          console.error("Error fetching location data:", error);
          setFormData(prev => ({ ...prev, googleMapLink: `https://www.google.com/maps?q=${latitude},${longitude}` }));
          alert("Could only get coordinates. Failed to auto-detect full address details.");
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to retrieve your location. Please check browser permissions.");
      }
    );
  };

  const inputClass = "w-full bg-gray-50/50 border border-gray-200 rounded-xl py-3 px-4 focus:bg-white focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 outline-none text-sm font-medium text-gray-800 transition-all duration-200 placeholder:text-gray-400";
  const labelClass = "block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 ml-1";
  const cardClass = "bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100/80 p-8 transition-all duration-300";
  const cardHeaderClass = "flex items-center gap-3 text-lg font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-50/80";
  const iconWrapperClass = "p-2 bg-purple-50 rounded-xl text-purple-600 shadow-sm";

  const propertyTypesByCategory = {
    'Warehouse': ['Warehouse Space', 'Godown'],
    'Industrial': ['Industrial Plot', 'Industrial Workspace'],
    'Commercial': ['Office Space', 'Retail Shop', 'Commercial Land', 'Agriculter Land']
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100/50 pb-20 font-sans selection:bg-purple-100 selection:text-purple-900">
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/80 px-8 py-4 flex items-center justify-between sticky top-0 z-50 transition-all">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-purple-600 to-purple-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
            <Building className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 tracking-tight">Teralease Workspace</h1>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-5 py-2.5 text-purple-600 bg-purple-50 hover:bg-purple-600 hover:text-white rounded-xl font-bold text-sm transition-all duration-300 shadow-sm hover:shadow-purple-500/25">
          <LogOut className="w-4 h-4" /> Exit Dashboard
        </button>
      </nav>

      <main className="max-w-7xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-purple-100 text-purple-700 text-xs font-bold tracking-widest uppercase mb-3">User Portal</span>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">{id ? 'Edit Property' : 'List Your Property'}</h1>
          <p className="text-gray-500 text-base mt-2 max-w-xl mx-auto">{id ? 'Update comprehensive details for this listing.' : 'Provide comprehensive details to create a high-converting listing on the Teralease platform.'}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {success && (
            <div className="bg-green-50/80 backdrop-blur-sm text-green-700 p-5 rounded-2xl flex items-center gap-3 border border-green-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
              <span className="font-bold text-base">{id ? 'Property successfully updated!' : 'Property successfully published to the platform!'}</span>
            </div>
          )}

          {/* Basic Information */}
          <div className={cardClass}>
            <h2 className={cardHeaderClass}>
              <div className={iconWrapperClass}><Info className="w-5 h-5" /></div>
              Basic Information
            </h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>PROPERTY TITLE *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className={inputClass} placeholder="e.g. 15000 sq ft Premium Warehouse in Delhi" />
              </div>
              <div>
                <label className={labelClass}>DESCRIPTION</label>
                <textarea rows={4} name="description" value={formData.description} onChange={handleChange} className={inputClass} placeholder="Detailed description of the property, its USPs, and surroundings..." />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>PRICE NUMERIC VALUE *</label>
                  <input required type="number" min="0" step="any" name="price" value={formData.price} onChange={handleChange} className={inputClass} placeholder="e.g. 45" />
                </div>
                <div>
                  <label className={labelClass}>PRICE UNIT *</label>
                  <select name="priceUnit" value={formData.priceUnit} onChange={handleChange} className={`${inputClass} cursor-pointer bg-white`}>
                    <option value="K">K (₹)</option>
                    <option value="K / month">K / month (₹)</option>
                    <option value="Lacs">Lakh (₹)</option>
                    <option value="Lacs / month">Lakh / month (₹)</option>
                    <option value="Cr">Cr (₹)</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>PRICE / SQ FT</label>
                  <input type="text" name="pricePerSqFt" value={formData.pricePerSqFt} onChange={handleChange} className={inputClass} placeholder="e.g. ₹ 33" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>OWNER NAME</label>
                  <input type="text" name="ownerName" value={formData.ownerName} onChange={handleChange} className={inputClass} placeholder="e.g. Rajesh Kumar" />
                </div>
                <div>
                  <label className={labelClass}>OWNER CONTACT</label>
                  <input type="text" name="ownerContact" value={formData.ownerContact} onChange={handleChange} className={inputClass} placeholder="+91 9876543210" />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>TOTAL AREA</label>
                  <input type="number" min="0" step="any" name="totalArea" value={formData.totalArea} onChange={handleChange} className={inputClass} placeholder="e.g. 15000" />
                </div>
                <div>
                  <label className={labelClass}>AREA UNIT</label>
                  <select name="areaUnit" value={formData.areaUnit} onChange={handleChange} className={`${inputClass} cursor-pointer bg-white`}>
                    <option value="Sq Ft">Sq Ft</option>
                    <option value="Sq Mtr">Sq Mtr</option>
                    <option value="Acre">Acre</option>
                    <option value="Hectare">Hectare</option>
                    <option value="Sq Yd">Sq Yd</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>POSSESSION STATUS</label>
                  <div className="flex gap-4 mt-3">
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="possessionStatus" value="Ready to Move" checked={formData.possessionStatus === 'Ready to Move'} onChange={() => setFormData(prev => ({...prev, possessionStatus: 'Ready to Move'}))} className="w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 border-gray-300 transition-all" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Ready to Move</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="possessionStatus" value="Under Construction" checked={formData.possessionStatus === 'Under Construction'} onChange={() => setFormData(prev => ({...prev, possessionStatus: 'Under Construction'}))} className="w-4 h-4 text-purple-600 focus:ring-purple-500 focus:ring-offset-2 border-gray-300 transition-all" />
                      <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">Under Construction</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Listing Type & Category */}
          <div className={cardClass}>
            <h2 className={cardHeaderClass}>
              <div className={iconWrapperClass}><Home className="w-5 h-5" /></div>
              Listing Type & Category
            </h2>
            
            <div className="mb-8">
               <label className={labelClass}>LISTING TYPE *</label>
               <div className="flex bg-gray-100/80 p-1.5 rounded-xl w-full max-w-md shadow-inner">
                 {['Lease', 'Sale', 'Both'].map(type => (
                   <button key={type} type="button" onClick={() => setFormData(prev => ({...prev, listingType: type}))} className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all duration-300 ${formData.listingType === type ? 'bg-white text-purple-700 shadow-[0_2px_10px_rgb(0,0,0,0.08)] scale-[1.02]' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-200/50'}`}>{type}</button>
                 ))}
               </div>
            </div>

            <div className="mb-8">
               <label className={labelClass}>PROPERTY CATEGORY *</label>
               <div className="grid grid-cols-3 gap-5">
                 {[
                   { name: 'Warehouse', icon: <Building className="w-6 h-6 mb-3" /> },
                   { name: 'Industrial', icon: <Factory className="w-6 h-6 mb-3" /> },
                   { name: 'Commercial', icon: <Trees className="w-6 h-6 mb-3" /> }
                 ].map(cat => (
                   <button key={cat.name} type="button" onClick={() => setFormData(prev => ({...prev, category: cat.name, type: propertyTypesByCategory[cat.name][0]}))} className={`group flex flex-col items-center justify-center p-6 border-2 rounded-2xl transition-all duration-300 ${formData.category === cat.name ? 'border-purple-600 bg-purple-50/50 text-purple-700 shadow-md shadow-purple-500/10 scale-[1.02]' : 'border-gray-100 hover:border-purple-200 hover:bg-purple-50/30 bg-gray-50/30 text-gray-400 hover:text-purple-500'}`}>
                     <div className="transition-transform duration-300 group-hover:-translate-y-1">{cat.icon}</div>
                     <span className="text-sm font-extrabold">{cat.name}</span>
                   </button>
                 ))}
               </div>
            </div>

            <div className="mb-8">
               <label className={labelClass}>PROPERTY TYPE</label>
               <div className="flex flex-wrap gap-4 max-w-2xl">
                  {propertyTypesByCategory[formData.category]?.map(type => (
                    <button key={type} type="button" onClick={() => setFormData(prev => ({...prev, type: type}))} className={`flex-1 min-w-[160px] py-3 px-2 border-2 rounded-xl text-sm font-bold transition-all duration-300 ${formData.type === type ? 'bg-purple-600 border-purple-600 text-white shadow-lg shadow-purple-500/30 scale-[1.02]' : 'border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50'}`}>{type}</button>
                  ))}
               </div>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
               <label className="relative inline-flex items-center cursor-pointer group">
                 <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData(prev => ({...prev, isFeatured: e.target.checked}))} className="sr-only peer" />
                 <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-600 peer-checked:to-purple-500 group-hover:shadow-md transition-all"></div>
               </label>
               <div>
                 <span className="text-base font-extrabold text-gray-900 block">Featured Property</span>
                 <span className="text-xs font-medium text-gray-500">Highlight this property on the homepage showcase</span>
               </div>
            </div>
          </div>

          {/* Location Details */}
          <div className={cardClass}>
            <h2 className={cardHeaderClass}>
              <div className={iconWrapperClass}><MapPin className="w-5 h-5" /></div>
              Location Details
            </h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-white p-4 rounded-xl border border-purple-100 shadow-sm">
                <span className="text-sm font-bold text-purple-900 flex items-center gap-2"><Navigation className="w-4 h-4 text-purple-500"/> Auto-detect exact location</span>
                <button type="button" onClick={handleAutoDetectLocation} className="flex items-center gap-2 text-xs font-extrabold text-white bg-purple-600 px-4 py-2 rounded-lg shadow-md shadow-purple-500/20 hover:bg-purple-700 hover:-translate-y-0.5 transition-all duration-300">
                  <MapPin className="w-3.5 h-3.5" /> Find My Location
                </button>
              </div>
              <div>
                <label className={labelClass}>FULL ADDRESS</label>
                <input type="text" name="address" value={formData.address} onChange={handleChange} className={inputClass} placeholder="Detailed address of the property" />
              </div>
              <div className="grid grid-cols-3 gap-5">
                <div>
                  <label className={labelClass}>CITY *</label>
                  <input type="text" name="city" value={formData.city} onChange={handleChange} className={inputClass} placeholder="e.g. Mumbai" />
                </div>
                <div>
                  <label className={labelClass}>PINCODE</label>
                  <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className={inputClass} placeholder="e.g. 400001" />
                </div>
                <div>
                  <label className={labelClass}>STATE / TERRITORY</label>
                  <input type="text" name="location" value={formData.location} onChange={handleChange} className={inputClass} placeholder="e.g. Maharashtra" />
                </div>
              </div>
              <div>
                <label className={labelClass}>GOOGLE MAPS LINK</label>
                <input type="text" name="googleMapLink" value={formData.googleMapLink} onChange={handleChange} className={inputClass} placeholder="https://maps.google.com/..." />
              </div>
            </div>
          </div>

          {/* Property Media */}
          <div className={cardClass}>
            <h2 className={cardHeaderClass}>
              <div className={iconWrapperClass}><ImageIcon className="w-5 h-5" /></div>
              Property Media
            </h2>
            
            <div className="group border-2 border-dashed border-purple-200/60 rounded-2xl p-10 text-center bg-purple-50/30 hover:bg-purple-50/80 hover:border-purple-400 transition-all duration-300 mb-6 cursor-pointer relative">
               <input id="galleryInput" type="file" accept="image/*" multiple onChange={handleGalleryChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
               <div className="bg-white w-16 h-16 rounded-2xl flex items-center justify-center shadow-md shadow-purple-500/10 border border-purple-100 mx-auto mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                 <Upload className="w-7 h-7 text-purple-600" />
               </div>
               <p className="text-base font-extrabold text-gray-900">Drag & drop or click to upload</p>
               <p className="text-sm font-medium text-gray-500 mt-1.5">Supports JPG, PNG, WEBP. First image will automatically be set as MAIN.</p>
            </div>
            
            {allImagePreviews.length > 0 && (
              <div className="flex gap-4 flex-wrap mb-8 p-4 bg-gray-50/50 rounded-xl border border-gray-100">
                {allImagePreviews.map((item, i) => (
                  <div key={i} className="relative group rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <img src={item.src} alt="Gallery Preview" className="h-28 w-28 object-cover transform group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                    {item.type === 'main' && <span className="absolute bottom-2 left-2 bg-purple-600/90 backdrop-blur-sm text-white text-[10px] font-extrabold px-2 py-1 rounded-md shadow-sm">MAIN</span>}
                    <button type="button" onClick={() => removeMediaImage(item)} className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-red-500 hover:text-white hover:bg-red-500 rounded-full p-1.5 shadow-sm z-10 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className={labelClass}>VIDEO UPLOAD (OPTIONAL)</label>
              <div className="flex gap-3">
                <div className="relative w-full">
                  <input id="videoInput" type="file" accept="video/*" onChange={handleVideoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className={`w-full px-5 py-3.5 text-sm font-bold rounded-xl border-2 border-dashed flex items-center justify-center gap-3 transition-colors ${mediaFiles.video ? 'bg-purple-50/50 border-purple-200 text-purple-700' : 'bg-gray-50/50 border-gray-200 text-gray-500 hover:border-purple-300 hover:bg-purple-50/30 hover:text-purple-600'}`}>
                    <Upload className="w-5 h-5" /> {mediaFiles.video ? mediaFiles.video.name : 'Choose Video File (MP4, WEBM)'}
                  </div>
                </div>
              </div>
              {previews.video && (
                <div className="relative inline-block mt-5 group rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <video controls src={previews.video} className="h-40 w-auto object-cover" />
                  <button type="button" onClick={removeVideo} className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-500 hover:text-white hover:bg-red-500 rounded-full p-1.5 shadow-sm z-10 transition-all duration-200 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Structure Related */}
          <div className={cardClass}>
            <h2 className={cardHeaderClass}>
              <div className={iconWrapperClass}><Building className="w-5 h-5" /></div>
              Structure Related
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className={labelClass}>BUILDING AGE</label>
                <input type="text" name="buildingAge" value={formData.buildingAge} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>LENGTH</label>
                <input type="text" name="length" value={formData.length} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>WIDTH</label>
                <input type="text" name="width" value={formData.width} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>HEIGHT (CENTRE / EAVES)</label>
                <input type="text" name="height" value={formData.height} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>NO OF FLOORS</label>
                <input type="text" name="floors" value={formData.floors} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>FLOORING TYPE</label>
                <input type="text" name="flooringType" value={formData.flooringType} onChange={handleChange} className={inputClass} placeholder="e.g. VDF, FM2" />
              </div>
              <div>
                <label className={labelClass}>FLOOR LOADING (TONS/SQM)</label>
                <select name="floorLoading" value={formData.floorLoading} onChange={handleChange} className={`${inputClass} appearance-none cursor-pointer`}>
                  <option value="">Select Loading capacity...</option>
                  <option value="3">3 Tons/Sqm</option>
                  <option value="4">4 Tons/Sqm</option>
                  <option value="5">5 Tons/Sqm</option>
                </select>
              </div>
              <div>
                <label className={labelClass}>CEILING TYPE</label>
                <input type="text" name="ceilingType" value={formData.ceilingType} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>TRUSS CAPACITY (MT)</label>
                <input type="text" name="trussCapacity" value={formData.trussCapacity} onChange={handleChange} className={inputClass} />
              </div>
              <div>
                <label className={labelClass}>PARKING SIZE (CARS/TRUCKS)</label>
                <input type="text" name="parkingSize" value={formData.parkingSize} onChange={handleChange} className={inputClass} />
              </div>
            </div>
            
            <div className="flex gap-4">
              <label className={`flex-1 py-3.5 px-4 border-2 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 ${formData.overheadCrane ? 'bg-purple-50/80 border-purple-400 text-purple-800 shadow-sm' : 'bg-gray-50/50 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-100'}`}>
                <input type="checkbox" name="overheadCrane" checked={formData.overheadCrane} onChange={handleChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300" /> Overhead Crane
              </label>
              <label className={`flex-1 py-3.5 px-4 border-2 rounded-xl text-sm font-bold cursor-pointer transition-all duration-300 flex items-center justify-center gap-3 ${formData.dockLevellers ? 'bg-purple-50/80 border-purple-400 text-purple-800 shadow-sm' : 'bg-gray-50/50 border-gray-200 text-gray-500 hover:border-gray-300 hover:bg-gray-100'}`}>
                <input type="checkbox" name="dockLevellers" checked={formData.dockLevellers} onChange={handleChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300" /> Dock Levellers Availability
              </label>
            </div>
          </div>

          {/* Render grouped pills function */}
          {(() => {
            const renderPills = (title, icon, fields, childrenTop) => (
              <div className={cardClass}>
                <h2 className={cardHeaderClass}>
                  <div className={iconWrapperClass}>{icon}</div>
                  {title}
                </h2>
                
                {childrenTop && <div className="mb-8">{childrenTop}</div>}
                
                <div className="flex flex-wrap gap-3">
                  {fields.map(field => (
                    <label key={field.name} className={`px-5 py-2.5 border-2 rounded-full text-[13px] font-bold cursor-pointer transition-all duration-300 flex items-center gap-2.5 ${formData[field.name] ? 'bg-purple-50/80 border-purple-400 text-purple-800 shadow-sm scale-[1.02]' : 'bg-white border-gray-200 text-gray-500 hover:border-purple-200 hover:bg-purple-50/30'}`}>
                      <input type="checkbox" name={field.name} checked={formData[field.name]} onChange={handleChange} className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 border-gray-300 transition-colors" />
                      {field.label}
                    </label>
                  ))}
                </div>

                {extraFields[title] && extraFields[title].length > 0 && (
                  <div className="mt-8 space-y-4">
                    <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Extra Fields</h3>
                    {extraFields[title].map((ef, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <input type="text" value={ef.key} onChange={(e) => handleExtraFieldChange(title, idx, 'key', e.target.value)} placeholder="e.g. Custom Feature" className={inputClass} />
                        <div className="w-full bg-purple-50/30 border border-purple-100 rounded-xl py-3 px-4 flex items-center gap-2 text-sm font-bold text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-purple-600" /> Included Feature
                        </div>
                        <button type="button" onClick={() => removeExtraField(title, idx)} className="p-3 bg-red-50/50 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors border border-red-100"><X className="w-5 h-5"/></button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                   <button type="button" onClick={() => handleAddExtraField(title)} className="px-5 py-2.5 border border-purple-100 bg-purple-50/50 text-purple-700 rounded-xl text-[13px] font-bold hover:bg-purple-100 transition-all duration-300 flex items-center gap-2 shadow-sm">
                     <span className="text-xl leading-none font-medium">+</span> Add Extra Field
                   </button>
                </div>
              </div>
            );

            return (
              <>
                {renderPills('Utilities', <Zap className="w-5 h-5" />, [
                  { name: 'powerConnection', label: 'Power Connection Availability' },
                  { name: 'smokeDetector', label: 'Smoke detector/ Fire alarm' },
                  { name: 'sprinkler', label: 'Fire Extinguisher/ Sprinkler' },
                  { name: 'fans', label: 'Ventilation/ Exhaust Fans' },
                  { name: 'hvac', label: 'Air-conditions (HVAC/ Air Washer/ Panel)' },
                  { name: 'drainageSewage', label: 'Drainage/ Sewage Connection' },
                  { name: 'internet', label: 'Availability of Internet (wired connection)' },
                  { name: 'officeCabin', label: 'Office cabin' },
                  { name: 'waterConnection', label: 'Water connection' },
                  { name: 'hiBayLights', label: 'Hi-bay lights/ Halogens/ Tubes' },
                  { name: 'dgAvailability', label: 'DG availability' },
                  { name: 'drainageSewage', label: 'Drainage/ Sewage' }
                ], (
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>SANCTIONED POWER LOADING KVA</label>
                      <input type="text" name="powerLoad" value={formData.powerLoad} onChange={handleChange} className={inputClass} placeholder="e.g. 100 KVA" />
                    </div>
                    <div>
                      <label className={labelClass}>TOILETS (GENTS/ LADIES/ INDIAN/ WESTERN)</label>
                      <input type="text" name="toilets" value={formData.toilets} onChange={handleChange} className={inputClass} placeholder="e.g. 2 Gents, 2 Ladies" />
                    </div>
                  </div>
                ))}

                {renderPills('Legal', <Briefcase className="w-5 h-5" />, [
                  { name: 'buildingCompletion', label: 'Building completion certificate' },
                  { name: 'litigationFree', label: 'Litigation Free' },
                  { name: 'occupancyCert', label: 'Occupancy Certificate' },
                  { name: 'nocEnvironment', label: 'NOC from environment' },
                  { name: 'zonningApproval', label: 'Zonning Approval' }
                ])}
                
                {/* Access */}
                <div className={cardClass}>
                  <h2 className={cardHeaderClass}>
                    <div className={iconWrapperClass}><Navigation className="w-5 h-5" /></div>
                    Access
                  </h2>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className={labelClass}>ACCESS/ APPROACH ROAD AVAILABILITY</label>
                      <input type="text" name="accessRoad" value={formData.accessRoad} onChange={handleChange} className={inputClass} placeholder="e.g. 40ft road" />
                    </div>
                    <div>
                      <label className={labelClass}>TRUCK MANEUVERING SPACE</label>
                      <input type="text" name="truckSpace" value={formData.truckSpace} onChange={handleChange} className={inputClass} placeholder="e.g. Available" />
                    </div>
                  </div>
                  <div className="mt-6 w-1/2 pr-3">
                    <label className={labelClass}>DISTANCE OF NEAREST HIGHWAY</label>
                    <input type="text" name="nearestHighway" value={formData.nearestHighway} onChange={handleChange} className={inputClass} placeholder="e.g. 2 km" />
                  </div>
                  
                  {extraFields['Access'] && extraFields['Access'].length > 0 && (
                    <div className="mt-8 space-y-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">Extra Fields</h3>
                      {extraFields['Access'].map((ef, idx) => (
                        <div key={idx} className="flex items-center gap-4">
                          <input type="text" value={ef.key} onChange={(e) => handleExtraFieldChange('Access', idx, 'key', e.target.value)} placeholder="e.g. Nearest Airport" className={inputClass} />
                          <input type="text" value={ef.value} onChange={(e) => handleExtraFieldChange('Access', idx, 'value', e.target.value)} placeholder="e.g. 15 km" className={inputClass} />
                          <button type="button" onClick={() => removeExtraField('Access', idx)} className="p-3 bg-red-50/50 text-red-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors border border-red-100"><X className="w-5 h-5"/></button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-8">
                     <button type="button" onClick={() => handleAddExtraField('Access')} className="px-5 py-2.5 border border-purple-100 bg-purple-50/50 text-purple-700 rounded-xl text-[13px] font-bold hover:bg-purple-100 transition-all duration-300 flex items-center gap-2 shadow-sm">
                       <span className="text-xl leading-none font-medium">+</span> Add Extra Field
                     </button>
                  </div>
                </div>

                {renderPills('Security', <Shield className="w-5 h-5" />, [
                  { name: 'cctv', label: 'CCTV System' },
                  { name: 'gateLocking', label: 'Gate locking' },
                  { name: 'guard', label: 'Guard Availability' }
                ])}
              </>
            );
          })()}

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-10 border-t border-gray-200/80 mt-12 pb-16">
            <button type="button" className="px-8 py-3.5 border-2 border-gray-200 text-gray-600 font-extrabold text-sm rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 focus:ring-4 focus:ring-gray-100">
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white font-extrabold text-sm py-3.5 px-10 rounded-xl shadow-lg shadow-purple-500/30 focus:outline-none focus:ring-4 focus:ring-purple-500/20 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
              <span className="relative">{loading ? (id ? 'Updating Property...' : 'Publishing Property...') : (id ? 'Update Property Listing' : 'Publish Property Listing')}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
