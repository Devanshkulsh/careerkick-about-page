/**
 * Animated company journey timeline with scroll-linked central path rendering.
 */
import { motion, useScroll, useTransform } from 'framer-motion'
import { memo, useMemo, useRef } from 'react'
import { slideFromLeftVariants, slideFromRightVariants } from '../../constants/variants'
import type { Milestone } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const MOBILE_OFFSET = 'left-3'
const TIMELINE_STROKE_WIDTH = 4

const MILESTONES: Milestone[] = [
  {
    year: '2017',
    title: 'CareerKick Founded',
    description: "Started as India's first online JEE counseling platform",
    highlight: true,
  },
  {
    year: '2019',
    title: 'YouTube Launch',
    description: 'Launched dedicated channels for JEE, NEET, MBA students',
  },
  {
    year: '2021',
    title: '100K Students Milestone',
    description: 'Guided over 1 lakh students to their dream colleges',
  },
  {
    year: '2023',
    title: '150+ College Network',
    description: "Built India's largest college partnership network",
    highlight: true,
  },
  {
    year: '2024',
    title: 'Pan-India Offices',
    description: 'Expanded to Noida, Kanpur, and Gorakhpur offices',
  },
  {
    year: '2025',
    title: '1 Million Strong',
    description: 'Crossed 10 lakh students guided - a national milestone',
    highlight: true,
  },
]

interface MilestoneCardProps {
  milestone: Milestone
  index: number
}

const MilestoneCard = memo(function MilestoneCardComponent({
  milestone,
  index,
}: MilestoneCardProps) {
  const isEven = index % 2 === 0
  const alignmentClass = isEven ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
  const variant = isEven ? slideFromLeftVariants : slideFromRightVariants
  const borderClass = milestone.highlight ? 'border-brand-gold/70' : 'border-brand-navy/12'

  return (
    <motion.article
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={variant}
      className={`relative w-full md:w-1/2 ${alignmentClass}`}
    >
      <div className={`rounded-3xl border bg-white p-6 shadow-[0_24px_60px_-38px_rgba(15,52,96,0.45)] ${borderClass}`}>
        <h3 className="text-xl font-semibold text-brand-navy">{milestone.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{milestone.description}</p>
      </div>
      <div
        className={`absolute top-6 ${MOBILE_OFFSET} h-14 w-14 -translate-x-1/2 rounded-full border-2 border-brand-royal bg-brand-navy text-center text-sm font-semibold leading-[3.35rem] text-brand-gold md:left-1/2`}
      >
        {milestone.year}
      </div>
    </motion.article>
  )
})

function JourneyTimelineComponent() {
  const timelineRef = useRef<HTMLDivElement | null>(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 20%'],
  })
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1])

  const milestoneNodes = useMemo(() => {
    return MILESTONES.map((milestone, index) => (
      <MilestoneCard key={`${milestone.year}-${milestone.title}`} milestone={milestone} index={index} />
    ))
  }, [])

  return (
    <SectionWrapper id="journey-timeline" className="bg-brand-surface px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          The CareerKick Journey
        </h2>
        <div ref={timelineRef} className="relative mt-14">
          <div className="absolute bottom-0 left-3 top-0 w-px bg-brand-royal/20 md:left-1/2 md:-translate-x-1/2" />
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute left-3 top-0 hidden h-full w-[2px] -translate-x-1/2 md:left-1/2 md:block"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M1 0 L1 100"
              stroke="#f5a623"
              strokeWidth={TIMELINE_STROKE_WIDTH}
              fill="none"
              style={{ pathLength }}
            />
          </svg>
          <div className="space-y-8 md:space-y-14">{milestoneNodes}</div>
        </div>
      </div>
    </SectionWrapper>
  )
}

export default memo(JourneyTimelineComponent)


