import profilePic from '../assets/sam_profile_picture.png'

const TOOLKIT = ['HTML', 'CSS / Sass', 'Tailwind', 'React', 'Javascript', 'Shopify', 'Shopify Flow', 'Klaviyo', 'Make.com', 'N8N', 'Figma', 'Jira', 'Confluence', 'Claude', 'Cursor']

export default function About() {
  return (
    <div className="page-about">
      <div className="about-intro">
        <h1 className="page-title">About</h1>
        <div className="about-hero">
          <div>
            <p className="about-text">
              Hey, I'm Sam de Smit, a Shopify developer and consultant helping brands
              build, optimize and scale their online stores. From custom theme development
              and app integrations to conversion optimization and workflow automation, I
              help businesses get the most out of the Shopify platform. Whether you need a
              full store build from scratch, a redesign or hands-on technical support, I
              work closely with clients to deliver high-performing, user-friendly webshops
              that drive results.
            </p>
          </div>
          <img src={profilePic} alt="Sam de Smit" className="about-photo" />
        </div>
      </div>

      <div className="about-grid">
        <div>
          <h2 className="section-label">My Toolkit</h2>
          <div className="tag-list">
            {TOOLKIT.map(t => <span key={t} className="tag">{t}</span>)}
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
