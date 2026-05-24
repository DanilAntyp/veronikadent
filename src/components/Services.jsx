import React, { useState } from 'react'
import { FiDownload } from 'react-icons/fi'
import './Services.css'

const priceListPDF = '/pricelist/price-list.pdf'

const services = [
  {
    emoji: '🧸',
    title: 'Дитяча стоматологія',
    color: '#FDE8EE',
    accent: '#E8608A',
    border: '#F8C5D5',
    desc: 'Лікування молочних і постійних зубів у дітей в атмосфері довіри та гри. Перший візит — знайомство без інструментів.',
    features: ['Лікування без страху', 'Ігрова терапія', 'Сучасна анестезія', 'Профілактика карієсу'],
    icon: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="#FDE8EE"/>
        <path d="M20 20 C20 17 23 16 30 18 C37 16 40 17 40 20 C41.5 26 40.5 33 38 38 C37 41 36 44 35 44 C34 44 33.5 40 32.5 37 L30 32 L27.5 37 C26.5 40 26 44 25 44 C24 44 23 41 22 38 C19.5 33 18.5 26 20 20Z" fill="#F093B0" stroke="#E8608A" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    emoji: '🔬',
    title: 'Лікування під мікроскопом',
    color: '#E8F4FD',
    accent: '#2B90D9',
    border: '#C5E4F8',
    desc: 'Ендодонтичне лікування каналів під 25-кратним збільшенням. Точна діагностика та якісний результат.',
    features: ['Точність 25x', 'Стерильність', 'Без повторного лікування', 'Виявлення прихованих проблем'],
    icon: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="#E8F4FD"/>
        <rect x="24" y="16" width="12" height="22" rx="6" fill="#5AB0E8" stroke="#2B90D9" strokeWidth="1.5"/>
        <rect x="18" y="38" width="24" height="6" rx="3" fill="#93CCF0"/>
        <line x1="30" y1="44" x2="30" y2="50" stroke="#2B90D9" strokeWidth="2"/>
        <line x1="22" y1="50" x2="38" y2="50" stroke="#2B90D9" strokeWidth="2"/>
        <circle cx="30" cy="24" r="4" fill="white" stroke="#2B90D9" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    emoji: '😁',
    title: 'Ортодонтія',
    color: '#F0FDF8',
    accent: '#2BAD7E',
    border: '#C5F0DF',
    desc: 'Брекет-системи та елайнери для дітей і дорослих. Виправляємо прикус і вирівнюємо зуби для красивої усмішки.',
    features: ['Брекети металеві', 'Сапфірові брекети', 'Елайнери Invisalign', 'Дитячі пластинки'],
    icon: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="#F0FDF8"/>
        <path d="M16 28 Q30 40 44 28" stroke="#2BAD7E" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <rect x="19" y="23" width="7" height="10" rx="3.5" fill="#4ADE80" stroke="#2BAD7E" strokeWidth="1.5"/>
        <rect x="28" y="21" width="7" height="12" rx="3.5" fill="#4ADE80" stroke="#2BAD7E" strokeWidth="1.5"/>
        <rect x="37" y="23" width="7" height="10" rx="3.5" fill="#4ADE80" stroke="#2BAD7E" strokeWidth="1.5"/>
        <line x1="19" y1="28" x2="44" y2="28" stroke="#2BAD7E" strokeWidth="1.5"/>
      </svg>
    )
  },
  {
    emoji: '✨',
    title: 'Гігієна',
    color: '#FDF6E8',
    accent: '#D4943A',
    border: '#F8E5C5',
    desc: 'Професійна чистка зубів, видалення зубного нальоту й каменю ультразвуком. Відбілювання та захисне покриття.',
    features: ['Ультразвукова чистка', 'Air Flow', 'Відбілювання', 'Покриття фторидом'],
    icon: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="#FDF6E8"/>
        <path d="M18 35 Q18 20 30 20 Q42 20 42 35" stroke="#D4943A" strokeWidth="2.5" fill="none"/>
        <rect x="26" y="28" width="8" height="14" rx="4" fill="#F8E5C5" stroke="#D4943A" strokeWidth="1.5"/>
        <circle cx="30" cy="18" r="4" fill="#FBBF24" stroke="#D4943A" strokeWidth="1.5"/>
        <path d="M22 42 Q30 48 38 42" stroke="#D4943A" strokeWidth="2" fill="none" strokeLinecap="round"/>
        <circle cx="21" cy="37" r="2.5" fill="#FDE68A"/>
        <circle cx="39" cy="37" r="2.5" fill="#FDE68A"/>
      </svg>
    )
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Турбота про усмішку всієї родини',
    color: '#F8E8FE',
    accent: '#9333EA',
    border: '#DFB5F5',
    desc: "Комплексна стоматологія для всіх членів сім’ї. Від першого молочного зуба малюка до протезування бабусі.",
    features: ['Сімейний лікар', 'Зручний запис', 'Знижки для сімей', "Єдина карта здоров’я"],
    icon: (
      <svg viewBox="0 0 60 60" fill="none">
        <circle cx="30" cy="30" r="28" fill="#F8E8FE"/>
        <circle cx="20" cy="22" r="8" fill="#DFB5F5" stroke="#9333EA" strokeWidth="1.5"/>
        <circle cx="40" cy="22" r="8" fill="#DFB5F5" stroke="#9333EA" strokeWidth="1.5"/>
        <circle cx="30" cy="35" r="9" fill="#C084FC" stroke="#9333EA" strokeWidth="1.5"/>
        <path d="M24 36 Q30 42 36 36" stroke="#7E22CE" strokeWidth="2" fill="none" strokeLinecap="round"/>
      </svg>
    )
  },
]

export default function Services() {
  const [active, setActive] = useState(null)

  return (
    <section className="services" id="services">
      <div className="services__bg-shape" />

      <div className="container">
        <div className="services__header" data-reveal="up">
          <span className="section-tag">Наші послуги</span>
          <h2 className="section-title">Все, що потрібно для<br/>здорової усмішки</h2>
          <p className="section-subtitle">
            Сучасна стоматологія для дітей та дорослих. Підбираємо підхід індивідуально.
          </p>
          <a
            href={priceListPDF}
            download="Прайс-лист Vero.nikadent.pdf"
            className="services__price-btn"
          >
            <FiDownload size={18} />
            Завантажити прайс-лист
          </a>
        </div>

        <div className="services__scroll-wrapper">
        <div className="services__grid">
          {services.map((s, i) => (
            <div
              key={i}
              className={`service-card ${active === i ? 'service-card--active' : ''}`}
              style={{ '--card-color': s.color, '--card-accent': s.accent, '--card-border': s.border, '--reveal-delay': `${i * 100}ms` }}
              data-reveal="up"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive(active === i ? null : i)}
            >
              <div className="service-card__icon">
                {s.icon}
              </div>
              <h3 className="service-card__title">{s.title}</h3>
              <p className="service-card__desc">{s.desc}</p>
              <ul className="service-card__features">
                {s.features.map((f, j) => (
                  <li key={j}>
                    <span className="feature-dot" style={{ background: s.accent }} />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
