import React, { useState, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'
import './Reviews.css'

const reviews = [
  {
    name: 'Катерина М.',
    avatar: '👩',
    date: 'Квітень 2025',
    rating: 5,
    text: 'Нарешті знайшли місце, де наша донька не плаче! Вероніка Сергіївна — просто чарівниця. Першого разу просто подивилися на інструменти, познайомилися, і Соня вже не боїться лікаря. Дякуємо від усього серця!',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
  {
    name: 'Андрій В.',
    avatar: '👨',
    date: 'Березень 2025',
    rating: 5,
    text: 'Лікував канали під мікроскопом. Олексій Іванович пояснив кожен крок, я навіть не відчув дискомфорту. Клініка сучасна, чиста, персонал дуже уважний. Однозначно рекомендую!',
    tag: 'Лікування під мікроскопом',
    tagColor: '#E8F4FD',
    tagAccent: '#2B90D9',
  },
  {
    name: 'Оксана Л.',
    avatar: '👩‍🦰',
    date: 'Лютий 2025',
    rating: 5,
    text: 'Марія зробила мені гігієну — це було як SPA! Зуби сяють, і нарешті позбулась зубного каменю. Вийшла з кабінету з широкою усмішкою. Тепер ходимо всією сім\'єю.',
    tag: 'Гігієна',
    tagColor: '#F0FDF8',
    tagAccent: '#2BAD7E',
  },
  {
    name: 'Світлана Т.',
    avatar: '👩‍🦱',
    date: 'Січень 2025',
    rating: 5,
    text: 'Поставили брекети синові 12 років. Дуже боялися, але тут підійшли індивідуально — вибрали кольорові лігатури, синок навіть радіє своїм брекетам! Прогрес чудовий. Рекомендую всім батькам!',
    tag: 'Ортодонтія',
    tagColor: '#F8E8FE',
    tagAccent: '#9333EA',
  },
  {
    name: 'Ірина К.',
    avatar: '👩‍🦳',
    date: 'Грудень 2024',
    rating: 5,
    text: 'Ходжу сюди з 2022 року. Завжди привітний персонал, завжди вчасний прийом. Довіряю цій клініці повністю — і зуби, і нерви в порядку! 😄',
    tag: 'Сімейна стоматологія',
    tagColor: '#FDF6E8',
    tagAccent: '#D4943A',
  },
  {
    name: 'Максим Д.',
    avatar: '👦',
    date: 'Листопад 2024',
    rating: 5,
    text: 'Мені 8 років і я більше не боюся лікаря! Тут дають дивитися мультики поки лікують зуби. І ще дають наліпки після прийому! Мама тоже задоволена.',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
]

const VISIBLE = 3

export default function Reviews() {
  const [start, setStart] = useState(0)
  const [animating, setAnimating] = useState(false)

  const shift = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setStart(s => (s + dir + reviews.length) % reviews.length)
      setAnimating(false)
    }, 280)
  }, [animating])

  const visible = Array.from({ length: VISIBLE }, (_, i) => reviews[(start + i) % reviews.length])

  return (
    <section className="reviews" id="reviews">
      <div className="reviews__blob" />
      <div className="container">
        <div className="reviews__header" data-reveal="up">
          <span className="section-tag">Відгуки</span>
          <h2 className="section-title">Що кажуть наші пацієнти</h2>
          <p className="section-subtitle">
            Більше 2000 щасливих усмішок. Читайте справжні відгуки від наших пацієнтів.
          </p>
        </div>

        {/* Rating summary */}
        <div className="reviews__summary" data-reveal="zoom">
          <div className="reviews__rating-big">
            <span className="rating-number">5.0</span>
            <div className="rating-stars">
              {[...Array(5)].map((_, i) => <FiStar key={i} size={20} fill="#FBBF24" color="#FBBF24"/>)}
            </div>
            <span className="rating-count">на основі 200+ відгуків</span>
          </div>
          <div className="reviews__platforms">
            <div className="platform-badge">
              <span>📱</span>
              <span>Instagram</span>
              <strong>5.0</strong>
            </div>
            <div className="platform-badge">
              <span>🗺️</span>
              <span>Google Maps</span>
              <strong>4.9</strong>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className={`reviews__grid ${animating ? 'reviews__grid--fade' : ''}`}>
          {visible.map((r, i) => (
            <div key={`${start}-${i}`} className="review-card">
              <div className="review-card__top">
                <div className="review-card__author">
                  <span className="review-avatar">{r.avatar}</span>
                  <div>
                    <strong className="review-name">{r.name}</strong>
                    <span className="review-date">{r.date}</span>
                  </div>
                </div>
                <div className="review-stars">
                  {[...Array(r.rating)].map((_, j) => (
                    <FiStar key={j} size={14} fill="#FBBF24" color="#FBBF24"/>
                  ))}
                </div>
              </div>

              <p className="review-text">"{r.text}"</p>

              <span
                className="review-tag"
                style={{ background: r.tagColor, color: r.tagAccent }}
              >
                {r.tag}
              </span>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="reviews__nav">
          <button className="gallery__btn" onClick={() => shift(-1)}>
            <FiChevronLeft size={20}/>
          </button>
          <div className="gallery__dots">
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`gallery__dot ${i === start ? 'gallery__dot--active' : ''}`}
                onClick={() => { if (!animating) { setStart(i) } }}
              />
            ))}
          </div>
          <button className="gallery__btn" onClick={() => shift(1)}>
            <FiChevronRight size={20}/>
          </button>
        </div>
      </div>
    </section>
  )
}
