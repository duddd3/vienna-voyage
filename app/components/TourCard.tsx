'use client';

import { Tour, Language } from '../types';
import Image from 'next/image';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

interface TourCardProps {
  tour: Tour;
  onClick: () => void;
  hideImageAndTitle?: boolean;
}

export default function TourCard({ tour, onClick, hideImageAndTitle = false }: TourCardProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');
  const { addToCart } = useCart();

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedDate) return;
    
    // Ensure price is a number
    let price: number;
    const priceString = String(tour.price);
    if (priceString) {
      const numericValue = parseFloat(priceString.replace(/[^0-9.-]+/g, ''));
      price = isNaN(numericValue) ? 0 : numericValue;
    } else {
      price = 0;
    }

    addToCart({
      id: tour.id,
      title: tour.title,
      price: price,
      image: tour.imageUrl || '',
      duration: tour.duration.toString()
    }, selectedDate, selectedTime);
    
    // Reset the form
    setSelectedDate('');
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all"
      onClick={onClick}
    >
      {!hideImageAndTitle && (
        <>
          <div className="relative h-48 bg-gray-200">
            <Image
              src={tour.imageUrl}
              alt={tour.title}
              fill
              className="object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://placehold.co/600x400?text=Tour+Image';
              }}
            />
          </div>
          <div className="pt-4 pb-2 px-4">
            <h3 className="text-xl font-semibold mb-1">{tour.title}</h3>
          </div>
        </>
      )}
      <div className="p-4 flex-1 flex flex-col justify-between">
        {/* The rest of the card content (details, controls) always renders */}
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>{tour.duration} hour{tour.duration > 1 ? 's' : ''}</span>
          <span>District {tour.district}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <div className="flex space-x-2">
            {tour.languages.map((lang: Language) => (
              <span 
                key={lang}
                className="px-2 py-1 bg-gray-100 rounded-full text-xs"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </span>
            ))}
          </div>
          <span className="font-semibold">{tour.price}€</span>
        </div>
        <div className="mt-4 space-y-4" onClick={handleFormClick}>
          <div onClick={e => e.stopPropagation()}>
            <label htmlFor={`date-${tour.id}`} className="block text-sm font-medium text-gray-700" onClick={e => e.stopPropagation()}>
              Date
            </label>
            <input
              type="date"
              id={`date-${tour.id}`}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
              onClick={e => e.stopPropagation()}
            />
          </div>
          <div onClick={e => e.stopPropagation()}>
            <label htmlFor={`time-${tour.id}`} className="block text-sm font-medium text-gray-700" onClick={e => e.stopPropagation()}>
              Time
            </label>
            <select
              id={`time-${tour.id}`}
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            >
              {['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedDate}
            className={`w-full flex items-center justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              selectedDate 
                ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
