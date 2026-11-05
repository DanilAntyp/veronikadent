import React from 'react'
import { FiArrowUpRight } from 'react-icons/fi'
import { priceCategories, minPrice, formatPrice } from '../data/prices'
import './Services.css'

const from = (id) => formatPrice(minPrice(priceCategories.find((c) => c.id === id)))

const services = [
  {
    id: 'kids',
    size: 'xl',
    tone: 'rose',
    emoji: '🧸',
    title: 'Дитяча стоматологія',
    desc: 'Лікування молочних і постійних зубів в атмосфері довіри та гри. Перший візит — знайомство без інструментів.',
    features: ['Лікування без страху', 'Ігрова терапія', 'Закис азоту', 'Профілактика карієсу'],
  },
  {
    id: 'endo',
    size: 'md',
    tone: 'violet',
    emoji: '🔬',
    title: 'Лікування під мікроскопом',
    desc: 'Ендодонтія під 25-кратним збільшенням: точна діагностика та якісне лікування каналів.',
    features: ['Точність 25×', 'Стерильність', 'Складні випадки'],
  },
  {
    id: 'ortho',
    size: 'md',
    tone: 'mint',
    emoji: '😁',
    title: 'Ортодонтія',
    desc: 'Брекет-системи та апарати для дітей і дорослих. Виправляємо прикус і вирівнюємо зуби.',
    features: ['Металеві', 'Керамічні', 'Сапфірові', 'Самолігуючі'],
  },
  {
    id: 'prophylaxis',
    size: 'sm',
    tone: 'butter',
    emoji: '✨',
    title: 'Гігієна та відбілювання',
    desc: 'Ультразвук, Air Flow, фторування та відбілювання.',
    features: ['Ультразвук', 'Air Flow', 'Відбілювання'],
  },
  {
    id: 'caries',
    size: 'lg',
    tone: 'blue',
    emoji: '💙',
    title: 'Турбота про усмішку всієї родини',
    desc: 'Лікування карієсу, естетичні реставрації та коронки. Від першого молочного зуба малюка — до усмішки бабусі.',
    features: ['Фотополімерні пломби', 'Реставрації', 'Цирконієві коронки'],
  },
]

export default function Services({ onShowPrices }) {
  return (
    <section className="services section" id="services">
      <div className="container">
        <div className="services__head">
          <div>
            <span className="eyebrow" data-reveal>Наші послуги</span>
            <h2 className="h2" data-reveal style={{ '--d': '60ms' }}>
              Все для <em>здорової</em><br />усмішки
            </h2>
          </div>
          <p className="lead" data-reveal style={{ '--d': '120ms' }}>
            Сучасна стоматологія для дітей та дорослих. Натисніть на картку, щоб одразу побачити ціни.
          </p>
        </div>

        <div className="bento">
          {services.map((s, i) => (
            <div key={s.id} className={`bento__cell bento__cell--${s.size}`} data-reveal style={{ '--d': `${i * 90}ms` }}>
              <article
                className={`svc svc--${s.tone}`}
                data-tilt="5"
                data-cursor
                role="button"
                tabIndex={0}
                onClick={() => onShowPrices(s.id)}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onShowPrices(s.id))}
                aria-label={`${s.title} — подивитися ціни`}
              >
                <span className="svc__spot" />
                {s.size === 'xl' && (
                  <div className="svc__stickers" aria-hidden="true">
                    {['🦷', '🎈', '⭐', '🍦', '🎁'].map((e, k) => <span key={k} style={{ '--k': k }}>{e}</span>)}
                  </div>
                )}
                <div className="svc__top">
                  <span className="svc__emoji">{s.emoji}</span>
                  <span className="svc__arrow"><FiArrowUpRight size={22} /></span>
                </div>
                <div className="svc__body">
                  <h3 className="svc__title">{s.title}</h3>
                  <p className="svc__desc">{s.desc}</p>
                  <ul className="svc__tags">
                    {s.features.map((f) => <li key={f}>{f}</li>)}
                  </ul>
                  <div className="svc__price">
                    від <b>{from(s.id)} ₴</b>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
