import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Agent from './models/Agent.js';

dotenv.config();

const agentsData = [
  {
    name: "JBN RealTech",
    location: "Okhla Phase 1, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    sale: 6,
    rent: 0,
    tags: ["Sector 2", "Okhla"],
    moreTags: 0
  },
  {
    name: "Gravitas Real Estate",
    location: "Sector 48, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=100&h=100&fit=crop",
    sale: 18,
    rent: 0,
    tags: ["Badli", "Dwarka Expressway"],
    moreTags: 38
  },
  {
    name: "Saral Realtors",
    location: "Sector 47, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=100&h=100&fit=crop",
    sale: 92,
    rent: 6,
    tags: ["DLF Phase I", "DLF Phase II"],
    moreTags: 40
  },
  {
    name: "Gurugram Luxury Floors",
    location: "Sector 38, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&h=100&fit=crop",
    sale: 23,
    rent: 2,
    tags: ["Delhi", "Gurgaon"],
    moreTags: 0
  },
  {
    name: "Welcome Homes",
    location: "Sector 70, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=100&h=100&fit=crop",
    sale: 81,
    rent: 4,
    tags: ["Ansal Palam Vihar"],
    moreTags: 37
  },
  {
    name: "RBR Realty",
    location: "DLF Phase IV, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&h=100&fit=crop",
    sale: 118,
    rent: 70,
    tags: ["Block A", "Block C"],
    moreTags: 11
  },
  {
    name: "Garv Design & Planning",
    location: "Sector 46, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=100&h=100&fit=crop",
    sale: 28,
    rent: 0,
    tags: ["Delhi", "Gurgaon", "Jhajjar"],
    moreTags: 0
  },
  {
    name: "Realty Choice",
    location: "Sector 47, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?w=100&h=100&fit=crop",
    sale: 932,
    rent: 144,
    tags: ["Block A Sector 63", "Block C"],
    moreTags: 97
  },
  {
    name: "Prime Industrial Spaces",
    location: "Manesar, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1586528116311-ad8ed7c1590f?w=100&h=100&fit=crop",
    sale: 45,
    rent: 12,
    tags: ["IMT Manesar", "Sector 8"],
    moreTags: 5
  },
  {
    name: "Capital Commercials",
    location: "Connaught Place, Delhi NCR",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
    sale: 156,
    rent: 89,
    tags: ["CP", "Barakhamba"],
    moreTags: 22
  }
];

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    await Agent.deleteMany({});
    console.log('Cleared existing agents');
    
    await Agent.insertMany(agentsData);
    console.log('Inserted new agents successfully');
    
    mongoose.disconnect();
    process.exit(0);
  })
  .catch(err => {
    console.error('Error seeding agents:', err);
    process.exit(1);
  });
