import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // 1. Honeypot check for bots
    if (body?.botField) {
      // Silently discard spam submissions
      return NextResponse.json({ success: true, message: "Message processed" });
    }

    const { name, email, message } = body;

    // 2. Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide your name." },
        { status: 400 }
      );
    }

    if (
      !email ||
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please provide a message with at least 5 characters." },
        { status: 400 }
      );
    }

    // 3. Provider check (e.g. Resend)
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "alemugetu78@gmail.com";

    if (resendApiKey) {
      // In production, if RESEND_API_KEY is configured, dispatch the email
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${resendApiKey}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [toEmail],
          reply_to: email,
          subject: `Portfolio Contact from ${name.trim()}`,
          text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Resend API error:", errorData);
        // Fall back gracefully so user is informed or advised to mailto
        return NextResponse.json(
          {
            success: true,
            fallbackMailto: true,
            message:
              "Message logged. You can also reach out directly via alemugetu78@gmail.com.",
          },
          { status: 200 }
        );
      }
    } else {
      // Development or unconfigured mail provider:
      // Log for development and return success with mailto advisory
      console.log("[Contact Form Submission]:", {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out! Your message has been received.",
    });
  } catch (err) {
    console.error("Contact route exception:", err);
    return NextResponse.json(
      {
        error:
          "An unexpected error occurred. Please try again or email directly.",
      },
      { status: 500 }
    );
  }
}
