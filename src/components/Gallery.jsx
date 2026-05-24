import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import './Gallery.css'

const interiorSlides = [
  { label: 'Кабінет лікаря', emoji: '🏥', src: '/images/rooms/kabinet.jpeg' },
  { label: 'Затишний простір',  emoji: '✨', src: '/images/rooms/room1.jpg' },
  { label: 'Вхід до клініки',  emoji: '🚪', src: '/images/rooms/vkhod.jpg' },
]

const beforeAfter = [
  {
    before: '/images/before_after/before1.png',
    after:  '/images/before_after/after1.png',
    name: 'Результат лікування',
    desc: 'Комплексне відновлення посмішки',
  },
  {
    before: '/images/before_after/before2.png',
    after:  '/images/before_after/after2.png',
    name: 'Ортодонтія',
    desc: 'Вирівнювання зубів та корекція прикусу',
  },
]

export default function Gallery() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [beforeAfterIndex, setBeforeAfterIndex] = useState(0)

  const prev = () => setCurrentSlide(c => (c - 1 + interiorSlides.length) % interiorSlides.length)
  const next = () => setCurrentSlide(c => (c + 1) % interiorSlides.length)

  const prevBA = () => setBeforeAfterIndex(c => (c - 1 + beforeAfter.length) % beforeAfter.length)
  const nextBA = () => setBeforeAfterIndex(c => (c + 1) % beforeAfter.length)

  const slide = interiorSlides[currentSlide]
  const ba = beforeAfter[beforeAfterIndex]

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <div className="gallery__header" data-reveal="up">
          <span className="section-tag">Галерея</span>
          <h2 className="section-title">Наша клініка та результати</h2>
          <p className="section-subtitle">Затишний простір, де кожна деталь продумана для вашого комфорту.</p>
        </div>

        <div className="gallery__layout">
          {/* Interior Photo Carousel */}
          <div className="gallery__carousel" data-reveal="left">
            <div className="gallery__slide">
              <img
                key={slide.src}
                src={slide.src}
                alt={slide.label}
                className="gallery__slide-img"
              />
              <div className="gallery__slide-label">
                <span>{slide.emoji}</span>
                <span>{slide.label}</span>
              </div>
            </div>
            <div className="gallery__controls">
              <button className="gallery__btn" onClick={prev}><FiChevronLeft size={20}/></button>
              <div className="gallery__dots">
                {interiorSlides.map((_, i) => (
                  <button
                    key={i}
                    className={`gallery__dot ${i === currentSlide ? 'gallery__dot--active' : ''}`}
                    onClick={() => setCurrentSlide(i)}
                  />
                ))}
              </div>
              <button className="gallery__btn" onClick={next}><FiChevronRight size={20}/></button>
            </div>
          </div>

          {/* Before / After with real photos */}
          <div className="gallery__before-after" data-reveal="right">
            <h3 className="gallery__ba-title">До і після 😊</h3>

            <div className="gallery__ba-card">
              <div className="ba-side ba-side--before">
                <span className="ba-label ba-label--before">До</span>
                <img src={ba.before} alt="До лікування" className="ba-photo" />
              </div>
              <div className="ba-divider">
                <div className="ba-arrow">→</div>
              </div>
              <div className="ba-side ba-side--after">
                <span className="ba-label ba-label--after">Після</span>
                <img src={ba.after} alt="Після лікування" className="ba-photo" />
              </div>
            </div>

            <div className="gallery__ba-info">
              <strong>{ba.name}</strong>
              <span>{ba.desc}</span>
            </div>

            <div className="gallery__ba-controls">
              <button className="gallery__btn" onClick={prevBA}><FiChevronLeft size={18}/></button>
              <div className="gallery__dots">
                {beforeAfter.map((_, i) => (
                  <button
                    key={i}
                    className={`gallery__dot ${i === beforeAfterIndex ? 'gallery__dot--active' : ''}`}
                    onClick={() => setBeforeAfterIndex(i)}
                  />
                ))}
              </div>
              <button className="gallery__btn" onClick={nextBA}><FiChevronRight size={18}/></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
