// backend/server.js

require('dotenv').config('./db.env');
const express = require('express');
const connectDB = require('./config/db.js');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors()); // ✅ 启用 CORS 中间件
app.use(express.json());

// A simple route to test if the API is running
app.get('/', (req, res) => res.send('API is running...'));

// All routes starting with /profiles are handled by profileRoutes.js 
app.use('/profiles', require('./routes/profileRoutes.js'));  

// @route   GET /motdepasse/:longueur
// @desc    Generate a random password of a given length
// @access  Public
app.get('/motdepasse/:longueur', (req, res) => {
  try {
    const length = parseInt(req.params.longueur, 10);

    // Verify the length is a positive number
    if (isNaN(length) || length <= 0) {
      return res.status(400).json({ message: 'Length must be a positive number.' });
    }

    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      generatedPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    res.json({ password: generatedPassword });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error while generating password.' });
  }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
