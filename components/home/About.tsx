'use client'

import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Tag } from '@/components/ui/Tag'
import { Cpu, Brain, Layers, Terminal, Target } from 'lucide-react'

const skills = [
  // Languages
  { label: 'Python', level: 95 },
  { label: 'C++', level: 82 },
  { label: 'TypeScript', level: 78 },
  { label: 'Rust', level: 45 },
  { label: 'MATLAB', level: 65 },
  // Robotics
  { label: 'ROS2', level: 88 },
  { label: 'Nav2', level: 75 },
  { label: 'MoveIt2', level: 60 },
  { label: 'Gazebo', level: 70 },
  // ML/CV
  { label: 'PyTorch', level: 80 },
  { label: 'OpenCV', level: 85 },
  { label: 'YOLO', level: 78 },
  // Tools
  { label: 'Docker', level: 80 },
  { label: 'Linux', level: 90 },
  { label: 'Git', level: 92 },
  { label: 'Next.js', level: 75 },
]

const interests = [
  { icon: Cpu, label: 'Autonomous Systems', desc: 'SLAM, motion planning, state estimation' },
  { icon: Brain, label: 'Machine Learning', desc: 'Perception, imitation learning, LLM applications' },
  { icon: Layers, label: 'Systems Programming', desc: 'Embedded, real-time, low-latency software' },
  { icon: Terminal, label: 'Developer Tools', desc: 'CLIs, dev infra, open-source tooling' },
]

function SkillBar({ label, level }: { label: string; level: number }) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="font-mono-accent text-xs text-secondary group-hover:text-primary transition-colors">
          {label}
        </span>
        <span className="font-mono-accent text-xs text-muted">{level}%</span>
      </div>
      <div className="h-1 rounded-full bg-[var(--bg-surface-2)] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
        />
      </div>
    </div>
  )
}

export function About() {
  return (
    <Section
      id="about"
      label="// about"
      title="What I'm About"
      subtitle="A robotics-obsessed engineer who believes the best software feels invisible."
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left — objectives & interests */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Looking for */}
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5">
            <div className="flex items-center gap-2 mb-3">
              <Target size={16} className="text-blue-400" />
              <h3 className="font-semibold text-primary text-sm">What I&apos;m Looking For</h3>
            </div>
            <p className="text-sm text-secondary leading-7">
              Full-time or internship roles in <span className="text-primary font-medium">robotics software, autonomous systems, or ML infrastructure</span>.
              I want to work on hard problems where the code has to survive contact with the real world —
              whether that&apos;s a robot navigating a warehouse or a perception stack running in adverse weather.
            </p>
            <div className="flex flex-wrap gap-1.5 mt-3">
              <Tag variant="accent">Robotics SWE</Tag>
              <Tag variant="accent">Autonomy</Tag>
              <Tag variant="teal">ML Engineering</Tag>
              <Tag variant="teal">Systems</Tag>
            </div>
          </div>

          {/* Interests */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {interests.map(({ icon: Icon, label, desc }) => (
              <div
                key={label}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-4 hover:border-blue-500/30 hover:bg-[var(--bg-surface-2)] transition-all duration-200"
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={14} className="text-blue-400" />
                  <span className="text-sm font-medium text-primary">{label}</span>
                </div>
                <p className="text-xs text-muted leading-5">{desc}</p>
              </div>
            ))}
          </div>

          {/* Values */}
          <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-5">
            <p className="font-mono-accent text-xs text-purple-400 uppercase tracking-wider mb-2">Values</p>
            <p className="text-sm text-secondary leading-7">
              I care about <span className="text-primary font-medium">correctness over cleverness</span>,
              writing code that the next engineer can understand, and shipping things that actually work
              in production — not just in the lab.
            </p>
          </div>
        </motion.div>

        {/* Right — skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-6"
        >
          <p className="font-mono-accent text-xs text-[var(--accent)] uppercase tracking-wider mb-5">
            Technical Skills
          </p>
          <div className="space-y-3">
            {skills.map((skill, i) => (
              <motion.div
                key={skill.label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
              >
                <SkillBar label={skill.label} level={skill.level} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </Section>
  )
}
