export type RoomType = 'private' | 'shared';
export type GenderPolicy = 'ladies-only' | 'boys-only' | 'separate-gender' | 'mixed';

export interface AccommodationOption {
  id: string;
  title: string;
  description: string;
  // "Pastrol Central" | "Oshana Mount" | "Mathrubhavan"
  property: string;
  image?: string;
  priceLabel: string;
  priceCovers: string;
  // numeric base price used for totals
  price: number;
  priceUnit: 'room' | 'person';
  // required when priceUnit is 'room'
  personsPerRoom?: number;
  gstPercent?: number;
  roomType: RoomType;
  capacity: string;
  occupancyPolicy: GenderPolicy;
  busServiceProvided: boolean;
  refundable: boolean;
  // number of rooms (or beds for dorms)
  spotsRemaining: number;
  ctaLabel: string;
}

export const accommodationStayRules = [
  'Minimum stay: 3 days.',
  'Return to the allotted stay before 9:00 PM.',
  'No food is allowed in the stay areas.',
  'Keep the room and shared areas clean and hygienic.',
  'Bring your own bed sheets and sanitary items.',
  'Complete check-out as instructed by the accommodation coordinator.',
] as const;

export const accommodationOptions: AccommodationOption[] = [
  // ---------- PASTROL CENTRAL ----------
  {
    id: 'pastrol-central-single',
    title: 'Single room',
    description: 'A simple private room at Pastrol Central for the complete three-day minimum stay.',
    property: 'Pastrol Central',
    priceLabel: '₹600',
    priceCovers: 'complete 3-day stay',
    price: 600,
    priceUnit: 'room',
    personsPerRoom: 1,
    roomType: 'private',
    capacity: '1 person',
    occupancyPolicy: 'separate-gender',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 117,
    ctaLabel: 'Book Room',
  },
  {
    id: 'pastrol-central-double',
    title: 'Double room',
    description: 'A private room for two at Pastrol Central for the complete three-day minimum stay.',
    property: 'Pastrol Central',
    priceLabel: '₹900',
    priceCovers: 'complete 3-day stay',
    price: 900,
    priceUnit: 'room',
    personsPerRoom: 2,
    roomType: 'private',
    capacity: '2 persons',
    occupancyPolicy: 'separate-gender',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 117,
    ctaLabel: 'Book Room',
  },

  // ---------- OSHANA MOUNT ----------
  {
    id: 'oshana-mount-dormitory',
    title: 'Dormitory',
    description: 'A boys-only dormitory at Oshana Mount. No mixed accommodation.',
    property: 'Oshana Mount',
    priceLabel: '₹180 /',
    priceCovers: 'per head',
    price: 180,
    priceUnit: 'person',
    roomType: 'shared',
    capacity: '50-bed dormitory',
    occupancyPolicy: 'boys-only',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 50,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-non-ac-triple',
    title: 'Normal triple room',
    description: 'A normal triple room at Oshana Mount with separate rooms for boys and girls.',
    property: 'Oshana Mount',
    priceLabel: '₹840 /',
    priceCovers: 'per room',
    price: 840,
    priceUnit: 'room',
    personsPerRoom: 3,
    roomType: 'private',
    capacity: '3 persons',
    occupancyPolicy: 'separate-gender',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 24,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-double',
    title: 'Normal double room',
    description: 'A normal double room at Oshana Mount with separate rooms for boys and girls.',
    property: 'Oshana Mount',
    priceLabel: '₹945 /',
    priceCovers: 'per room',
    price: 945,
    priceUnit: 'room',
    personsPerRoom: 2,
    roomType: 'private',
    capacity: '2 persons',
    occupancyPolicy: 'separate-gender',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 7,
    ctaLabel: 'Book Room',
  },

  // ---------- MATHRUBHAVAN ----------
  {
    id: 'mathrubhavan-dormitory-bed',
    title: 'Dormitory bed',
    description: 'A bed in the Mathrubhavan dormitories. Ladies only.',
    property: 'Mathrubhavan',
    priceLabel: '₹147.50',
    priceCovers: 'per bed',
    price: 147.5,
    priceUnit: 'person',
    roomType: 'shared',
    capacity: '120 beds',
    occupancyPolicy: 'ladies-only',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 116,
    ctaLabel: 'Book Room',
  },
];
