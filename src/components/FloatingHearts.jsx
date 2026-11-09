import { useMemo } from 'react'
import { useReducedMotion } from 'framer-motion'
import { HeartGlyph } from './Decor'

const defaultColors = ['#E98299', '#F7B5C2', '#D4637D', '#F3A6B7', '#FCE4E8']

function mulberry32(seed) {
  let value = seed
  return function random() {
    value |= 0
    value = (value + 0x6d2b79f5) | 0
    let t = Math.imul(value ^ (value >>> 15), 1 | value)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function FloatingHearts({
  count = 14,
  seed = 7,
  className = '',
  colors = defaultColors,
  mode = 'float',
  minSize = 12,
  maxSize = 28,
  opacity = 0.55,
}) {
  const reduceMotion = useReducedMotion()

  const hearts = useMemo(() => {
    const random = mulberry32(seed * 977 + count * 31)
    return Array.from({ length: count }, (_, index) => {
      const size = minSize + random() * (maxSize - minSize)
      const duration = 6 + random() * 8
      return {
        left: 2 + random() * 94,
        top: 6 + random() * 82,
        size,
        color: colors[index % colors.length],
        duration,
        delay: -random() * duration,
        rotate: -18 + random() * 36,
        drift: -24 + random() * 48,
        rise: -18 - random() * 26,
        sway: -46 + random() * 92,
        spin: -30 + random() * 60,
        scale: 0.75 + random() * 0.5,
        heartOpacity: opacity * (0.55 + random() * 0.55),
      }
    })
  }, [count, seed, colors, minSize, maxSize, opacity])

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      {hearts.map((heart, index) => {
        const baseStyle = {
          left: `${heart.left}%`,
          width: `${heart.size}px`,
          height: `${heart.size}px`,
          color: heart.color,
        }

        if (reduceMotion) {
          return (
            <HeartGlyph
              key={index}
              className="absolute"
              style={{
                ...baseStyle,
                top: `${mode === 'rise' ? 20 + (index * 67) % 65 : heart.top}%`,
                opacity: 0.18,
              }}
            />
          )
        }

        if (mode === 'rise') {
          return (
            <HeartGlyph
              key={index}
              className="heart-rise"
              style={{
                ...baseStyle,
                '--duration': `${heart.duration}s`,
                '--delay': `${heart.delay}s`,
                '--sway': `${heart.sway}px`,
                '--spin': `${heart.spin}deg`,
                '--scale': heart.scale,
                '--opacity': heart.heartOpacity,
              }}
            />
          )
        }

        return (
          <HeartGlyph
            key={index}
            className="heart-particle"
            style={{
              ...baseStyle,
              top: `${heart.top}%`,
              '--duration': `${heart.duration}s`,
              '--delay': `${heart.delay}s`,
              '--rotate': `${heart.rotate}deg`,
              '--drift': `${heart.drift}px`,
              '--rise': `${heart.rise}px`,
              '--opacity': heart.heartOpacity,
            }}
          />
        )
      })}
    </div>
  )
}
