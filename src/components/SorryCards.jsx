import { motion, useReducedMotion } from 'framer-motion'
import { Ear, Heart, Sparkles, Sprout } from 'lucide-react'
import { content } from '../data/content'
import { Eyebrow, HeartGlyph, Sparkle, StarField, WashiTape } from './Decor'
import FloatingHearts from './FloatingHearts'

const icons = {
  heart: Heart,
  sparkles: Sparkles,
  ear: Ear,
  sprout: Sprout,
}

const accents = [
  { badge: 'from-rose to-rose-deep', tape: 'rgba(233,130,153,0.55)', tilt: -2 },
  { badge: 'from-softpink to-rose', tape: 'rgba(247,181,194,0.7)', tilt: 1.4 },
  { badge: 'from-maroon-soft to-maroon', tape: 'rgba(233,130,153,0.4)', tilt: -1.2 },
  { badge: 'from-rose-deep to-maroon', tape: 'rgba(247,181,194,0.6)', tilt: 2 },
]

export default function SorryCards() {
  const reduceMotion = useReducedMotion()
  const { sorryCards } = content

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.05,
      },
    },
  }

  const card = {
    hidden: (index) => ({
      opacity: 0,
      y: reduceMotion ? 0 : 34,
      rotate: reduceMotion ? 0 : index % 2 === 0 ? -1.4 : 1.4,
    }),
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      className="relative isolate overflow-hidden bg-gradient-to-b from-blush/60 via-cream to-cream py-20 sm:py-28"
      aria-label="Things I want you to know"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16] dotted-paper [mask-image:linear-gradient(180deg,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="glow-blob -left-40 top-10 h-[26rem] w-[26rem] bg-softpink/40"
      />
      <div
        aria-hidden="true"
        className="glow-blob -right-36 bottom-0 h-[24rem] w-[24rem] bg-blush"
      />
      <FloatingHearts count={9} seed={31} minSize={10} maxSize={22} opacity={0.3} />
      <StarField count={8} className="opacity-50" />

      <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: reduceMotion ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <Eyebrow>{sorryCards.eyebrow}</Eyebrow>
          <h2 className="mt-5 text-balance font-serif text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[1] tracking-[-0.02em] text-maroon">
            {sorryCards.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-sm leading-7 text-ink/55 sm:text-[0.95rem]">
            {sorryCards.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {sorryCards.items.map((item, index) => {
            const Icon = icons[item.icon] ?? Heart
            const accent = accents[index % accents.length]
            return (
              <motion.article
                key={item.title}
                custom={index}
                variants={card}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -9, rotate: index % 2 === 0 ? -1.4 : 1.4 }
                }
                transition={{ type: 'spring', stiffness: 240, damping: 20 }}
                className="group relative flex flex-col overflow-hidden rounded-[1.7rem] border border-white/70 bg-paper p-6 shadow-card sm:p-7"
              >
                <div
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blush/50 blur-2xl transition duration-500 group-hover:bg-softpink/50"
                />
                <WashiTape
                  className="-top-2 left-1/2 -translate-x-1/2"
                  color={accent.tape}
                  rotate={accent.tilt}
                  width="4rem"
                  height="1.15rem"
                />

                <div className="relative flex items-start justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent.badge} text-white shadow-[0_12px_24px_-14px_rgba(72,29,43,0.8)] transition duration-500 group-hover:-rotate-6 group-hover:scale-105`}
                  >
                    <Icon className="h-[1.35rem] w-[1.35rem]" strokeWidth={1.7} />
                  </span>
                  <span className="font-serif text-2xl italic text-ink/20">
                    {item.number}
                  </span>
                </div>

                <h3 className="relative mt-6 font-serif text-[1.7rem] font-semibold leading-tight text-maroon">
                  {item.title}
                </h3>
                <p className="relative mt-2 text-[0.86rem] leading-6 text-ink/60">
                  {item.text}
                </p>

                <div className="relative mt-auto flex items-center gap-2 pt-6">
                  <span className="h-px flex-1 bg-rose/20" />
                  <HeartGlyph className="h-3 w-3 text-rose/70 transition duration-500 group-hover:scale-125" />
                </div>

                <Sparkle className="absolute bottom-6 right-6 h-2.5 w-2.5 text-rose/40 transition duration-500 group-hover:text-rose group-hover:rotate-45" />
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
