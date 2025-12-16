const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');

// 1. Load environment variables
// This looks for a .env file to keep passwords/keys safe.
dotenv.config();

// 2. Initialize the Express App
const app = express();


// 3. MIDDLEWARE (The Gatekeepers)
// express.json() allows the server to accept JSON data in requests (req.body)
app.use(express.json()); 
// cors() allows your React frontend (on a different port) to talk to this server
app.use(cors());         
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
// 4. Test Route
// This helps us verify the server is working without needing the DB yet.
app.get('/', (req, res) => {
    res.send('API is running...');
});

// 5. Database Connection Function
const connectDB = async () => {
    try {
        // We will define MONGO_URI in the next step
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Stop the server if DB fails
    }
};

// 6. Start the Server
const PORT = process.env.PORT || 5000;

// Connect to DB, then start listening for requests
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});