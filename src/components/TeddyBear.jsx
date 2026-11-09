import { useId } from 'react'

const palettes = {
  cream: {
    furLight: '#FFF9F1',
    fur: '#F4E2D0',
    furShade: '#E3C8AE',
    earInner: '#F3AFC0',
    muzzle: '#FFF8F1',
    muzzleShade: '#F0DCC8',
    footPad: '#EDB7BE',
    blush: '#F29CAE',
    nose: '#4A2C33',
    eye: '#39232B',
    stitch: '#C99C7C',
  },
  chocolate: {
    furLight: '#A97458',
    fur: '#8B5B45',
    furShade: '#6F4532',
    earInner: '#E59FAC',
    muzzle: '#DDB99F',
    muzzleShade: '#C99D81',
    footPad: '#C9878A',
    blush: '#DD7F90',
    nose: '#35202A',
    eye: '#2C1A20',
    stitch: '#E8C2A6',
  },
}

const armRotations = {
  walking: { left: 32, right: -32 },
  sitting: { left: 14, right: -14 },
  hugging: { left: -55, right: 55 },
}

function getArmRotations(mood, hugSide) {
  if (mood === 'hugging' && hugSide === 'left') {
    return { left: 14, right: -58 }
  }
  if (mood === 'hugging' && hugSide === 'right') {
    return { left: 58, right: -14 }
  }
  return armRotations[mood] ?? armRotations.sitting
}

