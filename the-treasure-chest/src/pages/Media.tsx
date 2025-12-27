import '../css/styles.css'
import shipImg from '../assets/images/backgrounds/ship.png'
import Compass from '../components/Compass'

function Media() {
  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${shipImg})` }}
    >
      <Compass />

      {/* Placeholder for cards */}
      <div className="overlay">
        <h1>Media</h1>
      </div>
    </div>
  )
}

export default Media
