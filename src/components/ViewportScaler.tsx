import React, { useEffect } from 'react'

type Base = { width: number; height: number }

/**
 * Sets fixed design baseline on mount
 */
function useDesignBase() {
  useEffect(() => {
    const DESIGN_WIDTH = 1920
    const DESIGN_HEIGHT = 850
    
    const base: Base = { width: DESIGN_WIDTH, height: DESIGN_HEIGHT }

    // Set CSS custom properties
    const root = document.documentElement
    root.style.setProperty('--design-width', String(base.width))
    root.style.setProperty('--design-height', String(base.height))
    root.style.setProperty('--scale', '1')

    // Force initial resize
    window.getComputedStyle(root).width
    window.dispatchEvent(new Event('resize'))
    window.dispatchEvent(new Event('viewport-resize'))

    function onResize() {
      window.dispatchEvent(new Event('viewport-resize'))
    }

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
}

/**
 * Scales the site frame to match how the background image is scaled
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
        const base: Base = { width: 1920, height: 750 }
        const fallbackScale = Math.min(window.innerWidth / base.width, window.innerHeight / base.height)
        document.documentElement.style.setProperty('--scale', String(fallbackScale))
        return
      }

      const url = m[1]
      const imgSize = await loadImageSize(url)
      if (!imgSize) return

      // Fixed design baseline
      const base: Base = { width: 1920, height: 750 }
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
