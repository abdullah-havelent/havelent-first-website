import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    const { name, email, message } = await req.json();

    if (!email?.trim() || !message?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide your email and describe the problem.",
        },
        { status: 400 }
      );
    }

    // Make sure the Resend API key exists before creating the client.
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured.");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured.",
        },
        { status: 500 }
      );
    }

    // Create Resend client only when the API route is actually called.
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeName = escapeHtml(name?.trim() || "Website visitor");
    const safeEmail = escapeHtml(email.trim());
    const safeMessage = escapeHtml(message.trim());

    // 1. Send problem report to Havelent
    const notification = await resend.emails.send({
      from: "Abdullah | Havelent <abdullah@havelent.com>",
      to: "abdullah@havelent.com",
      replyTo: email.trim(),
      subject: "New Website Problem Report",
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <h2>New Website Problem Report</h2>

          <p><strong>Reported by:</strong> ${safeName}</p>

          <p><strong>Email:</strong> ${safeEmail}</p>

          <p><strong>Problem:</strong></p>

          <p style="
            white-space: pre-wrap;
            background: #f5f5f5;
            padding: 15px;
            border-radius: 8px;
          ">
            ${safeMessage}
          </p>

          <hr style="
            margin: 25px 0;
            border: none;
            border-top: 1px solid #ddd;
          " />

          <p style="font-size: 13px; color: #777;">
            This problem report was submitted through the Havelent website.
          </p>
        </div>
      `,
    });

    // 2. Automatic confirmation to the person reporting the problem
    const autoReply = await resend.emails.send({
      from: "Abdullah | Havelent <abdullah@havelent.com>",
      to: email.trim(),
      subject: "We've received your report — Havelent",
      html: `
        <div style="
          font-family: Arial, sans-serif;
          line-height: 1.7;
          color: #222;
          max-width: 600px;
          margin: 0 auto;
        ">

          <h2>We've received your report.</h2>

          <p>Hi ${safeName},</p>

          <p>
            Thank you for taking the time to report an issue with the
            Havelent website.
          </p>

          <p>
            We've received your report and will review the issue as soon
            as possible.
          </p>

          <div style="
            margin: 25px 0;
            padding: 18px;
            background: #f7f7f7;
            border-radius: 10px;
          ">
            <p style="margin: 0 0 8px;">
              <strong>Your report:</strong>
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
    });

    return NextResponse.json({
      success: true,
      notification,
      autoReply,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to send problem report.",
      },
      { status: 500 }
    );
  }
}