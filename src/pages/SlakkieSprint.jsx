import { Link } from 'react-router-dom'
import cover from '../assets/game-slakkie-sprint.jpg'

// De game zelf is een los statisch bestand (public/slakkiesprint.html),
// zodat hij ook standalone werkt. Op de computer staat hij in een iframe,
// op telefoon en tablet open je hem los op het hele scherm.
export default function SlakkieSprint() {
  return (
    <div className="page-game">
      <Link to="/games" className="game-back">&larr; Alle games</Link>
      <h1 className="page-title">Slakkie Sprint</h1>
      <p className="game-intro game-intro-desktop">
        Pijltjes of A/D om te lopen, spatie of W om te springen. Zet het geluid aan: als de slak loopt,
        hoor je Fender. Met de knop rechtsboven in het spel speel je op het volledige scherm.
      </p>
      <p className="game-intro game-intro-touch">
        Draai je telefoon een kwartslag en speel met de knoppen in beeld. Zet het geluid aan: als de slak
        loopt, hoor je Fender.
      </p>
      <a className="game-play-touch" href="/slakkiesprint.html">
        <img src={cover} alt="Slakkie Sprint" />
        <span>Speel nu</span>
      </a>
      <iframe
        className="game-frame game-frame-wide"
        src="/slakkiesprint.html"
        title="Slakkie Sprint"
        allow="autoplay; fullscreen"
        allowFullScreen
      />
    </div>
  )
}
