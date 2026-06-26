import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  propertyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Property', required: true },
  ownerMobile: { type: String, required: true },
  name: { type: String, required: true },
  number: { type: String, required: true },
  city: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema);
