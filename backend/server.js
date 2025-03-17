// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const bcrypt = require('bcryptjs');
// const User = require('./models/User');
// const connectDB = require('./config/db');

// dotenv.config();
// connectDB();

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Home route
// app.get('/', (req, res) => res.send('Backend is running...'));

// // Register route
// app.post('/register', async (req, res) => {
//     try {
//         const { name, email, password } = req.body;

//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({ name, email, password: hashedPassword });
//         await newUser.save();

//         res.json({ success: true, message: 'User registered successfully!' });
//     } catch (error) {
//         res.status(400).json({ success: false, message: 'Registration failed' });
//     }
// });

// // Login route
// app.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });

//         if (user && await bcrypt.compare(password, user.password)) {
//             res.json({ success: true, message: `Welcome, ${user.name}!` });
//         } else {
//             res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server error' });
//     }
// });

// app.listen(5000, () => console.log('✅ Server running on port 5000'));


require('dotenv').config(); // Load .env first
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 Check if .env is loading correctly
console.log("🔍 Loaded MONGO_URI:", process.env.MONGO_URI);

// 🔹 Connect to MongoDB
connectDB();

// Home Route
app.get('/', (req, res) => res.send('✅ Backend is running...'));

// Register Route
app.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ success: false, message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.json({ success: true, message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Registration failed' });
    }
});

// Login Route
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ success: true, message: `Welcome, ${user.name}!` });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
