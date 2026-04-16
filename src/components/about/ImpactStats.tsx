/**
 * Numeric impact section with animated counters and icon-focused stat cards.
 */
import { motion } from 'framer-motion'
import { GraduationCap, Handshake, ShieldCheck, Users } from 'lucide-react'
import { memo, useMemo } from 'react'
import { AnimatedCounter } from '../shared/AnimatedCounter'
import type { StatItem } from '../../types/about.types'

const CARD_STAGGER = 0.15
const ICON_ROTATE_DURATION = 0.9
const RING_DURATION = 2

const STATS: StatItem[] = [
  { id: 'students-guided', value: 1000000, suffix: '+', label: 'Students Guided', icon: Users },
  { id: 'college-partnerships', value: 150, suffix: '+', label: 'College Partnerships', icon: Handshake },
  { id: 'successful-admissions', value: 100000, suffix: '+', label: 'Successful Admissions', icon: GraduationCap },
  { id: 'expert-counselors', value: 200, suffix: '+', label: 'Expert Counselors', icon: ShieldCheck },
]

interface StatCardProps {
  stat: StatItem
  index: number
}

const StatCard = memo(function StatCardComponent({ stat, index }: StatCardProps) {
  const Icon = stat.icon

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay: index * CARD_STAGGER, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
      className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm"
    >
      <div className="relative inline-flex h-14 w-14 items-center justify-center">
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 rounded-full border border-brand-gold/55"
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0, 0] }}
          transition={{ duration: RING_DURATION, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
        />
        <motion.div
          initial={{ rotate: -180 }}
          whileInView={{ rotate: 360 }}
          viewport={{ once: true }}
          transition={{ duration: ICON_ROTATE_DURATION, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative z-10 text-brand-gold"
        >
          <Icon size={24} />
        </motion.div>
      </div>
      <p className="mt-5 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        <AnimatedCounter from={0} to={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-2 text-sm uppercase tracking-[0.14em] text-white/70">{stat.label}</p>
    </motion.article>
  )
})

function ImpactStatsComponent() {
  const cardNodes = useMemo(() => {
    return STATS.map((stat, index) => <StatCard key={stat.id} stat={stat} index={index} />)
  }, [])

  return (
    <section id="impact-stats" className="bg-brand-navy px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Measurable Impact At National Scale
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: CARD_STAGGER } } }}
          className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cardNodes}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(ImpactStatsComponent)



