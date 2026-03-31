import { useState } from 'react'

export default function Contact() {
  const [message, setMessage] = useState('')

  const onSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)

    formData.append('access_key', '02967982-1b6a-4f40-94bc-b2a3c0e6ee73')

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: json,
      }).then((res) => res.json())

      if (res.success) {
        setMessage('Message sent successfully!')
        event.target.reset()
      } else {
        setMessage('Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="page-contact">
      <h1 className="page-title">Get in touch</h1>
      <p className="contact-text">
        Thank you for taking the time to check out my work! I'd love to chat about what
        we can do for each other and how my experience and skills fit your team. Feel free
        to reach out.
      </p>

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              name="email"
              type="email"
              placeholder="Your email address"
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Tell me about your project..."
            rows="6"
            required
          />
        </div>
        <button type="submit" className="contact-submit">Send message</button>
      </form>

      {message && <p className="form-message">{message}</p>}

      <div className="contact-links">
        <a href="https://linkedin.com/in/samueldesmit" target="_blank" rel="noopener noreferrer" className="contact-link">
          LinkedIn
        </a>
        <a href="https://github.com/samueldesmit" target="_blank" rel="noopener noreferrer" className="contact-link">
          GitHub
        </a>
      </div>
    </div>
  )
}
