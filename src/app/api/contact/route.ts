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

    // 3. Email Provider dispatch (Brevo primary, Resend fallback)
    const brevoApiKey = process.env.BREVO_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "alemugetu78@gmail.com";
    const brevoSenderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      process.env.CONTACT_TO_EMAIL ||
      "alemugetu78@gmail.com";

    let dispatched = false;

    // A. Brevo (brevo.com - 300 free emails/day)
    if (brevoApiKey) {
      try {
        const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
          method: "POST",
          headers: {
            accept: "application/json",
            "api-key": brevoApiKey,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            sender: {
              name: "Portfolio Contact",
              email: brevoSenderEmail,
            },
            to: [
              {
                email: toEmail,
                name: "Alemu Getu Adane",
              },
            ],
            replyTo: {
              email: email.trim(),
              name: name.trim(),
            },
            subject: `Portfolio Contact from ${name.trim()}`,
            htmlContent: `
              <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
                <h2 style="color: #059669; margin-top: 0;">New Message from Portfolio</h2>
                <p><strong>Sender Name:</strong> ${name.trim()}</p>
                <p><strong>Sender Email:</strong> <a href="mailto:${email.trim()}">${email.trim()}</a></p>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
                <p><strong>Message:</strong></p>
                <blockquote style="background: #f8fafc; border-left: 4px solid #10b981; margin: 0; padding: 12px 16px; white-space: pre-wrap;">${message.trim()}</blockquote>
                <p style="font-size: 12px; color: #64748b; margin-top: 24px;">Clicking "Reply" to this email will reply directly to ${email.trim()}.</p>
              </div>
            `,
            textContent: `New message from ${name.trim()} (${email.trim()}):\n\n${message.trim()}`,
          }),
        });

        if (brevoRes.ok) {
          dispatched = true;
        } else {
          const errorData = await brevoRes.json().catch(() => ({}));
          console.error("Brevo API error:", errorData);
        }
      } catch (brevoErr) {
        console.error("Brevo request error:", brevoErr);
      }
    }

    // B. Resend fallback (if BREVO_API_KEY is not set)
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!dispatched && resendApiKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: "Portfolio Contact <onboarding@resend.dev>",
            to: [toEmail],
            reply_to: email.trim(),
            subject: `Portfolio Contact from ${name.trim()}`,
            text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
          }),
        });

        if (res.ok) {
          dispatched = true;
        } else {
          const errorData = await res.json().catch(() => ({}));
          console.error("Resend API error:", errorData);
        }
      } catch (resendErr) {
        console.error("Resend request error:", resendErr);
      }
    }

    if (!dispatched) {
      // In local dev without keys, log to console
      console.log("[Contact Form Message Received]:", {
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
