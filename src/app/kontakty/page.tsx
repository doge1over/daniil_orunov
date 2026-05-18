import type { Metadata } from "next";
import { ContactBlock } from "@/components/ContactBlock";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbsSchema } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Контакты",
  description: `Связаться с веб-разработчиком ${site.name}. Email, Telegram, телефон. Ответ в течение 2 часов в рабочее время.`,
  alternates: { canonical: "/kontakty" },
  openGraph: {
    title: `Контакты — ${site.name}`,
    description: "Email, Telegram, телефон. Форма для заявки на сайт.",
    url: `${site.url}/kontakty`,
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbsSchema([
          { name: "Главная", url: site.url },
          { name: "Контакты", url: `${site.url}/kontakty` },
        ])}
      />
      <ContactBlock />
    </>
  );
}
