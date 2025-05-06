'use client'

import { useState } from 'react'
import { tours } from './data/tours'
import { FilterState, Tour } from './types'
import Filters from './components/Filters'
import TourCard from './components/TourCard'
import TourDetail from './components/TourDetail'

export default function Home() {
  const [filters, setFilters] = useState<FilterState>({
    languages: [],
    intensity: null,
    duration: null,
    district: null,
    minPrice: null,
  })

  const [selectedTour, setSelectedTour] = useState<Tour | null>(null)

  const filteredTours = tours.filter(tour => {
    if (filters.languages.length > 0 && !filters.languages.some(lang => tour.languages.includes(lang))) {
      return false
    }
    if (filters.intensity && tour.intensity !== filters.intensity) {
      return false
    }
    if (filters.duration && tour.duration !== filters.duration) {
      return false
    }
    if (filters.district && tour.district !== filters.district) {
      return false
    }
    if (filters.minPrice && tour.price >= filters.minPrice) {
      return false
    }
    return true
  })

  const handleAddToCart = (tour: Tour) => {
    // TODO: Implement cart functionality
    console.log('Added to cart:', tour.title)
  }

  return (
    <div className="flex mt-16 mb-16">
      <aside className="w-64 flex-shrink-0">
        <Filters filters={filters} setFilters={setFilters} />
      </aside>
      
      <main className="flex-grow ml-6">
        {selectedTour ? (
          <TourDetail
            tour={selectedTour}
            onClose={() => setSelectedTour(null)}
            onAddToCart={handleAddToCart}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTours.map(tour => (
              <TourCard
                key={tour.id}
                tour={tour}
                onClick={() => setSelectedTour(tour)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
