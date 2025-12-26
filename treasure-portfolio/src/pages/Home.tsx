import { useNavigate } from 'react-router-dom'
import '../css/styles.css'
import mapImg from '../assets/images/backgrounds/map.png'

function Home() {
  const navigate = useNavigate()

  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${mapImg})` }}
    >
      {/* Placeholder for icons */}
      <button className="map-button about" onClick={() => navigate('/about')}>
        About
      </button>

      <button className="map-button news" onClick={() => navigate('/news')}>
        News
      </button>
    </div>
  )
}

export default Home
