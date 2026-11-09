import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { content } from '../data/content'
import { scrollToTop } from '../lib/scroll'
import { Eyebrow, HeartGlyph, Sparkle, StarField } from './Decor'
import FloatingHearts from './FloatingHearts'
import TeddyBear from './TeddyBear'

const hugHearts = [
  { left: '8%', top: '36%', size: 18, delay: 0, drift: 14, duration: 3.4 },
  { left: '88%', top: '28%', size: 14, delay: 0.7, drift: -12, duration: 3.8 },
  { left: '19%', top: '14%', size: 12, delay: 1.4, drift: -16, duration: 3.2 },
  { left: '77%', top: '9%', size: 20, delay: 2.1, drift: 10, duration: 4 },
  { left: '50%', top: '2%', size: 15, delay: 0.4, drift: 2, duration: 3.6 },
  { left: '5%', top: '63%', size: 12, delay: 2.6, drift: 18, duration: 3.3 },
  { left: '93%', top: '59%', size: 16, delay: 1.1, drift: -18, duration: 3.9 },
  { left: '64%', top: '19%', size: 10, delay: 3, drift: 6, duration: 3.1 },
]

export default function TeddyHug() {
  const reduceMotion = useReducedMotion()
  const stageRef = useRef(null)
  const isInView = useInView(stageRef, { once: true, amount: 0.3 })
  const [step, setStep] = useState(reduceMotion ? 'hugging' : 'idle')
  const { teddy } = content

  useEffect(() => {
    if (!isInView) return undefined
    if (reduceMotion) {
      setStep('hugging')
      return undefined
    }
    const startTimer = window.setTimeout(() => setStep('walking'), 220)
    const hugTimer = window.setTimeout(() => setStep('hugging'), 2880)
    return () => {
      window.clearTimeout(startTimer)
      window.clearTimeout(hugTimer)
    }
  }, [isInView, reduceMotion])

  const hugging = step === 'hugging'
  const walking = step === 'walking'

  const leftBear = {
    idle: { x: '-150%', opacity: 0, rotate: 0, y: 0 },
    walking: {
      x: '-6%',
      opacity: 1,
      rotate: 0,
      y: 0,
      transition: {
        x: { duration: reduceMotion ? 0 : 2.15, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: reduceMotion ? 0 : 0.5 },
      },
    },
    hugging: {
      x: '24%',
      opacity: 1,
      rotate: 9,
      y: -2,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 95, damping: 18 },
    },
  }

  const rightBear = {
    idle: { x: '150%', opacity: 0, rotate: 0, y: 0 },
    walking: {
      x: '6%',
      opacity: 1,
      rotate: 0,
      y: 0,
      transition: {
        x: { duration: reduceMotion ? 0 : 2.15, ease: [0.4, 0, 0.2, 1] },
        opacity: { duration: reduceMotion ? 0 : 0.5 },
      },
    },
    hugging: {
      x: '-24%',
      opacity: 1,
      rotate: -9,
      y: -2,
      transition: reduceMotion
        ? { duration: 0 }
        : { type: 'spring', stiffness: 95, damping: 18 },
    },
  }

  return (
    <section
      id="hug"
      className="section-anchor relative isolate overflow-hidden bg-gradient-to-b from-cream via-blush/50 to-cream py-20 sm:py-28"
      aria-label="The biggest virtual hug"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_20%,rgba(252,228,232,0.95),transparent_58%),radial-gradient(ellipse_at_12%_80%,rgba(247,181,194,0.3),transparent_42%),radial-gradient(ellipse_at_88%_72%,rgba(233,130,153,0.18),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.18] dotted-paper [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_80%)]"
      />
      <FloatingHearts count={12} seed={83} minSize={10} maxSize={24} opacity={0.34} />
      <StarField count={11} className="opacity-60" />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Eyebrow>{teddy.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1] tracking-[-0.02em] text-maroon">
            {teddy.heading}
          </h2>
        </motion.div>

        <div
          ref={stageRef}
          className="relative mx-auto mt-10 h-[21rem] w-full max-w-3xl sm:mt-12 sm:h-[24rem]"
        >
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[19rem] w-[19rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-rose/15 bg-paper/25 sm:h-[22rem] sm:w-[22rem]"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 h-[15rem] w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-rose/10 sm:h-[18rem] sm:w-[18rem]"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-6 left-1/2 h-8 w-[65%] -translate-x-1/2 rounded-[50%] bg-maroon/10 blur-xl"
          />
          <motion.div
            aria-hidden="true"
            animate={{ opacity: hugging ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0 : 1.2 }}
            className="glow-blob left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-softpink/50 sm:h-80 sm:w-80"
          />

          <div className="absolute inset-x-0 bottom-5 flex justify-center">
            <div
              className={`relative h-[190px] w-[280px] sm:h-[280px] sm:w-[430px] ${
                hugging && !reduceMotion ? 'css-hug-rock' : ''
              }`}
            >
              <div
                className={`relative h-full w-full ${
                  hugging && !reduceMotion ? 'css-hug-breathe' : ''
                }`}
              >
                <motion.div
                  initial={false}
                  animate={leftBear[step]}
                  className="absolute bottom-0 left-0 z-20 w-[47%]"
                >
                  <div className={walking && !reduceMotion ? 'css-walk' : ''}>
                    <TeddyBear
                      variant="cream"
                      mood={hugging ? 'hugging' : 'walking'}
                      hugSide="left"
                      className="w-full drop-shadow-[0_20px_26px_rgba(72,29,43,0.16)]"
                    />
                  </div>
                </motion.div>

                <motion.div
                  initial={false}
                  animate={rightBear[step]}
                  className="absolute bottom-0 right-0 z-10 w-[47%]"
                >
                  <div
                    className={walking && !reduceMotion ? 'css-walk' : ''}
                    style={{ '--delay': '0.3s' }}
                  >
                    <TeddyBear
                      variant="chocolate"
                      mood={hugging ? 'hugging' : 'walking'}
                      hugSide="right"
                      className="w-full drop-shadow-[0_20px_26px_rgba(72,29,43,0.2)]"
                    />
                  </div>
                </motion.div>

                {hugging && (
                  <>
                    <HeartGlyph className="css-heartbeat absolute left-1/2 top-[18%] z-30 h-7 w-7 -translate-x-1/2 text-rose heart-shadow sm:h-8 sm:w-8" />
                    {hugHearts.map((heart, index) => (
                      <HeartGlyph
                        key={index}
                        className="hug-heart z-30"
                        style={{
                          left: heart.left,
                          top: heart.top,
                          width: heart.size,
                          height: heart.size,
                          color: index % 2 === 0 ? '#E98299' : '#D4637D',
                          '--drift': `${heart.drift}px`,
                          '--duration': `${heart.duration}s`,
                          '--delay': `${heart.delay}s`,
                        }}
                      />
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <Sparkle
            className={`css-twinkle absolute left-[16%] top-[22%] h-4 w-4 text-rose/70 transition-opacity duration-1000 ${
              hugging ? 'opacity-100' : 'opacity-0'
            }`}
          />
          <Sparkle
            className={`css-twinkle absolute right-[17%] top-[30%] h-3 w-3 text-maroon/30 transition-opacity duration-1000 ${
              hugging ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ '--delay': '1.2s' }}
          />
          <Sparkle
            className={`css-twinkle absolute bottom-[22%] left-[25%] h-2.5 w-2.5 text-softpink transition-opacity duration-1000 ${
              hugging ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ '--delay': '0.6s' }}
          />
        </div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, delay: reduceMotion ? 0 : 0.2 }}
          className="relative z-10 mt-2 text-center"
        >
          <p className="font-hand text-[1.7rem] leading-snug text-maroon/70 sm:text-[2.1rem]">
            {teddy.text}
          </p>

          <motion.p
            initial={false}
            animate={
              hugging
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 10 }
            }
            transition={{ duration: reduceMotion ? 0 : 0.9, delay: reduceMotion ? 0 : 0.3 }}
            className="mx-auto mt-4 max-w-2xl text-balance font-serif text-[clamp(2.1rem,5.4vw,3.6rem)] font-semibold italic leading-tight text-gradient-rose"
          >
            {teddy.final}
          </motion.p>

          <button
            type="button"
            onClick={scrollToTop}
            className="mt-7 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-rose/20 bg-paper/60 px-5 py-2 text-[0.62rem] uppercase tracking-[0.28em] text-ink/45 backdrop-blur-sm transition hover:border-rose/40 hover:bg-paper hover:text-rose-deep"
          >
            <ArrowUp className="h-3.5 w-3.5" />
            {teddy.backToTop}
          </button>
        </motion.div>
      </div>
    </section>
  )
}
