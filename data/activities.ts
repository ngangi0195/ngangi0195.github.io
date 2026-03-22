export interface Activity {
  title: string
  role: string
  date: string
  description: string
  highlights?: string[]
  tags?: string[]
  link?: string
  linkLabel?: string
}

export const activities: Activity[] = [
  {
    title: 'Project Lift',
    role: 'Co-Founder & President',
    date: 'May 2025 – Present',
    description:
      'Co-founded a student tech consulting club at UMD. Delivered customized tools across 5+ small business clients, generating $10K+ in digital transformation value. Mentored 35+ interdisciplinary members in full-stack development and client management.',
    highlights: [
      '$10K+ in digital transformation value delivered',
      '5+ small business clients served end-to-end',
      '35+ interdisciplinary members mentored',
      'Full project lifecycle: requirements → deployment',
    ],
    tags: ['Leadership', 'Full-Stack', 'Consulting'],
  },
  {
    title: 'Alpha Kappa Psi',
    role: 'VP of Professional Development',
    date: 'Apr 2025 – Present',
    description:
      'Spearheaded professional development initiatives and corporate outreach for 90+ members. Fostered relationships with Fortune 500 companies to drive recruitment pipelines and career opportunities.',
    highlights: [
      'Managed professional dev programs for 90+ members',
      'Established Fortune 500 recruiting pipelines',
      'Organized workshops, speaker series & networking events',
    ],
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
