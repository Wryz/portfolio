import type { CareerMode } from './CareerContext';

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

interface ProjectLink {
  label: string;
  href: string;
}

export interface MediaItem {
  type: 'video' | 'image';
  src: string;
  thumbnail?: string;
  alt: string;
}

export interface Project {
  title: string;
  subtitle: string;
  image: string;
  tags: string[];
  description: string[];
  links: ProjectLink[];
  tiktokEmbed?: string;
  media: MediaItem[];
}

interface CareerContent {
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
}

export const careerData: Record<CareerMode, CareerContent> = {
  software: {
    skills: [
      {
        title: 'Languages',
        skills: ['Java', 'Kotlin', 'TypeScript', 'Python', 'SQL', 'HTML/CSS'],
      },
      {
        title: 'Frontend',
        skills: ['React', 'React Native', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
      },
      {
        title: 'Backend & Cloud',
        skills: ['Node.js', 'PostgreSQL', 'AWS', 'Docker', 'REST APIs', 'GraphQL'],
      },
      {
        title: 'Tools',
        skills: ['Git', 'Figma', 'Blender', 'Vercel', 'ClickUp'],
      },
    ],
    experience: [
      {
        role: 'Fractional CTO',
        company: 'Stressie',
        period: 'April 2025 - Present',
        description:
          'Head of mobile frontend and tech-lead for the dev team at Stressie, a B2B AI stress management chat app helping employees manage chronic stressors. Currently in active pilot and seed round.',
      },
      {
        role: 'Founder',
        company: 'BuilderFive',
        period: '2024 - Present',
        description:
          'Building a time-based rewards app where users earn money attending local events hosted by businesses. Conducted 200+ custom discovery interviews and created a TikTok vlog with 200k+ total views. Currently in active alpha testing.',
      },
      {
        role: 'Founder / Lead Developer',
        company: 'GoalTac',
        period: 'Oct 2022 - 2024',
        description:
          'Launched a social productivity startup motivating students to overcome procrastination. Led a team of 20 using Agile methodology across development, product management, user testing, and business strategy. Secured the startup\'s first major client, onboarding 300+ users.',
      },
      {
        role: 'Founder / Lead Developer',
        company: 'Siege',
        period: '2020 - 2022',
        description:
          'Created a Minecraft MMORPG server with over 1,000 custom items. Grew to 100,000+ unique players and recruited 60+ team members. Boosted presence via website, Reddit, and Discord — scaling from 200 to 50,000 users.',
      },
    ],
    projects: [
      {
        title: 'Miqo',
        subtitle: 'Voice-commanded embodied AI agent resembling Wall-E',
        image: '/background/austin-skyline.webp',
        tags: ['AI', 'ESP32', 'Bluetooth', 'Embedded'],
        description: [
          'Miqo is a voice-commanded embodied AI agent designed to resemble Wall-E. It runs on an ESP32 microcontroller and connects to a phone via Bluetooth, enabling hands-free voice control and interaction.',
        ],
        links: [],
        media: [
          { type: 'video', src: '/miqo/7eb3684a0b834822a2b6ae2b734ad769.MOV', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/052aa446334841b9b152facffa54a355.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/4073ac29f47047d697efab593b7fef71.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/e78b16c01bdd41d49e61b6471fec62ab.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/4611d3bf6cba45b596c40301a18e12bc.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/39d82a6ef9984651aeee7787c7072b85.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/ee7831d49d914639b29e9dc9eae877e3.mov', alt: 'Miqo demo' },

          { type: 'video', src: '/miqo/25eeb0d1473a405a9fd126a0723a7c2f%202.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/e78b16c01bdd41d49e61b6471fec62ab.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/ee7831d49d914639b29e9dc9eae877e3.mov', alt: 'Miqo demo' },

          { type: 'video', src: '/miqo/3f703f6954f64ef1b3c82a6eb5d41973.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/586b10c8bbba41f397dcd1bf89bdead1.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/13fb6393a41a4b0bad518000f3b6afea.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/e5de3bd1ad37410ca0000ffde1187203.mov', alt: 'Miqo demo' },

          { type: 'video', src: '/miqo/8a3ea956b1244ed890d3df31b3edda40.mov', alt: 'Miqo demo' },
          
          { type: 'video', src: '/miqo/99fa0712c0c84f708f6effc3e0b98169.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/88baf36c4118434d96a67befc5df2ecf.mov', alt: 'Miqo demo' },
          { type: 'video', src: '/miqo/bdcac7a13ccc4f94a1decef5fe6fc2c5.mov', alt: 'Miqo demo' },
          { type: 'image', src: '/miqo/IMG_3764.jpeg', alt: 'Miqo' },
          { type: 'image', src: '/miqo/0C09546D-AB55-4D0B-AD80-FE61D3FF04FD.png', alt: 'Miqo' },
        ],
      },
      {
        title: 'BuilderFive',
        subtitle: 'Time-based rewards app for local events',
        image: '/background/austin-skyline.webp',
        tags: ['React Native', 'Next.js', 'AI', 'Mapbox', 'Three.js'],
        description: [
          'BuilderFive is a time-based rewards app where users earn money by attending local events hosted by businesses. The app incentivizes real-world engagement and helps local businesses drive foot traffic.',
          'Conducted 200+ custom discovery interviews to validate the concept and iterate on the product. Built a TikTok vlog documenting the journey with 200k+ total views.',
          'Currently in active alpha testing with a growing waitlist of businesses and users.',
        ],
        links: [
          { label: 'Learn More', href: '#' },
        ],
        media: [
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'BuilderFive app demo' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'BuilderFive map view' },
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'BuilderFive rewards walkthrough' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'BuilderFive event screen' },
        ],
      },
      {
        title: 'Siege',
        subtitle: 'Minecraft MMORPG with 100k+ players',
        image: '/background/austin-skyline.webp',
        tags: ['Java', 'Game Design', 'Community', '60+ Team'],
        description: [
          'Identified and filled a genre gap, creating a profitable Minecraft MMORPG server in just 2 weeks with nearly 500 eager participants on launch.',
          'Built over 1,000 custom items and grew the server to 100,000+ unique players. Recruited and managed a team of 60+ specialized volunteers.',
          'Gained deep expertise in gaming communities and player psychology while growing the online presence from 200 to 50,000 users through a website, Reddit, and Discord.',
        ],
        links: [
          { label: 'GitHub', href: 'https://github.com/WrysBowl' },
        ],
        media: [
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'Siege gameplay trailer' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Siege custom items showcase' },
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'Siege world tour' },
        ],
      },
      {
        title: 'Brain Benchmark',
        subtitle: 'Brain games to test your mental fitness',
        image: '/background/austin-skyline.webp',
        tags: ['Web', 'Games', 'Cognitive Training'],
        description: [
          'Built in 3 hours, Brain Benchmark is a collection of brain games designed to assess and improve mental fitness. Users can test various cognitive skills through engaging, interactive challenges.',
        ],
        links: [
          { label: 'Website', href: 'https://brain-benchmark.com/' },
          { label: 'GitHub', href: 'https://github.com/Wryz/games' },
        ],
        media: [
          { type: 'video', src: '/brain-benchmark/IMG_3524.MOV', alt: 'Brain Benchmark demo' },
          { type: 'video', src: '/brain-benchmark/IMG_3616.MOV', alt: 'Brain Benchmark demo' },
          { type: 'video', src: '/brain-benchmark/IMG_3617.MOV', alt: 'Brain Benchmark demo' },
          { type: 'image', src: '/brain-benchmark/IMG_3526.jpeg', alt: 'Brain Benchmark' },
          { type: 'image', src: '/brain-benchmark/IMG_3530.JPG', alt: 'Brain Benchmark' },
          { type: 'image', src: '/brain-benchmark/IMG_3531.JPG', alt: 'Brain Benchmark' },
          { type: 'image', src: '/brain-benchmark/IMG_3532.JPG', alt: 'Brain Benchmark' },
          { type: 'image', src: '/brain-benchmark/IMG_3533.JPG', alt: 'Brain Benchmark' },
          { type: 'image', src: '/brain-benchmark/IMG_3534.JPG', alt: 'Brain Benchmark' },
        ],
      },
      {
        title: 'Verses Widget',
        subtitle: 'Schedule Bible verses on your home screen',
        image: '/background/austin-skyline.webp',
        tags: ['React Native', 'iOS', 'Widgets'],
        description: [
          'Built in 2 hours, Verses Widget is a React Native app that lets you schedule Bible verses using iOS app widgets. Display meaningful verses on your home screen with customizable scheduling.',
        ],
        links: [
          { label: 'GitHub', href: 'https://github.com/Wryz/bible-modules' },
        ],
        media: [
          { type: 'video', src: '/verses_widget/5f579840bcb34d9aabc80de74ad69c25.mov', alt: 'Verses Widget demo' },
          { type: 'video', src: '/verses_widget/IMG_4518.MOV', alt: 'Verses Widget demo' },
        ],
      },
    ],
  },
  community: {
    skills: [
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
    ],
    experience: [
      {
        role: 'Founder / Events Organizer',
        company: 'Non-Profit Coworking Group',
        period: '2024 - Present',
        description:
          'Founded a non-profit group in Austin where I plan, advertise, and host coworking events for startup founders. 200+ events hosted for 300+ founders and growing.',
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
    ],
    projects: [
      {
        title: 'Austin Coworking Events',
        subtitle: '200+ events for 300+ startup founders',
        image: '/background/austin-skyline.webp',
        tags: ['Non-Profit', 'Startups', 'Networking', 'Events'],
        description: [
          'Founded a non-profit group dedicated to hosting coworking events for startup founders in Austin. Each event is designed to create a productive, collaborative environment where entrepreneurs can build alongside each other.',
          '200+ events hosted for a growing community of 300+ founders, with programming ranging from focused coworking sessions to casual networking mixers.',
        ],
        links: [],
        media: [
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'Coworking event highlights' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Event venue setup' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Founders networking' },
        ],
      },
      {
        title: 'UConn Minecraft Club',
        subtitle: '600 members — 6th largest club at UConn',
        image: '/background/austin-skyline.webp',
        tags: ['Community', 'Gaming', 'Leadership', '600+ Members'],
        description: [
          'Built UConn\'s Minecraft Club from zero to 600+ members, making it the 6th largest club on campus. Organized bi-weekly events every semester and secured funding through student campaigns.',
          'Innovated with virtual goods sales to fund server maintenance. Leveraged Reddit, Discord, and partnerships with other UConn groups to fuel growth. Recruited and onboarded a successor to ensure the club\'s continued success.',
        ],
        links: [],
        media: [
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Club event photo' },
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'Minecraft Club showcase' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Club Discord community' },
        ],
      },
      {
        title: 'Siege Gaming Community',
        subtitle: '100k+ players and 60+ team members',
        image: '/background/austin-skyline.webp',
        tags: ['Gaming', 'Community', 'Growth', 'Discord'],
        description: [
          'Built and managed a Minecraft MMORPG community that grew to 100,000+ unique players. Recruited and coordinated a team of 60+ specialized volunteers across development, moderation, and content creation.',
          'Gained deep expertise in online community management, player engagement psychology, and scaling a community from 200 to 50,000 members through strategic use of Discord, Reddit, and a dedicated website.',
        ],
        links: [],
        media: [
          { type: 'video', src: '/projects/placeholder-video.mp4', thumbnail: '/projects/placeholder-thumb.svg', alt: 'Siege community trailer' },
          { type: 'image', src: '/projects/placeholder-image.svg', alt: 'Siege Discord growth chart' },
        ],
      },
    ],
  },
};
