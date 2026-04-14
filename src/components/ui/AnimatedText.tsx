import React from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'fade'
}

const AnimatedText = React.memo(function AnimatedText({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion()

  const variants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: direction === 'up' ? 60 : 0,
          x: direction === 'left' ? -20 : 0,
        },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.6,
        ease: 'easeOut',
        delay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
    >
      {children}
    </motion.div>
  )
})

export default AnimatedText

interface StaggerContainerProps {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export const StaggerContainer = React.memo(function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
      },
    },
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
})

export const StaggerItem = React.memo(function StaggerItem({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  const itemVariants = {
    hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  )
})
