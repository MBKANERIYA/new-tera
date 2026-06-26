import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property.js';

dotenv.config();

const subtypes = [
  'Industrial Plot',
  'Industrial Workspace',
  'Warehouse Space',
  'Godown',
  'Office Space',
  'Retail Shop',
  'Commercial Land',
  'Agriculter Land'
];

const cities = ['Delhi', 'Gurgaon', 'Noida', 'Faridabad', 'Ghaziabad'];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    // Optional: Clear existing properties if we want exactly 5 of each
    await Property.deleteMany({});
    console.log('Cleared existing properties');

    const properties = [];

    for (const type of subtypes) {
      for (let i = 1; i <= 5; i++) {
        const city = cities[Math.floor(Math.random() * cities.length)];
        
        let listingType = 'Sale';
        if (i % 2 === 0) listingType = 'Lease';
        if (i === 5) listingType = 'Sub-Lease';

        let price = '₹ ' + (Math.floor(Math.random() * 50) + 10) + ' Lacs';
        if (listingType === 'Lease' || listingType === 'Sub-Lease') {
          price = '₹ ' + (Math.floor(Math.random() * 200) + 20) + 'K / month';
        }

        let image = `https://images.unsplash.com/photo-1556910103-1c02745a872e?auto=format&fit=crop&w=800&q=80`;
        if (type.includes('Warehouse') || type.includes('Godown')) {
          image = `https://images.unsplash.com/photo-1586528116311-ad8ed7c83594?auto=format&fit=crop&w=800&q=80`;
        } else if (type.includes('Office') || type.includes('Shop')) {
          image = `https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80`;
        } else if (type.includes('Industrial')) {
          image = `https://images.unsplash.com/photo-1565610222536-ef125c59fdd5?auto=format&fit=crop&w=800&q=80`;
        } else {
          image = `https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80`;
        }

        properties.push({
          title: `Premium ${type} in prime location of ${city}`,
          type: type,
          listingType: listingType,
          price: price,
          city: city,
          address: `Sector ${Math.floor(Math.random() * 50) + 1}, ${city}, Delhi NCR`,
          locality: `Sector ${Math.floor(Math.random() * 50) + 1}`,
          description: `Excellent opportunity to acquire a well-maintained ${type} in the heart of ${city}. Perfect for immediate possession with all necessary amenities nearby. Features great connectivity to major highways and transport hubs.`,
          totalArea: `${Math.floor(Math.random() * 5000) + 500} Sq. Ft.`,
          possessionStatus: 'Ready to Move',
          status: 'approved',
          image: image,
          totalImages: Math.floor(Math.random() * 5) + 3,
          similarListings: Math.floor(Math.random() * 10) + 1,
          tags: ['Prime Location', '24/7 Security', 'Great Connectivity'],
          categoryData: {
            buildingAge: "0-5 Years",
            parkingSpace: "2 Covered",
            furnishing: "Semi-Furnished",
            floorNumber: Math.floor(Math.random() * 10) + 1,
            totalFloors: 10,
            waterSupply: "24/7",
            powerBackup: "Available",
            facing: "North-East",
            ownerName: "Teralease Owner",
            ownerContact: "+91 9876543210"
          },
          facilities: ['Power Backup', 'Security', 'Visitor Parking', 'Maintenance Staff'],
          specs: ['Vaastu Compliant', 'Corner Property', 'Grade A Building']
        });
      }
    }

    await Property.insertMany(properties);
    console.log(`Successfully seeded ${properties.length} properties (5 for each subtype).`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding DB:', error);
    process.exit(1);
  }
};

seedDB();
