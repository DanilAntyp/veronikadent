import React, { useCallback, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiMove } from 'react-icons/fi'
import './Gallery.css'

const rooms = [
  { label: 'Кабінет лікаря', src: '/images/opt/kabinet.jpg' },
  { label: 'Затишний простір', src: '/images/rooms/room1.jpg' },
  { label: 'Вхід до клініки', src: '/images/rooms/vkhod.jpg' },
]

const cases = [
  { before: '/images/opt/before1.jpg', after: '/images/opt/after1.jpg', name: 'Результат лікування', desc: 'Комплексне відновлення усмішки' },
  { before: '/images/opt/before2.jpg', after: '/images/opt/after2.jpg', name: 'Ортодонтія', desc: 'Вирівнювання зубів та корекція прикусу' },
]

/** Порівняння «до/після» з повзунком, який можна тягнути */
function Compare({ item }) {
  const ref = useRef(null)
  const [pos, setPos] = useState(50)
  const [touched, setTouched] = useState(false)

  const setFrom = useCallback((clientX) => {
    const r = ref.current.getBoundingClientRect()
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)))
  }, [])

  const onDown = (e) => {
    setTouched(true)
    ref.current.setPointerCapture(e.pointerId)
    setFrom(e.clientX)
  }
  const onMove = (e) => {
    if (e.buttons === 0 && e.pointerType === 'mouse') return
    if (ref.current.hasPointerCapture(e.pointerId)) setFrom(e.clientX)
  }
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') setPos((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPos((p) => Math.min(100, p + 5))
  }

  return (
    <div
      className={`cmp ${touched ? 'is-touched' : ''}`}
      ref={ref}
      onPointerDown={onDown}
      onPointerMove={onMove}
      style={{ '--pos': `${pos}%` }}
      data-cursor
    >
      <img src={item.after} alt="Після лікування" draggable="false" />
      <div className="cmp__before">
        <img src={item.before} alt="До лікування" draggable="false" />
      </div>
      <span className="cmp__label cmp__label--b">До</span>
      <span className="cmp__label cmp__label--a">Після</span>
      <div
        className="cmp__handle"
        role="slider"
        tabIndex={0}
        aria-label="Порівняння до і після"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pos)}
        onKeyDown={onKey}
      >
        <span><FiChevronLeft /><FiChevronRight /></span>
      </div>
      {!touched && <span className="cmp__hint"><FiMove /> Потягніть</span>}
    </div>
  )
}

export default function Gallery() {
  const [ci, setCi] = useState(0)
  const [top, setTop] = useState(0)

  const order = rooms.map((_, i) => (i - top + rooms.length) % rooms.length)

  return (
    <section className="gallery section" id="gallery">
      <div className="container">
        <div className="gallery__head">
          <span className="eyebrow" data-reveal>Результати та простір</span>
          <h2 className="h2" data-reveal style={{ '--d': '60ms' }}>
            Бачите <em>різницю?</em>
          </h2>
        </div>

        <div className="gallery__grid">
          <div className="gallery__cases" data-reveal="left">
            <Compare key={ci} item={cases[ci]} />
            <div className="gallery__case-bar">
              <div>
                <strong>{cases[ci].name}</strong>
                <span>{cases[ci].desc}</span>
              </div>
              <div className="gallery__case-nav">
                {cases.map((c, i) => (
                  <button key={i} className={i === ci ? 'is-active' : ''} onClick={() => setCi(i)}>
                    0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="gallery__rooms" data-reveal="right">
            <div className="stack" onClick={() => setTop((t) => (t + 1) % rooms.length)} data-cursor role="button" tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setTop((t) => (t + 1) % rooms.length)}
              aria-label="Наступне фото клініки">
              {rooms.map((r, i) => (
                <figure key={r.src} className="stack__card" style={{ '--o': order[i] }}>
                  <img src={r.src} alt={r.label} loading="lazy" draggable="false" />
                  <figcaption>{r.label}</figcaption>
                </figure>
              ))}
            </div>
            <p className="stack__hint">Натисніть, щоб погортати фото клініки</p>
          </div>
        </div>
      </div>
    </section>
  )
}
