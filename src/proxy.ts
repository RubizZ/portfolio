import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from "./lib/getDictionary";

function getLocaleFromRequest(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language") || "";

  // Parse Accept-Language header: "es-ES,es;q=0.9,en;q=0.8,en-US;q=0.7"
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [code, q] = lang.trim().split(";q=");
      return {
        code: code.trim().split("-")[0].toLowerCase(), // "es-ES" → "es"
        q: q ? parseFloat(q) : 1.0,
      };
    })
    .sort((a, b) => b.q - a.q);

  for (const { code } of languages) {
    if (SUPPORTED_LOCALES.includes(code as Locale)) {
      return code as Locale;
    }
  }

  return DEFAULT_LOCALE;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /cv.html based on locale
  if (pathname === "/cv.html") {
    const locale = getLocaleFromRequest(request);
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/cv.html`;
    return NextResponse.rewrite(url);
  }

  // Check if the pathname already starts with a supported locale
  const pathnameHasLocale = SUPPORTED_LOCALES.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to the detected locale
  const locale = getLocaleFromRequest(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Skip internal Next.js paths, static files and public assets
    "/((?!_next|favicon.ico|icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?|ttf|otf)).*)",
  ],
};
