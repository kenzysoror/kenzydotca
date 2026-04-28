import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useImagesLoaded } from '../hooks/useImagesLoaded'
import { useFontsLoaded } from '../hooks/useFontsLoaded'
import { useLoader } from '../hooks/useLoader'
import PageLoader from '../components/PageLoader'
import '../css/general.css'
import '../css/compass.css'
import '../css/about.css'
import sandImg from '../assets/images/backgrounds/sand.png'
import portraitImg from '../assets/images/drawings/portrait.png'
import Compass from '../components/Compass'
import ParticleFall from '../components/ParticleFall'

const UNIVERSITY_LINKS = {
  uw: 'https://cs.uwaterloo.ca/',
  wlu: 'https://www.wlu.ca/academics/faculties/lazaridis-school-of-business-and-economics/index.html',
}

function About() {
  const navigate = useNavigate()
  const [exiting, setExiting] = useState(false)
  const imagesLoaded = useImagesLoaded([sandImg, portraitImg], 1500)
  const fontsLoaded = useFontsLoaded()
  const loaded = imagesLoaded && fontsLoaded
  const { showLoader, loaderFading } = useLoader(loaded)

  const goHome = () => {
    setExiting(true)
    setTimeout(() => navigate('/'), 400)
  }

  const pageClass = !loaded ? 'page-loading' : exiting ? 'page-exit' : 'page-reveal'

  return (
    <>
      {showLoader && <PageLoader message="Reading the stars..." fading={loaderFading} />}
      <div
        className={`page about-page ${pageClass}`}
        style={{ backgroundImage: `url(${sandImg})` }}
      >
      <ParticleFall />
      <Compass onNavigate={goHome} />

      <div className="about-content">
        <div className="about-text">
          <img
            src={portraitImg}
            alt="Kenzy portrait"
            className="about-portrait"
          />
          <p>
            Hello, fellow explorer! My name is Kenzy (pronounced "Kin"zy). I'm a
            Double-Degree student studying Computer Science at the{' '}
            <a
              href={UNIVERSITY_LINKS.uw}
              target="_blank"
              rel="noopener noreferrer"
            >
              University of Waterloo
            </a>{' '}
            and Business Administration at{' '}
            <a
              href={UNIVERSITY_LINKS.wlu}
              target="_blank"
              rel="noopener noreferrer"
            >
              Wilfrid Laurier University
            </a>
            .
          </p>

          <p>
            Commitment, curiosity, and community-oriented empathy are the
            principles that guide me in my pursuit of enacting positive change.
          </p>

          <p>
            I care deeply about building solutions, systems, and spaces that are
            thoughtful, human-centered, and grounded in a real understanding of
            the causes they exist to serve.
          </p>

          <p>
            In my free time, I love losing myself in stories that stir the soul,
            learning as many instruments as I can get my hands on, and eagerly
            sharing the latest cinematic masterpiece I've come across with
            anyone willing to listen!
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default About
