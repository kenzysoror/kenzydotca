import '../css/general.css'
import '../css/media-card.css'
import '../css/media-paper.css'
import '../css/media-board.css'
import '../css/media-pin.css'
import '../css/compass.css'
import MediaCard from '../components/MediaCard'
import Compass from '../components/Compass'
import shipImg from '../assets/images/backgrounds/ship.png'

import cbcGrads from '../assets/images/media/cbc-news_waterloo-grads-reflect.png'
import ontarioTodayGrade from '../assets/images/media/cbc-ontario-today_grade-school-year.png'
import wrdsbAddress from '../assets/images/media/wrdsb_last-address.png'
import morningEditionRole from '../assets/images/media/morning-edition-kw_student-trustee-role.png'
import antiHateSmears from '../assets/images/media/anti-hate_smears-threats.png'
import opsbaScholarship from '../assets/images/media/opsba_student-trustee-scholarship.png'
import rogersWOY2023 from '../assets/images/media/rogers_2023-woy.png'
import kyacAwards from '../assets/images/media/kyac_youth-awards.png'
import zontaAward from '../assets/images/media/zonta-kw_young-women-public-affairs.png'
import ontarioTodayReportCards from '../assets/images/media/cbc-ontario-today_report-cards.png'
import kwChamber from '../assets/images/media/kwcoc_leaders-of-tomorrow.png'
import wrdsbReport2022 from '../assets/images/media/wrdsb_2022-annual-report.png'
import wrAssembly from '../assets/images/media/wrapsc_student-voice.png'
import cambridgeSupport from '../assets/images/media/cambridge-today_student-trustee-support.png'
import cambridgeVirtual from '../assets/images/media/cambridge-today_virtual-meetings.png'
import mikeFarwell from '../assets/images/media/mike-farwell-show_library-review-meeting.png'
import morningEditionLibrary from '../assets/images/media/morning-edition-kw_library-review-meeting.png'
import cityNewsBooks from '../assets/images/media/citynews-kitchener_age-appropriate-books.png'
import ontarioTodayReturning from '../assets/images/media/cbc-ontario-today_returning.png'
import theRecordCensus from '../assets/images/media/the-record_wrdsb-student-census.png'
import morningEditionWins from '../assets/images/media/morning-edition-kw_wins.png'
import cambridgeRecordings from '../assets/images/media/cambridge-today_meeting-recordings.png'
import kitchenerCouncil from '../assets/images/media/kitchener-council_anti-racism-day.png'
import rogersWOY2022 from '../assets/images/media/rogers_2022-woy.png'
import wrdsbReport2021 from '../assets/images/media/wrdsb_2021-annual-report.png'
import theRecordResilient from '../assets/images/media/the-record_students-drained-resilient.png'
import morningEditionLookAhead from '../assets/images/media/morning-edition-kw_look-ahead.png'
import cbcPat from '../assets/images/media/cbc-news_pat-on-the-back.png'
import ostaHighlight from '../assets/images/media/osta_student-trustee-highlight.png'
import cbcGradAlt from '../assets/images/media/cbc-news_alternate-grad-celebrations.png'
import morningMentalHealth from '../assets/images/media/morning-edition-kw_mental-health-advocacy.png'
import cbcMentalHealth from '../assets/images/media/cbc-news_mental-health-advocacy.png'
import tedEd from '../assets/images/media/ted-ed_instant-gratification.png'

type MediaItem = {
  image: string
  link: string
  alt: string
}

