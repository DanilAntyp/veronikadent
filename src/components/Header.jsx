import React, { useEffect, useState } from 'react'
import { FiPhone, FiArrowUpRight, FiInstagram } from 'react-icons/fi'
import Logo from './Logo'
import './Header.css'

const navLinks = [
  { href: '#about', label: 'Про нас' },
  { href: '#services', label: 'Послуги' },
  { href: '#prices', label: 'Ціни' },
  { href: '#doctors', label: 'Лікарі' },
  { href: '#reviews', label: 'Відгуки' },
  { href: '#contacts', label: 'Контакти' },
]

export default function Header({ onBooking }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    let last = scrollY
    const onScroll = () => {
      const y = scrollY
      setScrolled(y > 40)
      setHidden(y > 500 && y > last + 4)
      if (y < last - 4) setHidden(false)
      last = y
    }
    addEventListener('scroll', onScroll, { passive: true })
    return () => removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <header className={`hdr ${scrolled ? 'hdr--scrolled' : ''} ${hidden && !open ? 'hdr--hidden' : ''}`}>
        <div className="hdr__bar">
          <a href="#top" className="hdr__logo" onClick={(e) => { e.preventDefault(); setOpen(false); scrollTo({ top: 0, behavior: 'smooth' }) }} aria-label="На початок">
            <Logo />
          </a>

          <nav className="hdr__nav" aria-label="Основна навігація">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} className="hdr__link">
                <span className="hdr__clip"><span data-text={l.label}>{l.label}</span></span>
              </a>
            ))}
          </nav>

          <div className="hdr__actions">
            <a href="tel:0502121394" className="hdr__phone">
              <span className="hdr__phone-icon"><FiPhone size={15} /></span>
              <span>050 212 13 94</span>
            </a>
            <button className="btn btn--sm hdr__cta" onClick={onBooking} data-magnetic>
              Записатися <FiArrowUpRight size={16} />
            </button>
            <button
              className={`hdr__burger ${open ? 'is-open' : ''}`}
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Закрити меню' : 'Відкрити меню'}
              aria-expanded={open}
            >
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`menu ${open ? 'menu--open' : ''}`} aria-hidden={!open}>
        <div className="menu__bg" />
        <nav className="menu__nav">
          {navLinks.map((l, i) => (
            <a key={l.href} href={l.href} onClick={(e) => go(e, l.href)} style={{ '--i': i }} tabIndex={open ? 0 : -1}>
              <small>0{i + 1}</small>{l.label}
            </a>
          ))}
        </nav>
        <div className="menu__bottom">
          <a href="tel:0502121394" className="menu__phone" tabIndex={open ? 0 : -1}>050 212 13 94</a>
          <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer" className="menu__ig" tabIndex={open ? 0 : -1}>
            <FiInstagram /> @vero.nikadent
          </a>
          <button className="btn btn--light" onClick={() => { setOpen(false); onBooking() }} tabIndex={open ? 0 : -1}>
            Записатися на прийом
          </button>
        </div>
      </div>
    </>
  )
}
