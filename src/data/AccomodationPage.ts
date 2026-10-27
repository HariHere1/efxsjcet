import mathrubhavanImage from '../assets/images/stayImages/mathrubhavan/mbn1.jpeg';
import oshanaMountImage from '../assets/images/stayImages/oshana mount/os1.jpeg';
import pastrolCentralImage from '../assets/images/stayImages/pastrol central/pc1.jpeg';
import mathrubhavanImage2 from '../assets/images/stayImages/mathrubhavan/mbn2.jpeg';
import oshanaMountImage2 from '../assets/images/stayImages/oshana mount/os2.jpeg';
import oshanaMountImage3 from '../assets/images/stayImages/oshana mount/os3.jpeg';
import oshanaMountImage5 from '../assets/images/stayImages/oshana mount/os5.jpeg';
import pastrolCentralImage2 from '../assets/images/stayImages/pastrol central/pc2.jpeg';
import pastrolCentralImage3 from '../assets/images/stayImages/pastrol central/pc3.jpeg';
import pastrolCentralImage4 from '../assets/images/stayImages/pastrol central/pc4.jpeg';
import pastrolCentralImage5 from '../assets/images/stayImages/pastrol central/pc5.jpeg';

export type RoomType = 'private' | 'shared';
export type GenderPolicy = 'ladies-only' | 'boys-only' | 'separate-gender' | 'mixed';

export interface AccommodationOption {
  id: string;
  title: string;
  description: string;
  // "Alphonsian Pastoral Institute" | "Hosanna Mount" | "CML Mathrubhavan"
  property: string;
  image?: string;
  gallery: string[];
  imagePosition?: string;
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
  availabilityCapacity: number;
  ctaLabel: string;
}

export const accommodationStayRules = [
  'Follow hostel timings.',
  'Enter the hostel before 9:00 PM.',
  'No food items are allowed.',
  'Avoid unauthorized visitors.',
  'Keep rooms clean.',
  'Avoid smoking and alcohol.',
  'Avoid loud music and noise at night.',
  'Protect hostel property.',
  'Respect others’ privacy.',
  'Follow hostel rules and maintain discipline.',
] as const;

export const accommodationOptions: AccommodationOption[] = [
  // ---------- PASTROL CENTRAL ----------
  {
    id: 'pastrol-central-single',
    title: 'Single room',
    description: 'A simple private room at Alphonsian Pastoral Institute for the complete three-day minimum stay.',
    property: 'Alphonsian Pastoral Institute',
    image: pastrolCentralImage,
    gallery: [pastrolCentralImage, pastrolCentralImage2, pastrolCentralImage3, pastrolCentralImage4, pastrolCentralImage5],
    imagePosition: 'center 55%',
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
    availabilityCapacity: 117,
    ctaLabel: 'Book Room',
  },
  {
    id: 'pastrol-central-double',
    title: 'Double room',
    description: 'A private room for two at Alphonsian Pastoral Institute for the complete three-day minimum stay.',
    property: 'Alphonsian Pastoral Institute',
    image: pastrolCentralImage4,
    gallery: [pastrolCentralImage4, pastrolCentralImage3, pastrolCentralImage2, pastrolCentralImage5, pastrolCentralImage],
    imagePosition: 'center center',
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
    availabilityCapacity: 117,
    ctaLabel: 'Book Room',
  },

  // ---------- OSHANA MOUNT ----------
  {
    id: 'oshana-mount-dormitory',
    title: 'Dormitory',
    description: 'A boys-only dormitory at Hosanna Mount. No mixed accommodation.',
    property: 'Hosanna Mount',
    image: oshanaMountImage2,
    gallery: [oshanaMountImage2, oshanaMountImage, oshanaMountImage3, oshanaMountImage5],
    imagePosition: 'center center',
    priceLabel: '₹180',
    priceCovers: 'per head',
    price: 180,
    priceUnit: 'person',
    roomType: 'shared',
    capacity: '50-bed dormitory',
    occupancyPolicy: 'boys-only',
    busServiceProvided: true,
    refundable: false,
    spotsRemaining: 50,
    availabilityCapacity: 50,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-non-ac-triple',
    title: 'Normal triple room',
    description: 'A normal triple room at Hosanna Mount with separate rooms for boys and girls.',
    property: 'Hosanna Mount',
    image: oshanaMountImage3,
    gallery: [oshanaMountImage3, oshanaMountImage2, oshanaMountImage, oshanaMountImage5],
    imagePosition: 'center 58%',
    priceLabel: '₹840',
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
    availabilityCapacity: 117,
    ctaLabel: 'Book Room',
  },
  {
    id: 'oshana-mount-double',
    title: 'Normal double room',
    description: 'A normal double room at Hosanna Mount with separate rooms for boys and girls.',
    property: 'Hosanna Mount',
    image: oshanaMountImage5,
    gallery: [oshanaMountImage5, oshanaMountImage2, oshanaMountImage, oshanaMountImage3],
    imagePosition: 'center 52%',
    priceLabel: '₹945',
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
    availabilityCapacity: 117,
    ctaLabel: 'Book Room',
  },

  // ---------- MATHRUBHAVAN ----------
  {
    id: 'mathrubhavan-dormitory-bed',
    title: 'Dormitory bed',
    description: 'A bed in the CML Mathrubhavan dormitories for female students only.',
    property: 'CML Mathrubhavan',
    image: mathrubhavanImage,
    gallery: [mathrubhavanImage, mathrubhavanImage2],
    imagePosition: 'center center',
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
    availabilityCapacity: 120,
    ctaLabel: 'Book Room',
  },
];
