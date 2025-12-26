import { useNavigate } from 'react-router-dom'
import '../css/styles.css'
import sandImg from '../assets/images/backgrounds/sand.png'

function About() {
  const navigate = useNavigate()

  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${sandImg})` }}
    >
      {/* Compass */}
      <button className="compass" onClick={() => navigate('/')}>
        🧭
      </button>

      {/* Placeholder for text overlay */}
      <div className="overlay">
        <h1>About</h1>
        <p>Text.</p>
      </div>
    </div>
  )
}

export default About
