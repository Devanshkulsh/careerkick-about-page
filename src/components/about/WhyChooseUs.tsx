/**
 * Value proposition section showcasing key reasons to trust CareerKick.
 */
import { motion } from 'framer-motion'
import { Award, Handshake, Rocket } from 'lucide-react'
import { memo, useMemo } from 'react'
import { fadeUpVariants } from '../../constants/variants'
import type { WhyChooseUsItem } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    id: 'scale',
    title: 'Unmatched Counseling Scale',
    description: '1 million+ students guided through structured processes and trusted advisory systems.',
    icon: Rocket,
  },
  {
    id: 'precision',
    title: 'Precision Admission Strategy',
    description: 'Data-centric recommendations grounded in cutoffs, seat matrices, and rank trends.',
    icon: Award,
  },
  {
    id: 'network',
    title: 'Largest College Network',
    description: '150+ partnerships that improve visibility, planning confidence, and admission fit.',
    icon: Handshake,
  },
]

function WhyChooseUsComponent() {
  const reasonNodes = useMemo(() => {
    return WHY_CHOOSE_US.map((reason, index) => {
      const Icon = reason.icon
      return (
        <motion.article
          key={reason.id}
          custom={index}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUpVariants}
          className="rounded-3xl border border-brand-navy/10 bg-white p-6"
        >
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-cta/10 text-brand-cta">
            <Icon size={24} />
          </div>
          <h3 className="mt-5 text-xl font-semibold text-brand-navy">{reason.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{reason.description}</p>
        </motion.article>
      )
    })
  }, [])

  return (
    <SectionWrapper id="why-us" className="bg-white px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Why Students & Families Choose CareerKick
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">{reasonNodes}</div>
      </div>
    </SectionWrapper>
  )
}

export default memo(WhyChooseUsComponent)


