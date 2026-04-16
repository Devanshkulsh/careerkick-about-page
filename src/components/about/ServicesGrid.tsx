/**
 * Service capability grid for CareerKick offerings.
 */
import { motion } from 'framer-motion'
import { BookOpen, Building2, HeartHandshake, PlayCircle } from 'lucide-react'
import { memo, useMemo } from 'react'
import { scaleInVariants, staggerContainerVariants } from '../../constants/variants'
import type { ServiceItem } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const SERVICES: ServiceItem[] = [
  {
    id: 'jee-neet',
    title: 'IIT-JEE & NEET Counseling',
    description: 'Choice filling, rank analysis, branch comparison, and institute matching with expert support.',
    icon: BookOpen,
  },
  {
    id: 'admissions',
    title: 'College Admission Assistance',
    description:
      'End-to-end support from application readiness to final admission confirmation and documentation.',
    icon: Building2,
  },
  {
    id: 'mentorship',
    title: 'Expert Mentorship',
    description: 'Dedicated counselors provide one-on-one guidance with personalized strategy for each student profile.',
    icon: HeartHandshake,
  },
  {
    id: 'video-guidance',
    title: 'Digital Learning Channels',
    description: 'Video-first counseling education through focused YouTube channels for JEE, NEET, and MBA aspirants.',
    icon: PlayCircle,
  },
]

function ServicesGridComponent() {
  const serviceNodes = useMemo(() => {
    return SERVICES.map((service) => {
      const Icon = service.icon
      return (
        <motion.article
          key={service.id}
          variants={scaleInVariants}
          className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-[0_20px_60px_-36px_rgba(26,26,46,0.42)]"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-royal/10 text-brand-royal">
            <Icon size={24} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-brand-navy">{service.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{service.description}</p>
        </motion.article>
      )
    })
  }, [])

  return (
    <SectionWrapper id="services" className="bg-brand-surface px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Services Built For Admission Success
        </h2>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainerVariants}
          className="mt-12 grid gap-5 md:grid-cols-2"
        >
          {serviceNodes}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}

export default memo(ServicesGridComponent)


