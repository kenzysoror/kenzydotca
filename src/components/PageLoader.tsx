import compassIcon from '../assets/images/icons/compass.png'
import '../css/loader.css'

type PageLoaderProps = {
  message: string
  fading?: boolean
}

export default function PageLoader({ message, fading }: PageLoaderProps) {
  return (
    <div className={`page-loader${fading ? ' page-loader-exit' : ''}`}>
      <div className="loader-paper" />
      <div className="loader-content">
        <img src={compassIcon} alt="" className="loader-compass" aria-hidden="true" />
        <p className="loader-text">{message}</p>
      </div>
    </div>
  )
}
