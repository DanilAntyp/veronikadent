import React from 'react'

/** Знак-зуб у стилі логотипа Vero.nikadent + словесний знак */
export function ToothMark({ size = 40, className = '', stroke = 'currentColor' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 11.5c-3.2-3.1-8.6-4.6-12.4-1.8-4.2 3.1-4.3 9.2-2.6 14.3 1.4 4.3 3.4 8.4 5 12.6.8 2.2 2.6 3.4 4 2.4 1.3-.9 1.7-3.7 2.4-6.3.6-2 1.6-4.2 3.6-4.2s3 2.2 3.6 4.2c.7 2.6 1.1 5.4 2.4 6.3 1.4 1 3.2-.2 4-2.4 1.6-4.2 3.6-8.3 5-12.6 1.7-5.1 1.6-11.2-2.6-14.3-3.8-2.8-9.2-1.3-12.4 1.8Z"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 19.5c3.5-3.2 7.6-1.2 11 .6 3.8 2 8.6 3.4 13-.8"
        stroke={stroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default function Logo({ light = false }) {
  return (
    <span className={`logo ${light ? 'logo--light' : ''}`}>
      <span className="logo__badge">
        <ToothMark size={24} stroke="#fff" />
      </span>
      <span className="logo__word">
        Vero<b>.</b>nikadent
      </span>
    </span>
  )
}
