export type Day = 'day0' | 'day1' | 'day2' | 'day3';

export type ScheduleItem = {
  time: string;
  title: string;
  place: string;
  tag: string;
};

export const schedule: Record<Day, ScheduleItem[]> = {
  day0: [
    { time: '2:00 PM – 6:00 PM', title: 'Help Desk', place: 'Check-ins', tag: 'CHECK-INS' },
    { time: '10:00 AM – 6:00 PM', title: 'Ideathon', place: 'Ideathon (full day)', tag: 'IDEATHON' },
  ],
  day1: [
    { time: '9:00 AM – 12:00 PM', title: 'Help Desk', place: 'Check-ins', tag: 'CHECK-INS' },
    { time: '10:00 AM – 1:30 PM', title: 'e-HPVC', place: 'e-HPVC Design Presentation', tag: 'E-HPVC' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'Networking Lunch (also listed under Student Design Competition)', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 1:30 PM', title: 'Help Desk', place: 'Check-ins (continues)', tag: 'CHECK-INS' },
    { time: '1:30 PM – 3:30 PM', title: 'Help Desk', place: 'Inauguration Ceremony', tag: 'CEREMONY' },
    { time: '3:30 PM – 6:00 PM', title: 'Student Design Competition', place: 'Student Design Competition', tag: 'SDC' },
    { time: '3:30 PM – 6:00 PM', title: 'ASME Elevator Pitch Competition', place: 'Elevator Pitch Competition', tag: 'ELEVATOR PITCH' },
    { time: '4:00 PM – 4:30 PM', title: 'Food & Social', place: 'Tea Break', tag: 'FOOD & SOCIAL' },
    { time: '6:00 PM – 7:30 PM', title: 'Food & Social', place: 'Dinner', tag: 'FOOD & SOCIAL' },
    { time: '7:30 PM – 8:00 PM', title: 'Help Desk', place: 'Buses depart to accommodation', tag: 'TRANSPORT' },
  ],
  day2: [
    { time: '8:00 AM – 9:00 AM', title: 'Food & Social', place: 'Breakfast', tag: 'FOOD & SOCIAL' },
    { time: '9:00 AM – 12:00 PM', title: 'e-HPVC', place: 'Brake Testing', tag: 'E-HPVC' },
    { time: '9:00 AM – 12:00 PM', title: 'Student Design Competition', place: 'Student Design Competition (session 1)', tag: 'SDC' },
    { time: '9:00 AM – 12:00 PM', title: 'IAM3D Challenge', place: 'I AM 3D (session 1)', tag: 'IAM3D' },
    { time: '10:00 AM – 12:00 PM', title: 'Impromptu Events', place: 'RC Car Obstacle Racing / Solar Ferry Competition (session 1)', tag: 'IMPROMPTU EVENTS' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'Networking Lunch', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 6:00 PM', title: 'e-HPVC', place: 'Drag Race', tag: 'E-HPVC' },
    { time: '1:00 PM – 6:00 PM', title: 'Student Design Competition', place: 'Student Design Competition (session 2)', tag: 'SDC' },
    { time: '1:00 PM – 6:00 PM', title: 'IAM3D Challenge', place: 'I AM 3D (session 2)', tag: 'IAM3D' },
    { time: '1:00 PM – 6:00 PM', title: 'Technical Paper Presentation', place: 'Technical Presentation', tag: 'PAPER PRESENTATION' },
    { time: '1:00 PM – 5:00 PM', title: 'Impromptu Events', place: 'RC Car Obstacle Racing / Solar Ferry Competition (session 2)', tag: 'IMPROMPTU EVENTS' },
    { time: '4:00 PM – 4:30 PM', title: 'Food & Social', place: 'Tea Break', tag: 'FOOD & SOCIAL' },
    { time: '6:00 PM – 8:00 PM', title: 'Food & Social', place: 'Entertainment / Concert / Dinner', tag: 'FOOD & SOCIAL' },
    { time: '8:00 PM', title: 'Help Desk', place: 'Buses depart to accommodation', tag: 'TRANSPORT' },
  ],
  day3: [
    { time: '8:00 AM – 9:00 AM', title: 'Food & Social', place: 'Breakfast', tag: 'FOOD & SOCIAL' },
    { time: '9:00 AM – 12:00 PM', title: 'Student Design Competition', place: 'Student Design Competition (final)', tag: 'SDC' },
    { time: '9:00 AM – 12:00 PM', title: 'IAM3D Challenge', place: 'I AM 3D (final)', tag: 'IAM3D' },
    { time: '9:30 AM – 12:00 PM', title: 'e-HPVC', place: 'Endurance Race', tag: 'E-HPVC' },
    { time: '12:00 PM – 1:00 PM', title: 'Food & Social', place: 'Networking Lunch', tag: 'FOOD & SOCIAL' },
    { time: '1:00 PM – 3:00 PM', title: 'Help Desk', place: 'Final Evaluations', tag: 'EVALUATIONS' },
    { time: '3:00 PM – 5:30 PM', title: 'Help Desk', place: 'Closing Ceremony & Prize Distribution', tag: 'CEREMONY' },
  ],
};
