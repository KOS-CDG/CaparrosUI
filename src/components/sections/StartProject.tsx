import React, { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { Mail, MapPin, Github, Linkedin, Twitter, Dribbble, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'
import BrutalButton from '@/components/ui/BrutalButton'
import SectionDivider from '@/components/ui/SectionDivider'
import { useInView } from '@/hooks/useInView'

const StartProject = React.memo(function StartProject() {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '',
    details: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const result = await emailjs.send(
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          reply_to: formData.email,
          budget: formData.budget,
          message: formData.details,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY
      )

      if (result.status === 200) {
        setStatus('success')
        setFormData({ name: '', email: '', budget: '', details: '' })
      } else {
        setStatus('error')
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      setStatus('error')
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-brut-bg border-b-2 border-brut-black min-h-screen"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />
      
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-20 md:py-32">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24"
        >
          {/* Left Column - Contact Information */}
          <div className="flex flex-col">
            <motion.h2
              id="contact-heading"
              variants={itemVariants}
              className="font-grotesk font-black text-brut-black uppercase mb-8 leading-none"
              style={{ fontSize: 'clamp(48px, 6vw, 84px)', letterSpacing: '-0.04em' }}
            >
              Start A <span className="bg-brut-yellow px-2 inline-block shadow-brutal-sm border-2 border-brut-black">Project</span>
            </motion.h2>
            
            <motion.p
              variants={itemVariants}
              className="font-sans text-base md:text-lg text-brut-black opacity-80 max-w-lg mb-12"
            >
              Ready to ditch the templates and build something truly authentic? We only take on a few select projects at a time to ensure maximum quality and brutal efficiency. Drop us the details below.
            </motion.p>
            
            <motion.div variants={itemVariants} className="flex flex-col gap-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-brut-black text-brut-yellow border-2 border-brut-black shadow-brutal-sm">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-grotesk font-bold text-lg uppercase text-brut-black">Email Us</h3>
                  <a href="mailto:caparrosui@gmail.com" className="font-mono text-brut-black opacity-80 hover:text-brut-blue hover:underline transition-colors">
                    caparrosui@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white text-brut-black border-2 border-brut-black shadow-brutal-sm">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-grotesk font-bold text-lg uppercase text-brut-black">Location</h3>
                  <p className="font-mono text-brut-black opacity-80 max-w-[200px]">
                    Manila, Philippines / Remote World-Wide
                  </p>
                </div>
              </div>
              

            </motion.div>
            
            <motion.div variants={itemVariants} className="mt-auto">
              <h3 className="font-mono text-sm uppercase text-brut-black opacity-60 mb-4">Connect</h3>
              <div className="flex gap-4">
                <a href="https://www.linkedin.com/in/dhale-caparros-a884a23b9" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="p-3 bg-white border-2 border-brut-black text-brut-black hover:bg-brut-blue hover:text-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                  <Linkedin size={24} />
                </a>
                <a href="https://twitter.com/caparrosui" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-3 bg-white border-2 border-brut-black text-brut-black hover:bg-brut-black hover:text-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                  <Twitter size={24} />
                </a>
                <a href="https://github.com/caparros-ui" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 bg-white border-2 border-brut-black text-brut-black hover:bg-brut-surface hover:text-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                  <Github size={24} />
                </a>
                <a href="https://dribbble.com/caparros-ui" target="_blank" rel="noopener noreferrer" aria-label="Dribbble" className="p-3 bg-white border-2 border-brut-black text-brut-black hover:bg-brut-pink hover:text-white shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                  <Dribbble size={24} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Form */}
          <motion.div variants={itemVariants} className="flex flex-col">
            <div className="bg-white border-[3px] border-brut-black p-6 md:p-10 shadow-brutal-lg">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-20">
                  <div className="w-16 h-16 bg-brut-yellow border-[3px] border-brut-black shadow-brutal-sm rounded-full flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-brut-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-grotesk font-black text-3xl md:text-4xl uppercase text-brut-black mb-4">Message Sent</h3>
                  <p className="font-sans text-brut-black opacity-80 max-w-sm">
                    We've received your request and will get back to you with brutal honesty within 24 hours.
                  </p>
                  <BrutalButton variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                    Send Another
                  </BrutalButton>
                </div>
              ) : status === 'error' ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-20">
                  <div className="w-16 h-16 bg-brut-red border-[3px] border-brut-black shadow-brutal-red rounded-full flex items-center justify-center mb-6">
                    <AlertCircle size={32} className="text-brut-black" />
                  </div>
                  <h3 className="font-grotesk font-black text-3xl md:text-4xl uppercase text-brut-black mb-4">Oops!</h3>
                  <p className="font-sans text-brut-black opacity-80 max-w-sm">
                    Something went wrong while sending your message. Please try again or email us directly.
                  </p>
                  <BrutalButton variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
                    Try Again
                  </BrutalButton>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-grotesk font-bold uppercase text-brut-black text-sm">
                      Name / Company
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-brut-bg border-2 border-brut-black p-4 font-sans text-brut-black placeholder:text-brut-black/40 focus:outline-none focus:ring-4 focus:ring-brut-yellow transition-shadow"
                      placeholder="John Doe from Acme Corp"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-grotesk font-bold uppercase text-brut-black text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-brut-bg border-2 border-brut-black p-4 font-sans text-brut-black placeholder:text-brut-black/40 focus:outline-none focus:ring-4 focus:ring-brut-yellow transition-shadow"
                      placeholder="caparrosui@gmail.com"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="budget" className="font-grotesk font-bold uppercase text-brut-black text-sm">
                      Select Package
                    </label>
                    <div className="relative">
                      <select
                        id="budget"
                        name="budget"
                        required
                        value={formData.budget}
                        onChange={handleChange}
                        className="w-full bg-brut-bg border-2 border-brut-black p-4 font-sans text-brut-black appearance-none focus:outline-none focus:ring-4 focus:ring-brut-yellow transition-shadow rounded-none"
                      >
                        <option value="" disabled>Select a package</option>
                        <option value="basic">Basic Website — PHP 1,500</option>
                        <option value="professional">Professional Website — PHP 5,000</option>
                        <option value="premium">Premium Website — PHP 8,000</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brut-black">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="details" className="font-grotesk font-bold uppercase text-brut-black text-sm">
                      Project Details
                    </label>
                    <textarea
                      id="details"
                      name="details"
                      required
                      rows={5}
                      value={formData.details}
                      onChange={handleChange}
                      className="w-full bg-brut-bg border-2 border-brut-black p-4 font-sans text-brut-black placeholder:text-brut-black/40 focus:outline-none focus:ring-4 focus:ring-brut-yellow transition-shadow resize-none"
                      placeholder="Tell us what you want to build and why it needs to exist..."
                    />
                  </div>

                  <BrutalButton 
                    type="submit" 
                    variant="accent" 
                    className="mt-4" 
                    fullWidth 
                  >
                    {status === 'submitting' ? 'Submitting...' : 'Send Inquiry'}
                  </BrutalButton>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
})

export default StartProject
