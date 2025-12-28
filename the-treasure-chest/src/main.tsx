import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './css/viewport-scale.css'
import App from './App.tsx'
import ViewportScaler from './components/ViewportScaler'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ViewportScaler>
      <App />
    </ViewportScaler>
  </StrictMode>,
)
