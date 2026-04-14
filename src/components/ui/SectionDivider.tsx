import React from 'react'

interface SectionDividerProps {
  className?: string
}

const SectionDivider = React.memo(function SectionDivider({
  className = '',
}: SectionDividerProps) {
  return <div className={`section-divider ${className}`} role="separator" aria-hidden="true" />
})

export default SectionDivider
