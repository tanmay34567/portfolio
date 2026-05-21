import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import contactRoutes from './routes/contactRoutes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json()); // Allows parsing of JSON request bodies

// Connect to MongoDB
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI as string);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error}`);
        process.exit(1); // Exit process with failure
    }
};

// Use the Contact Routes
// Any request to /api/contact will be handled by contactRoutes
app.use('/api/contact', contactRoutes);

// Start the server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
