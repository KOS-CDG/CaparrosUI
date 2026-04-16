import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'


const About = React.memo(function About() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="bg-brut-surface"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-28">
        <div className="grid grid-cols-12 gap-8 md:gap-16">
          {/* Left: Statement — 60% */}
          <motion.div
            className="col-span-12 lg:col-span-9 flex flex-col gap-8"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <SectionLabel label="// 04 — Who We Are" />

            <h2
              id="about-heading"
              className="font-grotesk font-bold text-brut-white"
              style={{
                fontSize: 'clamp(36px, 6vw, 72px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
              }}
            >
              Design Is a
              <br />
              <span className="text-brut-yellow">Competitive</span>
              <br />
              Advantage.
            </h2>

            <div className="flex flex-col gap-5 max-w-xl">
              <p className="font-sans text-base md:text-lg text-brut-white opacity-80 leading-relaxed">
                Caparros UI was built on a single conviction: that exceptional design is not
                decoration — it is the product. We embed at the intersection of strategy,
                design, and engineering to build digital experiences that drive measurable
                outcomes for ambitious companies.
              </p>
              <p className="font-sans text-base md:text-lg text-brut-white opacity-80 leading-relaxed">
                We do not outsource. We do not use templates. Every engagement begins with
                deep discovery and ends with a product our clients are proud to ship. We hold
                our craft to standards that most agencies do not even discuss.
              </p>
              <p className="font-sans text-base md:text-lg text-brut-white opacity-80 leading-relaxed">
                If you want fast and forgettable, we are not your agency. If you want work that
                lasts — work that compounds in value over time — we should talk.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
})

export default About
