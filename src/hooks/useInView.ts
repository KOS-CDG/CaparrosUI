import { useState, useEffect, useRef } from 'react'

interface UseInViewOptions {
  threshold?: number
  rootMargin?: string
  once?: boolean
}

interface UseInViewResult {
  ref: React.RefObject<HTMLElement>
  inView: boolean
}

export function useInView({
  threshold = 0.1,
  rootMargin = '0px',
  once = true,
}: UseInViewOptions = {}): UseInViewResult {
  const ref = useRef<HTMLElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(element)
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, once])

  return { ref, inView }
}
