'use server'

import nodemailer from 'nodemailer';

interface ContactFormState {
    name: string;
    email: string;
    message: string;
}

export async function sendContactEmail(formData: ContactFormState) {
    try {
        const { name, email, message } = formData;

        // 1. Validation
        if (!name || !email || !message) {
            return { success: false, error: 'Missing fields' };
        }

        // 2. Configure the Transporter (Connect to Gmail)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER, // Your Gmail
                pass: process.env.GMAIL_PASS, // Your App Password
            },
        });

        // 3. Send the Email
        await transporter.sendMail({
            // FROM: Must be YOUR Gmail (because you authenticated as yourself)
            from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,

            // TO: Your Gmail (where you want to receive the alert)
            to: process.env.GMAIL_USER,

            // REPLY-TO: The Visitor's email (so hitting Reply works)
            replyTo: email,

            subject: `New Enquiry from ${name}`,
            html: `
        <div style="font-family: sans-serif; font-size: 16px; color: #333;">
          <h3>New Message from Your Website</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr />
          <p><strong>Message:</strong></p>
          <p style="background-color: #f4f4f4; padding: 12px; border-radius: 4px;">
            ${message.replace(/\n/g, '<br>')}
          </p>
        </div>
      `,
        });

        return { success: true };

    } catch (error) {
        console.error("SMTP Error:", error);
        return { success: false, error: 'Failed to send email' };
    }
}