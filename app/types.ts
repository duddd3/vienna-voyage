export type Language = 'english' | 'german' | 'french' | 'spanish' | 'italian';

export interface Tour {
  id: string;
  title: string;
  description: string;
  price: number | string;
  duration: number;
  district: number;
  languages: Language[];
  imageUrl: string;
  image?: string; // For cart compatibility
  highlights: string[];
  meetingPoint: string;
  includes: string[];
  notSuitableFor: string[];
  requirements: string[];
  intensity?: string;
  // Optional map support
  route?: [number, number][];
  waypointNames?: Record<number, string>;
}

export interface FilterState {
  languages: Language[];
  intensity: string | null;
  duration: number | null;
  district: number | null;
  minPrice: number | null;
}

export interface CartTour {
  id: string;
  title: string;
  price: number;
  image: string;
  duration: string;
}

export interface CartItem {
  tour: CartTour;
  quantity: number;
  date: string;
  time: string;
}
