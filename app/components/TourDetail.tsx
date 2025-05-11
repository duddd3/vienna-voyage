'use client';

import { Tour } from '../types'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState, useMemo } from 'react';

const TourMap = dynamic(
  () => import('./TourMap'),
  { 
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    )
  }
)

interface TourDetailProps {
  tour: Tour
  onClose: () => void
  onAddToCart: (tour: Tour, date: string, time: string) => void
}

export default function TourDetail({ tour, onClose, onAddToCart }: TourDetailProps) {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('10:00');

  // Date bounds (memoized for SSR/CSR consistency)
  const [minStr, maxStr] = useMemo(() => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(today.getFullYear() + 2);
    return [today.toISOString().split('T')[0], maxDate.toISOString().split('T')[0]];
  }, []);

  const handleFormClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!selectedDate) return;
    // Robust date validation
    const selected = new Date(selectedDate);
    const min = new Date(minStr);
    const max = new Date(maxStr);
    if (isNaN(selected.getTime()) || selected < min || selected > max) {
      alert(`Please select a date between ${minStr} and ${maxStr}`);
      return;
    }
    onAddToCart(tour, selectedDate, selectedTime);
  };
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="relative h-64 bg-gray-200">
        <Image
          src={tour.imageUrl}
          alt={tour.title}
          fill
          className="object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://placehold.co/1200x800?text=Tour+Image';
          }}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
      </div>
      
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{tour.title}</h2>
        
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {tour.duration} hour{tour.duration > 1 ? 's' : ''}
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              District {tour.district}
            </span>
            <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full">
              {tour.intensity}
            </span>
            {tour.languages.map(lang => (
              <span 
                key={lang}
                className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full"
              >
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </span>
            ))}
          </div>
          
          <p className="text-gray-600 mb-4">{tour.description}</p>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Meeting Point:</h3>
            <p>{tour.meetingPoint}</p>
          </div>
        </div>

        <div className="h-64 mb-6 rounded-lg overflow-hidden">
          <TourMap 
            route={tour.route || []} 
            meetingPoint={tour.meetingPoint} 
            tourId={tour.id}
            waypointNames={tour.waypointNames || {}}
          />
        </div>

        <div className="space-y-4 mt-6" onClick={handleFormClick}>
          <div>
            <label htmlFor={`detail-date-${tour.id}`} className="block text-sm font-medium text-gray-700">
              Date
            </label>
            <input
              type="date"
              id={`detail-date-${tour.id}`}
              value={selectedDate}
              onChange={(e) => {
                const value = e.target.value;
                if (value < minStr) {
                  setSelectedDate(minStr);
                } else if (value > maxStr) {
                  setSelectedDate(maxStr);
                } else {
                  setSelectedDate(value);
                }
              }}
              min={minStr}
              max={maxStr}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor={`detail-time-${tour.id}`} className="block text-sm font-medium text-gray-700">
              Time
            </label>
            <select
              id={`detail-time-${tour.id}`}
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
          <div className="flex justify-between items-center pt-2">
            <span className="text-2xl font-bold">{tour.price}€</span>
            <button
              onClick={handleAddToCartClick}
              disabled={!selectedDate}
              className={`flex items-center px-6 py-3 rounded-lg transition-colors ${
                selectedDate 
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
