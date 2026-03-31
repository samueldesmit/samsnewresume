import { useState } from 'react'

export default function BottomBar() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    if (email) {
      setSubmitted(true)
      setTimeout(() => setSubmitted(false), 3000)
      setEmail('')
    }
  }

  return (
    <footer className="bottom-bar">
      <div className="bottom-bar-inner">
        <div className="bar-info">
          <span className="bar-name">SDS</span>
          <p className="bar-tagline">Let's build something great together.</p>
        </div>
        <form className="bar-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label className="sr-only" htmlFor="email">Email address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="ping-btn">
            {submitted ? 'Sent!' : 'Get in touch'}
          </button>
        </form>
      </div>
    </footer>
  )
}
