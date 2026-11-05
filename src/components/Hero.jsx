import React, { useEffect, useState } from 'react'
import { FiCalendar, FiArrowDownRight, FiStar } from 'react-icons/fi'
import { ToothMark } from './Logo'
import './Hero.css'

const words = ['діти', 'мами', 'тата', 'бабусі', 'усі']

/** Милий зубик-талісман: кліпає очима і посміхається */
function Mascot() {
  return (
    <svg className="mascot" viewBox="0 0 120 130" fill="none" aria-hidden="true">
      <path
        d="M60 22C52 14 37 10 27 17 16 25 15 41 19 54c3.6 11 8.6 21.6 12.8 32.5 2.1 5.6 6.7 8.8 10.3 6.2 3.4-2.4 4.4-9.6 6.2-16.3 1.6-5.2 4.2-10.8 10.7-10.8s9.1 5.6 10.7 10.8c1.8 6.7 2.8 13.9 6.2 16.3 3.6 2.6 8.2-.6 10.3-6.2C91.4 75.6 96.4 65 100 54c4-13 3-29-8-37-10-7-25-3-32 5Z"
        fill="#fff" stroke="#14263F" strokeWidth="3.5" strokeLinejoin="round"
      />
      <g className="mascot__eyes">
        <ellipse cx="45" cy="44" rx="5" ry="6.5" fill="#14263F" />
        <ellipse cx="75" cy="44" rx="5" ry="6.5" fill="#14263F" />
        <circle cx="46.5" cy="41.5" r="1.8" fill="#fff" />
        <circle cx="76.5" cy="41.5" r="1.8" fill="#fff" />
      </g>
      <ellipse cx="35" cy="56" rx="6" ry="3.5" fill="#EC9C97" opacity=".7" />
      <ellipse cx="85" cy="56" rx="6" ry="3.5" fill="#EC9C97" opacity=".7" />
      <path d="M50 56c4 6 16 6 20 0" stroke="#14263F" strokeWidth="3.5" strokeLinecap="round" />
      <path className="mascot__shine" d="M30 28c3-4 8-6 12-6" stroke="#A8CAEC" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}

export default function Hero({ onBooking }) {
  const [w, setW] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setW((i) => (i + 1) % words.length), 2200)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true">
        <span className="orb orb--1" />
        <span className="orb orb--2" />
        <span className="orb orb--3" />
      </div>

      <div className="container hero__grid is-in">
        <div className="hero__text">
          <div className="hero__badge">
            <span className="hero__dot" />
            Відкрито пн–сб · 9:00–20:00
          </div>

          <h1 className="hero__title">
            <span className="line-mask" style={{ '--i': 0 }}><span>Стоматологія,</span></span>
            <span className="line-mask" style={{ '--i': 1 }}>
              <span>
                де{' '}
                <span className="rot" aria-live="polite">
                  {words.map((word, i) => (
                    <span key={word} className={`rot__w ${i === w ? 'is-on' : ''} ${i === (w - 1 + words.length) % words.length ? 'is-out' : ''}`}>
                      {word}
                    </span>
                  ))}
                  <svg className="rot__squiggle" viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
                    <path d="M2 12 C 30 2, 50 20, 80 10 S 130 2, 160 12 S 190 16, 198 8" />
                  </svg>
                </span>
                <span className="hero__pill" data-depth="-8">
                  <img src="/images/opt/team.jpg" alt="" />
                </span>
              </span>
            </span>
            <span className="line-mask" style={{ '--i': 2 }}><span>перестають боятися</span></span>
            <span className="line-mask" style={{ '--i': 3 }}><span className="hero__title-soft">лікарів</span></span>
          </h1>

          <p className="hero__sub">
            Неважливо, вам 3 чи 93 — ми подбаємо про вашу усмішку з любов’ю. Дитяча та сімейна стоматологія у Крюківщині.
          </p>

          <div className="hero__actions">
            <button className="btn" onClick={onBooking} data-magnetic>
              <FiCalendar size={18} /> Записатися на прийом
            </button>
            <a href="#prices" className="btn btn--ghost" data-magnetic>
              Подивитися ціни <FiArrowDownRight size={18} />
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <strong>5.0 <FiStar size={20} fill="currentColor" /></strong>
              <span>рейтинг у Google</span>
            </div>
            <div className="hero__stat">
              <strong>2000+</strong>
              <span>щасливих пацієнтів</span>
            </div>
            <div className="hero__stat">
              <strong>25×</strong>
              <span>збільшення мікроскопа</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__blob" data-depth="14" />
          <div className="hero__arch">
            <img src="/images/opt/team.jpg" alt="Команда клініки Vero.nikadent" />
          </div>

          <div className="hero__stamp" data-depth="-18">
            <svg viewBox="0 0 200 200" className="hero__stamp-text" aria-hidden="true">
              <defs>
                <path id="circlePath" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#circlePath">ДИТЯЧА • СІМЕЙНА • СТОМАТОЛОГІЯ • VERO.NIKADENT •</textPath>
              </text>
            </svg>
            <span className="hero__stamp-core"><ToothMark size={44} stroke="#fff" /></span>
          </div>

          <div className="hero__mascot" data-depth="26"><Mascot /></div>

          <div className="chip chip--1" data-depth="-24">
            <span className="chip__ic">🦷</span>
            <span><b>Без страху та болю</b><small>сучасна анестезія</small></span>
          </div>
          <div className="chip chip--2" data-depth="20">
            <span className="chip__ic">🌟</span>
            <span><b>Перевірено мамами</b><small>2000+ задоволених сімей</small></span>
          </div>
          <div className="chip chip--3" data-depth="-12">
            <span className="chip__ic">🎁</span>
            <span><b>Подарунки малечі</b><small>після лікування</small></span>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Гортати далі">
        <span />
      </a>
    </section>
  )
}
