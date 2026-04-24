export type ContentCategory =
  | 'book'
  | 'paper'
  | 'podcast'
  | 'youtube'
  | 'music'
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
    id: 'rust-book',
    title: 'The Rust Programming Language',
    creator: 'Steve Klabnik & Carol Nichols',
    note: 'Working through this to get a real handle on systems programming. The ownership model takes some adjusting to, but the way it forces you to think about memory makes you a sharper programmer in any language.',
    category: 'book',
    emoji: '📘',
    link: 'https://rust-book.cs.brown.edu/',
    section: 'into',
  },
  {
    id: 'unreasonable-hospitality',
    title: 'Unreasonable Hospitality',
    creator: 'Will Guidara',
    note: 'A friend pointed me to this one, and the premise pulled me in immediately — what does it actually look like to go above and beyond for the people you care about? Excited to explore that question through Guidara\'s lens.',
    category: 'book',
    emoji: '📕',
    link: 'https://www.unreasonablehospitality.com',
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
    id: 'sadhguru-podcast',
    title: 'Sadhguru Podcast',
    creator: 'Sadhguru',
    note: 'I practice meditation, and Sadhguru has a way of articulating things that actually land. His insights have a quiet staying power — the kind that surface at the right moments throughout the day.',
    category: 'podcast',
    emoji: '🎙️',
    link: 'https://www.youtube.com/@SadhguruJV',
    section: 'into',
  },
  {
    id: 'mkbhd',
    title: 'Marques Brownlee',
    creator: 'MKBHD',
    note: 'From cars to consumer electronics, MKBHD brings a considered perspective to what\'s happening in tech. Less about specs, more about what products actually mean — and that distinction keeps me coming back.',
    category: 'youtube',
    emoji: '▶️',
    link: 'https://youtube.com/@mkbhd',
    section: 'into',
  },
  {
    id: 'daniel-caesar',
    title: 'Daniel Caesar',
    creator: 'Daniel Caesar',
    note: 'The soundtrack to focused work. His music has an effortless warmth that makes long sessions feel lighter — the kind of album you put on and forget to skip a single track.',
    category: 'music',
    emoji: '🎵',
    link: 'https://open.spotify.com/artist/20wkVLutqVOYrc0kxFs7rA',
    section: 'into',
  },

  // --- What I'm Making ---
  {
    id: 'turtlebot-maze',
    title: 'Maze Navigation on TurtleBot4 with ROS2',
    creator: 'Self',
    note: 'Implementing a custom maze navigation algorithm on a TurtleBot4 — from algorithm design through ROS2 integration and real hardware testing as a part of my Robotics Programming class',
    category: 'project',
    emoji: '🤖',
    inProgress: true,
    section: 'making',
  },
  {
    id: 'rust-project',
    title: 'Rust Project — TBD',
    creator: 'Self',
    note: 'Something is coming here. In the process of coming up with an idea but this is in tandem with going through the Rust book.',
    category: 'project',
    emoji: '🦀',
    inProgress: true,
    section: 'making',
  },
  {
    id: 'paper-to-robot',
    title: 'From Paper to Robot',
    creator: 'Self',
    note: 'A full-cycle deep dive into taking a robotics paper from first read to working implementation, learning through experience.',
    category: 'project',
    emoji: '📐',
    inProgress: true,
    section: 'making',
  },
]
