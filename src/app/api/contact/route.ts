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

    // 3. Email Provider Configuration
    const brevoApiKey = process.env.BREVO_API_KEY?.trim();
    const toEmail =
      process.env.CONTACT_TO_EMAIL?.trim() ||
      process.env.BREVO_SENDER_EMAIL?.trim() ||
      "alemugetu2123@gmail.com";
    const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL?.trim() || toEmail;

    const hasRealBrevoKey =
      Boolean(brevoApiKey) &&
      !brevoApiKey?.includes("your-brevo-api-key-here") &&
      brevoApiKey !== "";

    // 4. Attempt Brevo Dispatch
    if (hasRealBrevoKey && brevoApiKey) {
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
              name: "Portfolio Contact Form",
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
            subject: `Portfolio Message from ${name.trim()}`,
            htmlContent: `
              <div style="font-family: sans-serif; line-height: 1.6; color: #1e293b; max-width: 600px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #ffffff;">
                <h2 style="color: #059669; margin-top: 0; font-size: 20px;">New Portfolio Inquiry</h2>
                <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 20px;">
                  <p style="margin: 4px 0;"><strong>Sender:</strong> ${name.trim()}</p>
                  <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email.trim()}" style="color: #0284c7;">${email.trim()}</a></p>
                </div>
                <p style="margin-bottom: 6px;"><strong>Message:</strong></p>
                <div style="background: #ffffff; border-left: 4px solid #10b981; padding: 12px 16px; margin: 0; white-space: pre-wrap; font-size: 15px; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">${message.trim()}</div>
                <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 24px 0 16px;" />
                <p style="font-size: 12px; color: #64748b; margin: 0;">Hit "Reply" in your email client to reply directly to ${email.trim()}.</p>
              </div>
            `,
            textContent: `New message from ${name.trim()} (${email.trim()}):\n\n${message.trim()}`,
          }),
        });

        if (brevoRes.ok) {
          return NextResponse.json({
            success: true,
            message:
              "Thank you for reaching out! Your message has been sent to Alemu.",
          });
        }

        const errorData = await brevoRes.json().catch(() => ({}));
        console.error("[Brevo API Error Response]:", errorData);

        const errorMessage =
          (errorData as { message?: string })?.message ||
          "Brevo was unable to deliver this email.";

        return NextResponse.json(
          {
            error: `Brevo Delivery Error: ${errorMessage}. Please check your Brevo API key and verified sender email (${brevoSenderEmail}), or email directly.`,
          },
          { status: 502 }
        );
      } catch (brevoErr) {
        console.error("[Brevo Request Exception]:", brevoErr);
        return NextResponse.json(
          {
            error:
              "Network error connecting to Brevo. Please check your internet connection or email directly.",
          },
          { status: 502 }
        );
      }
    }

    // 5. Fallback if Web3Forms Access Key is present
    const web3FormsKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
    if (web3FormsKey) {
      try {
        const w3Res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3FormsKey,
            name: name.trim(),
            email: email.trim(),
            message: message.trim(),
            subject: `Portfolio Message from ${name.trim()}`,
            from_name: "Portfolio Contact Form",
          }),
        });

        const w3Data = await w3Res.json().catch(() => ({}));
        if (w3Res.ok && w3Data.success) {
          return NextResponse.json({
            success: true,
            message:
              "Thank you for reaching out! Your message has been sent to Alemu.",
          });
        }
      } catch (w3Err) {
        console.error("Web3Forms error:", w3Err);
      }
    }

    // 6. Fallback if Resend API key is present
    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (resendApiKey) {
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
            subject: `Portfolio Message from ${name.trim()}`,
            text: `Name: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
          }),
        });

        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "Thank you for reaching out! Your message has been sent.",
          });
        }
      } catch (resendErr) {
        console.error("Resend error:", resendErr);
      }
    }

    // 6. If no valid email provider API key is configured
    console.warn(
      "[Contact Form API Key Missing]: Message not sent via email:",
      {
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      }
    );

    return NextResponse.json(
      {
        error:
          "Email service is not yet activated: BREVO_API_KEY is missing or unconfigured. Please add your Brevo API key in .env.local, or contact directly via alemugetu2123@gmail.com.",
      },
      { status: 503 }
    );
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
