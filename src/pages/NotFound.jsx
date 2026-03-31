import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

const MESSAGES = [
  "This page went to get coffee and never came back.",
  "404: Page not found. But hey, you found me!",
  "Looks like this page called in sick today.",
  "This page is on a Shopify store somewhere... just not this one.",
  "I built a lot of things. This page wasn't one of them.",
  "Even my cursor can't find this page.",
]

export default function NotFound() {
  const [glitch, setGlitch] = useState(false)
  const [msg] = useState(() => MESSAGES[Math.floor(Math.random() * MESSAGES.length)])

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true)
      setTimeout(() => setGlitch(false), 150)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="page-404">
      <h1 className={`title-404 ${glitch ? 'glitch' : ''}`}>404</h1>
      <p className="msg-404">{msg}</p>
      <Link to="/" className="btn-404">Take me home</Link>
    </div>
  )
}
