import { useNavigate } from "react-router-dom"
import compassIcon from "../assets/images/icons/compass.png"

export default function Compass() {
  const navigate = useNavigate()

  return (
    <div className="compass-root">
      <button
        className="compass-toggle"
        type="button"
        onClick={() => navigate("/")}
        aria-label="Back to map"
      >
        <img 
          src={compassIcon} 
          alt="Compass" 
          className="compass-icon" 
        />
      </button>
    </div>
  )
}
