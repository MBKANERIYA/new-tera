import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';
import Property from './models/Property.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const mongoURI = process.env.MONGO_URI || "mongodb+srv://maulik:maulik@cluster0.lwwgzfi.mongodb.net/?appName=Cluster0";

const images = {
  main: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUEzNEq9JfW4SyhleayrJQK20_78Zoc3ICpHB3mgWbcA&s=10",
  gallery: [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpvO4e2Upyk6H4FeTm8TdOL39hB7D8HveJSoQX2K46Aw&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTetEghLBdjHTGO_NnDWJHeUP4btOaahqjYFnEn0oQmg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjE5xo8sAWsME_htMoW3JiM5Cc-fp_mgWW_oTvSy3AgA&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvGiEj6A8Xa6vsaVs0XRrE1xnb7m8XQ572KIkmGE_ysQ&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT51Sqx5PWSmr1HpEAZn6S4N5wnPeyP73C5EfXk24o8cg&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvHZmVGLXMjI6YnNgf0lz54vK4tNDNregnnzO3nZQ0Ng&s=10",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpHXtM5mq3kgKh6aET7H1tnCeX3PelmlGd-TFjeaKswA&s=10"
  ],
  video: '<iframe width="560" height="315" src="https://www.youtube.com/embed/NiKBfSyfRAw?si=S7D3V6XQkjv3JTPX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>'
};

const cities = ["Mumbai", "Delhi", "Pune", "Bangalore", "Hyderabad", "Chennai", "Ahmedabad", "Surat"];
const types = ["Warehouse / Godown", "Factory / Shed"];
const listings = ["Lease", "Sale", "Both"];
const categories = ["Warehouse", "Industrial", "Commercial"];

const generateDummyProperty = (index) => {
  const city = cities[index % cities.length];
  const type = types[index % types.length];
  const listingType = listings[index % listings.length];
  const category = categories[index % categories.length];
  const area = 10000 + (index * 500);
  const price = listingType === 'Sale' ? 50000000 + (index * 1000000) : 100000 + (index * 5000);
  
  return {
    title: `${area} sq ft Premium ${category} in ${city}`,
    description: `A state-of-the-art ${type.toLowerCase()} located in the prime industrial area of ${city}. Ideal for logistics, manufacturing, and storage.`,
    price: `₹ ${price.toLocaleString('en-IN')}`,
    pricePerSqFt: `₹ ${(price / area).toFixed(0)}`,
    totalArea: `${area} Sq Ft`,
    possessionStatus: index % 2 === 0 ? "Ready to Move" : "Under Construction",
    listingType,
    category,
    type,
    isFeatured: index < 5,
    address: `Phase ${(index % 4) + 1}, Industrial Area, ${city}`,
    city,
    pincode: `4000${index.toString().padStart(2, '0')}`,
    location: "State",
    googleMapLink: "https://maps.google.com/?q=19.0760,72.8777",
    status: "approved",
    image: images.main,
    images: images,
    totalImages: 8,
    categoryData: {
      ownerName: "Industrial Realty Group",
      ownerContact: "+91 9876543210",
      buildingAge: (index % 10).toString(),
      length: `${100 + index} ft`,
      width: `${80 + index} ft`,
      height: "35 ft",
      floors: "1",
      flooringType: "VDF",
      floorLoading: "5",
      ceilingType: "Bare",
      trussCapacity: "10",
      parkingSize: `${5 + index}`,
      overheadCrane: index % 2 === 0,
      dockLevellers: true,
      powerConnection: true,
      powerLoad: "100 KVA",
      smokeDetector: true,
      sprinkler: true,
      fans: false,
      hvac: false,
      toilets: "2 Gents, 2 Ladies",
      drainageSewage: true,
      internet: true,
      officeCabin: true,
      waterConnection: true,
      hiBayLights: true,
      dgAvailability: true,
      buildingCompletion: true,
      litigationFree: true,
      occupancyCert: true,
      nocEnvironment: true,
      zonningApproval: true,
      accessRoad: "40ft road",
      truckSpace: "Available",
      nearestHighway: "2 km",
      cctv: true,
      gateLocking: true,
      guard: true
    },
    extraFields: {
      Utilities: [],
      Legal: [],
      Access: [],
      Security: []
    }
  };
};

const seedDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB.");
    
    await Property.deleteMany({});
    console.log("Deleted old properties.");
    
    const dummyData = [];
    for (let i = 0; i < 50; i++) {
      dummyData.push(generateDummyProperty(i));
    }
    
    await Property.insertMany(dummyData);
    console.log("Inserted 50 dummy properties.");
    
    process.exit(0);
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDB();
