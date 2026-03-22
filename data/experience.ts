export interface ExperienceEntry {
  role: string
  org: string
  location: string
  startDate: string
  endDate: string | 'Present'
  bullets: string[]
  tags: string[]
  link?: string
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Undergraduate Researcher',
    org: 'Robotics Algorithms & Autonomous Systems Lab (RAAS)',
    location: 'College Park, MD',
    startDate: 'Oct 2025',
    endDate: 'Present',
    bullets: [
      'Porting ITPS (MIT CSAIL) to a UR3 robotic arm in MuJoCo — validating human-guided trajectory steering across all 4 methods on CPU + CUDA without retraining.',
    ],
    tags: ['ROS 2', 'Python', 'MuJoCo', 'CUDA', 'OpenCV'],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Xprotege Institute of Technology and Management',
    location: 'Ellicott City, MD',
    startDate: 'Sep 2025',
    endDate: 'Dec 2025',
    bullets: [
      'Built a production RAG pipeline (LlamaIndex + Qdrant + GPT-4) to automate RFP analysis — 75% faster evaluation at 92% retrieval accuracy.',
      'Engineered adaptive chunking, reranking, and a scoring-integrated prompt framework — +35% context relevance, +40% bid classification accuracy.',
    ],
    tags: ['Python', 'LlamaIndex', 'Qdrant', 'GPT-4', 'RAG'],
  },
  {
    role: 'Software Engineering Intern',
    org: 'Craving Hour Halal',
    location: 'College Park, MD',
    startDate: 'May 2025',
    endDate: 'Sep 2025',
    bullets: [
      'Architected a full-stack platform (React + Node.js + PostgreSQL on AWS) from scratch — 43% operational efficiency gain serving 150+ daily customers.',
      'Shipped REST APIs, an S3 media pipeline, and a full /admin CRUD suite — 40% faster page loads, 30% quicker content turnaround.',
    ],
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
  },
]
