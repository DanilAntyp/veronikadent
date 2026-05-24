import React from 'react'
import { FiAward } from 'react-icons/fi'
import './Doctors.css'

const doctors = [
  {
    name: 'Антипенко Вероніка',
    role: 'Дитячий лікар',
    spec: 'Дитяча стоматологія, профілактика',
    bio: 'Лікує маленьких пацієнтів з теплом і турботою. Перетворює кожен візит на цікаву пригоду, щоб дітки не боялися лікаря.',
    tags: ['Дитяча стоматологія', 'Профілактика', 'Молочні зуби'],
    color: '#E8F4FD',
    accent: '#2B90D9',
    photo: '/images/doctors/Антипенко_Веронiка_Дитячий_лiкар.png',
  },
  {
    name: 'Бойко Віолета Андріївна',
    role: 'Пародонтолог',
    spec: 'Пародонтологія, лікування ясен',
    bio: "Фахівець із захворювань пародонту. Допомагає зберегти здоров'я ясен та зубів на довгі роки — уважно, без болю та з турботою.",
    tags: ['Пародонтологія', 'Хірургія ясен', 'Профілактика'],
    color: '#FDE8EE',
    accent: '#E8608A',
    photo: '/images/doctors/violeta.jpeg',
  },
  {
    name: "Злигастєва Мар'яна",
    role: 'Асистент лікаря',
    spec: 'Асистування, підготовка кабінету',
    bio: "Тепла та уважна асистентка, яка допомагає пацієнтам почуватися спокійно з першої хвилини. Завжди поруч та готова допомогти.",
    tags: ['Асистування', 'Робота з дітьми', 'Підтримка'],
    color: '#E8F4FD',
    accent: '#2B90D9',
    photo: '/images/doctors/maryana.jpeg',
  },
  {
    name: 'Пахолюк Ганна Олександрівна',
    role: 'Ортодонт',
    spec: 'Брекети, елайнери, корекція прикусу',
    bio: 'Виправляє прикус та вирівнює зуби — для дітей і дорослих. Підходить індивідуально до кожного пацієнта та ретельно пояснює кожен крок лікування.',
    tags: ['Ортодонтія', 'Брекети', 'Елайнери'],
    color: '#F0FDF8',
    accent: '#2BAD7E',
    photo: '/images/doctors/hanna.jpeg',
  },
  {
    name: 'Покотило Ярослава',
    role: 'Асистент лікаря',
    spec: 'Асистування, стерилізація, догляд',
    bio: 'Відповідальна та дбайлива асистентка. Забезпечує ідеальний порядок у кабінеті та комфорт пацієнтів під час кожної процедури.',
    tags: ['Асистування', 'Стерилізація', 'Комфорт'],
    color: '#FDF6E8',
    accent: '#D4943A',
    photo: '/images/doctors/yaroslava.jpeg',
  },
  {
    name: 'Швець Олена',
    role: 'Адміністратор',
    spec: 'Запис пацієнтів, координація клініки',
    bio: 'Перша посмішка, яку ви бачите в нашій клініці. Олена завжди готова відповісти на всі запитання та зручно організувати ваш візит.',
    tags: ['Запис', 'Консультації', 'Організація'],
    color: '#F8E8FE',
    accent: '#9333EA',
    photo: '/images/doctors/olena.jpeg',
  },
  {
    name: 'Галушка Оксана Станіславівна',
    role: 'Лікар-терапевт',
    spec: 'Терапевтична стоматологія, відновлення зубів',
    bio: 'Я обрала стоматологію, тому що люблю точність, хочу допомагати людям і бачити результат своєї роботи відразу. Мені подобається відновлювати здоров\'я та посмішки, робити складне — зрозумілим і безболісним. Це професія, в якій постійно розвиваєшся і отримуєш реальний результат своєї праці.',
    tags: ['Терапія', 'Відновлення зубів', 'Лікування карієсу'],
    color: '#FDF6E8',
    accent: '#D4943A',
    photo: '/images/doctors/Галушка_Оксана_Станіславівна_Лікар_терапевт.jpeg',
  },
]

export default function Doctors() {
  return (
    <section className="doctors" id="doctors">
      <div className="doctors__blob" />
      <div className="container">
        <div className="doctors__header" data-reveal="up">
          <span className="section-tag">Наша команда</span>
          <h2 className="section-title">Наші лікарі</h2>
          <p className="section-subtitle">
            Команда фахівців, яка щиро любить свою роботу та кожного пацієнта. Ми навчаємось, вдосконалюємось та створюємо тільки позитивні враження.
          </p>
        </div>

        <div className="doctors__grid">
          {doctors.map((doc, i) => (
            <div
              key={i}
              className="doctor-card"
              style={{ '--doc-color': doc.color, '--doc-accent': doc.accent, '--reveal-delay': `${i * 80}ms` }}
              data-reveal="up"
            >
              <div className="doctor-card__avatar">
                <img src={doc.photo} alt={doc.name} loading="lazy" />
              </div>

              <div className="doctor-card__info">
                <h3 className="doctor-card__name">{doc.name}</h3>
                <p className="doctor-card__role">{doc.role}</p>
                <p className="doctor-card__bio">{doc.bio}</p>

                <div className="doctor-card__tags">
                  {doc.tags.map((t, j) => (
                    <span key={j} className="doctor-tag">{t}</span>
                  ))}
                </div>

                <div className="doctor-card__award">
                  <FiAward size={14} />
                  <span>{doc.spec}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
