import { useState, useEffect, useRef } from 'react'

export function useImagesLoaded(srcs: string[], minMs = 0): boolean {
  const srcsRef = useRef(srcs)
  const allCachedRef = useRef(
    srcs.every(src => {
      const img = new Image()
      img.src = src
      return img.complete && img.naturalWidth > 0
    })
  )

  const [ready, setReady] = useState(allCachedRef.current)

  useEffect(() => {
    if (allCachedRef.current) return

    let cancelled = false
    let imagesLoaded = false
    let timerDone = minMs === 0

    const trySetReady = () => {
      if (imagesLoaded && timerDone && !cancelled) setReady(true)
    }

    let remaining = srcsRef.current.length
    const onImageDone = () => {
      remaining -= 1
      if (remaining === 0) {
        imagesLoaded = true
        trySetReady()
      }
    }

    srcsRef.current.forEach(src => {
      const img = new Image()
      img.src = src
      if (img.complete) onImageDone()
      else {
        img.onload = onImageDone
        img.onerror = onImageDone
      }
    })

    const timer = minMs > 0 ? setTimeout(() => {
      timerDone = true
      trySetReady()
    }, minMs) : null

    return () => {
      cancelled = true
      if (timer !== null) clearTimeout(timer)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return ready
}
