"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  // Extract locale from path (e.g., /en/..., /de/...)
  const locale = pathname.split('/')[1] || 'en';

  return (
    <footer className="bg-gray-800 text-white fixed bottom-0 left-0 right-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center space-x-8">
          <Link href={`/${locale}/contact`} className="hover:text-indigo-300">
            Contact
          </Link>
          <Link href={`/${locale}/legal`} className="hover:text-indigo-300">
            Impressum
          </Link>
          <Link href={`/${locale}/privacy`} className="hover:text-indigo-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
