'use client';

import { ShoppingCartIcon, CalendarIcon, GlobeAltIcon, UserCircleIcon, ChatBubbleLeftRightIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { cartItemCount } = useCart();
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
            
            <Link href="/about" className="flex items-center text-gray-600 hover:text-indigo-600">
              <UserCircleIcon className="h-6 w-6" />
              <span className="ml-1">About</span>
            </Link>
            
            <Link href="/contact" className="flex items-center text-gray-600 hover:text-indigo-600">
              <ChatBubbleLeftRightIcon className="h-6 w-6" />
              <span className="ml-1">Contact</span>
            </Link>
            
            <Link href="/faq" className="flex items-center text-gray-600 hover:text-indigo-600">
              <QuestionMarkCircleIcon className="h-6 w-6" />
              <span className="ml-1">FAQ</span>
            </Link>
            
            <div className="flex items-center text-gray-600 hover:text-indigo-600">
              <GlobeAltIcon className="h-6 w-6" />
              <LanguageSwitcher />
            </div>
            
            <Link href="/cart" className="flex items-center text-gray-600 hover:text-indigo-600 relative">
              <ShoppingCartIcon className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="ml-1">Cart</span>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
