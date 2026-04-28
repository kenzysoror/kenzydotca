import { useRef, useEffect, useCallback } from 'react'

const TRACK_W = 9

export default function ScrollArea({
  children,
  className = '',
  style,
  thumbColor,
  trackColor = 'rgba(25, 18, 10, 0.12)',
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  thumbColor: string
  trackColor?: string
}) {
  const viewRef  = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const thumbRef = useRef<HTMLDivElement>(null)

  const reposition = useCallback(() => {
    const view  = viewRef.current
    const track = trackRef.current
    const thumb = thumbRef.current
    if (!view || !track || !thumb) return

    const ratio   = view.clientHeight / view.scrollHeight
    const visible = ratio < 0.999
    track.style.display = visible ? 'block' : 'none'
    if (!visible) return

    const thumbH = Math.max(ratio * view.clientHeight, 28)
    const thumbT = (view.scrollTop / view.scrollHeight) * view.clientHeight
    thumb.style.height = `${thumbH}px`
    thumb.style.top    = `${thumbT}px`
  }, [])

  useEffect(() => {
    const view = viewRef.current
    if (!view) return
    reposition()
    view.addEventListener('scroll', reposition)
    const ro = new ResizeObserver(reposition)
    ro.observe(view)
    return () => {
      view.removeEventListener('scroll', reposition)
      ro.disconnect()
    }
  }, [reposition])

  const onThumbDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    const view = viewRef.current
    if (!view) return
    const startY      = e.clientY
    const startScroll = view.scrollTop
    const scrollRatio = view.scrollHeight / view.clientHeight
    const onMove = (e: MouseEvent) => {
      view.scrollTop = startScroll + (e.clientY - startY) * scrollRatio
    }
    const onUp = () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
  }, [])

  return (
    <div className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      <div
        ref={viewRef}
        style={{
          maxHeight: 'inherit',
          overflowY: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        {children}
      </div>

      <div
        ref={trackRef}
        style={{
          position: 'absolute',
          right: 2,
          top: 0,
          bottom: 0,
          width: TRACK_W,
          background: trackColor,
          borderRadius: TRACK_W,
          display: 'none',
        }}
      >
        <div
          ref={thumbRef}
          onMouseDown={onThumbDown}
          style={{
            position: 'absolute',
            width: '100%',
            background: thumbColor,
            borderRadius: TRACK_W,
          }}
        />
      </div>
    </div>
  )
}
