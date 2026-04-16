/**
 * Reusable animated counter component with in-view trigger and suffix support.
 */
import { memo } from 'react'
import { useCountUp } from '../../hooks/useCountUp'

const DEFAULT_DURATION = 2.5

export interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  suffix?: string
}

function AnimatedCounterComponent({
  from,
  to,
  duration = DEFAULT_DURATION,
  suffix = '',
}: AnimatedCounterProps) {
  const { ref, value } = useCountUp({ from, to, duration })

  return (
    <span ref={ref} aria-live="polite" className="tabular-nums">
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}

export const AnimatedCounter = memo(AnimatedCounterComponent)


