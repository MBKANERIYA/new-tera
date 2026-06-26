import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import propertyRoutes from './routes/propertyRoutes.js';
import authRoutes from './routes/authRoutes.js';
import inquiryRoutes from './routes/inquiryRoutes.js';
import blogRoutes from './routes/blogs.js';
import testimonialRoutes from './routes/testimonials.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes — mounted at both /api/* (for local dev) and /* (for Vercel where routePrefix strips /api)
app.use('/api/properties', propertyRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/upload', uploadRoutes);

app.use('/properties', propertyRoutes);
app.use('/auth', authRoutes);
app.use('/inquiries', inquiryRoutes);
app.use('/blogs', blogRoutes);
app.use('/testimonials', testimonialRoutes);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Only start the server locally. Vercel will export the app for serverless functions.
    if (!process.env.VERCEL) {
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    }
  })
  .catch((error) => console.log('MongoDB connection error:', error.message));

export default app;
