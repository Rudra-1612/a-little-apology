import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { content } from '../data/content'
import { scrollToId } from '../lib/scroll'
import useDialogA11y from '../hooks/useDialogA11y'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import { HeartGlyph, Sparkle, WashiTape } from './Decor'
import Typewriter from './Typewriter'

const heartColors = ['#E98299', '#F7B5C2', '#D4637D', '#F3A6B7', '#FFF0E8', '#C9566F']
const confettiColors = ['#E98299', '#F7B5C2', '#FCE4E8', '#FFF0E8', '#D4637D', '#C89B7B', '#8F3D55']

function CelebrationParticles() {
  const particles = useMemo(() => {
    const hearts = Array.from({ length: 90 }, (_, index) => {
      const duration = 9 + Math.random() * 8
      return {
        id: index,
        left: Math.random() * 100,
        size: 10 + Math.random() * 20,
        color: heartColors[index % heartColors.length],
        duration,
        delay: -Math.random() * duration,
        sway: -70 + Math.random() * 140,
        spin: -50 + Math.random() * 100,
        scale: 0.7 + Math.random() * 0.7,
        opacity: 0.35 + Math.random() * 0.55,
      }
    })

    const confetti = Array.from({ length: 80 }, (_, index) => {
      const duration = 4.5 + Math.random() * 5
      return {
        id: index,
        left: Math.random() * 100,
        width: 6 + Math.random() * 6,
        height: 10 + Math.random() * 10,
        color: confettiColors[index % confettiColors.length],
        radius: index % 5 === 0 ? '999px' : '2px',
        drift: -90 + Math.random() * 180,
        spin: 360 + Math.random() * 900,
        duration,
        delay: -Math.random() * duration,
      }
    })

    const sparkles = Array.from({ length: 36 }, (_, index) => {
      const duration = 2.6 + Math.random() * 2.6
      return {
        id: index,
        left: Math.random() * 100,
        top: Math.random() * 90,
        size: 8 + Math.random() * 14,
        color: index % 3 === 0 ? '#FFF0E8' : '#E98299',
        duration,
        delay: -Math.random() * duration,
      }
    })

    return { hearts, confetti, sparkles }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.hearts.map((heart) => (
        <HeartGlyph
          key={`heart-${heart.id}`}
          className="heart-rise"
          style={{
            left: `${heart.left}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            color: heart.color,
            '--duration': `${heart.duration}s`,
            '--delay': `${heart.delay}s`,
            '--sway': `${heart.sway}px`,
            '--spin': `${heart.spin}deg`,
            '--scale': heart.scale,
            '--opacity': heart.opacity,
          }}
        />
      ))}

      {particles.confetti.map((piece) => (
        <span
          key={`confetti-${piece.id}`}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            '--size': `${piece.width}px`,
            '--height': `${piece.height}px`,
            '--color': piece.color,
            '--radius': piece.radius,
            '--drift': `${piece.drift}px`,
            '--spin': `${piece.spin}deg`,
            '--duration': `${piece.duration}s`,
            '--delay': `${piece.delay}s`,
          }}
        />
      ))}

      {particles.sparkles.map((sparkle) => (
        <Sparkle
          key={`sparkle-${sparkle.id}`}
          className="sparkle-particle"
          style={{
            left: `${sparkle.left}%`,
            top: `${sparkle.top}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            color: sparkle.color,
            '--duration': `${sparkle.duration}s`,
            '--delay': `${sparkle.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function Celebration({ open, onClose }) {
  const reduceMotion = useReducedMotion()
  const { forgiveness } = content
  const celebration = forgiveness.celebration
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const [done, setDone] = useState(false)
  const fullMessage = celebration.message.join('\n\n')
  const typedMessage = celebration.message.join('\n\n')

  useLockBodyScroll(open)
  useDialogA11y(open, onClose, dialogRef, closeRef)

  useEffect(() => {
    if (!open) setDone(false)
  }, [open])

  const handleHug = () => {
    onClose()
    window.setTimeout(() => scrollToId('hug'), 320)
  }

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45 }}
          className="fixed inset-0 z-[110] overflow-y-auto overscroll-contain bg-blush"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 16%, #FFF8F3 0%, #FCE4E8 42%, #F7B5C2 100%)',
            }}
          />
          <div
            aria-hidden="true"
            className="glow-blob -left-24 top-10 h-[26rem] w-[26rem] bg-cream/80"
          />
          <div
            aria-hidden="true"
            className="glow-blob -right-24 bottom-0 h-[28rem] w-[28rem] bg-rose/30"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.18] dotted-paper"
          />

          {!reduceMotion && <CelebrationParticles />}

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close the celebration"
            className="fixed right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-white/70 bg-cream/85 text-maroon/70 shadow-card backdrop-blur-md transition hover:bg-cream hover:text-maroon sm:right-6 sm:top-6"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          <div className="relative z-20 flex min-h-full items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="celebration-title"
              initial={reduceMotion ? false : { opacity: 0, y: 36, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2.4rem] border border-white/80 bg-cream/85 p-5 text-center shadow-[0_50px_120px_-40px_rgba(72,29,43,0.55)] backdrop-blur-xl sm:p-8"
            >
              <WashiTape
                className="-top-2 left-1/2 -translate-x-1/2"
                color="rgba(247,181,194,0.8)"
                rotate={-2}
                width="7rem"
              />

              <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-softpink via-rose to-rose-deep text-cream shadow-[0_20px_40px_-16px_rgba(212,99,125,0.9)]">
                <span
                  aria-hidden="true"
                  className="css-pulse-ring absolute inset-0 rounded-full border border-rose/50"
                />
                <Heart className="css-heartbeat h-7 w-7 fill-cream" strokeWidth={1.2} />
                <Sparkle className="css-twinkle absolute -right-3 -top-1 h-5 w-5 text-rose" />
                <Sparkle
                  className="css-twinkle absolute -left-3 bottom-1 h-3.5 w-3.5 text-softpink"
                  style={{ '--delay': '1.1s' }}
                />
              </div>

              <p className="mt-5 text-[0.6rem] uppercase tracking-[0.32em] text-rose-deep/70">
                {celebration.eyebrow}
              </p>
              <h2
                id="celebration-title"
                aria-label={`${celebration.heading} ${celebration.headingEmoji}`}
                className="mt-2.5 font-serif text-[clamp(2.3rem,6vw,3.9rem)] font-semibold leading-[0.95] tracking-[-0.025em]"
              >
                <span className="text-gradient-rose css-shimmer">{celebration.heading}</span>{' '}
                <span className="inline-block align-middle text-[0.72em]">
                  {celebration.headingEmoji}
                </span>
              </h2>

              <div className="relative mt-5 rounded-[1.5rem] border border-rose/15 bg-white/55 px-4 py-4 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:px-6 sm:py-5">
                <div className="sr-only">{fullMessage}</div>
                <p
                  aria-hidden="true"
                  className="min-h-[7rem] font-hand text-[1.3rem] leading-[1.7rem] text-maroon/80 sm:min-h-[7.5rem] sm:text-[1.45rem] sm:leading-7"
                >
                  <Typewriter
                    text={typedMessage}
                    start={open}
                    speed={22}
                    charsPerTick={2}
                    onComplete={() => setDone(true)}
                    caretClassName="typing-caret"
                  />
                </p>
              </div>

              <AnimatePresence>
                {done && (
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.6 }}
                    className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row"
                  >
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep px-6 py-3.5 text-[0.8rem] font-medium text-white shadow-[0_18px_36px_-16px_rgba(212,99,125,0.9)] transition hover:-translate-y-0.5 active:translate-y-0 sm:w-auto"
                    >
                      <Heart className="h-4 w-4 fill-white" strokeWidth={1.5} />
                      {celebration.close}
                    </button>
                    <button
                      type="button"
                      onClick={handleHug}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-maroon/20 bg-cream/60 px-6 py-3.5 text-[0.8rem] font-medium text-maroon/75 transition hover:border-maroon/35 hover:bg-cream sm:w-auto"
                    >
                      {celebration.hugCta}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="mt-5 font-hand text-lg text-ink/40">{celebration.note}</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
