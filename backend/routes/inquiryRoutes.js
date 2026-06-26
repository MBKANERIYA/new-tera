import express from 'express';
import Inquiry from '../models/Inquiry.js';
import Property from '../models/Property.js';

const router = express.Router();

// POST a new inquiry
router.post('/', async (req, res) => {
  try {
    const { propertyId, name, number, city } = req.body;
    
    // Find the property to get the ownerMobile (submittedBy)
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const newInquiry = new Inquiry({
      propertyId,
      ownerMobile: property.submittedBy,
      name,
      number,
      city
    });

    await newInquiry.save();
    res.status(201).json(newInquiry);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    res.status(500).json({ error: 'Server error creating inquiry' });
  }
});

// GET inquiries for a specific owner
router.get('/:ownerMobile', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ ownerMobile: req.params.ownerMobile })
      .populate('propertyId', 'title price location city images')
      .sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({ error: 'Server error fetching inquiries' });
  }
});

export default router;
