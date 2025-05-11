"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "../../i18nConfig";

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    const segments = pathname.split("/").filter(Boolean);
    segments[0] = newLocale;
    router.push("/" + segments.join("/"));
  };

  return (
    <select value={currentLocale} onChange={handleChange} className="ml-2 border rounded px-2 py-1">
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === "en" ? "English" : "Deutsch"}
        </option>
      ))}
    </select>
  );
}
