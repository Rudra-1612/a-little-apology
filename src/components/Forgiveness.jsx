import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { Eyebrow, HeartGlyph, Sparkle, StarField } from './Decor'
import FloatingHearts from './FloatingHearts'
import Celebration from './Celebration'
import GentleMessageModal from './GentleMessageModal'

const zeroOffset = { x: 0, y: 0, rotate: 0, id: 0 }

export default function Forgiveness() {
  const reduceMotion = useReducedMotion()
  const { forgiveness } = content
  const stageRef = useRef(null)
  const noRef = useRef(null)
  const yesRef = useRef(null)
  const offsetRef = useRef(zeroOffset)
  const lastDodgeRef = useRef(0)
  const dodgeCountRef = useRef(0)
  const messageTimerRef = useRef(null)

  const [offset, setOffset] = useState(zeroOffset)
  const [message, setMessage] = useState(null)
  const [gentleOpen, setGentleOpen] = useState(false)
  const [celebrate, setCelebrate] = useState(false)

  const dodge = useCallback(
    (event) => {
      if (reduceMotion) return
      const now = performance.now()
      if (now - lastDodgeRef.current < 420) return

      const stage = stageRef.current
      const noButton = noRef.current
      const yesButton = yesRef.current
      if (!stage || !noButton || !yesButton) return

      const stageRect = stage.getBoundingClientRect()
      const stageWidth = stage.clientWidth
      const stageHeight = stage.clientHeight
      const buttonWidth = noButton.offsetWidth
      const buttonHeight = noButton.offsetHeight
      const baseLeft = noButton.offsetLeft
      const baseTop = noButton.offsetTop
      const margin = 8

      const minX = margin - baseLeft
      const maxX = stageWidth - margin - buttonWidth - baseLeft
      const minY = margin - baseTop
      const maxY = stageHeight - margin - buttonHeight - baseTop

      if (maxX < minX || maxY < minY) return

      const yesRect = yesButton.getBoundingClientRect()
      const yesBox = {
        left: yesRect.left - stageRect.left - 14,
        right: yesRect.right - stageRect.left + 14,
        top: yesRect.top - stageRect.top - 14,
        bottom: yesRect.bottom - stageRect.top + 14,
      }

      const clearOfYes = (x, y) => {
        const left = baseLeft + x
        const top = baseTop + y
        return (
          left + buttonWidth <= yesBox.left ||
          left >= yesBox.right ||
          top + buttonHeight <= yesBox.top ||
          top >= yesBox.bottom
        )
      }

      const pointerX =
        event && typeof event.clientX === 'number'
          ? event.clientX - stageRect.left
          : stageWidth / 2
      const pointerY =
        event && typeof event.clientY === 'number'
          ? event.clientY - stageRect.top
          : stageHeight / 2

      let best = null
      let bestScore = -Infinity

      for (let attempt = 0; attempt < 44; attempt += 1) {
        const x = minX + Math.random() * (maxX - minX)
        const y = minY + Math.random() * (maxY - minY)
        if (!clearOfYes(x, y)) continue

        const centerX = baseLeft + x + buttonWidth / 2
        const centerY = baseTop + y + buttonHeight / 2
        const distanceFromPointer = Math.hypot(centerX - pointerX, centerY - pointerY)
        const movement = Math.hypot(x - offsetRef.current.x, y - offsetRef.current.y)
        if (movement < 26) continue

        const score =
          distanceFromPointer + Math.random() * 46 + Math.min(movement, 150) * 0.3
        if (score > bestScore) {
          bestScore = score
          best = { x, y }
        }
      }

      if (!best) {
        const candidates = [
          { x: minX, y: minY },
          { x: maxX, y: minY },
          { x: minX, y: maxY },
          { x: maxX, y: maxY },
          { x: minX, y: (minY + maxY) / 2 },
          { x: maxX, y: (minY + maxY) / 2 },
          { x: (minX + maxX) / 2, y: minY },
          { x: (minX + maxX) / 2, y: maxY },
        ].filter((candidate) => clearOfYes(candidate.x, candidate.y))
        if (candidates.length === 0) return
        best = candidates[Math.floor(Math.random() * candidates.length)]
      }

      lastDodgeRef.current = now
      const count = dodgeCountRef.current
      dodgeCountRef.current = count + 1

      const next = {
        x: best.x,
        y: best.y,
        rotate: (Math.random() > 0.5 ? 1 : -1) * (4 + Math.random() * 4),
        id: count + 1,
      }
      offsetRef.current = next
      setOffset(next)

      const messageX = Math.max(
        86,
        Math.min(stageWidth - 86, baseLeft + best.x + buttonWidth / 2),
      )
      const messageY = Math.max(48, baseTop + best.y - 4)
      const messageText =
        forgiveness.dodgeMessages[count % forgiveness.dodgeMessages.length]

      window.clearTimeout(messageTimerRef.current)
      setMessage({ id: count + 1, text: messageText, x: messageX, y: messageY })
      messageTimerRef.current = window.setTimeout(() => setMessage(null), 1600)
    },
    [reduceMotion, forgiveness.dodgeMessages],
  )

  const handlePointerMove = (event) => {
    if (reduceMotion) return
    if (event.pointerType && event.pointerType !== 'mouse') return
    const noButton = noRef.current
    if (!noButton) return
    const rect = noButton.getBoundingClientRect()
    const distance = Math.hypot(
      event.clientX - (rect.left + rect.width / 2),
      event.clientY - (rect.top + rect.height / 2),
    )
    const threshold = Math.max(rect.width, rect.height) / 2 + 46
    if (distance < threshold) dodge(event)
  }

  const handleNoClick = (event) => {
    if (reduceMotion || event.detail === 0) {
      setGentleOpen(true)
      return
    }
    if (performance.now() - lastDodgeRef.current < 650) {
      event.preventDefault()
      return
    }
    dodge(event)
  }

  const handleNoKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
      setGentleOpen(true)
    }
  }

  useEffect(() => {
    const reset = () => {
      offsetRef.current = zeroOffset
      setOffset(zeroOffset)
      setMessage(null)
    }
    window.addEventListener('resize', reset)
    return () => {
      window.removeEventListener('resize', reset)
      window.clearTimeout(messageTimerRef.current)
    }
  }, [])

  return (
    <section
      id="forgiveness"
      className="section-anchor relative isolate flex min-h-[100svh] items-center overflow-hidden bg-maroon py-20 sm:py-24"
      aria-label="Can you forgive me?"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_-10%,#6b3245_0%,#481d2b_48%,#33141f_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08] dotted-paper"
      />
      <div
        aria-hidden="true"
        className="glow-blob left-1/2 top-[-12rem] h-[30rem] w-[30rem] -translate-x-1/2 bg-rose/30"
      />
      <div
        aria-hidden="true"
        className="glow-blob -bottom-40 left-[-8rem] h-[26rem] w-[26rem] bg-softpink/20"
      />
      <div
        aria-hidden="true"
        className="glow-blob -right-24 top-1/3 h-[24rem] w-[24rem] bg-rose/20"
      />

      <FloatingHearts
        mode="rise"
        count={26}
        seed={59}
        minSize={10}
        maxSize={26}
        opacity={0.55}
        colors={['#F7B5C2', '#E98299', '#F3A6B7', '#FCE4E8']}
      />
      <StarField count={18} tone="dark" className="opacity-80" />

      <div className="relative z-10 mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow tone="dark">{forgiveness.eyebrow}</Eyebrow>

        <h2 className="mt-5 text-balance font-serif text-[clamp(2.7rem,7.4vw,5.2rem)] font-semibold leading-[0.96] tracking-[-0.03em] text-cream">
          {forgiveness.heading}
        </h2>
        <p className="mx-auto mt-5 max-w-md text-pretty text-[0.92rem] leading-7 text-softpink/80 sm:text-base">
          {forgiveness.subtitle}
        </p>

        <div
          ref={stageRef}
          data-testid="forgiveness-stage"
          onPointerMove={handlePointerMove}
          className="relative mx-auto mt-8 h-[19rem] w-full max-w-xl sm:mt-10 sm:h-[15rem]"
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <div className="relative">
              {!reduceMotion && (
                <span
                  aria-hidden="true"
                  className="css-pulse-ring pointer-events-none absolute inset-0 rounded-full border border-softpink/60"
                />
              )}
              <button
                ref={yesRef}
                data-testid="forgive-yes"
                type="button"
                onClick={() => setCelebrate(true)}
                className="group relative inline-flex min-h-[3.6rem] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-softpink via-blush to-cream px-7 py-4 text-[0.84rem] font-semibold tracking-wide text-maroon shadow-[0_22px_50px_-18px_rgba(247,181,194,0.65)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-18px_rgba(247,181,194,0.6)] active:translate-y-0 sm:text-[0.88rem]"
              >
                <HeartGlyph className="h-4 w-4 text-rose-deep transition duration-500 group-hover:scale-110" />
                {forgiveness.yesLabel}
              </button>
            </div>

            <motion.button
              ref={noRef}
              data-testid="forgive-no"
              type="button"
              animate={{ x: offset.x, y: offset.y, rotate: offset.rotate }}
              transition={{ type: 'spring', stiffness: 430, damping: 27, mass: 0.8 }}
              whileTap={reduceMotion ? undefined : { scale: 0.94 }}
              onPointerDown={(event) => {
                if (event.pointerType !== 'mouse') dodge(event)
              }}
              onTouchStart={() => dodge()}
              onPointerEnter={(event) => {
                if (event.pointerType === 'mouse') dodge(event)
              }}
              onClick={handleNoClick}
              onKeyDown={handleNoKeyDown}
              aria-describedby="not-yet-hint"
              style={{ touchAction: 'manipulation' }}
              className="inline-flex min-h-[3.4rem] items-center justify-center gap-2 rounded-full border border-softpink/35 bg-white/5 px-6 py-3.5 text-[0.8rem] font-medium text-softpink/90 backdrop-blur-sm transition-colors duration-300 hover:border-softpink/60 hover:bg-white/10 focus-visible:border-cream"
            >
              {forgiveness.noLabel}
            </motion.button>
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                key={message.id}
                initial={reduceMotion ? false : { opacity: 0, y: 8, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 380, damping: 24 }}
                className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full border border-softpink/30 bg-cream px-3.5 py-1.5 font-hand text-[1.05rem] text-maroon shadow-[0_10px_24px_-10px_rgba(0,0,0,0.55)]"
                style={{ left: message.x, top: message.y }}
              >
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p
          id="not-yet-hint"
          className="mx-auto -mt-2 max-w-sm font-hand text-lg text-softpink/45"
        >
          {forgiveness.dodgeNote}
        </p>
        <button
          type="button"
          onClick={() => setGentleOpen(true)}
          className="mt-3 inline-flex min-h-[2.75rem] items-center rounded-full px-3 py-1 text-[0.72rem] font-light text-softpink/50 underline decoration-softpink/30 underline-offset-4 transition hover:text-softpink/85 hover:decoration-softpink/60"
        >
          {forgiveness.gentleLink}
        </button>

        <Sparkle
          aria-hidden="true"
          className="css-twinkle absolute left-[12%] top-[18%] hidden h-4 w-4 text-softpink/50 lg:block"
        />
        <Sparkle
          aria-hidden="true"
          className="css-twinkle absolute right-[14%] top-[30%] hidden h-3 w-3 text-rose/60 lg:block"
          style={{ '--delay': '1.3s' }}
        />
      </div>

      <GentleMessageModal open={gentleOpen} onClose={() => setGentleOpen(false)} />
      <Celebration open={celebrate} onClose={() => setCelebrate(false)} />
    </section>
  )
}
