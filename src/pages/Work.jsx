import jollein from '../assets/jollein.webp'
import eichholtz from '../assets/eichholtz.jpg'
import chocolatemakers from '../assets/chocolatemakers.webp'
import idyl from '../assets/idyl.jpg'
import ananda from '../assets/ananda.jpg'
import alphamen from '../assets/the alpha men.jpg'
import spriet from '../assets/spriet.jpg'
import kassl from '../assets/kassl.webp'
import graylabel from '../assets/gray label.webp'
import laminaatEnParket from '../assets/laminaat-en-parket.webp'
import marcInbane from '../assets/marc-inbane.webp'
import royalDelft from '../assets/royal-delft.webp'
import handsOff from '../assets/hands-off.webp'
import claro from '../assets/claro.webp'
import tcig from '../assets/tcig.webp'
import renske from '../assets/renske.webp'

const CASES = [
  { title: 'Marc Inbane', img: marcInbane, url: 'https://www.marcinbane.com/', desc: 'Award-winning self-tan and skincare brand. Custom built international webshop with product finder, bundles and multiple languages.' },
  { title: 'Royal Delft', img: royalDelft, url: 'https://royaldelft.com/', desc: 'Iconic Delft Blue pottery since 1653. Custom built webshop that brings centuries of craftsmanship to a modern online experience.' },
  { title: 'Hands Off', img: handsOff, url: 'https://hands-off.com/', desc: 'Plant-based chocolate brand with a playful identity. Built on a shared multi-brand theme with bundles and seasonal campaigns.' },
  { title: 'Claro', img: claro, url: 'https://clarochocolate.com/', desc: 'Organic, climate-positive chocolate with less sugar. Storytelling webshop on the same shared multi-brand theme.' },
  { title: 'The Chocolate Impact Group', img: tcig, desc: 'B2B webshop for the group behind Chocolatemakers, Hands Off and Claro. One platform for wholesale ordering across all brands.' },
  { title: 'Natuurlijk Renske', img: renske, url: 'https://natuurlijkrenske.nl/', desc: 'Natural pet food brand. Migrated to a new Shopify Horizon theme with a fresh design and all existing functionality carried over.' },
  { title: 'Chocolatemakers', img: chocolatemakers, url: 'https://chocolatemakers.com/', desc: 'Custom built artisan chocolate webshop with a warm and inviting design. Including product configurator for personalized chocolate packages.' },
  { title: 'Idyl', img: idyl, url: 'https://idyl.com/', desc: 'Fully custom premium jewelry webshop with sleek design and focus on user experience. Optimized for conversion.' },
  { title: 'Laminaat en Parket', img: laminaatEnParket, url: 'https://www.laminaatenparket.nl/', desc: 'Flooring specialist webshop for laminate and parquet. Custom built with focus on product selection and material samples.' },
  { title: 'Jollein', img: jollein, url: 'https://jollein.nl/', desc: 'Baby and children\'s products webshop for B2B and B2C. Fully custom build with focus on product discovery and conversion.' },
  { title: 'Ananda', img: ananda, url: 'https://ananda.nl/', desc: 'Wellness and lifestyle webshop with calming design. Optimized checkout flow and integrated email marketing.' },
  { title: 'Eichholtz Miami', img: eichholtz, url: 'https://eichholtzmiami.com/', desc: 'Luxury interior and furniture webshop for the Miami market. Elegant product presentation with B2C functionality.' },
  { title: 'Alphamen', img: alphamen, url: 'https://thealphamen.nl/', desc: 'Custom built men\'s lifestyle and grooming webshop. Sleek modern design with focus on product presentation.' },
  { title: 'Graylabel', img: graylabel, url: 'https://gray-label.com/', desc: 'Sustainable children\'s clothing webshop with organic materials. Clean design with focus on brand identity.' },
  { title: 'Spriet', img: spriet, url: 'https://hispriet.com/', desc: 'Modern Dutch webshop with focus on sustainability. Clean design with extensive product filtering.' },
  { title: 'Kassl', img: kassl, url: 'https://kassleditions.com/', desc: 'High-end fashion webshop for an international brand. Minimalist design with seamless checkout experience.' },
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
        {CASES.map(c => {
          const Card = c.url ? 'a' : 'div'
          const linkProps = c.url ? { href: c.url, target: '_blank', rel: 'noopener noreferrer' } : {}
          return (
            <Card key={c.title} {...linkProps} className="case-card">
              <div className="case-img-wrap">
                <img src={c.img} alt={c.title} loading="lazy" />
              </div>
              <div className="case-info">
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
