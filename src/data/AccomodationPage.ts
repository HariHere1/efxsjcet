export type RoomType = 'private' | 'shared';
export type GenderPolicy = 'ladies-only' | 'mixed';

export interface AccommodationOption {
  id: string;
  title: string;
  description: string;
  image?: string;
  priceLabel: string;
  priceCovers: string;
  roomType: RoomType;
  capacity: string;
  occupancyPolicy: GenderPolicy;
  busServiceProvided: boolean;
  distanceFromCollege?: string;
  refundable: boolean;
  spotsRemaining: number;
  ctaLabel: string;
}

export const accommodationOptions: AccommodationOption[] = [
  {
    id: 'hostel',
    title: 'Campus Hostel',
    description: 'A simple, convenient stay right on campus for participants who want to remain close to the event.',
    priceLabel: '₹500',
    priceCovers: 'per night',
    roomType: 'shared',
    capacity: '4-bed dormitory',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    distanceFromCollege: 'On campus',
    refundable: false,
    spotsRemaining: 16,
    ctaLabel: 'Book Room',
  },

  {
    // NOTE: was previously id: 'hotel' — duplicate with the entry below.
    // Duplicate ids break React `key` uniqueness (AccommodationPage used
    // option.id as the list key) and would break any future lookup-by-id.
    id: 'mathrubhavan-hotel',
    title: 'Mathrubhavan',
    description: 'A comfortable stay at a nearby hotel for participants who prefer a bit more privacy and amenities.',
    priceLabel: '₹1500',
    priceCovers: 'per night',
    roomType: 'shared',
    capacity: '4-bed dormitory',
    occupancyPolicy: 'ladies-only',
    busServiceProvided: true,
    distanceFromCollege: '1km from campus', // was '1Kkm' — typo fixed
    refundable: false,
    spotsRemaining: 6,
    ctaLabel: 'Book Room',
  },

  {
    // NOTE: was previously id: 'hotel' — same fix as above.
    id: 'osanan-mount-hotel',
    title: 'Osanan Mount',
    description: 'A comfortable stay at a nearby hotel for participants who prefer a bit more privacy and amenities.',
    priceLabel: '₹600',
    priceCovers: 'per night',
    roomType: 'private',
    capacity: 'private room',
    occupancyPolicy: 'ladies-only',
    busServiceProvided: true,
    distanceFromCollege: '2km from campus',
    refundable: true,
    spotsRemaining: 10,
    ctaLabel: 'Book Room',
  },
];