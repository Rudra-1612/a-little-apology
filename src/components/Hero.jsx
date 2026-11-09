import { motion, useReducedMotion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { content } from '../data/content'
import { scrollToId } from '../lib/scroll'
import { HeartGlyph, Sparkle, StarField, WashiTape } from './Decor'
import FloatingHearts from './FloatingHearts'
import TeddyBear from './TeddyBear'

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const { hero, site } = content

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.12,
        delayChildren: reduceMotion ? 0 : 0.1,
      },
    },
  }

  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 26 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.85,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const polaroid = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 38, rotate: reduceMotion ? -2.5 : 5 },
    show: {
      opacity: 1,
      y: 0,
      rotate: -2.5,
      transition: {
        duration: reduceMotion ? 0 : 1,
        delay: reduceMotion ? 0 : 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden bg-cream"
      aria-label="A little apology for you"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_18%_6%,rgba(252,228,232,0.95),transparent_52%),radial-gradient(ellipse_at_88%_32%,rgba(247,181,194,0.5),transparent_46%),linear-gradient(180deg,#FFF0E8_0%,#FFF8F3_48%,#FFF0E8_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.22] dotted-paper [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_78%)]"
      />
      <div aria-hidden="true" className="glow-blob -left-32 -top-24 h-[30rem] w-[30rem] bg-softpink/50" />
      <div aria-hidden="true" className="glow-blob -right-40 top-1/4 h-[34rem] w-[34rem] bg-blush" />
      <div aria-hidden="true" className="glow-blob -bottom-48 left-1/3 h-[26rem] w-[26rem] bg-rose/20" />

      <FloatingHearts count={18} seed={3} minSize={11} maxSize={28} opacity={0.5} />
      <StarField count={14} />

      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-5 pb-8 pt-5 sm:px-8 sm:pt-7 lg:px-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-maroon text-cream shadow-[0_10px_24px_-12px_rgba(72,29,43,0.8)]">
              <HeartGlyph className="h-4 w-4" />
            </span>
            <div className="leading-tight">
              <p className="font-serif text-[1.15rem] font-semibold tracking-tight text-maroon sm:text-[1.3rem]">
                {site.name}
              </p>
              <p className="hidden font-hand text-[0.95rem] text-rose-deep sm:block">
                {site.tagline}
              </p>
            </div>
          </div>
          <p className="hidden font-hand text-lg text-ink/45 md:block">
            {site.headerNote}
          </p>
        </header>

        <motion.div
          variants={container}
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          className="grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10 lg:py-6"
        >
          <div className="text-center lg:text-left">
            <motion.p
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-rose/25 bg-paper/75 px-4 py-2 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-rose-deep shadow-[0_8px_24px_-18px_rgba(72,29,43,0.6)] backdrop-blur-sm sm:text-[0.66rem]"
            >
              <HeartGlyph className="h-2.5 w-2.5" />
              {hero.eyebrow}
            </motion.p>

            <motion.h1
              variants={fadeUp}
              aria-label={hero.title}
              className="mx-auto mt-6 max-w-xl font-serif text-[clamp(3.2rem,9.4vw,5.9rem)] font-semibold leading-[0.9] tracking-[-0.035em] text-maroon lg:mx-0"
            >
              <span className="block">{hero.titleLine1}</span>
              <span className="mt-1 block italic text-gradient-rose sm:mt-2">
                {hero.titleLine2}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-6 max-w-md text-pretty text-[0.95rem] leading-7 text-ink/70 sm:text-[1.02rem] lg:mx-0"
            >
              {hero.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
            >
              <button
                type="button"
                onClick={() => scrollToId('letter')}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-rose to-rose-deep px-7 py-4 text-[0.82rem] font-medium tracking-wide text-white shadow-[0_20px_44px_-18px_rgba(212,99,125,0.95)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_26px_50px_-18px_rgba(212,99,125,0.9)] active:translate-y-0 active:scale-[0.99]"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/35 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
                />
                <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white/20">
                  <Heart className="h-3.5 w-3.5 fill-white" strokeWidth={1.6} />
                </span>
                <span className="relative">{hero.cta}</span>
              </button>
              <p className="font-hand text-lg text-ink/45">{hero.note}</p>
            </motion.div>
          </div>

          <motion.div
            variants={polaroid}
            whileHover={reduceMotion ? undefined : { rotate: 0, y: -5 }}
            transition={{ type: 'spring', stiffness: 150, damping: 18 }}
            className="relative mx-auto w-full max-w-[330px] sm:max-w-[390px] lg:max-w-[440px]"
          >
            <div
              aria-hidden="true"
              className="absolute inset-10 rounded-full bg-softpink/60 blur-3xl"
            />

            <span
              aria-hidden="true"
              className="absolute -left-4 top-[15%] hidden rotate-[-8deg] rounded-xl border border-rose/15 bg-paper/90 px-3 py-1.5 font-hand text-lg text-rose-deep shadow-card backdrop-blur-sm sm:block"
            >
              {hero.floatingMessages[0]}
            </span>
            <span
              aria-hidden="true"
              className="absolute -right-3 top-[48%] hidden rotate-[7deg] rounded-xl border border-rose/15 bg-paper/90 px-3 py-1.5 font-hand text-lg text-rose-deep shadow-card backdrop-blur-sm sm:block"
            >
              {hero.floatingMessages[1]}
            </span>

            <div className="relative rounded-[1.9rem] bg-paper p-3 pb-[4.6rem] polaroid-shadow sm:pb-20">
              <WashiTape
                className="-top-3 left-1/2 -translate-x-1/2"
                color="rgba(247,181,194,0.85)"
                rotate={-3}
              />

              <div
                className="relative aspect-[4/5] overflow-hidden rounded-[1.3rem]"
                style={{
                  background:
                    'radial-gradient(circle at 50% 26%, #FFF8F2 0%, #FCE4E8 42%, #F7B5C2 100%)',
                }}
              >
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-25 dotted-paper"
                />
                <StarField count={10} className="opacity-70" />
                <FloatingHearts
                  count={6}
                  seed={11}
                  minSize={9}
                  maxSize={18}
                  opacity={0.5}
                />
                <div
                  aria-hidden="true"
                  className="absolute bottom-[-12%] left-1/2 h-[62%] w-[82%] -translate-x-1/2 rounded-full bg-cream/80 blur-2xl"
                />

                <span className="absolute left-4 top-4 rotate-[-3deg] rounded-full border border-rose/20 bg-paper/80 px-3 py-1 font-hand text-sm text-maroon/60 backdrop-blur-sm">
                  {hero.polaroidNote}
                </span>

                <div className="absolute right-4 top-4 grid h-14 w-12 place-items-center rounded-[3px] border border-dashed border-maroon/30 bg-cream/90 p-1 text-center shadow-sm">
                  <div>
                    <HeartGlyph className="mx-auto h-3 w-3 text-rose" />
                    <span className="block font-hand text-[0.62rem] leading-none text-maroon/70">
                      {hero.stamp}
                    </span>
                  </div>
                </div>

                <div
                  className="css-bob absolute bottom-0 left-[-2%] z-20 w-[59%]"
                  style={{ '--duration': '6s' }}
                >
                  <TeddyBear
                    variant="cream"
                    mood="sitting"
                    className="w-full drop-shadow-[0_18px_22px_rgba(72,29,43,0.16)]"
                  />
                </div>
                <div
                  className="css-bob absolute bottom-0 right-[-2%] z-10 w-[59%]"
                  style={{ '--duration': '7s', '--delay': '1.1s' }}
                >
                  <TeddyBear
                    variant="chocolate"
                    mood="sitting"
                    className="w-full drop-shadow-[0_18px_22px_rgba(72,29,43,0.18)]"
                  />
                </div>

                <HeartGlyph className="css-heartbeat absolute left-1/2 top-[24%] z-30 h-7 w-7 -translate-x-1/2 text-rose heart-shadow sm:h-8 sm:w-8" />
                <Sparkle className="css-twinkle absolute left-[16%] top-[21%] h-4 w-4 text-white" />
                <Sparkle
                  className="css-twinkle absolute right-[18%] top-[34%] h-3 w-3 text-maroon/40"
                  style={{ '--delay': '1.4s' }}
                />
                <Sparkle
                  className="css-twinkle absolute bottom-[34%] left-[10%] h-2.5 w-2.5 text-rose"
                  style={{ '--delay': '0.7s' }}
                />
              </div>

              <p className="absolute inset-x-0 bottom-5 px-6 text-center font-hand text-[1.45rem] leading-tight text-maroon/75 sm:text-[1.6rem]">
                {hero.polaroidCaption}
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToId('letter')}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.7 }}
          className="mx-auto flex flex-col items-center gap-2 text-ink/40 transition-colors hover:text-rose-deep"
          aria-label="Scroll down to the letter"
        >
          <span className="text-[0.56rem] uppercase tracking-[0.32em]">
            {hero.scrollCue}
          </span>
          <span className="grid h-8 w-5 place-items-start rounded-full border border-current p-1">
            <span className="scroll-dot h-1.5 w-1.5 rounded-full bg-rose" />
          </span>
        </motion.button>
      </div>
    </section>
  )
}
