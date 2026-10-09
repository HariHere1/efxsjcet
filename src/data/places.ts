import vagamonLake from '../assets/images/vagamon-lake.png';
import illickalKalluImg from '../assets/images/illickal-kallu.png';
import waterfallImg from '../assets/images/waterfall.png';
import ilaveezhapoonchiraImg from '../assets/images/ilaveezhapoonchira.png';
import aruvikkaalImg from '../assets/images/aruvikkachal.png';
import kumarakomImg from '../assets/images/kumarakom.png';
import pineForest from '../assets/images/pine-forest.jpg';

export type Place = { name: string; description: string; image: string };

export const places: Place[] = [
  { name: 'VAGAMON', description: 'Rolling hills & adventure', image: pineForest },
  { name: 'ILLICKAL KALLU', description: 'Mountains & panoramic views', image: illickalKalluImg },
  { name: 'MARMALA WATERFALL', description: 'Hidden waterfall experience', image: waterfallImg },
  { name: 'KUMARAKOM', description: 'Backwaters & bird sanctuary', image: kumarakomImg },
  { name: 'ILAVEEZHAPOONCHIRA', description: 'Hills & open landscapes', image: ilaveezhapoonchiraImg },
  { name: 'POONJAR', description: 'Heritage & history', image: aruvikkaalImg },
  { name: 'VAGAMON LAKE', description: 'Tea gardens & still waters', image: vagamonLake },
];
