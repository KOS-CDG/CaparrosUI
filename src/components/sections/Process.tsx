import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'
import { processSteps } from '@/constants/process'

const Process = React.memo(function Process() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="bg-brut-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-4 mb-16 md:mb-24"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionLabel label="// 05 — How We Work" />
          <h2
            id="process-heading"
            className="font-grotesk font-bold text-brut-black"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            Our Process
          </h2>
        </motion.div>

        {/* Desktop: Horizontal zigzag layout */}
        <div className="hidden md:block">
          {/* Steps row */}
          <div className="grid grid-cols-5 gap-0 relative">
            {/* Dashed connecting line */}
            <div
              className="absolute top-8 left-[10%] right-[10%] border-t-2 border-dashed border-brut-black opacity-20"
              aria-hidden="true"
              style={{ zIndex: 0 }}
            />

            {processSteps.map((step, index) => (
              <motion.article
                key={step.stepNumber}
                className={`relative flex flex-col gap-4 px-4 ${
                  index % 2 === 0 ? 'pt-0 pb-16' : 'pt-16 pb-0'
                }`}
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: index % 2 === 0 ? 30 : -30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.12 }}
                aria-label={`Step ${step.stepNumber}: ${step.title}`}
              >
                {/* Step number badge */}
                <div
                  className="w-16 h-16 border-2 border-brut-black bg-brut-bg flex items-center justify-center relative z-10 flex-shrink-0"
                  aria-hidden="true"
                >
                  <span className="font-mono text-sm font-bold text-brut-black">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Connecting vertical dashed line */}
                {index % 2 === 0 ? (
                  <div
                    className="absolute left-10 top-16 bottom-0 border-l-2 border-dashed border-brut-black opacity-20"
                    aria-hidden="true"
                  />
                ) : (
                  <div
                    className="absolute left-10 top-0 h-16 border-l-2 border-dashed border-brut-black opacity-20"
                    aria-hidden="true"
                  />
                )}

                <div>
                  <h3
                    className="font-grotesk font-bold uppercase text-brut-black mb-2"
                    style={{ fontSize: 'clamp(18px, 2vw, 24px)', letterSpacing: '-0.02em' }}
                  >
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-brut-black opacity-60 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        {/* Mobile: Vertical stacked layout */}
        <div className="md:hidden flex flex-col">
          {processSteps.map((step, index) => (
            <motion.article
              key={step.stepNumber}
              className="flex gap-6 pb-10 relative"
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.05 + index * 0.1 }}
              aria-label={`Step ${step.stepNumber}: ${step.title}`}
            >
              {/* Left: Number + vertical line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-12 h-12 border-2 border-brut-black bg-brut-bg flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-brut-black">
                    {step.stepNumber}
                  </span>
                </div>
                {index < processSteps.length - 1 && (
                  <div
                    className="flex-1 border-l-2 border-dashed border-brut-black opacity-20 mt-2"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Right: Content */}
              <div className="pt-2 pb-4">
                <h3
                  className="font-grotesk font-bold uppercase text-brut-black mb-2"
                  style={{ fontSize: '20px', letterSpacing: '-0.02em' }}
                >
                  {step.title}
                </h3>
                <p className="font-sans text-sm text-brut-black opacity-60 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
})

export default Process
