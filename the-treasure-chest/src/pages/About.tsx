import '../css/styles.css'
import sandImg from '../assets/images/backgrounds/sand.png'
import portraitImg from '../assets/images/portrait.png'
import chestImg from '../assets/images/icons/chest.png'
import Compass from '../components/Compass'

// --- Links for university pages ---
const UNIVERSITY_LINKS = {
  uw: 'https://cs.uwaterloo.ca/',
  laurier: 'https://www.wlu.ca/academics/faculties/lazaridis-school-of-business-and-economics/index.html'
}

function About() {
  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${sandImg})` }}
    >
      <Compass />

      {/* Text boxes */}
      <div className="book-text book-left">
        <img
          src={chestImg}
          alt="Treasure chest icon"
          className="about-chest"
        />
        
        <p>
          Hello, fellow explorer! My name is Kenzy (pronounced “Kin”zy). I’m a Double-Degree student studying Computer Science at the{' '}
          <a href={UNIVERSITY_LINKS.uw} target="_blank" rel="noopener noreferrer">University of Waterloo</a> 
          {' '} and Business Administration at{' '}
          <a href={UNIVERSITY_LINKS.laurier} target="_blank" rel="noopener noreferrer">Wilfrid Laurier University</a>.
        </p>

        <p>
          Commitment, curiosity, and community-oriented empathy are the principles that guide me in my pursuit of enacting positive change.
        </p>
      </div>

      <div className="book-text book-right">
        <p>
          I care deeply about building solutions, systems, and spaces that are thoughtful, human-centered, and grounded in a real understanding of the causes they exist to serve.
        </p>
        <p>
          In my free time, I love losing myself in stories that stir the soul, learning as many instruments as I can get my hands on, and eagerly sharing the latest cinematic masterpiece I’ve come across with anyone willing to listen!
        </p>

        <img
          src={portraitImg}
          alt="Kenzy portrait"
          className="about-portrait"
        />
      </div>
    </div>
  )
}

export default About
