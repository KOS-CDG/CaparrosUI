import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { useInView } from '@/hooks/useInView'
import SectionLabel from '@/components/ui/SectionLabel'
import SectionDivider from '@/components/ui/SectionDivider'
import { projects } from '@/constants/projects'
import type { Project } from '@/types'

interface ProjectBlockProps {
  project: Project
  index: number
}

const ProjectBlock = React.memo(function ProjectBlock({ project, index }: ProjectBlockProps) {
  const shouldReduceMotion = useReducedMotion()
  const { ref, inView } = useInView({ threshold: 0.1 })

  const isLarge = project.size === 'large'
  const colClass = isLarge ? 'md:col-span-8' : 'md:col-span-4'

  return (
    <motion.article
      ref={ref as React.RefObject<HTMLElement>}
      className={`project-block col-span-12 ${colClass} border-2 border-brut-black relative overflow-hidden group`}
      initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut', delay: index * 0.1 }}
      aria-label={`Project: ${project.title} for ${project.client}, ${project.industry}, ${project.year}`}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img
          src={project.imageUrl}
          alt={`${project.title} — ${project.client} project screenshot`}
          className="project-image w-full h-full object-cover"
          loading="lazy"
          width={isLarge ? 1200 : 800}
          height={isLarge ? 675 : 450}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brut-yellow opacity-0 group-hover:opacity-10 transition-opacity duration-fast" />
      </div>

      {/* Project Info */}
      <div className="p-5 md:p-6 border-t-2 border-brut-black bg-brut-bg">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3
              className="font-grotesk font-bold uppercase text-brut-black leading-none mb-2"
              style={{
                fontSize: isLarge ? 'clamp(24px, 4vw, 48px)' : 'clamp(20px, 3vw, 32px)',
                letterSpacing: '-0.03em',
              }}
            >
              {project.title}
            </h3>
            <p className="font-mono text-xs text-brut-black opacity-50 uppercase tracking-wide">
              {project.industry} &mdash; {project.year}
            </p>
          </div>
          <a
            href="#contact"
            className="flex-shrink-0 font-mono text-xs uppercase text-brut-black border-b border-brut-black hover:border-brut-yellow hover:text-brut-blue transition-colors duration-fast whitespace-nowrap"
            aria-label={`View ${project.title} project details`}
          >
            View &rarr;
          </a>
        </div>
      </div>
    </motion.article>
  )
})

const Work = React.memo(function Work() {
  const { ref, inView } = useInView({ threshold: 0.05 })

  return (
    <section
      id="work"
      aria-labelledby="work-heading"
      className="bg-brut-bg"
      ref={ref as React.RefObject<HTMLElement>}
    >
      <SectionDivider />
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 py-16 md:py-24">
        {/* Section header */}
        <motion.div
          className="flex flex-col gap-4 mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionLabel label="// 03 — Selected Work" />
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2
              id="work-heading"
              className="font-grotesk font-bold text-brut-black"
              style={{
                fontSize: 'clamp(36px, 6vw, 72px)',
                letterSpacing: '-0.03em',
                lineHeight: 1.0,
              }}
            >
              Recent Projects
            </h2>
            <a
              href="#contact"
              className="font-mono text-sm uppercase text-brut-black border-b-2 border-brut-black pb-0.5 hover:border-brut-yellow transition-colors duration-fast w-fit flex-shrink-0"
            >
              See All Work &rarr;
            </a>
          </div>
        </motion.div>

        {/* Asymmetric project grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectBlock key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
})

export default Work
