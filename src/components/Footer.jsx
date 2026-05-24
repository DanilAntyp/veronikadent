import React, { useEffect } from 'react'
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiCalendar, FiHeart } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import './Footer.css'

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

// Clinic location: жк Квартал Крюківщина, вул. Відродження 5, Kyiv area
const CLINIC_POS = [50.3356, 30.3684]

const navLinks = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#doctors', label: 'Наші лікарі' },
  { href: '#reviews', label: 'Відгуки' },
]

const services = [
  'Дитяча стоматологія',
  'Лікування під мікроскопом',
  'Ортодонтія',
  'Гігієна та відбілювання',
  'Сімейна стоматологія',
]

export default function Footer({ onBooking }) {
  const handleNav = (e, href) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="footer" id="footer">
      {/* Map section */}
      <div className="footer__map-section">
        <div className="container footer__map-inner">
          <div className="footer__map-info">
            <span className="section-tag">Як нас знайти</span>
            <h2 className="footer__map-title">Ми поруч з вами</h2>
            <div className="footer__contact-items">
              <div className="footer__contact-item">
                <div className="contact-icon">
                  <FiMapPin size={18} />
                </div>
                <div>
                  <strong>Адреса</strong>
                  <span>жк.«Квартал Крюківщина»,<br/>вул. Відродження 5</span>
                </div>
              </div>
              <div className="footer__contact-item">
                <div className="contact-icon">
                  <FiPhone size={18} />
                </div>
                <div>
                  <strong>Телефон</strong>
                  <a href="tel:0502121394">050 212 13 94</a>
                </div>
              </div>
              <div className="footer__contact-item">
                <div className="contact-icon">
                  <FiClock size={18} />
                </div>
                <div>
                  <strong>Графік роботи</strong>
                  <span>Понеділок – Субота<br/>9:00 – 20:00</span>
                </div>
              </div>
              <div className="footer__contact-item">
                <div className="contact-icon">
                  <FiInstagram size={18} />
                </div>
                <div>
                  <strong>Instagram</strong>
                  <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer">@vero.nikadent</a>
                </div>
              </div>
            </div>
            <button className="btn-primary footer__cta" onClick={onBooking}>
              <FiCalendar size={18} />
              Записатися на прийом
            </button>
          </div>

          {/* Leaflet Map */}
          <div className="footer__map-wrapper">
            <MapContainer
              center={CLINIC_POS}
              zoom={15}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '100%', borderRadius: '24px' }}
              className="footer__leaflet"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={CLINIC_POS}>
                <Popup>
                  <div style={{ fontFamily: 'Nunito, sans-serif', fontWeight: 700, textAlign: 'center', padding: '8px' }}>
                    <div style={{ fontSize: 24, marginBottom: 4 }}>🦷</div>
                    <strong style={{ fontSize: 14, color: '#1F2937' }}>Vero.nikadent</strong>
                    <br/>
                    <span style={{ fontSize: 12, color: '#6B7280' }}>вул. Відродження 5</span>
                    <br/>
                    <a href="tel:0502121394" style={{ fontSize: 12, color: '#2B90D9', fontWeight: 700 }}>050 212 13 94</a>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
            <div className="map-pin-label">
              <span>📍</span>
              <span>Vero.nikadent</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          {/* Logo */}
          <div className="footer__logo-area">
            <div className="footer__logo">
              <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 36, height: 36 }}>
                <circle cx="18" cy="18" r="18" fill="rgba(184,228,250,0.3)"/>
                <path d="M11 11 C11 8 14 7 18 9 C22 7 25 8 25 11 C26.5 17 25.5 23 23 28 C22 31 21 34 20 34 C19 34 18.5 30 17.5 27 L18 23 L18.5 27 C17.5 30 17 34 16 34 C15 34 14 31 13 28 C10.5 23 9.5 17 11 11Z" fill="rgba(255,255,255,0.8)" stroke="rgba(255,255,255,0.6)" strokeWidth="1"/>
              </svg>
              <div>
                <span className="footer-logo-name">Vero<span>.</span>nikadent</span>
                <span className="footer-logo-sub">Стоматологія</span>
              </div>
            </div>
            <p className="footer__tagline">
              Де діти перестають боятися лікарів, а усмішки стають щасливішими.
            </p>
            <div className="footer__social">
              <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
                <FiInstagram size={20} />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div className="footer__col">
            <h4>Навігація</h4>
            <ul>
              {navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} onClick={e => handleNav(e, l.href)}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="footer__col">
            <h4>Послуги</h4>
            <ul>
              {services.map((s, i) => (
                <li key={i}><a href="#services" onClick={e => handleNav(e, '#services')}>{s}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4>Контакти</h4>
            <ul>
              <li>
                <a href="tel:0502121394">📞 050 212 13 94</a>
              </li>
              <li>
                <span>📅 пн–сб, 9:00–20:00</span>
              </li>
              <li>
                <span>📍 вул. Відродження 5</span>
              </li>
              <li>
                <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer">
                  📱 @vero.nikadent
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__copy">
          <div className="container">
            <span>© {new Date().getFullYear()} Vero.nikadent. Всі права захищені.</span>
            <span className="footer__made">
              Зроблено з <FiHeart size={12} fill="currentColor" style={{ color: '#E8608A' }} /> для здорових усмішок
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
