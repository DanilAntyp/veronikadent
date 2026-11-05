import { useEffect } from 'react'

/**
 * Спостерігає за всіма [data-reveal] (включно з тими, що з'являються пізніше —
 * напр. після фільтрації прайсу) і ставить data-revealed, коли елемент у кадрі.
 */
export function useScrollReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute('data-revealed', '')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    )

    const scan = (root) => {
      root.querySelectorAll?.('[data-reveal]:not([data-revealed])').forEach((el) => io.observe(el))
    }
    scan(document)

    const mo = new MutationObserver((muts) => {
      muts.forEach((m) => m.addedNodes.forEach((n) => {
        if (n.nodeType !== 1) return
        if (n.matches?.('[data-reveal]:not([data-revealed])')) io.observe(n)
        scan(n)
      }))
    })
    mo.observe(document.body, { childList: true, subtree: true })

    return () => { io.disconnect(); mo.disconnect() }
  }, [])
}
