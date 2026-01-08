// @ts-ignore
import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/mongodb";
import { Message } from "@/models/Message";
import nodemailer from "nodemailer";

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

// Create email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "",
    pass: process.env.EMAIL_PASSWORD || "",
  },
});

async function sendEmailNotification(
  name: string,
  email: string,
  messageText: string
) {
  // Skip email if credentials not configured
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
    console.warn("Email credentials not configured");
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
        <p>${messageText.replace(/\n/g, "<br>")}</p>
        <hr>
        <p><small>Received at: ${new Date().toLocaleString()}</small></p>
      `,
      replyTo: email,
    });
  } catch (error) {
    console.error("Email notification error:", error);
    // Don't throw - message is still saved in DB
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Add CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create and save message
    const newMessage = new Message({
      name,
      email,
      message,
      createdAt: new Date(),
      read: false,
    });

    await newMessage.save();

    // Send email notification (non-blocking)
    sendEmailNotification(name, email, message).catch((err) =>
      console.error("Email send error:", err)
    );

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(500).json({
      error: "Failed to send message. Please try again later.",
    });
  }
}
