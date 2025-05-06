export type Language = 'german' | 'english' | 'italian';
export type Intensity = 'relaxed' | 'sporty';
export type Duration = 1 | 2 | 3;
export type District = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23;

export interface Tour {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  languages: Language[];
  intensity: Intensity;
  duration: Duration;
  district: District;
  price: number;
  route: [number, number][];  // Array of [lat, lng] coordinates
  meetingPoint: string;
  waypointNames?: Record<number, string>; // Optional mapping of waypoint indices to names
}

export interface FilterState {
  languages: Language[];
  intensity: Intensity | null;
  duration: Duration | null;
  district: District | null;
  minPrice: number | null;
}
