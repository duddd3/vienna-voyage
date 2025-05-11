'use client';
import { useRouter, usePathname } from 'next/navigation';
import { notFound } from 'next/navigation';
import { tours } from '../../../data/tours';
import TourDetail from '../../../components/TourDetail';

interface Props {
  params: { tourId: string };
}

export default function TourDetailPage({ params }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const tour = tours.find(t => t.id === params.tourId);
  if (!tour) return notFound();
  // Get locale from path
  const locale = pathname.split('/')[1] || 'en';
  return (
    <div style={{ maxWidth: 700, margin: '40px auto' }}>
      <TourDetail
        tour={tour}
        onClose={() => {
          if (window.history.length > 1) {
            router.back();
          } else {
            // Reconstruct list URL with query params
            const search = window.location.search;
            router.push(`/${locale}${search}`);
          }
        }}
        onAddToCart={(tour, date, time) => {
          // Add to cart using context
          // Convert Tour to CartTour
          const cartTour = {
            id: tour.id,
            title: tour.title,
            price: typeof tour.price === 'string' ? parseFloat(tour.price) : tour.price,
            image: tour.imageUrl || tour.image || '',
            duration: tour.duration ? `${tour.duration} hour${tour.duration > 1 ? 's' : ''}` : '',
          };
          // Use window to get context since this is a client component
          const event = new CustomEvent('add-to-cart', { detail: { cartTour, date, time } });
          window.dispatchEvent(event);
          router.push(`/${locale}/cart`);
        }}
      />
    </div>
  );
}
