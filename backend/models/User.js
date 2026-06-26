import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  userType: { type: String, required: true },
  purpose: { type: String, required: true },
  password: { type: String, required: true }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', userSchema);
