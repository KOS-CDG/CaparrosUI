import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'
import { testimonials } from '@/constants/testimonials'

const Testimonials = React.memo(function Testimonials() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir)
      setActiveIndex(index)
    },
    []
  )

  const goPrev = useCallback(() => {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length
    goTo(newIndex, -1)
  }, [activeIndex, goTo])

  const goNext = useCallback(() => {
    const newIndex = (activeIndex + 1) % testimonials.length
    goTo(newIndex, 1)
  }, [activeIndex, goTo])

  const current = testimonials[activeIndex]

  const slideVariants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * 40,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: shouldReduceMotion ? 0 : dir * -40,
      transition: { duration: 0.3, ease: 'easeInOut' },
    }),
  }

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-brut-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 mb-14 md:mb-20"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionLabel label="// 06 — What Clients Say" />
          <h2
            id="testimonials-heading"
            className="font-grotesk font-bold text-brut-black"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            Client Voices
          </h2>
        </motion.div>

        {/* Testimonial block */}
        <div className="relative min-h-[300px] md:min-h-[280px]" aria-live="polite" aria-atomic="true">
          {/* Giant decorative quotation mark */}
          <span
            className="absolute -top-8 -left-2 md:-top-12 md:-left-4 font-grotesk font-black text-brut-yellow select-none pointer-events-none leading-none"
            style={{ fontSize: 'clamp(100px, 15vw, 180px)', lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={current.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative z-10 pl-4 md:pl-8"
              cite={`${current.company}`}
            >
              <p
                className="font-grotesk font-bold text-brut-black leading-tight mb-10"
                style={{
                  fontSize: 'clamp(20px, 3vw, 36px)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1.25,
                }}
              >
                {current.quote}
              </p>

              <footer className="flex flex-col gap-1">
                <cite className="not-italic">
                  <span className="font-mono text-base font-medium text-brut-black uppercase tracking-wide block">
                    {current.authorName}
                  </span>
                  <span className="font-mono text-sm text-brut-black opacity-50 block">
                    {current.authorRole}, {current.company}
                  </span>
                </cite>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center gap-4 mt-12" role="group" aria-label="Testimonial navigation">
          <button
            onClick={goPrev}
            className="font-grotesk font-bold uppercase text-sm border-2 border-brut-black px-5 py-3 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-fast"
            aria-label="Previous testimonial"
          >
            &larr; Prev
          </button>
          <button
            onClick={goNext}
            className="font-grotesk font-bold uppercase text-sm border-2 border-brut-black px-5 py-3 shadow-brutal hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-brutal-sm active:translate-x-1 active:translate-y-1 active:shadow-none transition-all duration-fast bg-brut-black text-brut-white"
            aria-label="Next testimonial"
          >
            Next &rarr;
          </button>

          <span className="font-mono text-sm text-brut-black opacity-40 ml-4" aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(testimonials.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
})

export default Testimonials
