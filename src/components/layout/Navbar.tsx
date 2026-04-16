import React, { useState } from 'react'
import { X, Menu } from 'lucide-react'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import BrutalButton from '@/components/ui/BrutalButton'
import type { NavLink } from '@/types'

const navLinks: NavLink[] = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const Navbar = React.memo(function Navbar() {
  const { isScrolled } = useScrollDirection()
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleMobile = () => setMobileOpen((prev) => !prev)
  const closeMobile = () => setMobileOpen(false)

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-brut-bg transition-all duration-fast ${
          isScrolled ? 'border-b-2 border-brut-black' : ''
        }`}
        role="banner"
      >
        <nav
          className="flex items-center justify-between px-6 md:px-10 h-16 md:h-20 max-w-screen-2xl mx-auto"
          aria-label="Main navigation"
        >
          {/* Wordmark */}
          <a
            href="#"
            className="font-grotesk font-black text-brut-black text-lg md:text-xl tracking-tight uppercase hover:text-brut-black focus-visible:outline-2 focus-visible:outline-brut-yellow"
            aria-label="Caparros UI — Home"
          >
            Caparros UI
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="font-grotesk font-700 text-sm uppercase tracking-wide text-brut-black hover:text-brut-black relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brut-yellow transition-all duration-fast group-hover:w-full" />
                </a>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <BrutalButton variant="filled" href="#contact">
              Start a Project
            </BrutalButton>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 border-2 border-brut-black hover:bg-brut-yellow transition-colors duration-fast"
            onClick={toggleMobile}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
          >
            {mobileOpen ? <X size={20} strokeWidth={2.5} /> : <Menu size={20} strokeWidth={2.5} />}
          </button>
        </nav>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-brut-black flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Close button row */}
          <div className="flex items-center justify-between px-6 h-16 border-b-2 border-brut-surface">
            <span className="font-grotesk font-black text-brut-white text-lg uppercase tracking-tight">
              Caparros UI
            </span>
            <button
              className="flex items-center justify-center w-10 h-10 border-2 border-brut-surface hover:border-brut-yellow transition-colors duration-fast"
              onClick={closeMobile}
              aria-label="Close menu"
            >
              <X size={20} strokeWidth={2.5} className="text-brut-white" />
            </button>
          </div>

          {/* Mobile Links */}
          <nav className="flex flex-col flex-1 justify-center px-6" aria-label="Mobile navigation links">
            <ul className="flex flex-col gap-2" role="list">
              {navLinks.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={closeMobile}
                    className="flex items-center justify-between font-grotesk font-black text-brut-white uppercase border-b border-brut-surface py-5 hover:text-brut-yellow transition-colors duration-fast group"
                    style={{ fontSize: 'clamp(28px, 8vw, 56px)', letterSpacing: '-0.03em' }}
                  >
                    <span>{link.label}</span>
                    <span className="font-mono text-sm text-brut-surface group-hover:text-brut-yellow transition-colors">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <BrutalButton
                variant="accent"
                href="#contact"
                fullWidth
                onClick={closeMobile}
              >
                Start a Project
              </BrutalButton>
            </div>
          </nav>

          {/* Footer strip */}
          <div className="px-6 py-6 border-t border-brut-surface">
            <p className="font-mono text-xs text-brut-surface">caparrosui@gmail.com</p>
          </div>
        </div>
      )}
    </>
  )
})

export default Navbar
