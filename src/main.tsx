import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/viewport-scale.css'
import './css/audio.css'
import App from './App.tsx'
import ViewportScaler from './components/ViewportScaler'
import GlobalAudio from './components/GlobalAudio'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewportScaler>
      <GlobalAudio />
      <App />
    </ViewportScaler>
  </StrictMode>,
)