export default function TeddyBear({
  variant = 'cream',
  mood = 'sitting',
  hugSide,
  bow = variant === 'cream',
  heartPatch = variant === 'chocolate',
  className = '',
  style,
}) {
  const uid = useId().replace(/:/g, '')
  const furGradient = `teddy-fur-${uid}`
  const bodyGradient = `teddy-body-${uid}`
  const palette = palettes[variant] ?? palettes.cream
  const arms = getArmRotations(mood, hugSide)
  const eyesClosed = mood !== 'walking'

  return (
    <svg
      viewBox="0 0 220 244"
      role="presentation"
      aria-hidden="true"
      focusable="false"
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id={furGradient} cx="34%" cy="26%" r="82%">
          <stop offset="0%" stopColor={palette.furLight} />
          <stop offset="58%" stopColor={palette.fur} />
          <stop offset="100%" stopColor={palette.furShade} />
        </radialGradient>
        <linearGradient id={bodyGradient} x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor={palette.fur} />
          <stop offset="100%" stopColor={palette.furShade} />
        </linearGradient>
      </defs>

      <ellipse cx="110" cy="235" rx="80" ry="9" fill="#481D2B" opacity="0.12" />

      <ellipse cx="77" cy="212" rx="30" ry="21" fill={palette.furShade} />
      <ellipse cx="143" cy="212" rx="30" ry="21" fill={palette.furShade} />
      <ellipse cx="77" cy="210" rx="17" ry="12" fill={palette.footPad} opacity="0.9" />
      <ellipse cx="143" cy="210" rx="17" ry="12" fill={palette.footPad} opacity="0.9" />

      <ellipse cx="110" cy="170" rx="61" ry="58" fill={`url(#${bodyGradient})`} />
      <ellipse cx="110" cy="182" rx="34" ry="38" fill={palette.muzzle} opacity="0.45" />

      <g
        style={{
          transformOrigin: '55px 132px',
          transform: `rotate(${arms.left}deg)`,
          transition: 'transform 800ms cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
      >
        <rect x="36" y="122" width="35" height="74" rx="17.5" fill={palette.furShade} />
        <ellipse cx="53.5" cy="192" rx="17.5" ry="12" fill={palette.fur} />
      </g>
      <g
        style={{
          transformOrigin: '165px 132px',
          transform: `rotate(${arms.right}deg)`,
          transition: 'transform 800ms cubic-bezier(0.34, 1.4, 0.64, 1)',
        }}
      >
        <rect x="149" y="122" width="35" height="74" rx="17.5" fill={palette.furShade} />
        <ellipse cx="166.5" cy="192" rx="17.5" ry="12" fill={palette.fur} />
      </g>

      <circle cx="63" cy="53" r="25" fill={palette.furShade} />
      <circle cx="63" cy="53" r="14" fill={palette.earInner} opacity="0.92" />
      <circle cx="157" cy="53" r="25" fill={palette.furShade} />
      <circle cx="157" cy="53" r="14" fill={palette.earInner} opacity="0.92" />

      <circle cx="110" cy="92" r="61" fill={`url(#${furGradient})`} />
      <ellipse cx="88" cy="58" rx="26" ry="15" fill="#FFFFFF" opacity="0.14" transform="rotate(-24 88 58)" />

      <ellipse cx="110" cy="109" rx="31" ry="24" fill={palette.muzzle} />
      <ellipse cx="110" cy="112" rx="24" ry="17" fill={palette.muzzleShade} opacity="0.35" />

      <g style={{ opacity: eyesClosed ? 0 : 1, transition: 'opacity 280ms ease' }}>
        <circle cx="86" cy="89" r="5.6" fill={palette.eye} />
        <circle cx="134" cy="89" r="5.6" fill={palette.eye} />
        <circle cx="87.8" cy="87.2" r="1.8" fill="#FFF8F1" />
        <circle cx="135.8" cy="87.2" r="1.8" fill="#FFF8F1" />
      </g>
      <g
        fill="none"
        stroke={palette.eye}
        strokeWidth="3.8"
        strokeLinecap="round"
        style={{ opacity: eyesClosed ? 1 : 0, transition: 'opacity 280ms ease' }}
      >
        <path d="M78.5 89c4.8 5.6 10.2 5.6 15 0" />
        <path d="M126.5 89c4.8 5.6 10.2 5.6 15 0" />
      </g>

      <ellipse cx="63" cy="108" rx="11.5" ry="6.5" fill={palette.blush} opacity="0.72" />
      <ellipse cx="157" cy="108" rx="11.5" ry="6.5" fill={palette.blush} opacity="0.72" />

      <ellipse cx="110" cy="100" rx="8.5" ry="6.2" fill={palette.nose} />
      <ellipse cx="108" cy="98" rx="2.6" ry="1.7" fill="#FFF8F1" opacity="0.55" />
      <path
        d="M110 106.5v4.5m0 0c0 3.4-4.6 5.4-8.2 4.3m8.2-4.3c0 3.4 4.6 5.4 8.2 4.3"
        fill="none"
        stroke={palette.nose}
        strokeWidth="2.3"
        strokeLinecap="round"
      />

      {heartPatch && (
        <g transform="translate(94 158) scale(1.35)">
          <path
            d="M12 21.35 10.55 20C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35Z"
            fill="#F7B5C2"
            opacity="0.95"
          />
          <path
            d="M12 18.6 11 17.7C6.8 14 4 11.6 4 8.7 4 6.5 5.7 5 7.8 5c1.4 0 2.7.7 3.5 1.8l.7.9.7-.9C13.5 5.7 14.8 5 16.2 5 18.3 5 20 6.5 20 8.7c0 2.9-2.8 5.3-7 9L12 18.6Z"
            fill="none"
            stroke={palette.stitch}
            strokeWidth="0.8"
            strokeDasharray="1.5 1.6"
            opacity="0.8"
          />
        </g>
      )}

      {bow && (
        <g transform="translate(155 37) rotate(12)">
          <path
            d="M-1 3c-12-10-23-5-20 6 2 7.5 13 7.5 20 2Z"
            fill="#E98299"
          />
          <path
            d="M3 3c12-10 23-5 20 6-2 7.5-13 7.5-20 2Z"
            fill="#E98299"
          />
          <path
            d="M-1 3c-7-5.5-13-4.5-14 1.5"
            fill="none"
            stroke="#F7B5C2"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.8"
          />
          <circle cx="1.5" cy="7" r="5" fill="#D4637D" />
          <circle cx="-0.5" cy="5" r="1.6" fill="#FCE4E8" opacity="0.8" />
        </g>
      )}
    </svg>
  )
}
