import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(200),
  email: z.string().trim().email().max(254),
  company: z.string().trim().max(300).optional(),
  message: z.string().trim().min(1).max(10000),
});

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const parsed = contactSchema.safeParse(await req.json().catch(() => null));
    if (!parsed.success) {
      return NextResponse.json({ success: false, message: "Please enter your name, a valid email, and project details (up to 10,000 characters)." }, { status: 400 });
    }
    const { name, email, company, message } = parsed.data;
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ success: false, message: "Contact service is temporarily unavailable. Please email abdullah@havelent.com." }, { status: 503 });
    }
    const resend = new Resend(process.env.RESEND_API_KEY);

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name.trim());
    const safeEmail = escapeHtml(email.trim());
    const safeCompany = escapeHtml(company?.trim() || "Not provided");
    const safeMessage = escapeHtml(message.trim());

    // 1. Send inquiry to Havelent
    const notification = await resend.emails.send({
      from: "Abdullah | Havelent <abdullah@havelent.com>",
      to: "abdullah@havelent.com",
      replyTo: email.trim(),
      subject: `New Project Inquiry — ${name.trim()}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2 style="margin-bottom: 20px;">New Project Inquiry</h2>

          <p><strong>Name:</strong> ${safeName}</p>

          <p><strong>Email:</strong> ${safeEmail}</p>

          <p><strong>Company:</strong> ${safeCompany}</p>

          <p><strong>Message:</strong></p>

          <p style="white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 8px;">
            ${safeMessage}
          </p>

          <hr style="margin: 25px 0; border: none; border-top: 1px solid #ddd;" />

          <p style="font-size: 13px; color: #777;">
            This message was submitted through the Havelent website.
          </p>
        </div>
      `,
    });

    if (notification.error) {
      return NextResponse.json({ success: false, message: "Your message could not be sent. Please try again or email abdullah@havelent.com." }, { status: 502 });
    }

    // 2. Send automatic confirmation to the client
    const autoReply = await resend.emails.send({
      from: "Abdullah | Havelent <abdullah@havelent.com>",
      to: email.trim(),
      subject: "We've received your message — Havelent",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #222; max-width: 600px; margin: 0 auto;">

          <h2 style="margin-bottom: 20px;">
            Thank you for reaching out to Havelent.
          </h2>

          <p>Hi ${safeName},</p>

          <p>
            We've received your message and appreciate you taking the time
            to tell us about your project.
          </p>

          <p>
            Our team will review your project details and get back to you
            within one business day.
          </p>

          <div style="
            margin: 25px 0;
            padding: 18px;
            background: #f7f7f7;
            border-radius: 10px;
          ">
            <p style="margin: 0 0 8px;">
              <strong>Your message:</strong>
            </p>

            <p style="margin: 0; white-space: pre-wrap;">
              ${safeMessage}
            </p>
          </div>

          <p>
            Best regards,<br />
            <strong>Abdullah Rajpoot</strong><br />
            Founder & CEO<br />
            Havelent<br />
            <a href="https://www.havelent.com">
              www.havelent.com
            </a>
          </p>

        </div>
      `,
    }).catch(() => ({ error: { message: 'Confirmation unavailable' } }));
    return NextResponse.json({ success: true, confirmationSent: !autoReply.error });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send message.",
      },
      { status: 500 }
    );
  }
}