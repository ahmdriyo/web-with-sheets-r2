import { NextResponse } from "next/server";
import { ContactFormData } from "@/src/types/contact.type";
import { sendContactEmail } from "@/src/server/repositories/contact/send-contact-email.repository";

export async function handleContactSubmission(
  formData: ContactFormData,
): Promise<NextResponse> {
  try {
    const { name, email, phone, message, recipientEmail } = formData;

    // Validation - Required fields
    if (!name || !email || !message || !recipientEmail) {
      return NextResponse.json(
        { message: "Name, email, message, and recipient email are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    // Validate recipient email format
    if (!emailRegex.test(recipientEmail)) {
      return NextResponse.json(
        { message: "Invalid recipient email format" },
        { status: 400 },
      );
    }

    // Validate message length
    if (message.trim().length < 10) {
      return NextResponse.json(
        { message: "Message must be at least 10 characters long" },
        { status: 400 },
      );
    }

    // Call repository to send email
    await sendContactEmail({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim(),
      message: message.trim(),
      recipientEmail: recipientEmail.trim(),
    });

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in handleContactSubmission service:", error);
    return NextResponse.json(
      {
        message: "Failed to send message. Please try again later.",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
