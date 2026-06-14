import { NextRequest, NextResponse } from "next/server";
import {
  checkRateLimit,
  containsDangerousPatterns,
  isValidPhone,
  validateJsonInput,
} from "@/lib/security";

const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const RECIPIENT_EMAIL = process.env.EMAILJS_RECIPIENT_EMAIL?.trim();

/** Значення `interest` з форми контактів EuroGrant */
const INTEREST_LABELS: Record<string, string> = {
  "grants-eu": "Гранти ЄС для бізнесу",
  "private-loans": "Приватні позики та інвестиції",
  "grants-ngo": "Гранти для НКО та благодійних організацій",
  general: "Загальна консультація",
};

const ALLOWED_INTEREST = new Set(Object.keys(INTEREST_LABELS));

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: NextRequest) {
  try {
    const clientId =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const rateLimit = checkRateLimit(clientId, 15, 60_000);
    if (!rateLimit.allowed) {
      return NextResponse.json(
        { error: "Забагато запитів. Спробуйте пізніше." },
        { status: 429 },
      );
    }

    const bodyText = await req.text();
    const jsonValidation = validateJsonInput(bodyText, 50_000);
    if (!jsonValidation.valid) {
      return NextResponse.json(
        { error: "Некоректні дані", details: jsonValidation.error },
        { status: 400 },
      );
    }

    const body = JSON.parse(bodyText) as Record<string, unknown>;

    // Honeypot: приховане поле для ботів — тихо відхиляємо
    if (str(body.website, 500)) {
      return NextResponse.json({ success: true });
    }

    const name = str(body.name, 200);
    const email = str(body.email, 254);
    const phone = str(body.phone, 50);
    const business = str(body.business, 300);
    const interest = str(body.interest, 64);
    const question = str(body.question, 4000);
    const message = str(body.message, 8000);

    if (!name) {
      return NextResponse.json({ error: "Вкажіть ім'я" }, { status: 400 });
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Некоректний email" }, { status: 400 });
    }
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Некоректний телефон. Вкажіть номер лише з цифр (мін. 9), можна з + на початку." },
        { status: 400 },
      );
    }
    if (!ALLOWED_INTEREST.has(interest)) {
      return NextResponse.json({ error: "Оберіть тему зі списку" }, { status: 400 });
    }

    const interestLabel = INTEREST_LABELS[interest] ?? interest;
    const contentToCheck = `${name} ${email} ${phone} ${business} ${interestLabel} ${question} ${message}`;
    if (containsDangerousPatterns(contentToCheck)) {
      return NextResponse.json(
        { error: "Недопустимий вміст у полях форми" },
        { status: 400 },
      );
    }

    if (
      !EMAILJS_SERVICE_ID ||
      !EMAILJS_TEMPLATE_ID ||
      !EMAILJS_PUBLIC_KEY ||
      !EMAILJS_PRIVATE_KEY ||
      !RECIPIENT_EMAIL
    ) {
      console.error("EmailJS configuration is not set");
      return NextResponse.json(
        {
          error:
            "Пошта не налаштована на сервері. Задайте EMAILJS_* та EMAILJS_RECIPIENT_EMAIL.",
        },
        { status: 500 },
      );
    }

    const fn = escapeHtml(name);
    const em = escapeHtml(email);
    const ph = escapeHtml(phone);
    const bu = business ? escapeHtml(business) : "";
    const il = escapeHtml(interestLabel);
    const q = question ? escapeHtml(question).replace(/\n/g, "<br>") : "";
    const msg = message ? escapeHtml(message).replace(/\n/g, "<br>") : "";

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #222;">Заявка з сайту EuroGrant Partners</h2>
        <p><strong>Ім'я:</strong> ${fn}</p>
        <p><strong>Email:</strong> ${em}</p>
        <p><strong>Телефон:</strong> ${ph}</p>
        ${bu ? `<p><strong>Бізнес / організація:</strong> ${bu}</p>` : ""}
        <p><strong>Цікавить:</strong> ${il}</p>
        ${q ? `<p><strong>Питання:</strong><br>${q}</p>` : ""}
        ${msg ? `<p><strong>Опис проєкту:</strong><br>${msg}</p>` : ""}
        <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">Форма «Записатись на консультацію».</p>
      </div>
    `;

    const emailText = [
      "Заявка з сайту EuroGrant Partners",
      "",
      `Ім'я: ${name}`,
      `Email: ${email}`,
      `Телефон: ${phone}`,
      ...(business ? [`Бізнес / організація: ${business}`] : []),
      `Цікавить: ${interestLabel}`,
      ...(question ? ["", "Питання:", question] : []),
      ...(message ? ["", "Опис проєкту:", message] : []),
    ].join("\n");

    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        accessToken: EMAILJS_PRIVATE_KEY,
        template_params: {
          to_email: RECIPIENT_EMAIL,
          subject: `EuroGrant — заявка від ${name}`,
          message: emailHtml,
          message_text: emailText,
          reply_to: email,
        },
      }),
    });

    const responseData = await response.text();

    if (!response.ok) {
      console.error("EmailJS API error:", responseData);
      return NextResponse.json(
        { error: "Не вдалося надіслати лист", details: responseData },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("send-email:", error);
    return NextResponse.json({ error: "Внутрішня помилка сервера" }, { status: 500 });
  }
}
