import { Link } from 'react-router-dom'
import slakkieSprint from '../assets/game-slakkie-sprint.jpg'
import zingRacer from '../assets/game-zingracer.jpg'

const GAMES = [
  { title: 'Slakkie Sprint', to: '/games/slakkie-sprint', img: slakkieSprint, desc: 'Spring als slak over blokken, kevers en egels, met de stem van Fender. Hoe ver kom jij? Met eindbaas en highscores.' },
  { title: 'ZingRacer', to: '/games/zingracer', img: zingRacer, desc: 'Kies een auto en zing het merk. Hoe hoger je zingt, hoe harder hij gaat. Je hebt je microfoon nodig.' },
]

export default function Games() {
  return (
    <div className="page-games">
      <h1 className="page-title">Games</h1>
      <p className="page-subtitle">Zelfgemaakte spelletjes. Speelbaar in de browser, op de computer en op de tablet.</p>
      <div className="cases-grid">
        {GAMES.map(g => (
          <Link key={g.title} to={g.to} className="case-card">
            <div className="case-img-wrap">
              <img src={g.img} alt={g.title} loading="lazy" />
            </div>
            <div className="case-info">
              <h3>{g.title}</h3>
              <p>{g.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
