import { Router, Request, Response } from 'express';
import { Resend } from 'resend';
import Contact from '../models/Contact';
import mongoose from 'mongoose';

const router = Router();

// POST /api/contact
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, service, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      res.status(400).json({
        success: false,
        error: 'Please provide name, email, and message.',
      });
      return;
    }

    // Try saving to MongoDB (if connected)
    if (mongoose.connection.readyState === 1) {
      try {
        await new Contact({ name, email, service, message }).save();
        console.log('Contact saved to MongoDB');
      } catch (dbErr) {
        console.warn('Failed to save to MongoDB:', dbErr);
      }
    }

    // Return success immediately (don't wait for email)
    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
    });

    // Attempt email in the background (non-blocking)
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);

      console.log('Sending email via Resend to:', process.env.EMAIL_RECIPIENT);

      // Note: By default, Resend only allows sending from onboarding@resend.dev
      // to the exact email address you used to sign up for Resend.
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: process.env.EMAIL_RECIPIENT || 'tanmayhtw@gmail.com',
        subject: `New Portfolio Contact from ${name}`,
        html: `
          <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; border-radius: 16px; overflow: hidden; border: 1px solid #222;">
            <div style="background: linear-gradient(135deg, #5e67e6, #4a3fd4); padding: 32px; text-align: center;">
              <h1 style="margin: 0; color: #fff; font-size: 24px;">New Contact Message</h1>
              <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8); font-size: 14px;">From your portfolio website</p>
            </div>
            <div style="padding: 32px; color: #e0e0e0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888; width: 100px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222;"><a href="mailto:${email}" style="color: #5e67e6; text-decoration: none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #888;">Service</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #222; color: #fff;">${service || 'Not specified'}</td>
                </tr>
              </table>
              <div style="margin-top: 24px;">
                <p style="color: #888; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                <div style="background: #1a1a1a; border-radius: 12px; padding: 20px; color: #e0e0e0; line-height: 1.6; border: 1px solid #2a2a2a;">
                  ${message.replace(/\n/g, '<br>')}
                </div>
              </div>
            </div>
            <div style="padding: 16px 32px; background: #0a0a0a; text-align: center;">
              <p style="margin: 0; color: #555; font-size: 12px;">Sent from Portfolio Contact Form</p>
            </div>
          </div>
        `,
      });

      console.log('Email sent to', process.env.EMAIL_RECIPIENT);
    } catch (emailErr) {
      console.warn('Email sending failed (non-critical):', emailErr);
    }
  } catch (error) {
    console.error('Error in contact route:', error);
    // Already sent success response, so no need to res.status(500) here
  }
});

export default router;
