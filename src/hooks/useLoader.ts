import { useState, useEffect, useRef } from 'react'

export function useLoader(loaded: boolean): { showLoader: boolean; loaderFading: boolean } {
  // If images were already cached on mount, skip the loader entirely
  const wasInstant = useRef(loaded)
  const [loaderHidden, setLoaderHidden] = useState(wasInstant.current)

  useEffect(() => {
    if (!loaded || wasInstant.current) return
    // Keep loader mounted for its fade-out duration, then remove it
    const t = setTimeout(() => setLoaderHidden(true), 450)
    return () => clearTimeout(t)
  }, [loaded])

  return {
    showLoader: !loaderHidden,
    loaderFading: loaded && !loaderHidden,
  }
}
