import { useEffect } from 'react'

const finePointer = () => window.matchMedia('(hover: hover) and (pointer: fine)').matches
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Глобальні мікровзаємодії через делегування подій:
 *  [data-magnetic]  — елемент тягнеться за курсором
 *  [data-tilt]      — 3D-нахил картки + змінні --mx/--my для «прожектора»
 *  [data-depth]     — паралакс від руху миші (значення = сила)
 *  .cursor          — кастомний курсор, що збільшується над інтерактивом
 *  --p на .scroll-progress — прогрес прокрутки
 */
export function useInteractions() {
  useEffect(() => {
    const cleanups = []

    // Прогрес прокрутки
    const bar = document.querySelector('.scroll-progress')
    const floatCta = document.querySelector('.float-cta')
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - innerHeight
      const p = h > 0 ? scrollY / h : 0
      bar?.style.setProperty('--p', p.toFixed(4))
      if (floatCta) {
        const footer = document.getElementById('contacts')
        const nearFooter = footer && footer.getBoundingClientRect().top < innerHeight
        floatCta.classList.toggle('is-on', scrollY > innerHeight * 0.8 && !nearFooter)
      }
    }
    addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    cleanups.push(() => removeEventListener('scroll', onScroll))

    if (!finePointer() || reducedMotion()) return () => cleanups.forEach((c) => c())

    // Курсор
    const cursor = document.querySelector('.cursor')
    let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy
    let raf
    const loop = () => {
      cx += (tx - cx) * 0.2
      cy += (ty - cy) * 0.2
      if (cursor) cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    cleanups.push(() => cancelAnimationFrame(raf))

    // Паралакс-шари
    let depthEls = []
    const refreshDepth = () => { depthEls = [...document.querySelectorAll('[data-depth]')] }
    refreshDepth()
    const depthTimer = setInterval(refreshDepth, 2000)
    cleanups.push(() => clearInterval(depthTimer))

    let magnetEl = null
    let tiltEl = null

    const onMove = (e) => {
      tx = e.clientX
      ty = e.clientY
      cursor?.classList.add('is-visible')

      const t = e.target
      const interactive = t.closest?.('a, button, [data-cursor], input, label')
      cursor?.classList.toggle('is-hover', !!interactive)

      // Magnetic
      const m = t.closest?.('[data-magnetic]')
      if (magnetEl && magnetEl !== m) { magnetEl.style.transform = ''; magnetEl = null }
      if (m) {
        magnetEl = m
        const r = m.getBoundingClientRect()
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        m.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`
      }

      // Tilt + spotlight
      const tl = t.closest?.('[data-tilt]')
      if (tiltEl && tiltEl !== tl) { tiltEl.style.transform = ''; tiltEl = null }
      if (tl) {
        tiltEl = tl
        const r = tl.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width
        const py = (e.clientY - r.top) / r.height
        const amt = parseFloat(tl.dataset.tilt) || 6
        tl.style.setProperty('--mx', `${px * 100}%`)
        tl.style.setProperty('--my', `${py * 100}%`)
        tl.style.transform = `perspective(900px) rotateX(${(0.5 - py) * amt}deg) rotateY(${(px - 0.5) * amt}deg)`
      }

      // Depth parallax
      const nx = e.clientX / innerWidth - 0.5
      const ny = e.clientY / innerHeight - 0.5
      depthEls.forEach((el) => {
        const d = parseFloat(el.dataset.depth) || 10
        el.style.translate = `${nx * d}px ${ny * d}px`
      })
    }
    const onLeave = () => cursor?.classList.remove('is-visible')

    addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    cleanups.push(() => {
      removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    })

    return () => cleanups.forEach((c) => c())
  }, [])
}
