import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Property from './models/Property.js';

dotenv.config();

const galleryImages = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbJvXJ8RmRVdUYru59vqTd7JmLMU4ozUZ54w&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxVh6C1ytfVB2O5F6Flll4umWXDrK-ut4qeg&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt-zH5O_uHzMqd9RXvQcq22B8U07xS0I-V5A&s',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEMaXTedFX8eKf96qaX4_e9BIpvC-wSW8uig&s',
  'https://images.pexels.com/photos/1117452/pexels-photo-1117452.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/159306/construction-site-build-construction-work-159306.jpeg?auto=compress&cs=tinysrgb&w=800',
  'https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=800',
];

const updateImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');

    const result = await Property.updateMany(
      {},
      {
        $set: {
          image: galleryImages[0],
          images: {
            main: galleryImages[0],
            gallery: galleryImages.slice(1),
            video: null,
          },
          totalImages: galleryImages.length,
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} properties with 7 images.`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating images:', error);
    process.exit(1);
  }
};

updateImages();
