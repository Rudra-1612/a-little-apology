import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Pause, Play, Volume2, VolumeX } from 'lucide-react'
import { content } from '../data/content'

export default function MusicPlayer() {
  const audioRef = useRef(null)
  const panelRef = useRef(null)
  const { music } = content
  const [playing, setPlaying] = useState(false)
  const [volume, setVolume] = useState(music.defaultVolume)
  const [panelOpen, setPanelOpen] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.volume = volume
  }, [volume])

  useEffect(() => {
    if (!panelOpen) return undefined

    const handlePointerDown = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setPanelOpen(false)
      }
    }
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setPanelOpen(false)
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [panelOpen])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try {
        await audio.play()
      } catch {
        setPlaying(false)
      }
    } else {
      audio.pause()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 sm:bottom-6 sm:right-6">
      <audio
        ref={audioRef}
        src={music.src}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />

      <div
        ref={panelRef}
        className="relative flex items-center gap-1 rounded-full border border-rose/25 bg-paper/90 p-1.5 pl-1.5 shadow-[0_16px_40px_-18px_rgba(72,29,43,0.45)] backdrop-blur-md"
      >
        <button
          type="button"
          onClick={togglePlay}
          aria-label={playing ? 'Pause our little song' : 'Play our little song'}
          aria-pressed={playing}
          className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose to-rose-deep text-cream shadow-[0_8px_20px_-8px_rgba(212,99,125,0.9)] transition hover:scale-105 active:scale-95"
        >
          {playing ? (
            <Pause className="h-4 w-4 fill-cream" strokeWidth={1.5} />
          ) : (
            <Play className="ml-0.5 h-4 w-4 fill-cream" strokeWidth={1.5} />
          )}
          {playing && (
            <span
              aria-hidden="true"
              className="absolute inset-0 animate-ping rounded-full border border-rose/40 [animation-duration:2.4s] motion-reduce:animate-none"
            />
          )}
        </button>

        <div className="hidden min-w-0 pr-1 sm:block">
          <p className="font-hand text-[1.15rem] leading-none text-maroon/80">
            {music.title}
          </p>
          <div className="mt-1 flex items-end gap-[3px] text-rose/70" aria-hidden="true">
            <span
              className={`eq-bar ${playing ? '' : 'opacity-30'}`}
              style={{ animationDelay: '0s', height: '9px' }}
            />
            <span
              className={`eq-bar ${playing ? '' : 'opacity-30'}`}
              style={{ animationDelay: '0.18s', height: '12px' }}
            />
            <span
              className={`eq-bar ${playing ? '' : 'opacity-30'}`}
              style={{ animationDelay: '0.34s', height: '7px' }}
            />
            <span className="ml-1 text-[0.5rem] uppercase tracking-[0.18em] text-ink/30">
              {playing ? 'playing' : 'tap to play'}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setPanelOpen((open) => !open)}
          aria-label="Music volume"
          aria-expanded={panelOpen}
          aria-controls="music-volume-panel"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-maroon/55 transition hover:bg-blush/60 hover:text-maroon"
        >
          {volume === 0 ? (
            <VolumeX className="h-4 w-4" />
          ) : (
            <Volume2 className="h-4 w-4" />
          )}
        </button>

        <AnimatePresence>
          {panelOpen && (
            <motion.div
              id="music-volume-panel"
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full right-0 mb-2 w-48 rounded-2xl border border-rose/20 bg-paper/95 p-4 shadow-card backdrop-blur-md"
            >
              <div className="flex items-center justify-between">
                <span className="text-[0.55rem] uppercase tracking-[0.24em] text-ink/40">
                  volume
                </span>
                <span className="font-hand text-base text-maroon/60">
                  {Math.round(volume * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={(event) => setVolume(Number(event.target.value))}
                className="volume-slider mt-3"
                aria-label="Music volume"
              />
              <p className="mt-2 font-hand text-sm text-ink/35">{music.note}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
