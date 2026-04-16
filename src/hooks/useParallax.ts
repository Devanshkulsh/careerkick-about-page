/**
 * Hook that returns a parallax-ready y transform value tied to element scroll progress.
 */
import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type RefObject } from 'react'

const PARALLAX_DISTANCE = 220

export interface UseParallaxResult<T extends HTMLElement> {
  ref: RefObject<T>
  y: MotionValue<number>
}

export function useParallax<T extends HTMLElement>(factor: number): UseParallaxResult<T> {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-(PARALLAX_DISTANCE * factor), PARALLAX_DISTANCE * factor],
  )

  return { ref, y }
}


