import React from 'react'
import { FiStar } from 'react-icons/fi'
import './Reviews.css'

const MAPS = 'https://maps.app.goo.gl/6eArZnWYadFTx1R59'

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

const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')
const tones = ['blue', 'rose', 'mint', 'butter', 'violet']

function Card({ r, i }) {
  return (
    <a href={MAPS} target="_blank" rel="noopener noreferrer" className={`rv rv--${tones[i % tones.length]}`}>
      <div className="rv__stars">
        {[...Array(r.rating)].map((_, j) => <FiStar key={j} size={16} fill="currentColor" />)}
      </div>
      <p className="rv__text">{r.text}</p>
      <div className="rv__author">
        <span className="rv__ava">{initials(r.name)}</span>
        <div>
          <strong>{r.name}</strong>
          <small>{r.tag} · Google Maps</small>
        </div>
      </div>
    </a>
  )
}

function Row({ items, reverse, offset }) {
  return (
    <div className={`rv-row ${reverse ? 'rv-row--rev' : ''}`}>
      <div className="rv-row__track">
        {[0, 1].map((k) => (
          <div className="rv-row__set" key={k} aria-hidden={k > 0}>
            {items.map((r, i) => <Card key={i} r={r} i={i + offset} />)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Reviews() {
  const half = Math.ceil(reviews.length / 2)
  return (
    <section className="reviews section" id="reviews">
      <div className="container reviews__head">
        <div>
          <span className="eyebrow" data-reveal>Відгуки</span>
          <h2 className="h2" data-reveal style={{ '--d': '60ms' }}>
            «Вероніка Павлівна —<br /><em>чарівниця</em>»
          </h2>
          <p className="lead" data-reveal style={{ '--d': '120ms' }}>
            Справжні відгуки батьків і пацієнтів з Google Maps.
          </p>
        </div>

        <div data-reveal="zoom">
        <a href={MAPS} target="_blank" rel="noopener noreferrer" className="score" data-tilt="8">
          <span className="score__num">5.0</span>
          <span className="score__stars">
            {[...Array(5)].map((_, i) => <FiStar key={i} size={22} fill="currentColor" style={{ '--i': i }} />)}
          </span>
          <span className="score__label">рейтинг у Google Maps</span>
        </a>
        </div>
      </div>

      <div className="reviews__rows" data-reveal="fade">
        <Row items={reviews.slice(0, half)} offset={0} />
        <Row items={reviews.slice(half)} offset={1} reverse />
      </div>
    </section>
  )
}
