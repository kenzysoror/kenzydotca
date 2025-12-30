import { useNavigate } from "react-router-dom"
import "../css/general.css"
import "../css/map.css"

import mapBg from "../assets/images/backgrounds/map.png"

import aboutIcon from "../assets/images/icons/about.png"
import mediaIcon from "../assets/images/icons/media.png"
import instagramIcon from "../assets/images/icons/instagram.png"
import linkedinIcon from "../assets/images/icons/linkedin.png"
import xIcon from "../assets/images/icons/x.png"
import youtubeIcon from "../assets/images/icons/youtube.png"
import githubIcon from "../assets/images/icons/github.png"
import substackIcon from "../assets/images/icons/substack.png"

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/kenzy.soror/",
  linkedin: "https://www.linkedin.com/in/kenzysoror/",
  x: "https://x.com/daKenzySoror",
  youtube: "https://www.youtube.com/@chezkenzy",
  github: "https://github.com/kenzysoror",
  substack: "https://kenzysoror.substack.com/",
}

interface MapItem {
  id: string
  label: string
  icon: string
  type: "internal" | "external"
  target: string
  style: React.CSSProperties
}

const MAP_ITEMS: MapItem[] = [
  { id: "about", label: "About Me", icon: aboutIcon, type: "internal", target: "/about", style: { top: "calc(50% - 23vh)", left: "calc(50% - 26vw)" } },
  { id: "media", label: "In the Media", icon: mediaIcon, type: "internal", target: "/media", style: { top: "calc(50% + 13vh)", left: "calc(50% + 21vw)" } },
  { id: "instagram", label: "Instagram", icon: instagramIcon, type: "external", target: SOCIAL_LINKS.instagram, style: { top: "calc(50% - 35vh)", left: "calc(50% - 1vw)" } },
  { id: "linkedin", label: "LinkedIn", icon: linkedinIcon, type: "external", target: SOCIAL_LINKS.linkedin, style: { top: "calc(50% + 1vw)", left: "calc(50% - 12vw)" } },
  { id: "x", label: "X", icon: xIcon, type: "external", target: SOCIAL_LINKS.x, style: { top: "calc(50% - 24vh)", left: "calc(50% + 30vw)" } },
  { id: "youtube", label: "YouTube", icon: youtubeIcon, type: "external", target: SOCIAL_LINKS.youtube, style: { bottom: "calc(50% - 41vh)", left: "calc(50% + 3vw)" } },
  { id: "github", label: "GitHub", icon: githubIcon, type: "external", target: SOCIAL_LINKS.github, style: { bottom: "calc(50% - 26vh)", left: "calc(50% - 28vw)" } },
  { id: "substack", label: "Substack", icon: substackIcon, type: "external", target: SOCIAL_LINKS.substack, style: { top: "calc(50% - 12vh)", right: "calc(50% - 22vw)" } },
]

export default function Home() {
  const navigate = useNavigate()

  const handleClick = (item: MapItem) => {
    if (item.type === "internal") {
      navigate(item.target)
    } else {
      window.open(item.target, "_blank", "noopener,noreferrer")
    }
  }

  return (
    <div className="page map-page" style={{ backgroundImage: `url(${mapBg})` }}>
      <div className="map-container">
        {MAP_ITEMS.map((item) => (
          <div
            key={item.id}
            className="map-icon"
            style={item.style}
            onClick={() => handleClick(item)}
          >
            <img src={item.icon} alt={item.label} />
            <div className="map-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
