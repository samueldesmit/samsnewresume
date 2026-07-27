import { useCallback, useEffect, useRef, useState } from 'react'

// Cloudflare Worker die tussen deze pagina en de wekker thuis zit:
// de pagina schrijft gewenste instellingen, de wekker pollt ze elke ~20 s.
const API = 'https://wekker-api.samueldesmit.workers.dev'

export default function Wekker() {
  const [ww, setWw] = useState(() => sessionStorage.getItem('wekkerww') || '')
  const [wwInvoer, setWwInvoer] = useState('')
  const [fout, setFout] = useState('')
  const [staat, setStaat] = useState(null)
  const [tijd, setTijd] = useState('07:30')
  const [liedje, setLiedje] = useState(1)
  const [volume, setVolume] = useState(22)
  const [melding, setMelding] = useState('')
  const geladen = useRef(false)

  const roep = useCallback(async (extra = {}, wachtwoord = ww) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ww: wachtwoord, bron: 'site', ...extra }),
    })
    if (res.status === 401) throw new Error('ww')
    if (!res.ok) throw new Error('http')
    return res.json()
  }, [ww])

  const verwerk = useCallback((data) => {
    setStaat(data)
    if (!geladen.current) {
      const g = data.gewenst || data.status
      if (g) {
        setTijd(`${String(g.uur).padStart(2, '0')}:${String(g.min).padStart(2, '0')}`)
        setLiedje(g.liedje)
        setVolume(g.volume)
        geladen.current = true
      }
    }
  }, [])

  useEffect(() => {
    if (!ww) return undefined
    let actief = true
    const laad = () =>
      roep()
        .then((d) => actief && verwerk(d))
        .catch((e) => {
          if (e.message === 'ww') {
            sessionStorage.removeItem('wekkerww')
            setWw('')
          }
        })
    laad()
    const timer = setInterval(laad, 15000)
    return () => {
      actief = false
      clearInterval(timer)
    }
  }, [ww, roep, verwerk])

  const inloggen = async (e) => {
    e.preventDefault()
    try {
      const d = await roep({}, wwInvoer)
      sessionStorage.setItem('wekkerww', wwInvoer)
      setWw(wwInvoer)
      setFout('')
      verwerk(d)
    } catch {
      setFout('That is not it. Try again.')
    }
  }

  const opslaan = async () => {
    const [uur, min] = tijd.split(':').map(Number)
    try {
      const d = await roep({ gewenst: { uur, min, liedje, volume } })
      setStaat(d)
      setMelding('Saved — the clock picks this up within ~20 seconds.')
    } catch {
      setMelding('Saving failed. Try again in a bit.')
    }
    setTimeout(() => setMelding(''), 6000)
  }

  const namen = staat?.status?.namen || []
  const totaal = staat?.status?.totaal > 0 ? staat.status.totaal : namen.length || 7
  const stap = (d) => setLiedje(((liedje - 1 + d) % totaal + totaal) % totaal + 1)
  const gezienSec = staat?.gezien ? Math.round((Date.now() - staat.gezien) / 1000) : null
  const online = gezienSec !== null && gezienSec < 60
  const gezienTekst =
    gezienSec === null
      ? 'never seen yet'
      : gezienSec < 60
        ? `seen ${gezienSec}s ago`
        : `last seen ${Math.round(gezienSec / 60)} min ago`

  return (
    <div className="page-wekker">
      <h1 className="page-title">Wekker</h1>
      <p className="contact-text">
        My DIY e-ink alarm clock: an ESP32, a 4.2&Prime; e-paper display, an MP3
        module and a 3D-printed case. It shows the weather, sunrise and sunset
        and a rain forecast, rings with birdsong (or a rooster) and turns on the
        bedroom lights through Philips Hue. The controls below reach it from
        anywhere, through a Cloudflare Worker it polls every 20 seconds.
      </p>

      {!ww ? (
        <form className="wekker-panel" onSubmit={inloggen}>
          <div className="form-group">
            <label htmlFor="wekker-ww">Password</label>
            <input
              id="wekker-ww"
              type="password"
              value={wwInvoer}
              onChange={(e) => setWwInvoer(e.target.value)}
              placeholder="You know it"
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="contact-submit">Unlock</button>
          {fout && <p className="form-message">{fout}</p>}
        </form>
      ) : (
        <div className="wekker-panel">
          <p className={`wekker-status ${online ? 'is-online' : ''}`}>
            <span className="wekker-dot" />
            {online ? 'Clock is online' : 'Clock is offline'} &middot; {gezienTekst}
            {staat?.status && !staat.status.schakelaar && ' · alarm switch is OFF'}
          </p>

          <div className="form-group">
            <label htmlFor="wekker-tijd">Alarm time</label>
            <input
              id="wekker-tijd"
              type="time"
              step="300"
              value={tijd}
              onChange={(e) => setTijd(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Alarm sound</label>
            <div className="wekker-liedje">
              <button type="button" className="wekker-stap" onClick={() => stap(-1)}>&#9664;</button>
              <span className="wekker-liedje-naam">
                {namen[liedje - 1] || `sound ${liedje}`}
                <small>{liedje} of {totaal}</small>
              </span>
              <button type="button" className="wekker-stap" onClick={() => stap(1)}>&#9654;</button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="wekker-volume">Volume &middot; {volume}</label>
            <input
              id="wekker-volume"
              type="range"
              min="5"
              max="30"
              step="1"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>

          <button type="button" className="contact-submit" onClick={opslaan}>
            Save to clock
          </button>
          {melding && <p className="form-message">{melding}</p>}
        </div>
      )}
    </div>
  )
}
