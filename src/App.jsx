import { motion, useScroll, useSpring } from 'framer-motion'
import ApologyLetter from './components/ApologyLetter'
import Footer from './components/Footer'
import Forgiveness from './components/Forgiveness'
import Hero from './components/Hero'
import MusicPlayer from './components/MusicPlayer'
import Promises from './components/Promises'
import SorryCards from './components/SorryCards'
import TeddyHug from './components/TeddyHug'

export default function App() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <div className="relative min-h-screen bg-cream">
      <a
        href="#main-content"
        className="sr-only z-[200] rounded-full bg-maroon px-5 py-3 text-sm font-medium text-cream focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to content
      </a>

      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-softpink via-rose to-maroon"
        style={{ scaleX: progress }}
      />

      <main id="main-content">
        <Hero />
        <ApologyLetter />
        <SorryCards />
        <Promises />
        <Forgiveness />
        <TeddyHug />
      </main>

      <Footer />
      <MusicPlayer />
      <div className="page-grain" aria-hidden="true" />
    </div>
  )
}
