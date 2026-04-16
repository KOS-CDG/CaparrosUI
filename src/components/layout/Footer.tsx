import React from 'react'
import SectionDivider from '@/components/ui/SectionDivider'

const footerLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/caparros-ui' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dhale-caparros-a884a23b9' },
  { label: 'Twitter / X', href: 'https://twitter.com/caparrosui' },
  { label: 'Dribbble', href: 'https://dribbble.com/caparros-ui' },
]

const Footer = React.memo(function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-brut-bg border-t-[3px] border-brut-black" role="contentinfo">
      {/* Main footer grid */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand Column */}
          <div className="flex flex-col gap-6">
            <a
              href="#"
              className="font-grotesk font-black text-brut-black text-2xl uppercase tracking-tight hover:text-brut-black"
              aria-label="Caparros UI — Home"
            >
              Caparros UI
            </a>
            <p className="font-sans text-brut-black text-sm leading-relaxed max-w-xs">
              We don&apos;t design websites. We build experiences. Premium UI/UX design and
              frontend development for startups and scale-up tech brands.
            </p>
            <div className="flex flex-col gap-2" aria-label="Social media links">
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-brut-black uppercase tracking-wide hover:text-brut-blue transition-colors duration-fast w-fit"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brut-black opacity-50">
              Navigation
            </h3>
            <nav aria-label="Footer navigation">
              <ul className="flex flex-col gap-3" role="list">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-grotesk font-700 text-base uppercase text-brut-black hover:text-brut-blue transition-colors duration-fast tracking-tight"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Contact Column */}
          <div className="flex flex-col gap-6">
            <h3 className="font-mono text-xs uppercase tracking-widest text-brut-black opacity-50">
              Get in Touch
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:caparrosui@gmail.com"
                className="font-grotesk font-700 text-base uppercase text-brut-black hover:text-brut-blue transition-colors duration-fast tracking-tight"
              >
                caparrosui@gmail.com
              </a>
              <p className="font-mono text-xs text-brut-black opacity-60">
                Based globally. Working remotely.
              </p>
            </div>
            <div>
              <a
                href="#contact"
                className="inline-block font-grotesk font-700 text-sm uppercase border-b-2 border-brut-black pb-0.5 hover:border-brut-yellow transition-colors duration-fast"
              >
                Start a Project &rarr;
              </a>
            </div>
          </div>
        </div>
      </div>

      <SectionDivider />

      {/* Bottom Bar */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
        <p className="font-mono text-xs text-brut-black opacity-50">
          &copy; {currentYear} Caparros UI. All rights reserved.
        </p>
        <p className="font-mono text-xs text-brut-black opacity-50">
          Built with brutal precision.
        </p>
      </div>
    </footer>
  )
})

export default Footer
