export type Day = 'day1' | 'day2' | 'day3';

export type ScheduleItem = {
  time: string;
  title: string;
  place: string;
  tag: string;
};

export const schedule: Record<Day, ScheduleItem[]> = {
  day1: [
    { time: '09:00', title: 'Doors open + welcome coffee', place: 'Central Courtyard', tag: 'ALL' },
    { time: '10:30', title: 'Opening ceremony', place: "St. Joseph's Auditorium", tag: 'MAIN' },
    { time: '13:00', title: 'Design Challenge: round one', place: 'Innovation Block', tag: 'TEAMS' },
    { time: '18:30', title: 'Welcome to Kerala', place: 'Open-air amphitheatre', tag: 'ALL' },
  ],
  day2: [
    { time: '09:30', title: 'Make Lab: rapid prototyping', place: 'Mechanical Workshop', tag: 'LAB' },
    { time: '12:30', title: 'Lunch + chapter meetups', place: 'Student Commons', tag: 'ALL' },
    { time: '15:00', title: 'Future Forum: beyond the blueprint', place: "St. Joseph's Auditorium", tag: 'MAIN' },
  ],
  day3: [
    { time: '10:00', title: 'Design Challenge: final showcase', place: 'Central Courtyard', tag: 'TEAMS' },
    { time: '14:00', title: 'Awards + closing ceremony', place: "St. Joseph's Auditorium", tag: 'ALL' },
  ],
};
