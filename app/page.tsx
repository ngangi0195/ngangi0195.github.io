import { CustomCursor } from '@/components/layout/CustomCursor'
import { Navbar }       from '@/components/layout/Navbar'
import { Footer }       from '@/components/layout/Footer'
import { Hero }         from '@/components/home/Hero'
import { Experience }   from '@/components/home/Experience'
import { Projects }     from '@/components/home/Projects'
import { Activities }   from '@/components/home/Activities'

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Experience />
        <Projects />
        <Activities />
      </main>
      <Footer />
    </>
  )
}
