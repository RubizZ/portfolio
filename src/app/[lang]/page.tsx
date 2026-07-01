import { notFound } from "next/navigation";
import PortfolioClient from "@/components/PortfolioClient";
import { hasLocale, getDictionary, type Locale } from "../../lib/getDictionary";

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <main style={{ paddingBottom: "4rem" }}>
      <PortfolioClient lang={lang as Locale} dict={dict} />
      <footer
        style={{
          textAlign: "center",
          padding: "3rem 0",
          color: "var(--text-muted)",
          marginTop: "6rem",
          borderTop: "1px solid var(--card-border)",
        }}
      >
        <p style={{ marginBottom: "1rem" }}>
          © {new Date().getFullYear()} Rubén Hidalgo. {dict.footer.built}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1.5rem" }}>
          <a
            href="https://github.com/RubizZ"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/ruben-hidalgo-arias/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "underline" }}
          >
            LinkedIn
          </a>
        </div>
      </footer>
    </main>
  );
}
