import { useNavigate } from 'react-router-dom'
import '../css/styles.css'
import shipImg from '../assets/images/backgrounds/ship.png'

function News() {
  const navigate = useNavigate()

  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${shipImg})` }}
    >
      {/* Compass */}
      <button className="compass" onClick={() => navigate('/')}>
        🧭
      </button>

      {/* Placeholder for cards */}
      <div className="overlay">
        <h1>News</h1>
        <p>Cards.</p>
      </div>
    </div>
  )
}

export default News
