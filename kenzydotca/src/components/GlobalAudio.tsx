import { useEffect, useRef, useState } from 'react'
import ocean from '../assets/audio/ocean.mp3'
import mutedIcon from '../assets/images/icons/muted.png'
import unmutedIcon from '../assets/images/icons/unmuted.png'
import '../css/audio.css'

const STORAGE_KEY = 'audioMuted'

export default function GlobalAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Always start muted on load to avoid autoplay desync
  const [muted, setMuted] = useState<boolean>(true)

  // Track whether playback is currently allowed
  const [available, setAvailable] = useState<boolean>(true)

  useEffect(() => {
    // Force muted on every fresh load
    try {
      localStorage.setItem(STORAGE_KEY, 'true')
    } catch {}

    const audio = new Audio(ocean)
    audio.loop = true
    audio.volume = 0.5
    audio.muted = true
    audioRef.current = audio

    audio
      .play()
      .then(() => setAvailable(true))
      .catch(() => setAvailable(false))

    return () => {
      try {
        audio.pause()
        audioRef.current = null
      } catch {}
    }
  }, [])

  // Sync muted state to audio + storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? 'true' : 'false')
    } catch {}

    if (!audioRef.current) return

    audioRef.current.muted = muted

    if (!muted) {
      audioRef.current
        .play()
        .then(() => setAvailable(true))
        .catch(() => setAvailable(false))
    }
  }, [muted])

  function toggle() {
    setMuted((m) => !m)

    if (!available && audioRef.current && muted) {
      audioRef.current
        .play()
        .then(() => setAvailable(true))
        .catch(() => setAvailable(false))
    }
  }

  return (
    <div className="audio-root">
      <button
        className="audio-toggle"
        onClick={toggle}
        aria-pressed={muted}
        aria-label={muted ? 'Unmute ambient audio' : 'Mute ambient audio'}
        title={muted ? 'Unmute' : 'Mute'}
      >
        <img
          src={muted ? mutedIcon : unmutedIcon}
          alt=""
          className="audio-icon"
          aria-hidden="true"
        />
      </button>
    </div>
  )
}
