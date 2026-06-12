export const personalInfo = {
  name: 'Akash Adhikary',
  title: 'Flutter Developer',
  subtitle: 'Junior Software Engineer',
  taglines: [
    'Flutter Developer',
    'Mobile App Engineer',
    'Cross-Platform Developer',
    'Clean Code Advocate',
    'Team Co-Leader',
  ],
  bio: 'Flutter Developer with about two years of real work experience, building and shipping mobile apps that actual users interact with every day. I started as an intern learning the design-to-code workflow, moved through two junior developer roles, and got promoted to Co-Leader of my current dev team along the way.',
  location: 'Dhaka, Bangladesh',
  email: 'akadhikary199901@gmail.com',
  phone: '+880 1708-504027',
  github: 'https://github.com/imAkashAd',
  linkedin: 'https://linkedin.com/in/akash-cse',
  facebook: 'https://facebook.com/ak.a.sh.248009',
  instagram: 'https://instagram.com/im_ak.akash',
  avatar: '/akash-photo.png',
};

export const experiences = [
  {
    id: 1,
    company: 'Join Venture AI',
    role: 'Junior Flutter Developer | Co-Leader, Development Team',
    period: 'Mar 2025 – Present',
    location: 'Mohakhali, Dhaka',
    current: true,
    highlights: [
      'Developed and maintained cross-platform Flutter applications used by real clients, with a strong focus on performance optimization and responsive UI design.',
      'Collaborated closely with UI/UX designers and backend developers to deliver clean, pixel-perfect interfaces aligned with product requirements.',
      'Integrated RESTful APIs and managed application state using GetX, ensuring smooth data flow and a consistent user experience.',
      'Promoted to Co-Leader of the Development Team, coordinating sprint tasks, reviewing code, mentoring junior teammates, and contributing to key technical decisions.',
      'Supported client communication and ensured on-time delivery of project milestones.',
    ],
  },
  {
    id: 2,
    company: 'Softvence Agency',
    role: 'Junior Flutter Developer',
    period: 'Jan 2025 – Mar 2025',
    location: 'Mohakhali, Dhaka',
    current: false,
    highlights: [
      'Assisted senior developers in building Flutter-based mobile applications, contributing to both UI development and feature implementation.',
      'Collaborated on UI/UX implementation, translating Figma designs into functional, responsive Flutter screens.',
      'Gained practical experience in RESTful API integration and debugging cross-platform compatibility issues.',
    ],
  },
  {
    id: 3,
    company: 'Zensoft Lab',
    role: 'Flutter Developer Intern',
    period: 'Nov 2024 – Jan 2025',
    location: 'Kuril, Dhaka',
    current: false,
    highlights: [
      'Converted UI/UX design mockups into fully functional Flutter application screens, learning industry standards for the design-to-code workflow.',
      'Participated actively in team collaboration and agile development practices, contributing to code reviews and daily standups.',
      'Integrated RESTful APIs to connect mobile front-ends with backend services, handling data fetching, error states, and loading flows.',
      'Implemented state management solutions using GetX to maintain clean and efficient app architecture.',
      'Built and released production APK files, gaining hands-on experience with the full mobile app deployment process.',
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: 'Expense Tracker',
    subtitle: 'Personal Finance App',
    description: 'A cross-platform personal finance app enabling users to track income and expenses with an intuitive interface. Features real-time UI updates via GetX state management and is optimized across Android and iOS device sizes.',
    tech: ['Flutter', 'Dart', 'GetX', 'SQLite'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.ar.soft.solutions.expense_tracker',
    githubUrl: 'https://github.com/imAkashAd',
    badge: 'Play Store – Live',
    color: '#58a6ff',
    icon: '💰',
    features: ['Track income & expenses', 'GetX state management', 'Cross-platform (Android & iOS)', 'Real-time UI updates'],
  },
  {
    id: 2,
    title: 'Geography Geyser',
    subtitle: 'Educational Geography App',
    description: 'An interactive mobile learning app featuring geography quizzes and progressive challenges to make education engaging. Integrates Firebase for real-time data management, user progress tracking, and secure authentication.',
    tech: ['Flutter', 'Dart', 'Firebase', 'GetX'],
    liveUrl: 'https://play.google.com/store/apps/details?id=com.geographygeyser.simon',
    githubUrl: 'https://github.com/imAkashAd',
    badge: 'Play Store – Live',
    color: '#3fb950',
    icon: '🌍',
    features: ['Geography quizzes', 'Firebase integration', 'Progress tracking', 'Personalized feedback'],
  },
  {
    id: 3,
    title: 'Everyday Toolkit',
    subtitle: 'Multi-purpose Utility App',
    description: 'A practical toolkit app built with Flutter and Dart, offering a collection of everyday utility tools in one clean, cohesive mobile experience with smooth navigation.',
    tech: ['Flutter', 'Dart', 'GetX'],
    liveUrl: null,
    githubUrl: 'https://github.com/imAkashAd/Everyday-Toolkit',
    badge: 'GitHub',
    color: '#d2a8ff',
    icon: '🧰',
    features: ['Multiple tools', 'Clean UI', 'Smooth navigation', 'GetX state'],
  },
  {
    id: 4,
    title: 'My Portfolio',
    subtitle: 'Personal Website',
    description: 'An earlier iteration of a personal portfolio website showcasing skills, projects, and contact information. Built with web technologies as a static site.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    liveUrl: null,
    githubUrl: 'https://github.com/imAkashAd/My-Portfolio',
    badge: 'GitHub',
    color: '#ffa657',
    icon: '🌐',
    features: ['Responsive design', 'Project showcase', 'Skills section', 'Contact info'],
  },
];

export const skills = {
  primary: [
    { name: 'Flutter', level: 90, color: '#025693' },
    { name: 'Dart', level: 88, color: '#0175C2' },
    { name: 'GetX', level: 85, color: '#58a6ff' },
    { name: 'REST API', level: 82, color: '#3fb950' },
  ],
  secondary: [
    { name: 'Firebase', level: 75, color: '#F5820D' },
    { name: 'Java', level: 70, color: '#ED8B00' },
    { name: 'Python', level: 65, color: '#3670A0' },
    { name: 'C/C++', level: 60, color: '#00599C' },
  ],
  tools: [
    { name: 'Git / GitHub', icon: '⚙️' },
    { name: 'Android Studio', icon: '🤖' },
    { name: 'VS Code', icon: '💻' },
    { name: 'Figma', icon: '🎨' },
    { name: 'Adobe Illustrator', icon: '✏️' },
    { name: 'Adobe Photoshop', icon: '🖼️' },
    { name: 'Postman', icon: '📡' },
    { name: 'Agile / Scrum', icon: '🔄' },
  ],
  soft: ['Team Leadership', 'Code Review', 'Mentoring', 'Client Communication', 'Sprint Planning', 'Adaptability'],
};

export const education = [
  {
    id: 1,
    institution: 'Green University of Bangladesh',
    degree: 'Bachelor of Science in Computer Science and Engineering',
    period: 'Sept 2021 – Sept 2025',
    location: 'Dhaka, Bangladesh',
    current: true,
  },
];

export const certifications = [
  {
    id: 1,
    title: 'Flutter Masterclass - Complete Guide to App Development',
    issuer: 'Udemy',
    description: 'Covered advanced Flutter concepts, state management, and app deployment.',
    icon: '📜',
  },
  {
    id: 2,
    title: 'Certificate of Membership - Executive Branch',
    issuer: 'Green University Computer Club (GUCC)',
    description: 'Demonstrating leadership and active participation in the tech community.',
    icon: '🏅',
  },
];

export const stats = [
  { label: 'Years Experience', value: '2+', suffix: '' },
  { label: 'Apps Shipped', value: '10+', suffix: '' },
  { label: 'GitHub Repos', value: '11', suffix: '' },
  { label: 'Companies', value: '3', suffix: '' },
];

export const navLinks = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];