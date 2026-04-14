import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BrutalButton from '@/components/ui/BrutalButton'

const Hero = React.memo(function Hero() {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const lineVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-[calc(100vh-5rem)] bg-brut-bg bg-brutalist-stripe flex flex-col justify-center overflow-hidden border-b-2 border-brut-black"
    >
      {/* Section counter */}
      <span
        className="absolute top-8 right-6 md:right-10 font-mono text-5xl md:text-7xl font-bold text-brut-black opacity-10 select-none pointer-events-none"
        aria-hidden="true"
      >
        —01
      </span>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24 w-full">
        {/* Mono subheading */}
        <motion.p
          className="font-mono text-sm md:text-base text-brut-black opacity-60 uppercase tracking-wide mb-6 md:mb-8"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 0.6, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          // UI/UX Design &amp; Development Agency
        </motion.p>

        {/* Main Hero Headline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-10 md:mb-14"
        >
          <motion.h1
            id="hero-heading"
            className="font-grotesk font-black uppercase leading-none"
            style={{
              fontSize: 'clamp(52px, 9.5vw, 124px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
            }}
          >
            <motion.span variants={lineVariants} className="block">
              We Don&apos;t
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              Design{' '}
              <mark
                className="bg-brut-yellow text-brut-black px-2 inline"
                style={{ fontStyle: 'normal' }}
              >
                Websites.
              </mark>
            </motion.span>
            <motion.span variants={lineVariants} className="block">
              We Build
            </motion.span>
            <motion.span variants={lineVariants} className="block text-brut-black">
              Experiences.
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Body Text */}
        <motion.p
          className="font-sans text-base md:text-lg text-brut-black opacity-70 max-w-xl leading-relaxed mb-10 md:mb-12"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.55 }}
        >
          Caparros UI is a premium design and development agency crafting bold digital products
          for startups, SaaS companies, and scale-up tech brands who refuse to be ordinary.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.7 }}
        >
          <BrutalButton variant="filled" href="#work">
            See Our Work
          </BrutalButton>
          <BrutalButton variant="outline" href="#process">
            How We Work
          </BrutalButton>
        </motion.div>
      </div>

      {/* Bottom decorative rule is handled by SectionDivider in App */}
    </section>
  )
})

export default Hero
