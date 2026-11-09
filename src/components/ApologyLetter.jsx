import { useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { RotateCcw } from 'lucide-react'
import { content } from '../data/content'
import { Eyebrow, HeartGlyph, Sparkle, StarField, WashiTape } from './Decor'
import FloatingHearts from './FloatingHearts'
import Typewriter from './Typewriter'

export default function ApologyLetter() {
  const reduceMotion = useReducedMotion()
  const letterRef = useRef(null)
  const isInView = useInView(letterRef, { once: true, amount: 0.22 })
  const [done, setDone] = useState(false)
  const [runKey, setRunKey] = useState(0)
  const { letter } = content
  const letterText = letter.paragraphs.join('\n\n')

  const replay = () => {
    setDone(false)
    setRunKey((value) => value + 1)
  }

  return (
    <section
      id="letter"
      className="section-anchor relative isolate overflow-hidden bg-cream py-20 sm:py-28"
      aria-label="A letter from my heart"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(252,228,232,0.9),transparent_55%),radial-gradient(ellipse_at_8%_70%,rgba(247,181,194,0.3),transparent_40%),radial-gradient(ellipse_at_92%_80%,rgba(233,130,153,0.16),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="glow-blob -right-40 top-16 h-[26rem] w-[26rem] bg-blush/80"
      />
      <div
        aria-hidden="true"
        className="glow-blob -left-32 bottom-8 h-[24rem] w-[24rem] bg-softpink/30"
      />
      <FloatingHearts count={10} seed={19} minSize={10} maxSize={24} opacity={0.35} />
      <StarField count={10} className="opacity-60" />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Eyebrow>{letter.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.5rem,6.4vw,4.4rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-maroon">
            {letter.heading}
          </h2>
        </motion.div>

        <div ref={letterRef} className="relative mx-auto mt-12 max-w-3xl sm:mt-16">
          <div
            aria-hidden="true"
            className="absolute inset-x-4 top-5 h-full rotate-[1.6deg] rounded-[1.8rem] border border-rose/10 bg-blush/70"
          />
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 1.2 }}
            whileInView={{ opacity: 1, y: 0, rotate: -0.35 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: reduceMotion ? 0 : 0.95, ease: [0.22, 1, 0.36, 1] }}
            whileHover={reduceMotion ? undefined : { rotate: 0 }}
            className="paper relative rounded-[1.8rem] border border-rose/15 px-5 py-8 shadow-soft sm:px-9 sm:py-10 lg:px-12 lg:py-12"
          >
            <WashiTape
              className="-left-5 -top-3"
              color="rgba(233,130,153,0.55)"
              rotate={-38}
              width="5.5rem"
            />
            <WashiTape
              className="-right-5 -top-3"
              color="rgba(247,181,194,0.65)"
              rotate={38}
              width="5.5rem"
            />

            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rose/15 pb-5">
              <div>
                <p className="font-hand text-[1.8rem] leading-none text-maroon">
                  {letter.salutation}
                </p>
                <p className="mt-2 text-[0.58rem] uppercase tracking-[0.3em] text-ink/35">
                  {letter.date}
                </p>
              </div>
              <div className="relative grid h-[4.2rem] w-[3.5rem] place-items-center rounded-[3px] border border-dashed border-maroon/30 bg-cream/80 p-1 text-center shadow-sm">
                <div>
                  <HeartGlyph className="mx-auto h-3.5 w-3.5 text-rose" />
                  <span className="mt-1 block font-hand text-[0.65rem] leading-none text-maroon/65">
                    {letter.stamp}
                  </span>
                  <span className="mt-1 block text-[0.34rem] uppercase tracking-[0.2em] text-ink/35">
                    forever
                  </span>
                </div>
              </div>
            </div>

            <div className="relative mt-5 min-h-[14rem] sm:min-h-[12rem]">
              <div className="sr-only">
                {letterText}
              </div>
              <div className="letter-type ruled-paper bg-bottom pb-2 pl-1 text-maroon/85" aria-hidden="true">
                <Typewriter
                  text={letterText}
                  start={isInView}
                  speed={letter.typingSpeed}
                  charsPerTick={2}
                  runKey={runKey}
                  onComplete={() => setDone(true)}
                  caretClassName="typing-caret"
                />
              </div>
            </div>

            <AnimatePresence>
              {done && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.7 }}
                  className="mt-6 flex flex-wrap items-end justify-between gap-5"
                >
                  <button
                    type="button"
                    onClick={replay}
                    className="group inline-flex items-center gap-2 rounded-full border border-rose/25 bg-blush/40 px-4 py-2 font-hand text-lg text-rose-deep transition hover:border-rose/50 hover:bg-blush/70"
                  >
                    <RotateCcw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180" />
                    {letter.replay}
                  </button>
                  <div className="text-right">
                    <p className="font-hand text-[1.9rem] leading-none text-maroon/80">
                      {letter.signature}
                    </p>
                    <p className="mt-2 font-hand text-base text-ink/40">
                      {letter.postscript}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div
              aria-hidden="true"
              className="absolute -bottom-5 right-8 grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-rose to-rose-deep shadow-[0_14px_28px_-12px_rgba(72,29,43,0.65)] sm:right-12"
            >
              <div className="grid h-[3.3rem] w-[3.3rem] place-items-center rounded-full border border-white/30">
                <HeartGlyph className="h-5 w-5 text-cream" />
              </div>
            </div>
          </motion.div>

          <div className="absolute -right-6 top-[28%] hidden rotate-[8deg] rounded-xl border border-rose/15 bg-paper px-4 py-3 shadow-card lg:block">
            <WashiTape
              className="-top-2 left-1/2 -translate-x-1/2"
              color="rgba(247,181,194,0.7)"
              rotate={4}
              width="3.5rem"
              height="1.1rem"
            />
            <p className="font-hand text-xl text-maroon/65">{letter.sideNote}</p>
            <Sparkle className="absolute -right-2 -top-3 h-4 w-4 text-rose" />
          </div>
        </div>
      </div>
    </section>
  )
}
