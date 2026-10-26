export type Day = 'day0' | 'day1' | 'day2' | 'day3';

export type ScheduleItem = {
  time: string;
  title: string;
  place: string;
  tag: string;
};

export const schedule: Record<Day, ScheduleItem[]> = {
  day0: [
    { time: '9:00 AM – 10:00 AM', title: 'Check-ins', place: 'TBA', tag: 'CHECK-INS' },
    { time: '10:00 AM – 6:00 PM', title: 'Ideathon', place: 'TBA', tag: 'IDEATHON' },
  ],
  day1: [
    { time: '9:00 AM – 12:00 PM', title: 'Check-ins', place: 'TBA', tag: 'CHECK-INS' },
    { time: '10:00 AM – 1:30 PM', title: 'e-HPVC', place: 'TBA', tag: 'E-HPVC' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 1:30 PM', title: 'Check-ins', place: 'TBA', tag: 'CHECK-INS' },
    { time: '1:30 PM – 3:30 PM', title: 'Inauguration Ceremony', place: 'TBA', tag: 'CEREMONY' },
    { time: '3:30 PM – 6:00 PM', title: 'Student Design Competition', place: 'TBA', tag: 'SDC' },
    { time: '3:30 PM – 6:00 PM', title: 'ASME Elevator Pitch Competition', place: 'TBA', tag: 'ELEVATOR PITCH' },
    { time: '4:00 PM – 4:30 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '6:00 PM – 7:30 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '7:30 PM – 8:00 PM', title: 'Help Desk', place: 'TBA', tag: 'TRANSPORT' },
  ],
  day2: [
    { time: '8:00 AM – 9:00 AM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '9:00 AM – 12:00 PM', title: 'e-HPVC', place: 'TBA', tag: 'E-HPVC' },
    { time: '9:00 AM – 12:00 PM', title: 'Student Design Competition', place: 'TBA', tag: 'SDC' },
    { time: '9:00 AM – 12:00 PM', title: 'IAM3D Challenge', place: 'TBA', tag: 'IAM3D' },
    { time: '10:00 AM – 12:00 PM', title: 'Impromptu Events', place: 'TBA', tag: 'IMPROMPTU EVENTS' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 6:00 PM', title: 'e-HPVC', place: 'TBA', tag: 'E-HPVC' },
    { time: '1:00 PM – 6:00 PM', title: 'Student Design Competition', place: 'TBA', tag: 'SDC' },
    { time: '1:00 PM – 6:00 PM', title: 'IAM3D Challenge', place: 'TBA', tag: 'IAM3D' },
    { time: '1:00 PM – 6:00 PM', title: 'Technical Paper Presentation', place: 'TBA', tag: 'PAPER PRESENTATION' },
    { time: '1:00 PM – 5:00 PM', title: 'Impromptu Events', place: 'TBA', tag: 'IMPROMPTU EVENTS' },
    { time: '4:00 PM – 4:30 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '6:00 PM – 8:00 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '8:00 PM', title: 'Help Desk', place: 'TBA', tag: 'TRANSPORT' },
  ],
  day3: [
    { time: '8:00 AM – 9:00 AM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '9:00 AM – 12:00 PM', title: 'Student Design Competition', place: 'TBA', tag: 'SDC' },
    { time: '9:00 AM – 12:00 PM', title: 'IAM3D Challenge', place: 'TBA', tag: 'IAM3D' },
    { time: '9:30 AM – 12:00 PM', title: 'e-HPVC', place: 'TBA', tag: 'E-HPVC' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'TBA', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 3:00 PM', title: 'Help Desk', place: 'TBA', tag: 'EVALUATIONS' },
    { time: '3:00 PM – 5:30 PM', title: 'Help Desk', place: 'TBA', tag: 'CEREMONY' },
  ],
};