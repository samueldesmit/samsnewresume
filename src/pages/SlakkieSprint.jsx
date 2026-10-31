import { Link } from 'react-router-dom'

// De game zelf is een los statisch bestand (public/slakkiesprint.html),
// zodat hij ook standalone werkt; deze pagina zet hem in een iframe.
export default function SlakkieSprint() {
  return (
    <div className="page-game">
      <Link to="/games" className="game-back">&larr; Alle games</Link>
      <h1 className="page-title">Slakkie Sprint</h1>
      <p className="game-intro">
        Pijltjes of A/D om te lopen, spatie of W om te springen. Op de tablet staan er knoppen in beeld.
        Zet het geluid aan: als de slak loopt, hoor je Fender.
      </p>
      <iframe
        className="game-frame game-frame-wide"
        src="/slakkiesprint.html"
        title="Slakkie Sprint"
        allow="autoplay; fullscreen"
        ref={el => el && el.focus()}
      />
    </div>
  )
}
