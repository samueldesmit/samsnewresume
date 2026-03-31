import jollein from '../assets/jollein.webp'
import eichholtz from '../assets/eichholtz.jpg'
import chocolatemakers from '../assets/chocolatemakers.webp'
import idyl from '../assets/idyl.jpg'
import ananda from '../assets/ananda.jpg'
import alphamen from '../assets/the alpha men.jpg'
import spriet from '../assets/spriet.jpg'
import kassl from '../assets/kassl.webp'
import graylabel from '../assets/gray label.webp'

const CASES = [
  { title: 'Jollein', img: jollein, desc: 'Baby and children\'s products webshop for B2B and B2C. Fully custom build with focus on product discovery and conversion.' },
  { title: 'Eichholtz', img: eichholtz, desc: 'Luxury interior and furniture webshop for the Miami market. Elegant product presentation with B2C functionality.' },
  { title: 'Chocolatemakers', img: chocolatemakers, desc: 'Custom built artisan chocolate webshop with a warm and inviting design. Including product configurator for personalized chocolate packages.' },
  { title: 'Idyl', img: idyl, desc: 'Fully custom premium jewelry webshop with sleek design and focus on user experience. Optimized for conversion.' },
  { title: 'Ananda', img: ananda, desc: 'Wellness and lifestyle webshop with calming design. Optimized checkout flow and integrated email marketing.' },
  { title: 'Alphamen', img: alphamen, desc: 'Custom built men\'s lifestyle and grooming webshop. Sleek modern design with focus on product presentation.' },
  { title: 'Spriet', img: spriet, desc: 'Modern Dutch webshop with focus on sustainability. Clean design with extensive product filtering.' },
  { title: 'Kassl', img: kassl, desc: 'High-end fashion webshop for an international brand. Minimalist design with seamless checkout experience.' },
  { title: 'Graylabel', img: graylabel, desc: 'Sustainable children\'s clothing webshop with organic materials. Clean design with focus on brand identity.' },
]

export default function Work() {
  return (
    <div className="page-work">
      <h1 className="page-title">Selected Work</h1>
      <p className="page-subtitle">
        A selection of Shopify webshops I've built or contributed to. From concept to launch,
        with focus on design, performance and conversion.
      </p>
      <div className="cases-grid">
        <div className="case-card case-teaser">
          <div className="case-img-wrap teaser-placeholder">
            <span className="teaser-icon">?</span>
          </div>
          <div className="case-info">
            <h3>Something new is coming</h3>
            <p>A new project is in the works. Stay tuned...</p>
          </div>
        </div>
        {CASES.map(c => (
          <div key={c.title} className="case-card">
            <div className="case-img-wrap">
              <img src={c.img} alt={c.title} loading="lazy" />
            </div>
            <div className="case-info">
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
