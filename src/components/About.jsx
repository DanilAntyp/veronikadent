import React, { useEffect, useRef, useState } from 'react'
import { FiCheck } from 'react-icons/fi'
import './About.css'

const statement =
  'Ми створили простір, де турбота, сучасні технології та щире ставлення стають основою кожного прийому — щоб діти йшли до стоматолога з усмішкою, а батьки були спокійні.'

const highlights = [
  'Сучасне обладнання та методики',
  'Сертифіковані спеціалісти',
  'Особистий підхід до кожного',
  'Турбота без стресу та сліз',
]

const counters = [
  { to: 2000, suffix: '+', label: 'щасливих пацієнтів' },
  { to: 5, suffix: '.0', label: 'середня оцінка в Google' },
  { to: 7, suffix: '', label: 'людей у команді турботи' },
  { to: 6, suffix: '', label: 'днів на тиждень для вас' },
]

/** Лічильник, що «докручується» при появі на екрані */
function Counter({ to, suffix }) {
  const ref = useRef(null)
  const [v, setV] = useState(0)
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const t0 = performance.now()
      const dur = 1800
      const tick = (t) => {
        const k = Math.min(1, (t - t0) / dur)
        const eased = 1 - Math.pow(1 - k, 4)
        setV(Math.round(to * eased))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.6 })
    io.observe(el)
    return () => io.disconnect()
  }, [to])
  return <span ref={ref}>{v.toLocaleString('uk-UA')}{suffix}</span>
}

export default function About() {
  const textRef = useRef(null)
  const photoRef = useRef(null)

  // Слова «зафарбовуються» в міру прокрутки + паралакс фото
  useEffect(() => {
    const words = textRef.current.querySelectorAll('.stmt__w')
    let raf = 0
    const update = () => {
      raf = 0
      const r = textRef.current.getBoundingClientRect()
      const start = innerHeight * 0.85
      const end = innerHeight * 0.35
      const p = Math.min(1, Math.max(0, (start - r.top) / (start - end + r.height * 0.6)))
      const lit = Math.floor(p * words.length)
      words.forEach((w, i) => w.classList.toggle('is-lit', i < lit))

      const pr = photoRef.current?.getBoundingClientRect()
      if (pr) {
        const c = (pr.top + pr.height / 2 - innerHeight / 2) / innerHeight
        photoRef.current.style.setProperty('--py', `${c * -60}px`)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { removeEventListener('scroll', onScroll); cancelAnimationFrame(raf) }
  }, [])

  return (
    <section className="about section" id="about">
      <div className="container">
        <span className="eyebrow" data-reveal>Про нас</span>
        <p className="stmt" ref={textRef} aria-label={statement}>
          {statement.split(' ').map((w, i) => (
            <span key={i} className="stmt__w" aria-hidden="true">{w} </span>
          ))}
        </p>

        <div className="about__grid">
          <div className="about__photo" data-reveal="clip" ref={photoRef}>
            <img src="/images/opt/team.jpg" alt="Команда Vero.nikadent у кабінеті" loading="lazy" />
            <span className="about__photo-tag">Де турбота стає традицією 💙</span>
          </div>

          <div className="about__side">
            <h2 className="about__title" data-reveal>
              Без страху, без сліз — <span>з довірою</span>
            </h2>
            <p className="about__p" data-reveal style={{ '--d': '80ms' }}>
              Ми дбаємо не лише про здорові зуби, а й про комфорт дитини, спокій батьків і позитивний досвід. Працюємо м’яко, уважно та професійно — від першого знайомства до складного лікування.
            </p>
            <p className="about__p" data-reveal style={{ '--d': '140ms' }}>
              Пояснюємо кожен етап простими словами й допомагаємо дітям звикнути до стоматолога без стресу.
            </p>
            <ul className="about__list">
              {highlights.map((h, i) => (
                <li key={h} data-reveal style={{ '--d': `${200 + i * 80}ms` }}>
                  <span><FiCheck /></span>{h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="counters">
          {counters.map((c, i) => (
            <div key={c.label} className="counter" data-reveal style={{ '--d': `${i * 90}ms` }}>
              <strong><Counter to={c.to} suffix={c.suffix} /></strong>
              <span>{c.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
