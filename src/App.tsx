import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Media from './pages/Media'

function App() {
  return (
    <BrowserRouter basename="/kenzydotca/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/media" element={<Media />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
