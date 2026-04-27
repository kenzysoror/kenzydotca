import { useState, useEffect } from 'react'

export function useFontsLoaded(): boolean {
  const [ready, setReady] = useState(() => document.fonts.status === 'loaded')

  useEffect(() => {
    if (document.fonts.status === 'loaded') return
    let cancelled = false
    document.fonts.ready.then(() => {
      if (!cancelled) setReady(true)
    })
    return () => { cancelled = true }
  }, [])

  return ready
}
