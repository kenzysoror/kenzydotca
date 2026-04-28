import { useEffect, useRef } from 'react'
import cursorSrc from '../assets/images/icons/cursor.png'
import hoverSrc  from '../assets/images/icons/hover.png'

// Hotspot offset: fingertip is at (4,1) in both images
const CURSOR_W = 24
const CURSOR_H = 40
const HOVER_W  = 32
const HOVER_H  = 52
const HOT_X    = 4
const HOT_Y    = 1

export default function CustomCursor() {
  const divRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const div = divRef.current
    const img = imgRef.current
    if (!div || !img) return

    const mql = window.matchMedia('(pointer: coarse)')
    let isCoarse = mql.matches
    let hovering = false

    const onPointerChange = (e: MediaQueryListEvent) => {
      isCoarse = e.matches
      if (isCoarse) div.style.opacity = '0'
    }
    mql.addEventListener('change', onPointerChange)

    const update = (x: number, y: number, over: boolean) => {
      div.style.transform = `translate(${x - HOT_X}px, ${y - HOT_Y}px)`
      if (over !== hovering) {
        hovering = over
        img.src          = over ? hoverSrc : cursorSrc
        img.style.width  = over ? `${HOVER_W}px` : `${CURSOR_W}px`
        img.style.height = over ? `${HOVER_H}px` : `${CURSOR_H}px`
      }
    }

    const onMove = (e: MouseEvent) => {
      if (isCoarse) return
      div.style.opacity = '1'
      const el = e.target as Element
      update(e.clientX, e.clientY, !!el.closest('a, button, .map-icon'))
    }

    const onLeave = () => { div.style.opacity = '0' }

    document.addEventListener('mousemove',  onMove)
    document.addEventListener('mouseleave', onLeave)

    return () => {
      document.removeEventListener('mousemove',  onMove)
      document.removeEventListener('mouseleave', onLeave)
      mql.removeEventListener('change', onPointerChange)
    }
  }, [])

  return (
    <div
      ref={divRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 999999,
        opacity: 0,
        willChange: 'transform',
      }}
    >
      <img
        ref={imgRef}
        src={cursorSrc}
        alt=""
        style={{ width: CURSOR_W, height: CURSOR_H, display: 'block' }}
      />
    </div>
  )
}