const MEDIA_ITEMS: MediaItem[] = [
  {
    image: cbcGrads,
    link: 'https://www.cbc.ca/news/canada/kitchener-waterloo/waterloo-region-high-school-graduates-2023-profiles-1.6888739?fbclid=PAAaaefLNPjYrP2ozDu0O6h8zk3eh31pWek8T_0MXji__1eZU55OIZXrC4S9k',
    alt: 'CBC News: Waterloo region grads reflect on bumpy past 4 years and look ahead to what’s next'
  },  {
    image: ontarioTodayGrade,
    link: 'https://youtu.be/_GgZCzSmL3A',
    alt: 'CBC Ontario Today: How would you grade the 2022-2023 school year?'
  },  {
    image: wrdsbAddress,
    link: 'https://youtu.be/8oxXjWEVoGw',
    alt: 'Waterloo Region District School Board: Kenzy Soror’s Last Address to the WRDSB'
  },  {
    image: morningEditionRole,
    link: 'https://youtu.be/at9_IuQlDns',
    alt: 'The Morning Edition KW: WRDSB student trustee Kenzy Soror on her role enacting change and her message to adults in the community'
  },  {
    image: antiHateSmears,
    link: 'https://www.antihate.ca/anti_trans_activists_target_wrdsb_school_board_waterloo',
    alt: 'Canadian Anti-Hate Network: Trustees And Students Face Smears And Threats From Anti-Trans Activists'
  },  {
    image: opsbaScholarship,
    link: 'https://www.wrdsb.ca/blog/2023/05/24/wrdsb-student-trustees-receive-the-ontario-public-student-trustee-leadership-scholarship/',
    alt: 'Ontario Public School Boards’ Association: WRDSB Student Trustees receive the Ontario Public Student Trustee Leadership Scholarship'
  },  {
    image: rogersWOY2023,
    link: 'https://womenoftheyear.ca/woy2023/young-adult-nominees/',
    alt: 'Rogers Women of the Year: 2023 Young Adult Nominees'
  },  {
    image: kyacAwards,
    link: 'https://www.kitchener.ca/en/news/celebrating-kitchener-youth-with-the-kyac-youth-awards.aspx',
    alt: 'KYAC Youth Awards: Celebrating Kitchener youth with the KYAC Youth Awards'
  },  {
    image: zontaAward,
    link: 'https://www.zontakw.org/awards',
    alt: 'Zonta Club of KW: 2023 Young Women in Public Affairs Award'
  },  {
    image: ontarioTodayReportCards,
    link: 'https://www.cbc.ca/listen/live-radio/1-45-ontario-today/clip/15972371-whats-wrong-report-cards',
    alt: 'Ontario Today: What’s wrong with report cards?'
  },  {
    image: kwChamber,
    link: 'https://youtu.be/SRAzosdo-es',
    alt: 'KW Chamber of Commerce: 2023 Leaders of Tomorrow Acceptance Speech'
  },  {
    image: wrdsbReport2022,
    link: 'https://2022.wrdsbannualreport.ca/student-trustees',
    alt: 'WRDSB 2022 Annual Report: A Message from Student Trustees Raina and Soror'
  },  {
    image: wrAssembly,
    link: 'https://youtu.be/ERjiMdVpNIM',
    alt: 'WR Assembly of Public School Councils: Student Voice in WRDSB'
  },  {
    image: cambridgeSupport,
    link: 'https://www.cambridgetoday.ca/local-news/public-school-board-supports-greater-role-for-student-trustees-5884067',
    alt: 'Cambridge Today: Public school board supports greater role for student trustees'
  },  {
    image: cambridgeVirtual,
    link: 'https://www.cambridgetoday.ca/local-news/public-school-board-supports-continuing-virtual-meetings-5875264',
    alt: 'Cambridge Today: Public school board supports continuing virtual meetings'
  },  {
    image: mikeFarwell,
    link: 'https://youtu.be/R5l_fytggy4',
    alt: 'The Mike Farwell Show: WRDSB student trustee Kenzy Soror on controversial library review meeting, return to school'
  },  {
    image: morningEditionLibrary,
    link: 'https://youtu.be/VG_t3wrBRFE',
    alt: 'The Morning Edition KW: WRDSB student trustee Kenzy Soror on controversial library review meeting, return to school'
  },  {
    image: cityNewsBooks,
    link: 'https://kitchener.citynews.ca/2022/09/02/harm-over-conversation-about-age-appropriate-books-continues-student-trustee-5773120/',
    alt: 'CityNews Kitchener: Harm over conversation about age-appropriate books continues: student trustee'
  },  {
    image: ontarioTodayReturning,
    link: 'https://www.cbc.ca/listen/live-radio/1-45-ontario-today/clip/15933958-students-feel-returning-school',
    alt: 'Ontario Today: Students on how they feel about returning to school'
  },  {
    image: theRecordCensus,
    link: 'https://www.therecord.com/news/waterloo-region/waterloo-region-district-school-board-school-students-speak-more-than-200-languages-first-ever-student/article_b2f09496-50c3-51e0-9223-402568afac0f.html',
    alt: 'The Record: Waterloo Region District School Board school students speak more than 200 languages, first-ever student census shows'
  },  {
    image: morningEditionWins,
    link: 'https://www.cbc.ca/listen/live-radio/1-104-the-morning-edition-k-w/clip/15920630-student-trustees-reflect-wins-school-year',
    alt: 'The Morning Edition KW: Student trustees reflect on wins from school year'
  },  {
    image: rogersWOY2022,
    link: 'https://womenoftheyear.ca/2022-nominees/',
    alt: 'Rogers Women of the Year: 2022 Young Adult Nominees'
  },  {
    image: cambridgeRecordings,
    link: 'https://www.cambridgetoday.ca/local-news/public-school-board-votes-to-make-meeting-recordings-accessible-5350390',
    alt: 'Cambridge Today: Public school board votes to make meeting recordings accessible'
  },  {
    image: kitchenerCouncil,
    link: 'https://youtu.be/y7aPd330lJA',
    alt: 'City of Kitchener Council: International Day for Elimination of Racial Discrimination'
  },  {
    image: wrdsbReport2021,
    link: 'https://report.wrdsb.ca/2021/student-trustees/',
    alt: 'WRDSB 2021 Annual Report: A Letter From Kenzy Soror and Nicole Vishkin'
  },  {
    image: theRecordResilient,
    link: 'https://www.therecord.com/news/waterloo-region/waterloo-region-high-school-students-are-drained-concerned-and-resilient/article_c64dbef4-0f71-50ca-afb7-fa8b8095a786.html',
    alt: 'The Record: Waterloo Region high school students are drained, concerned, and resilient'
  },  {
    image: morningEditionLookAhead,
    link: 'https://www.cbc.ca/listen/live-radio/1-104-the-morning-edition-k-w/clip/15886907-wrdsb-student-trustees-look-ahead-year',
    alt: 'The Morning Edition KW:WRDSB student trustees look ahead to the new year'
  },  {
    image: cbcPat,
    link: 'https://www.cbc.ca/news/canada/kitchener-waterloo/wrdsb-student-trustees-remote-learning-1.6302794',
    alt: 'CBC News: Youths deserve ‘pat on the back’ for adaptability, student trustees say, as school moves online again'
  },  {
    image: ostaHighlight,
    link: 'https://pbs.twimg.com/media/FBxdriRXMAY7x4Y?format=jpg&name=medium',
    alt: 'Ontario Student Trustee Association: First Student Trustee Highlight of the 2021-22 School Year'
  },  {
    image: cbcGradAlt,
    link: 'https://www.cbc.ca/news/canada/kitchener-waterloo/covid-prom-high-school-kitchener-waterloo-cameron-heights-1.6050093',
    alt: 'CBC News: High schools in Waterloo region plan alternate celebrations for graduates'
  },  {
    image: morningMentalHealth,
    link: 'https://youtu.be/9a28crgAegA',
    alt: 'The Morning Edition KW: Mental health, advocacy top of mind for WRDSB student trustees-elect'
  },  {
    image: cbcMentalHealth,
    link: 'https://www.cbc.ca/news/canada/kitchener-waterloo/waterloo-region-district-school-board-student-trustees-1.6012499',
    alt: 'CBC News: Mental health, advocacy top of mind for WRDSB student trustees-elect'
  },  {
    image: tedEd,
    link: 'https://youtu.be/O7uRA8MoI4Y',
    alt: 'TED-Ed Student Talks: How to fight the instant gratification impulse'
  },
]

export default function Media() {
  return (
    <div
      className="page"
      style={{ backgroundImage: `url(${shipImg})` }}
    >
      <Compass />

      <div className="media-board">
        {MEDIA_ITEMS.map((item, index) => (
          <MediaCard
            key={index}
            image={item.image}
            link={item.link}
            alt={item.alt}
          />
        ))}
      </div>
    </div>
  )
}
