import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const sampleRate = 32000
const bpm = 80
const secondsPerBeat = 60 / bpm
const barDuration = secondsPerBeat * 4
const bars = 16
const duration = barDuration * bars
const totalSamples = Math.ceil(duration * sampleRate)

const chords = [
  [65, 69, 72, 76],
  [67, 71, 74, 77],
  [64, 67, 71, 74],
  [69, 72, 76, 79],
  [62, 65, 69, 72],
  [67, 71, 74, 77],
  [60, 64, 67, 71],
  [60, 64, 67, 71],
  [65, 69, 72, 76],
  [67, 71, 74, 77],
  [64, 67, 71, 74],
  [69, 72, 76, 79],
  [62, 65, 69, 72],
  [67, 71, 74, 77],
  [60, 64, 67, 71],
  [60, 64, 67, 71],
]

const pad = new Float32Array(totalSamples)
const bass = new Float32Array(totalSamples)
const bells = new Float32Array(totalSamples)

const midiToFreq = (midi) => 440 * 2 ** ((midi - 69) / 12)

function addTone(target, start, length, frequency, gain, options = {}) {
  const {
    attack = 0.02,
    release = 0.3,
    decay = null,
    vibratoRate = 0,
    vibratoDepth = 0,
  } = options
  const startSample = Math.max(0, Math.floor(start * sampleRate))
  const endSample = Math.min(
    totalSamples,
    Math.ceil((start + length) * sampleRate),
  )
  for (let i = startSample; i < endSample; i += 1) {
    const t = (i - startSample) / sampleRate
    let envelope
    if (decay) {
      envelope = Math.exp(-t / decay)
    } else {
      const attackGain = Math.min(1, t / attack)
      const releaseGain = Math.min(1, (length - t) / release)
      envelope = Math.max(0, Math.min(attackGain, releaseGain))
    }
    const vibrato =
      vibratoRate > 0 ? Math.sin(2 * Math.PI * vibratoRate * t) * vibratoDepth : 0
    const phase = 2 * Math.PI * frequency * (t + vibrato)
    target[i] += Math.sin(phase) * gain * envelope
  }
}

function addPadNote(start, length, frequency, gain) {
  addTone(pad, start, length, frequency, gain, {
    attack: 0.7,
    release: 1.1,
  })
  addTone(pad, start, length, frequency * 1.0012, gain * 0.7, {
    attack: 0.9,
    release: 1.3,
  })
}

function addBell(start, frequency, gain) {
  addTone(bells, start, 1.6, frequency, gain, {
    attack: 0.006,
    decay: 0.55,
  })
  addTone(bells, start, 1.2, frequency * 2, gain * 0.28, {
    attack: 0.004,
    decay: 0.34,
  })
  addTone(bells, start, 0.9, frequency * 3.01, gain * 0.1, {
    attack: 0.003,
    decay: 0.22,
  })
}

function addBassNote(start, length, frequency, gain) {
  addTone(bass, start, length, frequency, gain, {
    attack: 0.03,
    release: 0.4,
  })
  addTone(bass, start, length, frequency * 2, gain * 0.18, {
    attack: 0.03,
    release: 0.35,
  })
}

for (let bar = 0; bar < bars; bar += 1) {
  const barStart = bar * barDuration
  const chord = chords[bar]

  chord.forEach((midi, index) => {
    addPadNote(
      barStart + index * 0.02,
      barDuration + 0.8,
      midiToFreq(midi - 12),
      0.026,
    )
  })

  const root = chord[0] - 24
  addBassNote(barStart, barDuration * 0.52, midiToFreq(root), 0.055)
  addBassNote(
    barStart + barDuration * 0.56,
    barDuration * 0.42,
    midiToFreq(root),
    0.04,
  )

  const pattern = [0, 1, 2, 3, 2, 1, 2, 3]
  pattern.forEach((chordIndex, step) => {
    const note = chord[chordIndex] + 12
    const start = barStart + step * (secondsPerBeat / 2)
    const accent = step === 0 ? 1 : step === 4 ? 0.86 : 0.68
    addBell(start, midiToFreq(note), 0.05 * accent)
  })

  if (bar % 2 === 0) {
    const sparkleNote = chord[(bar / 2) % chord.length] + 24
    addBell(barStart + barDuration * 0.25, midiToFreq(sparkleNote), 0.018)
  }
}

const bellEcho = new Float32Array(totalSamples)
const echoes = [
  [0.375, 0.34],
  [0.75, 0.19],
  [1.125, 0.1],
  [1.5, 0.055],
]
for (const [delay, gain] of echoes) {
  const offset = Math.floor(delay * sampleRate)
  for (let i = 0; i < totalSamples; i += 1) {
    const source = i - offset
    if (source >= 0) bellEcho[i] += bells[source] * gain
  }
}

const padEcho = new Float32Array(totalSamples)
for (const [delay, gain] of [
  [0.62, 0.13],
  [1.24, 0.06],
]) {
  const offset = Math.floor(delay * sampleRate)
  for (let i = 0; i < totalSamples; i += 1) {
    const source = i - offset
    if (source >= 0) padEcho[i] += pad[source] * gain
  }
}

const mix = new Float32Array(totalSamples)
let peak = 0
for (let i = 0; i < totalSamples; i += 1) {
  const value =
    pad[i] * 0.85 + padEcho[i] + bass[i] * 1.05 + bells[i] * 0.9 + bellEcho[i]
  mix[i] = value
  const absolute = Math.abs(value)
  if (absolute > peak) peak = absolute
}

const normalization = peak > 0 ? 0.74 / peak : 1
const fadeSamples = Math.floor(0.06 * sampleRate)
for (let i = 0; i < totalSamples; i += 1) {
  let value = mix[i] * normalization
  if (i < fadeSamples) value *= i / fadeSamples
  if (i > totalSamples - fadeSamples) {
    value *= (totalSamples - i) / fadeSamples
  }
  mix[i] = Math.max(-1, Math.min(1, value))
}

const dataSize = totalSamples * 2
const buffer = Buffer.alloc(44 + dataSize)
buffer.write('RIFF', 0)
buffer.writeUInt32LE(36 + dataSize, 4)
buffer.write('WAVE', 8)
buffer.write('fmt ', 12)
buffer.writeUInt32LE(16, 16)
buffer.writeUInt16LE(1, 20)
buffer.writeUInt16LE(1, 22)
buffer.writeUInt32LE(sampleRate, 24)
buffer.writeUInt32LE(sampleRate * 2, 28)
buffer.writeUInt16LE(2, 32)
buffer.writeUInt16LE(16, 34)
buffer.write('data', 36)
buffer.writeUInt32LE(dataSize, 40)

for (let i = 0; i < totalSamples; i += 1) {
  buffer.writeInt16LE(Math.round(mix[i] * 32767), 44 + i * 2)
}

const outputDir = path.join(__dirname, '..', 'public', 'audio')
fs.mkdirSync(outputDir, { recursive: true })
const outputPath = path.join(outputDir, 'soft-romance.wav')
fs.writeFileSync(outputPath, buffer)

const seconds = (totalSamples / sampleRate).toFixed(2)
console.log(`Wrote ${outputPath} (${seconds}s, ${(buffer.length / 1024 / 1024).toFixed(2)} MB, peak ${peak.toFixed(3)})`)
