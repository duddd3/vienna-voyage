import { Tour } from '@/types'
import Image from 'next/image'
import { useState } from 'react'

interface TourCardProps {
  tour: Tour
  onClick: () => void
}

export default function TourCard({ tour, onClick }: TourCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
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
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
        <div className="flex justify-between items-center text-sm text-gray-600 mb-2">
          <span>{tour.duration} hour{tour.duration > 1 ? 's' : ''}</span>
          <span>District {tour.district}</span>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            {tour.languages.map(lang => (
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
      </div>
    </div>
  )
}
