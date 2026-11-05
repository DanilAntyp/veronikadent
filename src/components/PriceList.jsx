import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { FiSearch, FiDownload, FiX, FiCheck, FiPlus, FiCalendar } from 'react-icons/fi'
import { priceCategories, formatPrice, minPrice, countItems } from '../data/prices'
import './PriceList.css'

const PDF = '/pricelist/price-list.pdf'

const plural = (n) => {
  const a = n % 10, b = n % 100
  if (a === 1 && b !== 11) return 'послугу'
  if (a >= 2 && a <= 4 && (b < 12 || b > 14)) return 'послуги'
  return 'послуг'
}

const norm = (s) => s.toLowerCase().replace(/[’'`]/g, '')

function Highlight({ text, q }) {
  if (!q) return text
  const i = text.toLowerCase().indexOf(q.toLowerCase())
  if (i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <mark>{text.slice(i, i + q.length)}</mark>
      {text.slice(i + q.length)}
    </>
  )
}

export default function PriceList({ tab, setTab, onBooking }) {
  const [q, setQ] = useState('')
  const [picked, setPicked] = useState({}) // key → {name, price}
  const tabsRef = useRef(null)
  const [ind, setInd] = useState({ x: 0, w: 0 })

  const tabs = useMemo(
    () => [
      { id: 'all', short: 'Усі послуги', emoji: '📋', count: priceCategories.reduce((s, c) => s + countItems(c), 0) },
      ...priceCategories.map((c) => ({ id: c.id, short: c.short, emoji: c.emoji, count: countItems(c) })),
    ],
    []
  )

  // Позиція «повзунка» під активною вкладкою
  useLayoutEffect(() => {
    const wrap = tabsRef.current
    const btn = wrap?.querySelector(`[data-tab="${tab}"]`)
    if (!btn) return
    setInd({ x: btn.offsetLeft, w: btn.offsetWidth })
    const left = btn.offsetLeft - wrap.clientWidth / 2 + btn.offsetWidth / 2
    wrap.scrollTo({ left, behavior: 'smooth' })
  }, [tab])

  useEffect(() => {
    const onResize = () => {
      const btn = tabsRef.current?.querySelector(`[data-tab="${tab}"]`)
      if (btn) setInd({ x: btn.offsetLeft, w: btn.offsetWidth })
    }
    addEventListener('resize', onResize)
    document.fonts?.ready.then(onResize)
    return () => removeEventListener('resize', onResize)
  }, [tab])

  const query = q.trim()
  const visible = useMemo(() => {
    const cats = query || tab === 'all' ? priceCategories : priceCategories.filter((c) => c.id === tab)
    if (!query) return cats
    const nq = norm(query)
    return cats
      .map((c) => ({
        ...c,
        groups: c.groups
          .map((g) => ({ ...g, items: g.items.filter(([n, , note]) => norm(n).includes(nq) || (note && norm(note).includes(nq)) || norm(g.title).includes(nq)) }))
          .filter((g) => g.items.length),
      }))
      .filter((c) => c.groups.length)
  }, [tab, query])

  const found = visible.reduce((s, c) => s + countItems(c), 0)

  const toggle = (key, name, price) =>
    setPicked((p) => {
      const n = { ...p }
      if (n[key]) delete n[key]
      else n[key] = { name, price }
      return n
    })

  const pickedList = Object.values(picked)
  const total = pickedList.reduce((s, i) => s + i.price, 0)

  return (
    <section className="prices" id="prices">
      <div className="prices__inner">
        <div className="container">
          <div className="prices__head">
            <div>
              <span className="eyebrow eyebrow--light" data-reveal>Прайс-лист</span>
              <h2 className="prices__title" data-reveal style={{ '--d': '60ms' }}>
                Чесні ціни.<br /><span>Без сюрпризів.</span>
              </h2>
            </div>
            <div className="prices__intro" data-reveal style={{ '--d': '120ms' }}>
              <p>
                Знайдіть потрібну послугу або позначте кілька — ми одразу порахуємо орієнтовну вартість лікування.
              </p>
              <a href={PDF} download="Прайс-лист Vero.nikadent.pdf" className="btn btn--light btn--sm" data-magnetic>
                <FiDownload size={16} /> Завантажити PDF
              </a>
            </div>
          </div>

          <div className="prices__controls">
            <label className="psearch" data-reveal>
              <FiSearch size={20} />
              <input
                type="search"
                placeholder="Пошук послуги: пломба, брекети, чистка…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Пошук послуги"
              />
              {q && (
                <button type="button" onClick={() => setQ('')} aria-label="Очистити пошук"><FiX size={18} /></button>
              )}
            </label>

            <div className={`ptabs ${query ? 'is-muted' : ''}`} ref={tabsRef} role="tablist" data-reveal style={{ '--d': '80ms' }}>
              <span className="ptabs__ind" style={{ transform: `translateX(${ind.x}px)`, width: ind.w }} />
              {tabs.map((t) => (
                <button
                  key={t.id}
                  data-tab={t.id}
                  role="tab"
                  aria-selected={tab === t.id}
                  className={`ptab ${tab === t.id ? 'is-active' : ''}`}
                  onClick={() => { setTab(t.id); setQ('') }}
                >
                  <span className="ptab__e">{t.emoji}</span>
                  {t.short}
                  <span className="ptab__n">{t.count}</span>
                </button>
              ))}
            </div>
          </div>

          {query && (
            <p className="prices__found">
              {found ? <>Знайдено <b>{found}</b> {plural(found)} за запитом «{query}»</> : null}
            </p>
          )}

          <div className="prices__body" key={query ? 'q' : tab}>
            {visible.length === 0 && (
              <div className="prices__empty">
                <span>🦷</span>
                <h3>Такої послуги в прайсі немає</h3>
                <p>Зателефонуйте нам — підкажемо, чи можемо допомогти.</p>
                <a href="tel:0502121394" className="btn btn--light btn--sm">050 212 13 94</a>
              </div>
            )}

            {visible.map((c, ci) => (
              <div className="pcat" key={c.id} style={{ '--c': c.color, '--cs': c.soft }}>
                <div className="pcat__head" style={{ '--i': ci }}>
                  <span className="pcat__emoji">{c.emoji}</span>
                  <h3>{c.title}</h3>
                  <span className="pcat__meta">від {formatPrice(minPrice(priceCategories.find((x) => x.id === c.id)))} ₴</span>
                </div>

                <div className="pcat__groups">
                  {c.groups.map((g, gi) => (
                    <div className="pgroup" key={g.title} style={{ '--i': gi + ci * 2 }}>
                      <div className="pgroup__head">
                        <h4>{g.title}</h4>
                        <span>{g.items.length}</span>
                      </div>
                      {g.note && <p className="pgroup__note">{g.note}</p>}
                      <ul>
                        {g.items.map(([name, price, note]) => {
                          const key = `${c.id}|${g.title}|${name}`
                          const on = !!picked[key]
                          return (
                            <li key={key}>
                              <button
                                type="button"
                                className={`prow ${on ? 'is-on' : ''}`}
                                onClick={() => toggle(key, name, price)}
                                aria-pressed={on}
                              >
                                <span className="prow__check">{on ? <FiCheck size={14} /> : <FiPlus size={14} />}</span>
                                <span className="prow__name">
                                  <Highlight text={name} q={query} />
                                  {note && <small><Highlight text={note} q={query} /></small>}
                                </span>
                                <span className="prow__dots" />
                                <span className="prow__price">{formatPrice(price)}<i>₴</i></span>
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="prices__note">
            * Ціни вказані в гривнях. Точну вартість і план лікування лікар визначає після огляду.
          </p>
        </div>
      </div>

      {/* Кошторис */}
      <div className={`estimate ${pickedList.length ? 'is-on' : ''}`} aria-live="polite">
        <div className="estimate__inner">
          <div className="estimate__info">
            <span className="estimate__count">{pickedList.length}</span>
            <div>
              <small>Орієнтовна вартість</small>
              <strong>{formatPrice(total)} ₴</strong>
            </div>
          </div>
          <div className="estimate__actions">
            <button className="estimate__clear" onClick={() => setPicked({})}>Очистити</button>
            <button className="btn btn--sm btn--light" onClick={onBooking}>
              <FiCalendar size={16} /> Записатися
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
