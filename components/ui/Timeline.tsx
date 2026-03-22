'use client'

import { motion } from 'framer-motion'
import { Tag } from './Tag'
import { ExperienceEntry } from '@/data/experience'
import { MapPin, Calendar } from 'lucide-react'

interface TimelineProps {
  items: ExperienceEntry[]
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-2 bottom-2 w-px timeline-line hidden sm:block" />

      <div className="space-y-10">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="relative sm:pl-14"
          >
            {/* Dot */}
            <div className="absolute left-0 top-1.5 w-8 h-8 rounded-lg border-2 border-blue-500/60 bg-[var(--bg)] items-center justify-center hidden sm:flex">
              <div className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
            </div>

            {/* Content card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-surface)] p-5 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                <div>
                  <h3 className="font-semibold text-primary text-base leading-tight">{item.role}</h3>
                  <p className="text-blue-400 font-mono-accent text-sm mt-0.5">{item.org}</p>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                  <span className="font-mono-accent text-xs text-muted flex items-center gap-1">
                    <Calendar size={11} />
                    {item.startDate} — {item.endDate}
                  </span>
                  {item.location && (
                    <span className="font-mono-accent text-xs text-muted flex items-center gap-1">
                      <MapPin size={11} />
                      {item.location}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-2 mb-4">
                {item.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 text-sm text-secondary leading-6">
                    <span className="text-blue-400 mt-1.5 shrink-0">▸</span>
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
