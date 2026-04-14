import React from 'react'
import SectionDivider from '@/components/ui/SectionDivider'

const MARQUEE_ITEMS = [
  'UI/UX DESIGN',
  'WEB DEVELOPMENT',
  'DESIGN SYSTEMS',
  'BRANDING',
  'PROTOTYPING',
  'INTERACTION DESIGN',
]

const MarqueeStrip = React.memo(function MarqueeStrip() {
  const content = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <div aria-hidden="true">
      <SectionDivider />
      <div className="bg-brut-black overflow-hidden py-4" role="marquee">
        <div className="marquee-inner flex whitespace-nowrap">
          {content.map((item, index) => (
            <span key={index} className="flex items-center">
              <span className="font-grotesk font-700 text-brut-bg text-sm md:text-base tracking-widest uppercase px-6">
                {item}
              </span>
              <span
                className="inline-block w-2 h-2 bg-brut-yellow flex-shrink-0"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
      <SectionDivider />
    </div>
  )
})

export default MarqueeStrip
