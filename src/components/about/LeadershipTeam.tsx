/**
 * Leadership spotlight section.
 */
import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'
import type { LeadershipMember } from '../../types/about.types'
import { SectionWrapper } from '../shared/SectionWrapper'

const INITIALS_NAME_PARTS = 2

const LEADERSHIP_MEMBERS: LeadershipMember[] = [
  {
    id: 'nikhil-sachan',
    name: 'Nikhil Sachan',
    role: 'Founder & Director',
    bio: "Built CareerKick with a mission to simplify India's most complex counseling decisions.",
  },
  {
    id: 'strategy-head',
    name: 'Apoorv Srivastava',
    role: 'Head of Counseling Strategy',
    bio: 'Leads framework design for rank-based counseling and college fit advisory.',
  },
  {
    id: 'operations-head',
    name: 'Priya Awasthi',
    role: 'Director of Student Success',
    bio: 'Drives process excellence across onboarding, guidance, and outcome tracking.',
  },
  {
    id: 'digital-head',
    name: 'Rahul Tiwari',
    role: 'Head of Digital Growth',
    bio: 'Scales CareerKick content ecosystem across high-impact education channels.',
  },
]

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, INITIALS_NAME_PARTS)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase()
}

function LeadershipTeamComponent() {
  const memberNodes = useMemo(() => {
    return LEADERSHIP_MEMBERS.map((member, index) => (
      <motion.article
        key={member.id}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: index * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] as const }}
        className="rounded-3xl border border-brand-navy/10 bg-white p-6 shadow-[0_20px_50px_-34px_rgba(26,26,46,0.44)]"
      >
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-royal text-lg font-semibold text-white">
          {getInitials(member.name)}
        </div>
        <h3 className="mt-5 text-xl font-semibold text-brand-navy">{member.name}</h3>
        <p className="mt-1 text-sm font-medium text-brand-cta">{member.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-brand-navy/75">{member.bio}</p>
      </motion.article>
    ))
  }, [])

  return (
    <SectionWrapper id="leadership-team" className="bg-brand-surface px-6 py-20 sm:px-8 lg:px-14">
      <div className="mx-auto w-full max-w-6xl">
        <h2 className="font-heading text-center text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
          Leadership Team
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{memberNodes}</div>
      </div>
    </SectionWrapper>
  )
}

export default memo(LeadershipTeamComponent)



