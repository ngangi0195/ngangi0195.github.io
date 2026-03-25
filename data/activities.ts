export interface Activity {
  title: string
  role: string
  date: string
  description: string
  highlights?: string[]
  tags?: string[]
  link?: string
  linkLabel?: string
  logo?: string
}

export const activities: Activity[] = [
  {
    title: 'Project LIFT',
    role: 'Co-Founder & President',
    date: 'May 2025 – Present',
    description: 'Helping small businesses grow and optimize with custom technology.',
    highlights: [
      'Co-founded a student tech consulting club at UMD, leading 40+ members to deliver $10K+ in digital transformation value across 5+ small business clients.',
    ],
    logo: '/project-lift-logo.png',
    link: 'https://www.projectliftumd.com/',
    tags: ['Leadership', 'Full-Stack', 'Consulting'],
  },
  {
    title: 'Alpha Kappa Psi',
    role: 'VP of Professional Development',
    date: 'Apr 2025 – Present',
    description: 'Premier professional co-ed, interdisciplinary business fraternity.',
    highlights: [
      'Spearheaded professional development and corporate outreach for 90+ members, building recruiting pipelines with Fortune 500 companies to drive chapter-wide career opportunities.',
    ],
    logo: '/akpsi-logo.png',
    link: 'https://www.instagram.com/akpsiot/',
    tags: ['Leadership', 'Professional Development'],
  },
  {
    title: 'University of Maryland — Honors College',
    role: 'B.S. Computer Science',
    date: 'Aug 2023 – Present',
    description:
      'Pursuing B.S. Computer Science with minors in Robotics and Entrepreneurship. Coursework spans Algorithms, Computer Systems, Computer Vision, Linear Algebra, Data Science, and Introduction to Robotics.',
    highlights: [
      'Minors: Robotics & Entrepreneurship',
      'Relevant: Algorithms, Computer Vision, Data Science',
      'Relevant: Computer Systems, Intro to Robotics',
    ],
    tags: ['Robotics', 'CS', 'Entrepreneurship'],
  },
  {
    title: 'RAAS Lab — UMD',
    role: 'Undergraduate Researcher',
    date: 'Oct 2025 – Present',
    description:
      'Working at the intersection of robot learning and human-robot interaction, adapting state-of-the-art inference-time policy steering methods to physical manipulation tasks.',
    highlights: [
      'Adapting ITPS framework (MIT CSAIL) to UR3 arm',
      'All 4 steering methods validated in 2D simulation',
      'Extended support to CPU + CUDA execution',
      'Block-stacking task in MuJoCo — ongoing',
    ],
    tags: ['Research', 'Robotics', 'ML'],
  },
]
