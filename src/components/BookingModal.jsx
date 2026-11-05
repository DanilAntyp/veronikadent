import React, { useEffect, useState } from 'react'
import { FiX, FiPhone, FiInstagram, FiArrowUpRight, FiClock } from 'react-icons/fi'
import { ToothMark } from './Logo'
import './BookingModal.css'

export default function BookingModal({ isOpen, onClose }) {
  const [mounted, setMounted] = useState(isOpen)
  const [closing, setClosing] = useState(false)

  useEffect(() => {
    if (isOpen) { setMounted(true); setClosing(false) }
    else if (mounted) {
      setClosing(true)
      const t = setTimeout(() => { setMounted(false); setClosing(false) }, 450)
      return () => clearTimeout(t)
    }
  }, [isOpen]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isOpen) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onClose()
    addEventListener('keydown', onKey)
    return () => { document.body.style.overflow = ''; removeEventListener('keydown', onKey) }
  }, [isOpen, onClose])

  if (!mounted) return null

  return (
    <div className={`modal ${closing ? 'is-closing' : ''}`} onClick={(e) => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal__card">
        <button className="modal__close" onClick={onClose} aria-label="Закрити"><FiX size={20} /></button>

        <div className="modal__badge"><ToothMark size={34} stroke="#fff" /></div>
        <h2 className="modal__title" id="modal-title">Записатися на прийом</h2>
        <p className="modal__sub">Оберіть зручний спосіб зв’язку — ми відповімо якнайшвидше!</p>

        <div className="modal__options">
          <a href="tel:0502121394" className="opt opt--phone" onClick={onClose}>
            <span className="opt__ic"><FiPhone size={24} /></span>
            <span className="opt__txt"><strong>Зателефонувати</strong><small>050 212 13 94</small></span>
            <FiArrowUpRight className="opt__arrow" size={22} />
          </a>
          <a href="https://www.instagram.com/vero.nikadent/" target="_blank" rel="noopener noreferrer" className="opt opt--ig" onClick={onClose}>
            <span className="opt__ic"><FiInstagram size={24} /></span>
            <span className="opt__txt"><strong>Написати в Instagram</strong><small>@vero.nikadent</small></span>
            <FiArrowUpRight className="opt__arrow" size={22} />
          </a>
        </div>

        <p className="modal__hours"><FiClock /> Працюємо пн – сб, 9:00 – 20:00</p>
      </div>
    </div>
  )
}
