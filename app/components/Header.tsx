import { ShoppingCartIcon, CalendarIcon, GlobeAltIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-indigo-600">
            Vienna Voyages
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/calendar" className="flex items-center text-gray-600 hover:text-indigo-600">
              <CalendarIcon className="h-6 w-6" />
              <span className="ml-1">Calendar</span>
            </Link>
            
            <div className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer">
              <GlobeAltIcon className="h-6 w-6" />
              <span className="ml-1">Language</span>
            </div>
            
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-indigo-600">
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="ml-1">Cart (0)</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
