// De game zelf is een los statisch bestand (public/zingracer.html),
// zodat hij ook standalone werkt; deze pagina zet hem in een iframe
// en geeft de mic-permissie door.
import { Link } from 'react-router-dom'

export default function ZingRacer() {
  return (
    <div className="page-zingracer">
      <Link to="/games" className="game-back">&larr; Alle games</Link>
      <h1 className="page-title">ZingRacer</h1>
      <p className="zingracer-intro">
        Kies een auto en zing het merk &mdash; hoe hoger je zingt, hoe harder hij gaat.
        Je hebt je microfoon nodig (en een beetje lef).
      </p>
      <iframe
        className="zingracer-frame"
        src="/zingracer.html"
        title="ZingRacer"
        allow="microphone; autoplay"
      />
    </div>
  )
}
