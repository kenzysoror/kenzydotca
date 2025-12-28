import { useNavigate } from "react-router-dom"
import "../css/general.css"
import "../css/map-buttons.css"
import "../css/map-icons.css"

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

const MAP_ITEMS = [
  {
    id: "about",
    label: "About Me",
    icon: aboutIcon,
    type: "internal",
    target: "/about",
    style: { top: "28%", left: "30%" },
  },
  {
    id: "media",
    label: "In the Media",
    icon: mediaIcon,
    type: "internal",
    target: "/media",
    style: { top: "70%", left: "70%" },
  },
  {
    id: "instagram",
    label: "Instagram",
    icon: instagramIcon,
    type: "external",
    target: SOCIAL_LINKS.instagram,
    style: { top: "14%", left: "52%" },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    icon: linkedinIcon,
    type: "external",
    target: SOCIAL_LINKS.linkedin,
    style: { top: "52%", left: "42%" },
  },
  {
    id: "x",
    label: "X",
    icon: xIcon,
    type: "external",
    target: SOCIAL_LINKS.x,
    style: { top: "30%", left: "80%" },
  },
  {
    id: "youtube",
    label: "YouTube",
    icon: youtubeIcon,
    type: "external",
    target: SOCIAL_LINKS.youtube,
    style: { top: "83%", left: "45%" },
  },
  {
    id: "github",
    label: "GitHub",
    icon: githubIcon,
    type: "external",
    target: SOCIAL_LINKS.github,
    style: { top: "65%", left: "22%" },
  },
  {
    id: "substack",
    label: "Substack",
    icon: substackIcon,
    type: "external",
    target: SOCIAL_LINKS.substack,
    style: { top: "39%", left: "63%" },
  },
]

type MapItem = typeof MAP_ITEMS[number]

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
    <div
      className="page map-page"
      style={{ backgroundImage: `url(${mapBg})` }}
    >
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
  )
}
