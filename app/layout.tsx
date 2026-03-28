import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import { Providers } from '@/components/layout/Providers'
import { CustomCursor } from '@/components/layout/CustomCursor'
import { Navbar } from '@/components/layout/Navbar'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk', display: 'swap' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: 'Nidhin Gangisetty — Robotics & Software Engineer',
    template: '%s | Nidhin Gangisetty',
  },
  description:
    'CS student at UMD building autonomous systems, AI pipelines, and full-stack products. Undergraduate researcher at RAAS Lab. Co-founder of Project Lift.',
  keywords: ['robotics', 'software engineering', 'ROS2', 'SLAM', 'computer vision', 'machine learning', 'UMD'],
  authors: [{ name: 'Nidhin Gangisetty' }],
  creator: 'Nidhin Gangisetty',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nidhingangisetty.com',
    title: 'Nidhin Gangisetty — Robotics & Software Engineer',
    description: 'CS student at UMD building autonomous systems, AI pipelines, and full-stack products.',
    siteName: 'Nidhin Gangisetty',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nidhin Gangisetty — Robotics & Software Engineer',
    description: 'CS student at UMD building autonomous systems, AI pipelines, and full-stack products.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css" crossOrigin="anonymous" />
      </head>
      <body><CustomCursor /><Providers><Navbar /><div className="page-frame">{children}</div></Providers></body>
    </html>
  )
}
