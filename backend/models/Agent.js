import mongoose from 'mongoose';

const agentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  logo: { type: String, required: true },
  sale: { type: Number, default: 0 },
  rent: { type: Number, default: 0 },
  tags: [{ type: String }],
  moreTags: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model('Agent', agentSchema);
