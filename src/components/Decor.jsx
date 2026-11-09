export function HeartGlyph({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z" />
    </svg>
  )
}

export function Sparkle({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path d="M12 0c.72 6.54 5.46 11.28 12 12-6.54.72-11.28 5.46-12 12-.72-6.54-5.46-11.28-12-12C6.54 11.28 11.28 6.54 12 0Z" />
    </svg>
  )
}

export function WashiTape({ className = '', color, rotate = -5, width, height }) {
  return (
    <span
      aria-hidden="true"
      className={`washi-tape ${className}`}
      style={{
        '--tape-color': color,
        '--tape-rotate': `${rotate}deg`,
        width,
        height,
      }}
    />
  )
}

export function Eyebrow({ children, tone = 'light', className = '' }) {
  const toneClass = tone === 'dark' ? 'text-softpink' : 'text-rose-deep'
  return (
    <p
      className={`flex items-center justify-center gap-2.5 text-[0.64rem] font-medium uppercase tracking-[0.32em] sm:text-[0.7rem] ${toneClass} ${className}`}
    >
      <span className="h-px w-5 bg-current/45 sm:w-8" />
      <HeartGlyph className="h-2.5 w-2.5 shrink-0" />
      <span className="text-center">{children}</span>
      <span className="h-px w-5 bg-current/45 sm:w-8" />
    </p>
  )
}

export function StarField({ count = 18, className = '', tone = 'rose' }) {
  const positions = [
    [8, 12, 0.9, 0.2],
    [18, 72, 0.6, 1.6],
    [27, 28, 1.1, 2.9],
    [38, 84, 0.7, 0.8],
    [48, 16, 0.8, 2.2],
    [57, 63, 0.5, 1.1],
    [66, 34, 1, 3.2],
    [74, 78, 0.6, 0.4],
    [84, 22, 0.9, 1.9],
    [92, 58, 0.7, 2.7],
    [12, 46, 0.5, 3.6],
    [32, 56, 0.8, 0.9],
    [52, 42, 0.6, 2.4],
    [70, 8, 0.5, 1.4],
    [88, 88, 0.8, 3.1],
    [96, 6, 0.6, 0.6],
    [44, 92, 0.5, 1.8],
    [62, 94, 0.7, 2.8],
  ]
  const items = positions.slice(0, count)
  const color = tone === 'dark' ? 'text-softpink' : 'text-rose'
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {items.map(([left, top, scale, delay], index) => (
        <Sparkle
          key={index}
          className={`sparkle-particle absolute ${color}`}
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${8 * scale + 4}px`,
            height: `${8 * scale + 4}px`,
            '--delay': `${delay}s`,
            '--duration': `${3 + (index % 4)}s`,
          }}
        />
      ))}
    </div>
  )
}
