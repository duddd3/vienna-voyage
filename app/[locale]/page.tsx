"use client";


import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Filters from '../components/Filters';
import TourCard from '../components/TourCard';
import TourDetail from '../components/TourDetail';
import { tours } from '../data/tours';
import type { FilterState, Tour, Language } from '../types';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  // Read filters from query params if present
  const [filters, setFilters] = useState<FilterState>(() => {
    const languages = (searchParams.get('languages')?.split(',').filter(Boolean) || []) as Language[];
    const intensity = searchParams.get('intensity') || null;
    const duration = searchParams.get('duration') ? Number(searchParams.get('duration')) : null;
    const district = searchParams.get('district') ? Number(searchParams.get('district')) : null;
    const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : null;
    return { languages, intensity, duration, district, minPrice };
  });

  // When filters change, update query params
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.languages.length) params.set('languages', filters.languages.join(','));
    if (filters.intensity) params.set('intensity', filters.intensity);
    if (filters.duration) params.set('duration', String(filters.duration));
    if (filters.district) params.set('district', String(filters.district));
    if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
    router.replace('?' + params.toString(), { scroll: false });
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);


  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);

  const filteredTours = tours.filter((tour) => {
    if (
      filters.languages.length > 0 &&
      !filters.languages.some((lang: string) => tour.languages.includes(lang as any))
    ) {
      return false;
    }
    if (filters.intensity && tour.intensity !== filters.intensity) {
      return false;
    }
    if (filters.duration && tour.duration !== filters.duration) {
      return false;
    }
    if (filters.district && tour.district !== filters.district) {
      return false;
    }
    if (filters.minPrice && Number(tour.price) >= filters.minPrice) {
      return false;
    }
    return true;
  });

  // Add TourDetail logic
  const { addToCart } = useCart();
const handleAddToCart = (tour: Tour, date: string, time: string) => {
  // Prepare CartTour object
  const cartTour = {
    id: tour.id,
    title: tour.title,
    price: typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price,
    image: tour.imageUrl || tour.image || '',
    duration: tour.duration ? `${tour.duration} hour${tour.duration > 1 ? 's' : ''}` : '',
  };
  addToCart(cartTour, date, time);
  setSelectedTour(null);
};

  return (
    <div style={{ minHeight: '100vh', boxSizing: 'border-box', position: 'relative' }}>
      <div style={{ display: 'flex', flexDirection: 'row', height: 'auto' }}>
        <div style={{ marginTop: 40 }}>
          <aside style={{
            minWidth: 260,
            maxWidth: 320,
            padding: 24,
            background: '#fafafa',
            borderRadius: 12,
            boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
            marginRight: 32,
            height: 'fit-content',
            alignSelf: 'flex-start',
            position: 'sticky',
            top: 104,
            zIndex: 10
          }}>
            <Filters filters={filters} setFilters={setFilters} />
          </aside>
        </div>
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'auto', paddingBottom: 80, minHeight: 'calc(100vh - 120px)' }}>
          <div style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: 24,
  width: '100%',
  maxWidth: 1200,
  margin: '32px auto 0 auto',
}}>
            {filteredTours.map((tour) => {
                // Get current locale from path
                const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
                const locale = pathname.split('/')[1] || 'en';
                // Encode filters as query params
                const params = new URLSearchParams();
                if (filters.languages.length) params.set('languages', filters.languages.join(','));
                if (filters.intensity) params.set('intensity', filters.intensity);
                if (filters.duration) params.set('duration', String(filters.duration));
                if (filters.district) params.set('district', String(filters.district));
                if (filters.minPrice) params.set('minPrice', String(filters.minPrice));
                const query = params.toString();
                return (
                  <div
                    key={tour.id}
                    style={{
                      minWidth: 280,
                      flex: '1 0 280px',
                      maxWidth: 340,
                      background: '#fff',
                      borderRadius: 16,
                      boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                      border: '1px solid #e5e7eb',
                      marginBottom: 8,
                      display: 'flex',
                      flexDirection: 'column',
                      overflow: 'hidden',
                    }}
                  >
                    <div style={{ cursor: 'pointer' }}>
                      <Link
                        href={`/${locale}/tours/${tour.id}${query ? `?${query}` : ''}`}
                        style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
                      >
                        <div>
                          <img src={tour.imageUrl} alt={tour.title} style={{ width: '100%', height: 192, objectFit: 'cover' }} />
                          <h2 className="text-lg font-bold mb-2" style={{ margin: '8px 0', paddingLeft: 12 }}>{tour.title}</h2>
                        </div>
                      </Link>
                    </div>
                    <TourCard tour={tour} onClick={() => {}} hideImageAndTitle />
                  </div>
                );
              })}
            </div>
          </main>
        </div>
        {selectedTour && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
          >
            <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.2)', maxWidth: 600, width: '90%', padding: 24 }}>
              <TourDetail
                tour={selectedTour}
                onClose={() => setSelectedTour(null)}
                onAddToCart={handleAddToCart}
              />
            </div>
          </div>
        )}
      </div>
  );
}
