import React, { useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import './Doctors.css'

const doctors = [
  {
    name: 'Антипенко Вероніка',
    role: 'Дитячий лікар',
    bio: 'Лікує маленьких пацієнтів з теплом і турботою. Перетворює кожен візит на цікаву пригоду, щоб дітки не боялися лікаря.',
    tags: ['Дитяча стоматологія', 'Профілактика'],
    tone: 'blue',
    photo: '/images/opt/veronika.jpg',
  },
  {
    name: 'Галушка Оксана Станіславівна',
    role: 'Лікар-терапевт',
    bio: 'Любить точність і результат, який видно одразу. Відновлює здоров’я та усмішки, робить складне — зрозумілим і безболісним.',
    tags: ['Терапія', 'Відновлення зубів'],
    tone: 'butter',
    photo: '/images/doctors/Галушка_Оксана_Станіславівна_Лікар_терапевт.jpeg',
  },
  {
    name: 'Пахолюк Ганна Олександрівна',
    role: 'Ортодонт',
    bio: 'Виправляє прикус та вирівнює зуби дітям і дорослим. Підходить індивідуально й ретельно пояснює кожен крок лікування.',
    tags: ['Ортодонтія', 'Брекети'],
    tone: 'mint',
    photo: '/images/doctors/hanna.jpeg',
  },
  {
    name: 'Бойко Віолета Андріївна',
    role: 'Пародонтолог',
    bio: 'Фахівець із захворювань пародонту. Допомагає зберегти здоров’я ясен та зубів на довгі роки — уважно і без болю.',
    tags: ['Пародонтологія', 'Здоров’я ясен'],
    tone: 'rose',
    photo: '/images/doctors/violeta.jpeg',
  },
  {
    name: 'Злигастєва Мар’яна',
    role: 'Асистент лікаря',
    bio: 'Тепла та уважна асистентка, з якою пацієнти почуваються спокійно з першої хвилини.',
    tags: ['Асистування', 'Робота з дітьми'],
    tone: 'violet',
    photo: '/images/doctors/maryana.jpeg',
  },
  {
    name: 'Покотило Ярослава',
    role: 'Асистент лікаря',
    bio: 'Забезпечує ідеальний порядок у кабінеті та комфорт пацієнтів під час кожної процедури.',
    tags: ['Стерилізація', 'Комфорт'],
    tone: 'blue',
    photo: '/images/doctors/yaroslava.jpeg',
  },
  {
    name: 'Швець Олена',
    role: 'Адміністратор',
    bio: 'Перша посмішка, яку ви бачите в клініці. Відповість на всі запитання та зручно організує ваш візит.',
    tags: ['Запис', 'Консультації'],
    tone: 'butter',
    photo: '/images/doctors/olena.jpeg',
  },
]

export default function Doctors() {
  const track = useRef(null)
  const drag = useRef(null)

  const scrollBy = (dir) => {
    const el = track.current
    const card = el.querySelector('.doc')
    el.scrollBy({ left: dir * (card.offsetWidth + 20), behavior: 'smooth' })
  }

  // Перетягування мишею (на тач-екранах працює нативний скрол)
  const onDown = (e) => {
    if (e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false }
    track.current.classList.add('is-drag')
  }
  const onMove = (e) => {
    if (!drag.current) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) drag.current.moved = true
    track.current.scrollLeft = drag.current.left - dx
  }
  const onUp = () => {
    drag.current = null
    track.current?.classList.remove('is-drag')
  }

  return (
    <section className="doctors section" id="doctors">
      <div className="container doctors__head">
        <div>
          <span className="eyebrow" data-reveal>Наша команда</span>
          <h2 className="h2" data-reveal style={{ '--d': '60ms' }}>
            Люди, яким <em>довіряють</em><br />найменші пацієнти
          </h2>
        </div>
        <div className="doctors__nav" data-reveal style={{ '--d': '120ms' }}>
          <button onClick={() => scrollBy(-1)} aria-label="Попередні"><FiArrowLeft size={22} /></button>
          <button onClick={() => scrollBy(1)} aria-label="Наступні"><FiArrowRight size={22} /></button>
        </div>
      </div>

      <div
        className="doctors__track"
        ref={track}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerLeave={onUp}
        data-cursor
      >
        {doctors.map((d, i) => (
          <div className="doc-wrap" key={d.name} data-reveal style={{ '--d': `${i * 80}ms` }}>
            <article className={`doc doc--${d.tone}`}>
              <div className="doc__photo">
                <img src={d.photo} alt={d.name} loading="lazy" draggable="false" />
              </div>
              <span className="doc__role">{d.role}</span>
              <div className="doc__info">
                <h3>{d.name}</h3>
                <p>{d.bio}</p>
                <div className="doc__tags">
                  {d.tags.map((t) => <span key={t}>{t}</span>)}
                </div>
              </div>
            </article>
          </div>
        ))}
        <div className="doc-spacer" aria-hidden="true" />
      </div>
    </section>
  )
}
