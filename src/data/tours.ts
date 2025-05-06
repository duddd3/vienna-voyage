import { Tour } from '../../app/types';

export const tours: Tour[] = [
  {
    id: 'historic-first-district',
    title: 'Historic First District Walk',
    description: 'Explore the heart of Vienna through its magnificent historic center. Visit St. Stephen\'s Cathedral, walk along the Graben, and discover hidden courtyards.',
    imageUrl: '/images/first-district.jpg',
    languages: ['english', 'german'],
    intensity: 'relaxed',
    duration: 2,
    district: 1,
    price: 25,
    meetingPoint: 'Stephansplatz main entrance',
    route: [
      [48.208674, 16.373819], // Stephansplatz
      [48.210033, 16.366935], // Michaelerplatz
      [48.205334, 16.367707], // State Opera
    ]
  },
  {
    id: 'schonbrunn-gardens',
    title: 'Schönbrunn Palace Gardens',
    description: 'A sporty walk through the magnificent gardens of Schönbrunn Palace. Climb up to the Gloriette for a breathtaking view over Vienna.',
    imageUrl: '/images/schonbrunn.jpg',
    languages: ['english', 'german', 'italian'],
    intensity: 'sporty',
    duration: 3,
    district: 13,
    price: 35,
    meetingPoint: 'Schönbrunn Palace main gate',
    route: [
      [48.185813, 16.312740], // Palace entrance
      [48.182677, 16.309950], // Gloriette
      [48.184562, 16.305658], // Zoo area
    ]
  },
  {
    id: 'prater-adventure',
    title: 'Prater Park Experience',
    description: 'Discover the famous Prater amusement park and its surrounding green areas. Perfect for families and nature lovers.',
    imageUrl: '/images/prater.jpg',
    languages: ['english', 'german'],
    intensity: 'relaxed',
    duration: 1,
    district: 2,
    price: 15,
    meetingPoint: 'Praterstern Giant Ferris Wheel',
    route: [
      [48.216521, 16.395872], // Giant Ferris Wheel
      [48.214654, 16.401665], // Prater Main Alley
      [48.219543, 16.400892], // Green Prater
    ]
  }
];
