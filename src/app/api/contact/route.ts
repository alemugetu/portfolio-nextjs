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

    // 3. Provider dispatch (Resend Email and/or Telegram Notification)
    const resendApiKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_TO_EMAIL || "alemugetu78@gmail.com";
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    let dispatched = false;

    // A. Telegram notification (instant direct alert to phone)
    if (telegramBotToken && telegramChatId) {
      try {
        const tgRes = await fetch(
          `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: `📬 New Portfolio Message!\n\nFrom: ${name.trim()}\nEmail: ${email.trim()}\n\nMessage:\n${message.trim()}`,
              parse_mode: "HTML",
            }),
          }
        );
        if (tgRes.ok) {
          dispatched = true;
        }
      } catch (tgErr) {
        console.error("Telegram notification error:", tgErr);
      }
    }

    // B. Resend Email Dispatch
    if (resendApiKey) {
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
