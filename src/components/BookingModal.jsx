import React, { useEffect } from 'react'
import { FiX, FiPhone, FiInstagram } from 'react-icons/fi'
import './BookingModal.css'

export default function BookingModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal modal--contact">
        <button className="modal__close" onClick={onClose} aria-label="Закрити">
          <FiX size={20} />
        </button>

        {/* Header */}
        <div className="modal__header">
          <div className="modal__logo">
            <span>🦷</span>
            <strong>Vero.nikadent</strong>
          </div>
          <h2 className="modal__title">Записатися на прийом</h2>
          <p className="modal__sub">
            Оберіть зручний спосіб зв'язку — ми відповімо якнайшвидше!
          </p>
        </div>

        {/* Two big action buttons */}
        <div className="modal__contact-options">
          {/* Instagram option */}
          <a
            href="https://www.instagram.com/vero.nikadent/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-option contact-option--instagram"
            onClick={onClose}
          >
            <div className="contact-option__icon">
              <FiInstagram size={32} />
            </div>
            <div className="contact-option__text">
              <strong>Написати в Instagram</strong>
              <span>@vero.nikadent</span>
            </div>
            <div className="contact-option__arrow">→</div>
          </a>

          {/* Call option */}
          <a
            href="tel:0502121394"
            className="contact-option contact-option--phone"
            onClick={onClose}
          >
            <div className="contact-option__icon">
              <FiPhone size={32} />
            </div>
            <div className="contact-option__text">
              <strong>Зателефонувати</strong>
              <span>050 212 13 94</span>
            </div>
            <div className="contact-option__arrow">→</div>
          </a>
        </div>

        <p className="modal__hours">
          📅 Працюємо пн – сб, 9:00 – 20:00
        </p>
      </div>
    </div>
  )
}
