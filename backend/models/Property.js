import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String }, 
  price: { type: String },
  location: { type: String },
  listingType: { type: String }
}, { timestamps: true, strict: false });

export default mongoose.models.Property || mongoose.model('Property', propertySchema);
