'use client';

import { Tour } from '../types'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'

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
  onAddToCart: (tour: Tour) => void
}

export default function TourDetail({ tour, onClose, onAddToCart }: TourDetailProps) {
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
            route={tour.route} 
            meetingPoint={tour.meetingPoint} 
            tourId={tour.id}
          />
        </div>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold">{tour.price}€</span>
          <button
            onClick={() => onAddToCart(tour)}
            className="flex items-center bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <ShoppingCartIcon className="h-5 w-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}
