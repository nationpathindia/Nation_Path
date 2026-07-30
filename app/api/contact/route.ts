// app/api/contact/route.ts

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error("Missing RESEND_API_KEY");

      return NextResponse.json(
        {
          success: false,
          message: "Email service is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const resend = new Resend(apiKey);

    const body = await req.json();

    const {
      name,
      email,
      subject,
      message,
    } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and message are required",
        },
        {
          status: 400,
        }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address",
        },
        {
          status: 400,
        }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is too long",
        },
        {
          status: 400,
        }
      );
    }

    const safeName = escapeHtml(String(name));
    const safeEmail = escapeHtml(String(email));
    const safeSubject = escapeHtml(
      String(subject || "New Contact Message")
    );
    const safeMessage = escapeHtml(String(message));

    const { error } = await resend.emails.send({
      from: "NationPath India <contact@nationpathindia.com>",
      to:
        process.env.CONTACT_EMAIL ||
        "info@nationpathindia.com",

      replyTo: email,

      subject: `Contact Form: ${safeSubject}`,

      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>
            New Contact Message - NationPath India
          </h2>

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
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);

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

    return NextResponse.json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.error(
      "Contact API Error:",
      error
    );

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