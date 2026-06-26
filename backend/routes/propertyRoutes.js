import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import Property from '../models/Property.js';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'teralease_properties',
    resource_type: 'auto',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'avi']
  }
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'mainImage', maxCount: 1 },
  { name: 'gallery', maxCount: 10 },
  { name: 'video', maxCount: 1 }
]);

const router = express.Router();

// GET all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST add a new property
router.post('/', uploadFields, async (req, res) => {
  try {
    const propertyData = { ...req.body };
    
    // Convert tags string to array if it comes as string
    if (typeof propertyData.tags === 'string') {
      propertyData.tags = propertyData.tags.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.furnishing === 'string') {
      propertyData.furnishing = propertyData.furnishing.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.facilities === 'string') {
      propertyData.facilities = propertyData.facilities.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.specs === 'string') {
      propertyData.specs = propertyData.specs.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.breadcrumbs === 'string') {
      propertyData.breadcrumbs = propertyData.breadcrumbs.split(',').map(tag => tag.trim());
    }

    if (propertyData.categoryData && typeof propertyData.categoryData === 'string') {
      propertyData.categoryData = JSON.parse(propertyData.categoryData);
    }

    const imagesObj = { gallery: [], video: null, main: null };

    if (req.files) {
      if (req.files['mainImage'] && req.files['mainImage'][0]) {
        propertyData.image = req.files['mainImage'][0].path; // Top level fallback
        imagesObj.main = req.files['mainImage'][0].path;
      }
      if (req.files['gallery']) {
        imagesObj.gallery = req.files['gallery'].map(f => f.path);
      }
      if (req.files['video'] && req.files['video'][0]) {
        imagesObj.video = req.files['video'][0].path;
      }
    }
    
    propertyData.images = imagesObj;
    propertyData.totalImages = (imagesObj.main ? 1 : 0) + imagesObj.gallery.length;

    const newProperty = new Property(propertyData);
    await newProperty.save();
    
    res.status(201).json(newProperty);
  } catch (error) {
    console.error('Error adding property:', error);
    res.status(400).json({ message: error.message });
  }
});

// PUT edit full property
router.put('/:id', uploadFields, async (req, res) => {
  try {
    const propertyData = { ...req.body };
    
    // Convert tags string to array if it comes as string
    if (typeof propertyData.tags === 'string') {
      propertyData.tags = propertyData.tags.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.furnishing === 'string') {
      propertyData.furnishing = propertyData.furnishing.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.facilities === 'string') {
      propertyData.facilities = propertyData.facilities.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.specs === 'string') {
      propertyData.specs = propertyData.specs.split(',').map(tag => tag.trim());
    }
    if (typeof propertyData.breadcrumbs === 'string') {
      propertyData.breadcrumbs = propertyData.breadcrumbs.split(',').map(tag => tag.trim());
    }

    if (propertyData.categoryData && typeof propertyData.categoryData === 'string') {
      propertyData.categoryData = JSON.parse(propertyData.categoryData);
    }

    const existingProperty = await Property.findById(req.params.id);
    if (!existingProperty) return res.status(404).json({ message: 'Property not found' });

    const imagesObj = existingProperty.images || { gallery: [], video: null, main: null };

    // Handle existing media state sent from frontend
    // If frontend sends empty string or removed array elements, we should handle deletions, but for simplicity we append or replace.
    // The existing property usually keeps its old images unless overwritten or explicitly requested to be removed.
    // The frontend should ideally send what images are kept.
    if (req.body.existingGallery) {
       imagesObj.gallery = JSON.parse(req.body.existingGallery);
    }
    if (req.body.removeMain === 'true') {
       imagesObj.main = null;
    }
    if (req.body.removeVideo === 'true') {
       imagesObj.video = null;
    }

    if (req.files) {
      if (req.files['mainImage'] && req.files['mainImage'][0]) {
        propertyData.image = req.files['mainImage'][0].path; 
        imagesObj.main = req.files['mainImage'][0].path;
      }
      if (req.files['gallery']) {
        const newGallery = req.files['gallery'].map(f => f.path);
        imagesObj.gallery = [...(imagesObj.gallery || []), ...newGallery];
      }
      if (req.files['video'] && req.files['video'][0]) {
        imagesObj.video = req.files['video'][0].path;
      }
    }
    
    propertyData.images = imagesObj;
    propertyData.totalImages = (imagesObj.main ? 1 : 0) + (imagesObj.gallery ? imagesObj.gallery.length : 0);

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: propertyData },
      { new: true }
    );
    
    res.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).json({ message: error.message });
  }
});

// PATCH update a property (e.g. status)
router.patch('/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProperty) return res.status(404).json({ message: 'Property not found' });
    res.json(updatedProperty);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ message: error.message });
  }
});

// DELETE a property
router.delete('/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) return res.status(404).json({ message: 'Property not found' });
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
