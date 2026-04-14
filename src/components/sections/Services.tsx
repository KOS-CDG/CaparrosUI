import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'
import { services } from '@/constants/services'

const Services = React.memo(function Services() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  }

  const rowVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-brut-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Section header */}
        <div className="flex flex-col gap-4 mb-12 md:mb-16">
          <SectionLabel label="// 02 — What We Do" />
          <h2
            id="services-heading"
            className="font-grotesk font-bold text-brut-black"
            style={{
              fontSize: 'clamp(36px, 6vw, 72px)',
              letterSpacing: '-0.03em',
              lineHeight: 1.0,
            }}
          >
            Our Services
          </h2>
        </div>
      </div>

      <SectionDivider />

      {/* Services List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        role="list"
        aria-label="Services list"
      >
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            variants={rowVariants}
            role="listitem"
            className="group border-b-2 border-brut-black hover:bg-brut-yellow transition-colors duration-fast cursor-default"
            tabIndex={0}
            aria-label={`Service ${index + 1}: ${service.name} — ${service.description}`}
          >
            <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-8 md:py-10">
              <div className="grid grid-cols-12 gap-4 md:gap-8 items-start md:items-center">
                {/* Service Number */}
                <div className="col-span-2 md:col-span-1">
                  <span className="font-mono text-xs md:text-sm font-medium text-brut-black opacity-40 group-hover:opacity-70 transition-opacity">
                    0{service.id}
                  </span>
                </div>

                {/* Service Name */}
                <div className="col-span-10 md:col-span-4">
                  <h3
                    className="font-grotesk font-bold uppercase text-brut-black"
                    style={{ fontSize: 'clamp(20px, 3vw, 32px)', letterSpacing: '-0.02em' }}
                  >
                    {service.name}
                  </h3>
                </div>

                {/* Description */}
                <div className="col-span-12 md:col-span-5 col-start-1 md:col-start-auto pl-6 md:pl-0">
                  <p className="font-sans text-sm md:text-base text-brut-black opacity-70 group-hover:opacity-90 leading-relaxed transition-opacity">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex col-span-2 md:col-span-2 justify-end">
                  <ArrowRight
                    size={28}
                    strokeWidth={2}
                    className="text-brut-black opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-fast"
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Tags */}
              <div className="grid grid-cols-12 mt-4">
                <div className="col-span-12 md:col-span-9 md:col-start-4 pl-6 md:pl-0 flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-xs uppercase tracking-wide text-brut-black opacity-40 group-hover:opacity-70 transition-opacity"
                    >
                      [{tag}]
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
})

export default Services
