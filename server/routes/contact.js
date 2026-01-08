import express from 'express';
import { connectDB } from '../lib/mongodb.js';
import { Message } from '../models/Message.js';
import nodemailer from 'nodemailer';

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASSWORD || '',
  },
});

async function sendEmailNotification(name, email, messageText) {
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

router.post('/', async (req, res) => {
  try {
    await connectDB();

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const newMessage = new Message({
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    });

    await newMessage.save();

    sendEmailNotification(name, email, message).catch((err) =>
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

export default router;
