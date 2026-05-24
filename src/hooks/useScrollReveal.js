import { useEffect } from 'react'

/**
 * Watches every element with a [data-reveal] attribute.
 * When the element enters the viewport it gets data-revealed="true",
 * which triggers the CSS animation defined in index.css.
 *
 * We use setAttribute instead of classList.add so that React's className
 * reconciliation never clobbers the reveal state on re-render.
 */
export function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute('data-revealed', 'true')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
    )

    document
      .querySelectorAll('[data-reveal]')
      .forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])
}
