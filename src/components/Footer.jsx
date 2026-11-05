import React from 'react'
import { FiPhone, FiMapPin, FiClock, FiInstagram, FiArrowUpRight, FiArrowUp } from 'react-icons/fi'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import Logo from './Logo'
import './Footer.css'

// вул. Відродження 5, Крюківщина, Київська обл., 08136
const CLINIC_POS = [50.3812693, 30.3845729]
const MAPS_URL = 'https://maps.app.goo.gl/6eArZnWYadFTx1R59?g_st=it'

const pin = L.divIcon({
  className: 'map-pin',
  html: '<span class="map-pin__dot">🦷</span><span class="map-pin__pulse"></span>',
  iconSize: [56, 56],
  iconAnchor: [28, 28],
  popupAnchor: [0, -28],
})

const nav = [
  ['#about', 'Про нас'],
  ['#services', 'Послуги'],
  ['#prices', 'Ціни'],
  ['#doctors', 'Лікарі'],
  ['#gallery', 'Результати'],
  ['#reviews', 'Відгуки'],
]

export default function Footer({ onBooking }) {
  const go = (e, href) => {
    e.preventDefault()
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="foot" id="contacts">
      {/* Великий заклик */}
      <div className="container">
        <div className="cta" data-reveal="zoom">
          <span className="cta__float cta__float--1" data-depth="30">🦷</span>
          <span className="cta__float cta__float--2" data-depth="-24">✨</span>
          <span className="cta__float cta__float--3" data-depth="18">💙</span>
          <span className="eyebrow eyebrow--light">Запис на прийом</span>
          <h2 className="cta__title">
            Приходьте знайомитися —<br />
            <span>без страху</span> і поспіху
          </h2>
          <div className="cta__actions">
            <button className="btn btn--light" onClick={onBooking} data-magnetic>
              Записатися онлайн <FiArrowUpRight size={18} />
            </button>
            <a href="tel:0502121394" className="cta__phone" data-magnetic>
              <FiPhone size={18} /> 050 212 13 94
            </a>
          </div>
        </div>
      </div>

      {/* Контакти + мапа */}
      <div className="container foot__grid">
        <div className="foot__info">
          <span className="eyebrow" data-reveal>Як нас знайти</span>
          <h2 className="foot__title" data-reveal style={{ '--d': '60ms' }}>Ми поруч з вами</h2>

          <ul className="foot__contacts">
            <li data-reveal style={{ '--d': '100ms' }}>
              <span className="foot__ic"><FiMapPin /></span>
              <div>
                <small>Адреса</small>
                <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">вул. Відродження 5, Крюківщина, Київська обл., 08136</a>
              </div>
            </li>
            <li data-reveal style={{ '--d': '160ms' }}>
              <span className="foot__ic"><FiPhone /></span>
              <div>
                <small>Телефон</small>
                <a href="tel:0502121394">050 212 13 94</a>
              </div>
            </li>
            <li data-reveal style={{ '--d': '220ms' }}>
              <span className="foot__ic"><FiClock /></span>
              <div>
                <small>Графік роботи</small>
                <span>Понеділок – Субота, 9:00 – 20:00</span>
              </div>
            </li>
            <li data-reveal style={{ '--d': '280ms' }}>
              <span className="foot__ic"><FiInstagram /></span>
              <div>
                <small>Instagram</small>
                <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer">@vero.nikadent</a>
              </div>
            </li>
          </ul>
        </div>

        <div className="foot__map" data-reveal="clip">
          <MapContainer center={CLINIC_POS} zoom={16} scrollWheelZoom={false} className="foot__leaflet">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={CLINIC_POS} icon={pin}>
              <Popup>
                <div className="map-pop">
                  <strong>Vero.nikadent</strong>
                  <span>вул. Відродження 5, Крюківщина</span>
                  <a href={MAPS_URL} target="_blank" rel="noopener noreferrer">Прокласти маршрут →</a>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
          <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="foot__route">
            Відкрити в Google Maps <FiArrowUpRight />
          </a>
        </div>
      </div>

      {/* Низ */}
      <div className="foot__bottom">
        <div className="container foot__bar">
          <Logo />
          <nav className="foot__nav">
            {nav.map(([h, l]) => <a key={h} href={h} onClick={(e) => go(e, h)}>{l}</a>)}
          </nav>
          <button className="foot__up" onClick={() => scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Нагору">
            <FiArrowUp size={20} />
          </button>
        </div>
        <div className="foot__word" aria-hidden="true">Vero.nikadent</div>
        <div className="container foot__copy">
          <span>© {new Date().getFullYear()} Vero.nikadent. Всі права захищені.</span>
          <span>Зроблено з 💙 для здорових усмішок</span>
        </div>
      </div>
    </footer>
  )
}
