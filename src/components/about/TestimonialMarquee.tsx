/**
 * Dual-lane testimonial marquee with opposite-direction infinite scrolling.
 */
import { animate, motion, useMotionValue, useTransform, type AnimationPlaybackControls } from 'framer-motion'
import { Star } from 'lucide-react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import type { Testimonial } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const MARQUEE_DURATION = 20
const MAX_STARS = 5
const LEFT_END = -50
const RIGHT_END = 50

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Riya Sharma',
    review: 'The counseling roadmap was crystal clear. I secured a top-fit college choice confidently.',
    rating: 5,
    date: 'January 2026',
  },
  {
    name: 'Ayush Verma',
    review: 'CareerKick removed the stress from NEET counseling. Every step felt transparent and guided.',
    rating: 5,
    date: 'December 2025',
  },
  {
    name: 'Pooja Singh',
    review: 'Best decision for our family. Expert counselor support was practical and deeply personalized.',
    rating: 5,
    date: 'November 2025',
  },
  {
    name: 'Nitin Kapoor',
    review: 'Strong data-backed options and zero confusion during choice filling. Highly recommended service.',
    rating: 5,
    date: 'October 2025',
  },
  {
    name: 'Sneha Mishra',
    review: 'The mentors explained every possible scenario before final submission. Excellent experience.',
    rating: 5,
    date: 'September 2025',
  },
  {
    name: 'Karan Yadav',
    review: 'Guidance quality was world-class. We knew exactly what to do across every admission round.',
    rating: 5,
    date: 'August 2025',
  },
]

interface MarqueeRowProps {
  testimonials: Testimonial[]
  direction: 'left' | 'right'
}

function buildStarNodes(rating: number, keyPrefix: string) {
  return Array.from({ length: MAX_STARS }, (_, index) => {
    const isFilled = index < rating
    return (
      <Star
        key={`${keyPrefix}-${index.toString()}`}
        size={14}
        className={isFilled ? 'fill-brand-gold text-brand-gold' : 'text-brand-gold/35'}
      />
    )
  })
}

const MarqueeRow = memo(function MarqueeRowComponent({ testimonials, direction }: MarqueeRowProps) {
  const x = useMotionValue(0)
  const xPercent = useTransform(x, (latest) => `${latest}%`)
  const controlsRef = useRef<AnimationPlaybackControls | null>(null)
  const duplicatedTestimonials = useMemo(() => [...testimonials, ...testimonials], [testimonials])
  const targetValue = direction === 'left' ? LEFT_END : RIGHT_END

  useEffect(() => {
    const controls = animate(x, targetValue, {
      duration: MARQUEE_DURATION,
      repeat: Number.POSITIVE_INFINITY,
      ease: 'linear',
      repeatType: 'loop',
    })

    controlsRef.current = controls

    return () => {
      controls.stop()
      controlsRef.current = null
    }
  }, [targetValue, x])

  const handlePause = useCallback(() => {
    controlsRef.current?.pause()
  }, [])

  const handleResume = useCallback(() => {
    controlsRef.current?.play()
  }, [])

  const cardNodes = useMemo(() => {
    return duplicatedTestimonials.map((testimonial, index) => (
      <article
        key={`${testimonial.name}-${testimonial.date}-${index.toString()}`}
        className="w-[320px] shrink-0 rounded-2xl border border-brand-navy/10 bg-white p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-semibold text-brand-navy">{testimonial.name}</h3>
          <span className="text-xs text-brand-navy/60">{testimonial.date}</span>
        </div>
        <div className="mt-3 flex items-center gap-1">{buildStarNodes(testimonial.rating, testimonial.name)}</div>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{testimonial.review}</p>
      </article>
    ))
  }, [duplicatedTestimonials])

  return (
    <div onMouseEnter={handlePause} onMouseLeave={handleResume} className="overflow-hidden">
      <motion.div style={{ x: xPercent }} className="flex min-w-max gap-4 py-2">
        {cardNodes}
      </motion.div>
    </div>
  )
})

function TestimonialMarqueeComponent() {
  return (
    <SectionWrapper id="testimonials" className="bg-white px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <div className="inline-flex items-center rounded-full border border-brand-gold/40 bg-brand-gold/10 px-4 py-2 text-xs font-semibold tracking-[0.12em] text-brand-navy">
          EXCELLENT · 4.9/5 · 274+ Google Reviews
        </div>
        <h2 className="font-heading mt-5 text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          What Students Say About CareerKick
        </h2>
        <div className="mt-10 space-y-4">
          <MarqueeRow testimonials={TESTIMONIALS} direction="left" />
          <MarqueeRow testimonials={TESTIMONIALS} direction="right" />
        </div>
      </div>
    </SectionWrapper>
  )
}

export default memo(TestimonialMarqueeComponent)

