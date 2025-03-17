require('dotenv').config();  // Add this on top
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB:", process.env.MONGO_URI); // Debugging
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
