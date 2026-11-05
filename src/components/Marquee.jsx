import React from 'react'
import './Marquee.css'

const a = ['Без страху', 'Без болю', 'З любов’ю', 'Лікування під мікроскопом', 'Ортодонтія', 'Закис азоту', 'Для дітей і дорослих']
const b = ['Здорові зуби', 'Щасливі діти', 'Спокійні батьки', 'Чесні ціни', 'Сучасне обладнання', 'Турбота']

function Track({ items, sep }) {
  const row = (k) => (
    <div className="mq__row" aria-hidden={k > 0} key={k}>
      {items.map((t, i) => (
        <span key={i} className="mq__item">{t}<i>{sep}</i></span>
      ))}
    </div>
  )
  return <div className="mq__track">{[0, 1].map(row)}</div>
}

export default function Marquee() {
  return (
    <div className="mq">
      <div className="mq__band mq__band--rose"><Track items={b} sep="✦" /></div>
      <div className="mq__band mq__band--blue"><Track items={a} sep="🦷" /></div>
    </div>
  )
}
