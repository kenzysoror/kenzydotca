import { useEffect, useRef } from 'react'
import leftPrintSrc  from '../assets/images/icons/left-print.png'
import rightPrintSrc from '../assets/images/icons/right-print.png'

const TRAIL_MS        = 1500
const PEN_SPEED       = 300            // px/s — pen chases cursor at this speed
const STEP_SPACING    = 32             // px between footstep centres
const SIDE_OFFSET     = 11             // px each foot is offset from the path centre
const INWARD_ANGLE    = Math.PI / 10   // 18° inward toe rotation per foot
const MAX_FOOT_PX     = 30             // longest dimension of each footprint image
const IMG_ANGLE_OFFSET = Math.PI / 2   // rotate so toe points forward (assumes toe-up PNG)

const TINT = '#800000'  // same as .map-label

type FootImg = { el: HTMLCanvasElement; w: number; h: number }
type Step    = { x: number; y: number; t: number; nx: number; ny: number; side: 1 | -1 }

function tintImage(src: HTMLImageElement): HTMLCanvasElement {
  const oc = document.createElement('canvas')
  oc.width  = src.naturalWidth
  oc.height = src.naturalHeight
  const ctx = oc.getContext('2d')!
  ctx.drawImage(src, 0, 0)
  ctx.globalCompositeOperation = 'source-in'
  ctx.fillStyle = TINT
  ctx.fillRect(0, 0, oc.width, oc.height)
  return oc
}

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Load foot images
    let leftFoot:  FootImg | null = null
    let rightFoot: FootImg | null = null

    const loadFoot = (src: string, onDone: (fi: FootImg) => void) => {
      const img = new Image()
      img.onload = () => {
        const scale = MAX_FOOT_PX / Math.max(img.naturalWidth, img.naturalHeight)
        onDone({ el: tintImage(img), w: img.naturalWidth * scale, h: img.naturalHeight * scale })
      }
      img.src = src
    }
    loadFoot(leftPrintSrc,  fi => { leftFoot  = fi })
    loadFoot(rightPrintSrc, fi => { rightFoot = fi })

    let cursorX = 0, cursorY = 0
    let penX = 0, penY = 0
    let penNX = 1, penNY = 0
    let penReady = false
    let lastTs = 0
    let nextSide: 1 | -1 = -1   // start with left foot

    const onMouseMove = (e: MouseEvent) => {
      cursorX = e.clientX
      cursorY = e.clientY
      if (!penReady) {
        penX = cursorX
        penY = cursorY
        penReady = true
      }
    }
    window.addEventListener('mousemove', onMouseMove)

    const steps: Step[] = []

    let rafId: number
    const draw = (ts: number) => {
      const dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0
      lastTs = ts

      if (penReady) {
        const dx   = cursorX - penX
        const dy   = cursorY - penY
        const dist = Math.hypot(dx, dy)
        if (dist > 0) {
          penNX = dx / dist
          penNY = dy / dist
          penX += penNX * Math.min(dist, PEN_SPEED * dt)
          penY += penNY * Math.min(dist, PEN_SPEED * dt)

          const last = steps[steps.length - 1]
          if (!last || Math.hypot(penX - last.x, penY - last.y) >= STEP_SPACING) {
            steps.push({ x: penX, y: penY, t: Date.now(), nx: penNX, ny: penNY, side: nextSide })
            nextSide = nextSide === -1 ? 1 : -1
          }
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()
      while (steps.length && now - steps[0].t > TRAIL_MS) steps.shift()

      for (const s of steps) {
        const fi = s.side === -1 ? leftFoot : rightFoot
        if (!fi) continue

        const alpha = Math.max(0, 1 - (now - s.t) / TRAIL_MS)
        const fx    = s.x + (-s.ny) * s.side * SIDE_OFFSET
        const fy    = s.y +   s.nx  * s.side * SIDE_OFFSET
        const angle = Math.atan2(s.ny, s.nx) + IMG_ANGLE_OFFSET - s.side * INWARD_ANGLE

        ctx.save()
        ctx.globalAlpha = alpha
        ctx.translate(fx, fy)
        ctx.rotate(angle)
        ctx.drawImage(fi.el, -fi.w / 2, -fi.h / 2, fi.w, fi.h)
        ctx.restore()
      }

      rafId = requestAnimationFrame(draw)
    }
    rafId = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    />
  )
}
