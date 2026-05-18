import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Lead = {
  name?: string;
  contact?: string;
  type?: string;
  budget?: string;
  message?: string;
  website?: string;
};

export async function POST(req: Request) {
  let data: Lead;
  try {
    data = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "Некорректный JSON" }, { status: 400 });
  }

  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const contact = (data.contact ?? "").trim();
  if (!name || !contact) {
    return NextResponse.json({ ok: false, error: "Заполните имя и контакт" }, { status: 400 });
  }

  const text =
    `Новая заявка с orunov.dev\n` +
    `Имя: ${name}\n` +
    `Контакт: ${contact}\n` +
    `Тип: ${data.type ?? "—"}\n` +
    `Бюджет: ${data.budget ?? "—"}\n` +
    `Сообщение: ${data.message ?? "—"}`;

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (token && chatId) {
    try {
      const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, disable_web_page_preview: true }),
      });
      if (!tg.ok) {
        console.error("Telegram error", await tg.text());
      }
    } catch (err) {
      console.error("Telegram fetch failed", err);
    }
  } else {
    console.log("[lead] (set TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID to receive in Telegram)\n" + text);
  }

  return NextResponse.json({ ok: true });
}
