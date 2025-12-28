import pinImg from '../assets/images/icons/pin.png'

type MediaCardProps = {
  image: string
  link: string
  alt: string
  style?: React.CSSProperties
}

export default function MediaCard({
  image,
  link,
  alt,
  style
}: MediaCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="media-card"
      style={style}
    >
      <div className="media-paper">
        <img src={image} alt={alt} className="media-image" />
      </div>
      <img src={pinImg} alt="" className="media-pin" aria-hidden="true" />
    </a>
  )
}
