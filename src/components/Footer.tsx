import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white fixed bottom-0 left-0 right-0">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-center space-x-8">
          <Link href="/contact" className="hover:text-indigo-300">
            Contact
          </Link>
          <Link href="/impressum" className="hover:text-indigo-300">
            Impressum
          </Link>
          <Link href="/privacy" className="hover:text-indigo-300">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  )
}
