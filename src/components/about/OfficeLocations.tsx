/**
 * Office location cards with semantic address blocks.
 */
import { motion } from 'framer-motion'
import { Clock3, MapPin } from 'lucide-react'
import { memo, useMemo } from 'react'
import type { OfficeLocation } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const OFFICES: OfficeLocation[] = [
  {
    id: 'noida',
    city: 'Noida',
    address: 'AA-007 Golf Link-1, Greater Noida',
    hours: '10 AM - 7 PM',
  },
  {
    id: 'kanpur',
    city: 'Kanpur',
    address: '117 N 65, Kakadeo',
    hours: '10 AM - 7 PM',
  },
  {
    id: 'gorakhpur',
    city: 'Gorakhpur',
    address: 'CareerKick Regional Office, Gorakhpur',
    hours: '10 AM - 7 PM',
  },
]

function OfficeLocationsComponent() {
  const officeNodes = useMemo(() => {
    return OFFICES.map((office, index) => (
      <motion.article
        key={office.id}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: index * 0.1, duration: 0.52, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-3xl border border-brand-navy/10 bg-white p-6"
      >
        <h3 className="text-2xl font-semibold text-brand-navy">{office.city}</h3>
        <address className="mt-4 not-italic text-sm leading-relaxed text-brand-navy/75">
          <span className="inline-flex items-start gap-2">
            <MapPin size={16} className="mt-[2px] shrink-0 text-brand-cta" />
            {office.address}
          </span>
        </address>
        <p className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-royal">
          <Clock3 size={16} />
          {office.hours}
        </p>
      </motion.article>
    ))
  }, [])

  return (
    <SectionWrapper id="office-locations" className="bg-brand-surface px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Pan-India Office Presence
        </h2>
        <div className="mt-12 grid gap-5 md:grid-cols-3">{officeNodes}</div>
      </div>
    </SectionWrapper>
  )
}

export default memo(OfficeLocationsComponent)



