/**
 * Scroll-triggered section wrapper with Apple-like easing and optional delay.
 */
import { motion, useInView } from 'framer-motion'
import { memo, useRef } from 'react'
import type { ReactNode } from 'react'

const ENTRANCE_DURATION = 0.7
const ENTRANCE_OFFSET = 48
const VIEW_MARGIN = '-80px'

export interface SectionWrapperProps {
  children: ReactNode
  className?: string
  delay?: number
  id?: string
}

function SectionWrapperComponent({
  children,
  className,
  delay = 0,
  id,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement | null>(null)
  const inView = useInView(sectionRef, { once: true, margin: VIEW_MARGIN })

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      initial={{ opacity: 0, y: ENTRANCE_OFFSET }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: ENTRANCE_OFFSET }}
      transition={{ duration: ENTRANCE_DURATION, delay, ease: [0.22, 1, 0.36, 1] as const }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export const SectionWrapper = memo(SectionWrapperComponent)



