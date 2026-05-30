import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Message Schema
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String },
  budget: { type: String },
  timeline: { type: String },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const Message = mongoose.model('Message', messageSchema);

// Email Transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function sendEmailNotification(name, email, service, budget, timeline, messageText) {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn('Email credentials not configured');
    return;
  }

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
      subject: `New Contact Form Message from ${name}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Service Required:</strong> ${service || 'Not specified'}</p>
        <p><strong>Project Budget:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Target Timeline:</strong> ${timeline || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${messageText.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
      replyTo: email,
    });
  } catch (error) {
    console.error('Email notification error:', error);
  }
}

// Contact Route
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, service, budget, timeline, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
      name,
      email,
      service,
      budget,
      timeline,
      message,
      createdAt: new Date(),
      read: false,
    });

    await newMessage.save();

    // Send email (non-blocking)
    sendEmailNotification(name, email, service, budget, timeline, message).catch(err =>
      console.error('Email send error:', err)
    );

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({
      error: 'Failed to send message. Please try again later.',
    });
  }
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
