import React from 'react'
import { FiCheckCircle, FiAward, FiUsers, FiHeart } from 'react-icons/fi'
import teamPhoto from '../images/doctors/doctors_photo 2.jpg'
import './About.css'

const highlights = [
  { icon: <FiCheckCircle />, text: 'Сучасне обладнання та методики' },
  { icon: <FiAward />, text: 'Сертифіковані спеціалісти' },
  { icon: <FiUsers />, text: 'Особистий підхід до кожного' },
  { icon: <FiHeart />, text: 'Турбота без стресу та сліз' },
]

export default function About() {
  return (
    <section className="about" id="about">
      <div className="container about__inner">
        {/* Visual side */}
        <div className="about__visual" data-reveal="left">
          <div className="about__main-card">
            <img
              src={teamPhoto}
              alt="Команда Vero.nikadent"
              className="about__team-photo"
            />
          </div>

        </div>

        {/* Text side */}
        <div className="about__content" data-reveal="right">
          <span className="section-tag">Про нас</span>
          <h2 className="section-title">Де турбота стає традицією</h2>

          <p className="about__text">
            Ми створили простір, у якому турбота, сучасні технології та щире ставлення стають основою кожного прийому.
          </p>
          <p className="about__text">
            У Vero.nikadent ми дбаємо не лише про здорові зуби, а й про комфорт дитини, спокій батьків та позитивний досвід без страху й сліз. Наша команда працює м'яко, уважно та професійно — від першого знайомства до складного лікування.
          </p>
          <p className="about__text">
            Ми використовуємо сучасні методики діагностики та лікування, пояснюємо кожен етап простими словами й допомагаємо дітям звикнути до стоматолога без стресу.
          </p>

          <div className="about__highlights">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="about__highlight-item"
                data-reveal="up"
                style={{ '--reveal-delay': `${i * 90}ms` }}
              >
                <span className="highlight-icon">{h.icon}</span>
                <span>{h.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
