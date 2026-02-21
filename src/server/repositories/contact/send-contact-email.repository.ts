import nodemailer from "nodemailer";
import { ContactEmailDTO } from "@/src/types/contact.type";

export async function sendContactEmail(
  emailData: ContactEmailDTO,
): Promise<void> {
  const { name, email, phone, message, recipientEmail } = emailData;

  // Create transporter
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: recipientEmail,
    replyTo: email,
    subject: `New Contact Form Submission from ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #4F46E5; padding-bottom: 10px;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0;">
          <p style="margin: 10px 0;"><strong style="color: #555;">Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #555;">Email:</strong> <a href="mailto:${email}" style="color: #4F46E5;">${email}</a></p>
          ${phone ? `<p style="margin: 10px 0;"><strong style="color: #555;">Phone:</strong> ${phone}</p>` : ""}
        </div>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f9fafb; border-left: 4px solid #4F46E5; border-radius: 4px;">
          <p style="margin: 0 0 5px 0;"><strong style="color: #555;">Message:</strong></p>
          <p style="margin: 0; color: #333; white-space: pre-wrap;">${message}</p>
        </div>
        
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #888; font-size: 12px;">
          <p>This email was sent from your website contact form.</p>
          <p>Sent on: ${new Date().toLocaleString()}</p>
        </div>
      </div>
    `,
    text: `Name: ${name}
Email: ${email}
${phone ? `Phone: ${phone}` : ""}
Message: ${message}

---
This email was sent from your website contact form.
Sent on: ${new Date().toLocaleString()}`,
  };
  await transporter.sendMail(mailOptions);
}
