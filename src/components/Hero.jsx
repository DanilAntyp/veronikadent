import React from 'react'
import { FiCalendar, FiStar, FiShield, FiHeart } from 'react-icons/fi'
import logo1Img from '../images/logo/logo1.png'
import './Hero.css'

const stats = [
  { icon: <FiStar />, value: '5.0', label: 'Рейтинг' },
  { icon: <FiHeart />, value: '2000+', label: 'Щасливих пацієнтів' },
]

export default function Hero({ onBooking }) {
  return (
    <section className="hero" id="hero">
      {/* Background blobs */}
      <div className="hero__bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
        <div className="blob blob-4" />
      </div>

      <div className="container hero__inner">
        {/* Text Content */}
        <div className="hero__content">
          <div className="hero__badge">
            <span className="badge-dot" />
            <span>Відкрито пн–сб · Записуємося онлайн</span>
          </div>

          <h1 className="hero__title">
            Vero.nikadent —{' '}
            <span className="hero__title-highlight">
              стоматологія, де діти перестають боятися лікарів
            </span>
          </h1>

          <p className="hero__subtitle">
            Неважливо, вам 3 чи 93 — ми подбаємо про вашу усмішку з любов'ю.
          </p>

          <div className="hero__actions">
            <button className="btn-primary hero__cta" onClick={onBooking}>
              <FiCalendar size={18} />
              Записатися на прийом
            </button>
            <a href="tel:0502121394" className="btn-secondary">
              050 212 13 94
            </a>
          </div>

          {/* Stats */}
          <div className="hero__stats">
            {stats.map((s, i) => (
              <div key={i} className="hero__stat">
                <span className="stat-icon">{s.icon}</span>
                <div>
                  <span className="stat-value">{s.value}</span>
                  <span className="stat-label">{s.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Side */}
        <div className="hero__visual">
          {/* Main logo image */}
          <div className="hero__image-wrapper">
            <div className="hero__image-blob">
              <div className="hero__logo-bg">
                <img src={logo1Img} alt="Vero.nikadent логотип" className="hero__logo-img" />
              </div>
            </div>

            {/* Floating cards */}
            <div className="hero__card hero__card--1">
              <span className="card-emoji">🦷</span>
              <div>
                <span className="card-title">Без страху та болю</span>
                <span className="card-sub">Сучасна анестезія</span>
              </div>
            </div>

            <div className="hero__card hero__card--2">
              <span className="card-emoji">🌟</span>
              <div>
                <span className="card-title">Перевірено мамами</span>
                <span className="card-sub">2000+ задоволених сімей</span>
              </div>
            </div>

            <div className="hero__card hero__card--3">
              <span className="card-emoji">💙</span>
              <div>
                <span className="card-title">Комфорт і турбота</span>
                <span className="card-sub">Для дітей і дорослих</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom */}
      <div className="hero__wave">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80Z" fill="white"/>
        </svg>
      </div>
    </section>
  )
}
