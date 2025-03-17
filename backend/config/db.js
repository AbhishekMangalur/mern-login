// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('✅ MongoDB Connected');
//     } catch (error) {
//         console.error('❌ MongoDB Connection Error:', error);
//         process.exit(1);
//     }
// };

// module.exports = connectDB;

require('dotenv').config(); // Load .env

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log("🔍 Connecting to MongoDB:", process.env.MONGO_URI); // Debugging

        if (!process.env.MONGO_URI) {
            throw new Error("❌ MONGO_URI is missing in .env file!");
        }

        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
