import { Project } from '@/types/project';

export const projects: Project[] = [
  {
    id: 'software-project-1',
    title: 'Full-Stack Web Application',
    date: '2024-01-15',
    discipline: 'Software',
    thumbnail: '/next.svg',
    content: {
      paragraphs: [
        'This project showcases a modern full-stack web application built with Next.js and TypeScript. The application features a responsive design, real-time data updates, and seamless user experience.',
        'The backend is powered by a RESTful API that handles complex data operations efficiently. The frontend utilizes React hooks for state management and Tailwind CSS for styling.',
        'Key features include user authentication, data visualization, and API integration. The project demonstrates proficiency in modern web development practices and clean code architecture.'
      ],
      videos: [],
      images: []
    }
  },
  {
    id: 'hardware-project-1',
    title: 'IoT Sensor Network',
    date: '2024-02-20',
    discipline: 'Hardware',
    thumbnail: '/vercel.svg',
    content: {
      paragraphs: [
        'An Internet of Things (IoT) sensor network designed to collect and transmit environmental data in real-time. The system consists of multiple sensor nodes connected wirelessly.',
        'Each node is equipped with temperature, humidity, and motion sensors. Data is collected and transmitted to a central hub using low-power wireless protocols.',
        'The hardware design focuses on energy efficiency and reliability. Custom PCBs were designed and manufactured, incorporating power management systems to ensure long battery life.'
      ],
      videos: [],
      images: []
    }
  },
  {
    id: 'events-project-1',
    title: 'Tech Conference 2024',
    date: '2024-03-10',
    discipline: 'Events',
    thumbnail: '/globe.svg',
    content: {
      paragraphs: [
        'Organized and executed a major technology conference featuring industry leaders and innovators. The event attracted over 500 attendees and featured 20+ speakers.',
        'Responsibilities included venue selection, speaker coordination, marketing campaigns, and on-site event management. The conference covered topics ranging from AI/ML to sustainable technology.',
        'The event was a resounding success, with positive feedback from attendees and sponsors. Post-event analysis showed high engagement rates and valuable networking opportunities for participants.'
      ],
      videos: [],
      images: []
    }
  },
  {
    id: 'software-project-2',
    title: 'Mobile Application Development',
    date: '2024-04-05',
    discipline: 'Software',
    thumbnail: '/window.svg',
    content: {
      paragraphs: [
        'Developed a cross-platform mobile application using React Native. The app provides a seamless experience on both iOS and Android platforms.',
        'The application includes features such as offline mode, push notifications, and secure authentication. Performance optimization was a key focus, resulting in fast load times and smooth animations.',
        'User testing revealed high satisfaction rates, and the app has been downloaded over 10,000 times since launch.'
      ],
      videos: [],
      images: []
    }
  },
  {
    id: 'hardware-project-2',
    title: 'Robotic Arm Controller',
    date: '2024-05-12',
    discipline: 'Hardware',
    thumbnail: '/file.svg',
    content: {
      paragraphs: [
        'Designed and built a precision robotic arm controller with six degrees of freedom. The system uses stepper motors and encoders for accurate positioning.',
        'The controller board features a microcontroller running custom firmware that processes sensor data and executes movement commands. A user interface allows for both manual control and automated sequences.',
        'The project demonstrates expertise in embedded systems, motor control, and mechanical design. Testing showed positioning accuracy within 0.1mm.'
      ],
      videos: [],
      images: []
    }
  },
  {
    id: 'events-project-2',
    title: 'Hackathon Organization',
    date: '2024-06-18',
    discipline: 'Events',
    thumbnail: '/globe.svg',
    content: {
      paragraphs: [
        'Led the organization of a 48-hour hackathon that brought together 200+ developers, designers, and entrepreneurs. The event featured workshops, mentorship sessions, and a competitive coding challenge.',
        'Coordinated with sponsors, secured prizes worth $10,000, and managed logistics including venue setup, catering, and technical infrastructure.',
        'The hackathon resulted in 30+ innovative projects, with winning teams receiving funding and mentorship opportunities. The event strengthened the local tech community and fostered collaboration.'
      ],
      videos: [],
      images: []
    }
  }
];

