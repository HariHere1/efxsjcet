// TODO: Pricing model per person vs per room pending coordinator confirmation; the booking total currently assumes per person.

export type RoomType = 'private' | 'shared';
export type GenderPolicy = 'ladies-only' | 'mixed';

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
    description: 'A simple private room at Pastrol Central.',
    property: 'Pastrol Central',
    priceLabel: '₹900 /',
    priceCovers: 'per room',
    price: 900,
    priceUnit: 'room',
    personsPerRoom: 1,
    roomType: 'private',
    capacity: '1 person',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 50,
    ctaLabel: 'Book Room',
  },
  {
    id: 'pastrol-central-double',
    title: 'Double room',
    description: 'A private room for two at Pastrol Central.',
    property: 'Pastrol Central',
    priceLabel: '₹450 /',
    priceCovers: 'per room',
    price: 450,
    priceUnit: 'room',
    personsPerRoom: 2,
    roomType: 'private',
    capacity: '2 persons',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 119,
    ctaLabel: 'Book Room',
  },

  // ---------- OSHANA MOUNT ----------
  {
    id: 'oshana-mount-dormitory',
    title: 'Dormitory',
    description: 'Shared 50-bed dormitory at Oshana Mount.',
    property: 'Oshana Mount',
    priceLabel: '₹180 /',
    priceCovers: 'per head',
    price: 180,
    priceUnit: 'person',
    roomType: 'shared',
    capacity: '50-bed dormitory',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 50,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-non-ac-triple',
    title: 'Non-AC triple room',
    description: 'Non-AC triple room at Oshana Mount.',
    property: 'Oshana Mount',
    priceLabel: '₹840 /',
    priceCovers: 'per room',
    price: 840,
    priceUnit: 'room',
    personsPerRoom: 3,
    roomType: 'private',
    capacity: '3 persons',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 24,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-ac-double',
    title: 'AC double room',
    description: 'Air-conditioned double room at Oshana Mount.',
    property: 'Oshana Mount',
    priceLabel: '₹1575 /',
    priceCovers: 'per room',
    price: 1575,
    priceUnit: 'room',
    personsPerRoom: 2,
    roomType: 'private',
    capacity: '2 persons',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 9,
    ctaLabel: 'Book Room',
  },
  {
    // NOTE: the AC and non-AC doubles share the SAME 9 rooms — their
    // spotsRemaining must be decremented together, not independently.
    id: 'oshana-mount-non-ac-double',
    title: 'Non-AC double room',
    description: 'Non-AC double room at Oshana Mount.',
    property: 'Oshana Mount',
    priceLabel: '₹945 /',
    priceCovers: 'per room',
    price: 945,
    priceUnit: 'room',
    personsPerRoom: 2,
    roomType: 'private',
    capacity: '2 persons',
    occupancyPolicy: 'mixed',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 9,
    ctaLabel: 'Book Room',
  },

  // ---------- MATHRUBHAVAN ----------
  {
    // Dorm sizes: 6-bed x7, 4-bed x4, 3-bed x2, 5-bed x1, 6-bed x1,
    // 8-bed x1, 15-bed x1, 20-bed x1, 3-bed x1 (121 beds total).
    id: 'mathrubhavan-dormitory-bed',
    title: 'Dormitory bed',
    description: 'A bed in the Mathrubhavan dormitories. Ladies only.',
    property: 'Mathrubhavan [Womens Only]',
    priceLabel: '₹125 per bed + 15% GST',
    priceCovers: 'per bed',
    price: 125,
    priceUnit: 'person',
    gstPercent: 15,
    roomType: 'shared',
    capacity: '3 to 20 bed dormitories',
    occupancyPolicy: 'ladies-only',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 121,
    ctaLabel: 'Book Room',
  },
];
