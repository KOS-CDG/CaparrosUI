import type { Service } from '@/types'

export const services: Service[] = [
  {
    id: 1,
    name: 'UI/UX Design',
    description:
      'End-to-end product design from user research to pixel-perfect interfaces. We craft intuitive, conversion-optimized experiences grounded in real user behavior.',
    tags: ['Research', 'Wireframing', 'Visual Design', 'Usability Testing'],
  },
  {
    id: 2,
    name: 'Web Development',
    description:
      'Production-grade frontend engineering built on modern React, TypeScript, and performance-first architecture. Clean code, zero shortcuts.',
    tags: ['React', 'TypeScript', 'Next.js', 'Performance'],
  },
  {
    id: 3,
    name: 'Design Systems',
    description:
      'Scalable, documented component libraries that bridge design and engineering. From token architecture to interactive Storybook documentation.',
    tags: ['Tokens', 'Components', 'Documentation', 'Storybook'],
  },
  {
    id: 4,
    name: 'Brand Identity',
    description:
      'Visual identities built to last — logomarks, color systems, typography pairings, and brand guidelines that speak with authority across every medium.',
    tags: ['Logo', 'Color Systems', 'Typography', 'Brand Guidelines'],
  },
  {
    id: 5,
    name: 'Prototyping',
    description:
      'High-fidelity interactive prototypes that feel like the real product. Validate ideas and communicate vision to stakeholders before writing a single line of code.',
    tags: ['Figma', 'Interaction Design', 'User Testing', 'Rapid Iteration'],
  },
  {
    id: 6,
    name: 'Interaction Design',
    description:
      'Micro-interactions, motion principles, and animation systems that make products feel alive — without sacrificing performance or accessibility.',
    tags: ['Motion Design', 'Micro-interactions', 'Animation', 'Framer'],
  },
]
