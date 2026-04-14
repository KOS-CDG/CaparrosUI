export interface Service {
  id: number
  name: string
  description: string
  tags: string[]
}

export interface Project {
  id: number
  title: string
  client: string
  industry: string
  year: number
  imageUrl: string
  size: 'large' | 'small'
}

export interface Testimonial {
  id: number
  quote: string
  authorName: string
  authorRole: string
  company: string
}

export interface ProcessStep {
  stepNumber: string
  title: string
  description: string
}

export interface NavLink {
  label: string
  href: string
}
