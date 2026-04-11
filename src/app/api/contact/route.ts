import { NextResponse } from "next/server";

const MAX = { name: 120, email: 254, subject: 200, message: 8000 };

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      {
        error:
          "Contact form is not configured. Add WEB3FORMS_ACCESS_KEY in Vercel (see Web3Forms).",
      },
      { status: 503 }
    );
  }

  let body: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    /** honeypot — bots often fill this */
    company?: string;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const subject = typeof body.subject === "string" ? body.subject.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "Please fill in all fields." }, { status: 400 });
  }

  if (
    name.length > MAX.name ||
    email.length > MAX.email ||
    subject.length > MAX.subject ||
    message.length > MAX.message
  ) {
    return NextResponse.json({ error: "One or more fields are too long." }, { status: 400 });
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const res = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      access_key: accessKey,
      name,
      email,
      subject: `[Portfolio] ${subject}`,
      message,
    }),
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    return NextResponse.json({ error: "Unexpected response from email service." }, { status: 502 });
  }

  if (!data.success) {
    return NextResponse.json(
      { error: data.message || "Could not send your message. Try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
