import { useEffect, useRef } from 'react'

const COUNT = 55
const COLORS = [
  'rgba(139, 90, 43,',
  'rgba(160, 110, 55,',
  'rgba(120, 75, 30,',
  'rgba(185, 145, 75,',
]

type Particle = {
  x: number
  y: number
  r: number
  vx: number
  vy: number
  alpha: number
  phase: number
  freq: number
  color: string
}

function make(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: 1.2 + Math.random() * 2.2,
    vx: (Math.random() - 0.5) * 0.25,
    vy: 12 + Math.random() * 30,
    alpha: 0.30 + Math.random() * 0.45,
    phase: Math.random() * Math.PI * 2,
    freq: 0.4 + Math.random() * 0.8,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }
}

export default function ParticleFall() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: Particle[] = Array.from({ length: COUNT }, () =>
      make(canvas.width, canvas.height)
    )

    let lastTs = 0
    let rafId: number

    const draw = (ts: number) => {
      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0
      lastTs = ts

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const p of particles) {
        p.phase += p.freq * dt
        p.x += p.vx + Math.sin(p.phase) * 0.35
        p.y += p.vy * dt

        if (p.y > canvas.height + 8) {
          p.y = -8
          p.x = Math.random() * canvas.width
          p.phase = Math.random() * Math.PI * 2
        }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `${p.color} ${p.alpha})`
        ctx.fill()
      }

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10000,
      }}
    />
  )
}
