interface SkillCategory {
  title: string;
  skills: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

/** Software and community work in one list, newest first. */
export const experience: Experience[] = [
  {
    role: 'Chief Technology Officer',
    company: 'Stressie',
    period: 'April 2025 - Present',
    description:
      'Head of mobile frontend and tech-lead for the dev team at Stressie, a B2B AI stress management chat app helping employees manage chronic stressors. Currently in active pilot and seed round.',
  },
  {
    role: 'Founder / Events Organizer',
    company: 'Austin Founders Community',
    period: '2024 - Present',
    description:
      'Founded a non-profit group in Austin where I plan, advertise, and host coworking events for startup founders. 300+ events hosted and growing.',
  },
  {
    role: 'Founder & Chief Technology Officer',
    company: 'BuilderFive',
    period: 'Mar 2024 - Oct 2025',
    description:
      'Building a time-based rewards app where users earn money attending local events hosted by businesses. Used Three.js for 3D map and territory visualization. Created a TikTok vlog with 300k+ total views.',
  },
  {
    role: 'Supervisor',
    company: 'One Summer Program, UConn',
    period: 'May 2023 - Aug 2023',
    description:
      'Managing supervisor for 7 assistants, including shift schedules and cross-departmental communication to support residential life and billing for 35 distinct programs. Provided continuous oversight, crisis management, and safety checks for the entire campus.',
  },
  {
    role: 'Founder',
    company: 'GoalTac',
    period: '2022 - Jun 2023',
    description:
      'Launched a social productivity startup motivating students to overcome procrastination. Led a team of 20 using Agile methodology across development, product management, user testing, and business strategy. Secured the startup\'s first major client, onboarding 300+ users.',
  },
  {
    role: 'Founder',
    company: 'UConn Minecraft Club',
    period: 'Feb 2021 - May 2024',
    description:
      'Established the club from inception and grew it to 600+ members, making it the 6th largest at UConn. Spearheaded bi-weekly events, secured student funding, and innovated with virtual goods sales. Recruited a successor to ensure continued growth.',
  },
  {
    role: 'Residential Assistant & Supervisor',
    company: 'UConn Campus Housing',
    period: 'Jan 2021 - May 2024',
    description:
      'Served 3 years as a Residential Assistant and 1 year as a Supervisor. Managed residential life, safety checks, crisis response, and fostered community among hundreds of students.',
  },
  {
    role: 'Founder',
    company: 'Siege',
    period: '2020 - 2022',
    description:
      'Created a Minecraft MMORPG server with over 1,000 custom items. Grew to 100,000+ unique players and recruited 60+ team members. Boosted presence via website, Reddit, and Discord — scaling from 200 to 50,000 users.',
  },
];

export const skills: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Java', 'Kotlin', 'TypeScript', 'Python', 'SQL', 'HTML/CSS'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  },
  {
    title: 'Backend & Cloud',
    skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'GraphQL'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Figma', 'Blender', 'Vercel', 'ClickUp'],
  },
  {
    title: 'Community Building',
    skills: ['Community Strategy', 'Member Engagement', 'Growth & Retention', 'Discord & Reddit'],
  },
  {
    title: 'Event Management',
    skills: ['Event Planning', 'Venue Coordination', 'Speaker Curation', 'Logistics'],
  },
  {
    title: 'Marketing & Outreach',
    skills: ['Social Media', 'Email Campaigns', 'Brand Partnerships', 'Google Analytics'],
  },
  {
    title: 'Leadership',
    skills: ['Team Management', 'Fundraising', 'Sponsorship', 'Public Speaking'],
  },
];
