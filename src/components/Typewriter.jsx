import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function Typewriter({
  text,
  start = true,
  speed = 20,
  charsPerTick = 1,
  runKey = 0,
  className = '',
  showCaret = true,
  caretClassName = 'typing-caret',
  onComplete,
}) {
  const reduceMotion = useReducedMotion()
  const [displayed, setDisplayed] = useState(reduceMotion ? text : '')
  const [done, setDone] = useState(Boolean(reduceMotion))
  const completeRef = useRef(onComplete)
  completeRef.current = onComplete

  useEffect(() => {
    if (!start) return undefined
    if (reduceMotion) {
      setDisplayed(text)
      setDone(true)
      completeRef.current?.()
      return undefined
    }

    let frame = 0
    let startedAt
    let lastTarget = 0
    setDisplayed('')
    setDone(false)

    const tick = (now) => {
      if (startedAt === undefined) startedAt = now
      const elapsed = now - startedAt
      const target = Math.min(
        text.length,
        Math.floor((elapsed / speed) * charsPerTick),
      )
      if (target !== lastTarget) {
        lastTarget = target
        setDisplayed(text.slice(0, target))
      }
      if (target >= text.length) {
        setDone(true)
        completeRef.current?.()
        return
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [start, text, speed, charsPerTick, runKey, reduceMotion])

  return (
    <span className={className}>
      <span className="whitespace-pre-line" aria-hidden="true">
        {displayed}
      </span>
      {showCaret && !done && start ? (
        <span className={caretClassName} aria-hidden="true" />
      ) : null}
    </span>
  )
}
