// backend/routes/profileRoutes.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// in backend/routes/profileRoutes.js

const verifyEmail = async (email) => {
    console.warn(`--- DEVELOPMENT MODE ---`);
    console.warn(`Bypassing external email validation for: ${email}. Assuming it's valid.`);
    console.warn(`This is a temporary measure to overcome an unstable third-party API.`);
    return true; 
    
    /*  
    const apiKey = process.env.SENDGRID_API_KEY;
    if (!apiKey) {
        console.warn("SENDGRID_API_KEY not found in .env, skipping email verification.");
        return true;
    }
    try {
        const response = await axios.post(
            'https://api.sendgrid.com/v3/validations/email',
            { email: email },
            { 
                headers: { 
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                } 
            }
        );
        
        const verdict = response.data.result.verdict;
        console.log(`SendGrid validation verdict for ${email}: ${verdict}`);

        return verdict === 'Valid';

    } catch (error) {
        console.error("Email verification API (SendGrid) error:", error.response?.data || error.message);
        return false;
    }
    */
}; 

// @route   POST /profiles
router.post('/', async (req, res) => {
  const { username, email, password, isAdmin } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const isEmailValid = await verifyEmail(email);
    if (!isEmailValid) {
        return res.status(400).json({ message: 'Email address does not exist or is undeliverable.' });
    }

    user = new User({ username, email, password, isAdmin });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /profiles/:id
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        if (req.user.id !== req.params.id && !req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied.' });
        }
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { username, email, password } = req.body;

        if (username) user.username = username;
        
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use.' });
            }
            const isEmailValid = await verifyEmail(email);
            if (!isEmailValid) {
                return res.status(400).json({ message: 'New email address does not exist or is undeliverable.' });
            }
            user.email = email;
        }

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await user.save();
        const userResponse = updatedUser.toObject();
        delete userResponse.password;
        res.json(userResponse);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST /profiles/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const payload = { user: { id: user.id, isAdmin: user.isAdmin } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (error) { res.status(500).send('Server error'); }
});

// @route   GET /profiles
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(403).json({ message: 'Access denied. Admins only.' });
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) { res.status(500).send('Server Error'); }
});

// @route   GET /profiles
// @desc    Get all users (Admin only), with optional search by ID substring
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    
    // Get the search term from the URL query parameters
    const { search } = req.query;

    let users = await User.find().select('-password');

    // If a search term is provided, filter the users
    if (search) {
      users = users.filter(user => 
        // Update ：transform the ObjectId to a string before comparison
        user._id.toString().includes(search.toLowerCase())
      );
    }

    res.json(users);

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /profiles/:id
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json({ message: 'User deleted successfully' });
    } catch (error) { res.status(500).send('Server Error'); }
});

module.exports = router;