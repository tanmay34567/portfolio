import mongoose, { Schema, Document } from 'mongoose';
// 1. Define the TypeScript interface for your Contact data
export interface IContact extends Document {
    name: string;
    email: string;
    service?: string;
    budget?: string;
    timeline?: string;
    message: string;
    createdAt: Date;
}
// 2. Create the Mongoose Schema
const ContactSchema: Schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address'],
    },
    service: {
        type: String,
        trim: true,
    },
    budget: {
        type: String,
        trim: true,
    },
    timeline: {
        type: String,
        trim: true,
    },
    message: {
        type: String,
        required: [true, 'Message is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
// 3. Export the model
export default mongoose.model<IContact>('Contact', ContactSchema);