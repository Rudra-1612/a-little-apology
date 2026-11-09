import { ArrowUp } from 'lucide-react'
import { content } from '../data/content'
import { scrollToTop } from '../lib/scroll'
import { HeartGlyph, Sparkle } from './Decor'
import FloatingHearts from './FloatingHearts'

export default function Footer() {
  const { footer, site } = content

  return (
    <footer className="relative isolate overflow-hidden bg-maroon-deep pb-24 pt-14 text-center sm:pb-20 sm:pt-16">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-softpink/60 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(247,181,194,0.16),transparent_58%),radial-gradient(ellipse_at_50%_120%,rgba(233,130,153,0.12),transparent_55%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.05] dotted-paper"
      />
      <FloatingHearts
        count={8}
        seed={97}
        minSize={8}
        maxSize={16}
        opacity={0.28}
        colors={['#F7B5C2', '#E98299', '#FCE4E8']}
      />

      <div className="relative mx-auto w-full max-w-2xl px-6">
        <div className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-softpink/25 bg-softpink/10 text-softpink">
          <HeartGlyph className="css-heartbeat h-4 w-4" />
        </div>

        <p className="mt-4 font-serif text-xl italic text-cream/85">{site.name}</p>

        <div className="mt-5 flex items-center justify-center gap-2.5 text-softpink/50">
          <span className="h-px w-8 bg-current" />
          <HeartGlyph className="h-2.5 w-2.5" />
          <span className="h-px w-8 bg-current" />
        </div>

        <p className="mt-5 font-serif text-[1.35rem] italic leading-relaxed text-cream/90 sm:text-[1.6rem]">
          {footer.line1}
        </p>
        <p className="mt-2 font-hand text-[1.35rem] text-softpink/75 sm:text-[1.55rem]">
          {footer.line2}
        </p>

        <button
          type="button"
          onClick={scrollToTop}
          className="mt-8 inline-flex min-h-[2.75rem] items-center gap-2 rounded-full border border-softpink/20 px-5 py-2 text-[0.58rem] uppercase tracking-[0.3em] text-softpink/50 transition hover:border-softpink/40 hover:text-softpink/85"
        >
          <ArrowUp className="h-3 w-3" />
          {footer.backToTop}
        </button>

        <p className="mt-8 text-[0.52rem] uppercase tracking-[0.28em] text-cream/25">
          {footer.small}
        </p>

        <Sparkle className="css-twinkle absolute left-[12%] top-16 h-3 w-3 text-softpink/30" />
        <Sparkle
          className="css-twinkle absolute right-[14%] top-24 h-4 w-4 text-rose/30"
          style={{ '--delay': '1.3s' }}
        />
      </div>
    </footer>
  )
}
