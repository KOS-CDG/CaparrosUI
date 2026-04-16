import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Check, Star, Zap, Crown, ChevronDown, ChevronUp } from 'lucide-react'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'
import BrutalButton from '@/components/ui/BrutalButton'

interface PackageData {
  id: number
  name: string
  tier: string
  price: string
  priceValue: number
  icon: React.ReactNode
  idealFor: string
  tagline: string
  accentColor: string
  accentBg: string
  features: string[]
  popular?: boolean
}

const packages: PackageData[] = [
  {
    id: 1,
    name: 'Basic Website',
    tier: 'Starter',
    price: 'PHP 1,500',
    priceValue: 1500,
    icon: <Zap size={28} />,
    idealFor: 'Small businesses, portfolios, startups, school websites',
    tagline: 'Everything you need to get online.',
    accentColor: 'text-brut-blue',
    accentBg: 'bg-brut-blue',
    features: [
      'Single-page or 3-5 page static website',
      'Responsive mobile and tablet design',
      'Contact form with email integration',
      'Basic SEO optimization',
      'Social media links',
      'Free custom domain for 1 year',
      'Basic technical support for 3 months',
    ],
  },
  {
    id: 2,
    name: 'Professional Website',
    tier: 'Business',
    price: 'PHP 5,000',
    priceValue: 5000,
    icon: <Star size={28} />,
    idealFor: 'Established businesses, service providers, content creators',
    tagline: 'Built for growth and visibility.',
    accentColor: 'text-brut-yellow',
    accentBg: 'bg-brut-yellow',
    features: [
      '5-10 page fully responsive website',
      'Advanced UI/UX design',
      'Blog or news section with management system',
      'Image gallery with lightbox functionality',
      'Contact form and inquiry management',
      'Advanced SEO optimization with meta tags',
      'Google Analytics integration',
      'Free custom domain for 1 year',
      'Technical support for 6 months',
    ],
    popular: true,
  },
  {
    id: 3,
    name: 'Premium Website',
    tier: 'Enterprise',
    price: 'PHP 8,000',
    priceValue: 8000,
    icon: <Crown size={28} />,
    idealFor: 'Large enterprises, online retailers, ambitious startups',
    tagline: 'Full-scale digital powerhouse.',
    accentColor: 'text-brut-red',
    accentBg: 'bg-brut-red',
    features: [
      '10+ page fully featured website',
      'E-commerce functionality with payment gateway integration',
      'Content Management System (CMS) for easy updates',
      'User account and dashboard features',
      'Advanced analytics and reporting',
      'Blog with SEO-optimized content management',
      'Image gallery with optimization',
      'Product/service catalog with advanced filtering',
      'Enhanced security features and SSL certificate',
      'Free custom domain for 1 year',
      'Priority technical support for 1 year',
    ],
  },
]

const commonFeatures = [
  'Modern, professional web design',
  'Mobile responsive layout',
  'Free custom domain registration for 1 year (value: PHP 300-600)',
  'Standard web hosting configuration',
  'Clean, readable code with documentation',
  'Testing across multiple browsers and devices',
  'Initial deployment and launch support',
]

const terms = [
  {
    title: 'Payment Terms',
    detail:
      '50% advance payment required to start the project. Remaining 50% due upon completion and deployment.',
  },
  {
    title: 'Timeline',
    detail:
      'Project delivery typically takes 2-4 weeks depending on package complexity and availability of client materials.',
  },
  {
    title: 'Revisions',
    detail:
      'Up to 3 rounds of revisions included in the quoted price for each package.',
  },
  {
    title: 'Domain',
    detail:
      "Custom domain registration is included for 1 year. Renewal after the first year is the client's responsibility.",
  },
  {
    title: 'Warranty',
    detail:
      'Website functionality guaranteed for 3 months post-launch. Support beyond this period is available on a separate maintenance agreement.',
  },
  {
    title: 'Validity',
    detail: 'This quotation is valid for 30 days from the date of issue.',
  },
]

const nextSteps = [
  'Review this quotation and contact us with any questions',
  'Confirm your chosen package and project requirements',
  'Send 50% advance payment to proceed with development',
  'Provide all necessary content, images, and brand materials',
]

