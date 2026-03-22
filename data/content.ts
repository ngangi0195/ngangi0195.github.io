export type ContentCategory =
  | 'book'
  | 'paper'
  | 'podcast'
  | 'youtube'
  | 'course'
  | 'video'
  | 'writeup'
  | 'project'
  | 'post'

export interface ContentItem {
  id: string
  title: string
  creator: string
  note: string
  category: ContentCategory
  thumbnail?: string
  emoji?: string
  link?: string
  inProgress?: boolean
  section: 'into' | 'making'
}

export const contentItems: ContentItem[] = [
  // --- What I'm Into ---
  {
    id: 'prob-robotics',
    title: 'Probabilistic Robotics',
    creator: 'Thrun, Burgard & Fox',
    note: 'The canonical SLAM textbook. Dense but worth every page — the Kalman filter and particle filter chapters alone changed how I think about state estimation.',
    category: 'book',
    emoji: '📘',
    link: 'https://probabilistic-robotics.org',
    section: 'into',
  },
  {
    id: 'attention-is-all',
    title: 'Attention Is All You Need',
    creator: 'Vaswani et al. (2017)',
    note: 'Read this when exploring sequence modeling for robot trajectory prediction. The self-attention mechanism is elegant — and more applicable to robotics than I expected.',
    category: 'paper',
    emoji: '📄',
    link: 'https://arxiv.org/abs/1706.03762',
    section: 'into',
  },
  {
    id: 'nerf-paper',
    title: 'NeRF: Representing Scenes as Neural Radiance Fields',
    creator: 'Mildenhall et al. (2020)',
    note: 'Fascinating approach to scene representation — currently exploring how NeRF-based maps could replace traditional voxel grids in robot navigation.',
    category: 'paper',
    emoji: '📄',
    link: 'https://arxiv.org/abs/2003.08934',
    section: 'into',
  },
  {
    id: 'lex-podcast',
    title: 'Lex Fridman Podcast',
    creator: 'Lex Fridman',
    note: 'Long-form interviews with roboticists, AI researchers, and engineers. The episodes with Marc Raibert and Pieter Abbeel are must-listens.',
    category: 'podcast',
    emoji: '🎙️',
    link: 'https://lexfridman.com/podcast',
    section: 'into',
  },
  {
    id: 'computerphile',
    title: 'Computerphile',
    creator: 'Sean Riley et al.',
    note: 'Perfect bite-sized explainers on CS fundamentals — the SLAM, graph theory, and neural network videos are production-quality education.',
    category: 'youtube',
    emoji: '▶️',
    link: 'https://youtube.com/@Computerphile',
    section: 'into',
  },
  {
    id: 'fast-ai',
    title: 'Practical Deep Learning for Coders',
    creator: 'fast.ai / Jeremy Howard',
    note: 'Top-down approach to ML that actually gets you building things fast. Completely changed how I approach model training and transfer learning.',
    category: 'course',
    emoji: '🎓',
    link: 'https://course.fast.ai',
    section: 'into',
  },
  {
    id: 'modern-robotics',
    title: 'Modern Robotics',
    creator: 'Lynch & Park',
    note: 'The go-to reference for kinematics and dynamics. I keep this open whenever I\'m working on manipulation or trajectory planning.',
    category: 'book',
    emoji: '📗',
    section: 'into',
  },
  {
    id: 'software-unseen',
    title: 'Software Engineering at Google',
    creator: 'Winters, Manshreck & Wright',
    note: 'Eye-opening read on how large engineering orgs manage code quality and culture at scale. Shaped my approach to writing maintainable systems.',
    category: 'book',
    emoji: '📙',
    section: 'into',
  },

  // --- What I'm Making ---
  {
    id: 'slam-series',
    title: 'SLAM From Scratch — YouTube Series',
    creator: 'Self',
    note: 'A planned 6-part series implementing EKF-SLAM, Particle Filter SLAM, and Graph-Based SLAM in Python with live visualizations. Filming starts soon.',
    category: 'video',
    emoji: '🎬',
    inProgress: true,
    section: 'making',
  },
  {
    id: 'ros2-nav-guide',
    title: 'The Missing ROS2 Navigation Guide',
    creator: 'Self',
    note: 'A comprehensive write-up filling the gaps in official Nav2 docs — covering costmap tuning, DWB planner parameters, and common failure modes.',
    category: 'writeup',
    emoji: '📝',
    link: '/blog/ros2-navigation-guide',
    inProgress: true,
    section: 'making',
  },
  {
    id: 'llm-planner-proj',
    title: 'LLM Task Planner for Robot Manipulation',
    creator: 'Self',
    note: 'Building a system where GPT-4 decomposes natural language commands into primitive robot actions for a 6-DOF arm. Sharing progress on GitHub.',
    category: 'project',
    emoji: '🤖',
    link: 'https://github.com',
    inProgress: true,
    section: 'making',
  },
  {
    id: 'ekf-blog',
    title: 'EKF-SLAM: A Visual Walkthrough',
    creator: 'Self',
    note: 'Blog post with animated diagrams explaining the predict-update cycle of EKF-SLAM. Aimed at robotics students who found the textbook derivations too dense.',
    category: 'writeup',
    emoji: '✍️',
    link: '/blog/ekf-slam-visual-walkthrough',
    section: 'making',
  },
  {
    id: 'path-planner-vid',
    title: 'A* vs RRT: Which Should You Use?',
    creator: 'Self',
    note: 'Short explainer video comparing grid-based and sampling-based planners with animated visualizations of the search process.',
    category: 'video',
    emoji: '🎥',
    link: 'https://youtube.com',
    section: 'making',
  },
]
