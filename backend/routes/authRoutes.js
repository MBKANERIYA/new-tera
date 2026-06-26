import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';

const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  try {
    const { name, mobile, email, location, userType, purpose, password } = req.body;

    // Check if user already exists based on mobile number or email
    let user = await User.findOne({ $or: [{ mobile }, { email }] });
    if (user) {
      return res.status(400).json({ success: false, message: 'User with this mobile or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      mobile,
      email,
      location,
      userType,
      purpose,
      password: hashedPassword
    });
    await user.save();

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ success: true, message: 'User registered successfully', user: userResponse });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  try {
    const { loginId, password } = req.body; // loginId can be email or mobile

    const user = await User.findOne({ 
      $or: [{ email: loginId }, { mobile: loginId }] 
    });

    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }

    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({ success: true, message: 'Logged in successfully', user: userResponse });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
