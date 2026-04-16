/**
 * Hook for in-view count-up animations driven by Framer Motion motion values.
 */
import { animate, useInView, useMotionValue, useMotionValueEvent, useTransform } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

const DEFAULT_DURATION = 2.5
const DEFAULT_THRESHOLD = 0.3

export interface UseCountUpOptions {
  from: number
  to: number
  duration?: number
  threshold?: number
}

export interface UseCountUpResult {
  ref: RefObject<HTMLSpanElement>
  value: number
  inView: boolean
}

export function useCountUp(options: UseCountUpOptions): UseCountUpResult {
  const { from, to, duration = DEFAULT_DURATION, threshold = DEFAULT_THRESHOLD } = options
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const count = useMotionValue(from)
  const rounded = useTransform(count, Math.round)
  const [value, setValue] = useState<number>(from)

  const handleValueChange = useCallback((latest: number) => {
    setValue(latest)
  }, [])

  useMotionValueEvent(rounded, 'change', handleValueChange)

  useEffect(() => {
    if (!inView) {
      return
    }

    const controls = animate(count, to, { duration, ease: 'easeOut' })
    return controls.stop
  }, [count, duration, inView, to])

  return { ref, value, inView }
}


