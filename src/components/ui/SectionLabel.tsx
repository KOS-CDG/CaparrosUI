import React from 'react'

interface SectionLabelProps {
  label: string
  className?: string
}

const SectionLabel = React.memo(function SectionLabel({
  label,
  className = '',
}: SectionLabelProps) {
  return (
    <span
      className={`font-mono text-sm font-medium tracking-wide text-brut-black opacity-60 uppercase ${className}`}
    >
      {label}
    </span>
  )
})

export default SectionLabel
