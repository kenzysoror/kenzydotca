import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/audio.css'
import App from './App.tsx'
import GlobalAudio from './components/GlobalAudio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GlobalAudio />
    <App />
  </StrictMode>,
)
