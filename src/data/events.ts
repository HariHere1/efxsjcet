import type { Day } from './schedule';

export type EventCategory =
  | 'Competition'
  | 'Challenge'
  | 'Presentation'
  | 'Ideathon'
  | 'Impromptu Events';

export type EventSlot = {
  day: Day;
  time: string;
  title: string;
};

export type Event = {
  id: string;
  name: string;
  category: EventCategory;
  plainEnglishLine: string;
  whoItsFor: string;
  teamSize: string;
  eligibility: string;
  fee: string;
  days: Day[];
  slots: EventSlot[];
  rulesLink: string;
  contact: string;
};

const detailsToBeConfirmed = 'Mock details — organiser confirmation required';

export const events: Event[] = [
  {
    id: 'e-hpvc',
    name: 'e-HPVC',
    category: 'Competition',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day1', 'day2', 'day3'],
    slots: [
      { day: 'day1', time: '10:00 AM – 1:30 PM', title: 'e-HPVC Design Presentation' },
      { day: 'day2', time: '9:00 AM – 12:00 PM', title: 'Brake Testing' },
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Drag Race' },
      { day: 'day3', time: '9:30 AM – 12:00 PM', title: 'Endurance Race' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'student-design-competition',
    name: 'Student Design Competition',
    category: 'Competition',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day1', 'day2', 'day3'],
    slots: [
      { day: 'day1', time: '3:30 PM – 6:00 PM', title: 'Student Design Competition' },
      { day: 'day2', time: '9:00 AM – 12:00 PM', title: 'Student Design Competition (session 1)' },
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Student Design Competition (session 2)' },
      { day: 'day3', time: '9:00 AM – 12:00 PM', title: 'Student Design Competition (final)' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'iam3d-challenge',
    name: 'IAM3D Challenge',
    category: 'Challenge',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day2', 'day3'],
    slots: [
      { day: 'day2', time: '9:00 AM – 12:00 PM', title: 'I AM 3D (session 1)' },
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'I AM 3D (session 2)' },
      { day: 'day3', time: '9:00 AM – 12:00 PM', title: 'I AM 3D (final)' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'asme-elevator-pitch',
    name: 'ASME Elevator Pitch Competition',
    category: 'Competition',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day1'],
    slots: [
      { day: 'day1', time: '3:30 PM – 6:00 PM', title: 'Elevator Pitch Competition' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'technical-paper-presentation',
    name: 'Technical Paper Presentation',
    category: 'Presentation',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day2'],
    slots: [
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Technical Presentation' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'ideathon',
    name: 'Ideathon',
    category: 'Ideathon',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day0'],
    slots: [
      { day: 'day0', time: '10:00 AM – 6:00 PM', title: 'Ideathon (full day)' },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'women-in-engineering',
    name: 'Women in Engineering',
    category: 'Challenge',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: [],
    slots: [],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
  {
    id: 'impromptu-events',
    name: 'Impromptu Events',
    category: 'Impromptu Events',
    plainEnglishLine: detailsToBeConfirmed,
    whoItsFor: detailsToBeConfirmed,
    teamSize: detailsToBeConfirmed,
    eligibility: detailsToBeConfirmed,
    fee: detailsToBeConfirmed,
    days: ['day2'],
    slots: [
      {
        day: 'day2',
        time: '10:00 AM – 12:00 PM',
        title: 'RC Car Obstacle Racing / Solar Ferry Competition (session 1)',
      },
      {
        day: 'day2',
        time: '1:00 PM – 5:00 PM',
        title: 'RC Car Obstacle Racing / Solar Ferry Competition (session 2)',
      },
    ],
    rulesLink: detailsToBeConfirmed,
    contact: detailsToBeConfirmed,
  },
];
