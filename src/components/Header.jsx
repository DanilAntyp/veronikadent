import React, { useState } from 'react'
import { FiPhone, FiMenu, FiX } from 'react-icons/fi'
import logoImg from '../images/logo/logo.png'
import './Header.css'

const navLinks = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#doctors', label: 'Наші лікарі' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#footer', label: 'Контакти' },
]

export default function Header({ isScrolled, onBooking }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        {/* Logo */}
        <a href="#" className="header__logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <img src={logoImg} alt="Vero.nikadent" className="logo-img" />
        </a>

        {/* Desktop Nav */}
        <nav className="header__nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact + CTA */}
        <div className="header__actions">
          <a href="tel:0502121394" className="header__phone">
            <FiPhone size={16} />
            <span>050 212 13 94</span>
          </a>
          <span className="header__hours">пн–сб</span>
          <button className="btn-primary header__cta" onClick={onBooking}>
            Записатися онлайн
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="header__burger" onClick={() => setMenuOpen(v => !v)} aria-label="Меню">
          {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`header__mobile ${menuOpen ? 'header__mobile--open' : ''}`}>
        <nav>
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header__mobile-bottom">
          <a href="tel:0502121394" className="header__phone">
            <FiPhone size={16} />
            <span>050 212 13 94</span>
          </a>
          <button className="btn-primary" onClick={() => { setMenuOpen(false); onBooking() }}>
            Записатися онлайн
          </button>
        </div>
      </div>
    </header>
  )
}
