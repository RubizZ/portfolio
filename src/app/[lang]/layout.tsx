import { Inter } from "next/font/google";
import "../globals.css";
import { hasLocale, type Locale } from "../../lib/getDictionary";
import { notFound } from "next/navigation";
import LanguageSwitcher from "../../components/LanguageSwitcher";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export async function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isEn = lang === "en";
  return {
    title: "Rubén Hidalgo - Software Engineer",
    description: isEn
      ? "Personal portfolio of Rubén Hidalgo. Software projects, skills and solutions."
      : "Portafolio personal de Rubén Hidalgo. Proyectos de software, conocimientos y soluciones.",
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang} className={inter.variable}>
      <body>
        <LanguageSwitcher lang={lang as Locale} />
        {children}
      </body>
    </html>
  );
}