const PackageCard = React.memo(function PackageCard({
  pkg,
  index,
  inView,
  shouldReduceMotion,
}: {
  pkg: PackageData
  index: number
  inView: boolean
  shouldReduceMotion: boolean | null
}) {
  return (
    <motion.div
      className={`relative flex flex-col bg-white border-[3px] border-brut-black shadow-brutal-lg ${
        pkg.popular ? 'lg:-translate-y-4' : ''
      }`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: pkg.popular ? -16 : 0 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 + index * 0.15 }}
    >
      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brut-yellow border-2 border-brut-black px-4 py-1 shadow-brutal-sm z-10">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-brut-black">
            Most Popular
          </span>
        </div>
      )}

      {/* Card Header */}
      <div className={`p-6 md:p-8 border-b-[3px] border-brut-black ${pkg.popular ? 'bg-brut-black' : 'bg-brut-bg'}`}>
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`p-2 border-2 border-brut-black shadow-brutal-sm ${
              pkg.popular ? 'bg-brut-yellow text-brut-black' : `${pkg.accentBg} ${pkg.id === 1 ? 'text-white' : 'text-brut-black'}`
            }`}
          >
            {pkg.icon}
          </div>
          <div>
            <span className={`font-mono text-xs uppercase tracking-wider ${pkg.popular ? 'text-brut-yellow' : 'text-brut-black opacity-50'}`}>
              {pkg.tier}
            </span>
            <h3
              className={`font-grotesk font-black uppercase leading-tight ${
                pkg.popular ? 'text-brut-white' : 'text-brut-black'
              }`}
              style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', letterSpacing: '-0.02em' }}
            >
              {pkg.name}
            </h3>
          </div>
        </div>

        <p className={`font-sans text-sm mb-6 ${pkg.popular ? 'text-white opacity-70' : 'text-brut-black opacity-60'}`}>
          {pkg.tagline}
        </p>

        <div className="flex items-baseline gap-1">
          <span
            className={`font-grotesk font-black ${pkg.popular ? 'text-brut-yellow' : 'text-brut-black'}`}
            style={{ fontSize: 'clamp(32px, 4vw, 48px)', letterSpacing: '-0.03em', lineHeight: 1 }}
          >
            {pkg.price.split(' ')[1]}
          </span>
          <span className={`font-mono text-sm ${pkg.popular ? 'text-white opacity-50' : 'text-brut-black opacity-40'}`}>
            PHP
          </span>
        </div>
      </div>

      {/* Ideal For */}
      <div className="px-6 md:px-8 pt-6 pb-2">
        <span className="font-mono text-xs uppercase tracking-wider text-brut-black opacity-50">
          Ideal for
        </span>
        <p className="font-sans text-sm text-brut-black opacity-80 mt-1">{pkg.idealFor}</p>
      </div>

      {/* Features */}
      <div className="px-6 md:px-8 py-4 flex-1">
        <span className="font-mono text-xs uppercase tracking-wider text-brut-black opacity-50 block mb-3">
          What's included
        </span>
        <ul className="flex flex-col gap-2.5" role="list">
          {pkg.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check
                size={16}
                strokeWidth={3}
                className={`mt-0.5 flex-shrink-0 ${pkg.popular ? 'text-brut-yellow' : pkg.accentColor}`}
                aria-hidden="true"
              />
              <span className="font-sans text-sm text-brut-black opacity-80">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="p-6 md:p-8 mt-auto">
        <BrutalButton
          variant={pkg.popular ? 'accent' : 'outline'}
          href="#contact"
          fullWidth
        >
          Choose {pkg.tier}
        </BrutalButton>
      </div>
    </motion.div>
  )
})

