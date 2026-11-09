import { motion, useReducedMotion } from 'framer-motion'
import { content } from '../data/content'
import { Eyebrow, HeartGlyph, Sparkle, StarField, WashiTape } from './Decor'
import FloatingHearts from './FloatingHearts'

function Tulip({ className = '' }) {
  return (
    <svg
      viewBox="0 0 64 100"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M32 96V44" stroke="#7C9878" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M32 74c-12 2-21-6-21-17 11-2 19 5 21 17Z"
        fill="#A9C0A0"
      />
      <path
        d="M32 83c12 2 21-6 21-17-11-2-19 5-21 17Z"
        fill="#8FAF8B"
      />
      <path
        d="M17 34c0-11 7-19 15-19s15 8 15 19c0 9-7 15-15 15S17 43 17 34Z"
        fill="#E98299"
      />
      <path
        d="M22 33c0-9 4-15 10-15s10 6 10 15c0 7-4 11-10 11s-10-4-10-11Z"
        fill="#F7B5C2"
      />
      <path d="M32 20v22" stroke="#D4637D" strokeWidth="1.4" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

export default function Promises() {
  const reduceMotion = useReducedMotion()
  const { promises } = content
  const regularPromises = promises.items.slice(0, -1)
  const finalPromise = promises.items[promises.items.length - 1]

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.14,
        delayChildren: reduceMotion ? 0 : 0.15,
      },
    },
  }

  const note = {
    hidden: (index) => ({
      opacity: 0,
      y: reduceMotion ? 0 : 28,
      rotate: reduceMotion ? 0 : index % 2 === 0 ? -1.8 : 1.6,
    }),
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 16,
        duration: reduceMotion ? 0 : undefined,
      },
    },
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-cream via-blush/40 to-cream py-20 sm:py-28"
      aria-label="Little promises from me"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_10%,rgba(252,228,232,0.8),transparent_48%),radial-gradient(ellipse_at_85%_75%,rgba(247,181,194,0.3),transparent_45%)]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 -translate-x-1/2 select-none whitespace-nowrap font-serif text-[22vw] italic leading-none text-maroon/[0.035]"
      >
        {promises.watermark}
      </span>
      <FloatingHearts count={11} seed={47} minSize={10} maxSize={24} opacity={0.3} />
      <StarField count={9} className="opacity-50" />
      <div
        aria-hidden="true"
        className="glow-blob -left-32 top-1/3 h-[24rem] w-[24rem] bg-softpink/30"
      />

      <div className="relative mx-auto w-full max-w-5xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Eyebrow>{promises.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1] tracking-[-0.02em] text-maroon">
            {promises.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-ink/55 sm:text-[0.95rem]">
            {promises.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 sm:mt-16"
        >
          <div className="paper relative overflow-hidden rounded-[2.2rem] border border-rose/20 p-5 shadow-soft sm:p-9 lg:p-11">
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-[0.22] dotted-paper"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[1.8rem] border border-dashed border-rose/25"
            />
            <WashiTape
              className="-top-3 left-8"
              color="rgba(233,130,153,0.55)"
              rotate={-7}
              width="6.5rem"
            />
            <WashiTape
              className="-top-3 right-8"
              color="rgba(247,181,194,0.7)"
              rotate={6}
              width="6.5rem"
            />

            <div className="relative flex flex-wrap items-start justify-between gap-4 pb-6">
              <div>
                <p className="font-hand text-[1.8rem] leading-none text-rose-deep">
                  {promises.boardLabel}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-[0.55rem] uppercase tracking-[0.3em] text-ink/35">
                  <HeartGlyph className="h-2.5 w-2.5 text-rose/60" />
                  {promises.boardSubLabel}
                </p>
              </div>
              <div className="relative grid h-[4.2rem] w-[3.5rem] place-items-center rounded-[3px] border border-dashed border-maroon/30 bg-cream/80 p-1 text-center shadow-sm">
                <div>
                  <HeartGlyph className="mx-auto h-3.5 w-3.5 text-rose" />
                  <span className="mt-1 block font-hand text-[0.64rem] leading-none text-maroon/65">
                    {promises.stamp}
                  </span>
                </div>
              </div>
            </div>

            <motion.div
              variants={container}
              initial={reduceMotion ? false : 'hidden'}
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="relative grid gap-4 sm:grid-cols-2"
            >
              {regularPromises.map((text, index) => (
                <motion.div
                  key={text}
                  custom={index}
                  variants={note}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -6, rotate: index % 2 === 0 ? -1 : 1 }
                  }
                  transition={{ type: 'spring', stiffness: 250, damping: 20 }}
                  className="group relative rounded-[1.35rem] border border-rose/15 bg-gradient-to-br from-white/90 to-blush/45 p-5 pl-14 shadow-[0_14px_30px_-22px_rgba(72,29,43,0.5)]"
                >
                  <span className="absolute left-4 top-4 grid h-7 w-7 place-items-center rounded-full border border-rose/25 bg-rose/10 text-rose-deep transition duration-500 group-hover:bg-rose/20 group-hover:scale-105">
                    <HeartGlyph className="h-3 w-3" />
                  </span>
                  <p className="font-hand text-[1.45rem] leading-snug text-maroon/85 sm:text-[1.55rem]">
                    {text}
                  </p>
                  <span className="absolute right-3 top-3 font-serif text-[0.7rem] italic tracking-wide text-ink/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <Sparkle className="absolute bottom-3 right-3 h-2.5 w-2.5 text-rose/25 transition duration-500 group-hover:rotate-45 group-hover:text-rose/60" />
                </motion.div>
              ))}

              <motion.div
                custom={regularPromises.length}
                variants={note}
                whileHover={reduceMotion ? undefined : { y: -5 }}
                className="group relative overflow-hidden rounded-[1.35rem] bg-gradient-to-br from-maroon to-maroon-soft px-6 py-7 text-center shadow-[0_20px_44px_-24px_rgba(72,29,43,0.9)] sm:col-span-2 sm:px-10"
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(247,181,194,0.25),transparent_60%)]"
                />
                <WashiTape
                  className="-top-2 left-1/2 -translate-x-1/2"
                  color="rgba(247,181,194,0.55)"
                  rotate={-2}
                  width="4.5rem"
                  height="1.15rem"
                />
                <HeartGlyph className="relative mx-auto h-5 w-5 text-softpink/80" />
                <p className="relative mt-3 font-hand text-[1.6rem] leading-snug text-cream sm:text-[1.9rem]">
                  {finalPromise}
                </p>
                <Sparkle className="css-twinkle absolute left-6 top-5 h-4 w-4 text-softpink/50" />
                <Sparkle
                  className="css-twinkle absolute bottom-5 right-7 h-3 w-3 text-softpink/40"
                  style={{ '--delay': '1.2s' }}
                />
              </motion.div>
            </motion.div>

            <p className="relative mt-7 flex items-center justify-center gap-2.5 font-hand text-xl text-ink/45">
              <HeartGlyph className="h-3 w-3 text-rose/60" />
              {promises.closing}
              <HeartGlyph className="h-3 w-3 text-rose/60" />
            </p>
          </div>

          <Tulip className="absolute -bottom-9 -left-5 hidden w-16 -rotate-6 sm:block lg:-left-10 lg:w-20" />
          <Tulip className="absolute -bottom-11 -right-5 hidden w-20 rotate-6 sm:block lg:-right-10 lg:w-24" />
        </motion.div>
      </div>
    </section>
  )
}
