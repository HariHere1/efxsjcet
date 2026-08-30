export type Competition = {
  id: string;           
  kickerNumber: string; // '01', '02'...
  prefix: string;       // 'event'
  emphasis: string;     // 'secondname'
  lede: string;
  dateLabel: string;    // 'Date'
  briefHeading: string;
  briefText: string;
  facts: { label: string; value: string }[];
  criteria: [string, string, string][];
};

export const competitions: Competition[] = [
  {
    id: 'e-hpvc',
    kickerNumber: '01',
    prefix: 'e-',
    emphasis: 'HPVC',
    lede: 'Apply engineering concepts to design, fabricate, and test efficient human-powered vehicles.',
    dateLabel: '21-24 JAN / PALAI',
    briefHeading: 'Innovate under pressure.',
    briefText:
      "Teams will design, build, and test a sustainable, high-efficiency vehicle that integrates human power and electric-hybrid technology. Research aerodynamics, engineer the chassis, prototype components, and prove your vehicle's viability on the track.",
    facts: [
      { label: 'TEAM SIZE', value: '2—4 makers' },
      { label: 'FORMAT', value: 'Design Presentation & Live Racing' },
      { label: 'LEVEL', value: 'UG Students' },
    ],
    criteria: [
      ['01', 'The idea', 'Is the engineering sound, innovative, and well-documented?'],
      ['02', 'The build', 'Does the vehicle meet strict safety, fabrication, and structural standards?'],
      ['03', 'The Performance', 'Can the vehicle endure the speed, agility, and endurance races on the track?'],
    ],
  },
  {
    id: 'iam-3d',
    kickerNumber: '02',
    prefix: 'IAM-',
    emphasis: '3D',
    lede: 'Design and print innovative 3D models that solve real-world problems.',
    dateLabel: '21-24 JAN / PALAI',
    briefHeading: 'Innovate under pressure.',
    briefText:
      "Design, build, and test a 3D-printed, remote-controlled R.O.V.E.R. for resource excavation.",
    facts: [
      { label: 'TEAM SIZE', value: '2—4 makers' },
      { label: 'FORMAT', value: 'Design Presentation & Live Racing' },
      { label: 'LEVEL', value: 'UG Students' },
    ],
    criteria: [
      ['01', 'The idea', 'How effectively does the design solve the challenge?'],
      ['02', 'The build', 'How intelligently is additive manufacturing used in the final build?'],
      ['03', 'The Performance', 'Does the prototype work and demonstrate its effectiveness?'],
    ],
  },
    {
    id: 'sdc',
    kickerNumber: '03',
    prefix: 'SDC',
    emphasis: 'Future Forum',
    lede: 'Take on a challenging engineering problem and turn your ideas into an innovative, functional design. Apply engineering principles, creativity, and problem-solving to develop a solution that performs under real-world constraints.',
    dateLabel: '21-24 JAN / PALAI',
    briefHeading: 'Innovate under pressure.',
    briefText:
      "Design an innovative solution to a real-world engineering challenge using creativity, technical knowledge, and practical problem-solving.",
    facts: [
      { label: 'TEAM SIZE', value: '2—4 makers' },
      { label: 'FORMAT', value: 'Design Presentation & Live Racing' },
      { label: 'LEVEL', value: 'UG Students' },
    ],
    criteria: [
      ['01', 'The Concept', 'Is the design innovative, practical, and well thought out?'],
      ['02', 'The Engineering', 'Does the solution demonstrate strong engineering principles and technical understanding?'],
      ['03', 'The Performance', 'How effectively does the final design solve the given challenge?'],
    ],
  },
];

export function getCompetitionById(id: string) {
  return competitions.find((c) => c.id === id);
}