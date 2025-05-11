'use client';

import { useCart } from '../../context/CartContext';
import { TrashIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { CartItem } from '../types';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartItemCount, clearCart } = useCart();
  
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.tour.price * item.quantity), 0);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added any tours to your cart yet.</p>
        <Link 
          href="/" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Browse Tours
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart ({cartItemCount})</h1>
      
      <div className="space-y-6">
        {cart.map((item: CartItem) => (
          <div key={`${item.tour.id}-${item.date}-${item.time}`} className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">{item.tour.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {item.date} at {item.time} • {item.tour.duration}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.tour.id, item.date, item.time)}
                className="text-gray-400 hover:text-red-500"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.tour.id, item.date, item.time, item.quantity - 1);
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                    disabled={item.quantity <= 1}
                  >
                    <MinusIcon className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="text-gray-900 font-medium">{item.quantity}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      updateQuantity(item.tour.id, item.date, item.time, item.quantity + 1);
                    }}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <PlusIcon className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <p className="text-lg font-medium text-gray-900">
                  €{(item.tour.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium text-gray-900">Total</h2>
          <p className="text-2xl font-bold text-gray-900">€{calculateTotal().toFixed(2)}</p>
        </div>
        <div className="mt-6 space-y-4">
          <button
            onClick={() => clearCart()}
            className="w-full flex justify-center items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Clear Cart
          </button>
          <button
            className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Proceed to Checkout
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link href="/" className="text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
