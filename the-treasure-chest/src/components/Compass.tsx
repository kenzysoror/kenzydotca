import { useNavigate } from "react-router-dom"
import compassIcon from "../assets/images/icons/compass.png"

export default function Compass() {
  const navigate = useNavigate()

  return (
    <button
      className="compass"
      onClick={() => navigate("/")}
      aria-label="Back to map"
    >
      <img src={compassIcon} alt="" />
    </button>
  )
}