const Pricing = React.memo(function Pricing() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.05 })
  const [showTerms, setShowTerms] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="bg-brut-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />

      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4 mb-6">
            <SectionLabel label="// 06 — Pricing" />
            <h2
              id="pricing-heading"
              className="font-grotesk font-black text-brut-black uppercase"
              style={{
                fontSize: 'clamp(36px, 6vw, 72px)',
                letterSpacing: '-0.04em',
                lineHeight: 1.0,
              }}
            >
              Website Package{' '}
              <span className="bg-brut-yellow px-2 inline-block shadow-brutal-sm border-2 border-brut-black">
                Quotation
              </span>
            </h2>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-2xl mb-16">
            <p className="font-sans text-base md:text-lg text-brut-black opacity-80 leading-relaxed">
              Thank you for your interest in our web development services. We are pleased
              to present this quotation for three carefully designed website packages
              tailored to meet diverse business needs. Each package includes professional
              development, responsive design, and a complimentary domain name for one year.
            </p>
          </motion.div>

          {/* Package Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-20 md:mb-28">
            {packages.map((pkg, index) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                index={index}
                inView={inView}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

          {/* Comparison Table */}
          <motion.div variants={itemVariants} className="mb-20 md:mb-28">
            <h3
              className="font-grotesk font-black text-brut-black uppercase mb-8"
              style={{ fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '-0.03em' }}
            >
              Package Comparison
            </h3>
            <div className="overflow-x-auto border-[3px] border-brut-black shadow-brutal-lg">
              <table className="w-full min-w-[600px]" role="table">
                <thead>
                  <tr className="bg-brut-black text-brut-white">
                    <th className="font-grotesk font-bold text-left uppercase text-sm tracking-wide p-4 md:p-5 border-r-2 border-brut-surface">
                      Package
                    </th>
                    <th className="font-grotesk font-bold text-left uppercase text-sm tracking-wide p-4 md:p-5 border-r-2 border-brut-surface">
                      Tier
                    </th>
                    <th className="font-grotesk font-bold text-left uppercase text-sm tracking-wide p-4 md:p-5 border-r-2 border-brut-surface">
                      Features
                    </th>
                    <th className="font-grotesk font-bold text-right uppercase text-sm tracking-wide p-4 md:p-5">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {packages.map((pkg, index) => (
                    <tr
                      key={pkg.id}
                      className={`border-t-2 border-brut-black transition-colors hover:bg-brut-yellow/20 ${
                        index % 2 === 0 ? 'bg-white' : 'bg-brut-bg'
                      }`}
                    >
                      <td className="p-4 md:p-5 border-r-2 border-brut-black/20">
                        <span className="font-grotesk font-bold text-brut-black uppercase text-sm">
                          {pkg.name}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 border-r-2 border-brut-black/20">
                        <span className={`font-mono text-xs uppercase tracking-wider px-2 py-1 border-2 border-brut-black ${pkg.accentBg} ${pkg.id === 1 ? 'text-white' : 'text-brut-black'}`}>
                          {pkg.tier}
                        </span>
                      </td>
                      <td className="p-4 md:p-5 border-r-2 border-brut-black/20">
                        <p className="font-sans text-sm text-brut-black opacity-80 leading-relaxed">
                          {pkg.features.slice(0, 4).join(', ')}
                        </p>
                      </td>
                      <td className="p-4 md:p-5 text-right">
                        <span className="font-grotesk font-black text-brut-black text-lg md:text-xl">
                          {pkg.price}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Common Features */}
          <motion.div variants={itemVariants} className="mb-20 md:mb-28">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              <div>
                <h3
                  className="font-grotesk font-black text-brut-black uppercase mb-2"
                  style={{ fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '-0.03em' }}
                >
                  Common Features
                </h3>
                <p className="font-sans text-sm text-brut-black opacity-60 mb-6">
                  All website packages include the following standard features:
                </p>
              </div>
              <div className="bg-white border-[3px] border-brut-black p-6 md:p-8 shadow-brutal-lg">
                <ul className="flex flex-col gap-3.5" role="list">
                  {commonFeatures.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 bg-brut-yellow border-2 border-brut-black flex items-center justify-center flex-shrink-0">
                        <Check size={12} strokeWidth={3} className="text-brut-black" aria-hidden="true" />
                      </div>
                      <span className="font-sans text-sm md:text-base text-brut-black opacity-80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Terms & Conditions (collapsible) */}
          <motion.div variants={itemVariants} className="mb-20 md:mb-28">
            <button
              className="w-full flex items-center justify-between bg-brut-black text-brut-white p-5 md:p-6 border-[3px] border-brut-black hover:bg-brut-surface transition-colors group"
              onClick={() => setShowTerms(!showTerms)}
              aria-expanded={showTerms}
              aria-controls="terms-content"
            >
              <h3
                className="font-grotesk font-black uppercase"
                style={{ fontSize: 'clamp(18px, 3vw, 28px)', letterSpacing: '-0.02em' }}
              >
                Terms & Conditions
              </h3>
              {showTerms ? (
                <ChevronUp size={28} className="text-brut-yellow" />
              ) : (
                <ChevronDown size={28} className="text-brut-yellow" />
              )}
            </button>

            <motion.div
              id="terms-content"
              initial={false}
              animate={{
                height: showTerms ? 'auto' : 0,
                opacity: showTerms ? 1 : 0,
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="bg-white border-[3px] border-t-0 border-brut-black p-6 md:p-8">
                <ol className="flex flex-col gap-5" role="list">
                  {terms.map((term, index) => (
                    <li key={term.title} className="flex gap-4">
                      <span className="font-mono text-sm font-bold text-brut-black opacity-30 mt-0.5 flex-shrink-0">
                        0{index + 1}
                      </span>
                      <div>
                        <span className="font-grotesk font-bold text-brut-black uppercase text-sm block mb-1">
                          {term.title}
                        </span>
                        <p className="font-sans text-sm text-brut-black opacity-70 leading-relaxed">
                          {term.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </motion.div>
          </motion.div>

          {/* Next Steps */}
          <motion.div variants={itemVariants}>
            <div className="bg-brut-black p-8 md:p-12 border-[3px] border-brut-black">
              <h3
                className="font-grotesk font-black text-brut-white uppercase mb-2"
                style={{ fontSize: 'clamp(24px, 4vw, 40px)', letterSpacing: '-0.03em' }}
              >
                Next Steps
              </h3>
              <p className="font-sans text-sm text-white opacity-50 mb-8">
                To proceed with your project:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                {nextSteps.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-4 bg-brut-surface/20 border-2 border-brut-surface p-5"
                  >
                    <span className="font-mono text-2xl font-black text-brut-yellow leading-none">
                      {index + 1}
                    </span>
                    <p className="font-sans text-sm text-white opacity-80 leading-relaxed">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <BrutalButton variant="accent" href="#contact">
                Get Started Now
              </BrutalButton>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default Pricing
