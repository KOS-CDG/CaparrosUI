import React from 'react'

type ButtonVariant = 'filled' | 'outline' | 'accent'

interface BrutalButtonProps {
  children: React.ReactNode
  variant?: ButtonVariant
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  className?: string
  ariaLabel?: string
  fullWidth?: boolean
}

const variantClasses: Record<ButtonVariant, string> = {
  filled: 'bg-brut-black text-brut-white hover:bg-brut-black',
  outline: 'bg-transparent text-brut-black hover:bg-brut-yellow',
  accent: 'bg-brut-yellow text-brut-black hover:bg-brut-yellow',
}

const BrutalButton = React.memo(function BrutalButton({
  children,
  variant = 'filled',
  href,
  onClick,
  type = 'button',
  className = '',
  ariaLabel,
  fullWidth = false,
}: BrutalButtonProps) {
  const baseClasses = `
    brutal-btn
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `.trim()

  if (href) {
    return (
      <a href={href} className={baseClasses} aria-label={ariaLabel}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={baseClasses}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
})

export default BrutalButton
