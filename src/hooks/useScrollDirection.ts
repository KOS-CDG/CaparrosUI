import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | 'idle'

interface UseScrollDirectionResult {
  scrollDirection: ScrollDirection
  scrollY: number
  isScrolled: boolean
}

export function useScrollDirection(): UseScrollDirectionResult {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>('idle')
  const [scrollY, setScrollY] = useState(0)
  const [prevScrollY, setPrevScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > prevScrollY) {
        setScrollDirection('down')
      } else if (currentScrollY < prevScrollY) {
        setScrollDirection('up')
      }

      setScrollY(currentScrollY)
      setPrevScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollY])

  return {
    scrollDirection,
    scrollY,
    isScrolled: scrollY > 20,
  }
}
