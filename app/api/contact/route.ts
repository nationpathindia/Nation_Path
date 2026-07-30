import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required",
        },
        { status: 400 }
      );
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || "New Contact Message");
    const safeMessage = escapeHtml(message);

    await resend.emails.send({
      from: "NationPath India <contact@nationpathindia.com>",
      to:
        process.env.CONTACT_EMAIL ||
        "info@nationpathindia.com",
      replyTo: email,
      subject: `Contact Form: ${safeSubject}`,
      html: `
        <h2>New Contact Message - NationPath India</h2>

        <p>
          <strong>Name:</strong> ${safeName}
        </p>

        <p>
          <strong>Email:</strong> ${safeEmail}
        </p>

        <p>
          <strong>Subject:</strong> ${safeSubject}
        </p>

        <hr />

        <p>
          <strong>Message:</strong>
        </p>

        <p>
          ${safeMessage.replace(/\n/g, "<br />")}
        </p>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error("Contact API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to send message",
      },
      {
        status: 500,
      }
    );
  }
}