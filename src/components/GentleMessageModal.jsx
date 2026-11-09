import { useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { X } from 'lucide-react'
import { content } from '../data/content'
import useDialogA11y from '../hooks/useDialogA11y'
import useLockBodyScroll from '../hooks/useLockBodyScroll'
import { HeartGlyph, Sparkle } from './Decor'
import FloatingHearts from './FloatingHearts'

export default function GentleMessageModal({ open, onClose }) {
  const reduceMotion = useReducedMotion()
  const dialogRef = useRef(null)
  const closeRef = useRef(null)
  const { forgiveness } = content

  useLockBodyScroll(open)
  useDialogA11y(open, onClose, dialogRef, closeRef)

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.3 }}
          className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-maroon/60 p-4 backdrop-blur-md sm:p-6"
        >
          <button
            type="button"
            aria-label="Close this message"
            tabIndex={-1}
            onClick={onClose}
            className="absolute inset-0 h-full w-full cursor-default"
          />
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="gentle-title"
            aria-describedby="gentle-message"
            initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="paper relative my-auto w-full max-w-md overflow-hidden rounded-[2rem] border border-white/70 p-6 text-center shadow-[0_40px_100px_-30px_rgba(51,20,31,0.8)] sm:p-8"
          >
            <FloatingHearts
              count={7}
              seed={73}
              minSize={8}
              maxSize={16}
              opacity={0.3}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-dashed border-rose/20"
            />

            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close this message"
              className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-rose/20 bg-cream/80 text-maroon/60 transition hover:bg-blush hover:text-maroon"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="relative mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-softpink to-rose text-cream shadow-[0_16px_30px_-14px_rgba(212,99,125,0.9)]">
              <HeartGlyph className="css-heartbeat h-7 w-7" />
              <Sparkle className="absolute -right-2 -top-1 h-4 w-4 text-rose" />
            </div>

            <p className="relative mt-5 text-[0.58rem] uppercase tracking-[0.3em] text-rose-deep/70">
              {forgiveness.gentleEyebrow}
            </p>
            <h2
              id="gentle-title"
              className="relative mt-3 font-serif text-[2rem] font-semibold leading-tight text-maroon sm:text-[2.3rem]"
            >
              {forgiveness.gentleTitle}
            </h2>
            <p
              id="gentle-message"
              className="relative mt-4 text-[0.88rem] leading-7 text-ink/65"
            >
              {forgiveness.gentleMessage}
            </p>

            <button
              type="button"
              onClick={onClose}
              className="relative mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose to-rose-deep px-6 py-3 text-[0.8rem] font-medium text-white shadow-[0_16px_32px_-16px_rgba(212,99,125,0.9)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_36px_-16px_rgba(212,99,125,0.85)] active:translate-y-0"
            >
              <HeartGlyph className="h-3.5 w-3.5" />
              {forgiveness.gentleClose}
            </button>
            <p className="relative mt-3 font-hand text-base text-ink/35">
              {forgiveness.gentleNote}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
