import { Tour } from '../types';

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
      [48.2081592, 16.3739223], // point 2
      [48.2056003, 16.3754327], // point 3
      [48.2053488, 16.3710619], // point 4
      [48.205746, 16.3688517], // point 5
      [48.2083709, 16.3702474], // point 6
      [48.209248, 16.3696414], // point 7
      [48.2096319, 16.3718864], // point 8
      [48.208674, 16.373819], // Stephansplatz
    ],
    waypointNames: {
      1: "St. Stephen's Cathedral",
      2: 'Graben Street',
      3: 'Kohlmarkt',
      4: 'Michaelerplatz',
      5: 'Hofburg Palace',
      6: 'Josefsplatz',
      7: 'Albertina Museum',
      8: 'Stephansplatz'
    }
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
  },
  {
    id: 'murales-1070',
    title: 'Murales 1070',
    description: 'Explore the coolest street-art of the 7th district!',
    imageUrl: '/images/murales-1070.jpg',
    languages: ['german'],
    intensity: 'relaxed',
    duration: 1,
    district: 7,
    price: 8,
    meetingPoint: 'U6 Stop Burggasse',
    route: [
      [48.2026925,16.3376901], // U6 Burggasse
      [48.2028336,16.3431981], // point 2
      [48.201835,16.3431786], // point 3
      [48.2018226,16.345965], // point 4
      [48.1996086,16.3468505], // point 5
      [48.1990307,16.3432152], // point 6
      [48.2003592,16.3408349], // point 7
      [48.202364,16.3377717], // point 8
    ],
    waypointNames: {
      1: "Murales 1",
      2: 'Murales 2',
      3: 'Murales 3',
      4: 'Murales 4',
      5: 'Murales 5',
      6: 'Murales 6',
      7: 'Murales 7',
      8: 'U6 Burggasse'
    }
  },

];
