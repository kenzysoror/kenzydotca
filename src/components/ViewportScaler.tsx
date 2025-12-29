import React, { useEffect } from 'react'

const STORAGE_KEY = 'designViewport'

type Base = { width: number; height: number }

/**
 * Captures and persists the original design viewport size.
 * This establishes a stable baseline used for scaling content.
 */
function useDesignBase() {
  useEffect(() => {
    let base: Base | null = null

    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      base = saved ? (JSON.parse(saved) as Base) : null
    } catch (e) {
      base = null
    }

    // If no baseline exists, store the current viewport as the design baseline
    if (!base) {
      base = { width: window.innerWidth, height: window.innerHeight }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(base))
      } catch (e) {
        // Ignore storage failures
      }
    }

    // Expose design dimensions and initialize scale
    document.documentElement.style.setProperty('--design-width', String(base.width))
    document.documentElement.style.setProperty('--design-height', String(base.height))
    document.documentElement.style.setProperty('--scale', '1')

    // Notify listeners that the viewport has changed
    function onResize() {
      window.dispatchEvent(new Event('viewport-resize'))
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
}

/**
 * Scales the site frame to match how the background image is scaled,
 * ensuring layout proportions remain consistent across viewport sizes.
 */
export default function ViewportScaler({ children }: { children: React.ReactNode }) {
  useDesignBase()

  React.useEffect(() => {
    const viewport = document.querySelector('.site-viewport') as HTMLElement | null
    const frame = document.querySelector('.site-frame') as HTMLElement | null
    if (!viewport || !frame) return
    const viewportEl = viewport
    const frameEl = frame

    let cachedImg: { w: number; h: number } | null = null

    // Load and cache the intrinsic size of the background image
    async function loadImageSize(url: string) {
      try {
        if (cachedImg) return cachedImg
        const img = new Image()
        await new Promise((resolve, reject) => {
          img.onload = () => resolve(true)
          img.onerror = () => reject()
          img.src = url
        })
        cachedImg = { w: img.naturalWidth, h: img.naturalHeight }
        return cachedImg
      } catch (e) {
        return null
      }
    }

    async function syncBackgroundAndScale() {
      const page = frameEl.querySelector('.page') as HTMLElement | null
      if (!page) return
      const computed = window.getComputedStyle(page)
      const bg = computed.backgroundImage || ''

      // Mirror the page background onto the viewport so it fills the screen
      if (bg && bg !== 'none') {
        viewportEl.style.backgroundImage = bg
        viewportEl.style.backgroundSize = 'cover'
        viewportEl.style.backgroundPosition = 'center'
        viewportEl.style.backgroundRepeat = 'no-repeat'

      } else {
        viewportEl.style.backgroundImage = ''
      }

      // Extract image URL from background-image
      const m = bg.match(/url\((?:"|')?(.*?)(?:"|')?\)/)
      if (!m || !m[1]) {
        // Fallback scaling based on viewport vs design size
        const baseRaw = localStorage.getItem(STORAGE_KEY)
        const base = baseRaw ? (JSON.parse(baseRaw) as Base) : { width: window.innerWidth, height: window.innerHeight }
        const fallbackScale = Math.min(window.innerWidth / base.width, window.innerHeight / base.height)
        document.documentElement.style.setProperty('--scale', String(fallbackScale))
        return
      }

      const url = m[1]
      const imgSize = await loadImageSize(url)
      if (!imgSize) return

      const baseRaw = localStorage.getItem(STORAGE_KEY)
      const base = baseRaw ? (JSON.parse(baseRaw) as Base) : { width: window.innerWidth, height: window.innerHeight }

      const vw = window.innerWidth
      const vh = window.innerHeight

      // Compute how the background image scales when using `cover`
      const bgScaleCurrent = Math.max(vw / imgSize.w, vh / imgSize.h)
      const bgScaleDesign = Math.max(base.width / imgSize.w, base.height / imgSize.h)

      // Match content scale to background scale ratio
      const desiredScale = bgScaleDesign > 0 ? bgScaleCurrent / bgScaleDesign : 1

      // Clamp scale so the frame always fits within the viewport
      const fitScale = Math.min(vw / base.width, vh / base.height)
      const finalScale = Math.min(desiredScale, fitScale)

      document.documentElement.style.setProperty('--scale', String(finalScale))
    }

    // Initial calculation
    syncBackgroundAndScale()

    // Recalculate on resize and layout changes
    window.addEventListener('viewport-resize', syncBackgroundAndScale)

    const observer = new MutationObserver(() => syncBackgroundAndScale())
    const pageEl = frameEl.querySelector('.page')
    if (pageEl) observer.observe(pageEl, { attributes: true, attributeFilter: ['style', 'class'] })

    const bodyObserver = new MutationObserver(() => syncBackgroundAndScale())
    bodyObserver.observe(frameEl, { childList: true })

    return () => {
      observer.disconnect()
      bodyObserver.disconnect()
      window.removeEventListener('viewport-resize', syncBackgroundAndScale)
    }
  }, [])

  return (
    <div className="site-viewport">
      <div className="site-frame">{children}</div>
    </div>
  )
}
