import compassIcon from "../assets/images/icons/compass.png"

type CompassProps = {
  onNavigate: () => void
}

export default function Compass({ onNavigate }: CompassProps) {
  return (
    <div className="compass-root">
      <button
        className="compass-toggle"
        type="button"
        onClick={onNavigate}
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
