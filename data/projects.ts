export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  tags: string[]
  github?: string
  demo?: string
  image?: string
  featured?: boolean
  status: 'complete' | 'in-progress' | 'archived'
}

export const projects: Project[] = [
  {
    id: 'kato',
    title: 'Kato — Off-Campus Apartment Finder',
    description:
      'An off-campus apartment finder enabling transparent, data-driven housing decisions by scraping real-time pricing and amenities from 18 apartments, attracting 11,000+ visits.',
    longDescription:
      'Launched Kato to solve a real problem at UMD — opaque, scattered off-campus housing info. Built solo: scraped 18 apartment listings in real time with Firecrawl, stored in Supabase/PostgreSQL, surfaced through a Mapbox-powered map UI on Next.js. Deployed on Vercel. 11,000+ visits and counting.',
    tags: ['Next.js', 'Vercel', 'Supabase', 'Mapbox', 'PostgreSQL', 'Firecrawl', 'TypeScript'],
    github: 'https://github.com/ngangi0195',
    demo: 'https://kato.vercel.app',
    featured: true,
    status: 'complete',
  },
  {
    id: 'ur3e-manipulation',
    title: 'UR3e Robotic Arm Manipulation',
    description:
      'A ROS 2 vision-guided control system for a UR3e robotic arm using pose estimation and inverse kinematics to stack objects with 98% accuracy.',
    tags: ['Python', 'ROS 2', 'Ubuntu', 'OpenCV'],
    github: 'https://github.com/ngangi0195',
    status: 'complete',
  },
  {
    id: 'itps-research',
    title: 'ITPS on UR3 — RAAS Lab Research',
    description:
      'Adapting the ITPS framework (MIT CSAIL) to a UR3 robotic arm block-stacking task in MuJoCo, enabling human-guided trajectory steering at inference time without retraining.',
    tags: ['Python', 'MuJoCo', 'CUDA', 'ROS 2'],
    github: 'https://github.com/ngangi0195',
    status: 'in-progress',
  },
  {
    id: 'rag-rfp',
    title: 'RAG RFP Analysis System',
    description:
      'Production-grade RAG pipeline (LlamaIndex + Qdrant + GPT-4) to automate RFP analysis — 75% faster evaluation, 92% retrieval accuracy across 200+ page technical documents.',
    tags: ['Python', 'LlamaIndex', 'Qdrant', 'GPT-4', 'FastAPI'],
    status: 'complete',
  },
  {
    id: 'craving-hour',
    title: 'Craving Hour Halal Platform',
    description:
      'Full-stack web platform built on AWS (React, Node.js, PostgreSQL, RDS, Lambda, CloudFront) — 43% operational efficiency gain across 150+ daily customers.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'TypeScript'],
    demo: 'https://cravinghourhalal.com',
    status: 'complete',
  },
]
