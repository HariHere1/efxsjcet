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
  ruleHighlights?: string[];
  ruleBadges?: string[];
  rulesSource?: string;
  contact: string;
};

const detailsToBeConfirmed = 'Mock details — organiser confirmation required';
const elevatorPitchRulesPdf = new URL(
  '../rulebooks/AY26-27 ASME Elevator Pitch Competition Rules FINAL - August 3 2026 (1).pdf',
  import.meta.url
).href;
const ehpvcRulesPdf = new URL('../rulebooks/AY26-27 ASME eHPVC Rules FINAL_August 2026.pdf', import.meta.url).href;
const sdcRulesPdf = new URL('../rulebooks/CY27 ASME SDC Rules FINAL_August 2026.pdf', import.meta.url).href;
const technicalPresentationRulesPdf = new URL(
  '../rulebooks/AY26-27 ASME Technical Presentation Competition Rules_FINAL_ August 3 2026 (1).pdf',
  import.meta.url
).href;

export const events: Event[] = [
  {
    id: 'e-hpvc',
    name: 'e-HPVC',
    category: 'Competition',
    plainEnglishLine: 'Design, build, and race a human-powered vehicle through a full engineering challenge.',
    whoItsFor: 'Teams from any college or university worldwide, including community colleges.',
    teamSize: 'Team',
    eligibility:
      'All team members must be students at their institution. The captain must be enrolled in engineering. Current students and those who graduated no earlier than one year before the competition may participate.',
    fee: 'Any e-HPVC fee is published by the local EFx event.',
    days: ['day1', 'day2', 'day3'],
    slots: [
      { day: 'day1', time: '10:00 AM – 1:30 PM', title: 'e-HPVC Design Presentation' },
      { day: 'day2', time: '9:00 AM – 12:00 PM', title: 'Brake Testing' },
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Drag Race' },
      { day: 'day3', time: '9:30 AM – 12:00 PM', title: 'Endurance Race' },
    ],
    rulesLink: ehpvcRulesPdf,
    ruleBadges: ['Team challenge', 'Vehicle design', 'Day 1–3'],
    ruleHighlights: [
      'Teams may enter from any college or university worldwide, including community colleges.',
      'Every team member must be enrolled at the represented college;',
      'Complete local EFx and e-HPVC registration at least 60 days before the competition.',
      'Each competitor may register and compete on only one team.',
      'Vehicles are evaluated through design, safety, drag, and endurance elements of the challenge.',
    ],
    rulesSource: 'Official ASME AY26–27 e-HPVC rules · August 2026',
    contact: 'efests@asme.org',
  },
  {
    id: 'student-design-competition',
    name: 'Student Design Competition',
    category: 'Competition',
    plainEnglishLine: 'Compete as an engineering team across five disciplines in the ASME Engineering Games.',
    whoItsFor: 'Undergraduate engineering students who are current ASME Student Members.',
    teamSize: 'Any number of members',
    eligibility:
      'Every team member must be an undergraduate engineering student and a current ASME Student Member. Community-college and associate-degree students who have not completed undergraduate coursework are eligible.',
    fee: 'Local EFx registration fee applies.',
    days: ['day1', 'day2', 'day3'],
    slots: [
      { day: 'day1', time: '3:30 PM – 6:00 PM', title: 'Student Design Competition' },
      { day: 'day2', time: '9:00 AM – 12:00 PM', title: 'Student Design Competition (session 1)' },
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Student Design Competition (session 2)' },
      { day: 'day3', time: '9:00 AM – 12:00 PM', title: 'Student Design Competition (final)' },
    ],
    rulesLink: sdcRulesPdf,
    ruleBadges: ['Team challenge', '5 disciplines', 'Day 1–3'],
    ruleHighlights: [
      'Teams compete across five disciplines on one ASME Engineering Games platform.',
      'A team may have any number of members.',
      'Every member must be an undergraduate engineering student and current ASME Student Member.',
      'Community-college and associate-degree students remain eligible until undergraduate coursework is complete.',
      'Officials’ decisions and the official competition rules govern each run and result.',
    ],
    rulesSource: 'Official ASME CY2027 Student Design Competition rules · Version 1.0',
    contact: 'efests@asme.org',
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
    plainEnglishLine: 'Deliver a live, individual pitch that makes an idea valuable in 90 seconds or less.',
    whoItsFor: 'Engineering undergraduate or graduate students, including community college students.',
    teamSize: 'Individual',
    eligibility:
      'Full-time or part-time engineering students may compete. Engineering bachelor’s or associate degree graduates remain eligible for six months after graduation. Competitors must be registered for this ASME EFx event.',
    fee: 'No separate Elevator Pitch competition fee; the host EFx event registration fee applies.',
    days: ['day1'],
    slots: [
      { day: 'day1', time: '3:30 PM – 6:00 PM', title: 'Elevator Pitch Competition' },
    ],
    rulesLink: elevatorPitchRulesPdf,
    ruleBadges: ['90 sec', 'Individual', 'Day 1'],
    ruleHighlights: [
      'State your name, year of study, and college or university before starting.',
      'Present live in English or the host university’s designated local language.',
      'Do not use PowerPoint, digital media, props, notes, or cell phones.',
      'Questions and answers are not permitted.',
      'A pitch over 90 seconds receives a 20% score deduction.',
      'Judging covers introduction and pitch, challenge statement and content, grammar and clarity, presentation style, and timing.',
    ],
    rulesSource: 'Official ASME AY26–27 rules · Revised August 3, 2026',
    contact: 'efests@asme.org',
  },
  {
    id: 'technical-presentation',
    name: 'Technical Presentation',
    category: 'Presentation',
    plainEnglishLine: 'Present an engineering topic clearly, then defend your ideas in a focused Q&A.',
    whoItsFor: 'Undergraduate engineering students who are current ASME Student Members.',
    teamSize: 'Individual',
    eligibility:
      'The contestant must be an undergraduate engineering student who has not yet received a bachelor’s or equivalent engineering degree and is an ASME Student Member in good standing.',
    fee: 'No separate competition fee; local ASME EFx registration is required.',
    days: ['day2'],
    slots: [
      { day: 'day2', time: '1:00 PM – 6:00 PM', title: 'Technical Presentation' },
    ],
    rulesLink: technicalPresentationRulesPdf,
    ruleBadges: ['12 min + Q&A', 'Individual', 'Day 2'],
    ruleHighlights: [
      'Each competitor has up to 19 minutes: a 12-minute presentation followed by 7 minutes of Q&A.',
      'The presentation must be an individual effort, even when it covers a group project.',
      'Topics must address a technical, economic, environmental, or other engineering theme.',
      'Visual aids are encouraged; embedded video may total no more than two minutes and cannot use recorded sound.',
      'Advance registration is required and the presentation title must be provided.',
    ],
    rulesSource: 'Official ASME AY26–27 rules · Revised August 3, 2026',
    contact: 'efests@asme.org',
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
