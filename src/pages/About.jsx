import profilePic from '../assets/sam_profile_picture.png'

const SKILLS = ['HTML', 'CSS / Sass', 'Tailwind', 'React', 'Javascript', 'Make.com', 'Figma', 'N8N']
const TOOLS = ['Shopify', 'Klaviyo', 'Jira', 'Confluence', 'Claude', 'Cursor', 'Shopify Flow']

export default function About() {
  return (
    <div className="page-about">
      <div className="about-intro">
        <div className="about-hero">
          <div>
            <h1 className="page-title">About</h1>
            <p className="about-text">
              Hey, I'm Sam de Smit. I'm a front-end developer with a passion for building
              visually appealing and functional websites. With my expertise in HTML, CSS,
              JavaScript and React, I create websites that are not only beautiful but also
              perform optimally. I have extensive experience in the e-commerce industry,
              particularly working with Shopify, and I enjoy collaborating with clients to
              translate their vision into effective, user-friendly solutions.
            </p>
          </div>
          <img src={profilePic} alt="Sam de Smit" className="about-photo" />
        </div>
      </div>

      <div className="about-grid">
        <div>
          <h2 className="section-label">Skills</h2>
          <div className="tag-list">
            {SKILLS.map(s => <span key={s} className="tag">{s}</span>)}
          </div>
        </div>
        <div>
          <h2 className="section-label">Tools</h2>
          <div className="tag-list">
            {TOOLS.map(t => <span key={t} className="tag">{t}</span>)}
          </div>
        </div>
      </div>

      <div className="about-details">
        <div className="detail-item">
          <span className="detail-label">Date of birth</span>
          <span className="detail-value">03 December 1992</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Nationality</span>
          <span className="detail-value">Dutch</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Languages</span>
          <span className="detail-value">Dutch, English</span>
        </div>
      </div>
    </div>
  )
}
