import React, { useState, useCallback } from 'react'
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi'
import './Reviews.css'

const reviews = [
  {
    name: 'Анастасия Сидоренко',
    avatar: '👩',
    date: 'Google Maps',
    rating: 5,
    text: 'Полечили зубки у Оксаны Станиславовны — как всегда всё на высшем уровне! Очень внимательный, аккуратный и профессиональный врач. Ребёнок чувствует себя спокойно и без страха, а это для нас самое главное. Мы уже переходим за Оксаной Станиславовной в третью клинику — и это лучшее подтверждение доверия. Огромное спасибо за заботу и качественную работу! 🤍',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
  {
    name: 'Руслана Руслана',
    avatar: '👩‍🦱',
    date: 'Google Maps',
    rating: 5,
    text: 'Прекрасна клініка з високо-професійними зубними феями, які дозволяють корисні цукерки вже під час лікування, морозиво опісля, дарують подарунки та постійно турбуються за відчуття маленького пацієнта. Шокує те, що твоя вічно ниюча дитина лежить мовчки, коли їй відкрили зуба до нерва. Без вмовлянь, тихо і спокійно пройшов весь сеанс лікування двох зубчиків з закисом азоту.',
    tag: 'Закис азоту',
    tagColor: '#E8F4FD',
    tagAccent: '#2B90D9',
  },
  {
    name: 'Ольга Роянова',
    avatar: '👩‍🦰',
    date: 'Google Maps',
    rating: 5,
    text: 'Рекомендую від усього серця! Після візитів залишилися лише позитивні враження — і я, і дитина почувалися комфортно та спокійно. У клініці панує атмосфера турботи й людяності. Лікарі уважні, професійні та справді зацікавлені в результаті. Використовують сучасне обладнання та новітні методи лікування, усе пояснюють доступно й чесно. Ціни прозорі.',
    tag: 'Сімейна стоматологія',
    tagColor: '#F0FDF8',
    tagAccent: '#2BAD7E',
  },
  {
    name: 'Олександра Лупеха',
    avatar: '👩',
    date: 'Google Maps',
    rating: 5,
    text: 'Відвідали клініку вперше. Були приємно вражені правильним підходом до діток та довірою, яку лікар викликав до себе. Жодного дискомфорту, болю та страху. Дитина ще й з подарунком вийшла. Рекомендую.',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
  {
    name: 'Anna S',
    avatar: '👩‍🦳',
    date: 'Google Maps',
    rating: 5,
    text: 'Хочеться безкінечно казати ДЯКУЮ такому чудовому спеціалісту своєї справи! Вероніка Павлівна-чарівниця! ❤️ Моя донька вас обожнює) навіть після перерви 4 роки дитина згадує лікаря з теплом, а це ого-го-го)) 10 зірок із 5 можливих! Бо ви того варті!)',
    tag: 'Дитяча стоматологія',
    tagColor: '#F8E8FE',
    tagAccent: '#9333EA',
  },
  {
    name: 'Nadia Tureiska',
    avatar: '👩',
    date: 'Google Maps',
    rating: 5,
    text: 'Це не просто стоматологічна клініка– це наш особистий рай! Без перебільшень. Як і більшість дітей, моє чадо страшенно боялось стоматологів. Але після першого візиту, на наступні ми вже бігли просто із задоволенням. Персонал привітний, уважний та професійний, одразу знайшли підхід до донечки. Вероніка Павлівна просто чарівниця💕',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
  {
    name: 'Oksana Kashpirovska',
    avatar: '👩‍🦰',
    date: 'Google Maps',
    rating: 5,
    text: 'Чудова клініка! Хочемо висловити щиру подяку Вероніці Павлівні. Ми довірили їй зуби всієї родини, і результат завжди бездоганний. Лікар дуже уважна, делікатна, усе доступно пояснює і створює атмосферу спокою навіть для дітей. Це той стоматолог, якому можна повністю довіряти. Дякуємо за вашу роботу та турботу!',
    tag: 'Сімейна стоматологія',
    tagColor: '#F0FDF8',
    tagAccent: '#2BAD7E',
  },
  {
    name: 'Alona Mashinskaya',
    avatar: '👩',
    date: 'Google Maps',
    rating: 5,
    text: 'Лікар просто майстер своєї справи!!! Дитина задоволена, ні краплі сліз! Всі питання вирішено! Обов\'язково прийдемо ще!',
    tag: 'Дитяча стоматологія',
    tagColor: '#FDE8EE',
    tagAccent: '#E8608A',
  },
  {
    name: 'Alena Alena',
    avatar: '👩‍🦱',
    date: 'Google Maps',
    rating: 5,
    text: 'Ми довго не могли наважитись кудись піти зі своїм проблемним зубом. Побачила в чаті рекомендації на цю стоматологію, знайшла на гугл, відгуки позитивні. Записались. І я вдячна Vero.nikadent за відношення до дитини, за обстеження, за роз\'яснення і за лікування. Після лікування, нічого не боліло, відновлення пройшло чудово! Дякую вам!',
    tag: 'Лікування',
    tagColor: '#E8F4FD',
    tagAccent: '#2B90D9',
  },
  {
    name: 'Daria Stratiychuk',
    avatar: '👩',
    date: 'Google Maps',
    rating: 5,
    text: 'Найкращий візит до дитячого стоматолога! Пломбували зубчик моїй 4-х річній дитині з закисом азота, все було ідеально. Дякую за підхід! І за подарунки:)',
    tag: 'Закис азоту',
    tagColor: '#FDF6E8',
    tagAccent: '#D4943A',
  },
]

const VISIBLE = 3
const MAX_START = reviews.length - VISIBLE

export default function Reviews() {
  const [start, setStart] = useState(0)
  const [animating, setAnimating] = useState(false)

  const shift = useCallback((dir) => {
    if (animating) return
    setAnimating(true)
    setTimeout(() => {
      setStart(s => Math.max(0, Math.min(s + dir, MAX_START)))
      setAnimating(false)
    }, 280)
  }, [animating])

  const visible = reviews.slice(start, start + VISIBLE)

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
              <strong>5.0</strong>
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

              <a
                href="https://maps.app.goo.gl/6eArZnWYadFTx1R59"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#6B7280', textDecoration: 'none', fontWeight: 600 }}
              >
                <span>🗺️</span> Google Maps
              </a>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="reviews__nav">
          <button className="gallery__btn" onClick={() => shift(-1)}>
            <FiChevronLeft size={20}/>
          </button>
          <div className="gallery__dots">
            {Array.from({ length: MAX_START + 1 }, (_, i) => (
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
